import { C, FONT, T } from "../theme";
import { DotGrid, Label, Sheet } from "../Frame";

/** Cover: the title, and the deck's opening datum — twenty lit cells out of a hundred. */
export default function Slide01() {
  return (
    <Sheet n={1} section="Sampul" bare>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "64px 120px 72px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 9, height: 9, background: C.lime, flex: "none" }} aria-hidden />
            <Label color={C.inkFaint}>Kuliah epidemiologi</Label>
          </div>
          <Label color={C.inkGhost}>Optometri &middot; 2026</Label>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 96 }}>
          <div style={{ flex: 1, maxWidth: 980 }}>
            <h1
              style={{
                fontFamily: FONT.display,
                fontWeight: 600,
                fontSize: T.cover,
                lineHeight: 0.9,
                letterSpacing: "-0.015em",
                color: C.ink,
              }}
            >
              Epidemiologi:
              <br />
              Pola, Penyebab,
              <br />
              Tindakan
            </h1>

            <div style={{ width: 180, height: 4, background: C.lime, margin: "40px 0 30px" }} />

            <p style={{ fontFamily: FONT.text, fontSize: 34, lineHeight: 1.45, color: C.inkSoft, maxWidth: 760 }}>
              Membaca masalah kesehatan pada populasi &mdash; lalu menentukan apa yang harus dilakukan.
            </p>
          </div>

          <div style={{ flex: "none", width: 470 }}>
            <div style={{ border: "1px solid " + C.rule, background: C.surface, padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                <Label color={C.inkFaint}>Kasus pembuka</Label>
                <Label color={C.lime}>20%</Label>
              </div>

              <DotGrid size={30} gap={7} />

              <div style={{ marginTop: 26, display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: FONT.display, fontSize: 64, lineHeight: 0.9, color: C.ink }}>20</span>
                <span style={{ fontFamily: FONT.mono, fontSize: 20, color: C.inkFaint }}>/ 100 siswa SD</span>
              </div>
              <p style={{ marginTop: 10, fontSize: 24, lineHeight: 1.35, color: C.inkSoft }}>
                mengalami miopia. Cukupkah?
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid " + C.rule,
            paddingTop: 22,
          }}
        >
          <Label color={C.inkGhost}>Program Optometri</Label>
          <Label color={C.inkGhost}>6 November 2026</Label>
        </div>
      </div>
    </Sheet>
  );
}
