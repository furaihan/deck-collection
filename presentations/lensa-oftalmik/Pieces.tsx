import type { ReactNode } from "react";
import { C, FONT, LIT } from "./theme";
import { Label, Numeral } from "./Frame";

/* ------------------------------------------------------------------ cards */

/**
 * A plate raised off the film base. A hairline of light along the top edge and
 * a soft drop below is what makes it sit on the sheet rather than in it.
 */
export function Plate({
  children,
  tone = "raised",
  style,
}: {
  children: ReactNode;
  tone?: "raised" | "flat" | "ink" | "amber" | "bare";
  style?: React.CSSProperties;
}) {
  const map = {
    raised: {
      background: LIT.plate,
      boxShadow:
        "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.10), 0 18px 34px rgba(58,46,28,0.16), 0 3px 8px rgba(58,46,28,0.10)",
      padding: 30,
    },
    flat: {
      background: LIT.plateFlat,
      boxShadow: "0 0 0 1px rgba(20,21,24,0.13)",
      padding: 30,
    },
    ink: {
      background: "linear-gradient(158deg, #1B1D21 0%, #141518 55%, #0C0D0F 100%)",
      boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 22px 44px rgba(20,21,24,0.42)",
      padding: 30,
      color: C.paper,
    },
    amber: {
      background: `linear-gradient(160deg, #F6C97F 0%, ${C.amber} 58%, #C57F1F 100%)`,
      boxShadow: "0 1px 0 rgba(255,255,255,0.5) inset, 0 18px 34px rgba(150,98,20,0.30)",
      padding: 30,
      color: C.ink,
    },
    bare: { background: "transparent", padding: 0 },
  } as const;

  return <div style={{ ...map[tone], ...style }}>{children}</div>;
}

/* ----------------------------------------------------------------- tables */

export interface Column {
  head: string;
  width: number;
  align?: "left" | "right";
}

/**
 * The deck's one table form. Rules do the work; the argued row is lifted into
 * an ink plate so the eye lands on it before it reads a single cell.
 */
export function Table({
  columns,
  rows,
  emphasis = [],
  caption,
  size = 25,
}: {
  columns: Column[];
  rows: (string | ReactNode)[][];
  emphasis?: number[];
  caption?: string;
  size?: number;
}) {
  return (
    <div>
      <div className="flex items-end" style={{ borderBottom: `2.5px solid ${C.ink}`, paddingBottom: 10 }}>
        {columns.map((col) => (
          <div
            key={col.head}
            style={{
              width: `${col.width * 100}%`,
              textAlign: col.align ?? "left",
              fontFamily: FONT.mono,
              fontSize: 16,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.inkFaint,
              lineHeight: 1.2,
            }}
          >
            {col.head}
          </div>
        ))}
      </div>

      {rows.map((row, index) => {
        const strong = emphasis.includes(index);
        return (
          <div
            key={index}
            className="flex items-baseline"
            style={{
              borderBottom: `1px solid ${strong ? "transparent" : C.ruleSoft}`,
              paddingTop: strong ? 12 : 13,
              paddingBottom: strong ? 12 : 13,
              background: strong
                ? LIT.plateInk
                : "transparent",
              boxShadow: strong ? "0 14px 28px rgba(20,21,24,0.34)" : "none",
            }}
          >
            {columns.map((col, ci) => (
              <div
                key={col.head}
                style={{
                  width: `${col.width * 100}%`,
                  textAlign: col.align ?? "left",
                  paddingLeft: strong ? 18 : 0,
                  paddingRight: strong ? 18 : 0,
                  fontFamily: ci === 0 ? FONT.text : strong ? FONT.display : FONT.text,
                  fontSize: ci === 0 ? size : strong ? size + 3 : size,
                  lineHeight: 1.3,
                  fontVariantNumeric: "tabular-nums",
                  color: strong ? C.paper : ci === 0 ? C.ink : C.inkSoft,
                  fontWeight: ci === 0 ? 600 : strong ? 700 : 400,
                }}
              >
                {row[ci]}
              </div>
            ))}
          </div>
        );
      })}

      {caption ? (
        <div style={{ marginTop: 12 }}>
          <Label size={16} track="0.12em">{caption}</Label>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ bars */

export interface BarDatum {
  label: string;
  value: number;
  display: string;
  unit?: string;
}

/**
 * A measured bar chart. Bars are drawn, not decorated: one ink for the field,
 * one amber for the datum the frame is arguing about, each bar carrying a
 * hairline of light so it reads as a raised measure.
 */
export function Bars({
  data,
  max,
  unit,
  highlight,
  barHeight = 30,
  gap = 24,
  labelWidth = 330,
  size = 25,
  maxBarWidth = 420,
}: {
  data: BarDatum[];
  max: number;
  unit?: string;
  highlight?: number[];
  barHeight?: number;
  gap?: number;
  labelWidth?: number;
  size?: number;
  maxBarWidth?: number;
}) {
  const top = Math.max(...data.map((d) => d.value), max);
  return (
    <div className="flex flex-col" style={{ gap }}>
      {data.map((datum, index) => {
        const hot = highlight?.includes(index);
        const width = Math.max(6, (datum.value / top) * maxBarWidth);
        return (
          <div key={datum.label} className="flex items-center" style={{ gap: 20 }}>
            <div
              style={{
                width: labelWidth,
                flex: "none",
                fontFamily: FONT.text,
                fontSize: size,
                color: hot ? C.ink : C.inkSoft,
                fontWeight: hot ? 600 : 400,
                lineHeight: 1.2,
              }}
            >
              {datum.label}
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width,
                  height: barHeight,
                  flex: "none",
                  background: hot
                    ? LIT.barHot
                    : LIT.bar,
                  boxShadow: hot
                    ? "0 8px 18px rgba(180,120,30,0.35), 0 1px 0 rgba(255,255,255,0.5) inset"
                    : "0 8px 18px rgba(20,21,24,0.28), 0 1px 0 rgba(255,255,255,0.14) inset",
                }}
              />
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 24,
                  fontWeight: 700,
                  color: hot ? C.ink : C.inkSoft,
                  whiteSpace: "nowrap",
                }}
              >
                {datum.display}
                {(datum.unit ?? unit) ? ` ${datum.unit ?? unit}` : ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------- stairs */

export function Stairs({
  steps,
  active,
  size = 22,
}: {
  steps: { title: string; note?: string }[];
  active?: number;
  size?: number;
}) {
  return (
    <div className="flex items-start" style={{ gap: 0 }}>
      {steps.map((step, index) => {
        const hot = active === index;
        return (
          <div key={step.title} style={{ flex: 1, paddingRight: 16 }}>
            <div
              style={{
                height: 12,
                background: hot ? C.amber : C.ink,
                opacity: hot ? 1 : 1 - index * 0.06,
              }}
            />
            <div style={{ marginTop: 12 }}>
              <Label size={15} track="0.16em">
                {String(index + 1).padStart(2, "0")}
              </Label>
            </div>
            <div style={{ marginTop: 5, fontFamily: FONT.text, fontWeight: 600, fontSize: size, lineHeight: 1.22, color: C.ink }}>
              {step.title}
            </div>
            {step.note ? (
              <div style={{ marginTop: 5, fontFamily: FONT.text, fontSize: size - 3, lineHeight: 1.4, color: C.inkFaint }}>
                {step.note}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------- declarations */

export function Definition({ term, children, size = 32 }: { term: string; children: ReactNode; size?: number }) {
  return (
    <div style={{ borderTop: `1px solid ${C.rule}`, paddingTop: 16, paddingBottom: 16 }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 16, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkFaint }}>
        {term}
      </div>
      <div style={{ marginTop: 8, fontFamily: FONT.text, fontSize: size, lineHeight: 1.42, color: C.ink }}>{children}</div>
    </div>
  );
}

export function Fraction({
  numerator,
  denominator,
  size = 44,
  color,
}: {
  numerator: ReactNode;
  denominator: ReactNode;
  size?: number;
  color?: string;
}) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", color: color ?? C.ink }}>
      <span style={{ fontFamily: FONT.text, fontSize: size, lineHeight: 1.12, padding: "0 10px" }}>{numerator}</span>
      <span style={{ height: 2, background: color ?? C.ink, alignSelf: "stretch", margin: "3px 0" }} />
      <span style={{ fontFamily: FONT.text, fontSize: size, lineHeight: 1.12, padding: "0 10px" }}>{denominator}</span>
    </span>
  );
}

/** A measured value with its unit stacked under it, for stat rows. */
export function Stat({
  value,
  unit,
  note,
  size = 54,
  tone,
}: {
  value: string;
  unit?: string;
  note?: string;
  size?: number;
  tone?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline" style={{ gap: 5 }}>
        <Numeral size={size} color={tone}>{value}</Numeral>
        {unit ? <span style={{ fontFamily: FONT.text, fontSize: 20, color: C.inkFaint }}>{unit}</span> : null}
      </div>
      {note ? (
        <div style={{ marginTop: 3, fontFamily: FONT.text, fontSize: 20, lineHeight: 1.35, color: C.inkSoft }}>{note}</div>
      ) : null}
    </div>
  );
}

export { Numeral, Label };