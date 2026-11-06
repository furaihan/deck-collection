import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const COVER = [
  { t: "Penyakit infeksi", d: "Infeksi dan wabah." },
  { t: "Penyakit tidak menular", d: "Kanker, malnutrisi, kecelakaan lalu lintas dan kerja, sakit jiwa." },
  { t: "Pelayanan kesehatan", d: "Di negara maju, kegiatan pelayanan kesehatan ikut dicakup." },
];

/** The boundary: every disease, but the unit is the group. */
export default function Slide05() {
  return (
    <Sheet n={5} section="Batasan">
      <Title>Semua penyakit. Satu fokus: populasi.</Title>

      <div style={{ display: "flex", gap: 90, marginTop: 50, flex: 1 }}>
        <div style={{ flex: "0 0 620px" }}>
          <Label color={C.lime}>Mencakup</Label>
          {COVER.map((item, i) => (
            <div
              key={item.t}
              style={{
                borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                padding: "20px 0",
              }}
            >
              <p style={{ fontFamily: FONT.display, fontSize: 32, color: C.ink, lineHeight: 1.1 }}>{item.t}</p>
              <p style={{ marginTop: 8, fontSize: 22, lineHeight: 1.45, color: C.inkFaint }}>{item.d}</p>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <Label color={C.lime}>Perbandingan</Label>
          <div style={{ marginTop: 16, borderTop: "1px solid " + C.rule }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr 1fr",
                gap: 24,
                padding: "16px 0",
                borderBottom: "1px solid " + C.rule,
              }}
            >
              <span />
              <Label color={C.inkFaint}>Kedokteran klinik</Label>
              <Label color={C.lime}>Epidemiologi</Label>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr 1fr",
                gap: 24,
                padding: "24px 0",
                borderBottom: "1px solid " + C.ruleSoft,
              }}
            >
              <Label color={C.inkGhost}>Orientasi</Label>
              <p style={{ fontSize: 24, lineHeight: 1.4, color: C.inkSoft }}>Gambaran penyakit individu</p>
              <p style={{ fontSize: 24, lineHeight: 1.4, color: C.ink }}>Distribusi penyakit pada populasi / kelompok</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr 1fr",
                gap: 24,
                padding: "24px 0",
                borderBottom: "1px solid " + C.ruleSoft,
              }}
            >
              <Label color={C.inkGhost}>Fokus</Label>
              <p style={{ fontSize: 24, lineHeight: 1.4, color: C.inkSoft }}>Individu</p>
              <p style={{ fontSize: 24, lineHeight: 1.4, color: C.ink }}>Populasi / kelompok</p>
            </div>
          </div>
        </div>
      </div>

      <Takeaway>Klinik melihat individu; epidemiologi membaca pola pada kelompok.</Takeaway>
    </Sheet>
  );
}
