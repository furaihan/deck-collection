import type { CSSProperties, ReactNode } from "react";
import { Check as CheckIcon } from "lucide-react";
import "./theme.css";
import { C, FONT, G, T, TOTAL } from "./theme";

/* -------------------------------------------------------------------------
 * Ink pairs
 * ---------------------------------------------------------------------- */

export type Ground = "void" | "arcane" | "mist";

export interface Ink {
  bg: string;
  ink: string;
  soft: string;
  faint: string;
  rule: string;
  ruleSoft: string;
  /** Text and icons: the legible emphasis for this stock. */
  accent: string;
  /** Fills and areas: bars, matrix tints, ticks. Emerald wherever it clears 3:1. */
  signal: string;
}

const VOID_INK: Ink = {
  bg: C.void,
  ink: C.onVoid,
  soft: C.onVoidSoft,
  faint: C.onVoidFaint,
  rule: C.ruleVoid,
  ruleSoft: C.ruleVoidSoft,
  accent: C.jade,
  signal: C.emerald,
};

const ARCANE_INK: Ink = {
  bg: C.arcane,
  ink: C.onArcane,
  soft: C.onArcaneSoft,
  faint: C.onArcaneFaint,
  rule: C.ruleArcane,
  ruleSoft: C.ruleArcaneSoft,
  accent: C.jade,
  /** Emerald is only 2.73:1 on arcane: areas take jade instead. */
  signal: C.jade,
};

const MIST_INK: Ink = {
  bg: C.mist,
  ink: C.onMist,
  soft: C.onMistSoft,
  faint: C.onMistFaint,
  rule: C.ruleMist,
  ruleSoft: C.ruleMistSoft,
  /** 18px text needs 4.5:1, so emphasis text on mist takes the deepened tone. */
  accent: C.emeraldDeep,
  signal: C.emerald,
};

/** The three stocks. Every slide picks one; nothing else is a ground. */
export function inkOn(ground: Ground): Ink {
  if (ground === "void") return VOID_INK;
  if (ground === "arcane") return ARCANE_INK;
  return MIST_INK;
}

/* -------------------------------------------------------------------------
 * The sheet
 * ---------------------------------------------------------------------- */

const mono: CSSProperties = {
  fontFamily: FONT.mono,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  lineHeight: 1.3,
};

export interface SheetProps {
  /** 1-based slide number, printed in the foot. */
  n: number;
  /** The running foot: which part of the dossier this sheet belongs to. */
  section: string;
  ground?: Ground;
  /** Full-bleed sheet with no foot (cover, closing). */
  bare?: boolean;
  children: ReactNode;
}

/**
 * One sheet of the dossier: the field between the margins, and a ruled foot
 * carrying the section and the folio. Every slide draws inside this.
 */
export function Sheet({ n, section, ground = "void", bare = false, children }: SheetProps) {
  const tone = inkOn(ground);
  const surface: CSSProperties = {
    background: tone.bg,
    color: tone.ink,
    fontFamily: FONT.text,
  };

  if (bare) {
    return (
      <div lang="id" className="relative h-full w-full overflow-hidden" style={surface}>
        {children}
      </div>
    );
  }

  return (
    <div lang="id" className="relative h-full w-full overflow-hidden" style={surface}>
      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.top,
          height: G.fieldH,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.footRule,
          height: 1,
          background: tone.ruleSoft,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: G.pad,
          right: G.pad,
          top: G.footY,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <span style={{ ...mono, fontSize: T.micro, color: tone.faint }}>{section}</span>
        <span
          style={{
            ...mono,
            fontSize: T.micro,
            letterSpacing: "0.08em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span style={{ color: tone.accent }}>{String(n).padStart(2, "0")}</span>
          <span style={{ color: tone.faint }}> / {TOTAL}</span>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Type
 * ---------------------------------------------------------------------- */

/** The sheet's headline. Narrow, tight, one weight. */
export function Head({
  children,
  size = T.h1,
  max = 1400,
  color,
  style,
}: {
  children: ReactNode;
  size?: number;
  max?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <h2
      style={{
        fontFamily: FONT.display,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 0.98,
        letterSpacing: "0.004em",
        color,
        maxWidth: max,
        flex: "none",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/** Standing copy. Never below 30px inside the body. */
export function Body({
  children,
  size = T.body,
  max,
  color,
  weight = 400,
  lh = 1.45,
  style,
}: {
  children: ReactNode;
  size?: number;
  max?: number;
  color?: string;
  weight?: number;
  lh?: number;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        fontFamily: FONT.text,
        fontSize: size,
        fontWeight: weight,
        lineHeight: lh,
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
    <span style={{ ...mono, fontSize: size, fontWeight: 500, color, ...style }}>{children}</span>
  );
}

/** The one figure the back row must read. */
export function Figure({
  children,
  size = T.stat,
  color,
  style,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: FONT.display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 0.84,
        letterSpacing: "-0.005em",
        fontVariantNumeric: "tabular-nums",
        color,
        display: "block",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * Form devices
 * ---------------------------------------------------------------------- */

/** An empty box on a form: the thing the reader is asked to check. */
export function Check({
  color,
  size = 24,
  checked = false,
}: {
  color: string;
  size?: number;
  checked?: boolean;
}) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        border: `1px solid ${color}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
      }}
    >
      {checked ? <CheckIcon size={size - 6} strokeWidth={2.4} color={color} /> : null}
    </span>
  );
}

/** A ruled field holding one answer, the way a form holds it. */
export function FieldBox({
  label,
  children,
  border,
  faint,
  style,
}: {
  label: string;
  children: ReactNode;
  border: string;
  faint: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ border: `1px solid ${border}`, padding: "20px 24px 22px", ...style }}>
      <div style={{ ...mono, fontSize: T.micro, fontWeight: 500, color: faint }}>{label}</div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

/** A bar drawn from a shared zero; the value is printed at its end. */
export function Bar({
  pct,
  tone,
  color,
  height = 16,
}: {
  pct: number;
  tone: Ink;
  color?: string;
  height?: number;
}) {
  return (
    <div style={{ height, background: tone.ruleSoft, position: "relative", flex: 1 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: `${Math.max(1.5, pct)}%`,
          background: color ?? tone.signal,
        }}
      />
    </div>
  );
}