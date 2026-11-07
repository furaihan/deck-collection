import { C } from "../theme";
import { BulletList, DeckSlide, H, Panel, Pill, Prose, Rule, SectionKicker, Takeaway } from "../Frame";

export default function Slide09() {
  return (
    <DeckSlide n={9} section="NILAI DAN IDENTITAS" title={<><SectionKicker>08 · Dua lapis pengabdian</SectionKicker><H>Karya menjawab “apa”. Karsa menjawab “untuk apa”.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "stretch" }}>
        <Panel tone="coral" center style={{ padding: 32 }}>
          <Pill tone="coral">Panca Karya Husada</Pill>
          <Prose size={25} color={C.ink} style={{ marginTop: 20 }}>Tugas dan tanggung jawab yang dilakukan tenaga kesehatan.</Prose>
          <Rule style={{ marginTop: 24, marginBottom: 20 }} />
          <BulletList
            size={23}
            gap={14}
            items={[
              "Pemantapan upaya kesehatan",
              "Pengembangan tenaga kesehatan",
              "Pengendalian, pengadaan & pengawasan obat, makanan, bahan berbahaya",
              "Perbaikan gizi & kesehatan lingkungan",
              "Pemantapan manajemen & hukum",
            ]}
          />
        </Panel>
        <Panel tone="tang" center style={{ padding: 32 }}>
          <Pill tone="tang">Panca Karsa Husada</Pill>
          <Prose size={25} color={C.ink} style={{ marginTop: 20 }}>Niat, motivasi, dan aspirasi moral di balik tindakan.</Prose>
          <Rule style={{ marginTop: 24, marginBottom: 20 }} />
          <BulletList
            size={23}
            gap={14}
            items={[
              "Masyarakat mampu menolong dirinya sendiri",
              "Mutu lingkungan hidup menjamin kesehatan",
              "Peningkatan status gizi masyarakat",
              "Pengurangan morbiditas & mortalitas",
              "Keluarga sehat sejahtera",
            ]}
          />
        </Panel>
      </div>
      <Takeaway>Optometris tidak hanya memberi kacamata — tetapi melayani dengan empati, kejujuran, dan dedikasi.</Takeaway>
    </DeckSlide>
  );
}
