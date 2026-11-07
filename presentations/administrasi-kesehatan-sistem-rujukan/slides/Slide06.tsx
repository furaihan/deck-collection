import { C } from "../theme";
import { DeckSlide, Dot, H, Label, Panel, Prose, SectionKicker, Takeaway } from "../Frame";

const DASAR_PEMBANGUNAN = ["Perikemanusiaan", "Pemberdayaan & kemandirian", "Adil & merata", "Pengutamaan manfaat"];
const DASAR_SKN = ["Perikemanusiaan", "Keseimbangan", "Manfaat", "Perlindungan", "Keadilan", "Penghormatan HAM", "Sinergis & tata pemerintahan baik", "Legalitas", "Antisipatif & proaktif", "Gender & nondiskriminatif", "Kearifan lokal"];

export default function Slide06() {
  return (
    <DeckSlide n={6} section="SISTEM KESEHATAN NASIONAL" title={<><SectionKicker>05 · Asas SKN</SectionKicker><H>Prinsip adalah kompas keputusan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: ".72fr 1.28fr", gap: 56, alignItems: "stretch" }}>
        <Panel tone="berry" style={{ padding: 34, display: "flex", flexDirection: "column" }}>
          <Label color={C.berry}>4 dasar pembangunan kesehatan</Label>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            {DASAR_PEMBANGUNAN.map((x, i) => (
              <div key={x} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <Dot color={i % 2 ? C.tang : C.berry} size={14} />
                <Prose size={26} color={C.ink} weight={500}>{x}</Prose>
              </div>
            ))}
          </div>
        </Panel>
        <Panel tone="white" center style={{ padding: 34 }}>
          <Label color={C.berry}>11 dasar SKN · ringkasan</Label>
          <div style={{ marginTop: 24, flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignContent: "space-between", gap: "18px 22px" }}>
            {DASAR_SKN.map((x, i) => (
              <div key={x} style={{ borderTop: "2px solid " + (i % 3 === 0 ? C.berry : i % 3 === 1 ? C.tang : C.coral), paddingTop: 12, display: "flex", alignItems: "flex-start", gridColumn: i === 10 ? "span 2" : undefined }}>
                <Prose size={22} color={C.ink} weight={500}>{x}</Prose>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Takeaway>Pertanyaan praktisnya: bolehkah pelayanan dibedakan karena kemiskinan, gender, atau budaya pasien?</Takeaway>
    </DeckSlide>
  );
}
