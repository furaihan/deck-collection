import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const QUESTIONS = [
  { k: "Siapa", q: "Siapa yang paling banyak terkena miopia?" },
  { k: "Di mana", q: "Di mana katarak paling banyak ditemukan?" },
  { k: "Kapan", q: "Kapan kasus gangguan penglihatan sering muncul?" },
];

const GOALS = [
  "Menurunkan kasus baru gangguan penglihatan.",
  "Mengurangi angka kebutaan yang bisa dicegah.",
  "Meningkatkan kualitas hidup penderita gangguan penglihatan.",
  "Menyediakan data untuk perencanaan tenaga, fasilitas, rujukan, dan edukasi layanan mata.",
];

/** Optometry: three coordinates, four goals. */
export default function Slide12() {
  return (
    <Sheet n={12} section="Optometri">
      <Title>Epidemiologi di ruang periksa mata.</Title>

      <div style={{ display: "flex", gap: 30, marginTop: 40 }}>
        {QUESTIONS.map((item, i) => (
          <div key={item.k} style={{ flex: 1, borderTop: "2px solid " + (i === 0 ? C.lime : C.rule), paddingTop: 16 }}>
            <p
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                letterSpacing: "0.12em",
                color: C.lime,
                textTransform: "uppercase",
              }}
            >
              {item.k}
            </p>
            <p style={{ marginTop: 12, fontFamily: FONT.display, fontSize: 34, lineHeight: 1.12, color: C.ink }}>
              {item.q}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, flex: 1 }}>
        <Label color={C.lime}>Empat tujuan</Label>
        <div style={{ marginTop: 12 }}>
          {GOALS.map((goal, i) => (
            <div
              key={goal}
              style={{
                display: "flex",
                gap: 24,
                alignItems: "baseline",
                borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                padding: "16px 0",
              }}
            >
              <span style={{ fontFamily: FONT.display, fontSize: 34, color: C.lime, width: 46, flex: "none" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: 28, lineHeight: 1.4, color: C.inkSoft }}>{goal}</p>
            </div>
          ))}
        </div>
      </div>

      <Takeaway>Tiga pertanyaan membuka jalan; empat tujuan memberi arah.</Takeaway>
    </Sheet>
  );
}
