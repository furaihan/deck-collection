import type { Page } from "playwright";

/**
 * The settlement wait, executed **inside** the page. It mirrors
 * `src/lib/exportReady.ts` — kept as one self-contained function so Playwright
 * can serialise it — and is belt-and-braces next to `window.__EXPORT_READY__`:
 * the flag proves the app finished its own checks, this proves it again.
 */
export async function waitForStablePage(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T | void> =>
      Promise.race([
        promise,
        new Promise<void>((resolve) => {
          setTimeout(resolve, ms);
        }),
      ]);

    const frame = (): Promise<void> =>
      new Promise((resolve) => {
        requestAnimationFrame(() => resolve());
      });

    await withTimeout(document.fonts.ready.then(() => undefined), 10_000);

    await withTimeout(
      Promise.all(
        Array.from(document.images).map(async (image) => {
          if (!image.complete) {
            await new Promise<void>((resolve) => {
              const done = () => {
                image.removeEventListener("load", done);
                image.removeEventListener("error", done);
                resolve();
              };
              image.addEventListener("load", done, { once: true });
              image.addEventListener("error", done, { once: true });
            });
          }
          if (typeof image.decode === "function") {
            await image.decode().catch(() => undefined);
          }
        }),
      ),
      15_000,
    );

    const urls = new Set<string>();
    const pattern = /url\(\s*(['"]?)([^'")]+)\1\s*\)/g;
    for (const element of Array.from(document.querySelectorAll<HTMLElement>("*"))) {
      const style = getComputedStyle(element);
      for (const value of [style.backgroundImage, style.background, style.content]) {
        let match = pattern.exec(value);
        while (match) {
          if (match[2]) urls.add(match[2].trim());
          match = pattern.exec(value);
        }
      }
    }
    await withTimeout(
      Promise.all(
        Array.from(urls)
          .filter((url) => !url.startsWith("data:"))
          .map(
            (url) =>
              new Promise<void>((resolve) => {
                const probe = new Image();
                probe.onload = () => resolve();
                probe.onerror = () => resolve();
                probe.src = url;
              }),
          ),
      ),
      15_000,
    );

    await frame();
    await frame();
  });
}

/** Waits for the export page's ready flag, or fails with a readable message. */
export async function waitForExportReady(page: Page, timeoutMs: number): Promise<void> {
  try {
    await page.waitForFunction(
      () => window.__EXPORT_READY__ === true || typeof window.__EXPORT_ERROR__ === "string",
      undefined,
      { timeout: timeoutMs, polling: 100 },
    );
  } catch {
    const state = await page
      .evaluate(() => ({
        ready: window.__EXPORT_READY__ === true,
        error: window.__EXPORT_ERROR__ ?? null,
        slides: document.querySelectorAll("[data-slide]").length,
      }))
      .catch(() => ({ ready: false, error: null, slides: 0 }));
    throw new Error(
      `The export page did not signal readiness within ${Math.round(timeoutMs / 1000)}s ` +
        `(slides rendered: ${state.slides}${state.error ? `, page error: ${state.error}` : ""}). ` +
        "Fonts or images never settled — check for a missing asset or an endless animation.",
    );
  }

  const error = await page.evaluate(() => window.__EXPORT_ERROR__);
  if (error) {
    throw new Error(`The export page reported an error: ${error}`);
  }
}
