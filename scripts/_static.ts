/**
 * Static (no-browser) checks for one presentation directory.
 *
 * Everything here is a rule an agent can fix by editing source: metadata shape,
 * imports, units, theme tokens, external resources, asset weight. Runtime
 * checks — overflow, broken images, consoles — live in `scripts/_runtime.ts`.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";
import { z } from "zod";
import { presentationsConfig } from "../presentations.config";
import type { DeckFiles } from "./_decks";
import { formatBytes } from "./_decks";

export type Severity = "error" | "warn";

export interface Problem {
  severity: Severity;
  /** Where the problem is, e.g. `slide 3`, `slides/Slide02.tsx:12`. */
  where: string;
  message: string;
  hint: string;
}

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".css", ".js", ".jsx"]);
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);
const FONT_EXTENSIONS = new Set([".woff2", ".woff", ".ttf", ".otf"]);

/** `presentation.json` as the app itself expects it. */
const metaSchema = z.object({
  title: z.string().trim().min(1, "must be a non-empty string"),
  description: z.string().trim().min(1, "must be a non-empty string"),
  course: z.string().trim().min(1).optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date (YYYY-MM-DD)")
    .refine((value) => {
      const parsed = new Date(`${value}T00:00:00Z`);
      return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
    }, "is not a real calendar date"),
  visibility: z.enum(["public", "private"]),
});

interface SourceFile {
  /** Path relative to the presentation directory, forward-slashed. */
  rel: string;
  abs: string;
  text: string;
}

function readSources(deck: DeckFiles): SourceFile[] {
  const files: SourceFile[] = [];

  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "assets" || entry.name === "node_modules") continue;
        walk(abs);
      } else if (SOURCE_EXTENSIONS.has(extname(entry.name))) {
        files.push({
          rel: relative(deck.dir, abs).replaceAll("\\", "/"),
          abs,
          text: readFileSync(abs, "utf8"),
        });
      }
    }
  };

  walk(deck.dir);
  return files;
}

function lineOf(text: string, index: number): number {
  return text.slice(0, index).split("\n").length;
}

/** Every `from "x"` / `import("x")` / `require("x")` specifier, with its index. */
function importSpecifiers(text: string): { specifier: string; index: number }[] {
  const pattern =
    /(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|\bimport\s+)(["'])([^"']+)\1/g;
  const found: { specifier: string; index: number }[] = [];
  let match = pattern.exec(text);
  while (match) {
    if (match[2]) found.push({ specifier: match[2], index: match.index });
    match = pattern.exec(text);
  }
  return found;
}

function checkMeta(deck: DeckFiles, problems: Problem[]): boolean {
  if (!existsSync(deck.metaPath)) {
    problems.push({
      severity: "error",
      where: "presentation.json",
      message: "missing",
      hint: "create presentations/<slug>/presentation.json with title, description, date and visibility.",
    });
    return false;
  }

  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(deck.metaPath, "utf8"));
  } catch (cause) {
    problems.push({
      severity: "error",
      where: "presentation.json",
      message: `is not valid JSON (${(cause as Error).message})`,
      hint: "fix the syntax: no trailing commas, double-quoted keys and strings.",
    });
    return false;
  }

  const parsed = metaSchema.safeParse(raw);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      problems.push({
        severity: "error",
        where: "presentation.json",
        message: `"${issue.path.join(".") || "(root)"}" ${issue.message}`,
        hint: 'expected { title, description, course?, date: "YYYY-MM-DD", visibility: "public" | "private" }.',
      });
    }
    return false;
  }

  return true;
}

interface EntryAnalysis {
  ok: boolean;
  /** Resolved absolute paths listed in the default export array. */
  referenced: Set<string>;
}

function checkEntry(deck: DeckFiles, problems: Problem[]): EntryAnalysis {
  const referenced = new Set<string>();

  if (!existsSync(deck.entryPath)) {
    problems.push({
      severity: "error",
      where: "Presentation.tsx",
      message: "missing",
      hint: "default-export an ordered array of slide components, e.g. `export default [Slide01, Slide02]`.",
    });
    return { ok: false, referenced };
  }

  const text = readFileSync(deck.entryPath, "utf8");

  // Resolve each relative import to a file, keyed by the local binding name.
  const imports = new Map<string, string>();
  for (const { specifier } of importSpecifiers(text)) {
    if (!specifier.startsWith(".")) continue;
    const base = resolve(deck.dir, specifier);
    for (const candidate of [
      base,
      `${base}.tsx`,
      `${base}.ts`,
      join(base, "index.tsx"),
      join(base, "index.ts"),
    ]) {
      if (existsSync(candidate) && statSync(candidate).isFile()) {
        imports.set(basename(specifier), candidate);
        break;
      }
    }
  }

  const defaultMatch = /export\s+default\s*\[([\s\S]*?)\]/.exec(text);
  if (!defaultMatch) {
    const bare = /export\s+default\s+([A-Za-z_$][\w$]*)\s*;/.exec(text);
    problems.push({
      severity: "error",
      where: "Presentation.tsx",
      message: bare
        ? `default export is "${bare[1]}", not an inline array literal`
        : "has no default export",
      hint: "end the file with `export default [Slide01, Slide02];` — array order is slide order.",
    });
    return { ok: false, referenced };
  }

  const body = defaultMatch[1] ?? "";
  if (body.trim().length === 0) {
    problems.push({
      severity: "error",
      where: "Presentation.tsx",
      message: "default export is an empty array",
      hint: "add at least one slide; an empty deck renders nothing and exports a blank PDF.",
    });
    return { ok: false, referenced };
  }

  for (const token of body.split(/[^\w$]+/)) {
    if (!token) continue;
    const path = imports.get(token);
    if (path) referenced.add(path);
  }

  return { ok: true, referenced };
}

const THEME_TOKENS = presentationsConfig.bannedThemeTokens;
const THEME_VAR = new RegExp(`var\\(\\s*--(${THEME_TOKENS.join("|")})\\b`);
const THEME_UTILITY = new RegExp(
  `(?:^|[\\s"'\`:])(?:[a-z-]+:)*` +
    `(?:bg|text|border|from|via|to|ring|fill|stroke|outline|divide|shadow|decoration|placeholder|caret|accent)` +
    `-(${THEME_TOKENS.join("|")})\\b`,
);

const BANNED_UNIT = new RegExp(
  `(?<![\\w-])(?:\\d*\\.?\\d+)(${presentationsConfig.bannedUnits.join("|")})\\b`,
);
const BANNED_UTILITY = new RegExp(
  `(?:^|[\\s"'\`:])(?:[a-z-]+:)*(${presentationsConfig.bannedUtilities.join("|")})\\b`,
);

const EXTERNAL = [
  { pattern: /\b(?:src|href|poster|data)\s*=\s*\{[^}]*(["'`])https?:\/\//, kind: "attribute" },
  { pattern: /\b(?:src|href|poster)\s*=\s*(["'`])https?:\/\//, kind: "attribute" },
  { pattern: /url\(\s*["']?\s*https?:\/\//, kind: "CSS url()" },
  { pattern: /@import\s+(?:url\()?\s*["']?\s*(?:https?:)?\/\//, kind: "@import" },
];

function isAllowedSpecifier(specifier: string): boolean {
  if (specifier.startsWith(".")) return true;
  const root = specifier.startsWith("@")
    ? specifier.split("/").slice(0, 2).join("/")
    : specifier.split("/")[0]!;
  return (presentationsConfig.allowedImports as readonly string[]).includes(root);
}

function checkSources(deck: DeckFiles, problems: Problem[]): void {
  for (const file of readSources(deck)) {
    const where = (index: number) => `${file.rel}:${lineOf(file.text, index)}`;

    // Imports -------------------------------------------------------------
    for (const { specifier, index } of importSpecifiers(file.text)) {
      if (specifier.startsWith("@/components/ui/")) {
        problems.push({
          severity: "error",
          where: where(index),
          message: `imports the app's shadcn components ("${specifier}")`,
          hint: "slides are standalone: draw the UI yourself with divs and Tailwind utilities.",
        });
        continue;
      }

      if (specifier.startsWith("@/")) {
        problems.push({
          severity: "error",
          where: where(index),
          message: `imports app code ("${specifier}")`,
          hint: "only relative imports inside the presentation directory are allowed.",
        });
        continue;
      }

      if (!isAllowedSpecifier(specifier)) {
        problems.push({
          severity: "error",
          where: where(index),
          message: `imports "${specifier}", which is not on the allowlist`,
          hint: `ask the user before adding dependencies; allowed: ${presentationsConfig.allowedImports.join(", ")}, and relative files.`,
        });
      }
    }

    // shadcn theme tokens --------------------------------------------------
    const themeVar = THEME_VAR.exec(file.text);
    if (themeVar) {
      problems.push({
        severity: "error",
        where: where(themeVar.index),
        message: `uses the app theme variable "--${themeVar[1]}"`,
        hint: "define the deck's own colours (a local theme.ts); shell tokens do not exist inside a slide.",
      });
    }

    const themeUtility = THEME_UTILITY.exec(file.text);
    if (themeUtility) {
      problems.push({
        severity: "error",
        where: where(themeUtility.index),
        message: `uses the app theme utility "${themeUtility[0].trim().replace(/^[:"']/, "")}"`,
        hint: "replace it with an explicit colour, e.g. bg-[#0d1b2a] or a value from the deck's own theme file.",
      });
    }

    // Viewport units -------------------------------------------------------
    const unit = BANNED_UNIT.exec(file.text);
    if (unit) {
      problems.push({
        severity: "error",
        where: where(unit.index),
        message: `uses the viewport unit "${unit[0]}"`,
        hint: "the canvas is 1920x1080 px, not the viewport: use px (or % of the slide).",
      });
    }

    const utility = BANNED_UTILITY.exec(file.text);
    if (utility) {
      problems.push({
        severity: "error",
        where: where(utility.index),
        message: `uses the viewport utility "${utility[1]}"`,
        hint: "use h-[1080px] w-[1920px], or h-full/w-full when filling the slide.",
      });
    }

    // External resources ---------------------------------------------------
    for (const { pattern, kind } of EXTERNAL) {
      const match = pattern.exec(file.text);
      if (!match) continue;
      problems.push({
        severity: "error",
        where: where(match.index),
        message: `loads an external resource (${kind})`,
        hint: "bundle the asset in the presentation's assets/ folder and import it relatively; no CDNs, no remote fonts.",
      });
    }
  }
}

function checkOrphans(deck: DeckFiles, referenced: Set<string>, problems: Problem[]): void {
  if (!existsSync(deck.slidesDir)) {
    problems.push({
      severity: "warn",
      where: "slides/",
      message: "directory is missing",
      hint: "put one component per slide in slides/ so the deck stays readable.",
    });
    return;
  }

  const files = readdirSync(deck.slidesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && SOURCE_EXTENSIONS.has(extname(entry.name)))
    .map((entry) => join(deck.slidesDir, entry.name));

  for (const file of files) {
    if (referenced.has(file)) continue;
    problems.push({
      severity: "warn",
      where: `slides/${basename(file)}`,
      message: "is not referenced by Presentation.tsx",
      hint: "add it to the default-export array, or delete the file.",
    });
  }
}

function checkAssets(deck: DeckFiles, problems: Problem[]): void {
  if (!existsSync(deck.assetsDir)) return;

  const names = readdirSync(deck.assetsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  for (const name of names) {
    if (!IMAGE_EXTENSIONS.has(extname(name).toLowerCase())) continue;
    const size = statSync(join(deck.assetsDir, name)).size;
    if (size <= presentationsConfig.maxImageBytes) continue;
    problems.push({
      severity: "warn",
      where: `assets/${name}`,
      message: `is ${formatBytes(size)}, over the ${formatBytes(presentationsConfig.maxImageBytes)} budget`,
      hint: "resize to <= 1920px wide and convert to WebP/JPEG; it goes straight into the PDF.",
    });
  }

  checkFonts(deck, names, problems);
}

/**
 * A bundled font that no `@font-face` points at is dead weight in the PDF and a
 * silent fallback for the text that wanted it.
 */
function checkFonts(deck: DeckFiles, assetNames: readonly string[], problems: Problem[]): void {
  const fontFiles = assetNames.filter((name) => FONT_EXTENSIONS.has(extname(name).toLowerCase()));
  if (fontFiles.length === 0) return;

  const referenced = new Set<string>();
  for (const file of readSources(deck)) {
    for (const block of file.text.matchAll(/@font-face\s*\{[^}]*\}/g)) {
      for (const url of block[0].matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
        const target = url[1];
        if (target) referenced.add(basename(target.split(/[?#]/)[0] ?? target));
      }
    }
  }

  for (const name of fontFiles) {
    // Vite fingerprints imported assets, so match on the stem as well.
    const stem = name.slice(0, name.length - extname(name).length);
    const hit = [...referenced].some((target) => {
      const targetName = basename(target);
      const targetStem = targetName.slice(0, targetName.length - extname(targetName).length);
      return (
        targetName === name ||
        targetStem === stem ||
        stem.startsWith(targetStem) ||
        targetStem.startsWith(stem)
      );
    });

    if (hit) continue;
    problems.push({
      severity: "warn",
      where: `assets/${name}`,
      message: "is not referenced by any @font-face",
      hint: `either load it with @font-face { src: url('./assets/${name}') } or delete it.`,
    });
  }
}

/** All static checks for one deck. */
export function runStaticChecks(deck: DeckFiles): Problem[] {
  const problems: Problem[] = [];

  checkMeta(deck, problems);
  const entry = checkEntry(deck, problems);
  checkSources(deck, problems);
  if (entry.ok) checkOrphans(deck, entry.referenced, problems);
  checkAssets(deck, problems);

  return problems;
}

/**
 * Font families a deck declares, so runtime checks can tell an honest fallback
 * from a broken one.
 *
 * A family counts as declared when the deck authors it explicitly: a
 * `font-family` inside `@font-face`, or an inline `fontFamily` style. The
 * canvas's own base font is not the deck's promise, so it is not checked.
 */
export function collectDeclaredFontFamilies(deck: DeckFiles): string[] {
  const families = new Set<string>();

  const add = (value: string) => {
    for (const part of value.split(",")) {
      const name = part.trim().replace(/^["'`]|["'`]$/g, "");
      if (name && !name.startsWith("var(") && !name.startsWith("--") && !name.includes("(")) {
        families.add(name);
      }
    }
  };

  for (const file of readSources(deck)) {
    for (const block of file.text.matchAll(/@font-face\s*\{[^}]*\}/g)) {
      const family = /font-family\s*:\s*([^;}]+)/.exec(block[0]);
      if (family?.[1]) add(family[1]);
    }

    // Inner quotes are normal: fontFamily: "'Playfair Display', serif".
    for (const match of file.text.matchAll(/fontFamily\s*:\s*(["'`])((?:(?!\1)[\s\S])*)\1/g)) {
      if (match[2]) add(match[2]);
    }
  }

  return [...families];
}
