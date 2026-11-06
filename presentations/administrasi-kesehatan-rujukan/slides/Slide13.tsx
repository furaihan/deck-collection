import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const PENYEBAB = [
  { name: "Stroke", v: 132 },
  { name: "Jantung iskemik", v: 96 },
  { name: "Diabetes", v: 41 },
  { name: "Tuberkulosis", v: 33 },
  { name: "Sirosis hati", v: 33 },
  { name: "PPOK", v: 29 },
  { name: "Diare", v: 24 },
  { name: "Jantung hipertensi", v: 20 },
  { name: "Infeksi napas", v: 19 },
  { name: "Neonatal", v: 17 },
];

const MAX = 132;

/** Ten bars and one number each. No body copy at all. */
export default function Slide13() {
  return (
    <Sheet n={13} section="Kondisi kesehatan" cite="2019, per 100.000">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={960}>Yang paling banyak mematikan</Title>
        <Label>Indonesia 2019</Label>
      </div>

      <div style={{ marginTop: 30, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 8 }}>
        {PENYEBAB.map((p, i) => {
          const hot = i === 0;
          return (
            <div
              key={p.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 26,
                paddingTop: 12,
                paddingBottom: 12,
                borderTop: i === 0 ? "none" : "1px solid " + C.ruleHair,
              }}
            >
              <span style={{ fontSize: 27, color: hot ? C.ink : C.inkSoft, width: 400, flex: "none", lineHeight: 1.15 }}>
                {p.name}
              </span>
              <div
                style={{
                  width: (p.v / MAX) * 700,
                  height: 26,
                  background: hot ? C.pink : C.inkSoft,
                  opacity: hot ? 1 : 0.22,
                  flex: "none",
                }}
                aria-hidden
              />
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 34,
                  color: hot ? C.pink : C.inkSoft,
                  fontVariantNumeric: "tabular-nums",
                  marginLeft: "auto",
                }}
              >
                {p.v}
              </span>
            </div>
          );
        })}
      </div>
    </Sheet>
  );
}
