import pdfManifest from "virtual:pdf-manifest";

/**
 * PDFs are produced by `bun run export` and published by the
 * `deck-loader:pdf-manifest` Vite plugin: dev serves them from `exports/`, a
 * build copies the public ones to `dist/pdf/`.
 */
export interface SlidePdf {
  slug: string;
  url: string;
  bytes: number;
  modified: string;
}

export function findSlidePdf(slug: string): SlidePdf | undefined {
  return pdfManifest[slug];
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
