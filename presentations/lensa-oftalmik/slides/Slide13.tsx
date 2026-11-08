import { ChevronUp, FlaskConical } from "lucide-react";
import { FONT, PART } from "../theme";
import { Sheet, Takeaway, Title, inkOn } from "../Frame";

const STEPS = [
  { v: "2,54", sg: "kaca crown", note: "Padat, tahan gores, mudah pecah." },
  { v: "1,32", sg: "CR-39", note: "Plastik ringan; permukaan lunak." },
  { v: "1,20", sg: "polikarbonat", note: "Paling ringan dan paling tahan bentur." },
];

/**
 * Specific gravity is measured against water at 4°C, and it decides how the
 * spectacles feel at the end of a shift. Three numbers, three materials.
 */
export default function Slide13() {
  const tone = inkOn("petrol");

  return (
    <Sheet n={13} part={PART.fisik} ground="petrol">
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <FlaskConical size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1380} color={tone.ink}>
          Berat jenis: berapa gram satu sentimeter kubik
        </Title>
      </div>

      <div style={{ display: "flex", gap: 80, marginTop: 46, flex: 1 }}>
        <div style={{ flex: "none", width: 700 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: FONT.mono, fontSize: 42, fontWeight: 500, color: tone.ink }}>SG =</span>
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
              <span style={{ padding: "0 8px 4px" }}>ρ lensa</span>
              <span style={{ borderTop: `2px solid ${tone.ink}`, padding: "4px 8px 0" }}>ρ air 4°C</span>
            </span>
          </div>

          <p style={{ marginTop: 22, fontFamily: FONT.text, fontSize: 27, lineHeight: 1.45, color: tone.soft }}>
            Kepadatan air pada 4°C adalah patokan 1 g/cm³. Berat jenis membandingkan kepadatan bahan
            lensa dengan patokan itu — jadi angkanya tanpa satuan, dan 1 cm³ CR-39 berarti 1,32 gram.
          </p>

          <div style={{ marginTop: 28, borderTop: `1px solid ${tone.rule}`, paddingTop: 18 }}>
            <p style={{ fontFamily: FONT.text, fontSize: 25, lineHeight: 1.45, color: tone.ink }}>
              Berat jenis menunjukkan berat relatif bahan, tetapi tidak langsung menentukan berat
              lensa: indeks yang lebih tinggi membuat lensa lebih tipis, sehingga lensa bisa lebih
              ringan walau bahannya lebih padat.
            </p>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: FONT.mono,
              fontSize: 18,
              letterSpacing: "0.08em",
              color: tone.faint,
            }}
          >
            <FlaskConical size={18} strokeWidth={1.75} color={tone.amber} />
            CONTOH KULIAH: 158,6 lb kaca ÷ 62,5 lb air = 2,54
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
          {STEPS.map((step, i) => (
            <div
              key={step.sg}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: 40,
                alignItems: "center",
                borderTop: `1px solid ${i === 0 ? tone.rule : tone.ruleSoft}`,
                paddingTop: i === 0 ? 20 : 22,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 96,
                    fontWeight: 600,
                    letterSpacing: "-0.045em",
                    lineHeight: 0.85,
                    color: i === 2 ? tone.amber : tone.ink,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {step.v}
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: 20, color: tone.faint }}>g/cm³</span>
              </div>
              <div>
                <div style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 600, color: tone.ink }}>
                  {step.sg}
                </div>
                <p style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: tone.soft }}>
                  {step.note}
                </p>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${tone.rule}`, paddingTop: 18 }}>
            <ChevronUp size={20} strokeWidth={1.75} color={tone.amber} style={{ transform: "rotate(180deg)" }} />
            <span style={{ fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: tone.soft }}>
              1,701 → SG 3,21 · 1,802 → SG 3,65 pada kaca indeks tinggi.
            </span>
          </div>
        </div>
      </div>

      <Takeaway tone={tone}>
        Angka berat jenis dan angka indeks harus dibaca bersama: yang menimpa hidung pemakai adalah
        berat lensa akhir, bukan berat bahannya.
      </Takeaway>
    </Sheet>
  );
}
