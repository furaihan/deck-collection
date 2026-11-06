import type { CSSProperties, ReactNode } from "react";
import "./theme.css";
import { C, COURSE, DECK, FONT, G, T, TOTAL } from "./theme";

/** The eighteen-tick progress rail: one tick per slide, the current one lit. */
function Ticks({ n }: { n: number }) {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {Array.from({ length: TOTAL }, (_, i) => {
        const active = i + 1 === n;
        return (
          <span
            key={i}
            style={{
              width: active ? 18 : 3,
              height: 3,
              background: active ? C.lime : C.rule,
              flex: "none",
            }}
          />
        );
      })}
    </div>
  );
}

const foot: CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: T.micro,
  letterSpacing: "0.12em",
  color: C.inkGhost,
  lineHeight: 1,
};

export interface SheetProps {
  /** 1-based slide number, printed in the head and on the rail. */
  n: number;
  /** The running head: which part of the lecture this sheet belongs to. */
  section: string;
  /** Full-bleed slide with no chrome, used by the cover. */
  bare?: boolean;
  children: ReactNode;
}

/**
 * One field readout: the head rail with section and folio, the measured content
 * field, and the foot rail with course, progress, and deck. Every slide draws
 * inside this, and nothing is drawn outside it.
 */
export function Sheet({ n, section, bare = false, children }: SheetProps) {
  if (bare) {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ background: C.ground, color: C.ink, fontFamily: FONT.text }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: C.ground, color: C.ink, fontFamily: FONT.text }}
    >
      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.headTop,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 9, height: 9, background: C.lime, flex: "none" }} aria-hidden />
          <Label color={C.inkFaint}>{section}</Label>
        </div>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: T.label,
            letterSpacing: "0.08em",
            color: C.inkSoft,
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}
        >
          {String(n).padStart(2, "0")} <span style={{ color: C.inkGhost }}>/ {TOTAL}</span>
        </span>
      </div>

      <div
        aria-hidden
        style={{ position: "absolute", left: G.pad, right: G.pad, top: G.headRule, height: 1, background: C.rule }}
      />

      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.contentTop,
          height: G.contentBottom - G.contentTop,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      <div
        aria-hidden
        style={{ position: "absolute", left: G.pad, right: G.pad, top: G.footRule, height: 1, background: C.ruleSoft }}
      />

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
        <span style={foot}>{COURSE}</span>
        <Ticks n={n} />
        <span style={foot}>{DECK}</span>
      </div>
    </div>
  );
}

/** The slide's headline, in the condensed instrument voice. */
export function Title({
  children,
  size = T.display,
  max = 1500,
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
        fontWeight: 600,
        fontSize: size,
        lineHeight,
        letterSpacing: "-0.01em",
        color: color ?? C.ink,
        maxWidth: max,
      }}
    >
      {children}
    </h2>
  );
}

/** Running copy. */
export function Prose({
  children,
  size = T.body,
  max = 860,
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
        fontFamily: FONT.text,
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

/** A printed field label: small, tracked, uppercase. */
export function Label({
  children,
  color,
  size = T.label,
  weight = 500,
  style,
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  weight?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: color ?? C.inkFaint,
        lineHeight: 1.4,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** A number the back row must read. */
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
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 10 }}>
      <span
        style={{
          fontFamily: FONT.display,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 0.82,
          letterSpacing: "-0.02em",
          color: color ?? C.ink,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {children}
      </span>
      {unit ? (
        <span style={{ fontFamily: FONT.mono, fontSize: T.small, color: color ?? C.inkFaint }}>{unit}</span>
      ) : null}
    </span>
  );
}

/** The line the slide exists to say: a rule and a sentence at the foot of the field. */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div style={{ marginTop: "auto", flex: "none", borderTop: "2px solid " + C.lime, paddingTop: 16, maxWidth: 1560 }}>
      <p style={{ fontFamily: FONT.text, fontSize: T.body, lineHeight: 1.4, color: C.ink, fontWeight: 500 }}>
        {children}
      </p>
    </div>
  );
}

/** A hairline. */
export function Rule({ color = C.rule, style }: { color?: string; style?: CSSProperties }) {
  return <div aria-hidden style={{ height: 1, background: color, width: "100%", flex: "none", ...style }} />;
}

/** A raised readout panel. Square corners; the hairline does the boxing. */
export function Panel({
  children,
  tone = "surface",
  style,
}: {
  children: ReactNode;
  tone?: "surface" | "lime" | "teal" | "deep";
  style?: CSSProperties;
}) {
  const background =
    tone === "lime" ? C.limePale : tone === "teal" ? C.tealPale : tone === "deep" ? C.groundDeep : C.surface;
  return (
    <div style={{ background, border: "1px solid " + C.rule, padding: 28, flex: "none", ...style }}>{children}</div>
  );
}

/** A printed index number. */
export function Num({ children, color, size = T.label }: { children: ReactNode; color?: string; size?: number }) {
  return (
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "0.08em",
        color: color ?? C.lime,
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

/** Twenty of a hundred cells lit: the deck's opening datum, reused as a motif. */
const LIT: readonly number[] = [2, 6, 11, 15, 19, 23, 28, 31, 37, 40, 46, 52, 55, 61, 66, 70, 76, 81, 85, 91];

export function DotGrid({ size = 28, gap = 6, lit = LIT }: { size?: number; gap?: number; lit?: readonly number[] }) {
  return (
    <div
      aria-hidden
      style={{ display: "grid", gridTemplateColumns: `repeat(10, ${size}px)`, gap, width: "fit-content" }}
    >
      {Array.from({ length: 100 }, (_, i) => {
        const on = lit.includes(i);
        return (
          <span
            key={i}
            style={{
              width: size,
              height: size,
              background: on ? C.lime : "rgba(237,242,234,0.07)",
              border: on ? "1px solid " + C.lime : "1px solid " + C.ruleSoft,
              display: "block",
            }}
          />
        );
      })}
    </div>
  );
}

/** The lever: a beam on a fulcrum, the heavy end marked in lime. */
export function Lever({ tilt = 0, fulcrum = 110, label }: { tilt?: number; fulcrum?: number; label: string }) {
  return (
    <svg viewBox="0 0 220 100" width={220} height={100} role="img" aria-label={label}>
      <line x1="6" y1="56" x2="214" y2="56" stroke={C.ruleSoft} strokeDasharray="3 5" strokeWidth="1" />
      <g transform={`rotate(${tilt} ${fulcrum} 56)`}>
        <line x1="18" y1="56" x2="202" y2="56" stroke={C.ink} strokeWidth="3" />
        <circle cx={tilt < 0 ? 30 : 190} cy="56" r="7" fill={C.lime} />
      </g>
      <polygon points={`${fulcrum - 16},84 ${fulcrum + 16},84 ${fulcrum},56`} fill={C.inkFaint} />
      <line x1="4" y1="84" x2="216" y2="84" stroke={C.rule} strokeWidth="1" />
    </svg>
  );
}

/** The epidemiologic triad: host, agent, environment, and the balance between them. */
export function Triad() {
  return (
    <svg viewBox="0 0 560 420" width="100%" height="100%" role="img" aria-label="Triad epidemiologi: host, agent, environment">
      <line x1="280" y1="58" x2="96" y2="352" stroke={C.rule} strokeWidth="1.5" />
      <line x1="280" y1="58" x2="464" y2="352" stroke={C.rule} strokeWidth="1.5" />
      <line x1="96" y1="352" x2="464" y2="352" stroke={C.rule} strokeWidth="1.5" />
      <circle cx="280" cy="58" r="9" fill={C.lime} />
      <circle cx="96" cy="352" r="9" fill={C.lime} />
      <circle cx="464" cy="352" r="9" fill={C.lime} />
      <text
        x="280"
        y="34"
        textAnchor="middle"
        fill={C.ink}
        fontFamily={FONT.display}
        fontSize="34"
        fontWeight="600"
        letterSpacing="0"
      >
        HOST
      </text>
      <text
        x="96"
        y="398"
        textAnchor="middle"
        fill={C.ink}
        fontFamily={FONT.display}
        fontSize="34"
        fontWeight="600"
      >
        AGENT
      </text>
      <text
        x="464"
        y="398"
        textAnchor="middle"
        fill={C.ink}
        fontFamily={FONT.display}
        fontSize="34"
        fontWeight="600"
      >
        ENVIRONMENT
      </text>
      <text
        x="280"
        y="212"
        textAnchor="middle"
        fill={C.inkFaint}
        fontFamily={FONT.mono}
        fontSize="16"
        letterSpacing="0.16em"
      >
        SEIMBANG
      </text>
      <text
        x="280"
        y="238"
        textAnchor="middle"
        fill={C.inkFaint}
        fontFamily={FONT.mono}
        fontSize="16"
        letterSpacing="0.16em"
      >
        TIDAK SAKIT
      </text>
    </svg>
  );
}
