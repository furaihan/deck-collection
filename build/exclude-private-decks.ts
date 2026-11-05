import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";

interface DeckMeta {
  slug: string;
  visibility: "public" | "private";
  /** The parsed presentation.json, inlined for the eager metadata map. */
  json: string;
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
        const raw = readFileSync(metaPath, "utf8");
        const parsed = JSON.parse(raw) as { visibility?: unknown };
        return [
          {
            slug: entry.name,
            visibility: parsed.visibility === "private" ? "private" : "public",
            json: JSON.stringify(parsed),
          } satisfies DeckMeta,
        ];
      } catch {
        // A broken deck reports itself at runtime; it is public by default.
        return [{ slug: entry.name, visibility: "public", json: "{}" } satisfies DeckMeta];
      }
    });
}

// Vite's own syntax, including the trailing comma both call sites use.
const GLOB =
  /import\.meta\.glob<([^>]*)>\(\s*"([^"]+)"\s*(?:,\s*(\{[^}]*\}))?\s*,?\s*\)/g;

/**
 * Production builds must not merely hide private decks: their existence must
 * never enter the bundle.
 *
 * Vite's `import.meta.glob` compiles every match into the output — the lazy one
 * into reachable dynamic imports, the eager one into the metadata map — and
 * Rollup cannot see through the registry's runtime `visibility` filter. This
 * plugin runs before Vite's glob transform and replaces both globs with explicit
 * maps of the public decks only, inlining the metadata for the eager one. Private
 * files are then referenced by nothing and never emitted, and a private deck's
 * title never lands in a chunk.
 */
export function excludePrivateDecks(): Plugin {
  let root = process.cwd();

  return {
    name: "deck-loader:exclude-private-decks",
    apply: "build",
    enforce: "pre",

    configResolved(config) {
      root = config.root;
    },

    transform(code, id) {
      if (!id.endsWith("presentations/registry.ts") && !id.endsWith("presentations\\registry.ts")) {
        return null;
      }

      const publicDecks = readDecks(root).filter((deck) => deck.visibility === "public");
      let replaced = 0;

      const next = code.replace(
        GLOB,
        (match, _generic: string, pattern: string, options: string | undefined) => {
          const star = pattern.indexOf("*");
          if (star < 0) return match;

          const prefix = pattern.slice(0, star);
          const suffix = pattern.slice(pattern.indexOf("*") + 1);
          const eager = (options ?? "").includes("eager");

          replaced += 1;

          const entries = publicDecks
            .map((deck) => {
              const specifier = `${prefix}${deck.slug}${suffix}`;
              // The eager glob is consumed synchronously, so its values are
              // inlined rather than turned back into imports.
              return eager
                ? `  "${specifier}": { default: ${deck.json} },`
                : `  "${specifier}": () => import("${specifier}"),`;
            })
            .join("\n");

          return `{\n${entries}\n}`;
        },
      );

      if (replaced === 0) return null;

      this.warn(
        `private-deck exclusion: ${publicDecks.length} public deck(s) bundled` +
          (publicDecks.length ? ` (${publicDecks.map((deck) => deck.slug).join(", ")})` : ""),
      );

      return { code: next, map: null };
    },
  };
}
