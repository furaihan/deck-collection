import { Activity, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { C, FONT } from "../theme";
import { Body, DeckSlide, H, iconStyle, MiniTag, Panel, Pill, Rule, SectionKicker } from "../Frame";

export default function Slide16() {
  const upaya = [
    { t: "Promotif", i: Sparkles },
    { t: "Preventif", i: ShieldCheck },
    { t: "Kuratif", i: Stethoscope },
    { t: "Rehabilitatif", i: Activity },
  ];
  return (
    <DeckSlide n={16} section="UPAYA KESEHATAN" title={<><SectionKicker>15 · PM, PTM, dan pokok upaya</SectionKicker><H>Pencegahan dan pengendalian berjalan beriringan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
          <Panel tone="coral" center style={{ padding: 32, minHeight: 400 }}>
            <Pill>PM · Penyakit menular</Pill>
            <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 12 }}>
              {["TBC", "HIV/AIDS", "Malaria", "DBD", "Kusta"].map((x) => <MiniTag key={x} tone="berry">{x}</MiniTag>)}
            </div>
            <Rule style={{ marginTop: 26, marginBottom: 20 }} />
            <Body size={25}>Program dan dasar: Perpres 67/2021; PMK 21/2013; RAN Eliminasi Malaria 2020–2026; 3M, jumantik, dan wolbachia; PMK 11/2019.</Body>
          </Panel>
          <Panel tone="tang" center style={{ padding: 32, minHeight: 400 }}>
            <Pill tone="tang">PTM · Penyakit tidak menular</Pill>
            <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 12 }}>
              {["Stroke", "Jantung", "Hipertensi", "Kanker", "Katarak", "Diabetes"].map((x) => <MiniTag key={x} tone="tang">{x}</MiniTag>)}
            </div>
            <Rule style={{ marginTop: 26, marginBottom: 20 }} />
            <Body size={25}>Arah kebijakan: Permenkes 71/2015; Kepmenkes 854/2009; UU 17/2023 tentang Kesehatan.</Body>
          </Panel>
        </div>
        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, flex: "none" }}>
          {upaya.map(({ t, i: Icon }, idx) => (
            <div key={t} style={{ borderTop: "3px solid " + (idx % 2 ? C.tang : C.coral), paddingTop: 18, display: "flex", gap: 16, alignItems: "center" }}>
              <Icon style={{ ...iconStyle, color: C.berry }} />
              <span style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 600 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </DeckSlide>
  );
}
