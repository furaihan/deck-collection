import type { CSSProperties, ReactNode } from "react";
import "./theme.css";
import { C, FONT, G, T } from "./theme";

const MONO_SMALL: CSSProperties = {
  fontFamily: FONT.mono,
  fontSize: T.micro,
  letterSpacing: "0.14em",
  lineHeight: 1,
  color: C.inkFaint,
};

/**
 * The proof sheet: a running head with the section and the folio, one content
 * field between two hairlines, and a foot rail carrying the deck's identity.
 * Every slide draws inside this; nothing is drawn outside it.
 */
export function Sheet({
  n,
  total,
  section,
  bare = false,
  children,
}: {
  n: number;
  total: number;
  section?: string;
  bare?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: C.stock, color: C.ink, fontFamily: FONT.text }}
    >
      {bare ? (
        children
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              left: G.pad,
              right: G.pad,
              top: 44,
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span style={{ ...MONO_SMALL, textTransform: "uppercase" }}>{section ?? "\u00a0"}</span>
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
              {String(n).padStart(2, "0")}
              <span style={{ color: C.inkFaint }}> / {String(total).padStart(2, "0")}</span>
            </span>
          </div>

          <Hairline top={92} />

          <div
            style={{
              position: "absolute",
              left: G.pad,
              right: G.pad,
              top: G.top,
              height: G.bottom - G.top,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {children}
          </div>

          <Hairline top={G.footRule} color={C.rule} />

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
            <span style={MONO_SMALL}>PRESENTATIONS / CODE-BLOCK-DEMO</span>
            <RisoTicks n={n} total={total} />
            <span style={MONO_SMALL}>TANSTACK HIGHLIGHT 1.2.11</span>
          </div>
        </>
      )}
    </div>
  );
}

function Hairline({ top, color = C.rule }: { top: number; color?: string }) {
  return (
    <div
      aria-hidden
      style={{ position: "absolute", left: G.pad, right: G.pad, top, height: 1, background: color }}
    />
  );
}

/** One tick per slide, the current one drawn long and in riso. */
function RisoTicks({ n, total }: { n: number; total: number }) {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {Array.from({ length: total }, (_, index) => {
        const active = index + 1 === n;
        return (
          <span
            key={index}
            style={{
              width: active ? 22 : 4,
              height: 3,
              flex: "none",
              background: active ? C.riso : C.rule,
            }}
          />
        );
      })}
    </div>
  );
}

/** A slide headline. */
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
        fontWeight: 600,
        fontSize: size,
        lineHeight,
        letterSpacing: "-0.025em",
        color: color ?? C.ink,
        maxWidth: max,
        textWrap: "balance",
        flex: "none",
      }}
    >
      {children}
    </h2>
  );
}

/** Reading copy. */
export function Prose({
  children,
  size = T.body,
  max = 720,
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

/** A tracked mono label: measurements, paths, filenames. */
export function Label({
  children,
  color,
  size = T.label,
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
        letterSpacing: "0.16em",
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

/** The line the slide exists to say, anchored to the foot of the field. */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: "auto",
        flex: "none",
        borderTop: `3px solid ${C.riso}`,
        paddingTop: 16,
        maxWidth: 1500,
      }}
    >
      <p style={{ fontFamily: FONT.text, fontSize: T.body, lineHeight: 1.4, color: C.ink, fontWeight: 500 }}>
        {children}
      </p>
    </div>
  );
}

/** A hairline inside the content field. */
export function Rule({ color = C.rule, style }: { color?: string; style?: CSSProperties }) {
  return <div aria-hidden style={{ height: 1, background: color, width: "100%", flex: "none", ...style }} />;
}

/**
 * A trim mark, in the sheet's corner. Drawn as two arms so it reads as the
 * printer's register mark rather than as a border.
 */
export function CropMark({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const arm = 30;
  const inset = 34;
  const left = corner === "tl" || corner === "bl";
  const top = corner === "tl" || corner === "tr";

  const vertical: CSSProperties = {
    position: "absolute",
    width: 1,
    height: arm,
    background: C.ink,
    opacity: 0.4,
  };
  const horizontal: CSSProperties = {
    position: "absolute",
    width: arm,
    height: 1,
    background: C.ink,
    opacity: 0.4,
  };

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: arm,
        height: arm,
        ...(left ? { left: inset } : { right: inset }),
        ...(top ? { top: inset } : { bottom: inset }),
      }}
    >
      <span
        style={{ ...vertical, ...(left ? { left: 0 } : { right: 0 }), ...(top ? { top: 0 } : { bottom: 0 }) }}
      />
      <span
        style={{ ...horizontal, ...(left ? { left: 0 } : { right: 0 }), ...(top ? { top: 0 } : { bottom: 0 }) }}
      />
    </div>
  );
}
