/**
 * Administrasi Kesehatan & Sistem Rujukan — visual system.
 * Warm public-service documentation: soft sand paper, berry ink, coral signal,
 * and tangerine markers for the route from policy to patient.
 *
 * Contrast (measured against the sand sheet, #F7E6D0):
 *   ink 12.6:1 · inkSoft 7.2:1 · inkFaint 5.0:1 · berry 4.9:1
 * Coral is a marker, never type: on sand it reads 2.4:1, so it carries rules,
 * dots, arrows and banners only. Berry carries every accent word and numeral.
 * tangOnDark exists for type on the berry field (large sizes only).
 */
export const C = {
  sand: "#F7E6D0",
  sandDeep: "#EED0AF",
  berry: "#C2184A",
  coral: "#FF5C8A",
  tang: "#FF9F1C",
  tangOnDark: "#FFC566",
  ink: "#442333",
  inkSoft: "#6D3C4D",
  inkFaint: "#7E5566",
  white: "#FFF9F2",
  rule: "rgba(68,35,51,0.22)",
  ruleSoft: "rgba(68,35,51,0.12)",
  coralPale: "rgba(255,92,138,0.14)",
  tangPale: "rgba(255,159,28,0.16)",
  berryPale: "rgba(194,24,74,0.10)",
} as const;

export const FONT = {
  display: "'Barlow Deck', 'Arial Narrow', Helvetica, sans-serif",
  text: "'Archivo Deck', 'Helvetica Neue', Arial, sans-serif",
  mono: "'Chivo Deck', ui-monospace, 'Courier New', monospace",
} as const;

export const T = {
  cover: 116,
  display: 82,
  displaySm: 64,
  title: 54,
  lede: 34,
  body: 28,
  small: 24,
  label: 20,
  micro: 18,
  stat: 128,
} as const;

export const G = {
  pad: 120,
  headTop: 42,
  headRule: 92,
  contentTop: 138,
  contentBottom: 958,
  footRule: 988,
  footTop: 1008,
} as const;

export const DECK = "ADMINISTRASI KESEHATAN";
export const COURSE = "ADMINISTRASI KESEHATAN · OPTOMETRI · 2026";
export const TOTAL = 20;
