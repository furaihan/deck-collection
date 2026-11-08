# Code blocks

A code block is opt-in. Most decks need none — add one only when a slide is
actually about code, or when a snippet is the clearest way to state a rule.
Code-block slides are exempt from the icon requirement, but every other rule in
`AGENTS.md` still applies.

The worked example is `presentations/code-block-demo/`: seven slides that use the
component, plus its `theme.ts` and `DESIGN.md`. Read the deck before writing a
block; the notes below explain why it is built the way it is.

## 1. Copy the component into the deck

`presentations/code-block-demo/CodeBlock.tsx` is the reference implementation.
Copy it into the new deck, next to the slides or in the deck root, and import it
relatively (`./CodeBlock`, `../CodeBlock`).

Each deck owns its copy. Slides may not import from another presentation or from
`src/`; the copy is what lets a deck change its token colours and decorations
without touching any other deck.

The component needs `@tanstack/highlight`, which is already on the allowed
imports list (`/core`, `/languages/*`, `/react`, `/theme`, `/themes/*`). Do not
add another highlighting or icon library.

## 2. Register only the languages the deck shows

Build one highlighter at module scope in the copied file:

```ts
import { createHighlighter, renderTokens } from "@tanstack/highlight/core";
import { json } from "@tanstack/highlight/languages/json";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";

const highlighter = createHighlighter({ languages: [ts, tsx, json, shell] });
```

- Import each language from its own module. Never import the root entry
  `@tanstack/highlight`: it builds a registry from all 79 bundled languages
  instead of the ones the deck needs.
- The demo registers four:

  | `lang` | Module | Use |
  | --- | --- | --- |
  | `ts` | `@tanstack/highlight/languages/ts` | TypeScript |
  | `tsx` | `@tanstack/highlight/languages/tsx` | TSX and JSX |
  | `json` | `@tanstack/highlight/languages/json` | Metadata and config |
  | `shell` | `@tanstack/highlight/languages/shell` | Terminal transcripts |

- Trim the list to what the deck actually prints. An unregistered language name
  falls back to escaped plain text rather than failing the deck.
- Keep the registration in the one copied file. Do not create a second
  highlighter elsewhere in the deck.

## 3. The fit contract

The canvas is fixed at 1920x1080 and the validator fails on clipped text, so a
code block must never scroll or wrap by accident. The component solves its own
type size from the longest line instead:

```text
size = field ÷ (chars × advance)
```

`fitSize()` in the copied file does the arithmetic:

1. Split the source into lines and find the longest one.
2. Subtract the horizontal padding (`CODE.padX * 2`) and, when line numbers are
   on, the gutter (`52 + 20 = 72`).
3. Divide that inner width by `longest * CODE.advance`.
4. Cap the result at the requested `size` and floor it to a whole pixel.

Worked example from the demo: a 1000px field with line numbers has
`1000 - 88 - 72 = 840px` of text. A 47-character line at the bundled face's
`0.65em` advance needs `47 × 0.65 = 30.55em`, so `840 ÷ 30.55 = 27.49` and the
block prints at **27px**.

Rules that follow from the contract:

- `white-space: pre` is mandatory. Never allow wrapping.
- Never add `overflow-x: auto`, a scroll container, or a fixed height that clips.
- If the solved size falls below `CODE.min` (24px), the component throws at
  render with `cannot fit N characters`. Fix the content, not the floor:
  widen the field, split the example across two blocks, or shorten the line.
- Code text is body copy: 24px minimum, 28px preferred. Captions in the head and
  gutter may go to 18px; never below.
- Pass the width the block actually occupies. The fit math cannot see the parent
  layout, so a wrong `width` is a clipped PDF waiting to happen.

## 4. The `CODE` theme contract

All code colours, the size floor, and the glyph advance live in the deck's
`theme.ts` under `CODE`. Never colour a token inline in a slide.

| Field | Meaning |
| --- | --- |
| `advance` | Measured width of one glyph in ems. The demo's bundled mono is `0.65`. |
| `size` | Largest size the block may use, before the fit rule lowers it. |
| `min` | Hard floor. The demo uses `24`. |
| `lineHeight` | Multiplier converted to a pixel line height by the component. |
| `padX`, `padY` | Inner padding used by the fit math and the rendered block. |
| `token` | Complete map from `HighlightThemeToken` to a hex colour. |

Type the token record so a missing semantic colour is a compile error rather
than a token that silently prints in the base colour:

```ts
import type { HighlightThemeToken } from "@tanstack/highlight/theme";

export const CODE = {
  advance: 0.65,
  size: 30,
  min: 24,
  lineHeight: 1.62,
  padX: 44,
  padY: 36,
  token: {
    token: "#E7EAF1",
    keyword: "#FF8FB0",
    // …every remaining HighlightThemeToken
  } satisfies Record<HighlightThemeToken, string>,
} as const;
```

The demo's `theme.ts` carries the full record. Keep the colours in the deck's
palette and check contrast against the slab: body-sized code should aim for
WCAG AA (4.5:1), and comments are the usual failure point.

## 5. Bundle the mono face

The block sets `fontFamily` explicitly from `FONT.mono`. Never inherit the
shell's mono stack: a deck that relies on a font it did not ship prints in a
fallback.

1. Put the mono `.woff2` in the deck's `assets/`.
2. Declare it in the deck's `theme.css` with `@font-face`:

   ```css
   @font-face {
     font-family: "Azeret Deck";
     src: url("./assets/azeret-mono.woff2") format("woff2");
     font-weight: 100 900;
     font-style: normal;
     font-display: block;
   }
   ```

3. Set `FONT.mono` to that family with a generic fallback, and import the CSS
   once from the deck's frame or root slide component.
4. Verify the advance before trusting the fit math. The demo measured its face
   at 100px with Playwright and confirmed every glyph, including the space, is
   exactly `0.65em` wide. A different face needs its own measurement and a new
   `CODE.advance`.

## 6. Props and usage

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `code` | `string` | required | Source text. Trailing whitespace is trimmed. |
| `lang` | `"ts" \| "tsx" \| "json" \| "shell"` | `"ts"` | Registered language. |
| `width` | `number` | required | Printed field width in px. Every size derives from it. |
| `size` | `number` | `CODE.size` | Largest size the block may use. |
| `lineNumbers` | `boolean` | `true` | Show the gutter. |
| `focus` | `readonly number[]` | — | One-based lines to light. |
| `mark` | `{ line: number; text: string }` | — | One fragment to underline, named by line and text. |
| `title` | `string` | — | Filename or label in the block's head. |
| `style` | `CSSProperties` | — | Positioning only; colours stay in the theme. |

Minimal block:

```tsx
import { CodeBlock } from "./CodeBlock";

const CACHE = `const value = await cache.get(key)
if (value) return value`;

<CodeBlock code={CACHE} width={1000} title="cache.ts" />;
```

Before/after with decorations:

```tsx
<CodeBlock
  code={AFTER}
  width={860}
  size={28}
  title="cache.ts"
  lineNumbers={false}
  focus={[5, 6]}
  mark={{ line: 5, text: "const inflight" }}
/>
```

A block with no line numbers and no decorations renders as one plain text run;
rows are only wrapped when line numbers or decorations are present.

## 7. Decorations are the point

`focus` lights whole rows; `mark` underlines one fragment. They are how a slide
points at the line it is talking about, so use them for before/after, diffs, and
annotations instead of colouring text by hand.

- `focus` takes one-based line numbers. Each lit row bleeds to the slab's edge,
  not the padding, so the highlight reads as a row rather than a text span.
- `mark` takes `{ line, text }`. The component finds `text` on that line and
  throws if it is missing: `<CodeBlock> mark "…" is not on line N.` This is
  deliberate — a mark that silently disappears is worse than a build error.
- Both are ordinary line and range decorations passed to `renderTokens`, styled
  by the copied component's `TONE` map. Keep the treatment consistent across the
  deck.

## 8. Do not use `createThemeCss()`

The library's `createThemeCss()` base styles emit
`pre.th-code { overflow-x: auto }`. That creates a scroll container inside the
slide and the validator reports it as "text is cut off in …".

Instead, take the token colours from the deck's `CODE.token` and apply them as
inline `color` in `renderNode`. The `--th-*` variables and any `th-*` theme CSS
stay out of the deck. Token spans carry both `th-token` and their semantic class,
so the lookup must skip `th-token` (the base colour) and use the semantic name.

## 9. Failure modes

| Symptom | Cause | Fix |
| --- | --- | --- |
| `cannot fit N characters` at render | Longest line cannot reach 24px in the given width | Widen the field, split the example, or shorten the line |
| `mark "…" is not on line N` | Text does not appear on that line | Correct the line number or the fragment |
| Validator reports text cut off | A scroll container or fixed height | Remove `overflow-x: auto`; let the block size itself |
| Code prints in the wrong face | Mono face not bundled or `fontFamily` not set | Add `@font-face`, import the CSS, set `FONT.mono` |
| A token prints in the base colour | Missing key in `CODE.token` | Complete the record; `satisfies` should catch it |
| Type smaller than 24px | `CODE.min` lowered or fit math bypassed | Restore the floor and fix the content |

## 10. Checklist before validate

- [ ] `CodeBlock.tsx` is copied into this deck and imported relatively.
- [ ] Only the languages the deck prints are registered.
- [ ] Every block passes a width it actually occupies.
- [ ] No hex colours in `slides/*.tsx`; token colours are in `theme.ts`.
- [ ] The mono face is in `assets/` and declared with `@font-face`.
- [ ] `bun run validate <slug>` passes and the code-block screenshots show no
      clipping, overlap, or fallback face.
- [ ] `bun run export <slug>` reports one PDF page per slide.

## 11. Editing an existing deck

- A deck that already has `CodeBlock.tsx` keeps its copy. Do not point it at the
  demo's file.
- Change colours, the size floor, and the glyph advance in the deck's `theme.ts`
  (`CODE` block), never inline in a slide.
- If the palette changes, re-check token contrast against the slab and re-run
  validate before exporting.
- If a line no longer fits after a copy edit, split or shorten the example; do
  not lower `CODE.min`.
