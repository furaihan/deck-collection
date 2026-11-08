import { Weight } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Bars, Sheet, Title, inkOn } from "../Frame";

const GLASS = [
  { label: "Crown optical", n: "1.523", abbe: 58.9, sg: 2.54 },
  { label: "Dense flint", n: "1.616", abbe: 38.0, sg: 5.52 },
  { label: "Extra dense flint", n: "1.690", abbe: 30.7, sg: 4.02 },
  { label: "Barium oxide flint", n: "1.70", abbe: 31.0, sg: 2.9 },
];

/**
 * The trade-off sheet: raise the index and the Abbe number falls. Density is
 * drawn as one bar per glass so the weight of extra-dense flint is visible, not
 * just tabulated.
 */
export default function Slide09() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={9} part={PART.optik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Weight size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1400}>Indeks naik, Abbe turun, lensa bertambah berat</Title>
      </div>

      <div style={{ display: "flex", gap: 72, marginTop: 46, flex: 1 }}>
        <div style={{ flex: "none", width: 900 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 0.7fr 0.7fr 0.7fr",
              gap: 20,
              paddingBottom: 12,
              borderBottom: `1px solid ${tone.rule}`,
            }}
          >
            {["Kaca", "Indeks", "Abbe", "SG"].map((head, i) => (
              <span
                key={head}
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 18,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: tone.faint,
                  textAlign: i === 0 ? "left" : "right",
                }}
              >
                {head}
              </span>
            ))}
          </div>

          {GLASS.map((glass, i) => (
            <div
              key={glass.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 0.7fr 0.7fr 0.7fr",
                gap: 20,
                padding: "18px 0",
                alignItems: "baseline",
                borderBottom: i === GLASS.length - 1 ? "none" : `1px solid ${tone.ruleSoft}`,
              }}
            >
              <span style={{ fontFamily: FONT.text, fontSize: 28, fontWeight: 500, color: tone.ink }}>
                {glass.label}
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 27,
                  textAlign: "right",
                  color: i === 2 ? tone.amber : tone.soft,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {glass.n}
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 27,
                  textAlign: "right",
                  color: tone.soft,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {glass.abbe.toFixed(1)}
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 27,
                  textAlign: "right",
                  color: tone.soft,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {glass.sg}
              </span>
            </div>
          ))}

          <p style={{ marginTop: 18, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.4, color: tone.faint }}>
            Angka bertanda tanya pada sumber OCR tidak disalin; nilai di atas yang terbaca jelas.
          </p>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span
            style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase", color: tone.faint }}
          >
            Berat jenis, g/cm³
          </span>
          <div style={{ marginTop: 20 }}>
            <Bars
              tone={tone}
              max={6}
              labelWidth={240}
              valueWidth={80}
              barColor={C.inkSoft}
              rows={GLASS.map((glass) => ({
                label: glass.label,
                value: glass.sg,
                mark: glass.label === "Dense flint",
              }))}
            />
          </div>

          <div
            style={{
              marginTop: 34,
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              borderTop: `1px solid ${tone.rule}`,
              paddingTop: 18,
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 74,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: tone.amber,
              }}
            >
              30%
            </span>
            <span style={{ fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: tone.soft, maxWidth: 360 }}>
              lebih tipis: selisih ketebalan lensa hi-index dibandingkan lensa biasa dengan power dan
              diameter sama.
            </span>
          </div>

          <p style={{ marginTop: 16, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.45, color: tone.ink }}>
            Semakin besar indeks bias, semakin kecil nilai Abbe, dan semakin tinggi aberasi
            kromatisnya.
          </p>
        </div>
      </div>
    </Sheet>
  );
}
