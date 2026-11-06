import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const DIMENSIONS = [
  { t: "Fisik", d: "Tidak merasakan sakit." },
  { t: "Mental", d: "Pikiran dan emosi." },
  { t: "Sosial", d: "Kemampuan berhubungan dengan orang lain." },
  { t: "Ekonomi", d: "Mempunyai pekerjaan dan menghasilkan." },
];

const TERMS = [
  {
    t: "Sehat",
    d: "Proses, bukan keadaan. Bukan hanya bebas dari penyakit, kecacatan, dan kelemahan.",
  },
  {
    t: "Penyakit",
    d: "Gangguan fungsi tubuh yang mengurangi kapasitas; keseimbangan tubuh tidak dapat dipertahankan.",
  },
  { t: "Sakit", d: "Keadaan tidak sehat atau normal yang didefinisikan oleh individu itu sendiri." },
];

/** Health is a process; disease and illness are not the same word. */
export default function Slide15() {
  return (
    <Sheet n={15} section="Sehat & sakit">
      <Title>Sehat bukan hanya tidak sakit.</Title>

      <div style={{ display: "flex", gap: 60, marginTop: 26, alignItems: "baseline" }}>
        <p style={{ fontFamily: FONT.display, fontSize: 40, lineHeight: 1.15, color: C.ink, maxWidth: 1100 }}>
          Sehat mencakup fisik, mental, sosial, dan ekonomi.
        </p>
        <p
          style={{
            fontFamily: FONT.mono,
            fontSize: 20,
            letterSpacing: "0.1em",
            color: C.lime,
            textTransform: "uppercase",
            lineHeight: 1.4,
          }}
        >
          Sehat itu proses, bukan keadaan
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop: 34 }}>
        {DIMENSIONS.map((dimension, i) => (
          <div
            key={dimension.t}
            style={{
              borderTop: "1px solid " + C.rule,
              borderLeft: i === 0 ? "none" : "1px solid " + C.ruleSoft,
              padding: "16px 22px 16px 0",
            }}
          >
            <p style={{ fontFamily: FONT.display, fontSize: 30, color: C.ink }}>{dimension.t}</p>
            <p style={{ marginTop: 6, fontSize: 20, lineHeight: 1.4, color: C.inkFaint }}>{dimension.d}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 30, flex: 1 }}>
        {TERMS.map((term, i) => (
          <div key={term.t} style={{ flex: 1, borderTop: "2px solid " + (i === 0 ? C.lime : C.rule), paddingTop: 12 }}>
            <p style={{ fontFamily: FONT.display, fontSize: 32, color: C.ink }}>{term.t}</p>
            <p style={{ marginTop: 8, fontSize: 21, lineHeight: 1.45, color: C.inkSoft }}>{term.d}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, borderTop: "1px solid " + C.rule, paddingTop: 16 }}>
        <Label color={C.inkGhost}>Alur</Label>
        <span style={{ fontSize: 22, color: C.inkSoft }}>Sebab / faktor risiko</span>
        <span style={{ color: C.lime, fontSize: 22 }} aria-hidden>
          &rarr;
        </span>
        <span style={{ fontSize: 22, color: C.ink }}>Penyakit</span>
        <span style={{ color: C.lime, fontSize: 22 }} aria-hidden>
          &rarr;
        </span>
        <span style={{ fontSize: 22, color: C.inkSoft }}>Akibat / sakit</span>
      </div>

      <Takeaway>Sehat adalah proses; penyakit dan sakit adalah dua hal yang berbeda.</Takeaway>
    </Sheet>
  );
}
