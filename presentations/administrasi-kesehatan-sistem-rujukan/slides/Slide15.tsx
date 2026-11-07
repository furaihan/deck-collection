import { Building2 } from "lucide-react";
import { C, FONT } from "../theme";
import { BulletList, DeckSlide, H, IconBadge, iconStyle, Label, Num, Panel, Prose, SectionKicker, Takeaway } from "../Frame";

const ISU = ["PM", "PTM", "Gizi", "KIA", "Kesehatan mata"];
const KEMATIAN = [["Stroke", "132"], ["Ischaemic heart disease", "96"], ["Diabetes mellitus", "41"], ["Tuberculosis", "33"]];

export default function Slide15() {
  return (
    <DeckSlide n={15} section="KONDISI KESEHATAN" title={<><SectionKicker>14 · Indonesia dan peran optik</SectionKicker><H>Masalah kesehatan luas. Peran optik harus hadir di dalamnya.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <Label color={C.berry}>Isu utama</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 20 }}>
              {ISU.map((x, i) => (
                <div key={x} style={{ padding: "16px 20px", background: i % 2 ? C.tangPale : C.coralPale, border: "1px solid " + C.rule, fontFamily: FONT.display, fontSize: 34, fontWeight: 600, color: C.ink }}>{x}</div>
              ))}
            </div>
          </div>
          <div>
            <Label color={C.berry}>Top causes of death · 2019</Label>
            <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr auto", gap: 14, maxWidth: 620 }}>
              {KEMATIAN.map(([a, b]) => (
                <div key={a} style={{ display: "contents" }}>
                  <Prose size={25} color={C.ink}>{a}</Prose>
                  <Num size={30}>{b}</Num>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Panel tone="tang" center style={{ padding: 36 }}>
          <IconBadge tone="berry"><Building2 {...iconStyle} /></IconBadge>
          <div style={{ marginTop: 24, fontFamily: FONT.display, fontSize: 48, lineHeight: 1.04, fontWeight: 600 }}>Klinik / optik adalah simpul layanan.</div>
          <div style={{ marginTop: 24 }}>
            <BulletList size={27} gap={18} items={["Aktor pelaksana", "Mitra pemerintah", "Pengawas sosial", "Menilai target nasional: tercapai atau tidak"]} />
          </div>
        </Panel>
      </div>
      <Takeaway>Menjadi bagian dari SKN berarti ikut membaca masalah, bukan hanya mengerjakan tindakan klinis.</Takeaway>
    </DeckSlide>
  );
}
