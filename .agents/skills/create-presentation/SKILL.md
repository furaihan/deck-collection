---
name: create-presentation
description: Use when asked to create, make, or build a new presentation, deck, slides, or PPT in the Deck Loader project (React slide decks under presentations/).
---

# create-presentation

Guide for creating a new presentation in this repo: a deck is a folder of React
slide components in `presentations/<slug>/`, rendered on a fixed 1920x1080 canvas
and exported to PDF for submission.

Read `AGENTS.md` first. It is the source of truth for the contract and hard rules.
This skill adds the workflow and the design requirements on top of it.

## Overrides

This repo's rules override impeccable on these points:

- Settle the palette with the user first. impeccable's instructions not to ask
  about colors or style, "Finish the job," and "No hedging" do not apply to
  palette selection.
- The approved palette is a pinned brief for impeccable: **the brief wins**.
  Its direction round may decide type, layout, and motifs, but must not reopen,
  replace, or re-propose the palette.
- Icons are required. impeccable's refusal of "same-size cards of icon plus
  heading plus text" rejects that layout pattern, not icons.

## Non-negotiable rules

- Design ALWAYS goes through the **impeccable** skill (`.agents/skills/impeccable/`). Never design slides by instinct alone.
- Every presentation deck must use at least two distinct primary colors, excluding black, white, and their variations (e.g., shades, tints, and tones of black and white, including gray). These two primary colors must be applied consistently throughout the presentation to establish a cohesive visual identity.
- **Palette gate:** Unless the user explicitly says not to ask, if no palette was
  supplied, the first reply MUST contain only the 3 options defined in the skill;
  do no scaffolding or file edits, then stop and wait for the user's choice.
- **Icons:** Every content slide MUST include at least 1 Lucide icon, except
  cover, closing, code-block, and full-bleed figure slides.
- See `AGENTS.md` §6 for repo-wide invariants.

## Step 1: Gather what is missing

Extract topic/source material, course, audience, language, and rough slide count
from the request and supplied material; defer questions until after the palette
gate. Write slide content in the requested language, otherwise the request's.

If the user attached source material, read it fully before designing.

## Step 2: Palette gate (before any scaffold or slide edits)

Check whether the user supplied a palette.

- **4 or more colors supplied:** use them as-is and assign roles (background,
  surface, ink/text, accent at minimum).
- **Fewer than 4 colors supplied:** extend the palette to at least 4 colors and
  show the user the extension. Wait for the user's approval before proceeding.
- **No palette supplied:** Unless the user explicitly says not to ask, stop. The
  first reply MUST contain only 3 palette options; do not scaffold or edit files.
  Wait for the user's choice.

Each option must contain:

  - a short name and mood (for example "Warm paper and amber")
  - 4 to 6 hex colors with roles (background, surface, ink, accent, and optional secondary)
  - one line on why it fits the topic and audience

Make the three options genuinely different in temperature and contrast, not
variations of one idea. Check text/background contrast against WCAG AA: 4.5:1 for
body text and 3:1 for large text. When waiting for a choice, ask the user to pick
one or give their own.

Skip waiting only when the user's request explicitly says not to ask (for example,
"pick yourself," "don't ask me," or "you decide"). With no palette, pick option 1
and state that in the first line of the report. Missing replies and uncertainty
about whether the user is present are not permission to skip the gate.

Record the settled palette in the deck's `theme.ts` and in its `DESIGN.md` if
impeccable creates one.

## Step 3: Scaffold

```bash
bun run new <slug> "<Title>"
```

Slug is kebab-case and must not already exist. This creates `presentation.json` (today's date, private), `Presentation.tsx`, `slides/Slide01-03.tsx`, `theme.ts`, and an empty `assets/`. Fill in a real `description` and `course` in `presentation.json`.

Immediately after scaffolding:

1. Replace the default colors in `theme.ts` with the approved palette: at least 4
   color roles and at least 2 distinct chromatic hues. Black, white, gray, and
   their tints or shades do not count as chromatic hues.
2. Replace all three placeholder slides' content and styling. Remove every use
   of the scaffold's default ink/paper/accent/muted color scheme.

## Step 4: Design with impeccable

1. Read `.agents/skills/impeccable/SKILL.md` and follow its Setup (run its `context` command once, load the new-work playbook, and read `reference/craft-floor.md` right before editing UI).
2. Give impeccable the approved palette as a pinned brief ("the brief wins"). Its direction round may decide type, layout, and motifs; do not let it reopen or change the palette. Let impeccable handle the other open decisions: concept and visual world, typography, hierarchy, rhythm, motion, and polish.
3. Treat the deck as its own design world. The repo-root `PRODUCT.md` and `DESIGN.md` describe the app shell, not the deck. Capture the deck's system in the deck's own `theme.ts` (colors, type, spacing) and, if useful, a `DESIGN.md` inside the deck folder. Every slide imports from `../theme`.
4. The impeccable output must still obey `AGENTS.md` §2. That table is the hard
   contract and wins over any design suggestion. Two constraints live only here:

   - Do not add animation that changes the final state; export captures the
     settled frame.
   - Keep each image under `maxImageBytes` in `presentations.config.ts` so the
     PDF stays under the ~20 MB upload limit.

## Step 5: Write the slides

- Slides live in `slides/SlideNN.tsx`. Order is defined ONLY by the array exported from `Presentation.tsx`, never by file names.
- The first slide is the cover. It is also the dashboard thumbnail, so it must read clearly when small.
- Every file in `slides/` must be in the array (no orphans).
- Do not invent facts, statistics, or citations. If source material does not support a claim, leave it out or flag it.
- Every content slide MUST include at least 1 Lucide icon. Exempt slides: cover,
  closing, code-block, and full-bleed figure slides. Use icons as list markers,
  process or timeline nodes, stat labels, callout anchors, or section markers;
  a cover may use one large motif. Do not build same-size icon/heading/text card
  grids. Keep icon size and stroke consistent across the deck.
- Import named icons from `lucide-react`. Never use emoji or Unicode glyphs as
  icons, and do not add an icon library. Use custom SVG only when Lucide has no
  suitable icon.

## Code blocks

A code block is opt-in. Most decks need none — only add one when a slide is actually
about code, or when a snippet is the clearest way to state a rule. When it is:

1. **Copy the component in.** `presentations/code-block-demo/CodeBlock.tsx` is the
   reference implementation; copy it into the new deck and import it relatively
   (`./CodeBlock`, `../CodeBlock`). Each deck owns its copy — slides may not import
   from another presentation or from `src/`.
2. **Register only what the deck shows**, at module scope in that one file:

   ```ts
   const highlighter = createHighlighter({ languages: [ts, tsx] })
   ```

   Never import the root entry `@tanstack/highlight`: it builds a registry from all
   79 bundled languages instead of the two the deck needs.
3. **Fit by construction.** The canvas is fixed at 1920x1080 and the validator fails
   on clipped text, so a code block must never scroll or wrap by accident. Derive the
   type size from the longest line (`size = field ÷ (chars × advance)`), keep
   `white-space: pre`, and pass the `width` the block actually occupies. The demo's
   glyph advance is 0.65 em for the bundled mono face. If a line cannot fit at the
   24px floor, split the example — never shrink below the floor.
4. **Do not use `createThemeCss()`.** Its base styles emit
   `pre.th-code { overflow-x: auto }`, which creates a scroll container inside the
   slide and is reported as "text is cut off in …". Take the token colours from the
   deck's `theme.ts` and apply them as inline `color`; the `--th-*` variables and any
   `th-*` theme CSS stay out of the deck.
5. **Bundle the mono face** in the deck's `assets/` with `@font-face` and set
   `fontFamily` explicitly on the block. Never inherit the shell's mono stack; a deck
   that relies on a font it did not ship prints in a fallback.
6. **Decorations are the point.** `focus` lights rows, `mark` underlines one fragment.
   They are how a slide points at the line it is talking about, so use them for
   before/after, diffs, and annotations instead of colouring text by hand.
7. Code text is body copy: 24px minimum, 28px preferred. Captions in the head and
   gutter may go to 18px; never below.

## Step 6: Self-check palette and icons

```bash
grep -L "lucide-react" presentations/<slug>/slides/*.tsx
```

Each listed slide must be an exempt type; otherwise add and use a Lucide icon.
Check the theme and slide files:

```bash
grep -nE "#[0-9a-fA-F]{3,8}" presentations/<slug>/slides/*.tsx
```

This command must return nothing: colors live in `theme.ts` only. Confirm by
inspection that `theme.ts` has at least 4 color roles and 2 distinct chromatic
hues.

## Step 7: Validate and inspect slides

```bash
bun run validate <slug>
```

Fix every error. Review every warning rather than ignoring it. Repeat until the
verdict line is `PASS: 0 errors, ...`. Open every `.validation/<slug>/slide-NN.png`
and check for text overlap or clipping, awkward empty areas, weak contrast, font
fallbacks, misalignment, and consistency with the palette. Fix problems, rerun
validate, and inspect changed slides again. The validator measures geometry; only
looking tells you whether the deck is visually sound.

## Step 8: Typecheck and export

```bash
bun run typecheck
bun run export <slug>
```

Typecheck must be clean (a dirty typecheck breaks `bun run build` on the VPS). Export writes `exports/<slug>.pdf`; confirm the PDF page count equals the slide count (the command checks and exits non-zero on mismatch).

## Step 9: Report

Keep it short:

- Slide count
- `Palette: option N, chosen by user` / `given by user` / `option 1, user said not to ask`
- `Icons: X of Y content slides` (exclude exempt slides from Y)
- Chosen palette (name and hex values)
- PDF path and size
- Remaining warnings, if any

## Editing an existing deck

Read `presentation.json`, `Presentation.tsx`, and `theme.ts` first. Change colors in `theme.ts`, not per slide. Keep the existing palette unless the user asks to change it. Then run validate, look at the affected screenshots, and re-export.

- Code block colours, size floor and glyph advance live in the deck's `theme.ts` (the `CODE` block) like every other colour; never colour a token inline in a slide.
- A deck that already has `CodeBlock.tsx` keeps its copy. Do not point it at the demo's file.
