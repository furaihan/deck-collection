import { C } from "../theme";
import { DeckSlide, Flow, H, Label, MiniTag, Panel, Prose, SectionKicker } from "../Frame";

export default function Slide07() {
  return (
    <DeckSlide n={7} section="SISTEM KESEHATAN NASIONAL" title={<><SectionKicker>06 · Kerangka berpikir</SectionKicker><H>Dari input menjadi derajat kesehatan.</H></>}>
      <Flow minHeight={150} steps={[{ label: "Input", note: "7 subsistem SKN" }, { label: "Proses", note: "koordinasi & layanan" }, { label: "Output", note: "kualitas + kepuasan" }, { label: "Outcome", note: "derajat kesehatan" }]} />
      <div style={{ flex: 1, minHeight: 0, marginTop: 42, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <Panel tone="coral" center style={{ padding: 32, minHeight: 320 }}>
          <Label color={C.berry}>Outcome yang diperhatikan</Label>
          <div style={{ marginTop: 22, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <MiniTag>status kesehatan</MiniTag>
            <MiniTag tone="tang">status gizi</MiniTag>
            <MiniTag tone="berry">perlindungan finansial</MiniTag>
            <MiniTag tone="tang">responsiveness</MiniTag>
          </div>
        </Panel>
        <Panel tone="tang" center style={{ padding: 32, minHeight: 320 }}>
          <Label color={C.ink}>Faktor lingkungan</Label>
          <Prose size={25} color={C.ink} style={{ marginTop: 20 }}>Transisi demografi · ASEAN Economic Community · perubahan iklim · Post-2015 Agenda · Middle Income Trap</Prose>
        </Panel>
      </div>
    </DeckSlide>
  );
}
