# Epidemiologi — Pola, Penyebab, Tindakan

The deck's own visual system. The app shell's `DESIGN.md` is not covered here.

## World

A night-time field readout: an instrument panel carried into a dark room, its
ground a green-black, its ink bone, one lime signal marking every datum that
matters. The deck refuses the white lecture slide; its unit is the population,
drawn as a ten-by-ten field of cells with twenty lit.

## Palette

| Role      | Hex                      | Job                                       |
| --------- | ------------------------ | ----------------------------------------- |
| Ground    | `#0F1513`                | the sheet, never pure black               |
| Panel     | `#17201D`                | a raised readout, one per slide at most   |
| Ink       | `#EDF2EA`                | headlines and body                        |
| Soft ink  | `#C3CCC5`                | running copy                              |
| Faint ink | `#93A39C`                | captions and secondary labels             |
| Signal    | `#C6F26A`                | a datum, a finding, the live number       |
| Structure | `#6FB3A8`                | the quiet side of a diagram, list bullets |
| Rule      | `rgba(237,242,234,0.16)` | hairlines                                 |

Rules: lime is a signal, never decoration. Teal only carries structure. No
colour outside this file. On the ground, ink measures about 16:1, lime 14:1,
teal 7.6:1.

## Type

- **Barlow Condensed** 600/700 — headlines, stage names, large numbers.
- **Archivo** 400/500/600 — body, definitions, table cells.
- **Chivo Mono** 400/500 — section labels, folios, keywords, measurements.

All three are self-hosted from `assets/` with `@font-face`; no CDN. Scale:
cover 118, display 82, title 52, lede 32, body 28, small 24, label 20, micro 18,
stat 148.

## Composition

- 1920x1080, 120px side margins. Head rail at 48, rule at 96, content 148–956,
  foot rail at 1008.
- The head carries the section and the folio; the foot carries the course, an
  eighteen-tick progress rail, and the deck name.
- Every content slide ends with a lime rule and one takeaway sentence.
- Square corners everywhere. Hairlines do the boxing; no shadows, no rounded
  cards.
- Diagrams are geometry: the triad triangle, the lever, the hundred-cell field.
  They are drawn, not photographed.

## Motion

None. The deck is a printed readout; export captures the settled frame.

## Do not

- Do not introduce a light slide. The world is one dark field.
- Do not use lime for a whole panel or a large fill; it is a signal.
- Do not add a second accent. Teal is structure, not a second signal.
- Do not import app tokens or shadcn components.
