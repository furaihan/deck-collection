import { C, FONT, T } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const BERKAS = [
  { no: "01", word: "Sistem kesehatan", sub: "Perpres 72/2012" },
  { no: "02", word: "Perencanaan", sub: "RPJPN → RPJP-K" },
  { no: "03", word: "Administrasi", sub: "ruang lingkup klinik" },
];

/** Cover: the title, and the three files as three numerals. Nothing else. */
export default function Slide01() {
  return (
    <Sheet n={1} section="Berkas Rujukan" cite="Perpres 72/2012">
      <div className="flex flex-1" style={{ gap: 76, alignItems: "center" }}>
        <div style={{ flex: 1, maxWidth: 900 }}>
          <Title size={T.cover} lineHeight={0.95} max={880}>
            Administrasi Kesehatan &amp; Sistem Rujukan
          </Title>

          <div style={{ width: 168, height: 4, background: C.pink, margin: "44px 0 32px" }} />

          <p style={{ fontSize: 34, lineHeight: 1.4, color: C.inkSoft, maxWidth: 720 }}>
            Tiga berkas kuliah. Satu jalur pasien.
          </p>

          <div style={{ display: "flex", gap: 52, marginTop: 52 }}>
            <Label>Optometri &middot; Semester 3</Label>
            <Label>6 November 2026</Label>
          </div>
        </div>

        <div style={{ flex: "none", width: 560 }}>
          {BERKAS.map((b, i) => (
            <div
              key={b.no}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 26,
                paddingTop: 24,
                paddingBottom: 24,
                borderTop: i === 0 ? "2px solid " + C.ink : "1px solid " + C.rule,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 46,
                  lineHeight: 0.9,
                  color: C.pink,
                  fontVariantNumeric: "tabular-nums",
                  width: 74,
                  flex: "none",
                }}
              >
                {b.no}
              </span>
              <div>
                <p style={{ fontSize: 34, color: C.ink, lineHeight: 1.15 }}>{b.word}</p>
                <p style={{ fontSize: 19, color: C.inkGhost, marginTop: 8, letterSpacing: "0.02em" }}>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
