import { Eye } from "lucide-react";
import { C, FONT } from "../theme";
import { BulletList, DeckSlide, Flow, H, IconBadge, iconStyle, Lead, Panel, SectionKicker, Takeaway } from "../Frame";

export default function Slide02() {
  return (
    <DeckSlide n={2} section="ORIENTASI" title={<><SectionKicker>01 · Mengapa materi ini penting</SectionKicker><H>Optometris bukan titik akhir.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Lead>Ia adalah bagian dari sistem yang harus tahu cara bekerja, berkoordinasi, dan merujuk.</Lead>
          <Flow minHeight={260} steps={[{ label: "Kelola", note: "layanan & regulasi" }, { label: "Hubungkan", note: "lintas tenaga & sektor" }, { label: "Rujuk", note: "pasien ke layanan tepat" }]} />
        </div>
        <Panel tone="coral" center style={{ padding: 34 }}>
          <IconBadge tone="berry"><Eye {...iconStyle} /></IconBadge>
          <div style={{ marginTop: 28, fontFamily: FONT.display, fontSize: 44, fontWeight: 600, lineHeight: 1.02, color: C.ink }}>Mengapa mempelajari SKN?</div>
          <div style={{ marginTop: 24 }}>
            <BulletList
              size={24}
              gap={18}
              items={[
                "Optometris bagian dari SKN.",
                "Administrasi melatih pengelolaan layanan yang berkesinambungan.",
                "Sistem rujukan membantu menentukan ke mana pasien diarahkan.",
                "Layanan kesehatan perlu dikelola secara terintegrasi.",
              ]}
            />
          </div>
        </Panel>
      </div>
      <Takeaway>Peran klinis menjadi lebih kuat ketika masuk ke alur layanan yang lebih besar.</Takeaway>
    </DeckSlide>
  );
}
