# AGENTS.md

A personal presentation library. Every deck is a folder of React components; this
app discovers it, renders it on a fixed 1920x1080 canvas, and prints it to a PDF
you submit to a lecturer. Agents author decks; humans decide what is public.

---

## 1. The presentation contract

A presentation is a directory. The **slug is the directory name** — that is the
whole registry.

```
presentations/<slug>/
  presentation.json      metadata (required)
  Presentation.tsx       default export: the ordered slide array (required)
  slides/Slide01.tsx     any file names, any number
  assets/                images, fonts; empty by default
  theme.ts               optional, recommended: colours + type for this deck
```

**Discovery** is `import.meta.glob` over `presentations/*/`. Creating the folder
registers the deck; deleting it unregisters it. There is no index file to update.

### presentation.json

```json
{
  "title": "Linear algebra, week 4",
  "description": "One sentence about what this deck covers.",
  "course": "Optional course name",
  "date": "2026-11-04",
  "visibility": "private"
}
```

| field         | type                      | required |
| ------------- | ------------------------- | -------- |
| `title`       | non-empty string          | yes      |
| `description` | non-empty string          | yes      |
| `course`      | non-empty string          | no       |
| `date`        | ISO date `YYYY-MM-DD`     | yes      |
| `visibility`  | `"public"` or `"private"` | yes      |

### Presentation.tsx

```tsx
import Slide01 from "./slides/Slide01";
import Slide02 from "./slides/Slide02";

// Array order is slide order. Never derive it from file names.
export default [Slide01, Slide02];
```

- Default-export a **non-empty, ordered array** of components.
- The array length is the slide count. An empty array is a validation error.
- A slide that throws is contained by an error boundary; the rest of the deck
  still renders.

---

## 2. Hard rules for slides

These are enforced by `bun run validate`. Breaking one is a **validation error**,
not a style preference.

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

The allowlist lives in **`presentations.config.ts`** (`allowedImports`). Today it
is:

- `react` (and `react-dom`)
- Tailwind CSS utilities — usable without importing anything
- `lucide-react`
- Relative imports inside the same presentation directory

**Anything else requires asking the user first.** The validator reports an
off-list import as: *"ask the user before adding dependencies"*.

### Floors that are not enforced but matter

- Body text **≥ 28px**, headings **≥ 56px**. Below that, a PDF on a projector is
  a grey smudge. Captions may go to 20–24px; never below 18px.
- Contrast: aim for WCAG AA (4.5:1) on body text, 3:1 on large headings.

---

## 3. Design guidance

The deck's visual system — colours, type, spacing — lives in
`presentations/<slug>/theme.ts` and every slide imports from it. Never colour a
slide individually.

Design work runs through the **impeccable** skill; the process and the design
requirements are in `.agents/skills/create-presentation/SKILL.md`.

---

## 4. Workflow: creating a new presentation

The full procedure is in `.agents/skills/create-presentation/SKILL.md`. Read it
before step 3. The outline:

1. **Gather** anything the request does not already say — topic or source
   material, course, audience, language, rough slide count.
2. **Settle the palette** (at least 4 colours with roles) before writing a slide.
3. **Scaffold:** `bun run new <slug> "<Title>"` — creates a private deck with
   metadata, a three-slide array, `theme.ts` and an empty `assets/`. Or build the
   folder by hand; same files, same rules.
4. **Design and write the slides** with impeccable, against 1920x1080, importing
   from `../theme`.
5. **Validate:** `bun run validate <slug>` — fix every error, review every
   warning.
6. **Look at the screenshots** in `.validation/<slug>/`. The validator measures
   geometry; only you can see whether it looks good.
7. **Typecheck and export:** `bun run typecheck`, then `bun run export <slug>`;
   the page count must equal the slide count.
8. **Report** slide count, palette, PDF path and size, remaining warnings.

## 5. Workflow: editing an existing presentation

1. Read `presentations/<slug>/presentation.json`, `Presentation.tsx` and
   `theme.ts` first.
2. Edit the slides; change colours in `theme.ts`, never per slide. Keep the
   existing palette unless the user asks for a new one.
3. `bun run validate <slug>` — fix every error, then re-open the affected
   `.validation/<slug>` screenshots.
4. `bun run export <slug>` again and report what changed. The validator warns
   when the PDF is older than the sources.

---

## 6. Rules you must not break

- **Never say a presentation is "done"** before `bun run validate <slug>` passes
  with zero errors **and** you have looked at the generated screenshots.
- **New presentations are `"private"`.** Only the user decides when a deck
  becomes `"public"`. Never flip the flag yourself.
- **Never put secrets in a deck.** Production builds drop private decks entirely,
  but public ones ship their source.
- **Language**: write slide content in the language the user asks for. If they do
  not say, use the language of their request.
- **Package manager is Bun.** `bun install`, `bun add`, `bun run <script>`. Never
  npm, yarn, or pnpm. Commit `bun.lock`; never commit other lock files.

---

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

---

## 8. What the validator checks

**Static** (no browser): metadata valid (zod), `Presentation.tsx` default-exports
a non-empty array, orphan files in `slides/`, shadcn imports, theme variables,
viewport units and utilities, external resources, off-allowlist imports,
oversized images in `assets/`, unreferenced font files.

**Runtime** (headless Chromium, one page per slide at 1920x1080): console errors,
uncaught exceptions, failed requests, text past the canvas, text clipped by its
own container, broken images, fonts that fell back to a system face.

Every problem prints as:

```
  ERROR slide 2: text runs past the canvas in p "…" (right edge, 900x143 @ 1500,200)
        fix: move it inside 1920x1080, or clip it deliberately with a parent inside the slide.
```

The last line is the verdict: `PASS: 0 errors, 2 warnings` or
`FAIL: 3 errors, 1 warning`. Exit code 0 = pass; warnings never fail.

Screenshots land in `.validation/<slug>/slide-NN.png` (gitignored).

---

## 9. Routes and visibility

| route | purpose |
| --- | --- |
| `/` | dashboard: search, sort, live thumbnails |
| `/p/$slug` | overview, slide grid, Download PDF |
| `/p/$slug/present` | fullscreen presenter (`?slide=N`) |
| `/export/$slug` | bare stacked slides — the PDF capture surface |

Private decks appear in development with a badge and are **removed from
production bundles**, code and metadata alike; their PDFs never reach `dist/`.

**PDF is the only supported export format.** PPTX export and browser-print shortcuts are not supported and must not be added. If the user says something like "create a PPT," treat it as a request to create a new presentation within the application, not as a request to generate an actual PPT file.

### `.material` Folder

The `.material` folder is intended for prbuesentation materials only. Do not put anything else in this folder.
