import { Film, Title, Label } from "../Frame";
import { C, FONT, LIT } from "../theme";

const scratchTests = ["Taber", "Bayer", "Steel wool", "Tumble", "Eraser"];

export default function Slide18() {
  return (
    <Film n={18} section="03 · Sifat fisik" accent="Goresan dan kimia" foot="Semua uji gores membandingkan lensa dengan lensa kontrol dan skala yang sudah dinilai.">
      <div style={{ flex: "none" }}>
        <Title size={70} max={1260}>Goresan diukur dengan lima cara yang berbeda</Title>
      </div>

      <div className="flex" style={{ gap: 40, marginTop: 28, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 18 }}>
            <div
              style={{
                width: 268,
                flex: "none",
                background: LIT.plate,
                boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 18px 34px rgba(58,46,28,0.15)",
                padding: "18px 22px",
              }}
            >
              <Label size={15}>Skala Mohs</Label>
              <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 84, lineHeight: 0.86, color: C.amber, marginTop: 4 }}>
                4–5
              </div>
              <div style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 20, lineHeight: 1.38, color: C.inkSoft }}>
                Rentang bahan lensa pada skala 1–10. Talk = 1, berlian = 10.
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <Label size={15}>Lima uji</Label>
              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 460 }}>
                {scratchTests.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 18,
                      letterSpacing: "0.06em",
                      color: C.ink,
                      background: "transparent",
                      border: `1px solid ${C.rule}`,
                      padding: "10px 16px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 16, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.42, color: C.inkSoft, maxWidth: 470 }}>
                Semua uji membandingkan lensa dengan lensa kontrol dan skala yang
                sudah dinilai.
              </div>
            </div>
          </div>

          <div style={{ marginTop: "auto", borderTop: `2.5px solid ${C.ink}`, paddingTop: 14 }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, lineHeight: 1.16, color: C.ink, maxWidth: 760 }}>
              Goresan hampir selalu terjadi saat kacamata diletakkan menghadap ke
              bawah di permukaan berpasir.
            </div>
            <div style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.4, color: C.inkSoft, maxWidth: 720 }}>
              Instruksi pemakaian mencegah lebih banyak kerusakan daripada lapisan mana pun.
            </div>
          </div>
        </div>

        <div
          style={{
            width: 520,
            flex: "none",
            background: LIT.plateInk,
            boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 28px 50px rgba(20,21,24,0.44)",
            padding: "26px 28px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Label size={16} color={C.amber}>Hard coat</Label>
          <div style={{ marginTop: 10, fontFamily: FONT.display, fontWeight: 700, fontSize: 38, lineHeight: 1.1, color: C.paper }}>
            Hampir semua lensa plastik dilapisi.
          </div>
          <div style={{ marginTop: 12, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.45, color: C.onInkStrong }}>
            Lapisan membuat permukaan lebih tahan daripada bahan dasarnya. Pada
            polikarbonat, lapisan itu dianggap wajib.
          </div>
          <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(244,239,230,0.18)" }}>
            <ProseText />
          </div>
        </div>
      </div>
    </Film>
  );
}

function ProseText() {
  return (
    <div style={{ fontFamily: FONT.text, fontSize: 21, lineHeight: 1.45, color: C.onInk }}>
      Daya tahan zat kimia juga diperbaiki oleh lapisan, bukan oleh bahan dasarnya.
      Tesnya mengekspos lensa pada panas dan kelembapan berkepanjangan.
    </div>
  );
}