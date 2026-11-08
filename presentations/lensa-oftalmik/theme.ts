/**
 * "Meja Kerja Optik" — the deck's whole visual system.
 *
 * The scene is a dispensing lab workbench under a long north window: chalk
 * drawing paper for the sheets you read, deep petrol for the sheets that show a
 * process or a derivation, and two signals only — amber for the measured value,
 * clay for the thing that goes wrong (scatter, aberration, wear). Lenses are
 * always drawn in section: an arc, an optical axis, a focal point.
 *
 * The five user colours are the whole palette. `tint*` below is not palette: it
 * is the data channel for slide 08, where a metal oxide's actual colour is the
 * fact being taught.
 */
export const C = {
  /** The ground of a dark sheet and the ink of a light one. */
  petrol: "#0C3B3D",
  petrolDeep: "#082F31",
  teal: "#125052",
  tealHigh: "#175E60",
  /** Drawing paper, tinted from the same green so it belongs to the ground. */
  chalk: "#F4F0E6",
  chalkDeep: "#E9E1D2",
  /** Ink on chalk. */
  ink: "#0C3B3D",
  inkSoft: "#315A59",
  inkFaint: "#4C6F6D",
  /** Ink on petrol. */
  onDark: "#F4F0E6",
  onDarkSoft: "#BFCBC3",
  onDarkFaint: "#93A9A3",
  /** The measured value: one amber, used for the number that matters. */
  amber: "#F0B357",
  /** Amber as ink on chalk: the same hue, darkened to stay legible at 18px. */
  amberDeep: "#8E5C15",
  /** The thing that goes wrong: dispersion, aberration, wear. */
  clay: "#F08A63",
  /** Clay as ink on chalk: darkened for the same reason. */
  clayDeep: "#A85030",
  /** Hairlines, both grounds. */
  rule: "rgba(12,59,61,0.24)",
  ruleSoft: "rgba(12,59,61,0.12)",
  ruleDark: "rgba(244,240,230,0.24)",
  ruleDarkSoft: "rgba(244,240,230,0.10)",
  /** Metal-oxide tints (slide 08 only): the fact, not the palette. */
  tintCobalt: "#3E6E96",
  tintChrome: "#5B7F4B",
  tintMagnesium: "#7A6A9B",
  tintUranium: "#C4AE3E",
  tintIron: "#7A5340",
  tintSilver: "#8E9188",
} as const;

export const FONT = {
  /** Headlines and reading copy: one grotesk, two weights. */
  display: "'Familjen Deck', 'Helvetica Neue', Arial, sans-serif",
  text: "'Familjen Deck', 'Helvetica Neue', Arial, sans-serif",
  /** Every number, label and folio: wide, tabular, machine-set. */
  mono: "'Martian Deck', ui-monospace, 'Courier New', monospace",
} as const;

/** Type scale. Body stays at 30px or more; captions never below 18px. */
export const T = {
  cover: 148,
  h1: 68,
  h1Sm: 60,
  lede: 38,
  body: 30,
  small: 26,
  caption: 22,
  micro: 18,
  stat: 148,
  statSm: 104,
  data: 30,
} as const;

/** The sheet: one grid, identical on all twenty slides. */
export const G = {
  pad: 96,
  top: 68,
  headRule: 116,
  fieldTop: 152,
  fieldBottom: 956,
  ruleY: 986,
  footY: 1004,
} as const;

export const PART = {
  asal: "Bagian I \u00b7 Asal dan bahan",
  optik: "Bagian II \u00b7 Cahaya dan bahan",
  fisik: "Bagian III \u00b7 Kekuatan dan permukaan",
  plastik: "Bagian IV \u00b7 Lensa plastik",
} as const;

export const DECK = "Lensa Oftalmik";
export const COURSE = "Dispensing II \u00b7 Optometri";
export const TOTAL = 20;
