import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export interface DeckFiles {
  slug: string;
  dir: string;
  metaPath: string;
  entryPath: string;
  slidesDir: string;
  assetsDir: string;
}

export const PRESENTATIONS_DIR = "presentations";

/** Every directory under `presentations/`, sorted by slug. */
export function listDecks(root = process.cwd()): DeckFiles[] {
  const base = join(root, PRESENTATIONS_DIR);
  if (!existsSync(base)) return [];

  return readdirSync(base, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const dir = join(base, entry.name);
      return {
        slug: entry.name,
        dir,
        metaPath: join(dir, "presentation.json"),
        entryPath: join(dir, "Presentation.tsx"),
        slidesDir: join(dir, "slides"),
        assetsDir: join(dir, "assets"),
      } satisfies DeckFiles;
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function findDeck(slug: string, root = process.cwd()): DeckFiles | undefined {
  return listDecks(root).find((deck) => deck.slug === slug);
}

/** Raw `visibility`, defaulting to public — the same rule the app uses. */
export function readVisibility(deck: DeckFiles): "public" | "private" {
  try {
    const raw = JSON.parse(readFileSync(deck.metaPath, "utf8")) as { visibility?: unknown };
    return raw.visibility === "private" ? "private" : "public";
  } catch {
    return "public";
  }
}

export function mtimeOf(path: string): number {
  try {
    return statSync(path).mtimeMs;
  } catch {
    return 0;
  }
}

/** Newest modification time across a deck's sources, used for staleness. */
export function newestSourceMtime(deck: DeckFiles): number {
  let newest = Math.max(mtimeOf(deck.metaPath), mtimeOf(deck.entryPath));

  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else newest = Math.max(newest, mtimeOf(path));
    }
  };

  walk(deck.slidesDir);
  walk(deck.assetsDir);
  return newest;
}

export class UsageError extends Error {}

export interface TargetSelection {
  slugs: string[];
  all: boolean;
}

/**
 * Reads `<slug>` / `--all` from argv. Unknown flags and unknown slugs are
 * usage errors, so a typo never silently validates nothing.
 */
export function selectTargets(argv: readonly string[]): TargetSelection {
  const decks = listDecks();
  const all = argv.includes("--all");

  if (all) {
    const stray = argv.filter((arg) => arg !== "--all" && !arg.startsWith("-"));
    if (stray.length > 0) {
      throw new UsageError("Use either --all or explicit slugs, not both.");
    }
    return { slugs: decks.map((deck) => deck.slug), all: true };
  }

  const slugs = argv.filter((arg) => !arg.startsWith("-"));
  if (slugs.length === 0) {
    throw new UsageError("Name a presentation, or pass --all.");
  }

  const known = new Set(decks.map((deck) => deck.slug));
  const missing = slugs.filter((slug) => !known.has(slug));
  if (missing.length > 0) {
    throw new UsageError(
      `No such presentation: ${missing.join(", ")}. Available: ${[...known].join(", ") || "(none)"}.`,
    );
  }

  return { slugs: [...new Set(slugs)], all: false };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
