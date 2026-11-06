import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title } from "../Frame";

const STEPS = [
  { no: "01", t: "Identifikasi masalah", d: "Apa yang terjadi, dan siapa yang terkena." },
  { no: "02", t: "Ukur besarnya", d: "Seberapa besar masalahnya, di populasi mana." },
  { no: "03", t: "Tentukan prioritas", d: "Mana yang paling mendesak untuk ditangani." },
  { no: "04", t: "Cari faktor", d: "Penyebab atau faktor yang berhubungan." },
  { no: "05", t: "Rencanakan intervensi", d: "Apa yang bisa dilakukan." },
  { no: "06", t: "Laksanakan", d: "Jalankan rencana." },
  { no: "07", t: "Evaluasi", d: "Apakah masalahnya berubah?" },
];

/** The seven-step protocol as a vertical field path. */
export default function Slide10() {
  return (
    <Sheet n={10} section="Langkah">
      <Title>Tujuh langkah dari masalah ke evaluasi.</Title>

      <div style={{ position: "relative", marginTop: 40 }}>
        <div aria-hidden style={{ position: "absolute", left: 7, top: 10, bottom: 10, width: 1, background: C.rule }} />
        {STEPS.map((step, i) => (
          <div
            key={step.no}
            style={{
              display: "flex",
              gap: 26,
              alignItems: "baseline",
              padding: "13px 0",
              position: "relative",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 15,
                height: 15,
                background: i === 6 ? C.lime : C.ground,
                border: "1px solid " + (i === 6 ? C.lime : C.inkFaint),
                flex: "none",
                position: "relative",
                zIndex: 1,
              }}
            />
            <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkGhost, width: 34, flex: "none" }}>
              {step.no}
            </span>
            <p style={{ width: 380, flex: "none", fontFamily: FONT.display, fontSize: 33, lineHeight: 1.05, color: C.ink }}>
              {step.t}
            </p>
            <p style={{ flex: 1, fontSize: 23, lineHeight: 1.4, color: C.inkSoft }}>{step.d}</p>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ borderTop: "1px solid " + C.rule, paddingTop: 12 }}>
        <Label color={C.inkGhost}>Urutan mengikuti daftar pada materi.</Label>
      </div>

      <Takeaway>Evaluasi menutup lingkaran: hasilnya menjadi masalah berikutnya.</Takeaway>
    </Sheet>
  );
}
