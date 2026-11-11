import { Users } from "lucide-react";
import { C, FONT, T } from "../theme";
import { Sheet, Head, Body, Label, inkOn } from "../Frame";

const objectives = [
  {
    code: "1",
    title: "MVP berfungsi & mudah dipakai",
    indicator: "% fitur must-have lulus UAT; skor System Usability Scale",
    target: "100% pada minggu 23; SUS ≥ 68",
  },
  {
    code: "2",
    title: "Bank latihan berkualitas",
    indicator: "Kasus lulus review ganda oleh 2 reviewer, bersumber jelas",
    target: "≥ 40 kasus pada minggu 15",
  },
  {
    code: "3",
    title: "Keterampilan verifikasi naik",
    indicator: "Selisih skor pre-test dan post-test; tingkat penyelesaian",
    target: "p < 0,05 pada ≥ 60 peserta; selesai ≥ 70%",
  },
  {
    code: "4",
    title: "Keberlanjutan pasca-grant",
    indicator: "Kelengkapan paket serah terima; kesepakatan mitra",
    target: "100% lengkap; ≥ 1 LoI/MoU",
  },
];

const cols = "72px 348px 548px 1fr";

/** What the grant buys, stated as four measurable objectives. */
export default function Slide05() {
  const tone = inkOn("mist");

  return (
    <Sheet n={5} section="Tujuan" ground="mist">
      <Head max={1300}>Empat tujuan, empat angka.</Head>

      <Body size={30} color={tone.soft} lh={1.4} max={1360} style={{ marginTop: 24 }}>
        Setiap tujuan punya indikator dan target yang diverifikasi lewat log sistem, kuesioner, dan uji
        statistik.
      </Body>

      <div style={{ marginTop: 52 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: cols,
            columnGap: 32,
            paddingBottom: 14,
            borderBottom: `1px solid ${tone.rule}`,
          }}
        >
          {["No", "Tujuan", "Indikator", "Target"].map((head) => (
            <Label key={head} color={tone.faint} size={T.micro}>
              {head}
            </Label>
          ))}
        </div>

        {objectives.map((objective) => (
          <div
            key={objective.code}
            style={{
              display: "grid",
              gridTemplateColumns: cols,
              columnGap: 32,
              padding: "34px 0 32px",
              borderBottom: `1px solid ${tone.ruleSoft}`,
            }}
          >
            <span style={{ fontFamily: FONT.mono, fontSize: 22, color: tone.accent, lineHeight: 1.35 }}>
              {objective.code}
            </span>
            <span
              style={{
                fontFamily: FONT.text,
                fontWeight: 600,
                fontSize: 26,
                lineHeight: 1.3,
                color: tone.ink,
              }}
            >
              {objective.title}
            </span>
            <span style={{ fontSize: 22, lineHeight: 1.45, color: tone.soft }}>{objective.indicator}</span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 21,
                lineHeight: 1.5,
                color: tone.ink,
              }}
            >
              {objective.target}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 18,
          background: C.emeraldDeep,
          padding: "20px 26px 22px",
        }}
      >
        <Users size={24} strokeWidth={1.6} color={C.mist} style={{ flex: "none" }} />
        <p style={{ fontSize: 22, lineHeight: 1.5, color: C.mist, maxWidth: 1560 }}>
          <span style={{ fontWeight: 600 }}>80 peserta direkrut</span> untuk 60 peserta aktif dan 51 data
          lengkap — asumsi efek 0,4; α 5%; power 80%; drop-out 25%.
        </p>
      </div>
    </Sheet>
  );
}
