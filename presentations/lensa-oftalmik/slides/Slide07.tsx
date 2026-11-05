import { Film, Title, Label } from "../Frame";
import { C, FONT, LIT } from "../theme";

const stages = [
  { name: "Batch", note: "Cullet lebih dulu, lalu bahan dimasukkan sedikit demi sedikit sampai 1400 °C.", temp: "1400", hot: true },
  { name: "Melting & fining", note: "Buih, batu, dan kotoran naik ke permukaan, lalu disendoki keluar.", temp: "1200" },
  { name: "Stirring", note: "Diaduk terus-menerus, dengan mesin atau pengaduk tangan yang panjang.", temp: "1200" },
  { name: "Annealing", note: "Lembaran masuk kotak annealing bersuhu ruang supaya tidak retak.", temp: "—" },
  { name: "Rough blank", note: "Sisi depan dan belakang digerinda, dipoles sesuai kelengkungan.", temp: "—" },
];

export default function Slide07() {
  return (
    <Film n={7} section="01 · Kaca dan sejarahnya" accent="Dua proses" foot="Batch process menuang lempengan dulu; continuous flow mencetak rough blank langsung dari kaca cair.">
      <div style={{ flex: "none" }}>
        <Title size={72} max={1240}>Dua proses, satu titik: rough blank</Title>
      </div>

      <div className="flex flex-1 flex-col justify-center" style={{ marginTop: 22 }}>
        {stages.map((s, i) => (
          <div
            key={s.name}
            className="flex items-center"
            style={{
              borderTop: i === 0 ? `2.5px solid ${C.ink}` : `1px solid ${C.ruleSoft}`,
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <div style={{ width: 54, flex: "none" }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 18, color: s.hot ? C.amberText : C.inkFaint }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div style={{ width: 460, flex: "none", fontFamily: FONT.text, fontWeight: 600, fontSize: 32, color: C.ink }}>
              {s.name}
            </div>
            <div style={{ flex: 1, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: C.inkSoft }}>
              {s.note}
            </div>
            <div style={{ width: 160, flex: "none", textAlign: "right" }}>
              {s.temp === "—" ? (
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.rule }}>—</span>
              ) : (
                <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 38, color: s.hot ? C.amberText : C.ink }}>
                  {s.temp}
                  <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkFaint, fontWeight: 400 }}> °C</span>
                </span>
              )}
            </div>
          </div>
        ))}
        <div style={{ borderTop: `2.5px solid ${C.ink}` }} />
      </div>

      <div style={{ display: "flex", gap: 24, marginTop: 18, flex: "none" }}>
        {[
          { k: "Batch process", v: "Lempengan dulu", note: "Pot 800–1000 °C selama 3–5 hari sebelum bahan naik ke 1400 °C." },
          { k: "Continuous flow", v: "Langsung dicetak", note: "Kaca cair dari fining langsung masuk cetakan rough blank." },
        ].map((p) => (
          <div
            key={p.k}
            style={{
              flex: 1,
              background: LIT.plateFlat,
              boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 18px 32px rgba(20,21,24,0.34)",
              padding: "16px 22px 18px",
              display: "flex",
              alignItems: "baseline",
              gap: 20,
            }}
          >
            <Label size={15} color={C.ink}>{p.k}</Label>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 28, color: C.ink, flex: "none" }}>{p.v}</div>
            <div style={{ fontFamily: FONT.text, fontSize: 20, lineHeight: 1.4, color: C.inkSoft }}>{p.note}</div>
          </div>
        ))}
      </div>
    </Film>
  );
}