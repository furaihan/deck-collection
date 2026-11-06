import { C } from "../theme";
import { Label, Sheet, Title } from "../Frame";

/** The seven subsystems. The five a school eye exam actually touches are lit. */
const SUB = [
  { no: "01", name: "Upaya kesehatan", hit: false },
  { no: "02", name: "Litbang", hit: false },
  { no: "03", name: "Pembiayaan", hit: true },
  { no: "04", name: "SDM kesehatan", hit: true },
  { no: "05", name: "Farmasi & alkes", hit: true },
  { no: "06", name: "Manajemen & informasi", hit: true },
  { no: "07", name: "Pemberdayaan", hit: true },
];

export default function Slide04() {
  return (
    <Sheet n={4} section="Sistem Kesehatan Nasional" cite="7 subsistem">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={66} max={1000}>Tujuh subsistem</Title>
        <p style={{ fontSize: 24, color: C.inkFaint, maxWidth: 560, textAlign: "right", lineHeight: 1.4 }}>
          <span style={{ color: C.pink, fontWeight: 700 }}>Lima di antaranya</span> ikut bekerja saat
          mata anak diperiksa di sekolah.
        </p>
      </div>

      <div style={{ marginTop: 36, display: "flex", gap: 14, flex: 1 }}>
        {SUB.map((s) => (
          <div
            key={s.no}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "26px 22px 24px",
              background: s.hit ? C.pink : "transparent",
              border: "1px solid " + (s.hit ? C.pink : C.rule),
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: s.hit ? C.onPinkFaint : C.inkGhost,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.no}
            </span>
            <span
              style={{
                fontSize: 27,
                lineHeight: 1.2,
                color: s.hit ? C.onPink : C.inkGhost,
                fontWeight: s.hit ? 600 : 400,
              }}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 34, display: "flex", gap: 20, alignItems: "center", paddingBottom: 10 }}>
        <Label color={C.pinkDeep}>Kasus</Label>
        <p style={{ fontSize: 26, color: C.inkSoft }}>
          Satu skrining mata sekolah — tenaga, alat, biaya, catatan, aturan, dan orang tua.
        </p>
      </div>
    </Sheet>
  );
}
