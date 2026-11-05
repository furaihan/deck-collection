import type { ReactNode } from "react";
import "./theme.css";
import { C, CODE, FONT, FRAME, LIT, TOTAL } from "./theme";

const HOLE_W = 44;
const HOLE_H = 30;
const PITCH = 84;
const COUNT = TOTAL;
const RAIL_OFFSET = (1920 - (COUNT - 1) * PITCH - HOLE_W) / 2;
const RAIL_H = FRAME.top;

/**
 * The perforation rail. One perforation per frame and twenty frames, so the
 * count is real information: what is behind the gate is spent, what is next is
 * unexposed, and the gate itself is the only lit thing on the strip.
 */
function Sprocket({ top, n }: { top: boolean; n: number }) {
  // One lit perforation per frame, stepped 1:1, so the rail really counts.
  const gate = n - 1;

  return (
    <div
      className="absolute left-0 right-0"
      style={{ top: top ? 0 : 1080 - RAIL_H, height: RAIL_H }}
      aria-hidden
    >
      {Array.from({ length: COUNT }, (_, i) => {
        const state = i < gate ? "past" : i === gate ? "gate" : "next";
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: RAIL_OFFSET + i * PITCH,
              top: Math.round((RAIL_H - HOLE_H) / 2),
              width: HOLE_W,
              height: HOLE_H,
              borderRadius: 2,
              background:
                state === "gate"
                  ? LIT.gate
                  : state === "past"
                    ? C.holePast
                    : C.holeNext,
              boxShadow:
                state === "gate"
                  ? `0 0 30px ${C.holeGate}bb, 0 0 8px ${C.holeGate}, inset 0 1px 0 rgba(255,255,255,0.7)`
                  : "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.55)",
            }}
          />
        );
      })}
    </div>
  );
}

/** Vertical edge printing: the film's own stock code and frame counter. */
function Edge({ left, n }: { left: boolean; n: number }) {
  return (
    <div
      className="absolute"
      aria-hidden
      style={{
        left: left ? 0 : "auto",
        right: left ? "auto" : 0,
        width: FRAME.left,
        top: FRAME.top,
        height: FRAME.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          writingMode: "vertical-rl",
          transform: left ? "rotate(180deg)" : undefined,
          fontFamily: FONT.mono,
          fontSize: 15,
          letterSpacing: "0.36em",
          textTransform: "uppercase",
          color: "#55524A",
          whiteSpace: "nowrap",
        }}
      >
        {left ? CODE : `FRAME ${String(n).padStart(2, "0")} / ${TOTAL}`}
      </div>
    </div>
  );
}

interface FilmProps {
  /** 1-based frame number. Drives the rails and the edge printing. */
  n: number;
  /** The section label printed on the frame's slate line. */
  section?: string;
  /** A short caption printed under the rule at the foot of the frame. */
  foot?: string;
  /** The right-hand slate note: what this frame is about. */
  accent?: string;
  /** Inverts the whole frame to an ink plate. */
  dark?: boolean;
  /** Deepens the paper for frames that need less bounce. */
  deep?: boolean;
  children: ReactNode;
}

/**
 * One frame of the reel: the film base, both rails, the edge printing, and the
 * lit frame every slide draws inside.
 */
export function Film({ n, section, foot, accent, dark = false, deep = false, children }: FilmProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `radial-gradient(140% 110% at 50% 50%, ${C.filmEdge} 0%, ${C.film} 42%, ${C.filmDeep} 100%)`,
        color: dark ? C.paper : C.ink,
        fontFamily: FONT.text,
      }}
    >
      <Sprocket top n={n} />
      <Sprocket top={false} n={n} />
      <Edge left n={n} />
      <Edge left={false} n={n} />

      <div
        className="absolute overflow-hidden"
        style={{
          left: FRAME.left,
          top: FRAME.top,
          width: FRAME.width,
          height: FRAME.height,
          background: dark ? LIT.ink : deep ? LIT.glassDeep : LIT.glass,
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.16) inset, 0 0 0 1px rgba(0,0,0,0.55), 0 40px 90px rgba(0,0,0,0.70), 0 10px 24px rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="flex h-full flex-col"
          style={{ padding: `${FRAME.padTop}px ${FRAME.padX}px ${FRAME.padBottom}px` }}
        >
          {section ? <Slate section={section} accent={accent} dark={dark} /> : null}
          <div className="flex min-h-0 flex-1 flex-col" style={{ paddingTop: 30 }}>
            {children}
          </div>
          {foot ? <Foot text={foot} dark={dark} /> : null}
        </div>
      </div>
    </div>
  );
}

/** The slate line: what section of the reel this frame belongs to. */
function Slate({ section, accent, dark }: { section: string; accent?: string; dark: boolean }) {
  const tone = dark ? "#7E7869" : C.inkFaint;
  return (
    <div className="flex items-center justify-between" style={{ flex: "none" }}>
      <div className="flex items-center" style={{ gap: 13 }}>
        <span
          style={{
            width: 10,
            height: 10,
            background: C.amber,
            flex: "none",
            boxShadow: dark ? "0 0 14px rgba(227,154,46,0.7)" : "none",
          }}
        />
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 18,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: tone,
            lineHeight: 1,
          }}
        >
          {section}
        </span>
      </div>
      {accent ? (
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: tone,
            lineHeight: 1,
          }}
        >
          {accent}
        </span>
      ) : null}
    </div>
  );
}

function Foot({ text, dark }: { text: string; dark: boolean }) {
  return (
    <div
      className="flex items-center"
      style={{
        flex: "none",
        gap: 18,
        marginTop: 22,
        paddingTop: 14,
        borderTop: `1px solid ${dark ? "rgba(244,239,230,0.16)" : C.rule}`,
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: 17,
          letterSpacing: "0.06em",
          color: dark ? "#8A8478" : C.inkFaint,
          lineHeight: 1.35,
        }}
      >
        {text}
      </span>
    </div>
  );
}

/** A slide headline, sized by role rather than by guesswork. */
export function Title({
  children,
  size = 84,
  max = 1180,
  color,
  lineHeight = 0.92,
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
        fontWeight: 700,
        fontSize: size,
        lineHeight,
        letterSpacing: "-0.014em",
        color: color ?? C.ink,
        maxWidth: max,
      }}
    >
      {children}
    </h2>
  );
}

/** Body copy at the projector floor: never below 23px. */
export function Prose({
  children,
  size = 29,
  max = 760,
  color,
  weight = 400,
  lineHeight = 1.52,
}: {
  children: ReactNode;
  size?: number;
  max?: number;
  color?: string;
  weight?: number;
  lineHeight?: number;
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
      }}
    >
      {children}
    </p>
  );
}

/** A measurement, set in the display face so numbers read from the back row. */
export function Numeral({
  children,
  size = 96,
  color,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
}) {
  return (
    <span
      style={{
        fontFamily: FONT.display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 0.86,
        letterSpacing: "-0.018em",
        color: color ?? C.ink,
        fontVariantNumeric: "tabular-nums",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

/**
 * The closing line. Every content frame ends here: one sentence in the display
 * face that states what the frame's evidence adds up to, separated by a rule.
 */
export function Kicker({
  children,
  size = 33,
  max = 1100,
  color,
  dark = false,
}: {
  children: ReactNode;
  size?: number;
  max?: number;
  color?: string;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: 16,
        borderTop: `2.5px solid ${dark ? "rgba(244,239,230,0.35)" : C.ink}`,
        flex: "none",
      }}
    >
      <div
        style={{
          fontFamily: FONT.display,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.16,
          color: color ?? (dark ? C.paper : C.ink),
          maxWidth: max,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** A label or edge note. Mono, tracked, uppercase. */
export function Label({
  children,
  size = 17,
  color,
  track = "0.22em",
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  track?: string;
}) {
  return (
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: size,
        letterSpacing: track,
        textTransform: "uppercase",
        color: color ?? C.inkFaint,
        lineHeight: 1.3,
      }}
    >
      {children}
    </span>
  );
}