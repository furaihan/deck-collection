/**
 * The presentation contract, in one editable file.
 *
 * Everything an AI agent is allowed to import into a slide is listed here, so
 * widening the contract is a one-line change instead of a hunt through the
 * validator. `scripts/validate.ts` reads this file; nothing in the app does.
 */
export const presentationsConfig = {
  /**
   * Package specifiers a slide file may import. Relative imports inside the
   * same presentation directory are always allowed; everything else is a
   * validator error ("ask the user before adding dependencies").
   *
   * A subpath is allowed when its first segment matches, so `react-dom/client`
   * needs only `react-dom`.
   */
  allowedImports: ["react", "react-dom", "lucide-react"],

  /**
   * shadcn / app-shell theme tokens a slide must never reference. Slides are
   * drawn on a blank sheet; the shell palette must not leak into a deck.
   */
  bannedThemeTokens: [
    "background",
    "foreground",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "border",
    "input",
    "ring",
    "radius",
    "sidebar",
    "chart-1",
    "chart-2",
    "chart-3",
    "chart-4",
    "chart-5",
  ],

  /** CSS units that resolve against a viewport instead of the 1920x1080 sheet. */
  bannedUnits: ["vh", "vw", "vmin", "vmax", "dvh", "dvw", "svh", "svw", "lvh", "lvw"],

  /** Tailwind utilities that mean "the viewport". */
  bannedUtilities: ["h-screen", "w-screen", "min-h-screen", "max-h-screen", "min-w-screen", "max-w-screen"],

  /** Image assets above this size are a warning (they end up in the PDF). */
  maxImageBytes: 1024 * 1024,

  export: {
    width: 1920,
    height: 1080,
    /** How long the page gets to set `window.__EXPORT_READY__`. */
    readyTimeoutMs: 30_000,
    /** Above this, the PDF is awkward to upload to an LMS. Warning only. */
    maxPdfBytes: 20 * 1024 * 1024,
  },

  validate: {
    /** Elements may be this far outside the canvas before it counts. */
    canvasTolerancePx: 1,
    /** How much text may be clipped before it is reported. */
    clipTolerancePx: 4,
    timeoutMs: 30_000,
  },
} as const;

export type PresentationsConfig = typeof presentationsConfig;
