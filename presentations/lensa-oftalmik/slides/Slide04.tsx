import { Gem, Layers } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Sheet, Title, inkOn } from "../Frame";

const FAMILIES = [
  {
    key: "mineral",
    label: "Mineral · kaca",
    icon: Gem,
    lead: "Bahan-bahan dipadukan menjadi kaca cair yang homogen, gelembung gas dihilangkan saat pemurnian.",
    points: ["Tahan gores, bilangan Abbe tinggi", "Mudah pecah, tidak dapat dibor", "Crown 2,54 · flint lebih berat lagi"],
  },
  {
    key: "organik",
    label: "Organik · plastik",
    icon: Layers,
    lead: "Polimer organik — molekul besar dan berat. CR-39 berkembang menjadi bahan lensa yang ringan dan tahan pecah.",
    points: ["Ringan, tidak mudah pecah, mudah diwarnai", "Permukaan lunak: wajib hard coat", "CR-39 1,32 · polikarbonat 1,20"],
  },
];

/**
 * The definition sheet: what an ophthalmic lens is, what glass is, and the two
 * families every later slide is about.
 */
export default function Slide04() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={4} part={PART.asal}>
      <Title max={1500}>Satu fungsi, dua keluarga bahan</Title>

      <div style={{ marginTop: 34, display: "flex", gap: 56 }}>
        <div style={{ flex: "none", width: 470 }}>
          <div style={{ borderLeft: `4px solid ${C.amber}`, paddingLeft: 24 }}>
            <p style={{ fontFamily: FONT.text, fontSize: 32, lineHeight: 1.4, color: tone.ink, fontWeight: 500 }}>
              Lensa oftalmik: kacamata yang dirancang dengan bentuk tertentu untuk mengoreksi
              penglihatan dan/atau melindungi mata — termasuk dari sinar matahari.
            </p>
          </div>
          <p style={{ marginTop: 26, fontFamily: FONT.text, fontSize: 26, lineHeight: 1.45, color: tone.soft }}>
            <span style={{ fontWeight: 600, color: tone.ink }}>Kaca</span> adalah material amorf
            padat: terjadi karena pendinginan tanpa proses kristalisasi, campuran anorganik yang
            bekerja pada suhu tinggi.
          </p>
        </div>

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {FAMILIES.map((family) => {
            const Icon = family.icon;
            return (
              <div key={family.key} style={{ borderTop: `3px solid ${tone.ink}`, paddingTop: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon size={26} strokeWidth={1.75} color={tone.amber} />
                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 32,
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      color: tone.ink,
                    }}
                  >
                    {family.label}
                  </span>
                </div>
                <p style={{ marginTop: 12, fontFamily: FONT.text, fontSize: 26, lineHeight: 1.42, color: tone.soft }}>
                  {family.lead}
                </p>
                <div style={{ marginTop: 16 }}>
                  {family.points.map((point) => (
                    <div key={point} style={{ display: "flex", gap: 10, marginTop: 6 }}>
                      <span style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.4, color: tone.amber, flex: "none" }}>
                        ·
                      </span>
                      <span style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.4, color: tone.soft }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          flex: "none",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 40,
          borderTop: `1px solid ${tone.rule}`,
          paddingTop: 20,
        }}
      >
        {[
          ["Lensa mata, bukan lensa kacamata", "Alhazen, 965–1038"],
          ["Kaca cair homogen", "tanpa gelembung, tanpa kristal"],
          ["Polimer", "molekul besar dari unit monomer"],
        ].map(([head, sub]) => (
          <div key={head}>
            <div style={{ fontFamily: FONT.text, fontSize: 24, lineHeight: 1.3, color: tone.ink, fontWeight: 600 }}>
              {head}
            </div>
            <div style={{ marginTop: 6, fontFamily: FONT.mono, fontSize: 19, lineHeight: 1.3, color: tone.faint }}>
              {sub}
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
