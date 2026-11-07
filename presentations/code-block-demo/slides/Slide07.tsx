import { CropMark, Label, Prose, Sheet, Title } from "../Frame";
import { C, FONT, T, TOTAL } from "../theme";

const STEPS = [
  {
    n: "01",
    head: "Copy the component",
    body: "CodeBlock.tsx and its four language registrations live inside the deck folder. Nothing imports from src/ or from another presentation.",
  },
  {
    n: "02",
    head: "Set the field width",
    body: "Pass the width the block occupies. The type size is solved from the longest line, so no line can run past the slab.",
  },
  {
    n: "03",
    head: "Colour from theme.ts",
    body: "The twenty token colours and the size floor are deck properties. A slide names a line to light; it never names a colour.",
  },
];

/** Close: the three steps, and the rule that keeps the deck honest. */
export default function Slide07() {
  return (
    <Sheet n={7} total={TOTAL} section="Using it" bare>
      <div aria-hidden style={{ position: "absolute", inset: 0, top: 700, background: C.slab }} />

      <CropMark corner="tl" />
      <CropMark corner="tr" />

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: 44,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Label color={C.inkFaint}>USING IT</Label>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: T.label,
            letterSpacing: "0.06em",
            color: C.ink,
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}
        >
          07<span style={{ color: C.inkFaint }}> / 07</span>
        </span>
      </div>

      <div style={{ position: "absolute", left: 96, right: 96, top: 110 }}>
        <Title size={66} max={1500} lineHeight={1}>
          A code block is opt&#8209;in. Three steps to put one in a slide.
        </Title>
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: 386,
          display: "flex",
          gap: 46,
        }}
      >
        {STEPS.map((step) => (
          <div key={step.n} style={{ flex: "1 1 0", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: T.small,
                  fontWeight: 500,
                  color: C.paper,
                  background: C.risoDeep,
                  padding: "6px 10px",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {step.n}
              </span>
              <span aria-hidden style={{ height: 1, flex: "1 1 auto", background: C.rule }} />
            </div>

            <h3
              style={{
                fontFamily: FONT.display,
                fontSize: 36,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: C.ink,
              }}
            >
              {step.head}
            </h3>

            <Prose size={T.small} max={470} color={C.inkSoft}>
              {step.body}
            </Prose>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: 700,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
        }}
      >
        <p
          style={{
            fontFamily: FONT.display,
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: C.paper,
            maxWidth: 1460,
          }}
        >
          If it does not fit at 24px, the slide is asking for too much — split the example,
          not the font.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span aria-hidden style={{ width: 46, height: 3, background: C.riso, flex: "none" }} />
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: T.micro,
              letterSpacing: "0.16em",
              color: "rgba(244,246,250,0.62)",
            }}
          >
            @TANSTACK/HIGHLIGHT · PRIVATE DECK · PRESENTATIONS/CODE-BLOCK-DEMO
          </span>
        </div>
      </div>
    </Sheet>
  );
}
