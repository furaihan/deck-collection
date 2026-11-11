import { Flag } from "lucide-react";
import { FONT, T } from "../theme";
import { Sheet, Head, Label, inkOn } from "../Frame";

const months = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"];

const plan = [
  { label: "Requirement & stakeholder (1.1–1.2)", start: 1, end: 3 },
  { label: "Perencanaan sistem (1.3)", start: 1, end: 1 },
  { label: "Desain sistem (2.1)", start: 2, end: 3 },
  { label: "Pengembangan, 4 sprint (2.2)", start: 3, end: 6, key: true },
  { label: "Pengujian & UAT (2.3)", start: 5, end: 6 },
  { label: "Kurasi konten (3.1)", start: 2, end: 4 },
  { label: "Asesmen belajar (3.2)", start: 3, end: 4 },
  { label: "Pilot 4 minggu (4.1–4.2)", start: 7, end: 8, key: true },
  { label: "Evaluasi & diseminasi (5.1–5.2)", start: 8, end: 9 },
  { label: "Penutupan (5.3)", start: 9, end: 9 },
  { label: "Manajemen proyek (6)", start: 1, end: 9 },
];

const milestones = [
  { code: "MS1", week: "Minggu 1", label: "Kick-off & charter disahkan" },
  { code: "MS2", week: "Minggu 6", label: "Mitra pilot terkonfirmasi (LoI)" },
  { code: "MS3", week: "Minggu 9", label: "SRS & user stories ditandatangani" },
  { code: "MS4", week: "Minggu 15", label: "Instrumen & ≥ 40 kasus siap" },
  { code: "MS5", week: "Minggu 23", label: "Rilis CekFakta Warga v1.0" },
  { code: "MS6", week: "Minggu 30", label: "Pilot selesai, data lengkap" },
  { code: "MS7", week: "Minggu 33", label: "Laporan evaluasi" },
  { code: "MS8", week: "Minggu 36", label: "Proyek ditutup" },
];

const labelW = 420;
const colW = 145;
const chartW = colW * 9;
const rowH = 34;

/** The schedule: eleven workstreams across nine months, eight milestones. */
export default function Slide06() {
  const tone = inkOn("void");

  return (
    <Sheet n={6} section="Jadwal" ground="void">
      <Head size={T.h1Sm} max={1400}>
        Sembilan bulan, delapan milestone.
      </Head>

      <div
        role="img"
        aria-label={
          "Gantt sembilan bulan. Requirement & stakeholder M1 sampai M3; Perencanaan sistem M1; " +
          "Desain sistem M2 sampai M3; Pengembangan empat sprint M3 sampai M6; Pengujian & UAT M5 sampai M6; " +
          "Kurasi konten M2 sampai M4; Asesmen belajar M3 sampai M4; Pilot empat minggu M7 sampai M8; " +
          "Evaluasi & diseminasi M8 sampai M9; Penutupan M9; Manajemen proyek M1 sampai M9."
        }
        style={{ marginTop: 52, width: labelW + chartW }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div style={{ width: labelW }}>
            <Label color={tone.faint}>Aktivitas</Label>
          </div>
          {months.map((month) => (
            <div key={month} style={{ width: colW, textAlign: "center" }}>
              <Label color={tone.faint}>{month}</Label>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: tone.rule, marginTop: 12 }} />

        <div style={{ position: "relative" }}>
          {months.map((month, i) => (
            <div
              key={month}
              aria-hidden
              style={{
                position: "absolute",
                left: labelW + i * colW,
                top: 0,
                width: 1,
                height: plan.length * rowH,
                background: tone.ruleSoft,
              }}
            />
          ))}

          {plan.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                height: rowH,
                borderTop: i === 0 ? "none" : `1px solid ${tone.ruleSoft}`,
              }}
            >
              <div style={{ width: labelW, fontSize: 21, lineHeight: 1.2, color: tone.ink }}>
                {row.label}
              </div>
              <div style={{ position: "relative", width: chartW, height: rowH }}>
                <div
                  style={{
                    position: "absolute",
                    left: (row.start - 1) * colW + 4,
                    top: 11,
                    width: (row.end - row.start + 1) * colW - 8,
                    height: 11,
                    background: row.key ? tone.accent : tone.signal,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto", flex: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Flag size={20} strokeWidth={1.6} color={tone.accent} />
          <Label color={tone.faint}>Milestone</Label>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            columnGap: 28,
            rowGap: 16,
          }}
        >
          {milestones.map((milestone) => (
            <div
              key={milestone.code}
              style={{ borderTop: `1px solid ${tone.ruleSoft}`, paddingTop: 12 }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: tone.accent }}>
                  {milestone.code}
                </span>
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: tone.faint }}>
                  {milestone.week}
                </span>
              </div>
              <div style={{ marginTop: 6, fontSize: 21, lineHeight: 1.3, color: tone.ink }}>
                {milestone.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}
