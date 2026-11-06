import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const CASES = [
  {
    id: "I",
    place: "RS besar",
    finding: "25% pasien DM ditemukan retinopati diabetik; sebagian besar tidak pernah periksa mata rutin.",
  },
  {
    id: "II",
    place: "Klinik mata",
    finding: "40% pasien glaukoma baru terdiagnosis stadium lanjut; sebagian besar usia >50 tahun.",
  },
  {
    id: "III",
    place: "Survei Kabupaten X",
    finding: "Kebutaan 3%; penyebab utama katarak belum dioperasi karena fasilitas terbatas.",
  },
  {
    id: "IV",
    place: "SMA Jakarta",
    finding: "Miopia naik 20% \u2192 35% dalam 10 tahun; sebagian besar siswa memakai HP >6 jam/hari.",
  },
  {
    id: "V",
    place: "Pekerja kantoran",
    finding: "30% yang bekerja dengan komputer >8 jam/hari mengalami gejala dry eye.",
  },
];

const QUESTIONS = [
  "Masalah kesehatan apa?",
  "Kelompok mana yang terdampak?",
  "Faktor apa yang diduga berhubungan?",
  "Apakah data cukup untuk menyimpulkan sebab-akibat?",
  "Data tambahan apa yang perlu dikumpulkan?",
  "Program apa yang bisa direncanakan?",
];

/** Five findings, one standard set of questions, one of them highlighted. */
export default function Slide14() {
  return (
    <Sheet n={14} section="Studi kasus">
      <Title>Lima temuan. Satu pertanyaan yang sama.</Title>

      <div style={{ display: "flex", gap: 70, marginTop: 36, flex: 1 }}>
        <div style={{ flex: 1 }}>
          {CASES.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "46px 210px 1fr",
                gap: 18,
                borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                padding: "12px 0",
              }}
            >
              <span style={{ fontFamily: FONT.mono, fontSize: 20, color: C.lime }}>{item.id}</span>
              <span style={{ fontSize: 20, lineHeight: 1.3, color: C.ink, fontWeight: 500 }}>{item.place}</span>
              <span style={{ fontSize: 20, lineHeight: 1.35, color: C.inkSoft }}>{item.finding}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: "0 0 560px" }}>
          <Label color={C.lime}>Enam pertanyaan</Label>
          <div style={{ marginTop: 10 }}>
            {QUESTIONS.map((question, i) => (
              <div
                key={question}
                style={{
                  display: "flex",
                  gap: 14,
                  borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                  padding: "9px 8px",
                  background: i === 3 ? C.limePale : "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 17,
                    color: i === 3 ? C.lime : C.inkGhost,
                    width: 22,
                    flex: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 20, lineHeight: 1.35, color: i === 3 ? C.ink : C.inkSoft }}>{question}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Takeaway>Pertanyaan keempat yang paling sering dilupakan: cukupkah datanya?</Takeaway>
    </Sheet>
  );
}
