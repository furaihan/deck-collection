/// <reference types="vite/client" />

/**
 * Slide PDFs that exist on disk, published by the `deck-loader:pdf-manifest`
 * Vite plugin. Dev serves them from `/exports/`, a build copies the public
 * ones to `/pdf/`.
 */
declare module "virtual:pdf-manifest" {
  const manifest: Record<
    string,
    { slug: string; url: string; bytes: number; modified: string }
  >;
  export default manifest;
}

interface Window {
  /** Set by `/export/$slug?export=1` once fonts, images and layout settle. */
  __EXPORT_READY__?: boolean;
  /** Number of slides the export page rendered. */
  __EXPORT_SLIDE_COUNT__?: number;
  /** Set when the export page could not prepare itself. */
  __EXPORT_ERROR__?: string;
}
