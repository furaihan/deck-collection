import { CodeBlock } from "../CodeBlock";
import { CropMark, Sheet } from "../Frame";
import { C, FONT, T, TOTAL } from "../theme";

const EXCERPT = `const { html } = highlighter
  .highlight(code, {
    lang: "tsx",
    lineNumbers: true,
  })`;

const MONO = {
  fontFamily: FONT.mono,
  fontSize: T.micro,
  letterSpacing: "0.16em",
  lineHeight: 1.4,
} as const;

/**
 * Cover: the claim on the left, the artifact on the right. A full-height ink
 * slab runs to the sheet's trim edge, so the first thumbnail on the dashboard
 * is already two colours and a type pairing.
 */
export default function Slide01() {
  return (
    <Sheet n={1} total={TOTAL} bare>
      <div aria-hidden style={{ position: "absolute", inset: 0, left: 1000, background: C.slab }} />

      <CropMark corner="tl" />
      <CropMark corner="bl" />

      <div
        style={{
          position: "absolute",
          left: 96,
          top: 0,
          bottom: 0,
          width: 820,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <h1
          style={{
            fontFamily: FONT.display,
            fontSize: T.cover,
            fontWeight: 600,
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            color: C.ink,
          }}
        >
          Code that cannot{" "}
          <span style={{ color: C.risoDeep }}>overflow</span> the sheet.
        </h1>

        <p
          style={{
            fontFamily: FONT.text,
            fontSize: T.lede,
            lineHeight: 1.45,
            color: C.inkSoft,
            maxWidth: 740,
          }}
        >
          A highlighted block solves its own type size against 1920x1080 — so the line
          fits and the PDF prints it.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span aria-hidden style={{ width: 46, height: 3, background: C.riso }} />
          <span style={{ ...MONO, color: C.inkFaint }}>SEVEN SLIDES · ONE COMPONENT</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 1088,
          right: 96,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 38,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span aria-hidden style={{ width: 9, height: 9, background: C.riso, flex: "none" }} />
          <span style={{ ...MONO, color: C.paper }}>HIGHLIGHT.TS</span>
        </div>

        <CodeBlock code={EXCERPT} width={736} size={30} lineNumbers={false} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            borderTop: `1px solid ${C.slabRule}`,
            paddingTop: 20,
          }}
        >
          <Fact k="LANGUAGES" v="4 registered" />
          <Fact k="RUNTIME" v="sync · no wasm" />
          <Fact k="ADVANCE" v="0.65 em / glyph" />
        </div>
      </div>
    </Sheet>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
      <span style={{ ...MONO, color: "rgba(244,246,250,0.58)" }}>{k}</span>
      <span style={{ ...MONO, color: C.paper, letterSpacing: "0.06em" }}>{v}</span>
    </div>
  );
}
