import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const POINTS = [
  {
    no: "01",
    t: "Definisi",
    d: "Cara mempelajari masalah kesehatan pada populasi: pola, faktor, dasar tindakan.",
  },
  { no: "02", t: "Lima pertanyaan", d: "Apa, siapa, di mana, kapan, mengapa." },
  {
    no: "03",
    t: "Empat tahap",
    d: "Amati (Hipocrates), hitung (Graunt), kaji (Farr & Snow), uji (Lind & Jenner).",
  },
  { no: "04", t: "Fokus", d: "Populasi, bukan individu; semua penyakit, bukan hanya wabah." },
  { no: "05", t: "Tujuan & lingkup", d: "Tahu \u2192 dipakai \u2192 dirasakan; delapan bidang." },
  { no: "06", t: "Triad", d: "Host\u2013Agent\u2013Environment: seimbang, tidak sakit; miring, penyakit." },
];

/** The closing checklist. */
export default function Slide18() {
  return (
    <Sheet n={18} section="Penutup">
      <Title>Enam hal yang harus dibawa pulang.</Title>

      <div style={{ marginTop: 30, flex: 1 }}>
        {POINTS.map((point, i) => (
          <div
            key={point.no}
            style={{
              display: "grid",
              gridTemplateColumns: "50px 330px 1fr",
              gap: 24,
              alignItems: "baseline",
              borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
              padding: "15px 0",
            }}
          >
            <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.lime }}>{point.no}</span>
            <p style={{ fontFamily: FONT.display, fontSize: 32, lineHeight: 1.08, color: C.ink }}>{point.t}</p>
            <p style={{ fontSize: 22, lineHeight: 1.4, color: C.inkSoft }}>{point.d}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "2px solid " + C.lime,
          paddingTop: 16,
          marginTop: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 40,
        }}
      >
        <p style={{ fontFamily: FONT.display, fontSize: 34, lineHeight: 1.1, color: C.ink, maxWidth: 1100 }}>
          Di optometri: turunkan kasus baru, cegah kebutaan, tingkatkan kualitas hidup.
        </p>
        <Label color={C.inkGhost}>Sumber: Rangkuman Epidemiologi</Label>
      </div>
    </Sheet>
  );
}
