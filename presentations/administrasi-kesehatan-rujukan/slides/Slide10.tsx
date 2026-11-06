import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const NILAI = [
  { key: "Service", gloss: "tanpa membedakan pasien" },
  { key: "Empathy", gloss: "mendengar, bukan mengukur" },
  { key: "Integrity", gloss: "jujur dalam periksa dan resep" },
  { key: "Collaboration", gloss: "menyerahkan bila di luar batas" },
  { key: "Excellence", gloss: "akurat, dan terus belajar" },
];

/** Five words and a half-line each. The word does the work. */
export default function Slide10() {
  return (
    <Sheet n={10} section="Sistem Kesehatan Nasional" cite="Nilai tenaga kesehatan">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={900}>Lima nilai</Title>
        <Label color={C.pinkDeep}>Berlaku juga di optik</Label>
      </div>

      <div style={{ marginTop: 26, flex: 1, display: "flex", flexDirection: "column", paddingBottom: 12 }}>
        {NILAI.map((n) => (
          <div
            key={n.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 44,
              flex: 1,
              borderTop: "1px solid " + C.rule,
            }}
          >
            <span style={{ fontFamily: FONT.display, fontSize: 56, lineHeight: 0.95, color: C.pink, width: 400, flex: "none" }}>
              {n.key}
            </span>
            <span style={{ fontSize: 31, color: C.inkSoft, lineHeight: 1.25 }}>{n.gloss}</span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
