import { Landmark, Scale, ShieldCheck, Users } from "lucide-react";
import { C, FONT } from "../theme";
import { DeckSlide, H, iconStyle, Label, Num, Panel, Prose, SectionKicker, Takeaway } from "../Frame";

const TUJUAN = ["Meningkatkan derajat kesehatan masyarakat", "Memuaskan kebutuhan dan harapan masyarakat", "Menjamin keadilan dalam kontribusi pembiayaan"];
const PELAKU = [
  { i: Users, t: "Masyarakat", d: "TOMA · LSM · media · akademisi" },
  { i: Landmark, t: "Pemerintah", d: "pusat · provinsi · kab/kota" },
  { i: Scale, t: "Legislatif", d: "DPR · DPD" },
  { i: ShieldCheck, t: "Yudikatif", d: "MA · MK" },
];

export default function Slide05() {
  return (
    <DeckSlide n={5} section="SISTEM KESEHATAN NASIONAL" title={<><SectionKicker>04 · Tujuan dan pelaku</SectionKicker><H>Tujuan yang adil membutuhkan banyak pelaku.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "stretch" }}>
        <Panel tone="coral" style={{ padding: 36, display: "flex", flexDirection: "column" }}>
          <Label color={C.berry}>3 tujuan sistem kesehatan</Label>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            {TUJUAN.map((x, i) => (
              <div key={x} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <Num size={42}>{i + 1}</Num>
                <Prose size={30} color={C.ink} weight={500}>{x}</Prose>
              </div>
            ))}
          </div>
        </Panel>
        <Panel tone="tang" center style={{ padding: 36 }}>
          <Label color={C.ink}>Pelaku SKN</Label>
          <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "34px 20px" }}>
            {PELAKU.map(({ i: Icon, t, d }) => (
              <div key={t} style={{ borderTop: "2px solid " + C.berry, paddingTop: 16 }}>
                <Icon style={{ ...iconStyle, color: C.berry }} />
                <div style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 600, marginTop: 12 }}>{t}</div>
                <Prose size={21} color={C.inkSoft} style={{ marginTop: 6 }}>{d}</Prose>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Takeaway>Keadilan layanan bukan hanya hasil klinis — tetapi juga cara sistem membagi peran dan pembiayaan.</Takeaway>
    </DeckSlide>
  );
}
