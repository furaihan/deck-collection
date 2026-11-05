import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import {
  isProductionBuild,
  invalidPresentations,
  presentationEntries,
} from "@/presentations/registry";

/**
 * The chrome around every library screen. The export route opts out of this
 * shell entirely so a rasterised page carries nothing but slides.
 *
 * The masthead is charcoal, full-bleed, with a gold rule under it: the shell's
 * colour is a fact of the product, not a tint on a grey page. Content sits on
 * ivory so the decks (which own their own colour) are the loudest thing on
 * screen.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  // Presenter and export are both "the deck owns the screen" surfaces: no
  // chrome, no scrolling shell, nothing that could letterbox the slide.
  if (pathname.startsWith("/export/") || pathname.endsWith("/present")) {
    return <>{children}</>;
  }

  const deckCount = presentationEntries.length;
  const brokenCount = isProductionBuild ? 0 : invalidPresentations.length;

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 bg-foreground text-background">
        <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center gap-4 px-5 sm:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3 text-background outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="grid size-9 place-items-center bg-gold text-foreground transition-transform duration-200 group-hover:-rotate-6 motion-reduce:transition-none">
              <Layers className="size-[18px]" strokeWidth={2} aria-hidden />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-[-0.005em]">
                Deck Loader
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-background/45">
                {isProductionBuild ? "Build" : "Dev"}
              </span>
            </span>
          </Link>

          <span className="ml-auto flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em]">
            <span className="flex items-center gap-2 text-background/55">
              <span className="size-1.5 rounded-full bg-affirm brightness-[1.45]" aria-hidden />
              {deckCount} {deckCount === 1 ? "deck" : "decks"}
            </span>
            {brokenCount > 0 ? (
              <span className="flex items-center gap-2 bg-signal px-2 py-1 text-signal-foreground">
                {brokenCount} broken
              </span>
            ) : null}
          </span>
        </div>
        <div className="h-[3px] w-full bg-gold" aria-hidden />
      </header>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 pb-24 pt-10 sm:px-8">
        {children}
      </main>

      <footer className="mt-auto border-t border-foreground/12 bg-card">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:px-8">
          <span className="text-foreground/70">presentations/ is the registry</span>
          <span className="ml-auto">1920 &times; 1080 canvas</span>
        </div>
      </footer>
    </div>
  );
}
