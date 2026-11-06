import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { C } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const INDICATORS = [
  { text: "Kasus baru gangguan penglihatan / kebutaan", dir: "down" as const },
  { text: "Kasus baru yang dapat dicegah", dir: "down" as const },
  { text: "Kecacatan akibat gangguan fungsi penglihatan", dir: "down" as const },
  { text: "Kualitas hidup", dir: "up" as const },
];

const EXAMPLES = [
  "Skrining mata di sekolah",
  "Edukasi 20-20-20",
  "Penelitian perilaku penggunaan gadget",
  "Monitoring kepatuhan penggunaan kacamata",
  "Data distribusi tenaga optometris di Indonesia",
  "Evaluasi program kesehatan mata",
  "Analisis faktor risiko",
];

/** Success is a direction of movement, not a list of activities. */
export default function Slide13() {
  return (
    <Sheet n={13} section="Optometri">
      <Title>Ukur keberhasilan, bukan hanya kegiatan.</Title>

      <div style={{ display: "flex", gap: 90, marginTop: 44, flex: 1 }}>
        <div style={{ flex: "1 1 0" }}>
          <Label color={C.lime}>Indikator</Label>
          <div style={{ marginTop: 12 }}>
            {INDICATORS.map((item, i) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  gap: 18,
                  alignItems: "center",
                  borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                  padding: "18px 0",
                }}
              >
                {item.dir === "down" ? (
                  <ArrowDownRight size={30} strokeWidth={1.5} color={C.lime} style={{ flex: "none" }} />
                ) : (
                  <ArrowUpRight size={30} strokeWidth={1.5} color={C.lime} style={{ flex: "none" }} />
                )}
                <p style={{ fontSize: 25, lineHeight: 1.35, color: C.inkSoft }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: "0 0 720px" }}>
          <Label color={C.lime}>Contoh penerapan</Label>
          <div style={{ marginTop: 12 }}>
            {EXAMPLES.map((example, i) => (
              <div
                key={example}
                style={{
                  display: "flex",
                  gap: 16,
                  borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                  padding: "10px 0",
                }}
              >
                <span style={{ width: 6, height: 6, background: C.teal, marginTop: 10, flex: "none" }} aria-hidden />
                <p style={{ fontSize: 22, lineHeight: 1.35, color: C.inkSoft }}>{example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Takeaway>Program yang baik meninggalkan angka yang bergerak.</Takeaway>
    </Sheet>
  );
}
