/**
 * Strip Twelve — the deck's whole visual system.
 *
 * A 35 mm lecture filmstrip lit from behind: black film base, sprocket rails
 * that double as the progress track, edge printing in the gutters, and one lit
 * frame per slide. Every colour, gradient and type stack the deck uses is
 * declared here; slides never hard-code a value they could inherit.
 */
export const C = {
  /** The strip itself, and the black that surrounds every frame. */
  film: "#0D0E10",
  filmDeep: "#070809",
  filmEdge: "#1A1C1F",
  /** Perforations: behind the gate, at the gate, still to come. */
  holePast: "#45433C",
  holeNext: "#191B1E",
  holeGate: "#FFC24A",
  holeGateHigh: "#FFD98A",
  holeGateLow: "#C97F14",
  /** The lit frame: warm film base, never pure white. */
  paper: "#F4EFE6",
  paperHigh: "#FFFCF4",
  paperShade: "#EFE6D4",
  paperLast: "#E3D9C6",
  /** Ink on the frame. */
  ink: "#141518",
  inkHigh: "#2B2D31",
  inkLow: "#0A0B0D",
  inkSheet: "#1B1D21",
  inkSheetLow: "#0B0C0E",
  inkSoft: "#41423F",
  inkFaint: "#6D685E",
  /** Signals, used sparingly and always for meaning. */
  amber: "#E39A2E",
  /** The same signal as a glyph on paper: 5.07:1. Amber fill stays #E39A2E. */
  amberText: "#8E5A0E",
  amberHigh: "#F6C97F",
  amberLow: "#BF7A18",
  amberSoft: "#F2C879",
  teal: "#2F8C99",
  /** Text on ink plates. */
  onInk: "#ADA89B",
  onInkStrong: "#BDB8AA",
  rule: "rgba(20,21,24,0.20)",
  ruleSoft: "rgba(20,21,24,0.10)",
} as const;

/** Light on the frame: warm falloff, layered so the sheet has depth. */
export const LIT = {
  glass:
    "radial-gradient(120% 90% at 18% -10%, rgba(255,252,242,0.95) 0%, rgba(255,248,232,0.35) 34%, rgba(244,239,230,0) 62%), radial-gradient(90% 70% at 96% 104%, rgba(196,170,120,0.22) 0%, rgba(244,239,230,0) 58%), linear-gradient(168deg, #F7F3EA 0%, #F1EADA 46%, #E9E0CD 100%)",
  ink:
    "radial-gradient(120% 100% at 22% -20%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #16181B 0%, #101113 60%, #0A0B0C 100%)",
  /** The raised plate: warm paper with a hairline of light along the top edge. */
  plate:
    "linear-gradient(168deg, #FFFCF4 0%, #F8F2E6 54%, #EFE6D4 100%)",
  plateFlat: "rgba(255,252,244,0.55)",
  plateInk:
    "linear-gradient(158deg, #1B1D21 0%, #131417 58%, #0B0C0E 100%)",
  plateInkHigh:
    "linear-gradient(158deg, #1E2025 0%, #141518 58%, #0B0C0E 100%)",
  /** A measured bar: ink for the field, amber for the argued datum. */
  bar: "linear-gradient(180deg, #2B2D31 0%, #141518 62%, #0A0B0D 100%)",
  barHot: "linear-gradient(180deg, #F6C97F 0%, #E39A2E 55%, #BF7A18 100%)",
  gate: "linear-gradient(180deg, #FFD98A 0%, #FFC24A 52%, #C97F14 100%)",
  /** Shadows, declared once so a plate cannot invent its own elevation. */
  plateShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 18px 34px rgba(58,46,28,0.16), 0 3px 8px rgba(58,46,28,0.10)",
  inkShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 24px 44px rgba(20,21,24,0.40)",
  deepInkShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 28px 50px rgba(20,21,24,0.44)",
  flatShadow: "0 0 0 1px rgba(20,21,24,0.13)",
  barShadow: "0 10px 20px rgba(20,21,24,0.26), 0 1px 0 rgba(255,255,255,0.13) inset",
  barHotShadow: "0 10px 20px rgba(180,120,30,0.32), 0 1px 0 rgba(255,255,255,0.5) inset",
  frameShadow: "0 1px 0 rgba(255,255,255,0.16) inset, 0 0 0 1px rgba(0,0,0,0.55), 0 40px 90px rgba(0,0,0,0.70), 0 10px 24px rgba(0,0,0,0.55)",
  /** The stock surface the whole sheet sits on. */
  base: "radial-gradient(140% 110% at 50% 50%, #1A1C1F 0%, #0D0E10 42%, #070809 100%)",
} as const;

export const FONT = {
  display: "'Barlow Deck', 'Arial Narrow', Helvetica, sans-serif",
  text: "'Archivo Deck', 'Helvetica Neue', Arial, sans-serif",
  mono: "'Chivo Deck', ui-monospace, 'Courier New', monospace",
  /** Alias kept so frames written before the rename still compile. */
  body: "'Archivo Deck', 'Helvetica Neue', Arial, sans-serif",
} as const;

/** The deck's own count: the rails carry one perforation per frame. */
export const TOTAL = 20;

/** The lit frame's box on the 1920x1080 sheet. */
export const FRAME = {
  left: 116,
  top: 92,
  width: 1688,
  height: 896,
  padX: 92,
  padTop: 54,
  padBottom: 40,
} as const;

/** The film's edge printing, repeated on the gutters of every frame. */
export const CODE = "K.O DISPEN II · S.3 · 26-1";