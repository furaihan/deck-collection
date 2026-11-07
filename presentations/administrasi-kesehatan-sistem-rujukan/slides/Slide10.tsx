import { HeartPulse, Network, ShieldCheck, Sparkles, Users } from "lucide-react";
import { C, FONT } from "../theme";
import { DeckSlide, H, iconStyle, Label, Panel, Prose, SectionKicker } from "../Frame";

const NILAI = [
  { t: "Service", d: "pelayanan maksimal tanpa membedakan pasien", i: HeartPulse },
  { t: "Empathy", d: "mendengarkan keluhan dengan hati", i: Users },
  { t: "Integrity", d: "jujur dalam pemeriksaan & resep", i: ShieldCheck },
  { t: "Collaboration", d: "bekerja sama lintas profesi", i: Network },
  { t: "Excellence", d: "akurat dan terus belajar", i: Sparkles },
];

export default function Slide10() {
  return (
    <DeckSlide n={10} section="NILAI DAN IDENTITAS" title={<><SectionKicker>09 · Nilai penting tenaga kesehatan</SectionKicker><H>Lima nilai yang terlihat dalam setiap keputusan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, alignItems: "stretch" }}>
          {NILAI.map(({ t, d, i: Icon }, idx) => (
            <Panel key={t} tone={idx % 2 === 0 ? "white" : idx === 1 ? "coral" : "tang"} style={{ padding: 26, minHeight: 300 }}>
              <Icon style={{ ...iconStyle, color: C.berry }} />
              <div style={{ fontFamily: FONT.display, fontSize: 34, fontWeight: 600, marginTop: 22 }}>{t}</div>
              <Prose size={23} color={C.inkSoft} style={{ marginTop: 18 }}>{d}</Prose>
            </Panel>
          ))}
        </div>
        <Panel tone="berry" style={{ padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Label color={C.berry} style={{ flex: "none" }}>Refleksi</Label>
            <Prose size={25} color={C.ink}>Anak dengan kelainan refraksi, orang tua terbatas biaya: cukup kacamata, perlu rujukan, atau melibatkan siapa?</Prose>
          </div>
        </Panel>
      </div>
    </DeckSlide>
  );
}
