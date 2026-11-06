# Berkas Rujukan

The deck's visual system. One deck, `presentations/administrasi-kesehatan-rujukan`,
20 sheets, 1920x1080, read mode: a lecture shown on a projector and kept afterwards
as the student's revision sheet.

## World

The lecture is a **rujukan form with its pink carbon copy**: a printed referral
sheet on warm paper, ruled into a head, a content field with crop marks, and a
foot line. Form grammar carries meaning here — every rujukan is a handoff, and
the deck's whole argument (optometrist → Puskesmas → hospital → BPJS) is a chain
of handoffs. The rose is the carbon copy: wherever the deck hands something over
(a case, a question, a definition that must be memorised) the sheet turns rose.

Not a white slide with a title and three bullets: the sheet has a fixed grid,
printed folio, and crop marks; the rose plates are its one inversion.

## Palette

Five colours, each doing a job. Declared once in `theme.ts`.

| Token   | Hex       | Job                                                         |
| ------- | --------- | ----------------------------------------------------------- |
| Ground  | `#F8F1ED` | The paper. Warm, never white                                |
| Ink     | `#241820` | Text, rules, bar fields. Tinted violet, not neutral grey     |
| Rose    | `#B01E5C` | Signal: referral, case, open question, the live datum        |
| Rose deep | `#7C1338` | Rose text on paper where 5.47:1 is not enough              |
| Teal    | `#0E6B5E` | Reserve mark: the green cross's own colour, read once, never filled |

Roles: `paper` and `ink` grounds are the lecture; `pink` is the carbon copy and
carries the four sheets where the student must stop and think. Secondary text is
`#4E3C45` (9.14:1 on ground) and `#6B5660` (6.01:1). Nothing is a gradient.

**Green is never used as a fill** — it is the Bakti Husada cross's colour and is
reserved for one hairline on the emblem sheet. Everything else about the emblem is
drawn as geometry, never as a reproduction.

## Type

- **Newsreader** (self-hosted, `assets/newsreader-*.woff2`, roman + italic) carries
  the voice: sheet headlines, the Perpres definition, every large number, the
  closing sentences. A text serif with real editorial weight, not a display
  serif: at 84px it reads as a printed report, which is the point.
- **Public Sans** (self-hosted variable, `assets/public-sans-var.woff2`) carries the
  evidence: running copy, field labels, tables, foot lines.

Scale in use: cover 112; sheet title 84 (66 where a right-hand note shares the
line; 64 on the closing plate); definition 53; quote 42; lede 32; body 27; table
and row copy 21–29; labels 19; captions and notes 17–19. Nothing below 17px ships.

Tracking: labels `0.16em` uppercase; display type `-0.012em`; numbers tabular.

## Composition

The deck is **lean by ruling**: a sheet carries a headline, a set of values, and
at most one sentence. Prose was cut back until only the nouns and numerals that
carry meaning survive. The rule: if a line can be replaced by a number, a bar, or
a cell, it is.

One grid on all twenty sheets (`G` in `theme.ts`): 120px side margins, head rule at
112px, content field 176–962, foot rule at 1004. The field carries crop marks in
its four corners and a centre hairline — suppressed only where a diagram crosses
it (sheets 07, 11, 20).

Two habits repeat:

- **A left column names, the right column shows.** Definitions sit opposite their
  consequence; lists opposite the rule they obey.
- **A rule above each row, never a box.** Cards are banned; every grouping is a
  `border-top` on a row, or a rose panel when the content is a case or a question.

Rose panels appear exactly four times (04, 06, 16, and the cover's lampiran), and
always for material the student is meant to answer rather than read.

## Motion

None. The deck is captured as a settled frame for PDF; nothing moves.

## Do not

- Do not round a corner, add a shadow, or use a gradient. Rules do the boxing.
- Do not colour a value in a slide that could inherit it from `theme.ts`.
- Do not put green anywhere except the one hairline on the emblem sheet.
- Do not add a numbering system the source does not support (Sheet 11 says the
  source's arrow order is unclear; keep that note).
