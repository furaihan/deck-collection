import { Film, Title, Label, Kicker } from "../Frame";
import { C, FONT, LIT } from "../theme";

const colourants = [
  { metal: "Cobalt", word: "biru", a: "#1F3F94", b: "#3E6FD1" },
  { metal: "Chromium oxide", word: "hijau", a: "#245531", b: "#4A8C57" },
  { metal: "Uranium oxide", word: "kuning", a: "#B8901E", b: "#E8C64C" },
  { metal: "Iron oxide", word: "infra merah", a: "#5A2E1A", b: "#8E5334" },
  { metal: "Silver halida", word: "fotokromik", a: "#3A3A38", b: "#8C8B85" },
];

const flaws = [
  { name: "Striae", note: "Pita atau garis: bahan tidak tercampur merata.", mark: "///" },
  { name: "Bubbles", note: "Gelembung yang gagal naik sebelum kaca membeku.", mark: "○○" },
  { name: "Inclusion", note: "Kerikil dan kristalit yang ikut mengeras.", mark: "●" },
  { name: "Cloudiness", note: "Kabut dari endapan koloid saat pendinginan.", mark: "≈" },
];

export default function Slide08() {
  return (
    <Film n={8} section="01 · Kaca dan sejarahnya" accent="Warna dan cacat">
      <div style={{ flex: "none" }}>
        <Title size={70} max={1200}>Yang dimasukkan logam, yang ditinggalkan gelembung</Title>
      </div>

      <div className="flex" style={{ gap: 44, marginTop: 26, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Label size={16}>Penambahan logam</Label>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 9 }}>
            {colourants.map((c) => (
              <div
                key={c.metal}
                className="flex items-center"
                style={{
                  background: "transparent",
                  borderBottom: `1px solid ${C.ruleSoft}`,
                  padding: "15px 0",
                  gap: 18,
                }}
              >
                <span
                  style={{
                    width: 52,
                    height: 52,
                    flex: "none",
                    background: `linear-gradient(150deg, ${c.b} 0%, ${c.a} 70%)`,
                    boxShadow: "0 1px 0 rgba(255,255,255,0.45) inset, 0 6px 12px rgba(20,21,24,0.28)",
                  }}
                />
                <span style={{ flex: 1, fontFamily: FONT.text, fontWeight: 600, fontSize: 27, color: C.ink }}>{c.metal}</span>
                <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 30, color: C.inkSoft }}>{c.word}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Label size={16}>Cacat lensa kaca</Label>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 9 }}>
            {flaws.map((f) => (
              <div
                key={f.name}
                className="flex items-center"
                style={{
                  background: LIT.plateFlat,
                  boxShadow: "0 0 0 1px rgba(20,21,24,0.12)",
                  padding: "15px 18px",
                  gap: 18,
                }}
              >
                <span style={{ width: 44, flex: "none", textAlign: "center", fontFamily: FONT.mono, fontSize: 22, color: C.amberText }}>{f.mark}</span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontFamily: FONT.text, fontWeight: 600, fontSize: 26, color: C.ink }}>{f.name}</span>
                  <span style={{ display: "block", fontFamily: FONT.text, fontSize: 20, lineHeight: 1.35, color: C.inkSoft }}>{f.note}</span>
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", paddingTop: 16 }}>
            <Kicker size={28} max={640}>
              Warna dan cacat lahir di tungku yang sama: satu disengaja, satu tidak.
            </Kicker>
          </div>
        </div>
      </div>
    </Film>
  );
}