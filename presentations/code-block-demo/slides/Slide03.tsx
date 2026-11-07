import { CodeBlock } from "../CodeBlock";
import { CropMark, Sheet, Title } from "../Frame";
import { C, FONT, T, TOTAL } from "../theme";

const USAGE = `import { CodeBlock } from "./CodeBlock";

<CodeBlock code={LOAD_DECK} width={1000}
  title="load-deck.ts" focus={[4]}
  mark={{ line: 4, text: "library.get(slug)" }} />`;

const NOTES = [
  { prop: "width", what: "The printed field. Every size derives from it." },
  { prop: "focus", what: "One-based lines to light, for the slide's point." },
  { prop: "mark", what: "The fragment to underline, named not offset." },
];

const ANATOMY = [
  { part: "Head", what: "File name and language, set in mono at 18px." },
  { part: "Gutter", what: "Line numbers at 76% of the code size." },
  { part: "Row", what: "A lit row bleeds to the slab's edge, not the padding." },
];

const MEASURE = {
  fontFamily: FONT.mono,
  fontSize: T.micro,
  letterSpacing: "0.14em",
  color: C.inkFaint,
} as const;

/** The component's surface: what you write, and what it decides for you. */
export default function Slide03() {
  return (
    <Sheet n={3} total={TOTAL} section="The component">
      <CropMark corner="tr" />

      <Title size={58} max={900}>
        Three props. Everything else is solved.
      </Title>

      <div style={{ display: "flex", gap: 52, marginTop: 34, alignItems: "flex-start" }}>
        <CodeBlock code={USAGE} lang="tsx" width={1000} size={28} title="slide.tsx" />

        <div style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: T.micro,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.inkFaint,
              paddingBottom: 14,
              borderBottom: `1px solid ${C.ink}`,
            }}
          >
            What each prop settles
          </span>

          {NOTES.map((note) => (
            <div
              key={note.prop}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingBlock: 18,
                borderBottom: `1px solid ${C.ruleSoft}`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: T.small,
                  fontWeight: 500,
                  color: C.risoDeep,
                }}
              >
                {note.prop}
              </span>
              <span style={{ fontFamily: FONT.text, fontSize: T.small, lineHeight: 1.4, color: C.inkSoft }}>
                {note.what}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          flex: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingBlock: 24,
          borderTop: `1px solid ${C.ruleSoft}`,
          borderBottom: `1px solid ${C.ruleSoft}`,
        }}
      >
        <span style={{ ...MEASURE }}>MEASURED · FIELD / LONGEST LINE / SOLVED SIZE</span>
        <span style={{ ...MEASURE, color: C.risoDeep }}>1000 px field · 47 chars · 27 px</span>
      </div>

      <div
        style={{
          flex: "none",
          display: "flex",
          gap: 40,
          paddingTop: 26,
        }}
      >
        {ANATOMY.map((part) => (
          <div key={part.part} style={{ flex: "1 1 0", display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: T.micro,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.risoDeep,
              }}
            >
              {part.part}
            </span>
            <span style={{ fontFamily: FONT.text, fontSize: T.small, lineHeight: 1.4, color: C.inkSoft }}>
              {part.what}
            </span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
