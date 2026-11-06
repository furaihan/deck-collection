import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const GOALS = [
  { no: "01", k: "Ada apa", d: "Mengidentifikasi / menemukan kejadian." },
  { no: "02", k: "Seberapa besar", d: "Mengukur besar kejadian." },
  { no: "03", k: "Kenapa", d: "Menentukan faktor yang mempengaruhi." },
  { no: "04", k: "Prognosis", d: "Memperkirakan prognosis kejadian." },
  { no: "05", k: "Dampak", d: "Menentukan dampak dari kejadian." },
  { no: "06", k: "Intensitas", d: "Mengukur intensitas pengaruh suatu kejadian." },
  { no: "07", k: "Hubungan", d: "Menentukan hubungan proses." },
];

/** Seven specific objectives, plus the five verbs the lecture uses. */
export default function Slide07() {
  return (
    <Sheet n={7} section="Tujuan">
      <Title>Tujuh hal yang ingin diketahui.</Title>
      <p style={{ marginTop: 16, fontSize: 28, color: C.inkSoft, maxWidth: 1200 }}>
        Tujuan umum: menganalisis proses-proses kejadian masalah kesehatan masyarakat.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 80, marginTop: 36, flex: 1 }}>
        {GOALS.map((goal, i) => (
          <div
            key={goal.no}
            style={{
              display: "flex",
              gap: 22,
              alignItems: "baseline",
              borderTop: i < 2 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
              padding: "15px 0",
            }}
          >
            <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkGhost, width: 30 }}>{goal.no}</span>
            <div>
              <p style={{ fontFamily: FONT.display, fontSize: 32, lineHeight: 1.1, color: C.ink }}>{goal.k}</p>
              <p style={{ marginTop: 4, fontSize: 21, lineHeight: 1.35, color: C.inkFaint }}>{goal.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid " + C.rule, paddingTop: 16, marginTop: 16 }}>
        <Label color={C.lime}>Lima kata kerja</Label>
        <p style={{ marginTop: 8, fontFamily: FONT.mono, fontSize: 20, letterSpacing: "0.06em", color: C.inkSoft }}>
          ADA APA &middot; SEBERAPA BESAR &middot; KENAPA &middot; APA DAMPAKNYA &middot; APA YANG HARUS DILAKUKAN
        </p>
      </div>

      <Takeaway>Tujuan adalah ingin tahu; jawabannya baru menjadi tindakan lewat penggunaan.</Takeaway>
    </Sheet>
  );
}
