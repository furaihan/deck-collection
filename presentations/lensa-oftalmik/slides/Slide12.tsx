import { Film, Title, Label, Numeral } from "../Frame";
import { Fraction } from "../Pieces";
import { C, FONT, LIT } from "../theme";

const abbe = [
  { label: "Crown glass", value: 58.9, display: "58.9" },
  { label: "CR-39", value: 58, display: "58" },
  { label: "Mid-index", value: 37, display: "37" },
  { label: "High-index plastik", value: 36, display: "36" },
  { label: "Polikarbonat", value: 30, display: "30" },
];

export default function Slide12() {
  const top = 58.9;
  return (
    <Film n={12} section="02 · Sifat optik" accent="Nomor Abbe" foot="Contoh perhitungan memakai kaca flint: nd 1.6225, nF 1.6349, nC 1.6176.">
      <div style={{ flex: "none" }}>
        <Title size={70} max={1240}>Angka kedua: seberapa jauh warna terurai</Title>
      </div>

      <div className="flex" style={{ gap: 48, marginTop: 22, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: LIT.plate,
              boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 20px 38px rgba(58,46,28,0.16)",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: C.ink }}>V =</span>
            <Fraction
              numerator={<span style={{ fontFamily: FONT.mono, fontSize: 30 }}>nd − 1</span>}
              denominator={<span style={{ fontFamily: FONT.mono, fontSize: 30 }}>nF − nC</span>}
              size={24}
            />
            <div style={{ marginLeft: 10, fontFamily: FONT.mono, fontSize: 18, lineHeight: 1.5, color: C.inkFaint }}>
              F = biru 486 nm<br />C = merah 656 nm
            </div>
          </div>

          <div style={{ display: "flex", gap: 18, marginTop: 16 }}>
            <div
              style={{
                flex: 1,
                background: LIT.plateInk,
                boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 22px 40px rgba(20,21,24,0.38)",
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontFamily: FONT.mono, fontSize: 20, color: C.onInk }}>0.6225 / 0.0173 =</span>
              <Numeral size={62} color={C.amberSoft}>35.98</Numeral>
            </div>
          </div>

          <div style={{ display: "flex", gap: 18, marginTop: 16 }}>
            {[
              { k: "Flint", v: "V < 50", note: "Dispersi besar; warna terurai jauh.", hot: false },
              { k: "Crown", v: "V > 50", note: "Dispersi kecil; tepi objek tetap bersih.", hot: true },
            ].map((t) => (
              <div
                key={t.k}
                style={{
                  flex: 1,
                  background: LIT.plateFlat,
                  boxShadow: "0 0 0 1px rgba(20,21,24,0.12)",
                  padding: "14px 20px",
                }}
              >
                <Label size={15}>{t.k}</Label>
                <div style={{ marginTop: 4, fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: t.hot ? C.amberText : C.ink, lineHeight: 1 }}>
                  {t.v}
                </div>
                <div style={{ marginTop: 4, fontFamily: FONT.text, fontSize: 20, lineHeight: 1.35, color: C.inkSoft }}>{t.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 660, flex: "none", display: "flex", flexDirection: "column" }}>
          <Label size={16}>Nomor Abbe per material</Label>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 34 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
            {abbe.map((d, i) => {
              const hot = i === abbe.length - 1;
              return (
                <div key={d.label} className="flex items-center" style={{ gap: 16 }}>
                  <div style={{ width: 240, flex: "none", fontFamily: FONT.text, fontSize: 21, lineHeight: 1.2, color: hot ? C.ink : C.inkSoft, fontWeight: hot ? 600 : 400 }}>
                    {d.label}
                  </div>
                  <div
                    style={{
                      width: (d.value / top) * 280,
                      height: 34,
                      flex: "none",
                      background: hot
                        ? LIT.barHot
                        : LIT.bar,
                      boxShadow: hot
                        ? "0 10px 20px rgba(180,120,30,0.32), 0 1px 0 rgba(255,255,255,0.5) inset"
                        : "0 10px 20px rgba(20,21,24,0.26), 0 1px 0 rgba(255,255,255,0.13) inset",
                    }}
                  />
                  <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 26, color: hot ? C.ink : C.inkSoft }}>
                    {d.display}
                  </span>
                </div>
              );
            })}
            </div>
          </div>

          <div style={{ marginTop: "auto", borderTop: `1px solid ${C.rule}`, paddingTop: 14 }}>
            <div style={{ fontFamily: FONT.text, fontSize: 20, lineHeight: 1.4, color: C.inkSoft }}>
              Makin rendah Abbe, makin cepat warna terpisah di tepi lensa.
              Polikarbonat adalah yang paling rendah di daftar ini.
            </div>
          </div>
        </div>
      </div>
    </Film>
  );
}