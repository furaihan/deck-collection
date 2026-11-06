import { C } from "../theme";
import { Sheet, Title } from "../Frame";

const PENJABARAN = [
  ["Palang hijau", "Pelayanan kesehatan"],
  ["Wijaya Kusuma, 5 mahkota", "Panca Karsa Husada"],
  ["Kelopak daun", "Panca Karya Husada"],
  ["Garis bulat telur", "Kebulatan tekad"],
  ["Logo", "Pengabdian paripurna"],
];

/** The emblem drawn as geometry, with a five-line key. */
function Emblem() {
  const cx = 250;
  const cy = 250;
  return (
    <svg width="420" height="420" viewBox="0 0 500 500" aria-hidden>
      <ellipse cx={cx} cy={cy} rx="196" ry="232" fill="none" stroke="rgba(255,244,248,0.45)" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx="176" ry="210" fill="none" stroke="rgba(255,244,248,0.18)" strokeWidth="1" />
      {[-56, 0, 56, 112, 168].map((deg) => {
        const a = ((deg - 90) * Math.PI) / 180;
        const px = cx + Math.cos(a) * 118;
        const py = cy + Math.sin(a) * 128;
        return (
          <ellipse
            key={deg}
            cx={px}
            cy={py}
            rx="34"
            ry="58"
            fill="none"
            stroke="rgba(255,244,248,0.62)"
            strokeWidth="2"
            transform={"rotate(" + deg + " " + px + " " + py + ")"}
          />
        );
      })}
      <rect x={cx - 24} y={cy - 82} width="48" height="164" fill="#FFFFFF" opacity="0.92" />
      <rect x={cx - 82} y={cy - 24} width="164" height="48" fill="#FFFFFF" opacity="0.92" />
    </svg>
  );
}

export default function Slide08() {
  return (
    <Sheet n={8} section="Sistem Kesehatan Nasional" cite="2 November 1984" tone="pink" line={false}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={880} color={C.onPink}>
          Lambang Bakti Husada
        </Title>
        <p style={{ fontSize: 24, color: C.onPinkFaint }}>
          bakti = pengabdian &middot; husada = kesehatan
        </p>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 26, flex: 1 }}>
        <div style={{ flex: "none", width: 430 }}>
          <Emblem />
          <p style={{ fontSize: 17, color: C.onPinkFaint, lineHeight: 1.45, maxWidth: 400, marginTop: 4 }}>
            Skema unsur, bukan reproduksi. Ditetapkan 2 November 1984 — dr. Suwardjono Surjaningrat.
          </p>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingBottom: 8 }}>
          {PENJABARAN.map(([part, mean], i) => (
            <div
              key={part}
              style={{
                display: "flex",
                flex: 1,
                gap: 28,
                alignItems: "center",
                borderTop: "1px solid " + (i === 0 ? "rgba(255,244,248,0.30)" : "rgba(255,244,248,0.18)"),
              }}
            >
              <span style={{ width: 380, flex: "none", fontSize: 26, fontWeight: 600, color: C.onPink, lineHeight: 1.2 }}>
                {part}
              </span>
              <span style={{ fontSize: 26, color: C.onPinkSoft, lineHeight: 1.25 }}>{mean}</span>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
