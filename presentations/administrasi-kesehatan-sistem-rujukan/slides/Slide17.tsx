import { C } from "../theme";
import { Body, DeckSlide, H, Panel, Pill, Rule, SectionKicker, StatBlock } from "../Frame";

export default function Slide17() {
  return (
    <DeckSlide n={17} section="UPAYA KESEHATAN" title={<><SectionKicker>16 · Data kunci</SectionKicker><H>TBC dan HIV menunjukkan skala tantangan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "stretch" }}>
        <Panel tone="berry" center style={{ padding: 32 }}>
          <Pill tone="berry">TBC Indonesia · 2022</Pill>
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "34px 24px" }}>
            <StatBlock value="1,06 jt" label="insidensi TBC" detail="estimasi" />
            <StatBlock value="31 rb" label="MDR/RR-TB" detail="kasus" tone={C.tang} />
            <StatBlock value="134 rb" label="kematian" detail="TBC HIV-negatif" tone={C.coral} />
            <StatBlock value="86%" label="keberhasilan" detail="pengobatan" tone={C.berry} />
          </div>
        </Panel>
        <Panel tone="coral" center style={{ padding: 32 }}>
          <Pill>HIV Global · 2023</Pill>
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "34px 24px" }}>
            <StatBlock value="39,9 jt" label="hidup dengan HIV" />
            <StatBlock value="1,3 jt" label="infeksi baru" tone={C.tang} />
            <StatBlock value="630 rb" label="kematian" tone={C.berry} />
          </div>
          <Rule color={C.berry} style={{ marginTop: 36, marginBottom: 22 }} />
          <Body size={23}>Prinsip End TB: government stewardship &amp; accountability; coalition with civil society &amp; communities; human rights, ethics &amp; equity; country adaptation &amp; global collaboration.</Body>
        </Panel>
      </div>
    </DeckSlide>
  );
}
