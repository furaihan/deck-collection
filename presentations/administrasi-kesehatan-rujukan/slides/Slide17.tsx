import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const LINGKUP = ["SDM", "Keuangan", "Fasilitas", "Informasi", "Kebijakan", "Pelayanan"];
const SUMBER = ["orang", "uang", "alat", "data"];

/** Six words in cells, four resources beneath. Nothing else. */
export default function Slide17() {
  return (
    <Sheet n={17} section="Administrasi kesehatan" cite="Ruang lingkup">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={900}>Enam ruang lingkup</Title>
        <p style={{ fontSize: 24, color: C.inkFaint, maxWidth: 480, textAlign: "right", lineHeight: 1.4 }}>
          Dari empat sumber daya: orang, uang, alat, data.
        </p>
      </div>

      <div className="grid grid-cols-3" style={{ marginTop: 46, columnGap: 32, rowGap: 32, flex: 1, gridTemplateRows: "1fr 1fr" }}>
        {LINGKUP.map((l, i) => (
          <div
            key={l}
            style={{
              borderTop: "2px solid " + C.ink,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 40,
                color: C.pink,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 40, color: C.ink, lineHeight: 1.1 }}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 34, borderTop: "1px solid " + C.rule, paddingTop: 22, paddingBottom: 16 }}>
        <Label>Sumber daya</Label>
        {SUMBER.map((s) => (
          <span key={s} style={{ fontSize: 30, color: C.inkSoft }}>
            {s}
          </span>
        ))}
      </div>
    </Sheet>
  );
}
