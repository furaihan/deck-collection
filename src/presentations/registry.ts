import type { PresentationEntry, SlideList } from "./types";
import { isVisibleInBuild, parseMeta } from "./meta";

/**
 * Discovery is the filesystem. Vite resolves these globs at build time and
 * invalidates them on add/remove in dev, so a folder appearing under
 * `presentations/` is the only registration step.
 */

const metaModules = import.meta.glob<{ default: unknown }>(
  "../../presentations/*/presentation.json",
  { eager: true },
);

const slideModules = import.meta.glob<{ default: SlideList }>(
  "../../presentations/*/Presentation.tsx",
);

/** `presentations/foo/presentation.json` -> `foo`. */
const SLUG = /presentations\/([^/]+)\/(?:presentation\.json|Presentation\.tsx)$/;

function slugOf(path: string): string | null {
  return SLUG.exec(path)?.[1] ?? null;
}

export interface InvalidPresentation {
  slug: string;
  title: string;
  error: string;
}

export interface Library {
  entries: PresentationEntry[];
  invalid: InvalidPresentation[];
}

const isProd = import.meta.env.PROD;

function buildLibrary(): Library {
  const entries: PresentationEntry[] = [];
  const invalid: InvalidPresentation[] = [];

  for (const [path, mod] of Object.entries(metaModules)) {
    const slug = slugOf(path);
    if (!slug) continue;

    const parsed = parseMeta(slug, mod.default);
    if (!parsed.ok) {
      invalid.push({ slug, title: slug, error: parsed.error });
      continue;
    }

    const record = parsed.record;

    // Production drops private decks entirely: their chunk is never imported,
    // so it never enters the bundle as a reachable module.
    if (!isVisibleInBuild(record, isProd)) continue;

    const loaderPath = Object.keys(slideModules).find((key) => slugOf(key) === slug);
    const load = loaderPath ? slideModules[loaderPath] : undefined;

    if (!load) {
      invalid.push({
        slug,
        title: record.title,
        error: `No Presentation.tsx found beside presentation.json in "${slug}".`,
      });
      continue;
    }

    entries.push({ ...record, load });
  }

  entries.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return { entries, invalid };
}

const library = buildLibrary();

export const presentationEntries: readonly PresentationEntry[] = library.entries;
export const invalidPresentations: readonly InvalidPresentation[] = library.invalid;

export function findEntry(slug: string): PresentationEntry | undefined {
  return presentationEntries.find((entry) => entry.slug === slug);
}

export const isProductionBuild = isProd;
