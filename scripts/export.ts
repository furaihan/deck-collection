/**
 * `bun run export <slug>` / `bun run export --all`
 *
 * Renders each deck's `/export/<slug>?export=1` page in Chromium and prints it to
 * `exports/<slug>.pdf`, one 1920x1080 page per slide.
 *
 * The dev server is started here on a free port, because production builds drop
 * private decks and a private deck still has to be submitted.
 */
import { mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { PDFDocument } from "pdf-lib";
import { presentationsConfig } from "../presentations.config";
import {
  UsageError,
  findDeck,
  formatBytes,
  selectTargets,
  type DeckFiles,
} from "./_decks";
import { startDevServer, type DevServerHandle } from "./_server";
import { waitForExportReady, waitForStablePage } from "./_page";

const { width, height, readyTimeoutMs, maxPdfBytes } = presentationsConfig.export;

/** Print options are the contract: fixed page, no margins, backgrounds kept. */
const PDF_OPTIONS = {
  width: `${width}px`,
  height: `${height}px`,
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  preferCSSPageSize: true,
} as const;

const USAGE = `Usage: bun run export <slug>
       bun run export --all`;

interface ExportResult {
  slug: string;
  path: string;
  bytes: number;
  slides: number;
  pages: number;
  ok: boolean;
}

async function countSlidesOnPage(page: Page): Promise<number> {
  const fromDom = await page.locator("[data-slide]").count();
  const fromFlag = await page.evaluate(() => window.__EXPORT_SLIDE_COUNT__ ?? 0);
  return Math.max(fromDom, fromFlag);
}

async function exportDeck(
  browser: Browser,
  server: DevServerHandle,
  deck: DeckFiles,
): Promise<ExportResult> {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    // Slide libraries that honour the media query jump straight to their final
    // state; the route also pins animation/transition to none.
    reducedMotion: "reduce",
  });

  try {
    const page = await context.newPage();
    const url = `${server.url}/export/${encodeURIComponent(deck.slug)}?export=1`;

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: readyTimeoutMs });
    await waitForExportReady(page, readyTimeoutMs);
    await waitForStablePage(page);

    const slides = await countSlidesOnPage(page);
    if (slides === 0) {
      throw new Error("The export page rendered zero slides.");
    }

    const pdf = await page.pdf(PDF_OPTIONS);
    const outDir = join(process.cwd(), "exports");
    mkdirSync(outDir, { recursive: true });
    const outPath = join(outDir, `${deck.slug}.pdf`);
    await Bun.write(outPath, pdf);

    const doc = await PDFDocument.load(pdf);
    const pages = doc.getPageCount();
    const bytes = statSync(outPath).size;

    return { slug: deck.slug, path: outPath, bytes, slides, pages, ok: pages === slides };
  } finally {
    await context.close();
  }
}

function report(result: ExportResult): void {
  console.log(
    `${result.ok ? "OK  " : "FAIL"} ${result.slug}: ${result.slides} slides -> ${result.pages} pages, ` +
      `${formatBytes(result.bytes)} (${result.path})`,
  );

  if (!result.ok) {
    console.error(
      `     page count mismatch: ${result.slides} slides rendered, ${result.pages} PDF pages.\n` +
        "     Fix: keep the @page size and break-after CSS in src/routes/export.\$slug.tsx, " +
        "and check no slide renders taller than 1080px.",
    );
  }

  if (result.bytes > maxPdfBytes) {
    console.warn(
      `     warning: ${formatBytes(result.bytes)} exceeds the ${formatBytes(maxPdfBytes)} LMS limit.\n` +
        `     Hint: shrink presentations/${result.slug}/assets/ (WebP/JPEG, <= 1600px wide).`,
    );
  }
}

async function main(): Promise<number> {
  const argv = process.argv.slice(2);

  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(USAGE);
    return 0;
  }

  let selection;
  try {
    selection = selectTargets(argv);
  } catch (cause) {
    if (cause instanceof UsageError) {
      console.error(`${cause.message}\n\n${USAGE}`);
      return 2;
    }
    throw cause;
  }

  if (selection.slugs.length === 0) {
    console.error(`No presentations found in presentations/.\n\n${USAGE}`);
    return 2;
  }

  const decks = selection.slugs
    .map((slug) => findDeck(slug))
    .filter((deck): deck is DeckFiles => deck !== undefined);

  // Exports run headless; the dev server is ours and is always shut down.
  process.env.DECK_LOADER_NO_PDF_COPY = "1";

  let server: DevServerHandle | undefined;
  let browser: Browser | undefined;
  let failures = 0;

  const shutdown = async () => {
    await browser?.close().catch(() => undefined);
    await server?.close().catch(() => undefined);
  };

  const onSignal = (signal: string) => {
    console.error(`\nInterrupted (${signal}); shutting down.`);
    void shutdown().finally(() => process.exit(130));
  };
  process.once("SIGINT", () => onSignal("SIGINT"));
  process.once("SIGTERM", () => onSignal("SIGTERM"));

  try {
    console.log(`Starting dev server for ${decks.length} presentation(s)...`);
    server = await startDevServer();
    browser = await chromium.launch({ headless: true });

    for (const deck of decks) {
      try {
        const result = await exportDeck(browser, server, deck);
        report(result);
        if (!result.ok) failures += 1;
      } catch (cause) {
        failures += 1;
        const message = cause instanceof Error ? cause.message : String(cause);
        console.error(`FAIL ${deck.slug}: ${message}`);
      }
    }
  } finally {
    process.removeAllListeners("SIGINT");
    process.removeAllListeners("SIGTERM");
    await shutdown();
  }

  if (failures > 0) {
    console.error(`\n${failures} export(s) failed.`);
    return 1;
  }

  console.log(`\nExported ${decks.length} presentation(s) to exports/.`);
  return 0;
}

process.exitCode = await main();
