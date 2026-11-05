# Design

The app shell's visual system. **Slides are not covered here** — a deck owns
its own world, and the canvas pins its own base type and colour so nothing
below reaches it.

<!-- impeccable:design-schema 1 -->

## World

A drawing sheet on a drafting table: an ivory ground, a charcoal ink, ruled
title blocks, and one gold plate that holds each deck. The shell is a
mount for the work; it stays quiet so the slides (which arrive with their own
colours) are the loudest thing on screen.

The shell is deliberately flat and square. Radii are 0, borders are 1px hairlines,
and elevation appears only as a soft shadow on hover — never as decoration.

## Palette

Five colours, each doing a job. Defined as Tailwind v4 theme tokens in
`src/styles.css`.

| Token     | Hex       | Job                                                       |
| --------- | --------- | --------------------------------------------------------- |
| Ivory     | `#F5F3EE` | Page ground and the title-block footer strip              |
| Charcoal  | `#263238` | Ink, hairlines, the masthead, the primary action           |
| Pink      | `#D81B60` | Signal: private badges, failures, focus ring, hover arrows |
| Green     | `#2E7D32` | Confirmation: deck count, slide counts, the Present action |
| Gold      | `#F4C542` | The deck plate — the 3px mount around every slide          |

Neutrals are tinted from the ivory and charcoal, never pure grey. Secondary
text is `#5C6A70` (4.9:1 on ivory).

### Rules

- Gold is reserved for **plates**: the mount around a slide, and the 3px rule
  under the masthead. It is not a text colour and not a general accent.
- Pink means something is **wrong or protected** (private). It never decorates.
- Green means **counted and fine**. The Present button is green because
  presenting is the one affirmative action in the app.
- Charcoal is the only ground for chrome; content never sits on charcoal.

## Type

- **Archivo** (variable, 400–700) for everything in the shell. Tight tracking
  on display sizes (`-0.035em` at the page title, `-0.014em` on card titles).
- **IBM Plex Mono** (400/500) for metadata: slugs, field labels, counts,
  keyboard hints. Always uppercase with `0.14–0.22em` tracking at 8.5–10px.
- Both are self-hosted from `src/fonts` (latin subset, woff2). No CDN.

Scale in use: page title `clamp(2.25rem, 5vw, 3.5rem)`; overview title
`clamp(2rem, 4.6vw, 3.25rem)`; card title 17px; body 13–15px; meta 8.5–10px.

## Composition

- Every deck card is **a plate above a title block**: the slide, then a ruled
  strip carrying course, filed date, and sheet count. Facts sit under a rule,
  the way they do on a drawing — they are read, not decorated.
- The masthead is a charcoal band with a gold rule beneath it. It is the only
  full-bleed colour in the shell.
- Grid: 1 column to 390px, 2 at `sm`, 3 at `xl`, inside a 1440px measure.

## Motion

One authored moment: the plate lifts on hover (arrow slides up-right, a soft
26px shadow appears, the slide's border firms). 150–200ms, ease-out, and every
instance respects `prefers-reduced-motion`. Nothing else moves.

## Browser surfaces

Selection is gold at 42%. Scrollbars are the rule colour on ivory. The focus
ring is 2px pink with a 2px offset — visible on both ivory and charcoal.

## Do not

- Do not import these tokens into a slide. Use `SlideCanvas`'s pinned base.
- Do not add a sixth colour; extend a role instead.
- Do not round corners or add gradients.
