import { C, FONT } from "../theme";
import { Label, Sheet, Title, tone } from "../Frame";

const k = tone("pink");

/** The definition, alone on a rose plate. */
export default function Slide03() {
  return (
    <Sheet n={3} section="Sistem Kesehatan Nasional" cite="Perpres 72/2012" tone="pink">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={900} color={C.onPink}>
          Apa itu SKN
        </Title>
        <Label color={C.onPinkFaint}>Definisi resmi</Label>
      </div>

      <div style={{ marginTop: 44, borderTop: "1px solid " + k.rule, paddingTop: 52, maxWidth: 1380 }}>
        <p
          style={{
            fontFamily: FONT.display,
            fontSize: 60,
            lineHeight: 1.26,
            color: C.onPink,
            letterSpacing: "-0.008em",
          }}
        >
          Pengelolaan kesehatan oleh semua komponen bangsa, secara terpadu dan
          saling mendukung, untuk derajat kesehatan setinggi-tingginya.
        </p>
      </div>

      <p style={{ marginTop: "auto", paddingBottom: 10, fontSize: 26, color: C.onPinkFaint, letterSpacing: "0.02em" }}>
        Perpres 72/2012 — semua komponen bangsa, bukan hanya Kementerian Kesehatan.
      </p>
    </Sheet>
  );
}
