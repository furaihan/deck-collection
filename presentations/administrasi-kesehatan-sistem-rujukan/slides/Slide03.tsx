import { Network } from "lucide-react";
import { C, FONT, T } from "../theme";
import { Body, DeckSlide, H, IconBadge, iconStyle, Label, MiniTag, Panel, Prose, Rule, SectionKicker } from "../Frame";

export default function Slide03() {
  return (
    <DeckSlide n={3} section="SISTEM KESEHATAN NASIONAL" title={<><SectionKicker>02 · Definisi dan urgensi</SectionKicker><H>SKN menyatukan yang tidak boleh berjalan sendiri-sendiri.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.18fr .82fr", gap: 68, alignItems: "center" }}>
        <Panel tone="berry" center style={{ padding: 42 }}>
          <Label color={C.berry}>Perpres 72 Tahun 2012</Label>
          <div style={{ marginTop: 22, fontFamily: FONT.display, fontSize: 48, lineHeight: 1.08, fontWeight: 600, color: C.ink }}>
            Pengelolaan kesehatan oleh seluruh komponen bangsa secara terpadu dan saling mendukung.
          </div>
          <Rule color={C.berry} style={{ marginTop: 30, marginBottom: 22 }} />
          <Prose size={T.lede} color={C.ink}>Tujuannya: mencapai derajat kesehatan masyarakat yang setinggi-tingginya.</Prose>
        </Panel>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <IconBadge tone="tang"><Network {...iconStyle} /></IconBadge>
          <div style={{ marginTop: 24 }}><H size={50} max={520}>Masalah kesehatan itu sistemik.</H></div>
          <Body max={520} style={{ marginTop: 20 }}>Karena itu, penyelesaiannya memerlukan pemerintah, masyarakat, akademisi, media, dan tenaga kesehatan.</Body>
          <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <MiniTag tone="tang">Terpadu</MiniTag>
            <MiniTag tone="berry">Saling mendukung</MiniTag>
          </div>
        </div>
      </div>
    </DeckSlide>
  );
}
