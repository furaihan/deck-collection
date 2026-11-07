import { CodeBlock, fitSize } from "../CodeBlock";
import { CropMark, Sheet, Title } from "../Frame";
import { C, FONT, T, TOTAL } from "../theme";

const LINES = [
  "const n = 1",
  "const entry = library.get(slug)",
  "const slides = await entry.load({ eager: false })",
  "const region = pickRegion({ width: 1312, lines: 4, glyph: 0.65 })",
  "return entries.sort((a, b) => b.date.localeCompare(a.date) || a.title)",
];

const WIDTH = 1400;
const CAP = 34;

/**
 * The stress case: one width, five lines. Short lines sit at the deck's display
 * size; the longest one pulls the block down to 28px. Past the 24px floor the
 * component refuses to render.
 */
export default function Slide06() {
  return (
    <Sheet n={6} total={TOTAL} section="The limit">
      <CropMark corner="tr" />

      <Title size={56} max={1240}>
        The longest line sets the size.
      </Title>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 30,
          flex: "1 1 auto",
          minHeight: 0,
        }}
      >
        {LINES.map((line) => {
          const { fontSize, longest } = fitSize({
            code: line,
            width: WIDTH,
            size: CAP,
            lineNumbers: false,
          });

          return (
            <div key={line} style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <div
                style={{
                  width: 150,
                  flex: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: T.small,
                    fontWeight: 500,
                    color: C.risoDeep,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                  }}
                >
                  {fontSize}px
                </span>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: T.micro,
                    color: C.inkFaint,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                  }}
                >
                  {longest} chars
                </span>
              </div>

              <CodeBlock code={line} width={WIDTH} size={CAP} lineNumbers={false} />
            </div>
          );
        })}
      </div>

      <p
        style={{
          marginTop: 32,
          flex: "none",
          fontFamily: FONT.text,
          fontSize: T.small,
          lineHeight: 1.4,
          color: C.inkSoft,
          maxWidth: 1500,
        }}
      >
        The floor is 24px. Past it the block throws at render, so a line that cannot be printed
        is a build error rather than a clipped PDF.
      </p>
    </Sheet>
  );
}
