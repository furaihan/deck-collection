import { C, FONT } from "../theme";
import { DotGrid, Label, Sheet, Stat, Takeaway, Title } from "../Frame";

const QUESTIONS = [
  { k: "WHAT", q: "Apa masalah kesehatannya?" },
  { k: "WHO", q: "Siapa yang mengalami?" },
  { k: "WHERE", q: "Di mana terjadi?" },
  { k: "WHEN", q: "Kapan terjadi?" },
  { k: "WHY", q: "Mengapa bisa terjadi?" },
];

const FOLLOW = [
  "kelas berapa",
  "laki-laki / perempuan",
  "pemakaian gadget",
  "aktivitas luar",
  "besar masalah",
  "tindakan",
  "perubahan setelah edukasi",
];

/** The opening case: a number is not yet a finding. */
export default function Slide03() {
  return (
    <Sheet n={3} section="Kasus pembuka">
      <Title>20 siswa miopia. Cukupkah?</Title>

      <div style={{ display: "flex", gap: 80, marginTop: 40, flex: 1 }}>
        <div style={{ flex: "none", width: 380 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <Stat size={120}>20</Stat>
            <span style={{ fontFamily: FONT.mono, fontSize: 22, color: C.inkFaint }}>/ 100</span>
          </div>
          <p style={{ marginTop: 10, fontSize: 22, color: C.inkFaint, lineHeight: 1.4 }}>siswa SD diperiksa</p>

          <div style={{ marginTop: 26 }}>
            <DotGrid size={22} gap={5} />
          </div>

          <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
            <span style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 18, color: C.inkFaint }}>
              <span style={{ width: 10, height: 10, background: C.lime }} aria-hidden /> miopia
            </span>
            <span style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 18, color: C.inkFaint }}>
              <span
                style={{ width: 10, height: 10, border: "1px solid " + C.rule, background: "rgba(237,242,234,0.07)" }}
                aria-hidden
              />{" "}
              tidak
            </span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Label color={C.lime}>Lima pertanyaan</Label>
          <div style={{ marginTop: 12 }}>
            {QUESTIONS.map((item, i) => (
              <div
                key={item.k}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 26,
                  borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                  padding: "15px 0",
                }}
              >
                <span style={{ fontFamily: FONT.mono, fontSize: 20, color: C.lime, width: 90, flex: "none" }}>
                  {item.k}
                </span>
                <span style={{ fontSize: 30, lineHeight: 1.2, color: C.ink }}>{item.q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 22, borderTop: "1px solid " + C.rule, paddingTop: 16 }}>
        <Label color={C.inkFaint}>Pertanyaan lanjutan</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 26px", marginTop: 10 }}>
          {FOLLOW.map((f) => (
            <span key={f} style={{ fontSize: 20, color: C.inkFaint }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      <Takeaway>Angka tanpa pola belum menjadi pengetahuan.</Takeaway>
    </Sheet>
  );
}
