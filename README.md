# Deck Loader

A personal library of presentations written as React slide components. Drop a
folder into `presentations/` and it appears — no registration, no upload, no
editor. Every deck prints to a PDF for submission.

## Requirements

- [Bun](https://bun.sh) 1.2 or newer
- Chromium for Playwright, installed once for `export` and `validate`:

  ```bash
  bunx playwright install chromium
  ```

## Getting started

```bash
bun install
bun run dev
```

Open the URL Vite prints (usually <http://localhost:5173>).

```bash
bun run typecheck    # tsc --noEmit
bun run build        # typecheck + production build into dist/
bun run preview      # serve dist/ locally
```

## Presentations

A deck is a folder:

```
presentations/my-deck/
  presentation.json
  Presentation.tsx
  slides/Slide01.tsx
  assets/
```

`presentation.json`:

```json
{
  "title": "My Deck",
  "description": "What this deck is about.",
  "course": "Optional course name",
  "date": "2026-11-04",
  "visibility": "public"
}
```

`Presentation.tsx` default-exports the slide array in show order:

```tsx
import Slide01 from "./slides/Slide01";
import Slide02 from "./slides/Slide02";

export default [Slide01, Slide02];
```

Slides are drawn on a fixed **1920x1080** canvas and scaled to fit, so write them
in px and check that nothing overflows. `presentations/sample-intro/` is a
working three-slide example.

## Authoring a deck

```bash
bun run new <slug> "<Title>"   # scaffold a private deck with three slides
bun run validate               # select a deck interactively
bun run validate <slug>        # static + browser checks, writes screenshots
bun run export                 # select a deck and export it interactively
bun run export <slug>          # print exports/<slug>.pdf
bun run export --overwrite <slug> # overwrite an existing PDF without prompting
```

Both accept `--all` instead of a slug. Without an argument, `validate` and
`export` show an interactive selector when run in a terminal. `validate` exits
non-zero when there is at least one error and always ends with a verdict line
(`PASS: 0 errors, 2 warnings`). It also writes a 1920x1080 screenshot of every
slide to `.validation/<slug>/slide-NN.png` — look at them before calling a deck
finished.

Full slide rules are in [AGENTS.md](./AGENTS.md); the authoring workflow is the
`create-presentation` skill in `.agents/skills/create-presentation/`.

### Code blocks

Slides may import `@tanstack/highlight`, so a deck can print syntax-highlighted
code. Copy `presentations/code-block-demo/CodeBlock.tsx` into the deck and import
it relatively — the demo deck is the worked example and is `private`, so it stays
out of production builds.

The block solves its own type size from the longest line, so it cannot overflow
the 1920x1080 sheet and never needs a scrollbar. Colours live in the deck's
`theme.ts`. Do not use the library's `createThemeCss()`: its base styles add
`overflow-x: auto`, which the validator reports as clipped text. Details are in
the skill's **Code blocks** section.

## Export

`bun run export sample-intro` starts a Vite **dev** server on a free port (private
decks are removed from production builds, and they still need exporting), opens
`/export/<slug>?export=1` in headless Chromium, waits for fonts, images, CSS
backgrounds and the page's own `window.__EXPORT_READY__` flag, and prints
`exports/<slug>.pdf` with one 1920x1080 page per slide. It then re-reads the PDF
and fails if the page count does not match the slide count.

Export never overwrites an existing PDF by default. In an interactive terminal,
it asks for confirmation for each existing file. Use `--overwrite` to approve
overwrites automatically. In a non-interactive environment, an existing PDF is
left untouched and the command reports that `--overwrite` is required.

The PDF keeps text selectable: only images and vector-drawn UI are rasterised.
A deck larger than 20 MB prints a warning (typical LMS upload limits), not an
error.

## Deploy

Static SPA on a VPS, no CI, no containers.

### First-time setup

1. **Install Bun** on the server:

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Clone the repository** and install dependencies:

   ```bash
   git clone <your-repo-url> /srv/deck-loader
   cd /srv/deck-loader
   bun install --frozen-lockfile
   ```

3. **Create the web root** and prepare nginx:

   ```bash
   sudo mkdir -p /var/www/presentations
   sudo chown -R "$USER":www-data /var/www/presentations
   sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/presentations
   sudo ln -s /etc/nginx/sites-available/presentations /etc/nginx/sites-enabled/
   sudo nano /etc/nginx/sites-available/presentations   # set server_name and root
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. **Add HTTPS** once DNS points at the server:

   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your.domain.tld
   ```

5. **Deploy**:

   ```bash
   ./deploy/deploy.sh
   ```

   It pulls, installs from the lockfile, builds, and rsyncs `dist/` into the web
   root. Override the destination with `WEB_ROOT=/srv/whatever ./deploy/deploy.sh`.

### Updating

```bash
cd /srv/deck-loader
./deploy/deploy.sh
```

Or from anywhere: `ssh vps '/srv/deck-loader/deploy/deploy.sh'`.

Only `dist/` is served. PDFs of public decks are copied to `dist/pdf/` during
`bun run build`; private decks — code, metadata and PDFs — never are.

## Routes

- `/` — the library, with search and sort
- `/p/<slug>` — overview, slide grid, Download PDF
- `/p/<slug>/present` — fullscreen presenter
- `/export/<slug>` — every slide stacked at its native size

## Private decks

`"visibility": "private"` decks show up in development with a badge and are
removed from production bundles entirely: their code, their metadata and their
PDF. New decks are private by default; only you decide when one becomes public.

## Notes

- Package manager: **Bun** only (`bun add`, `bun run <script>`).
- See [AGENTS.md](./AGENTS.md) for the slide authoring contract and
  `.agents/skills/create-presentation/SKILL.md` for the workflow.
