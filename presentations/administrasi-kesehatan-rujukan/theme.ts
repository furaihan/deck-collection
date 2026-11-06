/**
 * "Berkas Rujukan" — the deck's whole visual system.
 *
 * A rujukan form with its pink carbon copy: warm paper ground, a hairline grid
 * that behaves like a printed form, one rose that means *referral* and never
 * decorates, and rose-tinted panels wherever the deck hands over a case or an
 * open question. Instrument Serif carries the voice (headlines, the Perpres
 * definition, every large number); Public Sans carries the evidence. Every
 * colour and size the deck uses is declared here.
 */
export const C = {
  /** The form itself: warm paper, never pure white. */
  ground: "#F8F1ED",
  sheet: "#FFFCFA",
  sheetRule: "#EFE3DD",
  /** Ink, tinted violet so it belongs to the rose rather than to grey. */
  ink: "#241820",
  inkSoft: "#4E3C45",
  inkFaint: "#6B5660",
  inkGhost: "#8C7A83",
  /** The carbon copy. Rose is a signal: referral, case, question, the live datum. */
  pink: "#B01E5C",
  pinkDeep: "#7C1338",
  pinkPale: "#FBEEF3",
  pinkLine: "#E7C3D2",
  pinkLight: "#F0A6C4",
  /** Marks, used once each and always for meaning. */
  teal: "#0E6B5E",
  tealPale: "#E9F2EF",
  amber: "#96600F",
  amberPale: "#F8EEDE",
  /** Structure. Rules do the boxing; nothing in this deck is a rounded card. */
  rule: "#DCCFC9",
  ruleSoft: "rgba(36,24,32,0.12)",
  ruleHair: "rgba(36,24,32,0.07)",
  /** Text on the two inverted grounds. */
  onInk: "#FDF6F3",
  onInkSoft: "#DCC9D1",
  onInkFaint: "#B49AA5",
  onPink: "#FFF4F8",
  onPinkSoft: "#FBDDE9",
  onPinkFaint: "#F7CBDA",
  onPinkRule: "rgba(255,244,248,0.30)",
} as const;

export const FONT = {
  /** The voice: headlines, the Perpres definition, every large number. */
  display: "'Newsreader Deck', 'Iowan Old Style', Georgia, serif",
  /** The evidence: running copy, labels, tables, captions. */
  text: "'Public Sans Deck', 'Segoe UI', Helvetica, Arial, sans-serif",
} as const;

/** Type scale. Nothing below 17px ships; body copy stays at 26px or more. */
export const T = {
  cover: 112,
  display: 84,
  displaySm: 66,
  quote: 42,
  lede: 32,
  body: 27,
  small: 23,
  label: 19,
  micro: 17,
  stat: 100,
  statSm: 66,
} as const;

/** The sheet: one grid, identical on all twenty slides. */
export const G = {
  pad: 120,
  headTop: 54,
  headRule: 112,
  contentTop: 176,
  contentBottom: 962,
  footRule: 1004,
  footTop: 1020,
} as const;

export const DECK = "Administrasi Kesehatan & Sistem Rujukan";
export const COURSE = "Administrasi Kesehatan \u00b7 Optometri Semester 3";
export const TOTAL = 20;
