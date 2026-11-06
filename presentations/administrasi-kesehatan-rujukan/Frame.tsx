import type { CSSProperties, ReactNode } from "react";
import "./theme.css";
import { C, COURSE, FONT, G, T, TOTAL } from "./theme";

export type Tone = "paper" | "pink" | "ink";

export interface ToneSet {
  ground: string;
  ink: string;
  soft: string;
  faint: string;
  ghost: string;
  rule: string;
  hair: string;
  accent: string;
  panel: string;
  panelLine: string;
}

/** Three grounds, each with its own ink. A slide picks one and never invents a fourth. */
const TONES: Record<Tone, ToneSet> = {
  paper: {
    ground: C.ground,
    ink: C.ink,
    soft: C.inkSoft,
    faint: C.inkFaint,
    ghost: C.inkGhost,
    rule: C.rule,
    hair: C.ruleHair,
    accent: C.pink,
    panel: C.pinkPale,
    panelLine: C.pinkLine,
  },
  pink: {
    ground: C.pink,
    ink: C.onPink,
    soft: C.onPinkSoft,
    faint: C.onPinkFaint,
    ghost: "rgba(255,244,248,0.55)",
    rule: C.onPinkRule,
    hair: "rgba(255,244,248,0.12)",
    accent: C.onPink,
    panel: "rgba(255,244,248,0.10)",
    panelLine: "rgba(255,244,248,0.35)",
  },
  ink: {
    ground: C.ink,
    ink: C.onInk,
    soft: C.onInkSoft,
    faint: C.onInkFaint,
    ghost: "rgba(253,246,243,0.45)",
    rule: "rgba(253,246,243,0.20)",
    hair: "rgba(253,246,243,0.07)",
    accent: C.pinkLight,
    panel: "rgba(253,246,243,0.06)",
    panelLine: "rgba(253,246,243,0.22)",
  },
};

export function tone(t: Tone): ToneSet {
  return TONES[t];
}

/** A corner registration mark: the form's own crop marks, drawn in hairlines. */
function Crop({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const style: CSSProperties = { position: "absolute", width: 18, height: 18, opacity: 0.5 };
  if (corner === "tl") {
    style.left = 0;
    style.top = 0;
    style.borderLeft = "1px solid " + C.inkGhost;
    style.borderTop = "1px solid " + C.inkGhost;
  } else if (corner === "tr") {
    style.right = 0;
    style.top = 0;
    style.borderRight = "1px solid " + C.inkGhost;
    style.borderTop = "1px solid " + C.inkGhost;
  } else if (corner === "bl") {
    style.left = 0;
    style.bottom = 0;
    style.borderLeft = "1px solid " + C.inkGhost;
    style.borderBottom = "1px solid " + C.inkGhost;
  } else {
    style.right = 0;
    style.bottom = 0;
    style.borderRight = "1px solid " + C.inkGhost;
    style.borderBottom = "1px solid " + C.inkGhost;
  }
  return <div aria-hidden style={style} />;
}

export interface SheetProps {
  /** 1-based slide number, printed in the folio. */
  n: number;
  /** The running head: which part of the lecture this sheet belongs to. */
  section: string;
  /** A short right-hand note in the head, e.g. "Perpres 72/2012". */
  cite?: string;
  tone?: Tone;
  /** Hides the centre hairline, for sheets where a diagram crosses it. */
  line?: boolean;
  children: ReactNode;
}

/**
 * One sheet of the rujukan form: the head rule and folio, the content field with
 * its crop marks, and the foot line. Every slide draws inside this, and nothing
 * is drawn outside it.
 */
export function Sheet({ n, section, cite, line = true, tone: t = "paper", children }: SheetProps) {
  const k = TONES[t];
  const folio = String(n).padStart(2, "0");

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: k.ground, color: k.ink, fontFamily: FONT.text }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", left: G.pad, top: G.headRule, right: G.pad, height: 1, background: k.rule }} />
        <div style={{ position: "absolute", left: G.pad, top: G.contentBottom, right: G.pad, height: 1, background: k.hair }} />
        <div style={{ position: "absolute", left: G.pad, top: G.footRule, right: G.pad, height: 1, background: k.rule }} />
        {line ? (
          <div style={{ position: "absolute", left: 940, top: G.contentTop, width: 1, height: G.contentBottom - G.contentTop, background: k.hair }} />
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.headTop,
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 10, height: 10, background: k.accent, flex: "none" }} aria-hidden />
          <span
            style={{
              fontSize: T.label,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: k.faint,
              lineHeight: 1,
            }}
          >
            {section}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {cite ? (
            <span style={{ fontSize: T.label, letterSpacing: "0.05em", color: k.ghost, lineHeight: 1 }}>{cite}</span>
          ) : null}
          <span
            style={{
              fontSize: T.label,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: k.soft,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {folio}
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.contentTop,
          height: G.contentBottom - G.contentTop,
        }}
      >
        <Crop corner="tl" />
        <Crop corner="tr" />
        <Crop corner="bl" />
        <Crop corner="br" />
        <div className="flex h-full w-full flex-col" style={{ paddingTop: 16, paddingBottom: 30 }}>
          {children}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.footTop,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: T.micro, letterSpacing: "0.09em", color: k.ghost }}>{COURSE}</span>
        <span style={{ fontSize: T.micro, letterSpacing: "0.09em", color: k.ghost, fontVariantNumeric: "tabular-nums" }}>
          {folio} / {TOTAL}
        </span>
      </div>
    </div>
  );
}

/** The slide's headline. Instrument Serif, tight, never more than three lines. */
export function Title({
  children,
  size = T.display,
  max = 1180,
  color,
  lineHeight = 0.98,
}: {
  children: ReactNode;
  size?: number;
  max?: number;
  color?: string;
  lineHeight?: number;
}) {
  return (
    <h2
      style={{
        fontFamily: FONT.display,
        fontWeight: 400,
        fontSize: size,
        lineHeight,
        letterSpacing: "-0.012em",
        color: color ?? "inherit",
        maxWidth: max,
      }}
    >
      {children}
    </h2>
  );
}

/** Running copy. 27px floor on the projector; 32px when it carries the slide. */
export function Prose({
  children,
  size = T.body,
  max = 780,
  color,
  weight = 400,
  lineHeight = 1.5,
  style,
}: {
  children: ReactNode;
  size?: number;
  max?: number;
  color?: string;
  weight?: number;
  lineHeight?: number;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        fontSize: size,
        fontWeight: weight,
        lineHeight,
        color: color ?? C.inkSoft,
        maxWidth: max,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/** A field label: what a value means, set small and tracked. */
export function Label({
  children,
  color,
  size = T.label,
  weight = 600,
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  weight?: number;
}) {
  return (
    <span
      style={{
        fontSize: size,
        fontWeight: weight,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: color ?? C.inkFaint,
        lineHeight: 1.35,
      }}
    >
      {children}
    </span>
  );
}

/** A number the back row must read. Tabular, tight, in the display face. */
export function Stat({
  children,
  size = T.stat,
  color,
  unit,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  unit?: string;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
      <span
        style={{
          fontFamily: FONT.display,
          fontSize: size,
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          color: color ?? C.ink,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {children}
      </span>
      {unit ? (
        <span style={{ fontSize: T.small, fontWeight: 600, color: color ?? C.inkSoft }}>{unit}</span>
      ) : null}
    </span>
  );
}

/** The line the slide exists to say: a rule and a sentence at the foot of the field. */
export function Takeaway({
  children,
  t = "paper",
  size = T.body,
}: {
  children: ReactNode;
  t?: Tone;
  size?: number;
}) {
  const k = TONES[t];
  return (
    <div
      style={{
        marginTop: "auto",
        flex: "none",
        borderTop: "2px solid " + k.accent,
        paddingTop: 18,
        maxWidth: 1290,
      }}
    >
      <p style={{ fontSize: size, lineHeight: 1.42, color: k.ink, fontWeight: 500 }}>{children}</p>
    </div>
  );
}
