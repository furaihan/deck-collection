---
name: Lensa Oftalmik — Strip Twelve
description: A dispensing lecture presented as one reel of 35 mm film, one lit frame per slide.
colors:
  film-base: "#0D0E10"
  film-deep: "#070809"
  film-edge: "#1A1C1F"
  perforation-unexposed: "#191B1E"
  perforation-past: "#45433C"
  perforation-gate: "#FFC24A"
  frame-paper: "#F4EFE6"
  frame-paper-high: "#FFFCF4"
  frame-paper-shade: "#EFE6D4"
  ink: "#141518"
  ink-soft: "#41423F"
  ink-faint: "#6D685E"
  ink-sheet: "#1B1D21"
  gate-amber: "#E39A2E"
  gate-amber-text: "#8E5A0E"
  gate-amber-high: "#F6C97F"
  gate-amber-low: "#BF7A18"
  on-ink: "#ADA89B"
typography:
  display:
    fontFamily: "Barlow Deck, Arial Narrow, Helvetica, sans-serif"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.014em"
  cover:
    fontFamily: "Barlow Deck, Arial Narrow, Helvetica, sans-serif"
    fontSize: "196px"
    fontWeight: 700
    lineHeight: 0.84
  measure:
    fontFamily: "Barlow Deck, Arial Narrow, Helvetica, sans-serif"
    fontSize: "96px"
    fontWeight: 700
    lineHeight: 0.86
  body:
    fontFamily: "Archivo Deck, Helvetica Neue, Arial, sans-serif"
    fontSize: "29px"
    fontWeight: 400
    lineHeight: 1.52
  body-small:
    fontFamily: "Archivo Deck, Helvetica Neue, Arial, sans-serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.42
  edge-print:
    fontFamily: "Chivo Deck, ui-monospace, Courier New, monospace"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.22em"
  slate:
    fontFamily: "Chivo Deck, ui-monospace, Courier New, monospace"
    fontSize: "15px"
    fontWeight: 400
    letterSpacing: "0.16em"
rounded:
  square: "0px"
  perforation: "2px"
spacing:
  sheet-left: "116px"
  sheet-top: "92px"
  frame-pad-x: "92px"
  frame-pad-top: "54px"
  frame-pad-bottom: "40px"
  block: "26px"
  tight: "14px"
components:
  lit-frame:
    backgroundColor: "{colors.frame-paper}"
    padding: "54px 92px 40px"
    rounded: "{rounded.square}"
  raised-plate:
    backgroundColor: "{colors.frame-paper-high}"
    padding: "22px 26px"
    rounded: "{rounded.square}"
  ink-plate:
    backgroundColor: "{colors.ink-sheet}"
    textColor: "{colors.frame-paper}"
    padding: "24px 26px"
    rounded: "{rounded.square}"
  closing-line:
    backgroundColor: "{colors.frame-paper}"
    textColor: "{colors.ink}"
    padding: "16px 0 0"
  perforation-gate:
    backgroundColor: "{colors.perforation-gate}"
    size: "44px"
    height: "30px"
    rounded: "{rounded.perforation}"
---

# Design

The visual system for the deck at `presentations/lensa-oftalmik/`. It is **deck-local**: the app shell has its own `DESIGN.md` at the repository root, and the two never mix.

## Overview

A lecture is a reel of film lit from behind. Every slide is one frame inside a 35 mm strip: black film base above and below, a perforation rail doing the counting, edge printing in both gutters, and one warm bone-paper frame where the teaching happens.

The frame is the thesis. A slide is not a page with a title and bullets; it is one exposure in a sequence, and its position is physical — the amber perforation crossing the gate is the only part of the chrome that ever changes.

Inside the frame the system is deliberately **lit rather than flat**: the sheet carries a warm radial falloff, content sits on raised plates with a hairline of light along the top edge and a soft drop beneath, and the frame that needs a reversal of rank inverts to an ink plate. Rules still do most of the boxing; elevation is declared once in `LIT` and never improvised.

## Colors

Two grounds, one signal.

| Token | Hex | Job |
| --- | --- | --- |
| Film base | `#0D0E10` | The strip: rails, gutters, everything outside the frame |
| Film edge | `#1A1C1F` | The lit centre of the strip behind the frame |
| Perforation, unexposed | `#191B1E` | The frame has not been reached |
| Perforation, past | `#45433C` | Spent film behind the gate |
| Frame paper | `#F4EFE6` | The lit frame — the only ground content sits on |
| Paper high / shade | `#FFFCF4` / `#EFE6D4` | The top and foot of every raised plate's gradient |
| Ink | `#141518` | Headings, rules, ink plates, primary values |
| Ink sheet | `#1B1D21` | The top of an ink plate's gradient |
| Ink soft / faint | `#41423F` / `#6D685E` | Running text, slate lines, edge printing, captions |
| Gate amber | `#E39A2E` | Fills only: the lit perforation, the argued bar. Never a glyph on paper (2.05:1) |
| Amber text | `#8E5A0E` | The same signal as a glyph on paper (5.07:1) |
| Amber high / low | `#F6C97F` / `#BF7A18` | The lit and shadowed ends of every amber bar and gate |
| On ink | `#ADA89B` | Body copy on an ink plate |

Amber means **this frame is about this number**: the current perforation, the datum a frame argues about, the one bar under discussion. It appears at most twice per frame and is never a background for body text.

## Typography

Three self-hosted faces in `assets/`, loaded by `theme.css`, each with one job.

- **Barlow Deck** (Barlow Condensed 600/700) — headlines, measurement numerals, dates. Leading `0.84–0.92`, tracking `-0.014em`, never below 40 px.
- **Archivo Deck** (400/500/600) — every sentence a student reads. Body 21–31 px, never below 21 px, measure 55–70 characters.
- **Chivo Deck** (Chivo Mono 400/500) — slate lines, edge printing, table heads, tags, source notes. Uppercase, `0.14–0.24em` tracking, 15–21 px. It labels; it never carries a sentence.

The faces were chosen against measured vertical ink extent, not taste: Barlow Condensed (1.20 em) and Chivo Mono (1.19 em) satisfy the repo's text-clipping check at any line-height; Saira Condensed (1.58 em) never can.

## Layout

One sheet, 1920x1080, and one frame box derived from it:

- Frame: `left 116, top 92, width 1688, height 896`; inner padding `54 / 92 / 40`.
- Rails: 92 px bands above and below, **twenty** perforations at an 84 px pitch — 44x30, 2 px radius. Exactly one is lit, and it is perforation *n* on frame *n*: the rail counts the reel one-to-one, so no two frames ever light the same hole.
- Gutters: 116 px each side carrying vertical edge printing — stock code left, frame counter right.
- Inside the frame: slate line at the top, title below it, the argument in the middle, the closing line on a 2.5 px rule at the foot, then the source note.

The invariant across all 20 frames is the slate line, the title position, the closing rule and the gutter printing. What changes is the middle, and it changes structure on purpose: column stack, four-up milestone row, ruled process ladder, vertical column chart, horizontal bar chart, threshold pair, comparison matrix, dark summary.

## Elevation & Depth

Depth is part of the world, not decoration, and it is declared once in `LIT`. It marks **rank**: the one plate a frame argues is raised or inverted, and supporting items stay on rules.

- **The frame** casts `0 40px 90px rgba(0,0,0,0.70)` onto the strip with a hairline top highlight, so it reads as a sheet lying on film.
- **Raised plates** (`LIT.plate` + `LIT.plateShadow`) carry `#FFFCF4 → #EFE6D4` and a soft warm drop — the paper has body.
- **Ink plates** (`LIT.plateInk` + `LIT.inkShadow`) carry a top highlight line and a deeper drop, used for the one thing on a frame that must outrank the paper.
- **Bars** carry their own gradient plus a matching shadow; the amber datum glows warm, the ink field stays matte.
- **Flat panels** use the hairline ring only (`LIT.flatShadow`), for supporting text that must not compete.

Depth is never applied uniformly. A row of equal peers (the four milestones, the mineral/organic pair, the two manufacture routes, the five scratch tests) stays flat on rules; only the item the frame is arguing about is raised or inverted.

Nothing else casts a shadow. A plate never invents its own elevation.

## Shapes

Square corners — `border-radius: 0` on every plate, tag, bar, swatch, table cell and ink plate. The only rounding is the perforation's 2 px, which belongs to the physical object.

Rules are 1 px (`rgba(20,21,24,0.20)`) or soft (`0.10`); the closing line and the table head are 2.5 px. There are no gradients as decoration — every gradient in the deck is either light on paper, the metal of a bar, or the lamp behind the gate. No glass, no glow except the gate and the amber datum, and no icon set: diagrams are authored SVG of optical geometry or drawn from data.

## Components

- **Film** (`Frame.tsx`) — rails, gutters, the lit frame; takes `n`, `section`, `accent`, `foot`, `dark`.
- **Title / Prose / Numeral / Label / Kicker** — the type primitives. `Kicker` is the closing line: one display-face sentence on the frame's bottom rule.
- **Plate** — the raised, flat, ink and amber panels. Every box on a frame is one of these four.
- **Table** — ruled rows, no zebra striping, the argued row lifted into an ink plate.
- **Bars** — horizontal measured bars with a per-datum unit override; `display` is what gets printed.
- **Definition / Fraction / Stat / Stairs** — glossary row, a true stacked fraction, a value with its unit and note, and the process ladder.

## Do's and Don'ts

**Do** light the paper (a flat sheet is the failure mode), keep every plate's elevation coming from `LIT`, print the frame number on the rail and cite it from the summary, set every number a student must remember at 40 px or more, and write the source's uncertainty into the frame's source note when the source hedges.

**Don't** round a corner, invent a fifth shadow, or add a third accent; don't use amber for a decorative fill or for body text; don't set a sentence in Chivo Deck; don't let the chrome change between slides; and don't invent a number the source does not give — an empty field is honest, a plausible figure is not.