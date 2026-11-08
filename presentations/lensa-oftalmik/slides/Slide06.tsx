import { ArrowDown, Factory, Flame, Hammer } from "lucide-react";
import { FONT, PART } from "../theme";
import { Figure, Sheet, Takeaway, Title, inkOn } from "../Frame";
import furnace from "../assets/furnace-1580.jpg";
import grinding from "../assets/grinding-19c.jpg";

const BATCH = [
  { k: "Pot", v: "Diameter 36 in, tinggi 32 in; cullet dimasukkan lebih dulu dan meninggalkan glaze." },
  { k: "Pemanasan", v: "800–1.000°C selama 3–5 hari, bahan dimasukkan sampai 1.400°C." },
  { k: "Melting & fining", v: "Buih, batu dan kotoran naik ke permukaan lalu disendoki keluar." },
  { k: "Stirring", v: "Diaduk terus-menerus dengan mesin atau pengaduk tangan panjang." },
  { k: "Tuang & anneal", v: "Pada 1.200°C dituang menjadi lembaran, lalu masuk kotak annealing." },
  { k: "Rough blank", v: "Lembaran dipanaskan ulang dan dicetak; kedua sisi digerinda dan dipoles." },
];

/**
 * The two furnace routes, side by side. Dark sheet: this is the process slide,
 * so the flow has to read as a flow rather than as a list of facts.
 */
export default function Slide06() {
  const tone = inkOn("petrol");

  return (
    <Sheet n={6} part={PART.asal} ground="petrol">
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Factory size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1300} color={tone.ink}>
          Dua jalan dari lelehan ke rough blank
        </Title>
      </div>

      <div style={{ display: "flex", gap: 56, marginTop: 12, flex: 1 }}>
        <div style={{ flex: 1.3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ width: 32, height: 3, background: tone.amber, flex: "none" }} />
            <span
              style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.amber }}
            >
              a. Batch process
            </span>
          </div>

          {BATCH.map((step, i) => (
            <div
              key={step.k}
              style={{
                display: "grid",
                gridTemplateColumns: "182px 1fr",
                gap: 22,
                alignItems: "baseline",
                padding: "9px 0",
                borderTop: `1px solid ${i === 0 ? tone.rule : tone.ruleSoft}`,
              }}
            >
              <span style={{ fontFamily: FONT.display, fontSize: 23, fontWeight: 600, lineHeight: 1.2, color: tone.ink }}>
                {i + 1}. {step.k}
              </span>
              <span style={{ fontFamily: FONT.text, fontSize: 22, lineHeight: 1.35, color: tone.soft }}>{step.v}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ width: 32, height: 3, background: tone.clay, flex: "none" }} />
            <span
              style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.clay }}
            >
              b. Continuous flow
            </span>
          </div>

          <p style={{ fontFamily: FONT.text, fontSize: 25, lineHeight: 1.4, color: tone.ink }}>
            Kaca cair yang sudah selesai melting, fining dan stirring langsung dicetak menjadi rough
            blank.
          </p>
          <p style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.38, color: tone.soft }}>
            Tidak ada tahap menuang lembaran dan tidak ada anneal terpisah sebelum pencetakan.
          </p>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONT.mono,
              fontSize: 16,
              letterSpacing: "0.06em",
              color: tone.faint,
            }}
          >
            <Flame size={16} strokeWidth={1.75} color={tone.clay} />
            MELTING
            <ArrowDown size={14} strokeWidth={1.75} color={tone.faint} />
            FINING
            <ArrowDown size={14} strokeWidth={1.75} color={tone.faint} />
            STIRRING
            <ArrowDown size={14} strokeWidth={1.75} color={tone.faint} />
            PRESS
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 18 }}>
            <Figure
              src={furnace}
              alt="Tungku peleburan kaca dengan pekerja, ukiran 1580"
              width={172}
              height={224}
              caption="Agricola, 1580. CC BY-SA 4.0."
              tone={tone}
            />
            <Figure
              src={grinding}
              alt="Mesin pengasah lensa optik abad ke-19"
              width={212}
              height={224}
              caption="Pengasahan lensa, abad ke-19. Domain publik."
              tone={tone}
            />
          </div>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontFamily: FONT.text,
              fontSize: 21,
              lineHeight: 1.35,
              color: tone.ink,
            }}
          >
            <Hammer size={18} strokeWidth={1.75} color={tone.amber} style={{ flex: "none", marginTop: 4 }} />
            Kedua jalan berakhir sama: rough blank yang digerinda dan dipoles.
          </div>
        </div>
      </div>

      <Takeaway tone={tone}>
        Batch: leleh, tuang menjadi lembaran, annealing, cetak. Continuous flow: leleh lalu cetak —
        lembarannya dihapus dari alur.
      </Takeaway>
    </Sheet>
  );
}
