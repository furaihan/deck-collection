# Code blocks that fit the sheet — design

A deck about one idea: on a fixed 1920x1080 sheet, a code block has to solve its
own type size, because there is no scrollbar in a PDF.

## World

A pre-press proof sheet. Cool grey stock, hairline registration rules, crop marks
in the trim corners, and a near-black ink slab where the code is printed. The
slab is the subject of the deck; it is never a decorative card.

Three inks, because a two-colour press plus one accent is a real printing
constraint and reads as one:

- **Riso pink** `#FF3D7F` — the signal: marks, rules, numerals, the lit row.
- **Process blue** `#2340D6` — structure: links, the second primary.
- **Amber** `#FFCC7A` — a third ink that exists only inside the ink slab, where it
  separates numbers and types from strings.

Contrast (measured in `theme.ts`): ink 15.1:1, inkSoft 6.8:1, inkFaint 5.0:1 on
stock; token 15.2:1, keyword 8.5:1, string 10.2:1, comment 5.9:1 on the slab.
Riso at full strength is 2.9:1 on stock, so it is never type there — only plates,
rules and marks.

## Type

One grotesque for display and reading copy, one mono for every label, measure and
line of code. The mono face is not a costume: this deck is about character
advance, so the type used to print code is also the type used to measure it.

- Display 96–104px, headings 56–76px, body 28px, captions 18–24px.
- Code 24–34px, solved per block. Never below 24px.
- Glyph advance of the bundled mono: **0.65 em**, verified with Playwright at
  100px before any slide was written.

## Composition

- 1920x1080, 90px trim, content field 152–944, footer rail at 976.
- One running head (section + folio), one hairline, one foot rail with progress
  ticks. Every slide except the cover and the close uses it.
- Code occupies whole blocks of the field. Text never wraps around a block; the
  slide is either text-led or slab-led, not a magazine spread.
- The cover and the close are full-bleed slab/stock splits — the two slides that
  must read at thumbnail size.

## The artifact

`CodeBlock.tsx` is the deck's subject and its tool. Three props (`width`, `focus`,
`mark`) plus the code itself; size, gutter, colours and line height are solved or
read from `theme.ts`. A block that cannot fit at 24px throws at render, so the
failure mode is a build error rather than a clipped PDF.
