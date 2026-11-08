import { Ruler } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Figure, Sheet, Takeaway, Title, inkOn } from "../Frame";
import frame from "../assets/trial-frame.jpg";

const SCALE = [
  { v: "1", what: "Talc" },
  { v: "4–5", what: "Bahan lensa oftalmik", mark: true },
  { v: "10", what: "Berlian" },
];

const TESTS = [
  { name: "Taber", what: "Roda abrasi ditekan ke permukaan; hasilnya terukur. Awalnya untuk memeriksa cat." },
  { name: "Bayer", what: "Lensa digoyang dalam panci berisi bahan abrasif, dibandingkan dengan kontrol." },
  { name: "Steel wool", what: "Sabut baja bermutu ditekan dengan beban tetap; hasil dibandingkan skala." },
  { name: "Tumble", what: "Lensa dijatuhkan dalam tong berisi campuran abrasif." },
  { name: "Eraser", what: "Penghapus abrasif digosok pada permukaan dengan tekanan tertentu." },
];

/**
 * Scratch resistance is a scale with a name: Mohs, 1 to 10, and ophthalmic lens
 * materials live at 4–5. Five ways to test it, all judged against a control.
 */
export default function Slide16() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={16} part={PART.fisik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Ruler size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1440}>Skala Moh, dan lima cara memaksanya</Title>
      </div>

      <div style={{ display: "flex", gap: 56, marginTop: 22, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-end", borderBottom: `2px solid ${tone.ink}` }}>
            {SCALE.map((step, i) => (
              <div
                key={step.v}
                style={{
                  flex: step.mark ? 2.2 : 1,
                  background: step.mark ? C.chalkDeep : "transparent",
                  borderRight: i < SCALE.length - 1 ? `1px solid ${tone.rule}` : "none",
                  padding: "10px 16px 8px",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: step.mark ? 54 : 34,
                    fontWeight: 600,
                    letterSpacing: "-0.035em",
                    lineHeight: 0.95,
                    color: step.mark ? tone.amberDeep : tone.faint,
                  }}
                >
                  {step.v}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: FONT.mono,
                    fontSize: 16,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: step.mark ? tone.ink : tone.faint,
                  }}
                >
                  {step.what}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: "flex", flexDirection: "column" }}>
            {TESTS.map((test, i) => (
              <div
                key={test.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "164px 1fr",
                  gap: 22,
                  alignItems: "baseline",
                  padding: "8px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${tone.ruleSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, color: tone.ink }}>{test.name}</span>
                <span style={{ fontFamily: FONT.text, fontSize: 21, lineHeight: 1.35, color: tone.soft }}>{test.what}</span>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 10, fontFamily: FONT.text, fontSize: 20, lineHeight: 1.4, color: tone.faint }}>
            Pada semua tes, lensa dibandingkan dengan lensa kontrol dan skala yang sudah dinilai.
          </p>
        </div>

        <div style={{ flex: "none", width: 520, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ borderTop: `3px solid ${C.amber}`, paddingTop: 12 }}>
            <p style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.4, color: tone.ink }}>
              Kebanyakan lensa plastik dilapisi hard coat agar permukaannya lebih tahan daripada bahan
              tanpa lapisan. Pada polikarbonat, lapisan ini dianggap wajib.
            </p>
          </div>

          <Figure
            src={frame}
            alt="Trial lens frame kuningan untuk menguji lensa"
            width={520}
            height={300}
            caption="Trial lens frame. Wellcome Collection, CC BY 4.0."
            tone={tone}
          />

          <p style={{ fontFamily: FONT.text, fontSize: 21, lineHeight: 1.4, color: tone.soft }}>
            Goresan lahir di meja: kacamata diletakkan menghadap ke bawah di permukaan berpasir.
            Instruksi pasien yang tepat mencegahnya.
          </p>
        </div>
      </div>

      <Takeaway tone={tone}>
        Skala Mohs memberi angka; lima tes di atas memberi bukti — keduanya hanya bermakna dibanding
        lensa kontrol.
      </Takeaway>
    </Sheet>
  );
}
