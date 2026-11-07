import { CodeBlock } from "../CodeBlock";
import { CropMark, Label, Sheet, Takeaway, Title } from "../Frame";
import { C, FONT, T, TOTAL } from "../theme";

const CONFIG = `{
  "title": "Linear algebra, week 4",
  "description": "Eigenvalues, diagonalisation.",
  "course": "MAT 204",
  "date": "2026-11-04",
  "visibility": "private"
}`;

const SHELL = `$ bun run validate code-block-demo
  code-block-demo (7 slides)
    ok
  PASS: 0 errors, 0 warnings

$ bun run export code-block-demo
  OK  code-block-demo: 7 slides -> 7 pages`;

const MATRIX = [
  ["ts / tsx", "TypeScript and JSX"],
  ["json", "Deck metadata, config"],
  ["shell", "bash and console transcripts"],
  ["plaintext", "The fallback for an unknown name"],
];

/**
 * Beyond TypeScript: the same block prints metadata and a terminal transcript,
 * and the language table is what keeps a deck's bundle to four modules.
 */
export default function Slide05() {
  return (
    <Sheet n={5} total={TOTAL} section="Beyond one language">
      <CropMark corner="tr" />

      <Title size={52}>
        Four of seventy-nine.
      </Title>

      <div style={{ display: "flex", gap: 36, marginTop: 26, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>presentation.json</Label>
          <CodeBlock code={CONFIG} lang="json" width={900} size={26} lineNumbers={false} />
        </div>

        <div style={{ width: 760, flex: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>Terminal</Label>
          <CodeBlock code={SHELL} lang="shell" width={760} size={26} lineNumbers={false} />
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          flex: "none",
          paddingTop: 20,
        }}
      >
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: T.micro,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.inkFaint,
            paddingBottom: 12,
            borderBottom: `1px solid ${C.ink}`,
            display: "block",
          }}
        >
          Registered for this deck
        </span>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: 32 }}>
          {MATRIX.map(([lang, why]) => (
            <div
              key={lang}
              style={{ display: "flex", flexDirection: "column", gap: 4, paddingBlock: 14 }}
            >
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: T.small,
                  fontWeight: 500,
                  color: C.risoDeep,
                }}
              >
                {lang}
              </span>
              <span style={{ fontFamily: FONT.text, fontSize: T.micro, lineHeight: 1.35, color: C.inkSoft }}>
                {why}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Takeaway>
        Each language is an isolated module. Unregistered names print as escaped plain text
        rather than failing the deck.
      </Takeaway>
    </Sheet>
  );
}
