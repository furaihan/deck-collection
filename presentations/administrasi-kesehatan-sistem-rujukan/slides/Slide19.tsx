import { BookOpen, ClipboardList, Users, WalletCards } from "lucide-react";
import { C, FONT } from "../theme";
import { DeckSlide, H, iconStyle, Matrix, Panel, SectionKicker, Takeaway } from "../Frame";

const VS = [
  { a: "Administrasi", b: "Menentukan tujuan, kebijakan, dan kerangka kerja strategis." },
  { a: "Manajemen", b: "Melaksanakan, mengoordinasikan, dan mengawasi tugas operasional." },
  { a: "“Apa” + “mengapa”", b: "Pertanyaan administrasi: apa yang harus dilakukan dan mengapa?" },
  { a: "“Bagaimana” + “siapa”", b: "Pertanyaan manajemen: bagaimana melakukannya dan siapa bertanggung jawab?" },
];
const SUMBER_DAYA = [
  { t: "SDM", i: Users },
  { t: "Uang", i: WalletCards },
  { t: "Alat", i: ClipboardList },
  { t: "Informasi", i: BookOpen },
];

export default function Slide19() {
  return (
    <DeckSlide n={19} section="ADMINISTRASI KESEHATAN" title={<><SectionKicker>18 · Administrasi vs manajemen</SectionKicker><H>Satu menentukan arah. Satu memastikan arah berjalan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <Matrix grow rows={VS} />
        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, flex: "none" }}>
          {SUMBER_DAYA.map(({ t, i: Icon }, idx) => (
            <Panel key={t} tone={idx % 2 ? "tang" : "coral"} style={{ padding: 20 }}>
              <Icon style={{ ...iconStyle, color: C.berry }} />
              <div style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 600, marginTop: 12 }}>{t}</div>
            </Panel>
          ))}
        </div>
      </div>
      <Takeaway>Administrasi kesehatan mengelola sumber daya agar layanan efektif, terintegrasi, dan berkelanjutan.</Takeaway>
    </DeckSlide>
  );
}
