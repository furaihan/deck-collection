import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const KIRI = {
  name: "Administrasi",
  word: "ad + ministrare",
  rows: ["Kebijakan", "Apa & mengapa", "Konseptual", "Menentukan"],
};

const KANAN = {
  name: "Manajemen",
  word: "pelaksanaan",
  rows: ["Eksekusi", "Bagaimana & siapa", "Operasional", "Menggunakan"],
};

const ROWS = ["Fokus", "Menjawab", "Cakupan", "Peran"];

function Column({ data, hot }: { data: typeof KIRI; hot: boolean }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ borderTop: "3px solid " + (hot ? C.pink : C.ink), paddingTop: 20, flex: "none" }}>
        <span
          style={{
            fontFamily: FONT.display,
            fontSize: 62,
            lineHeight: 1,
            color: hot ? C.pink : C.ink,
            display: "block",
          }}
        >
          {data.name}
        </span>
        <p style={{ fontSize: 22, color: C.inkGhost, marginTop: 12, letterSpacing: "0.02em" }}>{data.word}</p>
      </div>

      <div style={{ marginTop: 30, flex: 1, display: "flex", flexDirection: "column" }}>
        {data.rows.map((r, i) => (
          <div
            key={ROWS[i]}
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              flex: 1,
              borderTop: "1px solid " + C.rule,
            }}
          >
            <span style={{ width: 140, flex: "none", fontSize: 19, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkGhost }}>
              {ROWS[i]}
            </span>
            <span style={{ fontSize: 32, color: C.ink, lineHeight: 1.15 }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two columns of four words. The comparison carries itself. */
export default function Slide18() {
  return (
    <Sheet n={18} section="Administrasi kesehatan" cite="Stivers, 2003">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={1020}>Administrasi bukan manajemen</Title>
        <Label>Dua fungsi, satu organisasi</Label>
      </div>

      <div style={{ display: "flex", gap: 70, marginTop: 40, flex: 1, paddingBottom: 14, alignItems: "stretch" }}>
        <Column data={KIRI} hot={false} />
        <Column data={KANAN} hot />
      </div>
    </Sheet>
  );
}
