import { useMemo } from "react";
import { SlideCanvas } from "./SlideCanvas";
import { SlideErrorBoundary } from "./SlideErrorBoundary";
import type { SlideList } from "@/presentations/types";

interface SlideSequenceProps {
  slides: SlideList;
  title: string;
  slug?: string;
}

/**
 * Every slide, stacked at its native 1920x1080. This is the surface the PDF
 * exporter prints, so it renders without shell chrome and with no transform:
 * each wrapper is exactly one page, fixed size, clipped, and broken after —
 * except the last one, which must not emit a trailing blank page.
 */
export function SlideSequence({ slides, title, slug }: SlideSequenceProps) {
  const numbered = useMemo(() => slides.map((Slide, i) => ({ Slide, i })), [slides]);

  return (
    <div data-slide-sequence={title}>
      {numbered.map(({ Slide, i }) => (
        <div
          key={i}
          data-slide={i + 1}
          data-slide-page
          style={{
            width: 1920,
            height: 1080,
            overflow: "hidden",
            breakInside: "avoid",
            pageBreakInside: "avoid",
            breakAfter: i === numbered.length - 1 ? "auto" : "page",
            pageBreakAfter: i === numbered.length - 1 ? "auto" : "always",
          }}
        >
          <SlideCanvas mode="native" interactive className="h-[1080px] w-[1920px]">
            <SlideErrorBoundary
              title={title}
              slug={slug ?? title}
              fallback={(error) => (
                <div className="flex h-full w-full items-center justify-center bg-white p-24">
                  <div className="max-w-[900px]">
                    <p className="text-[44px] font-semibold text-neutral-900">
                      Slide {i + 1} failed to render
                    </p>
                    <p className="mt-6 text-[24px] leading-relaxed text-neutral-600">
                      {error.message}
                    </p>
                  </div>
                </div>
              )}
            >
              <Slide />
            </SlideErrorBoundary>
          </SlideCanvas>
        </div>
      ))}
    </div>
  );
}
