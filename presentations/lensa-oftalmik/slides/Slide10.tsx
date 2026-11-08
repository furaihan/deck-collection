import { Sun } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Sheet, Takeaway, Title, inkOn } from "../Frame";
import spectrum from "../assets/em-spectrum.png";

const LINES = [
  { id: "e", value: "546,07", source: "Hg", color: "hijau" },
  { id: "d", value: "587,56", source: "He", color: "kuning" },
  { id: "D", value: "589,3", source: "Na", color: "kuning" },
  { id: "F", value: "486,13", source: "H", color: "biru" },
  { id: "C", value: "656,27", source: "H", color: "merah" },
];

/**
 * Index of refraction is measured at one agreed colour of light, and the two
 * big markets do not agree on which. The spectrum strip states the argument.
 */
export default function Slide10() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={10} part={PART.optik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Sun size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1240}>Satu indeks, dua warna cahaya</Title>
      </div>

      <div style={{ display: "flex", gap: 28, marginTop: 24, alignItems: "center" }}>
        <div style={{ flex: "none", width: 1280 }}>
          <div style={{ width: 1280, height: 190, background: tone.ruleSoft, overflow: "hidden" }}>
            <img
              src={spectrum}
              alt="Spektrum elektromagnetik yang menunjukkan posisi sinar ultraviolet dan cahaya tampak"
              style={{ width: 1280, height: 190, objectFit: "cover", display: "block" }}
            />
          </div>
          <div
            style={{
              marginTop: 6,
              fontFamily: FONT.mono,
              fontSize: 15,
              lineHeight: 1.35,
              color: tone.faint,
            }}
          >
            Spektrum elektromagnetik. Lashb007, Wikimedia Commons, CC BY-SA 4.0.
          </div>
        </div>
        <p style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.4, color: tone.soft, maxWidth: 400 }}>
          Indeks bias diukur pada satu garis spektrum yang disepakati, bukan pada “cahaya putih”.
        </p>
      </div>

      <div style={{ display: "flex", gap: 64, marginTop: 26, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: 18, borderTop: `3px solid ${tone.amber}`, paddingTop: 12 }}
            >
              <span
                style={{ fontFamily: FONT.mono, fontSize: 17, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.amberDeep, width: 130 }}
              >
                Eropa
              </span>
              <span style={{ fontFamily: FONT.text, fontSize: 26, lineHeight: 1.35, color: tone.ink }}>
                e-line merkuri, <span style={{ fontFamily: FONT.mono }}>546,07 nm</span> — garis hijau.
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: 18, borderTop: `1px solid ${tone.rule}`, paddingTop: 12 }}
            >
              <span
                style={{ fontFamily: FONT.mono, fontSize: 17, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.faint, width: 130 }}
              >
                USA
              </span>
              <span style={{ fontFamily: FONT.text, fontSize: 26, lineHeight: 1.35, color: tone.ink }}>
                helium d-line, <span style={{ fontFamily: FONT.mono }}>587,56 nm</span> — garis kuning.
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              background: C.chalkDeep,
              padding: "18px 24px",
            }}
          >
            <span
              style={{ fontFamily: FONT.mono, fontSize: 17, letterSpacing: "0.1em", textTransform: "uppercase", color: tone.faint }}
            >
              CR-39
            </span>
            <span
              style={{ fontFamily: FONT.display, fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: tone.ink }}
            >
              1,502
            </span>
            <span style={{ fontFamily: FONT.mono, fontSize: 19, color: tone.faint }}>Eropa</span>
            <span style={{ fontFamily: FONT.mono, fontSize: 22, color: tone.faint }}>vs</span>
            <span
              style={{ fontFamily: FONT.display, fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: tone.amberDeep }}
            >
              1,498
            </span>
            <span style={{ fontFamily: FONT.mono, fontSize: 19, color: tone.faint }}>USA</span>
          </div>
        </div>

        <div style={{ flex: "none", width: 760 }}>
          <span
            style={{ fontFamily: FONT.mono, fontSize: 17, letterSpacing: "0.14em", textTransform: "uppercase", color: tone.faint }}
          >
            Garis Fraunhofer di sekitar cahaya tampak
          </span>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
            {LINES.map((line, i) => (
              <div
                key={line.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 176px 72px 1fr",
                  gap: 14,
                  alignItems: "baseline",
                  padding: "8px 0",
                  borderTop: i === 0 ? `1px solid ${tone.rule}` : `1px solid ${tone.ruleSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 600, color: tone.ink }}>{line.id}</span>
                <span style={{ fontFamily: FONT.mono, fontSize: 22, color: line.id === "e" ? tone.amberDeep : tone.soft }}>
                  {line.value} nm
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: 20, color: tone.faint }}>{line.source}</span>
                <span style={{ fontFamily: FONT.text, fontSize: 22, color: tone.soft }}>{line.color}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 10, fontFamily: FONT.text, fontSize: 20, lineHeight: 1.4, color: tone.faint }}>
            Tabel spektrum: D. Pye, V. D. Frechette, N. J. Kreidl, Borate Glasses, Plenum, 1977.
          </p>
        </div>
      </div>

      <Takeaway tone={tone}>
        Bandingkan dua angka indeks hanya kalau garis ukurnya sama — 1,498 dan 1,502 adalah bahan
        yang sama.
      </Takeaway>
    </Sheet>
  );
}
