import { C } from "../theme";
import { DeckSlide, H, Label, Panel, Prose, Rule, SectionKicker } from "../Frame";

const LAMBANG = ["Palang hijau · pelayanan kesehatan", "5 mahkota putih · Panca Karsa Husada", "Kelopak daun · Panca Karya Husada", "Garis bulat telur · kebulatan tekad & keterpaduan"];

export default function Slide08() {
  return (
    <DeckSlide n={8} section="NILAI DAN IDENTITAS" title={<><SectionKicker>07 · Lambang Bakti Husada</SectionKicker><H>Bakti dalam pelayanan kesehatan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 62, alignItems: "stretch" }}>
        <div style={{ display: "grid", placeItems: "center" }}>
          <div style={{ position: "relative", width: 430, height: 430, display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid " + C.berry, background: C.white }} />
            <div style={{ position: "absolute", width: 64, height: 300, background: C.berry }} />
            <div style={{ position: "absolute", width: 300, height: 64, background: C.berry }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, minHeight: 0 }}>
          <Panel tone="white" style={{ padding: 34 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
              <div>
                <Label color={C.berry}>Bakti</Label>
                <Prose size={29} color={C.ink} weight={500} style={{ marginTop: 10 }}>Pengabdian atau pelayanan.</Prose>
              </div>
              <div>
                <Label color={C.berry}>Husada</Label>
                <Prose size={29} color={C.ink} weight={500} style={{ marginTop: 10 }}>Kesehatan.</Prose>
              </div>
            </div>
            <Rule color={C.berry} style={{ marginTop: 24, marginBottom: 20 }} />
            <Prose size={25}>Ditetapkan 2 November 1984 oleh dr. Suwardjono Surjaningrat.</Prose>
          </Panel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 24px" }}>
            {LAMBANG.map((x) => (
              <div key={x} style={{ borderBottom: "2px solid " + C.tang, display: "flex", alignItems: "flex-start" }}>
                <Prose size={23} color={C.ink} style={{ paddingBottom: 12 }}>{x}</Prose>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
