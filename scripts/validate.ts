/**
 * `bun run validate` / `bun run validate <slug>` / `bun run validate --all`
 *
 * Static checks (metadata, imports, units) then browser checks (overflow,
 * broken images, console errors, fonts), then a PDF freshness check. Exit code
 * 0 means no errors; warnings never fail.
 *
 * Output is deliberately terse: one line per problem, each naming the slide and
 * the fix, and a verdict on the last line.
 */
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { presentationsConfig } from "../presentations.config";
import {
  UsageError,
  findDeck,
  formatBytes,
  listDecks,
  newestSourceMtime,
  selectTargets,
  type TargetSelection,
  type DeckFiles,
} from "./_decks";
import { collectDeclaredFontFamilies, runStaticChecks, type Problem } from "./_static";
import { runRuntimeChecks } from "./_runtime";
import { startDevServer } from "./_server";

const USAGE = `Usage: bun run validate
       bun run validate <slug>
       bun run validate --all`;

interface InteractiveSelection {
  selection: TargetSelection | null;
  exitCode: number;
}

/**
 * Lets a person choose a deck without making the non-interactive CLI depend on
 * a prompt or an extra package. Bun exposes Node's TTY APIs, which are enough
 * for a small arrow-key selector.
 */
async function chooseTargets(): Promise<InteractiveSelection> {
  const decks = listDecks();
  const allIndex = decks.length;
  const labels = [...decks.map((deck) => deck.slug), "Semua presentation"];
  let selected = 0;

  return new Promise((resolve) => {
    const stdin = process.stdin;
    let finished = false;

    const render = () => {
      const lines = [
        "Pilih presentation yang ingin divalidasi:",
        "",
        ...labels.map((label, index) => `${index === selected ? "❯" : " "} ${label}`),
        "",
        "↑/↓ atau j/k untuk berpindah • Enter untuk memilih • Esc untuk batal",
      ];
      process.stdout.write(`\x1b[2J\x1b[H${lines.join("\n")}\n`);
    };

    const finish = (selection: TargetSelection | null, exitCode: number) => {
      if (finished) return;
      finished = true;
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      process.stdout.write("\x1b[?25h\x1b[2J\x1b[H");
      if (selection) {
        const label = selected === allIndex ? "semua presentation" : decks[selected]!.slug;
        process.stdout.write(`Memvalidasi ${label}...\n\n`);
      } else {
        process.stdout.write("Validasi dibatalkan.\n");
      }
      resolve({ selection, exitCode });
    };

    const onData = (chunk: string | Buffer) => {
      const input = chunk.toString();

      if (input === "\u0003") {
        finish(null, 130);
        return;
      }
      if (input === "\u001b") {
        finish(null, 0);
        return;
      }
      if (input.includes("\u001b[A") || input === "k") {
        selected = (selected - 1 + labels.length) % labels.length;
        render();
        return;
      }
      if (input.includes("\u001b[B") || input === "j") {
        selected = (selected + 1) % labels.length;
        render();
        return;
      }
      if (input === "\r" || input === "\n") {
        const selection =
          selected === allIndex
            ? { slugs: decks.map((deck) => deck.slug), all: true }
            : { slugs: [decks[selected]!.slug], all: false };
        finish(selection, 0);
      }
    };

    process.stdout.write("\x1b[?25l");
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.on("data", onData);
    stdin.resume();
    render();
  });
}

interface DeckResult {
  slug: string;
  problems: Problem[];
  slideCount: number;
}

function order(a: Problem, b: Problem): number {
  const rank = (problem: Problem) => (problem.severity === "error" ? 0 : 1);
  return rank(a) - rank(b) || a.where.localeCompare(b.where, undefined, { numeric: true });
}

function printDeck(result: DeckResult): void {
  const errors = result.problems.filter((problem) => problem.severity === "error");
  const warnings = result.problems.filter((problem) => problem.severity === "warn");

  const count =
    result.slideCount > 0
      ? ` (${result.slideCount} slide${result.slideCount === 1 ? "" : "s"})`
      : "";
  console.log(`\n${result.slug}${count}`);

  if (result.problems.length === 0) {
    console.log("  ok");
    return;
  }

  for (const problem of [...errors, ...warnings].sort(order)) {
    const tag = problem.severity === "error" ? "ERROR" : "WARN ";
    console.log(`  ${tag} ${problem.where}: ${problem.message}`);
    console.log(`        fix: ${problem.hint}`);
  }
}

/** How many slides the deck actually renders, measured in the browser. */
async function countSlides(
  baseUrl: string,
  deck: DeckFiles,
  browser: Awaited<ReturnType<typeof chromium.launch>>,
): Promise<number> {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text().replace(/\s+/g, " "));
  });
  page.on("pageerror", (error) => errors.push(error.message.replace(/\s+/g, " ")));
  try {
    await page.goto(`${baseUrl}/export/${encodeURIComponent(deck.slug)}?export=1`, {
      waitUntil: "domcontentloaded",
      timeout: presentationsConfig.validate.timeoutMs,
    });
    await page.waitForFunction(
      () =>
        Boolean(window.__EXPORT_SLIDE_COUNT__) ||
        document.querySelector("[data-slide]") !== null ||
        document.querySelector("vite-error-overlay") !== null ||
        (document.getElementById("root")?.textContent ?? "").includes("Export failed"),
      undefined,
      { timeout: presentationsConfig.validate.timeoutMs },
    );

    // A module Vite could not resolve shows up as its error overlay.
    const overlay = await page.locator("vite-error-overlay").count();
    if (overlay > 0) {
      const detail =
        errors[0] ??
        (await page.locator("vite-error-overlay").first().textContent()) ??
        "a module failed to load";
      throw new Error(detail.replace(/\s+/g, " ").slice(0, 200) || "a module failed to load");
    }

    return await page.locator("[data-slide]").count();
  } finally {
    await page.close();
  }
}

/** PDF page count vs slide count, and whether the PDF is older than the sources. */
async function checkPdf(deck: DeckFiles, slideCount: number): Promise<Problem[]> {
  const problems: Problem[] = [];
  const pdfPath = join(process.cwd(), "exports", `${deck.slug}.pdf`);

  if (!existsSync(pdfPath)) {
    problems.push({
      severity: "warn",
      where: "exports/",
      message: `no PDF yet for "${deck.slug}"`,
      hint: `run \`bun run export ${deck.slug}\` before submitting; PDFs are committed to git.`,
    });
    return problems;
  }

  const stat = statSync(pdfPath);

  try {
    const doc = await PDFDocument.load(await Bun.file(pdfPath).bytes());
    const pages = doc.getPageCount();
    if (pages !== slideCount) {
      problems.push({
        severity: "error",
        where: `exports/${deck.slug}.pdf`,
        message: `has ${pages} page${pages === 1 ? "" : "s"} but the deck has ${slideCount} slides`,
        hint: `re-run \`bun run export ${deck.slug}\`; a mismatch means a slide broke out of its page.`,
      });
    }

    const first = doc.getPage(0);
    const { width, height } = first.getSize();
    const ratio = width / height;
    if (Math.abs(ratio - 16 / 9) > 0.01) {
      problems.push({
        severity: "error",
        where: `exports/${deck.slug}.pdf`,
        message: `pages are ${width.toFixed(0)}x${height.toFixed(0)}pt, not 16:9`,
        hint: `re-run \`bun run export ${deck.slug}\`; check the @page rule in the export route.`,
      });
    }
  } catch {
    problems.push({
      severity: "error",
      where: `exports/${deck.slug}.pdf`,
      message: "could not be read as a PDF",
      hint: `delete it and run \`bun run export ${deck.slug}\` again.`,
    });
    return problems;
  }

  const newestSource = newestSourceMtime(deck);
  if (stat.mtimeMs < newestSource) {
    problems.push({
      severity: "warn",
      where: `exports/${deck.slug}.pdf`,
      message: `is stale (${formatBytes(stat.size)}, older than the deck's source files)`,
      hint: `re-run \`bun run export ${deck.slug}\` so the PDF matches the slides.`,
    });
  }

  return problems;
}

async function main(): Promise<number> {
  const argv = process.argv.slice(2);

  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(USAGE);
    return 0;
  }

  let selection: TargetSelection;
  if (argv.length === 0 && process.stdin.isTTY && process.stdout.isTTY) {
    const interactive = await chooseTargets();
    if (!interactive.selection) return interactive.exitCode;
    selection = interactive.selection;
  } else {
    try {
      selection = selectTargets(argv);
    } catch (cause) {
      if (cause instanceof UsageError) {
        console.error(`${cause.message}\n\n${USAGE}`);
        return 2;
      }
      throw cause;
    }
  }

  if (selection.slugs.length === 0) {
    console.error(`No presentations found in presentations/.\n\n${USAGE}`);
    return 2;
  }

  const decks = selection.slugs
    .map((slug) => findDeck(slug))
    .filter((deck): deck is DeckFiles => deck !== undefined);

  // Static checks first: a deck that cannot parse is not worth a browser.
  const results: DeckResult[] = [];
  const runtimeQueue: DeckFiles[] = [];
  const declaredFonts = new Map<string, string[]>();

  for (const deck of decks) {
    const staticProblems = runStaticChecks(deck);
    const result: DeckResult = { slug: deck.slug, problems: staticProblems, slideCount: 0 };
    results.push(result);

    const fatal = staticProblems.some(
      (problem) =>
        problem.severity === "error" &&
        (problem.where === "presentation.json" || problem.where === "Presentation.tsx"),
    );

    if (!fatal) {
      runtimeQueue.push(deck);
      declaredFonts.set(deck.slug, collectDeclaredFontFamilies(deck));
    }
  }

  let server: Awaited<ReturnType<typeof startDevServer>> | undefined;
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;

  const shutdown = async () => {
    await browser?.close().catch(() => undefined);
    await server?.close().catch(() => undefined);
  };
  process.once("SIGINT", () => {
    void shutdown().finally(() => process.exit(130));
  });

  try {
    if (runtimeQueue.length > 0) {
      server = await startDevServer();
      browser = await chromium.launch({ headless: true });

      for (const deck of runtimeQueue) {
        const result = results.find((entry) => entry.slug === deck.slug);
        if (!result) continue;

        let count = 0;
        try {
          count = await countSlides(server.url, deck, browser);
        } catch (cause) {
          const message = (cause as Error).message.replace(/\s+/g, " ").trim().slice(0, 200);
          result.problems.push({
            severity: "error",
            where: "Presentation.tsx",
            message: `does not render${message ? `: ${message}` : ""}`,
            hint: "fix the import or the exception; the deck must render in the browser before anything else is checked.",
          });
          continue;
        }
        result.slideCount = count;

        if (count === 0) {
          result.problems.push({
            severity: "error",
            where: "Presentation.tsx",
            message: "renders zero slides",
            hint: "default-export a non-empty array of components.",
          });
        } else {
          const runtime = await runRuntimeChecks(
            browser,
            server.url,
            deck,
            count,
            declaredFonts.get(deck.slug) ?? [],
          );
          result.problems.push(...runtime.problems);
        }

        result.problems.push(...(await checkPdf(deck, count)));
      }
    }
  } finally {
    process.removeAllListeners("SIGINT");
    await shutdown();
  }

  for (const result of results) printDeck(result);

  const errors = results.flatMap((result) =>
    result.problems.filter((problem) => problem.severity === "error"),
  ).length;
  const warnings = results.flatMap((result) =>
    result.problems.filter((problem) => problem.severity === "warn"),
  ).length;

  console.log("");
  console.log(
    `${errors === 0 ? "PASS" : "FAIL"}: ${errors} error${errors === 1 ? "" : "s"}, ` +
      `${warnings} warning${warnings === 1 ? "" : "s"}`,
  );

  if (results.length > 0) {
    const checked = results.filter((result) => result.slideCount > 0);
    if (checked.length > 0) {
      console.log(
        `Screenshots: ${checked.map((result) => `.validation/${result.slug}/`).join(", ")}`,
      );
    }
  }

  return errors === 0 ? 0 : 1;
}

process.exitCode = await main();
