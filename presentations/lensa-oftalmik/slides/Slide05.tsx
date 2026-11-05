import { Film, Title, Label } from "../Frame";
import { C, FONT, LIT } from "../theme";

export default function Slide05() {
  return (
    <Film n={5} section="01 · Kaca dan sejarahnya" accent="Dua kata">
      <div style={{ flex: "none" }}>
        <Title size={72}>Dua kata yang harus dipegang</Title>
      </div>

      <div style={{ display: "flex", gap: 26, marginTop: 26 }}>
        {[
          {
            term: "Lensa oftalmik",
            body: "Kacamata yang didesain dengan bentuk tertentu untuk mengoreksi penglihatan, dan sekaligus melindungi mata dari cahaya serta benda yang datang padanya.",
          },
          {
            term: "Kaca",
            body: "Material amorf padat: terbentuk karena pendinginan tanpa proses kristalisasi, dari campuran bahan anorganik yang bekerja pada suhu tinggi.",
          },
        ].map((d) => (
          <div
            key={d.term}
            style={{
              flex: 1,
              background: LIT.plate,
              boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 20px 38px rgba(58,46,28,0.17)",
              padding: "22px 26px 24px",
              borderTop: `5px solid ${C.amber}`,
            }}
          >
            <Label size={16} color={C.ink}>{d.term}</Label>
            <div style={{ marginTop: 10, fontFamily: FONT.text, fontSize: 28, lineHeight: 1.45, color: C.ink }}>
              {d.body}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 26, marginTop: 26 }}>
        {[
          { k: "Mineral", body: "Kaca cair yang dihomogenkan, gelembung gas dibuang saat pemurnian, lalu dibentuk. Berat dan tahan gores, tetapi mudah pecah." },
          { k: "Organik", body: "Polimer: CR-39 dari monomer yang dituang, polikarbonat dari pelet yang disuntik. Ringan dan tahan pecah, tetapi lunak terhadap goresan." },
        ].map((m) => (
          <div
            key={m.k}
            style={{
              flex: 1,
              padding: "18px 24px 20px",
              background: LIT.plateFlat,
              boxShadow: LIT.flatShadow,
            }}
          >
            <Label size={16} color={C.ink}>{m.k}</Label>
            <div style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 23, lineHeight: 1.45, color: C.inkSoft }}>
              {m.body}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto", paddingTop: 18, borderTop: `1px solid ${C.rule}` }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 38, lineHeight: 1.1, color: C.ink, maxWidth: 1180 }}>
          Kaca dan plastik tidak berbeda tujuan, hanya berbeda kompromi:
          yang satu menang di permukaan, yang lain di benturan.
        </div>
      </div>
    </Film>
  );
}