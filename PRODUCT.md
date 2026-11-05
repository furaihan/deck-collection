# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Fixed by the user's brief, not chosen here: Vite + React + TypeScript (strict), TanStack Router (file-based, SPA mode, via the Vite plugin), Tailwind CSS v4, shadcn/ui for the app shell only, lucide-react for icons, Bun as package manager and script runner. Vite stays the dev server and bundler. Static output served by nginx `dist/`; no SSR, no backend, no auth.

## Users

One person: the owner of a personal library of presentations written as React slide components by AI agents. They browse it at a desk, and present from it on a laptop in whatever light the room happens to have. Single user, personal use — no teams, roles, or sharing model.

## Product Purpose

A viewer that turns a folder of AI-authored React slide decks into something browsable and presentable. A deck appears by existing in `presentations/<slug>/`; there is no registration step, no upload, no editor. Success is: the library is accurate without maintenance, the first slide is legible as a thumbnail at a glance, and a deck goes fullscreen without friction.

## Positioning

The repository layout *is* the catalogue. Decks are discovered from the filesystem through Vite globs, so adding a folder is the only publishing act. Nothing in the app stores metadata that a deck's own `presentation.json` already holds.

## Operating Context

- Decks live at `presentations/<slug>/` with `presentation.json`, `Presentation.tsx` (default-exports an ordered slide array), `slides/`, and `assets/`.
- Slides are authored against a fixed 1920x1080 canvas in px units, using React, Tailwind, and lucide-react — never the shell's design system.
- The reading scene is a desk in daylight; the presenting scene is a dim room with a projector, where the deck — not the app — must own the screen.
- Phase 2 adds PDF export via Playwright against the `/export/$slug` route; that route exists now only as a stub.

## Capabilities and Constraints

- Dashboard with live first-slide thumbnails, search, and sort.
- Presentation overview with metadata and a slide grid.
- Fullscreen presenter with keyboard navigation and auto-hiding controls.
- Private decks are visible in dev (badged) and excluded from production builds entirely — out of the bundle, not merely hidden.
- One broken deck must never break the library: failures are contained per deck by an error boundary.
- Decided here: the app is called **Deck Loader** (repo name; no other name was supplied). Assumed: served from a domain root, so no router basepath. Both are reversible in one line each.

## Brand Commitments

None supplied. The shell's visual world is this project's own to establish.

## Evidence on Hand

One sample deck (`presentations/sample-intro/`, three slides) authored as proof of the contract. No real content library, testimonials, or metrics exist — none may be invented.

## Product Principles

1. The folder is the API. Discovery is filesystem truth, never a registry.
2. The deck is the artifact; the shell is the frame. Chrome recedes whenever slides are on screen.
3. Isolation is structural. Slides cannot inherit shell theming; shell theming cannot leak into slides.
4. Nothing in the library can be taken down by one bad deck.
5. Present, never edit. Every surface is read-only.

## Accessibility & Inclusion

Keyboard is the primary navigation surface in presenter mode (arrows, PageUp/PageDown, Space, F, Esc). Focus states and contrast are held to WCAG AA across the shell.
