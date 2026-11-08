import { ShieldCheck } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Sheet, Takeaway, Title, inkOn } from "../Frame";

const MATERIALS = [
  { label: "Polikarbonat", v: 244, note: "tanpa lapisan", mark: true },
  { label: "Polikarbonat", v: 153, note: "dengan lapisan" },
  { label: "CR-39", v: 49, note: "tanpa lapisan" },
  { label: "Kaca diperkeras", v: 18, note: "tempering" },
  { label: "Kaca crown", v: 12, note: "tanpa perlakuan" },
];

const SPEEDS = [
  { label: "Badminton (kok)", v: 60 },
  { label: "Squash", v: 70 },
  { label: "Bola tenis", v: 50 },
  { label: "Bola cricket", v: 42 },
];

/**
 * One test decides this slide: the FDA drop-ball. The bars are the speed at
 * which each material fails, so the reader can see policy as physics.
 */
export default function Slide14() {
  const tone = inkOn("chalk");
  const max = 250;

  return (
    <Sheet n={14} part={PART.fisik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <ShieldCheck size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1440}>Bola baja 5/8 inci, jatuh dari 50 inci</Title>
      </div>

      <div style={{ display: "flex", gap: 72, marginTop: 40, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <div
              style={{
                flex: 1,
                borderTop: `3px solid ${C.amber}`,
                paddingTop: 14,
              }}
            >
              <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.amberDeep }}>
                Tes FDA
              </div>
              <p style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 25, lineHeight: 1.42, color: tone.ink }}>
                Peluru baja 5/8 inci dijatuhkan dari ketinggian 50 inci pada permukaan lensa. Lensa
                lulus bila tidak pecah atau retak.
              </p>
            </div>
            <div
              style={{
                flex: "none",
                width: 300,
                borderTop: `3px solid ${C.teal}`,
                paddingTop: 14,
              }}
            >
              <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.faint }}>
                Sejak awal 1972
              </div>
              <p style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 25, lineHeight: 1.42, color: tone.ink }}>
                Setiap lensa diwajibkan lulus tes benturan. Sebelum 1971 pertimbangan diserahkan ke
                praktisi.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 34 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span
                style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase", color: tone.faint }}
              >
                Kecepatan saat lensa rusak (m/s)
              </span>
              <span style={{ fontFamily: FONT.mono, fontSize: 18, color: tone.faint }}>skala 0–250</span>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
              {MATERIALS.map((material) => (
                <div key={material.label + material.note} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span
                    style={{
                      width: 420,
                      flex: "none",
                      fontFamily: FONT.text,
                      fontSize: 25,
                      lineHeight: 1.2,
                      color: material.mark ? tone.ink : tone.soft,
                      fontWeight: material.mark ? 600 : 400,
                    }}
                  >
                    {material.label}
                    <span style={{ fontFamily: FONT.mono, fontSize: 18, color: tone.faint }}> · {material.note}</span>
                  </span>
                  <div style={{ flex: 1, height: 22, background: tone.ruleSoft, position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${(material.v / max) * 100}%`,
                        background: material.mark ? tone.amber : C.inkSoft,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      width: 80,
                      flex: "none",
                      textAlign: "right",
                      fontFamily: FONT.mono,
                      fontSize: 24,
                      fontVariantNumeric: "tabular-nums",
                      color: material.mark ? tone.amber : tone.soft,
                    }}
                  >
                    {material.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: "none", width: 560 }}>
          <span
            style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase", color: tone.faint }}
          >
            Kecepatan bola sungguhan
          </span>
          <div style={{ marginTop: 14, borderTop: `1px solid ${tone.rule}` }}>
            {SPEEDS.map((speed) => (
              <div
                key={speed.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "12px 0",
                  borderBottom: `1px solid ${tone.ruleSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT.text, fontSize: 24, color: tone.soft }}>{speed.label}</span>
                <span style={{ fontFamily: FONT.mono, fontSize: 24, color: tone.ink }}>{speed.v} m/s</span>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 22,
              fontFamily: FONT.text,
              fontSize: 24,
              lineHeight: 1.45,
              color: tone.ink,
              borderLeft: `4px solid ${C.clay}`,
              paddingLeft: 18,
            }}
          >
            Urutan dari terkuat: polikarbonat › high-index plastik › CR-39 › kaca diperkeras › kaca
            crown biasa.
          </p>
          <p style={{ marginTop: 14, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.4, color: tone.faint }}>
            Nilai dapat berbeda menurut metode uji, desain lensa dan coating.
          </p>
        </div>
      </div>

      <Takeaway tone={tone}>
        Pertimbangan utama bila ada bahaya fisik pada mata: anak-anak, pekerja pabrik dan perkebunan,
        olahragawan.
      </Takeaway>
    </Sheet>
  );
}
