import { Mountain } from "lucide-react";
import { FONT, PART } from "../theme";
import { DataTable, Figure, Sheet, Takeaway, Title, inkOn } from "../Frame";
import tank from "../assets/tank-furnace.png";

const RAW = [
  { name: "Pasir kuarsa", formula: "SiO\u2082", role: "Kerangka lensa kaca silikat; titik lebur di atas 1.700\u00b0C." },
  { name: "Soda", formula: "Na\u2082CO\u2083", role: "Menurunkan titik lebur agar peleburan mungkin." },
  { name: "Lime", formula: "CaO", role: "Kestabilan kimia; tidak mudah meluruh dalam air." },
];

/**
 * Three powders and a fire. The raw-material sheet: what the melt is made of,
 * and the materials that have historically come out of it as lens glass.
 */
export default function Slide05() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={5} part={PART.asal}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Mountain size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1180}>Tiga bubuk, satu tungku</Title>
      </div>

      <div style={{ display: "flex", gap: 56, marginTop: 16, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 26,
              paddingBottom: 14,
              borderBottom: `1px solid ${tone.rule}`,
            }}
          >
            {RAW.map((raw) => (
              <div key={raw.name}>
                <span style={{ fontFamily: FONT.mono, fontSize: 24, fontWeight: 500, color: tone.amberDeep }}>
                  {raw.formula}
                </span>
                <div style={{ marginTop: 4, fontFamily: FONT.display, fontSize: 25, fontWeight: 600, color: tone.ink }}>
                  {raw.name}
                </div>
                <p style={{ marginTop: 5, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.35, color: tone.soft }}>
                  {raw.role}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <DataTable
              tone={tone}
              size={22}
              headSize={17}
              rowPad={8}
              cols={[
                { key: "m", label: "Bahan lensa kaca", width: 1.0 },
                { key: "k", label: "Catatan", width: 2.15 },
              ]}
              rows={[
                [{ text: "Quartz" }, { text: "Birefringent; pertama kali dipakai untuk lensa kacamata" }],
                [{ text: "Crown" }, { text: "Dipilih setelah quartz; paling umum di banyak negara", mark: true }],
                [{ text: "Hi-index kaca" }, { text: "Schott & Abbe; mengatasi aberasi kromatis, lebih tipis" }],
                [{ text: "Perspex (PMMA)" }, { text: "Plastik pertama; low vision dan lensa intra okuler" }],
                [{ text: "CR-39" }, { text: "Didesain khusus oftalmik; PPG Industries, 1940" }],
                [{ text: "Polikarbonat" }, { text: "Daya benturan superior; bukan didesain khusus oftalmik" }],
                [{ text: "Hi-index plastik" }, { text: "Baru dan cepat populer; tipis, kuat, ringan" }],
              ]}
            />
          </div>
        </div>

        <div style={{ flex: "none", width: 430, display: "flex", flexDirection: "column", gap: 22 }}>
          <Figure
            src={tank}
            alt="Diagram tungku kaca tipe tangki regeneratif"
            width={430}
            height={237}
            caption="Tungku tangki regeneratif. Bauer dkk., Wikimedia Commons, CC BY-SA 4.0."
            tone={tone}
          />

          <div style={{ borderTop: `3px solid ${tone.ink}`, paddingTop: 14 }}>
            <span
              style={{ fontFamily: FONT.mono, fontSize: 17, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.faint }}
            >
              Komposisi crown
            </span>
            <div style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.42, color: tone.soft }}>
              Silika 70%; sodium dan calcium oxide 11–13% dan 14–16%; sisanya potassium, borax dan
              lain-lain. Dipakai untuk single vision, bifokal jauh, dan progresif.
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${tone.rule}`, paddingTop: 12 }}>
            <span
              style={{ fontFamily: FONT.mono, fontSize: 17, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.faint }}
            >
              Flint
            </span>
            <div style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.42, color: tone.soft }}>
              Lead oxide 45–65%, silika 25–45%: segmen penglihatan dekat pada bifokal.
            </div>
          </div>
        </div>
      </div>

      <Takeaway tone={tone}>
        Silika untuk kerangka, soda untuk menurunkannya, lime untuk menjaga kestabilannya.
      </Takeaway>
    </Sheet>
  );
}
