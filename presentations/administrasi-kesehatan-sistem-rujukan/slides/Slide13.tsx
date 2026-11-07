import { Activity, BookOpen, ShieldCheck } from "lucide-react";
import { C, FONT } from "../theme";
import { Arrow, DeckSlide, H, iconStyle, Panel, Prose, SectionKicker } from "../Frame";

export default function Slide13() {
  return (
    <DeckSlide n={13} section="PEMBANGUNAN KESEHATAN" title={<><SectionKicker>12 · RPJPN 2025–2045</SectionKicker><H>“Kesehatan untuk Semua”</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22 }}>
          <Panel tone="coral" style={{ padding: 34, minHeight: 340 }}>
            <Activity style={{ ...iconStyle, color: C.berry }} />
            <div style={{ fontFamily: FONT.display, fontSize: 45, fontWeight: 600, marginTop: 26, lineHeight: 1.02, minHeight: 92, display: "flex", alignItems: "flex-end" }}>Sehat</div>
            <Prose size={25} color={C.ink} style={{ marginTop: 20 }}>Sistem kesehatan tangguh dan responsif; penduduk hidup lebih panjang dan sehat.</Prose>
          </Panel>
          <Panel tone="tang" style={{ padding: 34, minHeight: 340 }}>
            <BookOpen style={{ ...iconStyle, color: C.berry }} />
            <div style={{ fontFamily: FONT.display, fontSize: 45, fontWeight: 600, marginTop: 26, lineHeight: 1.02, minHeight: 92, display: "flex", alignItems: "flex-end" }}>Cerdas<br />dan terpelajar</div>
            <Prose size={25} color={C.ink} style={{ marginTop: 20 }}>Pendidikan berkualitas dan merata sebagai bagian dari manusia Indonesia unggul.</Prose>
          </Panel>
          <Panel tone="berry" style={{ padding: 34, minHeight: 340 }}>
            <ShieldCheck style={{ ...iconStyle, color: C.berry }} />
            <div style={{ fontFamily: FONT.display, fontSize: 45, fontWeight: 600, marginTop: 26, lineHeight: 1.02, minHeight: 92, display: "flex", alignItems: "flex-end" }}>Terlindungi<br />dan sejahtera</div>
            <Prose size={25} color={C.ink} style={{ marginTop: 20 }}>Perlindungan sosial yang adaptif menuju kesejahteraan.</Prose>
          </Panel>
        </div>
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 22 }}>
          <Arrow color={C.berry} />
          <Prose size={30} color={C.ink} weight={500}>Mencakup seluruh penduduk, siklus hidup, wilayah, dan kelompok masyarakat.</Prose>
        </div>
      </div>
    </DeckSlide>
  );
}
