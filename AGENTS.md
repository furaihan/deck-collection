# AGENTS.md

A personal library of React decks rendered on a fixed 1920x1080 canvas and exported to PDF. Humans decide what is public.

**New-deck router:** For any request to create a new deck, presentation, slides,
or PPT, the FIRST action is to load `.agents/skills/create-presentation/SKILL.md`,
before any other tool call.

## 1. The presentation contract

A presentation directory's name is its slug and registry entry:

```
presentations/<slug>/
  presentation.json      metadata (required)
  Presentation.tsx       default export: ordered slide array (required)
  slides/Slide01.tsx     any file names, any number
  assets/                images and fonts; empty by default
  theme.ts               optional, recommended: colours and type
```

Discovery uses `import.meta.glob` over `presentations/*/`; creating registers,
deleting unregisters, and there is no index to update.

`presentation.json`: non-empty `title` and `description`; date `YYYY-MM-DD`;
visibility `"public"` or `"private"`; optional non-empty `course`.

`Presentation.tsx` default-exports a **non-empty, ordered array** of components;
array order is slide order, never from file names. Its length is the slide count.
An empty array is a validation error. An error boundary contains throwing slides.

## 2. Hard rules for slides

`bun run validate` checks detectable failures, not palette or icon requirements
in §6.

| Rule | Why |
| --- | --- |
| Draw on **1920x1080 px**, `h-full w-full` on the root | The canvas is fixed; it is scaled, never resized |
| Use **px** (or % of the slide) — never viewport units or viewport utilities (the exact lists are `bannedUnits` / `bannedUtilities` in `presentations.config.ts`) | The canvas is not the viewport |
| No `@/components/ui/*` (shadcn) | Slides are standalone; the shell's UI is not theirs |
| No shadcn/app theme variables (`--background`, `--foreground`, `--primary`, `--muted`, `--card`, `--border`, `bg-muted`, `text-foreground`, `border-border`, …) | The shell palette must never leak into a deck |
| No external resources: no `http(s)://` in `src`/`href`/`url()`, no CDN fonts, no `@import url(http…)` | Exports must work offline and stay reproducible |
| Bundle fonts in `assets/` and load them with `@font-face` | A CDN font is a broken PDF waiting to happen |
| **Text must not overflow** the 1920x1080 sheet | It gets cut off when projected and printed |
| Imports only from the allowlist | Keeps decks portable and the bundle honest |

### Allowed dependencies

`presentations.config.ts` (`allowedImports`) permits:

- `react` and `react-dom`
- Tailwind CSS utilities (no import needed)
- `lucide-react`
- `@tanstack/highlight` (`/core`, `/languages/*`, `/react`, `/theme`, `/themes/*`)
- Relative imports inside the same presentation directory

Ask before adding dependencies; the validator reports off-list imports as
*"ask the user before adding dependencies"*.

Code blocks are deck-local: copy `presentations/code-block-demo/CodeBlock.tsx`;
the skill specifies its fit, theme, and bundled mono-face rules.

### Floors that are not enforced but matter

- Body text **≥ 28px**, headings **≥ 56px**; captions may be 20–24px, never below 18px.
- Contrast: aim for WCAG AA (4.5:1 body text, 3:1 large headings).

## 3. Design guidance

The deck's visual system (colours, type, spacing) lives in
`presentations/<slug>/theme.ts`, imported by every slide. Never colour slides
individually. Design uses **impeccable**; creation requirements are in
`.agents/skills/create-presentation/SKILL.md`.

## 4. Workflow: creating a new presentation

Read `.agents/skills/create-presentation/SKILL.md` before step 1. Outline:

1. **Gather** topic/source material, course, audience, language, and rough slide
   count from the request and supplied material; defer questions until after the
   palette gate.
2. **Palette gate:** Unless the user explicitly says not to ask, if no palette
   was supplied, the first reply MUST contain only the 3 options defined in the
   skill; do no scaffolding or file edits, then stop and wait for the user's choice.
3. **Scaffold:** `bun run new <slug> "<Title>"` creates a private deck with
   metadata, three-slide array, `theme.ts`, and empty `assets/`. Or build the
   same structure by hand. Replace the default theme and slides as in the skill.
4. **Design and write** with impeccable on 1920x1080, importing from `../theme`.
5. **Validate:** `bun run validate <slug>`; fix errors and review warnings.
6. **Inspect** `.validation/<slug>/` screenshots; only you can judge appearance.
7. **Typecheck and export:** `bun run typecheck`, then `bun run export <slug>`;
   PDF page count must equal slide count.
8. **Report** slide count, palette, PDF path and size, and remaining warnings.

## 5. Workflow: editing an existing presentation

1. Read `presentation.json`, `Presentation.tsx`, and `theme.ts` first.
2. Edit slides; change colours in `theme.ts`, never per slide. Keep the palette
   unless asked to change it.
3. Validate, fix errors, and re-open affected screenshots; then re-export and
   report what changed.

## 6. Rules you must not break

- **Palette gate:** Unless the user explicitly says not to ask, if no palette was
  supplied, the first reply MUST contain only the 3 options defined in the skill;
  do no scaffolding or file edits, then stop and wait for the user's choice.
- **Icons:** Every content slide MUST include at least 1 Lucide icon, except
  cover, closing, code-block, and full-bleed figure slides.
- Never say a presentation is "done" before `bun run validate <slug>` passes
  with zero errors **and** you have looked at the generated screenshots.
- New presentations are `"private"`; only the user decides when a deck becomes
  `"public"`. Never flip the flag yourself.
- Never put secrets in a deck. Production builds drop private decks entirely;
  public decks ship their source.
- Write slide content in the language requested, otherwise in the request's
  language.
- Use Bun (`bun install`, `bun add`, `bun run <script>`), never npm/yarn/pnpm.
  Commit `bun.lock`; never commit other lock files.
- `.material` is for presentation materials only.

## 7. Commands

```bash
bun install                 # install dependencies
bun run dev                 # dev server with HMR

bun run new <slug> "<Title>"   # scaffold a presentation
bun run validate <slug>        # static + browser checks, screenshots
bun run validate --all         # every presentation
bun run export <slug>          # print exports/<slug>.pdf
bun run export --all           # every presentation

bun run typecheck           # tsc --noEmit
bun run build               # typecheck + production build into dist/
bun run preview             # serve dist/ locally
```

One-time browser install for `export` and `validate`:

```bash
bunx playwright install chromium
```

## 8. What the validator checks

See `scripts/_static.ts` and `scripts/validate.ts` for exact checks. The validator
prints a `fix:` line per problem; palette and icon rules are not validated.

Every problem prints as:

```
  ERROR slide 2: text runs past the canvas in p "…" (right edge, 900x143 @ 1500,200)
        fix: move it inside 1920x1080, or clip it deliberately with a parent inside the slide.
```

The last line is the verdict: `PASS: 0 errors, 2 warnings` or
`FAIL: 3 errors, 1 warning`. Exit code 0 = pass; warnings never fail.
Screenshots land in `.validation/<slug>/slide-NN.png` (gitignored).
## 9. Routes and visibility

| route | purpose |
| --- | --- |
| `/` | dashboard: search, sort, live thumbnails |
| `/p/$slug` | overview, slide grid, Download PDF |
| `/p/$slug/present` | fullscreen presenter (`?slide=N`) |
| `/export/$slug` | bare stacked slides — the PDF capture surface |

**PDF is the only supported export format.** PPTX export and browser-print shortcuts are not supported and must not be added. If the user says something like "create a PPT," treat it as a request to create a new presentation within the application, not as a request to generate an actual PPT file.
