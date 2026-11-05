import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { SlideSequence } from "@/components/presentation/SlideSequence";
import { waitForStableAssets } from "@/lib/exportReady";
import { useSlides } from "@/presentations/useSlides";
import { findEntry } from "@/presentations/registry";
import type { SlideList } from "@/presentations/types";

interface ExportSearch {
  export: boolean;
}

/**
 * Bare page for PDF capture: every slide at its native 1920x1080, stacked, with
 * no application chrome, no scrollbars, and a print stylesheet that makes each
 * slide exactly one page.
 *
 * `?export=1` freezes motion and sets `window.__EXPORT_READY__` once fonts,
 * images and two animation frames have settled. `scripts/export.ts` waits for
 * that flag rather than guessing with a sleep.
 */
export const Route = createFileRoute("/export/$slug")({
  validateSearch: (search: Record<string, unknown>): ExportSearch => ({
    export: search.export === "1" || search.export === 1 || search.export === true,
  }),
  component: ExportRoute,
});

const PAGE_CSS = `
  /* index.html pins html/body/#root to the viewport height. In print that
     would make page one a 1080px box with 3000px of slides overflowing it,
     which Chromium clips — so the whole chain must grow with its content. */
  html,
  body,
  #root {
    height: auto !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    overflow: visible !important;
    display: block !important;
  }

  @page {
    size: 1920px 1080px;
    margin: 0;
  }

  [data-slide-sequence] > * {
    width: 1920px !important;
    height: 1080px !important;
    overflow: hidden !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* The last slide must not emit a trailing blank page. */
  [data-slide-sequence] > *:last-child {
    break-after: auto !important;
    page-break-after: auto !important;
  }
`;

const FREEZE_CSS = `
  [data-export-mode="frozen"] *,
  [data-export-mode="frozen"] *::before,
  [data-export-mode="frozen"] *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
`;

function ExportRoute() {
  const { slug } = Route.useParams();
  const { export: freeze } = Route.useSearch();
  const entry = findEntry(slug);
  if (!entry) throw notFound();

  const slides = useSlides(entry);

  return (
    <>
      <style>{PAGE_CSS}</style>
      {freeze ? <style>{FREEZE_CSS}</style> : null}
      {slides.status === "ready" ? (
        <ExportSurface
          slides={slides.slides}
          title={entry.title}
          slug={entry.slug}
          freeze={freeze}
        />
      ) : (
        <ExportStatus
          status={slides.status}
          message={slides.status === "error" ? slides.error.message : "Preparing slides"}
          freeze={freeze}
        />
      )}
    </>
  );
}

interface ExportSurfaceProps {
  slides: SlideList;
  title: string;
  slug: string;
  freeze: boolean;
}

/**
 * The settled state the exporter photographs. It publishes
 * `window.__EXPORT_READY__` only after the same wait the script performs, so a
 * timeout on the script side means something is genuinely wrong.
 */
function ExportSurface({ slides, title, slug, freeze }: ExportSurfaceProps) {
  const published = useRef(false);

  useEffect(() => {
    document.documentElement.dataset.exportMode = freeze ? "frozen" : "live";
    window.__EXPORT_SLIDE_COUNT__ = slides.length;
    return () => {
      delete document.documentElement.dataset.exportMode;
    };
  }, [freeze, slides.length]);

  useEffect(() => {
    if (!freeze || published.current) return;
    let cancelled = false;

    waitForStableAssets()
      .then(() => {
        if (cancelled) return;
        published.current = true;
        window.__EXPORT_READY__ = true;
      })
      .catch((cause: unknown) => {
        if (cancelled) return;
        window.__EXPORT_ERROR__ = cause instanceof Error ? cause.message : String(cause);
      });

    return () => {
      cancelled = true;
    };
  }, [freeze]);

  return <SlideSequence slides={slides} title={title} slug={slug} />;
}

function ExportStatus({
  status,
  message,
  freeze,
}: {
  status: "loading" | "error";
  message: string;
  freeze: boolean;
}) {
  useEffect(() => {
    if (status === "error" && freeze) {
      window.__EXPORT_ERROR__ = message;
    }
  }, [status, message, freeze]);

  return (
    <div style={{ padding: 80, fontFamily: "ui-monospace, monospace", fontSize: 16 }}>
      {status === "error" ? `Export failed: ${message}` : "Preparing slides"}
    </div>
  );
}
