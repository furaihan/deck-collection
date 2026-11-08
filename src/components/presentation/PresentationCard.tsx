import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SlideCanvas } from "./SlideCanvas";
import { SlideErrorBoundary } from "./SlideErrorBoundary";
import { ThumbnailSkeleton } from "./ThumbnailSkeleton";
import { useSlides } from "@/presentations/useSlides";
import type { PresentationEntry } from "@/presentations/types";
import { cn } from "@/lib/utils";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? iso : dateFormat.format(parsed);
}

/**
 * A deck's first slide, rendered live inside a scaled canvas. The deck's chunk
 * is fetched by `useSlides`, which is what keeps the dashboard light: only
 * decks on screen are ever imported.
 */
export function PresentationThumbnail({ entry }: { entry: PresentationEntry }) {
  const slides = useSlides(entry);
  const FirstSlide = slides.status === "ready" ? slides.slides[0] : undefined;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-foreground/8">
      {FirstSlide ? (
        <SlideCanvas className="h-full w-full" label={`First slide of ${entry.title}`}>
          <SlideErrorBoundary title={entry.title} slug={entry.slug}>
            <FirstSlide />
          </SlideErrorBoundary>
        </SlideCanvas>
      ) : null}
      {slides.status === "loading" ? <ThumbnailSkeleton /> : null}
      {slides.status === "error" ? <ThumbnailFailure message={slides.error.message} /> : null}
      {slides.status === "ready" && !FirstSlide ? (
        <ThumbnailFailure message="Presentation.tsx exported an empty slide array." />
      ) : null}
    </div>
  );
}

function ThumbnailFailure({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-1.5 bg-secondary p-3.5">
      <Badge className="w-fit bg-signal text-signal-foreground hover:bg-signal!">
        <AlertTriangle aria-hidden /> Did not load
      </Badge>
      <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">{message}</p>
    </div>
  );
}

interface PresentationCardProps {
  entry: PresentationEntry;
  /** Set when the registry already knows this deck cannot be read. */
  invalid?: boolean;
}

export function PresentationCard({ entry, invalid = false }: PresentationCardProps) {
  const slides = useSlides(entry);
  const sheetCount = invalid ? null : slides.status === "ready" ? slides.slides.length : null;
  const isPrivate = entry.visibility === "private";

  return (
    <article className="group relative h-full">
      <Card className="h-full gap-0 py-0">
        <Link
          to="/p/$slug"
          params={{ slug: entry.slug }}
          className="flex h-full flex-col outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {/*
           * Gold is the deck plate. It holds the slide the way a mount holds a
           * print, and it is the one place the shell's colour is loud.
           */}
          <div className="relative bg-gold p-[3px] transition-shadow duration-200 group-hover:shadow-[0_18px_36px_-24px_rgba(38,50,56,0.7)] motion-reduce:transition-none">
            <div className="relative overflow-hidden bg-card">
              <PresentationThumbnail entry={entry} />
              {isPrivate ? (
                <Badge className="absolute right-2.5 top-2.5 z-10 bg-signal text-signal-foreground hover:bg-signal!">
                  Private
                </Badge>
              ) : null}
            </div>
          </div>

          {/* The title block: every fact about the deck, in one ruled strip. */}
          <div className="flex flex-1 flex-col border-t border-foreground/15 bg-card">
            <div className="flex flex-1 items-start justify-between gap-3 px-3.5 pb-3 pt-3">
              <h2 className="min-w-0">
                <span className="block text-[17px] font-semibold leading-[1.18] tracking-[-0.014em] [text-wrap:balance]">
                  {entry.title}
                </span>
                <span className="mt-1.5 block truncate font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  {entry.slug}
                </span>
              </h2>
              <ArrowUpRight
                className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal motion-reduce:transition-none"
                aria-hidden
              />
            </div>

            <dl className="grid grid-cols-[1fr_auto_auto] items-end gap-x-3 border-t border-foreground/15 bg-background/60 px-3.5 py-2.5">
              <Field label="Course" value={entry.course ?? "—"} muted={!entry.course} />
              <Field label="Filed" value={formatDate(entry.date)} align="right" />
              <Field
                label="Sheets"
                value={
                  <span className={cn(sheetCount !== null && "text-affirm")}>
                    {sheetCount ?? "—"}
                  </span>
                }
                align="right"
              />
            </dl>
          </div>
        </Link>
      </Card>
    </article>
  );
}

function Field({
  label,
  value,
  align = "start",
  muted = false,
}: {
  label: string;
  value: React.ReactNode;
  align?: "start" | "right";
  muted?: boolean;
}) {
  return (
    <div className={cn("min-w-0", align === "right" && "text-right")}>
      <dt className="font-mono text-[8.5px] uppercase leading-none tracking-[0.16em] text-muted-foreground">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1.5 truncate text-[12px] leading-none tabular-nums",
          muted && "text-muted-foreground",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
