import { TriangleExclamationPoint } from "lucide-react";
import { FONT } from "../theme";
import { Sheet, Head, Label, inkOn } from "../Frame";

const risks = [
  { id: "R1", p: 4, i: 4, score: 16 },
  { id: "R2", p: 3, i: 4, score: 12 },
  { id: "R3", p: 3, i: 4, score: 12 },
  { id: "R4", p: 4, i: 3, score: 12 },
  { id: "R5", p: 2, i: 5, score: 10 },
  { id: "R6", p: 2, i: 5, score: 10 },
  { id: "R7", p: 3, i: 3, score: 9 },
  { id: "R8", p: 3, i: 3, score: 9 },
  { id: "R9", p: 3, i: 3, score: 9 },
  { id: "R10", p: 2, i: 3, score: 6 },
  { id: "R11", p: 2, i: 5, score: 10 },
];

const top = [
  {
    id: "R1",
    score: 16,
    title: "Peserta pilot tidak aktif",
    mitigation:
      "Rekrut 80 untuk target 60; sesi singkat 10–15 menit; pengingat WhatsApp; insentif paket data; fasilitator lokal.",
  },
  {
    id: "R2",
    score: 12,
    title: "Mitra pilot tidak didapat tepat waktu",
    mitigation:
      "Needs assessment 2–3 kandidat sekaligus; target LoI minggu ke-6; cadangan komunitas kampus atau daring.",
  },
  {
    id: "R3",
    score: 12,
    title: "Keterlambatan pengembangan",
    mitigation:
      "Sprint time-boxed; prioritas MoSCoW sehingga fitur should/could bisa ditunda; cadangan ±3 minggu.",
  },
  {
    id: "R4",
    score: 12,
    title: "Ketersediaan anggota tim terbatas",
    mitigation: "Matriks RACI dengan peran cadangan; rapat mingguan; dokumentasi tugas.",
  },
];

const cell = 88;
const originX = 40;
const originY = 40;

function tint(score: number): string {
  if (score <= 5) return "rgba(54,138,120,0.07)";
  if (score <= 11) return "rgba(54,138,120,0.18)";
  return "rgba(54,138,120,0.34)";
}

/** The risk register, drawn as the matrix it is scored on. */
export default function Slide08() {
  const tone = inkOn("void");

  return (
    <Sheet n={8} section="Risiko" ground="void">
      <Head size={84} max={1400}>
        Sebelas risiko, empat di zona tinggi.
      </Head>

      <div style={{ display: "flex", marginTop: 44 }}>
        <div
          role="img"
          aria-label={
            "Matriks risiko lima kali lima: kemungkinan 1 sampai 5 mendatar, dampak 1 sampai 5 menegak. " +
            "R1 pada 4 kali 4, skor 16. R2 dan R3 pada 3 kali 4, skor 12. R4 pada 4 kali 3, skor 12. " +
            "R5, R6, dan R11 pada 2 kali 5, skor 10. R7, R8, dan R9 pada 3 kali 3, skor 9. R10 pada 2 kali 3, skor 6."
          }
          style={{ width: 520, flex: "none", position: "relative", height: 560 }}
        >
          <div style={{ position: "absolute", left: originX, top: 0 }}>
            <Label color={tone.faint}>Dampak ↑</Label>
          </div>

          {[1, 2, 3, 4, 5].map((impact) =>
            [1, 2, 3, 4, 5].map((probability) => {
              const score = impact * probability;
              const here = risks.filter((risk) => risk.p === probability && risk.i === impact);
              return (
                <div
                  key={`${impact}-${probability}`}
                  style={{
                    position: "absolute",
                    left: originX + (probability - 1) * cell,
                    top: originY + (5 - impact) * cell,
                    width: cell,
                    height: cell,
                    background: tint(score),
                    border: `1px solid ${tone.ruleSoft}`,
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                    gap: 4,
                    padding: 6,
                  }}
                >
                  {here.map((risk) => (
                    <span
                      key={risk.id}
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 18,
                        lineHeight: 1.2,
                        color: tone.ink,
                      }}
                    >
                      {risk.id}
                    </span>
                  ))}
                </div>
              );
            }),
          )}

          {[1, 2, 3, 4, 5].map((impact) => (
            <span
              key={`i${impact}`}
              style={{
                position: "absolute",
                left: 0,
                top: originY + (5 - impact) * cell + 32,
                width: 30,
                textAlign: "center",
                fontFamily: FONT.mono,
                fontSize: 18,
                color: tone.faint,
              }}
            >
              {impact}
            </span>
          ))}

          {[1, 2, 3, 4, 5].map((probability) => (
            <span
              key={`p${probability}`}
              style={{
                position: "absolute",
                left: originX + (probability - 1) * cell,
                top: originY + 5 * cell + 10,
                width: cell,
                textAlign: "center",
                fontFamily: FONT.mono,
                fontSize: 18,
                color: tone.faint,
              }}
            >
              {probability}
            </span>
          ))}

          <div style={{ position: "absolute", left: originX, top: originY + 5 * cell + 40 }}>
            <Label color={tone.faint}>Kemungkinan →</Label>
          </div>

          <div
            style={{
              position: "absolute",
              left: originX,
              top: originY + 5 * cell + 78,
              display: "flex",
              gap: 24,
            }}
          >
            {[
              { label: "Rendah 1–5", value: 3 },
              { label: "Sedang 6–11", value: 9 },
              { label: "Tinggi 12–25", value: 16 },
            ].map((band) => (
              <div key={band.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  aria-hidden
                  style={{ width: 16, height: 16, background: tint(band.value), border: `1px solid ${tone.ruleSoft}` }}
                />
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: tone.faint }}>{band.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, marginLeft: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <TriangleExclamationPoint size={20} strokeWidth={1.6} color={tone.accent} />
            <Label color={tone.faint}>Empat risiko tinggi & mitigasinya</Label>
          </div>

          {top.map((risk) => (
            <div
              key={risk.id}
              style={{
                display: "flex",
                gap: 24,
                padding: "18px 0",
                borderTop: `1px solid ${tone.ruleSoft}`,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  flex: "none",
                  border: `1px solid ${tone.rule}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: FONT.mono, fontSize: 26, color: tone.accent }}>{risk.score}</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: FONT.mono, fontSize: 18, color: tone.faint }}>{risk.id}</span>
                  <span style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.25, color: tone.ink }}>
                    {risk.title}
                  </span>
                </div>
                <p style={{ marginTop: 6, fontSize: 21, lineHeight: 1.4, color: tone.soft, maxWidth: 1000 }}>
                  {risk.mitigation}
                </p>
              </div>
            </div>
          ))}

          <p style={{ marginTop: 22, fontSize: 21, lineHeight: 1.5, color: tone.faint, maxWidth: 1040 }}>
            Tujuh risiko lain berada di zona sedang (R5–R11, skor 6–10); mitigasinya tercatat di risk
            register dan direview setiap bulan.
          </p>
        </div>
      </div>
    </Sheet>
  );
}
