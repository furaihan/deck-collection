import { Focus } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { DataTable, Figure, Sheet, Takeaway, Title, inkOn } from "../Frame";
import prism from "../assets/prism.jpg";

const RAYS = [
  { y: 46, x2: 452, color: C.tintCobalt },
  { y: 62, x2: 500, color: C.teal },
  { y: 78, x2: 548, color: C.clay },
];

/** A lens in section, on its axis, with three colours meeting three foci. */
function ChromaticDiagram() {
  const tone = inkOn("chalk");
  return (
    <svg viewBox="0 0 620 210" width="100%" height="196" role="img" aria-label="Lensa dalam potongan: tiga warna berfokus pada jarak berbeda">
      <line x1="0" y1="105" x2="620" y2="105" stroke={tone.rule} strokeDasharray="5 6" strokeWidth="1.5" />
      <path d="M 92 28 Q 126 105 92 182 L 58 182 Q 92 105 58 28 Z" fill={C.chalkDeep} stroke={tone.ink} strokeWidth="2.5" />
      {RAYS.map((ray) => (
        <g key={ray.x2}>
          <line x1="4" y1={ray.y + 32} x2="74" y2={ray.y + 32} stroke={ray.color} strokeWidth="2.5" />
          <line x1="94" y1={ray.y + 32} x2={ray.x2} y2="105" stroke={ray.color} strokeWidth="2.5" />
          <circle cx={ray.x2} cy="105" r="5.5" fill={ray.color} />
        </g>
      ))}
      <text x="430" y="146" fill={C.tintCobalt} fontFamily={FONT.mono} fontSize="14">
        f biru
      </text>
      <text x="464" y="170" fill={C.teal} fontFamily={FONT.mono} fontSize="14">
        f hijau
      </text>
      <text x="500" y="194" fill={C.clayDeep} fontFamily={FONT.mono} fontSize="14">
        f merah
      </text>
      <text x="4" y="192" fill={tone.faint} fontFamily={FONT.mono} fontSize="14">
        cahaya putih masuk
      </text>
    </svg>
  );
}

/**
 * Dispersion is the mechanism; chromatic aberration is the consequence. The
 * diagram puts the three foci on one axis, which is the whole argument.
 */
export default function Slide12() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={12} part={PART.optik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Focus size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1400}>Tiga warna, tiga titik fokus</Title>
      </div>

      <div style={{ display: "flex", gap: 56, marginTop: 22, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: FONT.text, fontSize: 25, lineHeight: 1.4, color: tone.soft, maxWidth: 880 }}>
            Aberasi kromatis terjadi ketika lensa gagal memfokuskan semua warna pada satu titik. Bahan
            dengan Abbe rendah menyebarkan spektrum lebih lebar, dan mata melihatnya sebagai tepi
            berwarna.
          </p>

          <div style={{ marginTop: 10 }}>
            <ChromaticDiagram />
          </div>

          <div style={{ marginTop: 4 }}>
            <DataTable
              tone={tone}
              size={23}
              headSize={17}
              rowPad={10}
              cols={[
                { key: "j", label: "Jenis", width: 0.85 },
                { key: "t", label: "Terjadi bila", width: 1.65 },
                { key: "a", label: "Akibat", width: 1.55 },
              ]}
              rows={[
                [
                  { text: "Aksial" },
                  { text: "Warna berfokus pada jarak berbeda sepanjang sumbu optik" },
                  { text: "Bayangan berwarna pada jarak fokus berbeda" },
                ],
                [
                  { text: "Transversal" },
                  { text: "Panjang gelombang berbeda jatuh di titik berbeda pada bidang fokus sama" },
                  { text: "Ukuran bayangan berubah menurut warna; tepi objek berwarna" },
                ],
              ]}
            />
          </div>
        </div>

        <div style={{ flex: "none", width: 430, display: "flex", flexDirection: "column", gap: 18 }}>
          <Figure
            src={prism}
            alt="Cahaya putih diuraikan prisma menjadi spektrum warna"
            width={430}
            height={416}
            caption="Prisma memperlihatkan dispersi yang sama seperti di dalam lensa. CC0."
            tone={tone}
          />
          <p
            style={{
              borderTop: `3px solid ${C.clay}`,
              paddingTop: 12,
              fontFamily: FONT.text,
              fontSize: 23,
              lineHeight: 1.4,
              color: tone.ink,
            }}
          >
            Polikarbonat (Abbe 30) membuat efek ini paling mudah terlihat saat mata melirik ke pinggir
            lensa.
          </p>
        </div>
      </div>

      <Takeaway tone={tone}>
        Aberasi kromatis bukan cacat permukaan; ia keputusan bahan yang sudah tertanam sejak
        pemilihan indeks.
      </Takeaway>
    </Sheet>
  );
}
