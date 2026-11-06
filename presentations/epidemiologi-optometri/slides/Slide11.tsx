import { C, FONT } from "../theme";
import { Sheet, Takeaway, Title } from "../Frame";

const FIELDS = [
  { no: "01", t: "Penyakit menular", d: "Infeksi dan wabah." },
  { no: "02", t: "Penyakit tidak menular", d: "Kanker, malnutrisi, kecelakaan." },
  { no: "03", t: "Epidemiologi klinik", d: "Aplikasi di layanan klinik." },
  { no: "04", t: "Kependudukan", d: "Demografi, KB, kebijakan." },
  { no: "05", t: "Lingkungan & kesehatan kerja", d: "Paparan di lingkungan dan tempat kerja." },
  { no: "06", t: "Pengelolaan pelayanan kesehatan", d: "Perencanaan dan penilaian." },
  { no: "07", t: "Kesehatan jiwa", d: "Gangguan jiwa di populasi." },
  { no: "08", t: "Gizi", d: "Masalah gizi masyarakat." },
];

/** Eight fields, a 4x2 field grid. */
export default function Slide11() {
  return (
    <Sheet n={11} section="Ruang lingkup">
      <Title>Delapan bidang, satu cara kerja.</Title>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "1fr 1fr",
          marginTop: 44,
          flex: 1,
        }}
      >
        {FIELDS.map((field, i) => (
          <div
            key={field.no}
            style={{
              borderTop: "1px solid " + C.rule,
              borderLeft: i % 4 === 0 ? "none" : "1px solid " + C.ruleSoft,
              padding: "24px 26px 24px 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.lime }}>{field.no}</span>
            <p style={{ marginTop: 16, fontFamily: FONT.display, fontSize: 32, lineHeight: 1.08, color: C.ink }}>
              {field.t}
            </p>
            <p style={{ marginTop: 10, fontSize: 21, lineHeight: 1.4, color: C.inkFaint }}>{field.d}</p>
          </div>
        ))}
      </div>

      <Takeaway>Bidangnya luas karena masalah kesehatan juga luas.</Takeaway>
    </Sheet>
  );
}
