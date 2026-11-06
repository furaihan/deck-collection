import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const STAGES = [
  {
    no: "01",
    stage: "Pengamatan",
    name: "Hipocrates",
    years: "460\u2013377 SM",
    verb: "Melihat",
    body: "Mengamati frekuensi, penyebaran, dan faktor lingkungan. Hubungan penyakit\u2013lingkungan disimpulkan, tetapi belum dapat dibuktikan.",
  },
  {
    no: "02",
    stage: "Perhitungan",
    name: "John Graunt",
    years: "1620\u20131674",
    verb: "Menghitung",
    body: "Mengukur frekuensi dan penyebaran dengan ilmu hitung. Angka kematian bayi lebih tinggi; berbeda antara pria dan wanita.",
  },
  {
    no: "03",
    stage: "Pengkajian",
    name: "William Farr \u00b7 John Snow",
    years: "1839 \u00b7 1849",
    verb: "Mengkaji",
    body: "Farr: data statistik, kematian vs status perkawinan dan sosial-ekonomi. Snow: kolera dan air minum, lewat eksperimen alamiah.",
  },
  {
    no: "04",
    stage: "Uji coba",
    name: "James Lind \u00b7 Edward Jenner",
    years: "1774 \u00b7 1796",
    verb: "Menguji",
    body: "Lind: jeruk untuk kekurangan vitamin C. Jenner: uji vaksin cacar pada manusia.",
  },
];

/** Four stages, one line, left to right. */
export default function Slide04() {
  return (
    <Sheet n={4} section="Sejarah">
      <Title>Empat cara melihat masalah.</Title>
      <p style={{ marginTop: 14, fontSize: 28, color: C.inkFaint }}>Dari mengamati sampai menguji.</p>

      <div style={{ position: "relative", marginTop: 56, flex: 1 }}>
        <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: C.rule }} />
        <div style={{ display: "flex", gap: 36, height: "100%" }}>
          {STAGES.map((s) => (
            <div key={s.no} style={{ flex: 1, position: "relative", paddingTop: 26 }}>
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: -5,
                  left: 0,
                  width: 9,
                  height: 9,
                  background: s.no === "04" ? C.lime : C.inkFaint,
                }}
              />
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <Label color={C.lime}>{s.stage}</Label>
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkGhost }}>{s.no}</span>
              </div>
              <p style={{ marginTop: 14, fontFamily: FONT.display, fontSize: 52, lineHeight: 0.95, color: C.ink }}>
                {s.years}
              </p>
              <p style={{ marginTop: 12, fontSize: 24, lineHeight: 1.2, color: C.ink, fontWeight: 500 }}>{s.name}</p>
              <p style={{ marginTop: 12, minHeight: 124, fontSize: 21, lineHeight: 1.45, color: C.inkFaint }}>{s.body}</p>
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 6, height: 6, background: C.lime, flex: "none" }} aria-hidden />
                <Label color={C.lime}>{s.verb}</Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Takeaway>Setiap tahap menambah satu kemampuan: melihat, menghitung, mengkaji, menguji.</Takeaway>
    </Sheet>
  );
}
