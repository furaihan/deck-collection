/**
 * The wait every capture must do before the page is considered stable.
 *
 * `/export/$slug?export=1` runs this and then sets `window.__EXPORT_READY__`;
 * `scripts/export.ts` and `scripts/validate.ts` wait for that flag. Keeping the
 * sequence here means the PDF and the screenshots settle the same way.
 */

const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T | void> =>
  Promise.race([
    promise,
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    }),
  ]);

/** One animation frame. */
function frame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

/**
 * Every `<img>` present, complete, and decoded. A decode failure is not fatal
 * here: the validators report broken images, the export just proves it waited.
 */
async function waitForImages(): Promise<void> {
  const images = Array.from(document.images);

  await Promise.all(
    images.map(async (image) => {
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
  );
}

/** Extract `url(...)` targets from a computed background/background-image value. */
function urlsIn(value: string): string[] {
  const found: string[] = [];
  const pattern = /url\(\s*(['"]?)([^'")]+)\1\s*\)/g;
  let match = pattern.exec(value);
  while (match) {
    if (match[2]) found.push(match[2].trim());
    match = pattern.exec(value);
  }
  return found;
}

/**
 * Best effort: every CSS background image on the page is fetched. Elements that
 * use a data URL are already decoded, and anything that fails resolves anyway.
 */
async function waitForBackgroundImages(): Promise<void> {
  const seen = new Set<string>();

  for (const element of Array.from(document.querySelectorAll<HTMLElement>("*"))) {
    const style = getComputedStyle(element);
    for (const url of [...urlsIn(style.backgroundImage), ...urlsIn(style.background), ...urlsIn(style.content)]) {
      if (url.startsWith("data:") || seen.has(url)) continue;
      seen.add(url);
      await new Promise<void>((resolve) => {
        const probe = new Image();
        probe.onload = () => resolve();
        probe.onerror = () => resolve();
        probe.src = url;
      });
    }
  }
}

/** Resolves once fonts, images and two animation frames have settled. */
export async function waitForStableAssets(): Promise<void> {
  await withTimeout(document.fonts.ready.then(() => undefined), 10_000);
  await withTimeout(waitForImages(), 15_000);
  await withTimeout(waitForBackgroundImages(), 15_000);
  await frame();
  await frame();
}
