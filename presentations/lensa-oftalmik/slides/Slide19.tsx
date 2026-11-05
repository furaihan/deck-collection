import { Film, Title, Label } from "../Frame";
import { C, FONT, LIT } from "../theme";

type Mark = "yes" | "no" | "none";

const rows: { criterion: string; cr39: [Mark, string]; pc: [Mark, string] }[] = [
  { criterion: "Berat", cr39: ["yes", "ringan"], pc: ["yes", "paling ringan"] },
  { criterion: "Benturan", cr39: ["yes", "tahan bentur"], pc: ["yes", "terkuat"] },
  { criterion: "Permukaan", cr39: ["no", "mudah tergores"], pc: ["no", "wajib hard coat"] },
  { criterion: "Nomor Abbe", cr39: ["yes", "58"], pc: ["no", "30, dispersi tinggi"] },
  { criterion: "Ketebalan", cr39: ["no", "lebih tebal"], pc: ["yes", "lebih datar"] },
  { criterion: "UV", cr39: ["yes", "dengan lapisan"], pc: ["yes", "hampir 100%"] },
  { criterion: "Fotokromik", cr39: ["no", "rendah"], pc: ["none", "tidak dicantumkan"] },
  { criterion: "Stabilitas indeks", cr39: ["no", "berubah oleh suhu"], pc: ["none", "tidak dicantumkan"] },
  { criterion: "Proses", cr39: ["yes", "casting sederhana"], pc: ["no", "perlakuan injeksi khusus"] },
];

function Mark({ mark, note }: { mark: Mark; note: string }) {
  const filled = mark === "yes";
  const empty = mark === "no";
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <span
        style={{
          width: 12,
          height: 12,
          flex: "none",
          marginTop: 8,
          background: filled ? C.amber : "transparent",
          border: empty ? `1.5px solid ${C.inkFaint}` : filled ? "none" : `1.5px solid ${C.rule}`,
          boxShadow: filled ? "0 4px 10px rgba(180,120,30,0.4)" : "none",
        }}
      />
      <span style={{ fontFamily: FONT.text, fontSize: 22, lineHeight: 1.3, color: mark === "none" ? C.inkFaint : C.ink }}>
        {note}
      </span>
    </div>
  );
}

export default function Slide19() {
  return (
    <Film n={19} section="04 · Lensa plastik" accent="CR-39 dan polikarbonat" foot="Tanda kosong berarti sumber tidak mencantumkan sifat itu untuk bahan tersebut; bukan berarti sifatnya buruk.">
      <div style={{ flex: "none" }}>
        <Title size={68} max={1240}>Dua plastik pada sumbu yang sama</Title>
      </div>

      <div className="flex" style={{ marginTop: 20, flex: 1 }}>
        <div style={{ flex: 1, paddingRight: 28 }}>
          <div style={{ borderBottom: `3px solid ${C.ink}`, paddingBottom: 8 }}>
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: C.ink }}>CR-39</span>
            <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkFaint, marginLeft: 12 }}>
              n 1.498 · V 58 · SG 1.32
            </span>
          </div>
          {rows.map((r) => (
            <div
              key={r.criterion}
              style={{ display: "flex", gap: 18, alignItems: "flex-start", paddingTop: 8, paddingBottom: 8, borderBottom: `1px solid ${C.ruleSoft}` }}
            >
              <span style={{ width: 205, flex: "none", fontFamily: FONT.text, fontWeight: 600, fontSize: 22, color: C.ink, lineHeight: 1.3 }}>
                {r.criterion}
              </span>
              <Mark mark={r.cr39[0]} note={r.cr39[1]} />
            </div>
          ))}
        </div>

        <div style={{ flex: 1, paddingLeft: 28, borderLeft: `1px solid ${C.rule}` }}>
          <div style={{ borderBottom: `3px solid ${C.ink}`, paddingBottom: 8 }}>
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: C.ink }}>Polikarbonat</span>
            <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkFaint, marginLeft: 12 }}>
              n 1.586 · V 30 · SG 1.20
            </span>
          </div>
          {rows.map((r) => (
            <div
              key={r.criterion}
              style={{ display: "flex", gap: 18, alignItems: "flex-start", paddingTop: 8, paddingBottom: 8, borderBottom: `1px solid ${C.ruleSoft}` }}
            >
              <span aria-hidden style={{ width: 205, flex: "none" }} />
              <Mark mark={r.pc[0]} note={r.pc[1]} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 22, marginTop: 22, flex: "none" }}>
        {[
          {
            k: "Termosetting",
            v: "Monomer dituang",
            note: "2.65% inisiator IPP, curing di oven air, reaksi eksotermis, susut 14%. Oksigen menghambat polimerisasi.",
            hot: true,
          },
          {
            k: "Termoplastik",
            v: "Pelet disuntik",
            note: "Dilelehkan dan diinjeksi pada sekitar 320 °C, siklus 90-130 detik, lalu post curing dan hard coat.",
            hot: false,
          },
        ].map((p) => (
          <div
            key={p.k}
            style={{
              flex: 1,
              background: p.hot ? LIT.plateInk : LIT.plateFlat,
              boxShadow: p.hot ? LIT.inkShadow : LIT.flatShadow,
              padding: "14px 20px",
              display: "flex",
              alignItems: "baseline",
              gap: 18,
            }}
          >
            <div style={{ width: 260, flex: "none" }}>
              <Label size={13} track="0.16em" color={p.hot ? C.amber : C.ink}>{p.k}</Label>
              <div style={{ marginTop: 3, fontFamily: FONT.display, fontWeight: 700, fontSize: 24, color: p.hot ? C.paper : C.ink }}>
                {p.v}
              </div>
              <div style={{ marginTop: 2, fontFamily: FONT.mono, fontSize: 14, color: p.hot ? "#7E7869" : C.inkFaint }}>
                {p.hot ? "CR-39" : "Polikarbonat"}
              </div>
            </div>
            <div style={{ flex: 1, fontFamily: FONT.text, fontSize: 19, lineHeight: 1.4, color: p.hot ? C.onInk : C.inkSoft }}>
              {p.note}
            </div>
          </div>
        ))}
      </div>
    </Film>
  );
}