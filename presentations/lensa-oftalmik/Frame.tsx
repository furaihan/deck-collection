import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import "./theme.css";
import { C, COURSE, DECK, FONT, G, T, TOTAL } from "./theme";

/* -------------------------------------------------------------------------
 * Ink pairs
 * ---------------------------------------------------------------------- */

export interface Ink {
  bg: string;
  ink: string;
  soft: string;
  faint: string;
  rule: string;
  ruleSoft: string;
  amber: string;
  amberDeep: string;
  clay: string;
}

const CHALK_INK: Ink = {
  bg: C.chalk,
  ink: C.ink,
  soft: C.inkSoft,
  faint: C.inkFaint,
  rule: C.rule,
  ruleSoft: C.ruleSoft,
  amber: C.amberDeep,
  amberDeep: C.amberDeep,
  clay: C.clayDeep,
};

const PETROL_INK: Ink = {
  bg: C.petrol,
  ink: C.onDark,
  soft: C.onDarkSoft,
  faint: C.onDarkFaint,
  rule: C.ruleDark,
  ruleSoft: C.ruleDarkSoft,
  amber: C.amber,
  amberDeep: C.amber,
  clay: C.clay,
};

/** The two grounds. Every slide picks one; nothing else is a ground. */
export function inkOn(ground: "chalk" | "petrol"): Ink {
  return ground === "chalk" ? CHALK_INK : PETROL_INK;
}

/* -------------------------------------------------------------------------
 * The sheet
 * ---------------------------------------------------------------------- */

/** Twenty ticks: where the reader is in a deck of twenty. */
function Ticks({ n, tone }: { n: number; tone: Ink }) {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {Array.from({ length: TOTAL }, (_, i) => {
        const active = i + 1 === n;
        return (
          <span
            key={i}
            style={{
              width: active ? 20 : 3,
              height: 3,
              background: active ? tone.amber : tone.ruleSoft,
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
  letterSpacing: "0.06em",
  lineHeight: 1,
  whiteSpace: "nowrap",
};

export interface SheetProps {
  /** 1-based slide number, printed in the head and on the rail. */
  n: number;
  /** The running head: which part of the lecture this sheet belongs to. */
  part: string;
  ground?: "chalk" | "petrol";
  /** Full-bleed sheet with no chrome (cover, closing). */
  bare?: boolean;
  children: ReactNode;
}

/**
 * One sheet of the workbench pad: the head rail with part and folio, the
 * measured field between two hairlines, and the foot rail with course,
 * progress and deck. Every slide draws inside this.
 */
export function Sheet({ n, part, ground = "chalk", bare = false, children }: SheetProps) {
  const tone = inkOn(ground);

  const surface: CSSProperties = {
    background: tone.bg,
    color: tone.ink,
    fontFamily: FONT.text,
  };

  if (bare) {
    return (
      <div className="relative h-full w-full overflow-hidden" style={surface}>
        {children}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden" style={surface}>
      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.top,
          height: 28,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: T.micro,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: tone.faint,
            lineHeight: 1,
          }}
        >
          {part}
        </span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: T.micro + 2,
            letterSpacing: "0.06em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span style={{ color: tone.amber }}>{String(n).padStart(2, "0")}</span>
          <span style={{ color: tone.faint }}> / {TOTAL}</span>
        </span>
      </div>

      <div
        aria-hidden
        style={{ position: "absolute", left: G.pad, right: G.pad, top: G.headRule, height: 1, background: tone.rule }}
      />

      <div
        data-field
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.fieldTop,
          height: G.fieldBottom - G.fieldTop,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      <div
        aria-hidden
        style={{ position: "absolute", left: G.pad, right: G.pad, top: G.ruleY, height: 1, background: tone.ruleSoft }}
      />

      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.footY,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ ...foot, color: tone.faint }}>{COURSE}</span>
        <Ticks n={n} tone={tone} />
        <span style={{ ...foot, color: tone.faint }}>{DECK}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Type
 * ---------------------------------------------------------------------- */

/** The slide's headline. Condensed tracking, one weight, no decoration. */
export function Title({
  children,
  size = T.h1,
  max = 1500,
  color,
}: {
  children: ReactNode;
  size?: number;
  max?: number;
  color?: string;
}) {
  return (
    <h2
      style={{
        fontFamily: FONT.display,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: "-0.025em",
        color,
        maxWidth: max,
      }}
    >
      {children}
    </h2>
  );
}

/** Standing copy. Never below 30px inside the body. */
export function Prose({
  children,
  size = T.body,
  max = 820,
  color,
  weight = 400,
  lineHeight = 1.45,
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
        color,
        maxWidth: max,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/** A printed field label: mono, tracked, uppercase. */
export function Label({
  children,
  color,
  size = T.micro,
  style,
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        lineHeight: 1.35,
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** A measured value, set the way an instrument prints it. */
export function Num({
  children,
  size = T.data,
  color,
  weight = 500,
  style,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: size,
        fontWeight: weight,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** The one number the back row must read. */
export function Stat({
  value,
  unit,
  label,
  color,
  size = T.stat,
  tone,
}: {
  value: string;
  unit?: string;
  label: string;
  color?: string;
  size?: number;
  tone: Ink;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span
          style={{
            fontFamily: FONT.display,
            fontWeight: 600,
            fontSize: size,
            lineHeight: 0.86,
            letterSpacing: "-0.04em",
            color: color ?? tone.ink,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </span>
        {unit ? (
          <span style={{ fontFamily: FONT.mono, fontSize: T.small, color: tone.faint }}>{unit}</span>
        ) : null}
      </div>
      <p style={{ marginTop: 10, fontFamily: FONT.text, fontSize: T.caption, lineHeight: 1.4, color: tone.soft }}>
        {label}
      </p>
    </div>
  );
}

/** A hairline. */
export function Rule({ color, style }: { color: string; style?: CSSProperties }) {
  return <div aria-hidden style={{ height: 1, background: color, width: "100%", flex: "none", ...style }} />;
}

/** The line the slide exists to say, pinned to the bottom of the field. */
export function Takeaway({ children, tone }: { children: ReactNode; tone: Ink }) {
  return (
    <div
      style={{
        marginTop: "auto",
        flex: "none",
        borderTop: `3px solid ${tone.amber}`,
        paddingTop: 18,
        maxWidth: 1560,
      }}
    >
      <p style={{ fontFamily: FONT.text, fontSize: T.body, lineHeight: 1.4, color: tone.ink, fontWeight: 500 }}>
        {children}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Field devices
 * ---------------------------------------------------------------------- */

/** Definition rows: a term, its gloss, hairline between. Not cards. */
export function Rows({
  rows,
  tone,
  termWidth = 380,
  size = T.body,
  gap = 24,
}: {
  rows: { term: string; body: ReactNode; icon?: LucideIcon; accent?: string }[];
  tone: Ink;
  termWidth?: number;
  size?: number;
  gap?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((row, i) => {
        const Icon = row.icon;
        return (
          <div
            key={row.term}
            style={{
              display: "grid",
              gridTemplateColumns: `${termWidth}px 1fr`,
              gap: 44,
              alignItems: "start",
              padding: `${gap}px 0`,
              borderTop: i === 0 ? "none" : `1px solid ${tone.ruleSoft}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              {Icon ? (
                <Icon
                  size={26}
                  strokeWidth={1.75}
                  color={row.accent ?? tone.amber}
                  style={{ flex: "none", position: "relative", top: 4 }}
                />
              ) : null}
              <span
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 500,
                  fontSize: T.small,
                  lineHeight: 1.3,
                  color: tone.ink,
                }}
              >
                {row.term}
              </span>
            </div>
            <div style={{ fontSize: size, lineHeight: 1.45, color: tone.soft }}>{row.body}</div>
          </div>
        );
      })}
    </div>
  );
}

export interface Col {
  key: string;
  label: string;
  /** Fractions of the table width. Numeric columns are right-aligned. */
  width: number;
  align?: "left" | "right";
}

export interface Cell {
  text: string;
  /** Marks a value the slide is pointing at. */
  mark?: boolean;
  /** A tint chip (metal-oxide colours only). */
  tint?: string;
}

/** A reference table: mono header, hairline rows, tabular numerals. */
export function DataTable({
  cols,
  rows,
  tone,
  size = T.small,
  headSize = T.micro,
  rowPad = 16,
}: {
  cols: Col[];
  rows: Cell[][];
  tone: Ink;
  size?: number;
  headSize?: number;
  rowPad?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: cols.map((c) => `${c.width}fr`).join(" "),
          gap: 24,
          paddingBottom: 12,
          borderBottom: `1px solid ${tone.rule}`,
        }}
      >
        {cols.map((c) => (
          <span
            key={c.key}
            style={{
              fontFamily: FONT.mono,
              fontSize: headSize,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tone.faint,
              textAlign: c.align ?? "left",
              lineHeight: 1.3,
            }}
          >
            {c.label}
          </span>
        ))}
      </div>

      {rows.map((row, r) => (
        <div
          key={r}
          style={{
            display: "grid",
            gridTemplateColumns: cols.map((c) => `${c.width}fr`).join(" "),
            gap: 24,
            padding: `${rowPad}px 0`,
            borderBottom: r === rows.length - 1 ? "none" : `1px solid ${tone.ruleSoft}`,
            alignItems: "baseline",
          }}
        >
          {row.map((cell, ci) => {
            const col = cols[ci];
            const numeric = ci > 0;
            return (
              <span
                key={ci}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: col?.align === "right" ? "flex-end" : "flex-start",
                  fontFamily: numeric ? FONT.mono : FONT.text,
                  fontSize: numeric ? size - 2 : size,
                  fontWeight: numeric ? 400 : 500,
                  fontVariantNumeric: "tabular-nums",
                  color: cell.mark ? tone.amber : numeric ? tone.soft : tone.ink,
                  lineHeight: 1.3,
                }}
              >
                {cell.tint ? (
                  <span
                    aria-hidden
                    style={{ width: 16, height: 16, background: cell.tint, flex: "none", borderRadius: 1 }}
                  />
                ) : null}
                {cell.text}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** A photograph with its caption rule, framed like a plate on the sheet. */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  tone,
  fit = "cover",
  style,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  tone: Ink;
  fit?: "cover" | "contain";
  style?: CSSProperties;
}) {
  return (
    <figure style={{ width, flex: "none", ...style }}>
      <div style={{ width, height, overflow: "hidden", background: tone.ruleSoft }}>
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: fit, display: "block" }}
        />
      </div>
      {caption ? (
        <figcaption
          style={{
            marginTop: 10,
            paddingTop: 8,
            borderTop: `1px solid ${tone.rule}`,
            fontFamily: FONT.mono,
            fontSize: 18,
            lineHeight: 1.35,
            letterSpacing: "0.01em",
            color: tone.faint,
            width,
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Bars drawn from a shared zero: the number is printed at the bar's end. */
export function Bars({
  rows,
  max,
  tone,
  unit,
  barColor,
  labelWidth = 330,
  valueWidth = 150,
}: {
  rows: { label: string; value: number; mark?: boolean }[];
  max: number;
  tone: Ink;
  unit?: string;
  barColor?: string;
  labelWidth?: number;
  valueWidth?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {rows.map((row) => {
        const pct = Math.max(1.5, (row.value / max) * 100);
        return (
          <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span
              style={{
                width: labelWidth,
                flex: "none",
                fontFamily: FONT.text,
                fontSize: T.small,
                lineHeight: 1.2,
                color: row.mark ? tone.ink : tone.soft,
                fontWeight: row.mark ? 600 : 400,
              }}
            >
              {row.label}
            </span>
            <div style={{ flex: 1, height: 18, position: "relative", background: tone.ruleSoft }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${pct}%`,
                  background: row.mark ? tone.amber : barColor ?? tone.soft,
                }}
              />
            </div>
            <span
              style={{
                width: valueWidth,
                flex: "none",
                textAlign: "right",
                fontFamily: FONT.mono,
                fontSize: T.caption,
                fontVariantNumeric: "tabular-nums",
                color: row.mark ? tone.amber : tone.soft,
              }}
            >
              {row.value}
              {unit ? ` ${unit}` : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
