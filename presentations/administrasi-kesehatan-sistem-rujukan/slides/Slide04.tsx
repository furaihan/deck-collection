import { Eye } from "lucide-react";
import { C, FONT, T } from "../theme";
import { Arrow, Body, DeckSlide, H, IconBadge, iconStyle, Label, Num, Panel, Prose, SectionKicker } from "../Frame";

const SUBSISTEM = ["Upaya kesehatan", "Penelitian & pengembangan", "Pembiayaan kesehatan", "SDM kesehatan", "Farmasi · alkes · makanan", "Manajemen · informasi · regulasi", "Pemberdayaan masyarakat"];

export default function Slide04() {
  return (
    <DeckSlide n={4} section="SISTEM KESEHATAN NASIONAL" title={<><SectionKicker>03 · Tujuh subsistem</SectionKicker><H>SKN bekerja sebagai ekosistem.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 56, alignItems: "stretch" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {SUBSISTEM.map((x, i) => (
            <Panel key={x} tone={i === 6 ? "tang" : i % 2 === 0 ? "white" : "coral"} center style={{ padding: 24, minHeight: 116, gridColumn: i === 6 ? "1 / -1" : undefined }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Num size={T.small}>{String(i + 1).padStart(2, "0")}</Num>
                <Prose size={26} color={C.ink} weight={500}>{x}</Prose>
              </div>
            </Panel>
          ))}
        </div>
        <Panel tone="berry" center style={{ padding: 34 }}>
          <IconBadge tone="tang"><Eye {...iconStyle} /></IconBadge>
          <div style={{ marginTop: 24, fontFamily: FONT.display, fontSize: 40, lineHeight: 1.04, fontWeight: 600 }}>Contoh: skrining mata di sekolah</div>
          <Body size={26} max={510} style={{ marginTop: 18 }}>Satu kegiatan membutuhkan SDM, alat pemeriksaan, biaya, pencatatan, aturan, serta keterlibatan sekolah dan orang tua.</Body>
          <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 18 }}>
            <Arrow color={C.tang} />
            <Label color={C.berry}>Satu layanan · banyak subsistem</Label>
          </div>
        </Panel>
      </div>
    </DeckSlide>
  );
}
