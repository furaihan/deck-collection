import { Film, Title, Label, Numeral } from "../Frame";
import { C, FONT, LIT } from "../theme";

const sg = [
  { label: "Kaca high-index 1.802", value: 3.65, display: "3.65" },
  { label: "Kaca high-index 1.701", value: 3.21, display: "3.21" },
  { label: "Kaca crown", value: 2.54, display: "2.54" },
  { label: "High-index plastik", value: 1.36, display: "1.36" },
  { label: "CR-39", value: 1.32, display: "1.32" },
  { label: "Polikarbonat", value: 1.2, display: "1.20" },
];

export default function Slide16() {
  const top = 3.65;
  return (
    <Film n={16} section="03 · Sifat fisik" accent="Berat jenis" foot="Berat jenis tidak menentukan berat lensa jadi: indeks lebih tinggi membuat lensa lebih tipis, dan bisa lebih ringan walau bahannya lebih padat.">
      <div style={{ flex: "none" }}>
        <Title size={72} max={1240}>Padat belum tentu berat di wajah</Title>
      </div>

      <div className="flex" style={{ gap: 44, marginTop: 26, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: LIT.plate,
              boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 20px 38px rgba(58,46,28,0.16)",
              padding: "20px 26px",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 50, color: C.ink }}>SG =</span>
              <span style={{ fontFamily: FONT.text, fontSize: 40, color: C.ink }}>ρ / ρ₀</span>
            </div>
            <div style={{ marginTop: 4, fontFamily: FONT.mono, fontSize: 18, color: C.inkFaint }}>
              ρ₀ = air 4 °C = 1 g/cm³
            </div>
          </div>

          <div style={{ display: "flex", gap: 18, marginTop: 16 }}>
            <div
              style={{
                flex: 1,
                background: LIT.plateInk,
                boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 22px 40px rgba(20,21,24,0.38)",
                padding: "18px 22px",
              }}
            >
              <div style={{ fontFamily: FONT.mono, fontSize: 19, color: C.onInk }}>158.6 lb / 62.5 lb =</div>
              <Numeral size={58} color={C.amberSoft}>2.54</Numeral>
            </div>
            <div
              style={{
                flex: 1,
                background: LIT.plateFlat,
                boxShadow: "0 0 0 1px rgba(20,21,24,0.12)",
                padding: "18px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontFamily: FONT.text, fontSize: 20, lineHeight: 1.4, color: C.inkSoft }}>
                1 cm³ CR-39 beratnya 1.32 gram; kaca crown 2.54 gram.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 26 }}>
            <div
              style={{
                background: LIT.plateInk,
                boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 22px 40px rgba(20,21,24,0.36)",
                padding: "16px 22px",
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: 28,
                lineHeight: 1.18,
                color: C.paper,
                maxWidth: 660,
              }}
            >
              Berat per volume mudah dibandingkan; berat lensa jadi tidak, karena
              bentuk akhirnya ikut berubah.
            </div>
          </div>

          <div style={{ marginTop: 22, display: "flex", gap: 30, borderTop: `1px solid ${C.rule}`, paddingTop: 14 }}>
            {[
              { k: "Kaca crown", v: "2.54" },
              { k: "CR-39", v: "1.32" },
              { k: "Polikarbonat", v: "1.20" },
            ].map((r) => (
              <div key={r.k} style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 15, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkFaint }}>
                  {r.k}
                </div>
                <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: C.ink, lineHeight: 1.05 }}>
                  {r.v}
                </div>
                <div style={{ fontFamily: FONT.text, fontSize: 19, color: C.inkSoft }}>g/cm³</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 700, flex: "none" }}>
          <Label size={16}>Berat jenis · g/cm³</Label>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
            {sg.map((d, i) => {
              const hot = i === sg.length - 1;
              return (
                <div key={d.label} className="flex items-center" style={{ gap: 14 }}>
                  <div style={{ width: 260, flex: "none", fontFamily: FONT.text, fontSize: 21, color: hot ? C.ink : C.inkSoft, fontWeight: hot ? 600 : 400 }}>
                    {d.label}
                  </div>
                  <div
                    style={{
                      width: (d.value / top) * 300,
                      height: 32,
                      flex: "none",
                      background: hot
                        ? LIT.barHot
                        : LIT.bar,
                      boxShadow: hot
                        ? "0 10px 20px rgba(180,120,30,0.32), 0 1px 0 rgba(255,255,255,0.5) inset"
                        : "0 10px 20px rgba(20,21,24,0.26), 0 1px 0 rgba(255,255,255,0.13) inset",
                    }}
                  />
                  <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 23, color: hot ? C.ink : C.inkSoft }}>
                    {d.display}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Film>
  );
}