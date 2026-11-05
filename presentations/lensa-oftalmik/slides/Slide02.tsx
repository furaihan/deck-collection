import { Film, Title, Label, Kicker } from "../Frame";
import { C, FONT } from "../theme";

const acts = [
  {
    n: "01",
    range: "Frame 03–09",
    title: "Kaca dan sejarahnya",
    note: "Dari kaca-pembakar Yunani sampai blank yang di-annealing: bagaimana kaca lahir, dari apa ia dibuat, dan apa yang bisa salah.",
  },
  {
    n: "02",
    range: "Frame 10–15",
    title: "Sifat optik",
    note: "Index bias, nomor Abbe, transparansi, penyerapan UV. Empat angka yang memutuskan seberapa tipis dan sejernih sebuah lensa.",
  },
  {
    n: "03",
    range: "Frame 16–18",
    title: "Sifat fisik",
    note: "Berat jenis, daya tahan benturan, goresan, dan zat kimia: apa yang menentukan umur lensa di wajah pemakai.",
  },
  {
    n: "04",
    range: "Frame 19–20",
    title: "Lensa plastik",
    note: "CR-39 dan polikarbonat: monomer yang dituang ke cetakan dan pelet yang disuntik pada 320 derajat.",
  },
];

export default function Slide02() {
  return (
    <Film n={2} section="Peta kuliah" accent="Empat bagian">
      <div style={{ flex: "none" }}>
        <Title size={70}>Empat berkas, satu alur</Title>
      </div>

      <div className="flex flex-col" style={{ marginTop: 26, flex: 1 }}>
        {acts.map((act, i) => (
          <div
            key={act.n}
            className="flex items-center"
            style={{
              borderTop: i === 0 ? `2.5px solid ${C.ink}` : `1px solid ${C.ruleSoft}`,
              paddingTop: 26,
              paddingBottom: 26,
            }}
          >
            <div style={{ width: 92, flex: "none" }}>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 700,
                  fontSize: 46,
                  lineHeight: 1,
                  color: i === 0 ? C.amberText : C.ink,
                }}
              >
                {act.n}
              </span>
            </div>
            <div style={{ width: 190, flex: "none" }}>
              <Label size={16} track="0.14em">{act.range}</Label>
            </div>
            <div style={{ width: 400, flex: "none", fontFamily: FONT.display, fontWeight: 700, fontSize: 44, lineHeight: 1.05 }}>
              {act.title}
            </div>
            <div style={{ flex: 1, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.42, color: C.inkSoft, maxWidth: 720 }}>
              {act.note}
            </div>
          </div>
        ))}
        <div style={{ borderTop: `2.5px solid ${C.ink}` }} />

        <Kicker size={30} max={1180}>
          Yang menentukan pilihan lensa bukan satu angka, melainkan tiga yang
          bergerak ke arah berlawanan.
        </Kicker>
      </div>
    </Film>
  );
}