import { C } from "../theme";
import { Arrow, DeckSlide, Flow, H, Panel, Prose, SectionKicker } from "../Frame";

export default function Slide11() {
  return (
    <DeckSlide n={11} section="PEMBANGUNAN KESEHATAN" title={<><SectionKicker>10 · Hierarki perencanaan</SectionKicker><H>Dari rencana besar ke program yang bisa dijalankan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <Flow
          accent={C.tang}
          minHeight={250}
          steps={[
            { label: "RPJPN", note: "20 tahun" },
            { label: "RPJMN", note: "5 tahun" },
            { label: "RPJP-K", note: "20–25 tahun" },
            { label: "SKN", note: "cara sistem dijalankan" },
            { label: "Renstra", note: "arah kerja sektor" },
            { label: "Program", note: "aksi kesehatan" },
          ]}
        />
        <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 24 }}>
          <Arrow color={C.berry} />
          <Prose size={30} color={C.ink} weight={500}>Arah kebijakan diterjemahkan menjadi praktik layanan di lapangan.</Prose>
        </div>
        <Panel tone="coral" style={{ marginTop: 44, padding: 24 }}>
          <Prose size={23} color={C.inkSoft}>Catatan sumber: urutan panah bagan asli tidak terbaca pasti; alur di sini disusun sebagai hierarki ringkas untuk pembelajaran.</Prose>
        </Panel>
      </div>
    </DeckSlide>
  );
}
