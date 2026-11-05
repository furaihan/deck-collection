import { Film, Title, Label, Numeral, Kicker } from "../Frame";
import { C, FONT, LIT } from "../theme";

/** 300-500 nm mapped linearly onto the 700 px the frame gives the axis. */
const AXIS_W = 700;
const LAMBDA_MIN = 300;
const LAMBDA_SPAN = 200;
const xOf = (nm: number) => ((nm - LAMBDA_MIN) / LAMBDA_SPAN) * AXIS_W;

const TICKS = [300, 350, 390, 450, 500];

function UVAxis() {
  return (
    <svg width={AXIS_W} height="150" viewBox="0 0 700 150" aria-hidden>
      <defs>
        <linearGradient id="uvBand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.amber} />
          <stop offset="100%" stopColor={C.amberHigh} />
        </linearGradient>
      </defs>
      <rect x="0" y="18" width={xOf(390)} height="44" fill="url(#uvBand)" />
      <rect x={xOf(390)} y="18" width={AXIS_W - xOf(390)} height="44" fill="rgba(20,21,24,0.08)" />
      <line x1={xOf(390)} y1="6" x2={xOf(390)} y2="86" stroke={C.ink} strokeWidth="2.5" />
      {TICKS.map((nm) => (
        <g key={nm}>
          <line x1={xOf(nm)} y1="62" x2={xOf(nm)} y2={nm === 390 ? 90 : 74} stroke={nm === 390 ? C.ink : C.rule} strokeWidth="1.5" />
          <text
            x={xOf(nm)}
            y="112"
            fill={nm === 390 ? C.ink : C.inkFaint}
            fontFamily={FONT.mono}
            fontSize="17"
            textAnchor={nm === 500 ? "end" : nm === 300 ? "start" : "middle"}
          >
            {nm === 500 ? "500 nm" : nm}
          </text>
        </g>
      ))}
      <text x="0" y="140" fill={C.inkSoft} fontFamily={FONT.mono} fontSize="16">diserap</text>
      <text x={xOf(390) + 12} y="140" fill={C.inkSoft} fontFamily={FONT.mono} fontSize="16">diteruskan</text>
    </svg>
  );
}

export default function Slide15() {
  return (
    <Film n={15} section="02 · Sifat optik" accent="Penyerapan UV" foot="Angka batas serapan polikarbonat ditulis 380 nm di satu berkas dan 390 nm di berkas lain.">
      <div style={{ flex: "none" }}>
        <Title size={72} max={1240}>Polikarbonat berhenti di 390 nanometer</Title>
      </div>

      <div className="flex" style={{ gap: 44, marginTop: 28, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {[
              { label: "Polikarbonat", v: 100, display: "~100%", hot: true },
              { label: "CR-39 tanpa lapisan", v: 90, display: "~90%" },
              { label: "Kaca bening", v: 18, display: "rendah" },
            ].map((b) => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 270, flex: "none", fontFamily: FONT.text, fontSize: 27, color: b.hot ? C.ink : C.inkSoft, fontWeight: b.hot ? 600 : 400 }}>
                  {b.label}
                </div>
                <div
                  style={{
                    width: `${Math.max(6, (b.v / 100) * 62)}%`,
                    height: 56,
                    flex: "none",
                    background: b.hot
                      ? LIT.barHot
                      : LIT.bar,
                    boxShadow: b.hot
                      ? "0 12px 24px rgba(180,120,30,0.32), 0 1px 0 rgba(255,255,255,0.5) inset"
                      : "0 12px 24px rgba(20,21,24,0.26), 0 1px 0 rgba(255,255,255,0.13) inset",
                  }}
                />
                <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: b.hot ? C.ink : C.inkSoft }}>
                  {b.display}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Label size={16}>Batas serapan</Label>
            <UVAxis />
          </div>

        </div>

        <div style={{ width: 540, flex: "none", display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: LIT.plateInk,
              boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 26px 46px rgba(20,21,24,0.40)",
              padding: "24px 26px",
            }}
          >
            <Label size={16} color={C.amber}>Kenapa penting</Label>
            <div style={{ marginTop: 10, fontFamily: FONT.display, fontWeight: 700, fontSize: 34, lineHeight: 1.12, color: C.paper }}>
              Radiasi UV berperan pada pterigia dan katarak.
            </div>
            <div style={{ marginTop: 10, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.45, color: C.onInk }}>
              Lensa yang menyerapnya adalah alat kesehatan, bukan sekadar alat bantu lihat.
            </div>
          </div>

          <div
            style={{
              background: LIT.plateFlat,
              boxShadow: "0 0 0 1px rgba(20,21,24,0.13)",
              padding: "18px 24px",
            }}
          >
            <div style={{ fontFamily: FONT.text, fontSize: 21, lineHeight: 1.45, color: C.inkSoft }}>
              Lensa plastik dan polikarbonat tetap perlu lapisan pelindung UV untuk
              menahan degradasi warna bahan. Kaca bening justru sering meneruskan
              UVA tanpa banyak berkurang.
            </div>
          </div>
        </div>
      </div>
    </Film>
  );
}