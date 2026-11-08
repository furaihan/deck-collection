import { Boxes, Recycle, Lock } from "lucide-react";
import { C, FONT, PART } from "../theme";
import { Sheet, Takeaway, Title, inkOn } from "../Frame";

const ROWS = [
  { aspect: "Sifat", thermo: "Lebih fleksibel, titik leleh rendah, bisa didaur ulang. Kurang tahan panas, dimensi kurang stabil.", set: "Sekali dibentuk tidak dapat diubah, walau dipanaskan. Tahan api dan solvent, dimensi stabil." },
  { aspect: "Pembentukan", thermo: "Dilunakkan, dipres atau dicetak menjadi bentuk kompleks; saat dingin mengeras dan menyusut. Injection molding.", set: "Disediakan sebagai monomer, dituang ke cetakan, lalu dikeraskan (curing)." },
  { aspect: "Struktur", thermo: "Molekul tersusun pada rangkaian molekul panjang.", set: "Molekul kecil disusun menjadi molekul besar melalui polimerisasi." },
];

const EXAMPLES = [
  { thermo: "PMMA", set: "CR-39 (allyl diglycol carbonate)" },
  { thermo: "Polikarbonat", set: "Epoxy resin" },
  { thermo: "—", set: "Melamine resin" },
];

/**
 * The classification that decides every manufacturing step that follows:
 * thermoplastics melt again, thermosets do not.
 */
export default function Slide18() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={18} part={PART.plastik}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Boxes size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1420}>Meleleh lagi, atau tidak sama sekali</Title>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 1fr", columnGap: 48, marginTop: 36 }}>
        <div />
        <div style={{ borderTop: `3px solid ${C.amber}`, paddingTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <Recycle size={22} strokeWidth={1.75} color={tone.amber} />
          <span style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 600, color: tone.ink }}>Termoplastik</span>
        </div>
        <div style={{ borderTop: `3px solid ${C.teal}`, paddingTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <Lock size={22} strokeWidth={1.75} color={C.teal} />
          <span style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 600, color: tone.ink }}>Termosetting</span>
        </div>

        {ROWS.map((row, i) => (
          <div key={row.aspect} style={{ display: "contents" }}>
            <div
              style={{
                borderTop: `1px solid ${tone.ruleSoft}`,
                padding: "16px 0",
                fontFamily: FONT.mono,
                fontSize: 18,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: i === 0 ? tone.ink : tone.faint,
              }}
            >
              {row.aspect}
            </div>
            <p
              style={{
                borderTop: `1px solid ${tone.ruleSoft}`,
                padding: "16px 0",
                fontFamily: FONT.text,
                fontSize: 23,
                lineHeight: 1.4,
                color: tone.soft,
              }}
            >
              {row.thermo}
            </p>
            <p
              style={{
                borderTop: `1px solid ${tone.ruleSoft}`,
                padding: "16px 0",
                fontFamily: FONT.text,
                fontSize: 23,
                lineHeight: 1.4,
                color: tone.soft,
              }}
            >
              {row.set}
            </p>
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${tone.ruleSoft}`, padding: "16px 0", fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase", color: tone.faint }}>
          Contoh
        </div>
        <div style={{ borderTop: `1px solid ${tone.ruleSoft}`, padding: "16px 0" }}>
          {EXAMPLES.map((example) => (
            <div key={example.thermo} style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.6, color: tone.ink }}>
              {example.thermo}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${tone.ruleSoft}`, padding: "16px 0" }}>
          {EXAMPLES.map((example) => (
            <div key={example.set} style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.6, color: tone.ink }}>
              {example.set}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          gap: 40,
          borderTop: `1px solid ${tone.rule}`,
          paddingTop: 18,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase", color: tone.faint }}>
            Polimer
          </div>
          <p style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: tone.soft }}>
            Molekul besar yang tersusun dari unit struktural lebih kecil, disebut monomer.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase", color: tone.faint }}>
            Polimerisasi
          </div>
          <p style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: tone.soft }}>
            Proses pembentukan polimer dari monomer; salah satu jalurnya polikondensasi.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase", color: tone.faint }}>
            Konsekuensi
          </div>
          <p style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: tone.ink }}>
            CR-39 dicetak sekali; polikarbonat dilelehkan dan diinjeksi.
          </p>
        </div>
      </div>

      <Takeaway tone={tone}>
        Termoplastik dicetak ulang, termosetting dikeraskan sekali. Itu perbedaan yang menentukan
        seluruh lantai produksi.
      </Takeaway>
    </Sheet>
  );
}
