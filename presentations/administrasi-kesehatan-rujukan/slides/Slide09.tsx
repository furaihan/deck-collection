import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const KARYA = ["Upaya kesehatan", "Tenaga kesehatan", "Obat & makanan", "Gizi & lingkungan", "Manajemen & hukum"];
const KARSA = ["Menolong diri sendiri", "Mutu lingkungan", "Status gizi", "Kurangi kesakitan", "Keluarga sejahtera"];

function Column({ head, note, items, hot }: { head: string; note: string; items: string[]; hot?: boolean }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
        <Label color={hot ? C.pinkDeep : undefined}>{head}</Label>
        <span style={{ fontSize: 20, color: hot ? C.pink : C.inkGhost }}>{note}</span>
      </div>

      <div style={{ marginTop: 12, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {items.map((it, i) => (
          <div
            key={it}
            style={{
              display: "flex",
              gap: 20,
              alignItems: "baseline",
              paddingTop: 22,
              paddingBottom: 22,
              borderTop: "1px solid " + (hot ? C.pinkLine : C.rule),
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 30,
                color: hot ? C.pink : C.inkGhost,
                width: 30,
                flex: "none",
              }}
            >
              {String.fromCharCode(97 + i)}
            </span>
            <span style={{ fontSize: 27, color: C.ink, lineHeight: 1.25 }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two five-line lists, cut to their nouns. */
export default function Slide09() {
  return (
    <Sheet n={9} section="Sistem Kesehatan Nasional" cite="Panca Karya &amp; Karsa">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={960}>Panca Karya, Panca Karsa</Title>
        <p style={{ fontSize: 24, color: C.inkFaint, maxWidth: 440, textAlign: "right", lineHeight: 1.4 }}>
          Satu menanyakan <em>apa</em>, satu menanyakan <em>mengapa</em>.
        </p>
      </div>

      <div style={{ display: "flex", gap: 64, marginTop: 34, flex: 1 }}>
        <Column head="Karya" note="apa yang dikerjakan" items={KARYA} />
        <Column head="Karsa" note="niat di baliknya" items={KARSA} hot />
      </div>
    </Sheet>
  );
}
