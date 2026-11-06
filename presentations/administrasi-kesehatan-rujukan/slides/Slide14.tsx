import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const ANGKA = [
  { v: "1,06", u: "juta", label: "orang dengan TBC", hot: false },
  { v: "31", u: "ribu", label: "resistan obat", hot: false },
  { v: "134", u: "ribu", label: "meninggal", hot: true },
  { v: "86", u: "%", label: "sembuh", hot: false },
];

const REGULASI = [
  ["TBC", "Perpres 67/2021"],
  ["Malaria", "RAN 2020–2026"],
  ["Kusta", "PMK 11/2019"],
  ["PTM", "Permenkes 71/2015"],
  ["Jantung", "Kepmenkes 854/2009"],
  ["DBD", "3M & jumantik"],
];

/** Four numbers, four words, six regulations. */
export default function Slide14() {
  return (
    <Sheet n={14} section="Beban penyakit" cite="WHO TB profile 2022">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={900}>Tuberkulosis</Title>
        <p style={{ fontSize: 24, color: C.inkFaint, maxWidth: 500, textAlign: "right", lineHeight: 1.4 }}>
          Indonesia 2022 — populasi 276 juta.
        </p>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 30, flex: 1, paddingBottom: 12 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {ANGKA.map((a, i) => (
            <div
              key={a.label}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 40,
                borderTop: i === 0 ? "2px solid " + C.ink : "1px solid " + C.rule,
              }}
            >
              <span style={{ display: "flex", alignItems: "baseline", gap: 8, width: 340, flex: "none" }}>
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 84,
                    lineHeight: 0.85,
                    color: a.hot ? C.pink : C.ink,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {a.v}
                </span>
                <span style={{ fontSize: 24, fontWeight: 600, color: a.hot ? C.pink : C.inkSoft }}>{a.u}</span>
              </span>
              <span style={{ fontSize: 30, color: C.inkSoft, lineHeight: 1.2 }}>{a.label}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: "none", width: 720, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: "none" }}>
            <Label>Dasar regulasi</Label>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: 12 }}>
            {REGULASI.map(([prog, dasar]) => (
              <div
                key={prog}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  borderTop: "1px solid " + C.rule,
                }}
              >
                <span style={{ fontSize: 28, fontWeight: 600, color: C.ink, width: 150, flex: "none" }}>{prog}</span>
                <span style={{ fontSize: 24, color: C.inkFaint, lineHeight: 1.3 }}>{dasar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  );
}
