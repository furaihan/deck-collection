import { Droplets, Thermometer, Package } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Figure, Sheet, Takeaway, Title, inkOn } from "../Frame";
import tools from "../assets/grinding-tools.jpg";

const STEPS = [
  { tag: "Mold filling", what: "Monomer CR-39 dituang ke mold set dengan gasket; cetakan concave menentukan kelengkungan." },
  { tag: "Curing", what: "Mold masuk oven atau tank air dengan suhu terkendali sesuai curing cycle." },
  { tag: "Gel", what: "Cairan menjadi gel, lalu padat. Penyusutan volumetrik sekitar 14%." },
  { tag: "Eksotermis", what: "Panas harus dikendalikan; tahap gel paling kritis. Oksigen menghambat polimerisasi." },
  { tag: "Demolding", what: "Gasket dilepas, lensa diambil dari mold, lalu masuk coating dan inspeksi." },
];

const MIX = [
  { label: "Monomer CR-39", value: "basis" },
  { label: "Inisiator IPP", value: "2,65%" },
  { label: "Additive", value: "anti-yellowing, UV absorber" },
];

/**
 * The one slide with a real process constraint on it: heat and oxygen both
 * attack the cure, so the cycle is long on purpose.
 */
export default function Slide19() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={19} part={PART.plastik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Droplets size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1460}>Menuang, mengeraskan, menyusut 14%</Title>
      </div>

      <div style={{ display: "flex", gap: 52, marginTop: 24, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 22, borderTop: `3px solid ${tone.ink}`, paddingTop: 12 }}>
            {MIX.map((item) => (
              <div key={item.label} style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.text, fontSize: 22, fontWeight: 600, lineHeight: 1.25, color: tone.ink }}>
                  {item.label}
                </div>
                <div style={{ marginTop: 4, fontFamily: FONT.mono, fontSize: 19, lineHeight: 1.3, color: tone.amberDeep }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: "flex", flexDirection: "column" }}>
            {STEPS.map((step, i) => (
              <div
                key={step.tag}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 238px 1fr",
                  gap: 18,
                  alignItems: "baseline",
                  padding: "8px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${tone.ruleSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT.mono, fontSize: 17, color: i === 2 ? tone.amberDeep : tone.faint }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: FONT.display, fontSize: 23, fontWeight: 600, lineHeight: 1.2, color: tone.ink }}>
                  {step.tag}
                </span>
                <span style={{ fontFamily: FONT.text, fontSize: 21, lineHeight: 1.35, color: tone.soft }}>{step.what}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 18 }}>
            <div style={{ flex: 1, borderTop: `1px solid ${tone.rule}`, paddingTop: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Thermometer size={18} strokeWidth={1.75} color={tone.amber} />
                <span style={{ fontFamily: FONT.text, fontSize: 21, fontWeight: 600, color: tone.ink }}>Oven air</span>
              </div>
              <p style={{ marginTop: 5, fontFamily: FONT.text, fontSize: 20, lineHeight: 1.38, color: tone.soft }}>
                Lebih merata dan daya serap panasnya lebih baik dibanding udara.
              </p>
            </div>
            <div style={{ flex: 1, borderTop: `1px solid ${tone.rule}`, paddingTop: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Package size={18} strokeWidth={1.75} color={C.teal} />
                <span style={{ fontFamily: FONT.text, fontSize: 21, fontWeight: 600, color: tone.ink }}>Polikarbonat</span>
              </div>
              <p style={{ marginTop: 5, fontFamily: FONT.text, fontSize: 20, lineHeight: 1.38, color: tone.soft }}>
                Pelet dilelehkan dan diinjeksi pada sekitar +320°C, siklus 90–130 detik.
              </p>
            </div>
          </div>
        </div>

        <div style={{ flex: "none", width: 460, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ background: C.chalkDeep, padding: "18px 22px", borderLeft: `4px solid ${C.clay}` }}>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 80,
                fontWeight: 600,
                letterSpacing: "-0.045em",
                lineHeight: 0.85,
                color: tone.amberDeep,
              }}
            >
              14%
            </div>
            <p style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.4, color: tone.ink }}>
              penyusutan volumetrik: cairan mengembang lebih dulu, lalu menyusut saat mengeras.
            </p>
          </div>

          <Figure
            src={tools}
            alt="Peralatan pengasahan lensa dan produk lensa"
            width={460}
            height={300}
            caption="Peralatan gerinda dan poles. Wellcome Collection, CC BY 4.0."
            tone={tone}
          />
        </div>
      </div>

      <Takeaway tone={tone}>
        Siklus panjang bukan pemborosan: reaksi lambat dan merata satu-satunya cara mengendalikan
        panas dan susut.
      </Takeaway>
    </Sheet>
  );
}
