import { Palette } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Sheet, Takeaway, Title, inkOn } from "../Frame";

const OXIDES = [
  { metal: "Cobalt", effect: "Biru", tint: C.tintCobalt },
  { metal: "Chromium oxide", effect: "Hijau", tint: C.tintChrome },
  { metal: "Magnesium", effect: "Violet", tint: C.tintMagnesium },
  { metal: "Uranium oxide", effect: "Kuning", tint: C.tintUranium },
  { metal: "Cerium", effect: "Menyerap radiasi UV", tint: C.chalkDeep },
  { metal: "Iron oxide", effect: "Menyerap infra merah", tint: C.tintIron },
  { metal: "Silver halida", effect: "Fotokromik: gelap saat terang", tint: C.tintSilver },
];

/**
 * Colour is chemistry. The only slide where colour carries data rather than
 * hierarchy, so the tints live in theme.ts beside the two signals.
 */
export default function Slide08() {
  const tone = inkOn("petrol");

  return (
    <Sheet n={8} part={PART.asal} ground="petrol">
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Palette size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1320} color={tone.ink}>
          Warna lensa adalah logam yang ditanam di dalamnya
        </Title>
      </div>

      <div style={{ marginTop: 20, maxWidth: 1280 }}>
        <p style={{ fontFamily: FONT.text, fontSize: 28, lineHeight: 1.45, color: tone.soft }}>
          Penambahan logam membuat kaca menyerap cahaya atau mengambil warna tertentu. Efeknya
          bukan lapisan di permukaan, melainkan bagian dari komposisi bahan.
        </p>
      </div>

      <div
        style={{
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 20,
          flex: 1,
          alignItems: "start",
        }}
      >
        {OXIDES.map((oxide) => (
          <div key={oxide.metal} style={{ borderTop: `1px solid ${tone.rule}`, paddingTop: 16 }}>
            <div
              aria-hidden
              style={{
                width: "100%",
                height: 104,
                background: oxide.tint,
                outline: `1px solid ${tone.ruleSoft}`,
              }}
            />
            <div
              style={{
                marginTop: 14,
                fontFamily: FONT.display,
                fontSize: 25,
                fontWeight: 600,
                lineHeight: 1.2,
                color: tone.ink,
              }}
            >
              {oxide.metal}
            </div>
            <div style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.35, color: tone.soft }}>
              {oxide.effect}
            </div>
          </div>
        ))}
      </div>

      <Takeaway tone={tone}>
        Satu bahan dasar, satu deret oksida logam, tujuh perilaku cahaya yang berbeda.
      </Takeaway>
    </Sheet>
  );
}
