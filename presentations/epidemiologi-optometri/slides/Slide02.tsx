import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const ROWS = [
  { k: "01", t: "Ada apa", d: "Bukan hanya angka, tetapi pola kejadian." },
  { k: "02", t: "Siapa, di mana, kapan", d: "Pertanyaan yang mengubah angka menjadi pengetahuan." },
  { k: "03", t: "Kenapa & apa yang bisa dilakukan", d: "Faktor yang berhubungan, lalu dasar tindakan." },
];

/** Definition: one paragraph, three moves, one line to take away. */
export default function Slide02() {
  return (
    <Sheet n={2} section="Konsep dasar">
      <Title max={1280}>Bukan satu penyakit. Bukan satu profesi.</Title>

      <div style={{ display: "flex", gap: 90, marginTop: 54, flex: 1 }}>
        <div style={{ flex: "1 1 0", maxWidth: 820 }}>
          <Label color={C.lime}>Definisi</Label>
          <p style={{ marginTop: 22, fontFamily: FONT.text, fontSize: 36, lineHeight: 1.42, color: C.ink }}>
            Cara mempelajari masalah kesehatan pada sekelompok orang atau masyarakat: bagaimana pola
            kejadiannya, faktor apa yang berhubungan, dan apa yang menjadi dasar tindakan.
          </p>
          <div style={{ marginTop: 34, borderLeft: "1px solid " + C.rule, paddingLeft: 24 }}>
            <p style={{ fontSize: 24, lineHeight: 1.5, color: C.inkFaint }}>
              Epidemiologi bukan milik satu penyakit, dan bukan milik satu profesi.
            </p>
          </div>
        </div>

        <div style={{ flex: "1 1 0", paddingTop: 4 }}>
          {ROWS.map((r, i) => (
            <div
              key={r.k}
              style={{
                borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                padding: "22px 0",
              }}
            >
              <div style={{ display: "flex", gap: 22, alignItems: "baseline" }}>
                <span style={{ fontFamily: FONT.mono, fontSize: 20, color: C.lime }}>{r.k}</span>
                <div>
                  <p style={{ fontFamily: FONT.display, fontSize: 34, lineHeight: 1.1, color: C.ink }}>{r.t}</p>
                  <p style={{ marginTop: 8, fontSize: 22, lineHeight: 1.45, color: C.inkFaint, maxWidth: 560 }}>
                    {r.d}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Takeaway>Epidemiologi adalah cara berpikir tentang populasi &mdash; bukan daftar penyakit.</Takeaway>
    </Sheet>
  );
}
