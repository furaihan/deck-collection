import { C } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const DASAR = ["Perikemanusiaan", "Kemandirian", "Adil & merata", "Manfaat"];
const ASAS = [
  "Perikemanusiaan",
  "Keseimbangan",
  "Manfaat",
  "Perlindungan",
  "Keadilan",
  "HAM",
  "Sinergis",
  "Legalitas",
  "Antisipatif",
  "Nondiskriminatif",
  "Kearifan lokal",
];

/** 4 against 11, set as tallies rather than sentences. */
export default function Slide06() {
  return (
    <Sheet n={6} section="Sistem Kesehatan Nasional" cite="Asas SKN">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={66} max={900}>Asas SKN</Title>
        <p style={{ fontSize: 24, color: C.inkFaint, maxWidth: 520, textAlign: "right", lineHeight: 1.4 }}>
          Empat dasar pembangunan, sebelas dasar SKN.
        </p>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 42, flex: 1 }}>
        <div style={{ flex: "none", width: 520 }}>
          <Label>Pembangunan — 4</Label>
          <div style={{ marginTop: 16 }}>
            {DASAR.map((d) => (
              <div
                key={d}
                style={{ paddingTop: 26, paddingBottom: 26, borderTop: "1px solid " + C.rule, fontSize: 30, color: C.ink }}
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Label color={C.pinkDeep}>SKN — 11</Label>
          <div
            style={{
              marginTop: 16,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 40,
              rowGap: 0,
              alignContent: "start",
            }}
          >
            {ASAS.map((a, i) => (
              <div
                key={a}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "baseline",
                  paddingTop: 18,
                  paddingBottom: 18,
                  borderTop: "1px solid " + C.rule,
                }}
              >
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: C.pink,
                    width: 26,
                    flex: "none",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 25, color: C.ink, lineHeight: 1.2 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  );
}
