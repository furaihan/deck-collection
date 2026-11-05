import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SlideCanvas } from "./SlideCanvas";
import { SlideErrorBoundary } from "./SlideErrorBoundary";
import { cn } from "@/lib/utils";
import type { SlideList } from "@/presentations/types";

interface PresenterProps {
  slides: SlideList;
  title: string;
  index: number;
  onIndexChange: (next: number) => void;
  onExit: () => void;
}

const IDLE_MS = 2000;

/**
 * One slide at a time, letterboxed on black. Controls appear on pointer move
 * and leave again after a couple of seconds of stillness.
 */
export function Presenter({ slides, title, index, onIndexChange, onExit }: PresenterProps) {
  const [idle, setIdle] = useState(false);
  const timer = useRef<number | null>(null);

  const total = slides.length;
  const clamp = useCallback((n: number) => Math.min(Math.max(n, 0), total - 1), [total]);
  const go = useCallback((n: number) => onIndexChange(clamp(n)), [clamp, onIndexChange]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const previous = useCallback(() => go(index - 1), [go, index]);

  const wake = useCallback(() => {
    setIdle(false);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setIdle(true), IDLE_MS);
  }, []);

  useEffect(() => {
    wake();
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [wake]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
        case "Spacebar":
          event.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          previous();
          break;
        case "f":
        case "F":
          event.preventDefault();
          void toggleFullscreen();
          break;
        case "Escape":
          if (!document.fullscreenElement) onExit();
          break;
        case "Home":
          event.preventDefault();
          go(0);
          break;
        case "End":
          event.preventDefault();
          go(total - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, next, onExit, previous, total]);

  const Slide = slides[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onPointerMove={wake}
      onPointerDown={wake}
      role="dialog"
      aria-modal="true"
      aria-label={`Presenting ${title}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {Slide ? (
          <SlideCanvas className="h-full w-full">
            <SlideErrorBoundary title={title} slug={title} fallback={(error) => (
              <div className="flex h-full w-full items-center justify-center bg-neutral-950 p-24">
                <div className="max-w-[900px] text-left">
                  <p className="text-[44px] font-semibold text-neutral-100">This slide failed to render</p>
                  <p className="mt-6 text-[24px] leading-relaxed text-neutral-400">{error.message}</p>
                  <p className="mt-10 text-[20px] text-neutral-500">Slide {index + 1} of {total}</p>
                </div>
              </div>
            )}>
              <Slide />
            </SlideErrorBoundary>
          </SlideCanvas>
        ) : null}
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center justify-center pb-6 transition-opacity duration-200 motion-reduce:transition-none",
          idle ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-2 py-1.5 backdrop-blur-sm">
          <button
            type="button"
            onClick={previous}
            disabled={index === 0}
            aria-label="Previous slide"
            className="grid size-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <span className="min-w-[76px] text-center font-mono text-[13px] tabular-nums text-white/70">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={index === total - 1}
            aria-label="Next slide"
            className="grid size-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
          <div className="mx-1 h-5 w-px bg-white/15" aria-hidden />
          <button
            type="button"
            onClick={onExit}
            aria-label="Close presenter"
            className="grid size-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

async function toggleFullscreen() {
  if (typeof document === "undefined") return;
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    // The browser can refuse fullscreen without a user gesture; the presenter
    // still fills the viewport, so this is not worth interrupting the user.
  }
}
