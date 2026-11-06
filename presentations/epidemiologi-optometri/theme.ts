/**
 * "Lapangan Data" — the deck's whole visual system.
 *
 * A night-time field readout: near-black green ground, bone ink, one lime
 * signal that means a datum or a finding, and teal that carries structure.
 * Hairline rules do the boxing; nothing is rounded and nothing glows. Barlow
 * Condensed is the instrument voice, Archivo carries the reading copy, Chivo
 * Mono prints the labels and the numbers. Every colour and size the deck uses
 * is declared here.
 */
export const C = {
  /** The field: a dark green-black, never pure black. */
  ground: "#0F1513",
  groundDeep: "#0A0F0D",
  /** A raised readout panel. */
  surface: "#17201D",
  surfaceHigh: "#1D2824",
  /** Bone ink, tinted green so it belongs to the ground. */
  ink: "#EDF2EA",
  inkSoft: "#C3CCC5",
  inkFaint: "#93A39C",
  inkGhost: "#7A8A83",
  /** The signal: a datum, a finding, the live number. */
  lime: "#C6F26A",
  limeDeep: "#9BCB3F",
  limePale: "rgba(198,242,106,0.10)",
  limeLine: "rgba(198,242,106,0.38)",
  /** Structure: context, secondary measures, the quiet side of the diagram. */
  teal: "#6FB3A8",
  tealPale: "rgba(111,179,168,0.10)",
  tealLine: "rgba(111,179,168,0.38)",
  /** Rules and hairlines. */
  rule: "rgba(237,242,234,0.16)",
  ruleSoft: "rgba(237,242,234,0.08)",
  /** Ink on a lime field. */
  onLime: "#0F1513",
} as const;

export const FONT = {
  /** The instrument: headlines, stage names, every large number. */
  display: "'Barlow Deck', 'Arial Narrow', Helvetica, sans-serif",
  /** The reading copy: body, table cells, definitions. */
  text: "'Archivo Deck', 'Helvetica Neue', Arial, sans-serif",
  /** The printed label: sections, folios, keywords, measurements. */
  mono: "'Chivo Deck', ui-monospace, 'Courier New', monospace",
} as const;

/** Type scale. Body copy stays at 28px or more; labels never below 18px. */
export const T = {
  cover: 118,
  display: 82,
  displaySm: 64,
  title: 52,
  lede: 32,
  body: 28,
  small: 24,
  label: 20,
  micro: 18,
  stat: 148,
  statSm: 88,
} as const;

/** The sheet: one grid, identical on all eighteen slides. */
export const G = {
  pad: 120,
  headTop: 48,
  headRule: 96,
  contentTop: 148,
  contentBottom: 956,
  footRule: 992,
  footTop: 1008,
} as const;

export const DECK = "EPIDEMIOLOGI";
export const COURSE = "PROGRAM OPTOMETRI \u00b7 2026";
export const TOTAL = 18;
