import { C, FONT } from "../theme";
import { Sheet, Title } from "../Frame";

const LAPIS = [
  { no: "01", name: "RPJPN", span: "20 tahun", w: 100 },
  { no: "02", name: "RPJMN", span: "5 tahun", w: 82 },
  { no: "03", name: "RPJP-K", span: "20–25 tahun", w: 66 },
  { no: "04", name: "SKN", span: "cara kerja", w: 50 },
  { no: "05", name: "Renstra", span: "arah kerja", w: 34 },
];

/** The planning stack as five narrowing bars. Almost no words. */
export default function Slide11() {
  return (
    <Sheet n={11} section="Perencanaan" cite="RPJPN – RPJMN – RPJP-K" line={false}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={980}>Dari rencana ke program</Title>
        <p style={{ fontSize: 24, color: C.inkFaint, maxWidth: 500, textAlign: "right", lineHeight: 1.4 }}>
          Semakin pendek jangkanya, semakin dekat ke ruang periksa.
        </p>
      </div>

      <div style={{ marginTop: 42, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 34 }}>
        {LAPIS.map((l, i) => {
          const hot = i === 4;
          return (
            <div
              key={l.no}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                paddingTop: 18,
                paddingBottom: 18,
                borderTop: "1px solid " + C.rule,
              }}
            >
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  color: hot ? C.pink : C.inkGhost,
                  width: 34,
                  flex: "none",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {l.no}
              </span>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 52,
                  lineHeight: 1,
                  color: hot ? C.pink : C.ink,
                  width: 400,
                  flex: "none",
                }}
              >
                {l.name}
              </span>
              <span
                style={{
                  fontSize: 19,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.inkGhost,
                  width: 190,
                  flex: "none",
                }}
              >
                {l.span}
              </span>
              <div
                style={{
                  width: l.w * 5.4,
                  height: 16,
                  background: hot ? C.pink : C.ink,
                  opacity: hot ? 1 : 0.15 + i * 0.17,
                  flex: "none",
                }}
                aria-hidden
              />
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: "auto", fontSize: 17, color: C.inkGhost, paddingBottom: 10, paddingTop: 16 }}>
        Sumber tidak menunjukkan urutan panah bagan secara pasti; deck ini menyusunnya menurut jangka waktu.
      </p>
    </Sheet>
  );
}
