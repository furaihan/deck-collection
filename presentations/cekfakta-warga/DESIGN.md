# Design

The visual system of the **CekFakta Warga** deck. The shell's own DESIGN.md
covers the app, not this deck: slides inherit nothing from it.

## Direction contract

**THESIS.** A grant proposal read the way a fact-checker reads a claim: every
number sits in a ruled field with its source beside it, and the deck's own
structure is the product's five checks. The category default it refuses is the
proposal deck as a stack of equal icon-heading-text cards.

**OWN-WORLD.** Two paper stocks — void `#18232F` for the argument, mist
`#C9E4D5` for the tables — with hairlines instead of boxes, mono field labels,
and a single signal: the emerald green of a check that has been made. Type is
narrow condensed headlines (Barlow Condensed) over a neutral workhorse
(Archivo) and a field-label mono (Chivo Mono). With all content removed, the
system is still recognisable as an annotated form: ruled columns, a folio in the
foot, a checkbox that has not been ticked yet.

**STORY.** The reader learns that clarifications arrive too late (the numbers),
that the missing thing is practice (the gap), that five checks are the practice
(the product), and that the team can measure whether it worked (objectives,
schedule, budget, risk). They end on the ask: US$7.890 for 80 people, 40 cases,
and evidence.

**FIRST VIEWPORT.** Void sheet. Course line and a hairline at the top; the title
`CekFakta Warga` at 196px occupying the left two-thirds; a jade subtitle beneath
it; three ruled fact fields (durasi, penerima, diminta) anchored low; and on the
right, a full-height ruled checklist of the five checks, each with an empty box.
Team and date sit under a hairline at the foot.

**FORM.** The grant dossier under examination — candidate 4 of the grounded list,
drawn from the form and audit-sheet tradition of Indonesian civic paperwork.
`seed: 4e6e8b6f3dd10a73`.

**FINISH.** unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.

## Palette

All five supplied colours do a job at **area scale** — a stock, a field, or a
bar — never as trim. Defined in `theme.ts`; no slide file holds a hex value.

| Name | Hex | Role in the deck |
| --- | --- | --- |
| Void Black | `#18232F` | **Ground — argument.** Cover, problem, schedule, risk. Also the ink inside every jade field |
| Arcane Blue | `#263D4C` | **Ground — specification.** The build sheet (04). Also the ink of every mist sheet, and secondary ink inside jade fields |
| Elder Mist | `#C9E4D5` | **Ground — reading.** Objective, budget, impact sheets. Also the ink of every dark sheet |
| Sorceress Jade | `#75B99D` | **Field — the lit area.** The cover annex; the Komdigi band (02); the post-decision band (03); the ask block (07); the impact panel (09) |
| Wild Hunt Emerald | `#368A78` | **Signal — the work itself.** Gantt bars, budget bars, matrix tints, ticks. Fills on dark stocks |
| Emerald, deepened | `#2A6B5C` | A tone of emerald, not a sixth colour: fills carrying 18–22px text, and emphasis text on mist |

### How the five spread across the sheets

| Sheet | Ground | Jade field | Emerald signal |
| --- | --- | --- | --- |
| 01 Cover | Void | Annex, full height | — |
| 02 Masalah | Void | Komdigi band | — |
| 03 Solusi | Mist | Post-decision band | Rules |
| 04 Build | **Arcane** | — | Four blocks |
| 05 Tujuan | Mist | — | Footnote band |
| 06 Jadwal | Void | — | Gantt bars |
| 07 Anggaran | Mist | Ask block | Budget bars |
| 08 Risiko | Void | — | Matrix tints |
| 09 Dampak | Mist | Impact panel | — |
| 10 Penutup | Void | Ask field | — |

Three stocks carry the deck's structure; jade takes one deliberate area on seven
of the ten sheets; emerald is the deck's only fill.

### Ink roles

`inkOn(ground)` returns one pair per stock: `accent` (text and icons) and
`signal` (fills and areas). They differ only where contrast forces it — on
mist, emphasis text takes `emeraldDeep` while bars stay vivid emerald; on
arcane, emerald is 2.73:1 so areas take jade instead.

Secondary text is tinted from each stock rather than greyed: `#9FC9B8` /
`#6E9C8E` on void, `#7FB3A2` on arcane, `#33605A` / `#4A6672` on mist.
Measured in the render: body ink on void 11.8:1, on arcane 8.4:1, on mist 8.4:1;
void on jade 6.96:1; arcane on jade 4.95:1; mist on `emeraldDeep` 4.63:1.

There is no warm colour in the deck — a risk matrix that would normally use red
earns its levels from emerald opacity instead.

### Colour dosage

Colour is spent on **regions**, never scattered as accents: a jade field owns a
whole band or panel, emerald owns every bar and block, and the three stocks are
the deck's structure. A field inverts its own ink, so a jade band reads as a
coloured page bound into the dossier rather than a card laid on top of one.

The one place colour carries emphasis alone is the ask: on the cover and on 07,
**Diminta** is the only filled block, so attention lands there by fill rather
than by size — the headline still owns the sheet.

## Type

- **Barlow Condensed** 600/700 — headlines and every figure. Tight leading
  (0.84 on figures, 0.98 on headlines), tracking near zero: the narrow face
  already carries the tension.
- **Archivo** 400/500/600 — reading copy. Body 30px, secondary 21–28px.
- **Chivo Mono** 400/500 — field labels, sources, folios, tabular amounts,
  uppercase with 0.14em tracking.

Scale: cover 196px; headline 84–92px; lede 34–38px; body 30px; small 26px;
caption 20–22px; field label 18px. Nothing below 18px.

## Sheet

1920x1080. Field 96px from every edge; foot rule at 976; foot text at 992.
Headline at the top-left of the field, content beneath it, and either a ruled
summary line or a note pinned to the bottom of the field so the sheet always
closes.

## Devices

- **Ruled field** — a 1px rule above a value, or a box around an answer
  (the cover's three facts, the closing's ask).
- **Checkbox** — 24–26px, 1px emerald, empty until the reader has checked it.
- **Ruled columns** — five equal columns divided by hairlines with a closing
  rule at the foot; the form's own way to ask five questions at once.
- **Bar from a shared zero** — every amount in the budget drawn against the
  full width, so proportions are read, not computed.
- **Matrix** — probability × impact, tinted by level, with each risk's code in
  its cell and the top four repeated with their mitigations beside it.

## Do not

- Do not colour a slide file: every value comes from `theme.ts`.
- Do not add a sixth colour, a gradient, a shadow, or a rounded corner.
- Do not use an icon as decoration: icons mark a feature, a check, or a risk,
  at 20–26px and 1.6 stroke, always in the accent.
- Do not put a small label above a headline. Section names belong in the foot.