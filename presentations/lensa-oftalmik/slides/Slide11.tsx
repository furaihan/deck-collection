import { Rainbow } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Bars, Sheet, Takeaway, Title, inkOn } from "../Frame";

const MATERIALS = [
  { label: "Crown glass", value: 58.9 },
  { label: "CR-39", value: 58.0 },
  { label: "High-index glass 1.701", value: 42.0 },
  { label: "Mid-index plastik", value: 37.0 },
  { label: "High-index plastik", value: 36.0 },
  { label: "High-index glass 1.802", value: 35.0 },
  { label: "Polikarbonat", value: 30.0 },
];

/**
 * The Abbe number is the one calculation in the deck worth setting in full: the
 * formula, one worked example, and the 50-line that separates crown from flint.
 */
export default function Slide11() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={11} part={PART.optik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Rainbow size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1300}>Nomor Abbe: berapa lebar pelangi yang dibiarkan</Title>
      </div>

      <div style={{ display: "flex", gap: 76, marginTop: 40, flex: 1 }}>
        <div style={{ flex: "none", width: 800 }}>
          <p style={{ fontFamily: FONT.text, fontSize: 27, lineHeight: 1.45, color: tone.soft, maxWidth: 760 }}>
            Ukuran dispersi bahan lensa — kemampuannya “memegang” spektrum warna menjadi satu.
            Nilainya berbanding terbalik dengan kekuatan dispersi.
          </p>

          <div style={{ marginTop: 24, background: C.chalkDeep, padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 38, fontWeight: 500, color: tone.ink }}>V =</span>
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontFamily: FONT.mono,
                  fontSize: 30,
                  color: tone.ink,
                  lineHeight: 1.25,
                }}
              >
                <span style={{ padding: "0 10px 4px" }}>n_d − 1</span>
                <span style={{ borderTop: `2px solid ${tone.ink}`, padding: "4px 10px 0" }}>n_F − n_C</span>
              </span>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 30, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.4, color: tone.soft }}>
              <span>
                <span style={{ fontFamily: FONT.mono }}>n_d</span> 587,56 nm
              </span>
              <span>
                <span style={{ fontFamily: FONT.mono }}>n_F</span> 486,31 nm
              </span>
              <span>
                <span style={{ fontFamily: FONT.mono }}>n_C</span> 656,28 nm
              </span>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <span
              style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase", color: tone.faint }}
            >
              Contoh: kaca flint
            </span>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "baseline",
                gap: 18,
                flexWrap: "wrap",
                fontFamily: FONT.mono,
                fontSize: 26,
                color: tone.soft,
              }}
            >
              <span>(1,6225 − 1) ÷ (1,6349 − 1,6176)</span>
            </div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 18 }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 26, color: tone.soft }}>= 0,6225 ÷ 0,0173 =</span>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 64,
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  color: tone.amberDeep,
                }}
              >
                35,98
              </span>
            </div>
            <p style={{ marginTop: 14, fontFamily: FONT.text, fontSize: 25, lineHeight: 1.4, color: tone.ink }}>
              Flint: <span style={{ fontFamily: FONT.mono }}>V &lt; 50</span> · Crown:{" "}
              <span style={{ fontFamily: FONT.mono }}>V &gt; 50</span>. Nilai di atas 85 hanya pada
              fluor-crown.
            </p>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span
              style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase", color: tone.faint }}
            >
              Nomor Abbe per bahan
            </span>
            <span style={{ fontFamily: FONT.mono, fontSize: 18, color: tone.faint }}>crown &gt; 50</span>
          </div>

          <div style={{ marginTop: 18 }}>
            <Bars
              tone={tone}
              max={60}
              labelWidth={330}
              valueWidth={70}
              rows={MATERIALS.map((m) => ({
                label: m.label,
                value: m.value,
                mark: m.label === "Polikarbonat",
              }))}
            />
          </div>

          <p
            style={{
              marginTop: 22,
              borderTop: `1px solid ${tone.rule}`,
              paddingTop: 16,
              fontFamily: FONT.text,
              fontSize: 23,
              lineHeight: 1.42,
              color: tone.soft,
            }}
          >
            Polikarbonat berada di ujung rendahan: ketajaman di pinggir lensa adalah harga dari
            ketebalan yang rendah.
          </p>
        </div>
      </div>

      <Takeaway tone={tone}>
        Abbe tinggi berarti dispersi rendah — warna-warna tetap bertemu di satu titik.
      </Takeaway>
    </Sheet>
  );
}
