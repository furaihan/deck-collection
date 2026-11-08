import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlideGrid } from "@/components/presentation/SlideGrid";
import { SlideErrorBoundary } from "@/components/presentation/SlideErrorBoundary";
import { formatDate } from "@/components/presentation/PresentationCard";
import { useSlides } from "@/presentations/useSlides";
import { findSlidePdf, formatFileSize } from "@/presentations/pdf";
import { findEntry } from "@/presentations/registry";

export const Route = createFileRoute("/p/$slug/")({
  component: PresentationOverview,
  notFoundComponent: DeckNotFound,
});

function DeckNotFound() {
  return (
    <div className="py-24">
      <h1 className="text-3xl font-semibold tracking-[-0.025em]">
        That deck is not in the library
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Nothing in <code className="font-mono text-xs">presentations/</code> matches this address.
        If you just added the folder, save a file inside it and Vite will pick the folder up.
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-signal underline underline-offset-4"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back to the library
      </Link>
    </div>
  );
}

function PresentationOverview() {
  const { slug } = Route.useParams();
  const entry = findEntry(slug);
  if (!entry) throw notFound();

  const slides = useSlides(entry);
  const navigate = Route.useNavigate();
  const slideCount = slides.status === "ready" ? slides.slides.length : null;
  // Only decks that were actually exported offer a PDF; the manifest is empty
  // for a deck nobody has run `bun run export` on yet.
  const pdf = findSlidePdf(slug);

  const meta = useMemo(
    () => [
      { label: "Course", value: entry.course ?? "—" },
      { label: "Filed", value: formatDate(entry.date) },
      { label: "Slides", value: slideCount === null ? "—" : String(slideCount) },
      { label: "Visibility", value: entry.visibility },
    ],
    [entry.course, entry.date, entry.visibility, slideCount],
  );

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> Library
      </Link>

      <header className="mt-7 grid gap-10 border-b border-foreground/15 pb-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-[60ch]">
          <h1 className="text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] [text-wrap:balance]">
            {entry.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {entry.description}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
            {meta.map((field) => (
              <div key={field.label}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  {field.label}
                </dt>
                <dd className="mt-1.5 text-[13px] capitalize tabular-nums">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <Button
            className="h-12 bg-affirm px-6 text-[14px] text-affirm-foreground hover:bg-affirm/90"
            onClick={() =>
              void navigate({ to: "/p/$slug/present", params: { slug }, search: { slide: 1 } })
            }
            disabled={slides.status !== "ready"}
          >
            <Play className="fill-current" data-icon="inline-start" aria-hidden />
            Present
            {slideCount !== null ? (
              <span className="ml-1 font-mono text-[11px] opacity-75">{slideCount} slides</span>
            ) : null}
          </Button>

          {pdf ? (
            <a
              href={pdf.url}
              download={`${slug}.pdf`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-foreground/25 bg-card px-6 text-[14px] font-medium text-foreground transition-colors hover:border-foreground hover:bg-secondary"
            >
              <Download className="size-4" aria-hidden />
              Download PDF
              <span className="font-mono text-[11px] text-muted-foreground">
                {formatFileSize(pdf.bytes)}
              </span>
            </a>
          ) : null}

          <Link
            to="/export/$slug"
            params={{ slug }}
            search={{ export: false }}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline lg:text-right"
          >
            Export view
          </Link>
        </div>
      </header>

      <section className="mt-10" aria-label="Slides">
        {slides.status === "ready" ? (
          <SlideErrorBoundary title={entry.title} slug={entry.slug}>
            <SlideGrid
              slides={slides.slides}
              title={entry.title}
              onOpen={(index) =>
                void navigate({
                  to: "/p/$slug/present",
                  params: { slug },
                  search: { slide: index + 1 },
                })
              }
            />
          </SlideErrorBoundary>
        ) : null}

        {slides.status === "loading" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="aspect-video animate-pulse border border-foreground/15 bg-secondary motion-reduce:animate-none"
              />
            ))}
          </div>
        ) : null}

        {slides.status === "error" ? (
          <div role="alert" className="border-l-[3px] border-l-signal bg-secondary p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
              This deck failed to load
            </p>
            <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-foreground/80">
              {slides.error.message}
            </p>
            <p className="mt-3 text-[13px] text-muted-foreground">
              Check that <code className="font-mono text-xs">Presentation.tsx</code> default-exports
              an array of components, then save the file to reload. The rest of the library is
              unaffected.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
