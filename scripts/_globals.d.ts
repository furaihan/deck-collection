/**
 * Globals published by the export route (`src/routes/export.$slug.tsx`) and read
 * by the exporter and the validator. Kept here so the browser-side declaration
 * in `src/env.d.ts` and the script side agree.
 */
declare global {
  interface Window {
    /** True once fonts, images and two animation frames have settled. */
    __EXPORT_READY__?: boolean;
    /** Number of slides the export page rendered. */
    __EXPORT_SLIDE_COUNT__?: number;
    /** Set when the export page could not prepare itself. */
    __EXPORT_ERROR__?: string;
  }
}

export {};
