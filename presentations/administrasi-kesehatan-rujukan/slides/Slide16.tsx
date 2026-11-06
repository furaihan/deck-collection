import { C } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const PERAN = ["Aktor pelaksana", "Mitra pemerintah", "Pengawas sosial", "Penilai target"];

/** Four facts down to a phrase each, then the deck's own question. */
export default function Slide16() {
  return (
    <Sheet n={16} section="Kondisi kesehatan" cite="Peta Bappenas 2023">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={1000}>Empat keadaan</Title>
        <Label color={C.pinkDeep}>Peta Bappenas 2023</Label>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 40, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 12 }}>
          {[
            ["Menular", "TBC & HIV masih tinggi"],
            ["Tidak menular", "Stroke memimpin"],
            ["Geografi", "Akses tidak merata"],
            ["Biaya", "JKN menanggung"],
          ].map(([k, v], i) => (
            <div
              key={k}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 30,
                paddingTop: 22,
                paddingBottom: 22,
                borderTop: i === 0 ? "2px solid " + C.ink : "1px solid " + C.rule,
              }}
            >
              <span style={{ fontSize: 19, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkGhost, width: 210, flex: "none" }}>
                {k}
              </span>
              <span style={{ fontSize: 34, color: C.ink, lineHeight: 1.15 }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: "none", width: 560, background: C.pinkPale, border: "1px solid " + C.pinkLine, padding: "32px 34px", display: "flex", flexDirection: "column" }}>
          <Label color={C.pinkDeep}>Peran klinik &amp; optik</Label>
          <div style={{ marginTop: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {PERAN.map((p, i) => (
              <div
                key={p}
                style={{
                  paddingTop: 18,
                  paddingBottom: 18,
                  borderTop: i === 0 ? "none" : "1px solid " + C.pinkLine,
                  fontSize: 28,
                  color: C.ink,
                  lineHeight: 1.2,
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  );
}
