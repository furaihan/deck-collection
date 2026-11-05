import { SlideCanvas } from "./SlideCanvas";
import { SlideErrorBoundary } from "./SlideErrorBoundary";
import type { SlideList } from "@/presentations/types";

interface SlideGridProps {
  slides: SlideList;
  title: string;
  onOpen: (index: number) => void;
}

/** Thumbnails of every slide; clicking one enters the presenter there. */
export function SlideGrid({ slides, title, onOpen }: SlideGridProps) {
  return (
    <ol className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      {slides.map((Slide, index) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`Present ${title} from slide ${index + 1}`}
            className="group block w-full text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <div className="relative bg-gold p-[3px] transition-shadow duration-200 group-hover:shadow-[0_18px_36px_-24px_rgba(38,50,56,0.7)] motion-reduce:transition-none">
              <div className="relative overflow-hidden bg-card">
                <SlideCanvas className="aspect-video w-full" label={`Slide ${index + 1} of ${title}`}>
                  <SlideErrorBoundary
                    title={title}
                    slug={title}
                    fallback={(error) => (
                      <div className="flex h-full w-full flex-col justify-end gap-3 bg-secondary p-12">
                        <p className="text-[26px] font-semibold text-foreground">
                          Slide {index + 1} failed to render
                        </p>
                        <p className="text-[20px] leading-snug text-muted-foreground">
                          {error.message}
                        </p>
                      </div>
                    )}
                  >
                    <Slide />
                  </SlideErrorBoundary>
                </SlideCanvas>
              </div>
            </div>

            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-signal opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                Present
              </span>
            </div>
          </button>
        </li>
      ))}
    </ol>
  );
}
