/**
 * `bun run new <slug> "<Title>"`
 *
 * Scaffolds `presentations/<slug>/` with valid metadata, a three-slide array and
 * the three slide templates. The result passes `bun run validate` unchanged, so
 * an agent can start writing content immediately.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USAGE = `Usage: bun run new <slug> "<Title>"

  slug   kebab-case, becomes the folder name and the URL
  title  the presentation's title, in quotes`;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Today in the machine's timezone, as YYYY-MM-DD. */
function today(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function metaTemplate(title: string): string {
  return `${JSON.stringify(
    {
      title,
      description: `Replace this with one sentence describing "${title}".`,
      date: today(),
      visibility: "private",
    },
    null,
    2,
  )}\n`;
}

const ENTRY_TEMPLATE = `import Slide01 from "./slides/Slide01";
import Slide02 from "./slides/Slide02";
import Slide03 from "./slides/Slide03";

// Array order is the presentation order — never derive it from file names.
export default [Slide01, Slide02, Slide03];
`;

const THEME_TEMPLATE = `/**
 * The deck's visual system, in one place: colours and type are declared once and
 * every slide reads them. Change the palette here, not in each slide.
 */
export const theme = {
  ink: "#16181d",
  paper: "#f6f4ef",
  accent: "#2f5d8f",
  muted: "#5c6a70",
  heading: 96,
  body: 34,
} as const;

export const fonts = {
  sans: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
} as const;
`;

const SLIDE_COVER = `import { theme, fonts } from "../theme";

/** Cover slide: one big idea, the presentation's title, and nothing else. */
export default function Slide01() {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden"
      style={{ background: theme.ink, color: theme.paper, fontFamily: fonts.sans }}
    >
      <div className="flex h-full flex-col justify-between px-[140px] py-[120px]">
        <p
          className="text-[24px] font-medium uppercase"
          style={{ letterSpacing: "0.24em", color: theme.accent }}
        >
          Replace with a kicker
        </p>

        <h1 className="max-w-[1280px] text-[112px] font-semibold leading-[0.98] tracking-[-0.03em]">
          Replace this with the <span style={{ color: theme.accent }}>title</span>.
        </h1>

        <div className="flex items-center gap-[24px] text-[26px]" style={{ color: theme.muted }}>
          <span className="h-px w-[120px]" style={{ background: theme.muted }} />
          <span>presentations/&lt;slug&gt;</span>
        </div>
      </div>
    </div>
  );
}
`;

const SLIDE_POINTS = `import { theme, fonts } from "../theme";

const points = [
  { title: "First idea", body: "One idea per slide. Replace this copy with the point you are making." },
  { title: "Second idea", body: "Keep body text at 28px or larger so it survives the PDF export." },
  { title: "Third idea", body: "Group related content; leave whitespace around it." },
];

/** Content slide: a heading and a short, scannable list. */
export default function Slide02() {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden px-[140px] py-[112px]"
      style={{ background: theme.paper, color: theme.ink, fontFamily: fonts.sans }}
    >
      <div
        className="flex items-baseline justify-between border-b pb-[36px]"
        style={{ borderColor: "rgba(22,24,29,0.15)" }}
      >
        <h2 className="text-[76px] font-semibold leading-[1.05] tracking-[-0.03em]">
          Replace with a section heading
        </h2>
        <span className="text-[24px] font-medium" style={{ color: theme.muted, letterSpacing: "0.18em" }}>
          02
        </span>
      </div>

      <ul className="mt-[64px] grid grid-cols-1 gap-[40px]" style={{ maxWidth: 1500 }}>
        {points.map((point) => (
          <li key={point.title} className="flex gap-[28px]">
            <span className="mt-[16px] block h-[3px] w-[56px] shrink-0" style={{ background: theme.accent }} />
            <div>
              <p className="text-[42px] font-semibold leading-[1.25]">{point.title}</p>
              <p className="mt-[10px] text-[28px] leading-[1.5]" style={{ color: theme.muted }}>
                {point.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
`;

const SLIDE_STATEMENT = `import { theme, fonts } from "../theme";

/** Statement slide: one sentence, large, with room to breathe. */
export default function Slide03() {
  return (
    <div
      className="flex h-full w-full flex-col justify-center overflow-hidden px-[140px] py-[120px]"
      style={{ background: theme.paper, color: theme.ink, fontFamily: fonts.sans }}
    >
      <p
        className="text-[24px] font-medium uppercase"
        style={{ letterSpacing: "0.24em", color: theme.accent }}
      >
        Replace with a label
      </p>

      <blockquote className="mt-[40px] max-w-[1400px] text-[88px] font-medium leading-[1.12] tracking-[-0.03em]">
        &ldquo;Replace this with the one sentence this slide exists to say.&rdquo;
      </blockquote>

      <p className="mt-[48px] max-w-[1100px] text-[28px] leading-[1.5]" style={{ color: theme.muted }}>
        A supporting line, if it earns its place. If it does not, delete it.
      </p>
    </div>
  );
}
`;

function main(): number {
  const [slug, ...rest] = process.argv.slice(2);

  if (!slug || rest.length === 0 || slug === "--help" || slug === "-h") {
    console.log(USAGE);
    return slug ? 2 : 0;
  }

  const title = rest.join(" ").trim();

  if (!SLUG_PATTERN.test(slug)) {
    console.error(
      `"${slug}" is not a valid slug. Use kebab-case: lowercase letters, digits and single hyphens (e.g. linear-algebra-04).`,
    );
    return 2;
  }

  if (title.length === 0) {
    console.error("A non-empty title is required.\n\n" + USAGE);
    return 2;
  }

  const deckDir = join(process.cwd(), "presentations", slug);
  if (existsSync(deckDir)) {
    console.error(`presentations/${slug} already exists. Pick another slug, or edit that deck in place.`);
    return 2;
  }

  mkdirSync(join(deckDir, "slides"), { recursive: true });
  mkdirSync(join(deckDir, "assets"), { recursive: true });

  writeFileSync(join(deckDir, "presentation.json"), metaTemplate(title), "utf8");
  writeFileSync(join(deckDir, "Presentation.tsx"), ENTRY_TEMPLATE, "utf8");
  writeFileSync(join(deckDir, "theme.ts"), THEME_TEMPLATE, "utf8");
  writeFileSync(join(deckDir, "slides", "Slide01.tsx"), SLIDE_COVER, "utf8");
  writeFileSync(join(deckDir, "slides", "Slide02.tsx"), SLIDE_POINTS, "utf8");
  writeFileSync(join(deckDir, "slides", "Slide03.tsx"), SLIDE_STATEMENT, "utf8");

  console.log(`Created presentations/${slug}/ (3 slides, private).`);
  console.log("");
  console.log(`  presentations/${slug}/presentation.json`);
  console.log(`  presentations/${slug}/Presentation.tsx`);
  console.log(`  presentations/${slug}/theme.ts`);
  console.log(`  presentations/${slug}/slides/Slide01-03.tsx`);
  console.log(`  presentations/${slug}/assets/`);
  console.log("");
  console.log(`Next: write the slides, then \`bun run validate ${slug}\`.`);
  return 0;
}

process.exitCode = main();
