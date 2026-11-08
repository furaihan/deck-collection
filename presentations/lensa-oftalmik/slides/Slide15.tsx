import { Flame, Thermometer } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Figure, Sheet, Takeaway, Title, inkOn } from "../Frame";
import yard from "../assets/glass-yard.jpg";

const METHODS = [
  {
    tag: "Chemical tempering",
    sub: "pertukaran ion",
    process: "Lensa direndam dalam garam lithium atau potassium. Ion yang lebih besar masuk dan lapisan permukaan menjadi lebih padat, sehingga lebih tahan benturan.",
    history: "Tegetmeier menganalisis tegangan permukaan (1890). Weber memegang lisensi penguatan kimiawi (1965). Corning Glass Works mengadopsi ion exchange untuk lensa kaca (1971), lalu memperkenalkannya ke komunitas optik.",
    mark: true,
  },
  {
    tag: "Thermal tempering",
    sub: "udara bertekanan tinggi",
    process: "Kaca dipanaskan sampai suhu tertentu, lalu didinginkan cepat dengan udara bertekanan tinggi sehingga permukaan mengeras lebih dulu daripada bagian dalam.",
    history: "Prince Rupert of Bavaria menjatuhkan tetesan kaca ke air dingin (1619–1682). Francis de la Bastie memperoleh lisensi pada 1874, dengan kaca dipanaskan ulang sampai titik leleh lalu direndam ke minyak.",
    mark: false,
  },
];

/**
 * Only glass needs tempering; the two ways of doing it trade equipment for
 * time. The plate is the optical-glass yard that awaits grinding.
 */
export default function Slide15() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={15} part={PART.fisik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Thermometer size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1500}>Dua cara membuat kaca keras</Title>
      </div>

      <div style={{ display: "flex", gap: 56, marginTop: 38, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          {METHODS.map((method) => (
            <div key={method.tag} style={{ borderTop: `3px solid ${method.mark ? C.amber : C.clay}`, paddingTop: 16 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <Flame size={22} strokeWidth={1.75} color={method.mark ? tone.amber : tone.clay} style={{ flex: "none" }} />
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 33,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: tone.ink,
                  }}
                >
                  {method.tag}
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.06em", color: tone.faint }}>
                  {method.sub}
                </span>
              </div>

              <p style={{ marginTop: 10, fontFamily: FONT.text, fontSize: 25, lineHeight: 1.42, color: tone.ink, maxWidth: 1020 }}>
                {method.process}
              </p>
              <p style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.42, color: tone.faint, maxWidth: 1020 }}>
                {method.history}
              </p>
            </div>
          ))}

          <div style={{ display: "flex", gap: 36, borderTop: `1px solid ${tone.rule}`, paddingTop: 16 }}>
            <p style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.4, color: tone.soft, flex: 1 }}>
              <span style={{ fontWeight: 600, color: tone.ink }}>CR-39:</span> tahan benturan datang
              dari bahannya sendiri; studi perbandingan menempatkannya di atas kaca yang diperkeras
              thermal maupun kimiawi.
            </p>
            <p style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.4, color: tone.soft, flex: 1 }}>
              <span style={{ fontWeight: 600, color: tone.ink }}>Polikarbonat:</span> satu studi
              menyebut 21 kali lebih kuat daripada crown atau CR-39.
            </p>
          </div>
        </div>

        <div style={{ flex: "none", display: "flex", alignItems: "flex-start", paddingTop: 4 }}>
          <Figure
            src={yard}
            alt="Hamparan kaca optik yang menunggu proses gerinda dan poles"
            width={520}
            height={350}
            caption="Glaze yard: kaca optik disimpan dalam rangka sebelum digerinda. NARA, domain publik."
            tone={tone}
          />
        </div>
      </div>

      <Takeaway tone={tone}>
        Kaca yang diperkeras lulus tes FDA; kaca yang tidak dilapisi tidak.
      </Takeaway>
    </Sheet>
  );
}
