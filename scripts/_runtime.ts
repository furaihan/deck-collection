/**
 * Runtime (browser) checks for one presentation.
 *
 * Each slide is rendered alone at its native 1920x1080 through the export route,
 * then measured: overflow past the canvas, clipped text containers, broken
 * images, console errors, failed requests and unexpected font fallback. A PNG
 * of every slide lands in `.validation/<slug>/` so an agent can look at what it
 * built.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import type { Browser, Page } from "playwright";
import { presentationsConfig } from "../presentations.config";
import type { DeckFiles } from "./_decks";
import type { Problem } from "./_static";
import { waitForStablePage } from "./_page";

const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = presentationsConfig.export;
const { canvasTolerancePx, clipTolerancePx, timeoutMs } = presentationsConfig.validate;

interface RawSlideFindings {
  overflowing: { selector: string; text: string; box: string; edges: string[] }[];
  clipped: { selector: string; text: string; detail: string }[];
  brokenImages: string[];
  fontsUsed: string[];
  offCanvasRoot: boolean;
}

/**
 * Serialised into the page: measures ONE slide against the fixed canvas.
 *
 * Two things make naive overflow detection unusable on a slide:
 *  - `Range.getClientRects()` returns INK boxes, which are taller than the line
 *    box for any font (about 1.34x the font size). A heading with a tight
 *    `line-height` therefore "overflows" its own box by ~10px while looking
 *    perfect. That overshoot is subtracted as a typographic allowance.
 *  - `scrollWidth/scrollHeight` count clipped decoration too, so a deliberately
 *    overflowing background circle would be reported as clipped text. Clipped
 *    overflow is only a problem when it carries text.
 */
function collectFindings(args: {
  slideIndex: number;
  tolerance: number;
  clipTolerance: number;
  canvasWidth: number;
  canvasHeight: number;
}): RawSlideFindings {
  const slide = document.querySelector(`[data-slide="${args.slideIndex}"]`) as HTMLElement | null;
  if (!slide) {
    return { overflowing: [], clipped: [], brokenImages: [], fontsUsed: [], offCanvasRoot: true };
  }

  const root = slide.getBoundingClientRect();

  const describe = (el: Element): string => {
    const tag = el.tagName.toLowerCase();
    const cls = (el.getAttribute("class") ?? "").split(/\s+/).filter(Boolean).slice(0, 3).join(".");
    const text = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 48);
    return `${tag}${cls ? "." + cls : ""}${text ? ` "${text}"` : ""}`;
  };

  /**
   * The clipper that a box must respect: the first ancestor below the harness
   * that hides its overflow. "Below the harness" matters — the canvas clipping
   * at exactly 1920x1080 is the page edge, not a design decision, and content
   * cut off there is what this check exists to find.
   */
  const deckClipper = (el: Element): DOMRect | null => {
    let node: Element | null = el.parentElement;
    while (node && node !== slide && !node.hasAttribute("data-slide-canvas")) {
      const style = getComputedStyle(node);
      if (style.overflow !== "visible" || style.clipPath !== "none") {
        return node.getBoundingClientRect();
      }
      node = node.parentElement;
    }
    return null;
  };

  /** Padding box plus the room a font's ink legitimately needs outside its lines. */
  const textBoxOf = (el: HTMLElement) => {
    const box = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const pad = (value: string) => parseFloat(value || "0");
    const fontSize = parseFloat(style.fontSize || "16");
    const lineHeight = parseFloat(style.lineHeight || "0") || fontSize * 1.2;
    // Fonts paint roughly 1.34x their size; a tight line-height leaves the rest
    // above and below the line box, which is normal, not a layout bug.
    const allowance = Math.max(0, (fontSize * 1.34 - lineHeight) / 2);
    return {
      left: box.left + pad(style.paddingLeft) + pad(style.borderLeftWidth),
      right: box.right - pad(style.paddingRight) - pad(style.borderRightWidth),
      top: box.top + pad(style.paddingTop) + pad(style.borderTopWidth),
      bottom: box.bottom - pad(style.paddingBottom) - pad(style.borderBottomWidth),
      allowance,
      scrollX: el.scrollWidth - el.clientWidth,
      scrollY: el.scrollHeight - el.clientHeight,
      clips: style.overflow !== "visible",
    };
  };

  /** How far this element's text ink escapes its box, after the allowance. */
  const inkSpill = (el: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const box = textBoxOf(el);
    let top = Infinity;
    let bottom = -Infinity;
    let left = Infinity;
    let right = -Infinity;
    for (const rect of Array.from(range.getClientRects())) {
      if (rect.width === 0 || rect.height === 0) continue;
      top = Math.min(top, rect.top);
      bottom = Math.max(bottom, rect.bottom);
      left = Math.min(left, rect.left);
      right = Math.max(right, rect.right);
    }
    range.detach();
    if (top === Infinity) return { vertical: 0, horizontal: 0, box };
    const vertical =
      Math.max(box.top - top, bottom - box.bottom) - box.allowance;
    const horizontal =
      Math.max(box.left - left, right - box.right) - box.allowance;
    return { vertical, horizontal, box };
  };

  const overflowing: RawSlideFindings["overflowing"] = [];
  const clipped: RawSlideFindings["clipped"] = [];

  for (const el of Array.from(slide.querySelectorAll<HTMLElement>("*"))) {
    const box = el.getBoundingClientRect();
    if (box.width === 0 && box.height === 0) continue;

    // --- past the canvas ---------------------------------------------------
    //
    // Only TEXT matters here. A decorative shape hanging past the edge is fine
    // (the slide clips it, nothing is lost). Text that runs past 1920x1080 is
    // cut off when the slide is projected or printed.
    //
    // If an ancestor between the text and the canvas already clips it, the deck
    // clipped it on purpose — that is a design decision, and any text it loses
    // is reported by the "does not fit its box" check below.
    if (
      overflowing.length < 25 &&
      (el.textContent ?? "").trim().length > 0 &&
      el.children.length === 0 &&
      deckClipper(el) === null
    ) {
      const style = getComputedStyle(el);
      const pad = (value: string) => parseFloat(value || "0");
      const inner = {
        left: box.left + pad(style.paddingLeft) + pad(style.borderLeftWidth),
        right: box.right - pad(style.paddingRight) - pad(style.borderRightWidth),
        top: box.top + pad(style.paddingTop) + pad(style.borderTopWidth),
        bottom: box.bottom - pad(style.paddingBottom) - pad(style.borderBottomWidth),
      };

      const edges: string[] = [];
      if (inner.left < root.left - args.tolerance) edges.push("left");
      if (inner.right > root.right + args.tolerance) edges.push("right");
      if (inner.top < root.top - args.tolerance) edges.push("top");
      if (inner.bottom > root.bottom + args.tolerance) edges.push("bottom");

      if (edges.length > 0) {
        overflowing.push({
          selector: describe(el),
          text: (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 60),
          box: `${Math.round(box.width)}x${Math.round(box.height)} @ ${Math.round(box.left - root.left)},${Math.round(box.top - root.top)}`,
          edges,
        });
      }
    }

    // --- text that does not fit its box -----------------------------------
    if (clipped.length >= 25) continue;
    if ((el.textContent ?? "").trim().length === 0) continue;

    const cuts = el.scrollWidth - el.clientWidth > args.clipTolerance ||
      el.scrollHeight - el.clientHeight > args.clipTolerance;

    if (el.children.length === 0) {
      // Leaf: the element draws the text itself.
      const spill = inkSpill(el);
      if (spill.vertical > args.clipTolerance || spill.horizontal > args.clipTolerance) {
        clipped.push({
          selector: describe(el),
          text: (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 60),
          detail: spill.box.clips && cuts
            ? `clipped by overflow, content is ${el.scrollWidth}x${el.scrollHeight} in a ${el.clientWidth}x${el.clientHeight} box`
            : `text spills ${Math.round(Math.max(spill.vertical, spill.horizontal))}px past its box`,
        });
      }
      continue;
    }

    // Container: only a problem when TEXT is what got clipped. A decorative
    // shape overflowing an ancestor that hides it is a design choice.
    if (!cuts || !textBoxOf(el).clips) continue;

    // If the only thing hiding it is the harness canvas, the text simply runs
    // off the 1920x1080 sheet — reported once, by the canvas check above.
    if (deckClipper(el) === null) continue;

    const cutBox = el.getBoundingClientRect();
    const cutStyle = getComputedStyle(el);
    const padL = parseFloat(cutStyle.paddingLeft || "0");
    const padR = parseFloat(cutStyle.paddingRight || "0");
    const padT = parseFloat(cutStyle.paddingTop || "0");
    const padB = parseFloat(cutStyle.paddingBottom || "0");
    const visible = {
      left: cutBox.left + padL,
      right: cutBox.right - padR,
      top: cutBox.top + padT,
      bottom: cutBox.bottom - padB,
    };

    let culprit: HTMLElement | undefined;
    let worst = 0;
    for (const leaf of Array.from(el.querySelectorAll<HTMLElement>("*"))) {
      if (leaf.children.length > 0) continue;
      if ((leaf.textContent ?? "").trim().length === 0) continue;
      const r = leaf.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const over = Math.max(
        visible.left - r.left,
        r.right - visible.right,
        visible.top - r.top,
        r.bottom - visible.bottom,
      );
      if (over > args.clipTolerance && over > worst) {
        worst = over;
        culprit = leaf;
      }
    }

    if (culprit) {
      clipped.push({
        selector: describe(culprit),
        text: (culprit.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 60),
        detail: `clipped by "${describe(el).slice(0, 40)}" — ${Math.round(worst)}px of text is hidden`,
      });
    }
  }

  const brokenImages: string[] = [];
  for (const image of Array.from(slide.querySelectorAll("img"))) {
    if (image.complete && image.naturalWidth === 0) {
      brokenImages.push(image.currentSrc || image.getAttribute("src") || "(inline)");
    }
  }

  const fontsUsed = new Set<string>();
  let inspected = 0;
  for (const el of Array.from(slide.querySelectorAll<HTMLElement>("h1,h2,h3,p,span,li,div"))) {
    if (inspected >= 300) break;
    if ((el.textContent ?? "").trim().length === 0) continue;
    if (el.children.length > 0) continue;
    const family = getComputedStyle(el).fontFamily.split(",")[0]?.trim().replace(/^["']|["']$/g, "");
    if (family) fontsUsed.add(family);
    inspected += 1;
  }

  return {
    overflowing,
    clipped,
    brokenImages,
    fontsUsed: [...fontsUsed],
    offCanvasRoot: root.width < args.canvasWidth - 1 || root.height < args.canvasHeight - 1,
  };
}

interface PageIssues {
  errors: string[];
  failedRequests: string[];
}

function attachListeners(page: Page, issues: PageIssues): void {
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    // React's dev-only warnings are noise for a deck author.
    if (text.includes("Warning: ") && !text.includes("Error")) return;
    issues.errors.push(text.slice(0, 220));
  });
  page.on("pageerror", (error) => {
    issues.errors.push(`uncaught: ${error.message.slice(0, 220)}`);
  });
  page.on("requestfailed", (request) => {
    const failure = request.failure()?.errorText ?? "failed";
    if (failure.includes("ERR_ABORTED")) return;
    issues.failedRequests.push(`${request.url().replace(/^https?:\/\/[^/]+/, "")} (${failure})`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      issues.failedRequests.push(`${response.url().replace(/^https?:\/\/[^/]+/, "")} (HTTP ${response.status()})`);
    }
  });
}

/** The families an `@font-face` actually registered in this page. */
async function collectLoadedFonts(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const loaded = new Set<string>();
    document.fonts.forEach((face) => {
      loaded.add(face.family.replace(/^["']|["']$/g, ""));
    });
    return [...loaded];
  });
}

/** Runs the browser checks for one deck and writes screenshots. */
export async function runRuntimeChecks(
  browser: Browser,
  baseUrl: string,
  deck: DeckFiles,
  slideCount: number,
  declaredFonts: readonly string[],
): Promise<{ problems: Problem[]; screenshots: string[] }> {
  const problems: Problem[] = [];
  const screenshots: string[] = [];
  const outDir = join(process.cwd(), ".validation", deck.slug);
  mkdirSync(outDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });

  try {
    const page = await context.newPage();
    const issues: PageIssues = { errors: [], failedRequests: [] };
    attachListeners(page, issues);

    for (let index = 1; index <= slideCount; index += 1) {
      const label = `slide ${index}`;
      issues.errors.length = 0;
      issues.failedRequests.length = 0;

      const url = `${baseUrl}/export/${encodeURIComponent(deck.slug)}?export=1&slide=${index}`;
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: timeoutMs });
        await page.waitForFunction(() => document.querySelector("[data-slide]") !== null, undefined, {
          timeout: timeoutMs,
        });
        await waitForStablePage(page);
        // Hide every slide but this one, so measurements are one page's worth.
        await page.evaluate((wanted) => {
          for (const node of Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"))) {
            if (Number(node.dataset.slide) !== wanted) node.style.display = "none";
          }
        }, index);
        await page.waitForTimeout(120);
      } catch (cause) {
        problems.push({
          severity: "error",
          where: label,
          message: `failed to render (${(cause as Error).message.split("\n")[0]})`,
          hint: "open the export route in the browser to see the React error; fix the component before re-validating.",
        });
        continue;
      }

      const findings = await page.evaluate(collectFindings, {
        slideIndex: index,
        tolerance: canvasTolerancePx,
        clipTolerance: clipTolerancePx,
        canvasWidth: CANVAS_WIDTH,
        canvasHeight: CANVAS_HEIGHT,
      });

      const shot = join(outDir, `slide-${String(index).padStart(2, "0")}.png`);
      try {
        await page.locator(`[data-slide="${index}"]`).screenshot({ path: shot });
        screenshots.push(shot);
      } catch {
        // A screenshot failure is not a validation failure; the others still land.
      }

      for (const error of issues.errors.slice(0, 3)) {
        problems.push({
          severity: "error",
          where: label,
          message: `console error: ${error}`,
          hint: "fix the exception; a console error during render usually means a bad import or a null prop.",
        });
      }

      for (const failure of [...new Set(issues.failedRequests)].slice(0, 5)) {
        problems.push({
          severity: "error",
          where: label,
          message: `failed request: ${failure}`,
          hint: "the asset is missing or misspelled; check the path relative to the slide file.",
        });
      }

      if (findings.offCanvasRoot) {
        problems.push({
          severity: "error",
          where: label,
          message: "the slide root is not 1920x1080",
          hint: "slides must fill the canvas: use h-full w-full on the root element.",
        });
      }

      for (const item of findings.clipped.slice(0, 4)) {
        problems.push({
          severity: "error",
          where: label,
          message: `text is cut off in ${item.selector} (${item.detail})`,
          hint: "give the box more room, reduce the font size, or let it grow with its content.",
        });
      }

      for (const item of findings.overflowing.slice(0, 4)) {
        problems.push({
          severity: "error",
          where: label,
          message: `text runs past the canvas in ${item.selector} (${item.edges.join("/")} edge, ${item.box})`,
          hint: "text outside 1920x1080 is cut off when projected or printed; move it inside, or clip it deliberately with a parent inside the slide.",
        });
      }

      for (const broken of findings.brokenImages.slice(0, 4)) {
        problems.push({
          severity: "error",
          where: label,
          message: `broken image: ${broken}`,
          hint: "the file does not exist or failed to decode; check assets/ and the import path.",
        });
      }

      const loadedFonts = await collectLoadedFonts(page);
      const missing = findings.fontsUsed.filter(
        (family) =>
          declaredFonts.includes(family) &&
          !loadedFonts.some((loaded) => loaded.toLowerCase() === family.toLowerCase()),
      );
      for (const family of [...new Set(missing)].slice(0, 3)) {
        problems.push({
          severity: "warn",
          where: label,
          message: `"${family}" fell back to a system font (no matching @font-face loaded)`,
          hint: `check the @font-face src for ${family} in assets/, and that the file is imported and inside the presentation directory.`,
        });
      }
    }
  } finally {
    await context.close();
  }

  return { problems, screenshots };
}