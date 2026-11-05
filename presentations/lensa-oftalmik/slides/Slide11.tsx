import { Film, Title, Label, Kicker } from "../Frame";
import { C, FONT, LIT } from "../theme";

const data = [
  { index: "1.50", thick: 6.1 },
  { index: "1.55", thick: 5.2 },
  { index: "1.60", thick: 4.7 },
  { index: "1.67", thick: 4.2 },
  { index: "1.74", thick: 3.7 },
];

export default function Slide11() {
  const maxThick = 6.1;
  const chartH = 322;

  return (
    <Film n={11} section="02 · Sifat optik" accent="Ketebalan" foot="Perbandingan pada kekuatan dan diameter identik; diameter lensa sebelum dipotong 65 mm.">
      <div style={{ flex: "none" }}>
        <Title size={72} max={1240}>Tiap kenaikan indeks memotong sepersekian milimeter</Title>
      </div>

      <div className="flex" style={{ gap: 56, marginTop: 26, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 22 }}>
            {data.map((d, i) => {
              const hot = i === data.length - 1;
              return (
                <div key={d.index} style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 25, color: hot ? C.ink : C.inkSoft, marginBottom: 8 }}>
                    {d.thick.toFixed(1)}
                    <span style={{ fontFamily: FONT.mono, fontSize: 15, fontWeight: 400, color: C.inkFaint }}> mm</span>
                  </div>
                  <div
                    style={{
                      height: (d.thick / maxThick) * chartH,
                      background: hot
                        ? LIT.barHot
                        : LIT.bar,
                      boxShadow: hot
                        ? "0 16px 30px rgba(180,120,30,0.34), 0 1px 0 rgba(255,255,255,0.5) inset"
                        : "0 16px 30px rgba(20,21,24,0.28), 0 1px 0 rgba(255,255,255,0.13) inset",
                    }}
                  />
                  <div style={{ height: 2.5, background: C.ink, marginTop: 2 }} />
                  <div style={{ marginTop: 9, fontFamily: FONT.display, fontWeight: 700, fontSize: 31, color: hot ? C.ink : C.inkSoft }}>
                    {d.index}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 8 }}>
            <Label size={16} track="0.14em">Index bias</Label>
          </div>

          <Kicker size={30} max={600}>
            Tebal turun dua perlima, tetapi indeks naik juga menurunkan Abbe dan
            menaikkan berat jenis.
          </Kicker>
        </div>

        <div style={{ width: 500, flex: "none" }}>
          <div
            style={{
              background: LIT.plateInk,
              boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 26px 46px rgba(20,21,24,0.40)",
              padding: "24px 26px",
            }}
          >
            <Label size={16} color={C.amber}>Membaca grafik ini</Label>
            <div style={{ marginTop: 12, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.45, color: C.paper }}>
              Dari 1.50 ke 1.74, tebal tepi turun 6.1 menjadi 3.7 mm, sekitar dua
              perlima. Pada minus tinggi, selisih inilah yang menentukan apakah
              bingkai masih muat.
            </div>
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(244,239,230,0.18)" }}>
              <div style={{ fontFamily: FONT.text, fontSize: 21, lineHeight: 1.45, color: C.onInk }}>
                Tetapi indeks tinggi juga berarti nomor Abbe lebih rendah dan berat
                jenis lebih besar. Pengurangan tebal harus membayar kenaikan berat.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Film>
  );
}