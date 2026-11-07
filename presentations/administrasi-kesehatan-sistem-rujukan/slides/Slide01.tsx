import { C, FONT, T } from "../theme";
import { DeckSlide, Label, Lead } from "../Frame";

export default function Slide01() {
  return (
    <DeckSlide n={1} section="PEMBUKA" bare>
      <div style={{ position: "absolute", inset: 0, background: C.sand }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: 740, height: 1080, background: C.berry }} />
      <div style={{ position: "absolute", right: 118, top: 138, width: 370, height: 370, border: "2px solid " + C.coral, transform: "rotate(45deg)" }} />
      <div style={{ position: "absolute", right: 190, top: 210, width: 225, height: 225, background: C.coral, transform: "rotate(45deg)" }} />
      <div style={{ position: "absolute", left: 120, top: 92 }}>
        <Label color={C.berry}>Rangkuman materi · Optometri</Label>
      </div>
      <div style={{ position: "absolute", left: 120, top: 248, width: 1120 }}>
        <h1 style={{ fontFamily: FONT.display, fontSize: T.cover, lineHeight: 0.92, letterSpacing: "-0.025em", fontWeight: 600, color: C.ink, margin: 0 }}>
          Administrasi<br />Kesehatan <span style={{ color: C.berry }}>&amp;</span><br />Sistem Rujukan
        </h1>
        <div style={{ marginTop: 42, width: 820 }}>
          <Lead>Bagaimana kebijakan, sumber daya, dan kolaborasi membentuk layanan kesehatan yang terintegrasi — dari SKN sampai praktik optometri.</Lead>
        </div>
      </div>
      <div style={{ position: "absolute", left: 120, bottom: 98, display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ width: 160, height: 3, background: C.tang }} />
        <Label color={C.ink}>20 pokok pembelajaran</Label>
      </div>
      <div style={{ position: "absolute", right: 92, bottom: 96, color: C.sand, width: 460 }}>
        <Label color={C.sand}>Gagasan utama</Label>
        <div style={{ fontFamily: FONT.display, fontSize: 54, lineHeight: 0.98, marginTop: 14, fontWeight: 600 }}>Pelayanan adalah pengabdian.</div>
      </div>
    </DeckSlide>
  );
}
