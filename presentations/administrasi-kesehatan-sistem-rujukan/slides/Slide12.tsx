import { Landmark } from "lucide-react";
import { C, FONT } from "../theme";
import { Body, DeckSlide, H, IconBadge, iconStyle, Label, Num, Panel, Prose, SectionKicker } from "../Frame";

const RPJPK = ["Peningkatan derajat kesehatan masyarakat", "Penguatan sistem kesehatan", "Perbaikan akses dan kualitas layanan", "Pengendalian penyakit & promosi kesehatan", "Keadilan dan inklusi dalam layanan"];

export default function Slide12() {
  return (
    <DeckSlide n={12} section="PEMBANGUNAN KESEHATAN" title={<><SectionKicker>11 · RPJP-K</SectionKicker><H>Rencana jangka panjang untuk kesehatan yang berkelanjutan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 56, alignItems: "stretch" }}>
        <Panel tone="berry" center style={{ padding: 38 }}>
          <IconBadge tone="tang"><Landmark {...iconStyle} /></IconBadge>
          <div style={{ marginTop: 26, fontFamily: FONT.display, fontSize: 50, lineHeight: 1, fontWeight: 600 }}>Rencana Pembangunan Jangka Panjang-Kesehatan</div>
          <Body size={27} max={600} color={C.ink} style={{ marginTop: 22 }}>Panduan merumuskan kebijakan, strategi, dan program kesehatan secara berkelanjutan.</Body>
        </Panel>
        <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          <Label color={C.berry}>5 tujuan RPJP-K</Label>
          <div style={{ marginTop: 20, flex: 1, display: "flex", flexDirection: "column" }}>
            {RPJPK.map((x, i) => (
              <div key={x} style={{ flex: 1, display: "flex", gap: 18, alignItems: "center", borderBottom: "1px solid " + C.rule }}>
                <Num size={34}>{String(i + 1).padStart(2, "0")}</Num>
                <Prose size={28} color={C.ink} weight={500}>{x}</Prose>
              </div>
            ))}
          </div>
          <Prose size={23} color={C.inkFaint} style={{ marginTop: 20 }}>Disusun bersama pemerintah pusat, Kemenkes, pendidikan, organisasi non-pemerintah, dan masyarakat.</Prose>
        </div>
      </div>
    </DeckSlide>
  );
}
