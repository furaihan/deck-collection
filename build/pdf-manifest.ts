import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, copyFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { join } from "node:path";
import type { Plugin, ViteDevServer } from "vite";

/** Virtual module the app imports to learn which slide PDFs exist. */
export const PDF_MANIFEST_ID = "virtual:pdf-manifest";
const RESOLVED_ID = "\0" + PDF_MANIFEST_ID;

export interface PdfEntry {
  slug: string;
  /** Always `/pdf/<slug>.pdf`: dev serves it from `exports/`, a build copies it. */
  url: string;
  bytes: number;
  modified: string;
}

interface DeckMeta {
  slug: string;
  visibility: "public" | "private";
}

function readDecks(root: string): DeckMeta[] {
  const dir = join(root, "presentations");
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const metaPath = join(dir, entry.name, "presentation.json");
      if (!existsSync(metaPath)) return [];
      try {
        const raw = JSON.parse(readFileSync(metaPath, "utf8")) as { visibility?: unknown };
        return [{
          slug: entry.name,
          visibility: raw.visibility === "private" ? "private" : "public",
        } satisfies DeckMeta];
      } catch {
        return [{ slug: entry.name, visibility: "public" } satisfies DeckMeta];
      }
    });
}

/**
 * The PDFs sitting in `exports/`. Only decks that still exist are listed, so a
 * deleted presentation does not leave a downloadable artefact behind.
 */
function readExports(root: string, decks: readonly DeckMeta[]): PdfEntry[] {
  const dir = join(root, "exports");
  if (!existsSync(dir)) return [];

  const known = new Set(decks.map((deck) => deck.slug));

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".pdf"))
    .flatMap((entry) => {
      const slug = entry.name.slice(0, -".pdf".length);
      if (!known.has(slug)) return [];
      const stat = statSync(join(dir, entry.name));
      return [{
        slug,
        url: `/pdf/${slug}.pdf`,
        bytes: stat.size,
        modified: stat.mtime.toISOString(),
      } satisfies PdfEntry];
    });
}

function moduleSource(entries: readonly PdfEntry[]): string {
  const map = Object.fromEntries(entries.map((entry) => [entry.slug, entry]));
  return `export default ${JSON.stringify(map, null, 2)};\n`;
}

/**
 * Publishes `exports/*.pdf` to the app and, on a production build, copies the
 * PDFs of **public** decks into `dist/pdf/`.
 *
 * Private decks are never copied: the build already drops their code, and their
 * PDFs are the submit-ready artefact, not something to serve.
 *
 * `DECK_LOADER_NO_PDF_COPY=1` (set by `scripts/export.ts`) turns the copy off so
 * exporting a deck does not pay for a full copy every time.
 */
export function pdfManifest(): Plugin {
  let root = process.cwd();
  let copy = false;
  let isBuild = false;

  return {
    name: "deck-loader:pdf-manifest",

    config(_config, env) {
      isBuild = env.command === "build";
      if (isBuild && process.env.DECK_LOADER_NO_PDF_COPY !== "1") {
        copy = true;
      }
      return undefined;
    },

    configResolved(config) {
      root = config.root;
    },

    resolveId(id) {
      return id === PDF_MANIFEST_ID ? RESOLVED_ID : null;
    },

    load(id) {
      if (id !== RESOLVED_ID) return null;
      const decks = readDecks(root);
      const entries = readExports(root, decks);
      // Dev lists everything (including private decks); a build must not even
      // name a private deck's PDF, since the deck itself is not in the bundle.
      const visible = isBuild
        ? entries.filter((entry) => decks.find((deck) => deck.slug === entry.slug)?.visibility === "public")
        : entries;
      return moduleSource(visible);
    },

    configureServer(server: ViteDevServer) {
      const dir = join(root, "exports");

      const handle = (
        req: IncomingMessage,
        res: ServerResponse,
        next: (error?: unknown) => void,
      ): void => {
        const url = (req.url ?? "").split("?")[0] ?? "";
        if (!url.startsWith("/pdf/") && !url.startsWith("/exports/")) return next();

        const name = url.slice(url.lastIndexOf("/") + 1);
        if (!/^[a-z0-9][a-z0-9-]*\.pdf$/.test(name)) return next();

        const file = join(dir, name);
        if (!existsSync(file)) return next();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Cache-Control", "no-store");
        res.end(readFileSync(file));
      };

      server.middlewares.use(handle);

      // A fresh export should appear on the overview page without a restart.
      server.watcher.add(dir);
      const refresh = (file: string) => {
        if (!file.includes(`${dir}`.replaceAll("\\", "/")) && !file.includes(dir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh);
      server.watcher.on("unlink", refresh);
      server.watcher.on("change", refresh);
    },

    closeBundle() {
      if (!copy) return;

      const decks = readDecks(root);
      const entries = readExports(root, decks);
      if (entries.length === 0) return;

      const public_ = new Set(
        decks.filter((deck) => deck.visibility === "public").map((deck) => deck.slug),
      );
      const target = join(root, "dist", "pdf");
      mkdirSync(target, { recursive: true });

      const copied = entries.filter((entry) => public_.has(entry.slug));
      for (const entry of copied) {
        copyFileSync(join(root, "exports", `${entry.slug}.pdf`), join(target, `${entry.slug}.pdf`));
      }
      if (copied.length > 0) {
        this.warn(`pdf manifest: copied ${copied.length} public PDF(s) to dist/pdf`);
      }
    },
  };
}