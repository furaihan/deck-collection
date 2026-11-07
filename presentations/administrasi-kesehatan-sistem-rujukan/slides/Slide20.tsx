import { C, FONT } from "../theme";
import { DeckSlide, Label, Num } from "../Frame";

export default function Slide20() {
  return (
    <DeckSlide n={20} section="PENUTUP" bare>
      <div style={{ position: "absolute", inset: 0, background: C.berry }} />
      <div style={{ position: "absolute", left: 120, top: 120, width: 860 }}>
        <Label color={C.sand}>20 · Rangkuman akhir</Label>
        <h1 style={{ fontFamily: FONT.display, fontSize: 108, lineHeight: 0.9, fontWeight: 600, letterSpacing: "-0.025em", color: C.sand, margin: "34px 0 0" }}>
          Administrasi<br />membuat sistem<br /><span style={{ color: C.tangOnDark }}>bisa melayani.</span>
        </h1>
      </div>
      <div style={{ position: "absolute", right: 130, top: 142, width: 500 }}>
        <Label color={C.sand}>6 ruang lingkup</Label>
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
          {["SDM", "Keuangan", "Fasilitas & infrastruktur", "Informasi kesehatan", "Kebijakan & peraturan", "Pelayanan kesehatan"].map((x, i) => (
            <div key={x} style={{ display: "flex", gap: 16, alignItems: "center", borderBottom: "1px solid rgba(247,230,208,.32)", paddingBottom: 12 }}>
              <Num color={C.sand} size={24}>{String(i + 1).padStart(2, "0")}</Num>
              <span style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 600, color: C.sand }}>{x}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 120, bottom: 118, maxWidth: 1170 }}>
        <div style={{ width: 180, height: 4, background: C.tang, marginBottom: 24 }} />
        <div style={{ fontFamily: FONT.text, fontSize: 34, lineHeight: 1.25, color: C.sand }}>“Pelayanan kesehatan bukan sekadar pekerjaan, tetapi bentuk pengabdian untuk kehidupan.”</div>
      </div>
      <div style={{ position: "absolute", right: 0, bottom: 0, width: 420, height: 20, background: C.tang }} />
    </DeckSlide>
  );
}
