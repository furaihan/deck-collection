import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const INDIKATOR = [
  { name: "Harapan hidup", base: "74,4", target: "80,0", unit: "tahun" },
  { name: "Kematian ibu", base: "122", target: "16", unit: "per 100.000" },
  { name: "Stunting", base: "18,80", target: "5,0", unit: "%" },
  { name: "Tuberkulosis", base: "272", target: "76", unit: "per 100.000" },
  { name: "Cakupan JKN", base: "98,0", target: "99,5", unit: "%" },
];

const TUJUAN = ["Derajat kesehatan", "Sistem yang kuat", "Akses & kualitas", "Kendali penyakit", "Keadilan & inklusi"];

/** Five numbers that must travel from 2025 to 2045. */
export default function Slide12() {
  return (
    <Sheet n={12} section="Perencanaan" cite="RPJPN 2025–2045">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={900}>Sasaran 2045</Title>
        <Label color={C.pinkDeep}>Transformasi sosial — sehat</Label>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 34, flex: 1, paddingBottom: 16 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {INDIKATOR.map((d, i) => (
            <div
              key={d.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                paddingTop: 22,
                paddingBottom: 22,
                borderTop: i === 0 ? "2px solid " + C.ink : "1px solid " + C.rule,
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 30, color: C.ink, lineHeight: 1.15 }}>{d.name}</p>
                <p style={{ fontSize: 17, color: C.inkGhost, marginTop: 5 }}>{d.unit}</p>
              </div>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 44,
                  color: C.inkGhost,
                  width: 128,
                  flex: "none",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {d.base}
              </span>
              <span style={{ width: 26, color: C.inkGhost, flex: "none", textAlign: "center" }}>&rarr;</span>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 44,
                  color: C.pink,
                  width: 112,
                  flex: "none",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {d.target}
              </span>
            </div>
          ))}
        </div>

        <div style={{ flex: "none", width: 420 }}>
          <Label>Tujuan RPJP-K</Label>
          {TUJUAN.map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "baseline",
                paddingTop: 20,
                paddingBottom: 20,
                borderTop: "1px solid " + C.rule,
              }}
            >
              <span style={{ fontSize: 17, fontWeight: 700, color: C.inkGhost, width: 26, flex: "none" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 24, color: C.inkSoft, lineHeight: 1.3 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
