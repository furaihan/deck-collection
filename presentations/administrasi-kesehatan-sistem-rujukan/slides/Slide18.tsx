import { C } from "../theme";
import { DeckSlide, Flow, H, Label, MiniTag, Num, Panel, Prose, SectionKicker, Takeaway } from "../Frame";

const SITUASI = ["Skrining anak di desa", "Edukasi istirahat mata bagi siswa", "Ergonomi kerja di depan komputer", "Pemerataan optometris di desa", "Katarak, BPJS, dan literasi prosedur"];

export default function Slide18() {
  return (
    <DeckSlide n={18} section="SISTEM RUJUKAN" title={<><SectionKicker>17 · Implementasi dan rujukan</SectionKicker><H>Rujukan adalah cara sistem menjaga kesinambungan.</H></>}>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Flow
            accent={C.berry}
            minHeight={300}
            steps={[
              { label: "Kenali", note: "keluhan & risiko" },
              { label: "Tentukan", note: "layanan yang tepat" },
              { label: "Hubungkan", note: "fasilitas & pembiayaan" },
              { label: "Tindak lanjut", note: "kembali terintegrasi" },
            ]}
          />
          <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <MiniTag>JKN</MiniTag>
            <MiniTag tone="tang">GERMAS</MiniTag>
            <MiniTag tone="berry">Akses</MiniTag>
            <MiniTag tone="tang">Kualitas</MiniTag>
          </div>
        </div>
        <Panel tone="tang" center style={{ padding: 34 }}>
          <Label color={C.ink}>5 situasi untuk direnungkan</Label>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
            {SITUASI.map((x, i) => (
              <div key={x} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Num size={28}>{i + 1}</Num>
                <Prose size={25} color={C.ink}>{x}</Prose>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Takeaway>Rujukan bukan “melepaskan” pasien — melainkan memastikan pasien tersambung ke pertolongan berikutnya.</Takeaway>
    </DeckSlide>
  );
}
