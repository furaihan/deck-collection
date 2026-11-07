/**
 * "Pull proof" — the deck's whole visual system.
 *
 * A pre-press proof sheet: cool grey stock, a near-black ink slab where the code
 * is printed, and the two working inks of a two-colour press — riso pink and
 * process blue. Amber is the third ink, used only inside the slab, where it
 * separates numbers and types from strings.
 *
 * Contrast, measured against the stock (#EDEFF2):
 *   ink 15.1:1 · inkSoft 6.8:1 · inkFaint 5.0:1
 *   risoDeep 5.3:1 · process 6.6:1 · amberDeep 5.2:1
 * Riso pink at full strength reads 2.9:1 on stock, so it is a plate, a rule and
 * a mark — never type on paper. Inside the slab it reads 5.4:1 and amber reads
 * 12.3:1, so the code field is where the bright inks live.
 */
import type { HighlightThemeToken } from "@tanstack/highlight/theme";

export const C = {
  /** The sheet: a cool proofing stock, never warm cream. */
  stock: "#EDEFF2",
  /** A tinted panel on the stock. */
  stockDeep: "#DFE3E9",
  /** The ink field the code is printed on. */
  slab: "#12151C",
  /** A row lit inside the slab. */
  slabLit: "#1E2432",
  /** A rule inside the slab. */
  slabRule: "rgba(231,234,241,0.14)",

  /** Type on paper. */
  ink: "#171A21",
  inkSoft: "#4B525E",
  inkFaint: "#5E6673",

  /** Type on the slab. */
  paper: "#F4F6FA",

  /** The signal ink: plates, marks, rules, the numeral badges. */
  riso: "#FF3D7F",
  /** Riso as type on paper (5.3:1). */
  risoDeep: "#C0124B",
  /** Riso inside the slab (5.4:1 against #12151C). */
  risoOnSlab: "#FF3D7F",

  /** Structure: rules, links, the second primary. */
  process: "#2340D6",
  processPale: "rgba(35,64,214,0.10)",
  processLine: "rgba(35,64,214,0.34)",

  /** The third ink, inside the slab only. */
  amber: "#FFCC7A",
  /** Amber as type on paper (5.2:1). */
  amberDeep: "#8A5A00",

  /** Rules on paper. */
  rule: "rgba(23,26,33,0.24)",
  ruleSoft: "rgba(23,26,33,0.10)",
} as const;

export const FONT = {
  /** Display and reading copy: one grotesque, carrying both jobs. */
  display: "'Bricolage Deck', 'Helvetica Neue', Arial, sans-serif",
  text: "'Bricolage Deck', 'Helvetica Neue', Arial, sans-serif",
  /** Labels, measures and code. Never inherited from the shell. */
  mono: "'Azeret Deck', ui-monospace, 'Courier New', monospace",
} as const;

/** Type scale. Body copy stays at 28px or more; captions never below 18px. */
export const T = {
  cover: 104,
  display: 76,
  displaySm: 58,
  title: 42,
  lede: 32,
  body: 28,
  small: 24,
  label: 20,
  micro: 18,
} as const;

/** The sheet: one grid, identical on every slide. */
export const G = {
  pad: 90,
  /** The content field, between the crop marks and the footer rail. */
  top: 152,
  bottom: 944,
  /** Footer rail. */
  footRule: 976,
  footTop: 998,
} as const;

/**
 * The code block's contract. `advance` is the measured width of one glyph of
 * the bundled mono face, in ems — every character, including the space, is
 * exactly 13/20 of the size. The fit rule divides by it.
 */
export const CODE = {
  advance: 0.65,
  size: 30,
  min: 24,
  lineHeight: 1.62,
  padX: 44,
  padY: 36,
  /**
   * The library's complete token record, typed so a missing semantic colour is
   * a compile error rather than a token that prints in the base colour.
   */
  token: {
    token: "#E7EAF1",
    keyword: "#FF8FB0",
    string: "#A9C0FF",
    number: "#FFCC7A",
    type: "#FFCC7A",
    function: "#E7EAF1",
    property: "#C7D2FF",
    operator: "#9AA3B2",
    comment: "#8B93A3",
    literal: "#FFCC7A",
    attr: "#A9C0FF",
    "code-inline": "#FFCC7A",
    command: "#A9C0FF",
    deleted: "#FF8FB0",
    heading: "#A9C0FF",
    inserted: "#A9C0FF",
    link: "#A9C0FF",
    meta: "#8B93A3",
    selector: "#FFCC7A",
    tag: "#FF8FB0",
    variable: "#E7EAF1",
  } satisfies Record<HighlightThemeToken, string>,
} as const;

export const DECK = "DECK LOADER";
export const KICKER = "CODE BLOCKS · TANSTACK HIGHLIGHT";
export const TOTAL = 7;
