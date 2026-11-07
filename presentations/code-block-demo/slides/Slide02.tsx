import { CropMark, Prose, Sheet, Takeaway, Title } from "../Frame";
import { C, FONT, T, TOTAL } from "../theme";

const MEASURES = [
  { n: "1920", unit: "px", what: "the sheet", note: "Scaled to fit a projector, never resized." },
  { n: "1740", unit: "px", what: "the printed field", note: "90px of trim, then the content edge." },
  { n: "0.65", unit: "em", what: "one glyph of the mono face", note: "Fixed. Measure once, divide forever." },
];

/**
 * The rule. Before showing the component, establish why it exists: on a fixed
 * sheet, a line that does not fit is a line that gets cut off in print.
 */
export default function Slide02() {
  return (
    <Sheet n={2} total={TOTAL} section="The constraint">
      <CropMark corner="tr" />

      <div style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 auto", minWidth: 0 }}>
          <Title size={64} max={860}>
            A scrollbar is not a printed line.
          </Title>

          <Prose size={T.small} max={800} style={{ marginTop: 22 }}>
            Everywhere else a long line can overflow and the reader scrolls. Here the sheet is
            exactly 1920x1080, the PDF has no scrollbar, and text past the edge is gone.
          </Prose>

          <div style={{ marginTop: 40 }}>
            {MEASURES.map((measure, index) => (
              <div
                key={measure.what}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 22,
                  paddingBlock: 18,
                  borderTop: index === 0 ? `1px solid ${C.ink}` : `1px solid ${C.ruleSoft}`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 36,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: C.ink,
                    fontVariantNumeric: "tabular-nums",
                    width: 128,
                    flex: "none",
                    lineHeight: 1,
                  }}
                >
                  {measure.n}
                </span>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: T.micro,
                    letterSpacing: "0.14em",
                    color: C.risoDeep,
                    width: 34,
                    flex: "none",
                    lineHeight: 1,
                  }}
                >
                  {measure.unit}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: FONT.text, fontSize: T.small, fontWeight: 600, color: C.ink }}>
                    {measure.what}
                  </span>
                  <span style={{ fontFamily: FONT.text, fontSize: T.micro, color: C.inkFaint }}>
                    {measure.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: 700,
            flex: "none",
            background: C.slab,
            padding: "38px 44px 42px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: T.micro,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.risoOnSlab,
            }}
          >
            The fit rule
          </span>

          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: C.paper,
              lineHeight: 1.35,
            }}
          >
            size = field ÷ (chars × 0.65)
          </span>

          <div aria-hidden style={{ height: 1, background: C.slabRule }} />

          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 25,
              color: "rgba(244,246,250,0.72)",
              lineHeight: 1.5,
            }}
          >
            1312 ÷ (70 × 0.65) = 28
          </span>

          <p
            style={{
              fontFamily: FONT.text,
              fontSize: T.small,
              lineHeight: 1.45,
              color: "rgba(244,246,250,0.76)",
            }}
          >
            Solve the size from the longest line, once, at render. Nothing scrolls, nothing is
            clipped, and the block cannot print a line it cannot hold.
          </p>
        </div>
      </div>

      <Takeaway>
        The block does not shrink an overflow away — it computes the largest size whose longest
        line still fits.
      </Takeaway>
    </Sheet>
  );
}
