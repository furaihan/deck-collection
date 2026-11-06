import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const PROBLEM = [
  "Menerapkan besarnya masalah dan penyebarannya pada penduduk tertentu.",
  "Mengidentifikasi faktor penyebab atau faktor yang berhubungan.",
  "Menyiapkan data esensial untuk perencanaan, pelaksanaan, evaluasi, dan prioritas.",
];

const WHO = [
  "Mencari penyebab: faktor yang memengaruhi derajat kesehatan.",
  "Mendeskripsikan status kesehatan menurut waktu, usia, dan sebagainya.",
  "Mengidentifikasi riwayat alamiah penyakit.",
  "Mengevaluasi hasil intervensi dan keberhasilan program.",
];

const BOOK = [
  "Mengintervensi penyebab suatu penyakit.",
  "Mengidentifikasi faktor risiko.",
  "Identifikasi gejala dan klasifikasi penyakit.",
  "Perbandingan diagnosis dan perencanaan pengobatan.",
  "Surveilans status kesehatan masyarakat.",
  "Diagnosis komunitas dan perencanaan layanan kesehatan.",
  "Evaluasi pelayanan kesehatan dan intervensi.",
];

/** Three frames for the same role: the problem, WHO 1977, and the 1999 book. */
export default function Slide09() {
  return (
    <Sheet n={9} section="Peran">
      <Title>Di mana epidemiologi bekerja.</Title>

      <div style={{ display: "flex", gap: 30, marginTop: 30 }}>
        {PROBLEM.map((item, i) => (
          <div key={item} style={{ flex: 1, borderTop: "2px solid " + (i === 0 ? C.lime : C.rule), paddingTop: 12 }}>
            <p style={{ fontSize: 21, lineHeight: 1.45, color: C.inkSoft }}>{item}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 70, marginTop: 40, flex: 1 }}>
        <div style={{ flex: "0 0 560px" }}>
          <Label color={C.lime}>WHO 1977</Label>
          <div style={{ marginTop: 10 }}>
            {WHO.map((item, i) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 16,
                  borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                  padding: "12px 0",
                }}
              >
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkGhost }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 22, lineHeight: 1.4, color: C.inkSoft }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Label color={C.lime}>Epidemiology in Health Care &middot; 1999</Label>
          <div style={{ marginTop: 10 }}>
            {BOOK.map((item, i) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 16,
                  borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                  padding: "7px 0",
                }}
              >
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkGhost }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 21, lineHeight: 1.35, color: C.inkSoft }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Takeaway>Dari mencari sebab sampai menilai program &mdash; peran yang terus melebar.</Takeaway>
    </Sheet>
  );
}
