import { Sun, Sparkles, Eye, EyeOff } from "lucide-react";
import { FONT, PART } from "../theme";
import { Sheet, Takeaway, Title, inkOn } from "../Frame";
import convex from "../assets/convex-lens.jpg";

const REFLECT = [
  { material: "CR-39", n: "1,498", r: "3,97" },
  { material: "Kaca hi-index", n: "1,806", r: "8,25" },
];

/**
 * Two optical losses: light that reflects off the surface instead of passing
 * through, and ultraviolet that passes through when it should not.
 */
export default function Slide17() {
  const tone = inkOn("petrol");

  return (
    <Sheet n={17} part={PART.fisik} ground="petrol">
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Sparkles size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1440} color={tone.ink}>
          Cahaya yang hilang ke dua arah
        </Title>
      </div>

      <div style={{ display: "flex", gap: 68, marginTop: 10, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <EyeOff size={22} strokeWidth={1.75} color={tone.clay} />
            <span
              style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.clay }}
            >
              Transparansi &amp; pantulan Fresnel
            </span>
          </div>

          <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ fontFamily: FONT.mono, fontSize: 34, color: tone.ink }}>r =</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: FONT.mono,
                fontSize: 28,
                color: tone.ink,
              }}
            >
              <span>[ (n − 1) ÷ (n + 1) ]²</span>
            </span>
          </div>

          <div style={{ marginTop: 18, borderTop: `1px solid ${tone.rule}` }}>
            {REFLECT.map((row, i) => (
              <div
                key={row.material}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.35fr 0.8fr 1fr",
                  gap: 20,
                  alignItems: "baseline",
                  padding: "14px 0",
                  borderBottom: i === REFLECT.length - 1 ? "none" : `1px solid ${tone.ruleSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT.text, fontSize: 26, fontWeight: 500, color: tone.ink }}>
                  {row.material}
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: 24, color: tone.faint }}>n = {row.n}</span>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 30,
                    textAlign: "right",
                    color: i === 1 ? tone.amber : tone.ink,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {row.r}%
                </span>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 12, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.4, color: tone.faint }}>
            Nilai per permukaan; lensa memiliki dua permukaan.
          </p>

          <div style={{ marginTop: 22, display: "flex", gap: 20 }}>
            {[
              ["Bayangan hantu", "penglihatan berbayang berkurang"],
              ["Tampilan kaca", "lensa tidak lagi memantulkan ruangan"],
              ["Transmisi", "cahaya tampak yang sampai ke mata bertambah"],
            ].map(([head, sub]) => (
              <div key={head} style={{ flex: 1, borderTop: `1px solid ${tone.ruleSoft}`, paddingTop: 10 }}>
                <div style={{ fontFamily: FONT.text, fontSize: 22, fontWeight: 600, lineHeight: 1.25, color: tone.ink }}>
                  {head}
                </div>
                <div style={{ marginTop: 4, fontFamily: FONT.text, fontSize: 19, lineHeight: 1.35, color: tone.soft }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 16, fontFamily: FONT.text, fontSize: 23, lineHeight: 1.4, color: tone.ink }}>
            Antipantulan multicoat menjadi syarat pada lensa indeks tinggi, dan penting pada lensa
            baru yang lebih datar.
          </p>
        </div>

        <div style={{ flex: "none", width: 640, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <Sun size={22} strokeWidth={1.75} color={tone.amber} />
            <span
              style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.amber }}
            >
              Penyerapan ultraviolet
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 104,
                fontWeight: 600,
                letterSpacing: "-0.045em",
                lineHeight: 0.85,
                color: tone.amber,
              }}
            >
              ~100%
            </span>
            <span style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.35, color: tone.soft, maxWidth: 220 }}>
              UV diserap polikarbonat, sampai sekitar 380–390 nm.
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", borderTop: `1px solid ${tone.rule}` }}>
            {[
              ["Kaca", "menyerap baik; kaca bening tidak dapat menyerap UVA"],
              ["CR-39 tanpa lapisan", "sekitar 90% UVA"],
              ["Polikarbonat", "hampir 100%"],
            ].map(([head, sub], i) => (
              <div
                key={head}
                style={{
                  display: "grid",
                  gridTemplateColumns: "230px 1fr",
                  gap: 20,
                  alignItems: "baseline",
                  padding: "11px 0",
                  borderBottom: i === 2 ? "none" : `1px solid ${tone.ruleSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT.text, fontSize: 23, fontWeight: 600, color: tone.ink }}>{head}</span>
                <span style={{ fontFamily: FONT.text, fontSize: 22, lineHeight: 1.35, color: tone.soft }}>{sub}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ flex: "none", width: 250 }}>
              <img
                src={convex}
                alt="Lensa cembung membentuk bayangan terbalik"
                style={{ width: 250, height: 140, objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  marginTop: 6,
                  fontFamily: FONT.mono,
                  fontSize: 15,
                  lineHeight: 1.35,
                  color: tone.faint,
                }}
              >
                Foto: AntanO · CC BY-SA 4.0
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Eye size={20} strokeWidth={1.75} color={tone.amber} />
                <span style={{ fontFamily: FONT.text, fontSize: 22, fontWeight: 600, color: tone.ink }}>
                  Pterigia dan katarak
                </span>
              </div>
              <p style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 20, lineHeight: 1.38, color: tone.soft }}>
                Dua kondisi mata yang dibantu dicegah oleh penyerapan UV yang baik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Takeaway tone={tone}>
        Pantulan mengorbankan ketajaman, UV mengorbankan kesehatan mata. Keduanya diselesaikan di
        lapisan, bukan di bahan.
      </Takeaway>
    </Sheet>
  );
}
