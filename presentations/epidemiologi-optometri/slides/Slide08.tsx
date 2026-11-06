import { ArrowRight } from "lucide-react";
import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const TERMS = [
  { t: "Tujuan", d: "Epidemiologi ingin mengetahui apa." },
  { t: "Penggunaan", d: "Pengetahuan itu dipakai untuk apa." },
  { t: "Manfaat", d: "Apa yang didapat dari penggunaan itu." },
];

const USES = [
  "Menemukan faktor yang mempengaruhi kesehatan sebagai dasar tindakan.",
  "Menentukan penyebab utama kesakitan, kecacatan, dan kematian untuk prioritas tindakan dan riset.",
  "Mengidentifikasi kelompok penduduk berisiko tinggi.",
  "Mengevaluasi efektivitas program dan upaya pelayanan.",
];

const BENEFITS = [
  "Mengenali dan memahami penyakit serta masalah kesehatan lain.",
  "Melengkapi body of knowledge dan riwayat alamiah penyakit.",
  "Menjadi dasar pengendalian dan penanggulangan.",
];

/** Three words that are not synonyms, then the lists behind two of them. */
export default function Slide08() {
  return (
    <Sheet n={8} section="Penggunaan">
      <Title>Tahu, dipakai, dirasakan.</Title>

      <div style={{ display: "flex", alignItems: "stretch", gap: 26, marginTop: 36 }}>
        {TERMS.map((term, i) => (
          <div key={term.t} style={{ display: "flex", alignItems: "center", gap: 26, flex: 1 }}>
            <div style={{ flex: 1, borderTop: "2px solid " + (i === 2 ? C.lime : C.rule), paddingTop: 14 }}>
              <p style={{ fontFamily: FONT.display, fontSize: 34, lineHeight: 1.1, color: C.ink }}>{term.t}</p>
              <p style={{ marginTop: 6, fontSize: 21, lineHeight: 1.4, color: C.inkFaint }}>{term.d}</p>
            </div>
            {i < 2 ? <ArrowRight size={26} strokeWidth={1.5} color={C.lime} style={{ flex: "none" }} /> : null}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 80, marginTop: 48, flex: 1 }}>
        <div style={{ flex: "1 1 0" }}>
          <Label color={C.lime}>Penggunaan</Label>
          <div style={{ marginTop: 12 }}>
            {USES.map((use, i) => (
              <div
                key={use}
                style={{
                  display: "flex",
                  gap: 18,
                  borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                  padding: "13px 0",
                }}
              >
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkGhost }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 23, lineHeight: 1.4, color: C.inkSoft }}>{use}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: "0 0 600px" }}>
          <Label color={C.lime}>Manfaat</Label>
          <div style={{ marginTop: 12 }}>
            {BENEFITS.map((benefit, i) => (
              <div
                key={benefit}
                style={{
                  display: "flex",
                  gap: 18,
                  borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
                  padding: "13px 0",
                }}
              >
                <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkGhost }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 23, lineHeight: 1.4, color: C.inkSoft }}>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Takeaway>
        Tujuan, penggunaan, dan manfaat bukan sinonim &mdash; urutannya menjelaskan alasan epidemiologi ada.
      </Takeaway>
    </Sheet>
  );
}
