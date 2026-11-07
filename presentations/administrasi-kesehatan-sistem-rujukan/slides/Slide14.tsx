import { C, FONT } from "../theme";
import { DeckSlide, H, Label, Matrix, Panel, Prose, Rule, SectionKicker } from "../Frame";

const INDIKATOR = [
  { a: "74,4 → 80", b: "Usia Harapan Hidup · tahun" },
  { a: "122 → 16", b: "Angka Kematian Ibu · per 100.000 kelahiran hidup" },
  { a: "18,80% → 5,0%", b: "Prevalensi stunting pada balita" },
  { a: "272 → 76", b: "Insidensi TBC · per 100.000 penduduk" },
  { a: "98,0% → 99,5%", b: "Cakupan kepesertaan JKN" },
];

export default function Slide14() {
  return (
    <DeckSlide n={14} section="PEMBANGUNAN KESEHATAN" title={<><SectionKicker>13 · Indikator transformasi sosial</SectionKicker><H>Target membuat arah menjadi terukur.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr .75fr", gap: 56, alignItems: "stretch" }}>
        <Matrix grow rows={INDIKATOR} />
        <Panel tone="berry" center style={{ padding: 34 }}>
          <Label color={C.berry}>Baseline 2025 → sasaran 2045</Label>
          <div style={{ marginTop: 30, fontFamily: FONT.display, fontSize: 66, lineHeight: 0.94, fontWeight: 600, color: C.berry }}>
            Kesehatan<br /><span style={{ color: C.ink }}>untuk semua.</span>
          </div>
          <Rule color={C.berry} style={{ marginTop: 30, marginBottom: 22 }} />
          <Prose size={26} color={C.ink}>Indikator bukan sekadar angka: ia menjadi alat membaca apakah sistem bergerak ke arah yang dijanjikan.</Prose>
        </Panel>
      </div>
    </DeckSlide>
  );
}
