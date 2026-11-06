import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const GLOBAL = [
  { v: "39,9", u: "juta", l: "hidup dengan HIV", hot: false },
  { v: "1,3", u: "juta", l: "infeksi baru", hot: true },
  { v: "630", u: "ribu", l: "meninggal", hot: false },
];

const KELOMPOK = [
  ["Dewasa", "38,6", "1,2", "560"],
  ["Perempuan", "20,5", "520", "240"],
  ["Laki-laki", "18,1", "660", "320"],
  ["Anak <15", "1,4", "120", "76"],
];

/** Three numbers and a four-row table, in thousands. */
export default function Slide15() {
  return (
    <Sheet n={15} section="Beban penyakit" cite="UNAIDS/WHO 2023">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={900}>HIV</Title>
        <Label>Estimasi global 2023</Label>
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 28 }}>
        {GLOBAL.map((g) => (
          <div key={g.l} style={{ flex: 1, borderTop: "2px solid " + (g.hot ? C.pink : C.ink), paddingTop: 16 }}>
            <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 82,
                  lineHeight: 0.85,
                  color: g.hot ? C.pink : C.ink,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {g.v}
              </span>
              <span style={{ fontSize: 24, fontWeight: 600, color: g.hot ? C.pink : C.inkSoft }}>{g.u}</span>
            </span>
            <p style={{ fontSize: 24, color: C.inkSoft, marginTop: 16 }}>{g.l}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 66, flex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
            columnGap: 24,
            paddingBottom: 12,
            borderBottom: "1px solid " + C.rule,
          }}
        >
          <Label size={17}>Kelompok</Label>
          <Label size={17}>Hidup dengan</Label>
          <Label size={17}>Infeksi baru</Label>
          <Label size={17}>Meninggal</Label>
        </div>
        {KELOMPOK.map((row) => (
          <div
            key={row[0]}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
              columnGap: 24,
              alignItems: "baseline",
              paddingTop: 26,
              paddingBottom: 26,
              borderBottom: "1px solid " + C.ruleHair,
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 600, color: C.ink }}>{row[0]}</span>
            <span style={{ fontFamily: FONT.display, fontSize: 32, color: C.inkSoft, fontVariantNumeric: "tabular-nums" }}>{row[1]}</span>
            <span style={{ fontFamily: FONT.display, fontSize: 32, color: C.inkSoft, fontVariantNumeric: "tabular-nums" }}>{row[2]}</span>
            <span style={{ fontFamily: FONT.display, fontSize: 32, color: C.inkSoft, fontVariantNumeric: "tabular-nums" }}>{row[3]}</span>
          </div>
        ))}
        <p style={{ fontSize: 17, color: C.inkGhost, marginTop: 18 }}>Ribuan orang. Rentang ketidakpastian pada tabel UNAIDS 2023.</p>
      </div>
    </Sheet>
  );
}
