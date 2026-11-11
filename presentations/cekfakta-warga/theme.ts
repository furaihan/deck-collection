/**
 * "Lembar Periksa" — the deck's whole visual system.
 *
 * The scene: a grant dossier read at a desk at night, one lamp, the pages
 * printed on three stocks — a deep void sheet for the argument, an arcane sheet
 * for the sheets that are a specification, and a mist sheet for the tables you
 * read closely. Every value that matters sits in a ruled field, the way a form
 * holds an answer.
 *
 * All five supplied colours do a job at area scale, not as trim:
 *   void     — the argument's ground
 *   arcane   — the specification's ground, and the ink of every mist sheet
 *   mist     — the reading ground, and the ink of every dark sheet
 *   jade     — the lit field: the cover annex, emphasis on dark sheets
 *   emerald  — the work: bars, matrix tints, the check that has been made
 *
 * Nothing else is a colour. `emeraldDeep` is a tone of emerald (not a sixth
 * colour): the vivid emerald only reaches 3.07:1 on mist, so text there takes
 * the deepened tone.
 */
export const C = {
  /** The deep stock: the argument, the schedule, the risk. */
  void: "#18232F",
  /** The mid stock: the specification sheets. */
  arcane: "#263D4C",
  /** The light stock: the tables you read closely. */
  mist: "#C9E4D5",
  /** The lit field — emphasis, and the cover annex. */
  jade: "#75B99D",
  /** The work: fills, bars, ticks. */
  emerald: "#368A78",
  /** A tone of emerald, for text on mist. */
  emeraldDeep: "#2A6B5C",

  /** Ink on the void stock. */
  onVoid: "#C9E4D5",
  onVoidSoft: "#9FC9B8",
  onVoidFaint: "#6E9C8E",
  /** Ink on the arcane stock. */
  onArcane: "#C9E4D5",
  onArcaneSoft: "#9FC9B8",
  onArcaneFaint: "#7FB3A2",
  /** Ink on the mist stock. */
  onMist: "#263D4C",
  onMistSoft: "#33605A",
  onMistFaint: "#4A6672",

  /** Hairlines, one pair per stock. */
  ruleVoid: "rgba(201,228,213,0.22)",
  ruleVoidSoft: "rgba(201,228,213,0.11)",
  ruleArcane: "rgba(201,228,213,0.26)",
  ruleArcaneSoft: "rgba(201,228,213,0.14)",
  ruleMist: "rgba(38,61,76,0.24)",
  ruleMistSoft: "rgba(38,61,76,0.12)",
} as const;

export const FONT = {
  /** Headlines and every figure: tall, narrow, printed like a form's heading. */
  display: "'Barlow Condensed', 'Arial Narrow', sans-serif",
  /** Reading copy. */
  text: "'Archivo', 'Helvetica Neue', Arial, sans-serif",
  /** Field labels, sources, folios, tabular values. */
  mono: "'Chivo Mono', ui-monospace, 'Courier New', monospace",
} as const;

/** Type scale. Body never below 30px; captions never below 18px. */
export const T = {
  cover: 196,
  h1: 92,
  h1Sm: 84,
  h2: 56,
  lede: 36,
  body: 30,
  small: 26,
  caption: 22,
  micro: 18,
  stat: 120,
  statSm: 88,
  total: 64,
} as const;

/** The sheet: one grid, identical on all ten slides. */
export const G = {
  pad: 96,
  top: 96,
  fieldH: 856,
  footRule: 976,
  footY: 992,
} as const;

export const DECK = "CekFakta Warga";
export const COURSE = "IT Project Management \u00b7 S2 Informatika AMIKOM Yogyakarta";
export const TOTAL = 10;
