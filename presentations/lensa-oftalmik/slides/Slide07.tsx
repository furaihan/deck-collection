import { TriangleAlert, Ruler } from "lucide-react";
import { FONT, PART } from "../theme";
import { DataTable, Sheet, Title, inkOn } from "../Frame";

const DEFECTS = [
  {
    name: "Striae",
    en: "streak / lines",
    what: "Pita, goresan atau garis di dalam bahan. Bahan tidak tercampur sempurna dan merata saat peleburan.",
  },
  {
    name: "Bubbles",
    en: "gelembung",
    what: "Gelembung udara yang gagal mencapai permukaan sebelum kaca mendingin \u2014 lolos dari melting dan fining.",
  },
  {
    name: "Inclusion",
    en: "kerikil & kristalit",
    what: "Partikel material yang tidak tercampur dan kristalit kecil; ditemukan pada kaca finished.",
  },
  {
    name: "Cloudiness",
    en: "kabut",
    what: "Embun atau kabut akibat endapan material koloid selama pendinginan.",
  },
];

/**
 * What goes wrong inside the glass. Four named defects, then the trade the
 * material makes: hard, clear, chemically stable — and brittle.
 */
export default function Slide07() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={7} part={PART.asal}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <TriangleAlert size={28} strokeWidth={1.75} color={tone.clay} style={{ position: "relative", top: 2 }} />
        <Title max={1300}>Empat cacat yang lahir di dalam kaca</Title>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 30, marginTop: 40 }}>
        {DEFECTS.map((defect, i) => (
          <div key={defect.name} style={{ borderTop: `3px solid ${i === 1 ? tone.amber : tone.rule}` , paddingTop: 16 }}>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: tone.ink,
              }}
            >
              {defect.name}
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: FONT.mono,
                fontSize: 18,
                letterSpacing: "0.04em",
                color: tone.faint,
              }}
            >
              {defect.en}
            </div>
            <p style={{ marginTop: 12, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: tone.soft }}>
              {defect.what}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 64, marginTop: 46, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Ruler size={22} strokeWidth={1.75} color={tone.amber} />
            <span
              style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase", color: tone.faint }}
            >
              Cacat dan karakter yang dituntut
            </span>
          </div>

          <div style={{ marginTop: 14 }}>
            <DataTable
              tone={tone}
              size={23}
              headSize={18}
              rowPad={11}
              cols={[
                { key: "a", label: "Karakteristik lensa kaca", width: 1.15 },
                { key: "b", label: "Artinya di meja kerja", width: 1.9 },
              ]}
              rows={[
                [{ text: "Homogen" }, { text: "Komposisi kimia dan keadaan fisik sama di seluruh badan lensa" }],
                [{ text: "Indeks & dispersi tepat" }, { text: "Nilai n dan Abbe sesuai spesifikasi bahan" }],
                [{ text: "Bebas warna" }, { text: "Jernih, mampu mentransmisikan cahaya" }],
                [{ text: "Transparan" }, { text: "Daya tembus cahaya tinggi" }],
                [{ text: "Stabil" }, { text: "Tahan bahan kimia dan tahan goresan", mark: true }],
              ]}
            />
          </div>
        </div>

        <div style={{ flex: "none", width: 560 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              borderTop: `1px solid ${tone.rule}`,
              paddingTop: 18,
            }}
          >
            <div>
              <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.amber }}>
                Kelebihan
              </div>
              <p style={{ marginTop: 10, fontFamily: FONT.text, fontSize: 25, lineHeight: 1.4, color: tone.ink }}>
                Lebih tahan gores. Bilangan Abbe lebih tinggi, jadi dispersi lebih kecil.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.clay }}>
                Kekurangan
              </div>
              <p style={{ marginTop: 10, fontFamily: FONT.text, fontSize: 25, lineHeight: 1.4, color: tone.ink }}>
                Mudah pecah. Tidak dapat dibor. Pewarnaan harus lewat lapisan metal oksida di ruang
                vakum.
              </p>
            </div>
          </div>

          <p
            style={{
              marginTop: 26,
              borderLeft: `4px solid ${tone.clay}`,
              paddingLeft: 20,
              fontFamily: FONT.text,
              fontSize: 26,
              lineHeight: 1.45,
              color: tone.soft,
            }}
          >
            Catatan kuliah: sumber meragukan bahwa kaca tidak dapat diwarnai. File optik menyebut
            kaca bening ditint dengan lapisan metal oksida tipis di ruang vakum — mesin besar dan
            mahal.
          </p>
        </div>
      </div>
    </Sheet>
  );
}
