import type { CSSProperties, ReactNode } from "react";
import "./theme.css";
import { C, COURSE, DECK, FONT, G, T, TOTAL } from "./theme";

function Ticks({ n }: { n: number }) {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {Array.from({ length: TOTAL }, (_, i) => {
        const active = i + 1 === n;
        return <span key={i} style={{ width: active ? 18 : 3, height: 3, background: active ? C.berry : C.rule, display: "block", flex: "none" }} />;
      })}
    </div>
  );
}

const foot: CSSProperties = { fontFamily: FONT.mono, fontSize: T.micro, letterSpacing: "0.10em", color: C.inkFaint, lineHeight: 1 };

export function Sheet({ n, section, bare = false, children }: { n: number; section: string; bare?: boolean; children: ReactNode }) {
  if (bare) return <div className="relative h-full w-full overflow-hidden" style={{ background: C.sand, color: C.ink, fontFamily: FONT.text }}>{children}</div>;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: C.sand, color: C.ink, fontFamily: FONT.text }}>
      <div style={{ position: "absolute", left: G.pad, right: G.pad, top: G.headTop, height: 34, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 11, height: 11, background: C.coral, display: "block", transform: "rotate(45deg)" }} aria-hidden />
          <Label color={C.berry}>{section}</Label>
        </div>
        <span style={{ ...foot, color: C.berry, fontWeight: 500 }}>{String(n).padStart(2, "0")} <span style={{ color: C.inkFaint }}>/ {TOTAL}</span></span>
      </div>
      <div aria-hidden style={{ position: "absolute", left: G.pad, right: G.pad, top: G.headRule, height: 2, background: C.berry }} />
      <div style={{ position: "absolute", left: G.pad, right: G.pad, top: G.contentTop, height: G.contentBottom - G.contentTop, display: "flex", flexDirection: "column", overflow: "hidden" }}>{children}</div>
      <div aria-hidden style={{ position: "absolute", left: G.pad, right: G.pad, top: G.footRule, height: 1, background: C.rule }} />
      <div style={{ position: "absolute", left: G.pad, right: G.pad, top: G.footTop, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={foot}>{COURSE}</span><Ticks n={n} /><span style={foot}>{DECK}</span>
      </div>
      <span aria-hidden style={{ position: "absolute", right: 0, bottom: 0, width: 180, height: 12, background: C.tang }} />
    </div>
  );
}

export function Title({ children, size = T.displaySm, max = 1500, color, lineHeight = 0.98 }: { children: ReactNode; size?: number; max?: number; color?: string; lineHeight?: number }) {
  return <h2 style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: size, lineHeight, letterSpacing: "-0.018em", color: color ?? C.ink, maxWidth: max, margin: 0 }}>{children}</h2>;
}

export function Prose({ children, size = T.body, max = 930, color, weight = 400, lineHeight = 1.42, style }: { children: ReactNode; size?: number; max?: number; color?: string; weight?: number; lineHeight?: number; style?: CSSProperties }) {
  return <p style={{ fontFamily: FONT.text, fontSize: size, fontWeight: weight, lineHeight, color: color ?? C.inkSoft, maxWidth: max, margin: 0, ...style }}>{children}</p>;
}

export function Label({ children, color, size = T.label, weight = 500, style }: { children: ReactNode; color?: string; size?: number; weight?: number; style?: CSSProperties }) {
  return <span style={{ fontFamily: FONT.mono, fontSize: size, fontWeight: weight, letterSpacing: "0.12em", textTransform: "uppercase", color: color ?? C.inkFaint, lineHeight: 1.35, ...style }}>{children}</span>;
}

export function Rule({ color = C.rule, style }: { color?: string; style?: CSSProperties }) {
  return <div aria-hidden style={{ height: 1, background: color, width: "100%", flex: "none", ...style }} />;
}

/** A pale plate. `center` vertically centres its content, which is what keeps a
 *  stretched panel from ending in dead space. */
export function Panel({ children, tone = "white", center = false, style }: { children: ReactNode; tone?: "white" | "coral" | "tang" | "berry"; center?: boolean; style?: CSSProperties }) {
  const background = tone === "coral" ? C.coralPale : tone === "tang" ? C.tangPale : tone === "berry" ? C.berryPale : C.white;
  return (
    <div
      style={{
        background,
        border: "1px solid " + C.rule,
        padding: 28,
        flex: "none",
        ...(center ? { display: "flex", flexDirection: "column", justifyContent: "center" } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Num({ children, color = C.berry, size = T.label }: { children: ReactNode; color?: string; size?: number }) {
  return <span style={{ fontFamily: FONT.mono, fontSize: size, fontWeight: 500, letterSpacing: "0.06em", color, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{children}</span>;
}

export function Pill({ children, tone = "coral" }: { children: ReactNode; tone?: "coral" | "tang" | "berry" }) {
  const background = tone === "tang" ? C.tang : tone === "berry" ? C.berry : C.coral;
  const color = tone === "berry" ? C.sand : C.ink;
  return (
    <span style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", padding: "8px 14px", background, color, fontFamily: FONT.mono, fontSize: T.micro, fontWeight: 500, letterSpacing: "0.05em", lineHeight: 1.2 }}>{children}</span>
  );
}

export function Arrow({ color = C.coral }: { color?: string }) {
  return (
    <span aria-hidden style={{ display: "inline-block", width: 42, height: 2, background: color, position: "relative", flex: "none" }}>
      <span style={{ position: "absolute", right: -1, top: -5, width: 12, height: 12, borderTop: "2px solid " + color, borderRight: "2px solid " + color, transform: "rotate(45deg)" }} />
    </span>
  );
}

export function Dot({ color = C.coral, size = 16, style }: { color?: string; size?: number; style?: CSSProperties }) {
  return <span aria-hidden style={{ width: size, height: size, borderRadius: 999, background: color, display: "inline-block", flex: "none", ...style }} />;
}

/** A horizontal process strip. Cards share one height and the arrow sits in its
 *  own gutter, so no arrowhead ever lands on a card border. */
export function Flow({ steps, accent = C.coral, minHeight = 132 }: { steps: { label: string; note?: string }[]; accent?: string; minHeight?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>
      {steps.map((s, i) => (
        <div key={s.label} style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "stretch" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight, border: "1px solid " + C.rule, background: i % 2 === 0 ? C.white : C.coralPale, padding: 22 }}>
            <Num color={C.berry} size={T.small}>{String(i + 1).padStart(2, "0")}</Num>
            <div style={{ marginTop: 14, fontFamily: FONT.display, fontSize: 34, lineHeight: 1.05, fontWeight: 600, color: C.ink }}>{s.label}</div>
            {s.note ? <Prose size={T.small} color={C.inkFaint} style={{ marginTop: 8 }}>{s.note}</Prose> : null}
          </div>
          {i < steps.length - 1 ? (
            <span aria-hidden style={{ flex: "none", display: "flex", alignItems: "center", padding: "0 16px" }}>
              <Arrow color={accent} />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Two-column comparison table. `grow` lets the rows share a fixed height evenly. */
export function Matrix({ rows, grow = false }: { rows: { a: string; b: string }[]; grow?: boolean }) {
  return (
    <div style={{ borderTop: "2px solid " + C.berry, display: "flex", flexDirection: "column", ...(grow ? { flex: 1 } : null) }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", borderBottom: "1px solid " + C.rule, background: i % 2 === 0 ? C.white : "transparent", ...(grow ? { flex: 1 } : null) }}>
          <div style={{ padding: "16px 24px", fontFamily: FONT.display, fontSize: 32, lineHeight: 1.08, fontWeight: 600, color: C.berry }}>{r.a}</div>
          <div style={{ padding: "16px 24px", fontFamily: FONT.text, fontSize: T.body, lineHeight: 1.28, color: C.inkSoft }}>{r.b}</div>
        </div>
      ))}
    </div>
  );
}

/* ---- deck-level pieces: the slide shell and the repeated text forms ---- */

export const iconStyle = { width: 38, height: 38, strokeWidth: 1.8 } as const;

/** The slide body. Everything between the title block and the footer rule is a
 *  single flex column, so a slide can let its content fill that band instead of
 *  stacking it against the title and leaving the lower third empty. */
export function DeckSlide({ n, section, title, children, bare = false }: { n: number; section: string; title?: ReactNode; children: ReactNode; bare?: boolean }) {
  return (
    <Sheet n={n} section={section} bare={bare}>
      {title ? <div style={{ flex: "none", marginBottom: 34 }}>{title}</div> : null}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{children}</div>
    </Sheet>
  );
}

export function H({ children, size = T.displaySm, max = 1500 }: { children: ReactNode; size?: number; max?: number }) {
  return <Title size={size} max={max}>{children}</Title>;
}

export function Lead({ children, max = 930 }: { children: ReactNode; max?: number }) {
  return <Prose size={T.lede} max={max} color={C.inkSoft} lineHeight={1.34}>{children}</Prose>;
}

export function Body({ children, max = 900, size = T.body, color, weight, style }: { children: ReactNode; max?: number; size?: number; color?: string; weight?: number; style?: CSSProperties }) {
  return <Prose size={size} max={max} color={color} weight={weight} style={style}>{children}</Prose>;
}

export function BulletList({ items, size = T.body, gap = 16, color = C.inkSoft, style }: { items: ReactNode[]; size?: number; gap?: number; color?: string; style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <Dot color={i === 0 ? C.berry : C.tang} size={12} style={{ marginTop: Math.round(size * 0.6) }} />
          <Prose size={size} color={color} max={1500}>{item}</Prose>
        </div>
      ))}
    </div>
  );
}

export function SectionKicker({ children }: { children: ReactNode }) {
  return <Label color={C.berry} style={{ display: "block", marginBottom: 18 }}>{children}</Label>;
}

export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div style={{ marginTop: 40, flex: "none", borderTop: "3px solid " + C.coral, paddingTop: 18, maxWidth: 1500 }}>
      <Prose color={C.ink} weight={500}>{children}</Prose>
    </div>
  );
}

export function IconBadge({ children, tone = "coral" }: { children: ReactNode; tone?: "coral" | "tang" | "berry" }) {
  const bg = tone === "tang" ? C.tangPale : tone === "berry" ? C.berryPale : C.coralPale;
  return <div style={{ width: 74, height: 74, flex: "none", display: "grid", placeItems: "center", background: bg, color: C.berry, border: "1px solid " + C.rule }}>{children}</div>;
}

export function MiniTag({ children, tone = "coral" }: { children: ReactNode; tone?: "coral" | "tang" | "berry" }) {
  return <Pill tone={tone}>{children}</Pill>;
}

export function StatBlock({ value, label, tone = C.coral, detail }: { value: ReactNode; label: string; tone?: string; detail?: string }) {
  return (
    <div style={{ borderTop: "3px solid " + tone, paddingTop: 20, minWidth: 240 }}>
      <div style={{ fontFamily: FONT.display, fontSize: T.stat, lineHeight: 0.92, fontWeight: 600, color: C.berry, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <Label color={C.ink} style={{ display: "block", marginTop: 16 }}>{label}</Label>
      {detail ? <Prose size={T.small} color={C.inkFaint} style={{ marginTop: 8 }}>{detail}</Prose> : null}
    </div>
  );
}
