---
name: create-presentation
description: Use when asked to create, make, or build a new presentation, deck, slides, or PPT in the Deck Loader project (React slide decks under presentations/, exported to PDF).
---

# create-presentation

Guide for creating a new presentation in this repo: a deck is a folder of React
slide components in `presentations/<slug>/`, rendered on a fixed 1920x1080 canvas
and exported to PDF for submission. "Create a PPT" means a new deck in this app,
never a real .pptx file. PDF is the only export format.

Read `AGENTS.md` first. It is the source of truth for the contract and hard rules.
This skill adds the workflow and the design requirements on top of it.

## Non-negotiable rules

- Design ALWAYS goes through the **impeccable** skill (`.agents/skills/impeccable/`). Never design slides by instinct alone.
- Every deck needs a **color palette of at least 4 colors**, decided with the user before any slide is written.
- New decks are `"visibility": "private"`. Never set `"public"` yourself.
- Package manager is Bun. Never npm, yarn, or pnpm. Do not add dependencies without asking.
- Never say "done" before `bun run validate <slug>` passes with 0 errors AND you have looked at the screenshots.

## Step 1: Gather what is missing

Only ask for what the request does not already say: topic or source material, course, audience, language, rough slide count. Write slide content in the language the user asks for, otherwise the language of their request.

If the user attached source material, read it fully before designing.

## Step 2: Color palette (required, before design)

Check whether the user already gave a palette.

- **Palette given with 4+ colors**: use it as is. Assign roles (background, surface, ink/text, accent at minimum).
- **Palette given with fewer than 4 colors**: extend it to 4+ and show the user the extension.
- **No palette**: propose **3 distinct options**. For each option give:
  - a short name and mood (for example "Warm paper and amber")
  - 4 to 6 hex colors with roles (background, surface, ink, accent, and optional secondary)
  - one line on why it fits the topic and audience
  Make the three options genuinely different in temperature and contrast (not three variations of one idea). Check text/background contrast reaches WCAG AA (4.5:1 body, 3:1 large). Then ask the user to pick one or give their own.

Do not start writing slides until the palette is settled. If the user is not available to answer (unattended run), pick option 1, say which one you picked at the top of your report, and continue.

Record the final palette in the deck's `theme.ts` (and in the deck's `DESIGN.md` if impeccable creates one).

## Step 3: Scaffold

```bash
bun run new <slug> "<Title>"
```

Slug is kebab-case and must not already exist. This creates `presentation.json` (today's date, private), `Presentation.tsx`, `slides/Slide01-03.tsx`, `theme.ts`, and an empty `assets/`. Fill in a real `description` and `course` in `presentation.json`.

## Step 4: Design with impeccable

1. Read `.agents/skills/impeccable/SKILL.md` and follow its Setup (run its `context` command once, load the new-work playbook, and read `reference/craft-floor.md` right before editing UI).
2. Give impeccable the approved palette as a pinned brief ("the brief wins"). Let impeccable handle everything beyond that: concept and visual world, typography, layout, hierarchy, rhythm, motion decisions, and polish.
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

## Step 6: Validate

```bash
bun run validate <slug>
```

Fix every error. Review every warning rather than ignoring it. Repeat until the verdict line is `PASS: 0 errors, ...`.

## Step 7: Look at the slides

Open every `.validation/<slug>/slide-NN.png` and check each one for: text overlap, text cut off, awkward empty areas, weak contrast, wrong fonts (fallback to a system font), misaligned elements, and consistency with the palette. The validator measures geometry; only looking tells you whether it is good. Fix problems, re-run validate, and look again at the changed slides.

## Step 8: Typecheck and export

```bash
bun run typecheck
bun run export <slug>
```

Typecheck must be clean (a dirty typecheck breaks `bun run build` on the VPS). Export writes `exports/<slug>.pdf`; confirm the PDF page count equals the slide count (the command checks and exits non-zero on mismatch). `exports/*.pdf` is meant to be committed to git, so tell the user to commit it with the deck.

## Step 9: Report

Keep it short:

- Slide count
- Chosen palette (names and hex values)
- PDF path and size
- Remaining warnings, if any
- Visibility is `private`; the user decides when to make it public

## Editing an existing deck

Read `presentation.json`, `Presentation.tsx`, and `theme.ts` first. Change colors in `theme.ts`, not per slide. Keep the existing palette unless the user asks to change it. Then run validate, look at the affected screenshots, and re-export.
