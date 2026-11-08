import { Check, X } from "lucide-react";
import { C, FONT } from "../theme";
import { Sheet, Takeaway, Title, inkOn } from "../Frame";

const CR = {
  good: ["Ringan", "Tahan benturan", "Kelembaman kimia", "Tahan berlubang", "Tahan berkabut", "Dapat diwarnai", "Lentur dalam desain optik"],
  bad: ["Permukaan mudah tergores", "Ketebalan meningkat", "Fotokromik rendah", "Indeks berubah karena suhu"],
};

const POLY = {
  good: ["Lebih datar", "Lebih ringan", "Tahan benturan", "Menyerap UV sampai 380 nm"],
  bad: ["Permukaan mudah tergores", "Abbe rendah: dispersi tinggi", "Aberasi kromatis saat melirik", "Bayangan buram di tepi", "Perlakuan khusus saat injeksi"],
};

const NUMBERS = [
  { label: "Indeks bias", cr: "1,498", poly: "1,586" },
  { label: "Nilai Abbe", cr: "58", poly: "30" },
  { label: "Berat jenis", cr: "1,32", poly: "1,20" },
];

/** One column per plastic: the same four questions asked of both. */
function Column({
  name,
  tone,
  good,
  bad,
  accent,
}: {
  name: string;
  tone: ReturnType<typeof inkOn>;
  good: string[];
  bad: string[];
  accent: string;
}) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ borderTop: `3px solid ${accent}`, paddingTop: 12, display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontFamily: FONT.display, fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", color: tone.ink }}>
          {name}
        </span>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 7 }}>
        {good.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <Check size={18} strokeWidth={2.25} color={tone.amber} style={{ flex: "none", position: "relative", top: 2 }} />
            <span style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.35, color: tone.soft }}>{item}</span>
          </div>
        ))}
        {bad.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <X size={18} strokeWidth={2.25} color={tone.clay} style={{ flex: "none", position: "relative", top: 2 }} />
            <span style={{ fontFamily: FONT.text, fontSize: 23, lineHeight: 1.35, color: tone.faint }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The closing sheet: the two plastics side by side, the three numbers that
 * decide between them, and the one comparison the lecture insists on.
 */
export default function Slide20() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={20} part="Bagian IV · Lensa plastik">
      <Title max={1400}>Dua plastik, satu keputusan</Title>

      <div style={{ display: "flex", gap: 56, marginTop: 34 }}>
        <Column name="CR-39" tone={tone} good={CR.good.slice(0, 4)} bad={CR.bad.slice(0, 4)} accent={tone.amber} />
        <Column name="Polikarbonat" tone={tone} good={POLY.good} bad={POLY.bad} accent={C.teal} />
        <div style={{ flex: 0.85 }}>
          <div style={{ borderTop: `3px solid ${tone.rule}`, paddingTop: 12 }}>
            <span
              style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: tone.faint }}
            >
              Angka yang dipakai
            </span>
          </div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column" }}>
            {NUMBERS.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 0.55fr 0.55fr",
                  gap: 12,
                  alignItems: "baseline",
                  padding: "10px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${tone.ruleSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT.text, fontSize: 21, color: tone.soft }}>{row.label}</span>
                <span style={{ fontFamily: FONT.mono, fontSize: 23, textAlign: "right", color: tone.ink }}>{row.cr}</span>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 23,
                    textAlign: "right",
                    color: i === 1 ? tone.clay : tone.ink,
                  }}
                >
                  {row.poly}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, borderTop: `1px solid ${tone.rule}`, paddingTop: 12 }}>
            <p style={{ fontFamily: FONT.text, fontSize: 22, lineHeight: 1.42, color: tone.soft }}>
              CR-39 masih dipakai sebagai patokan; polikarbonat dipilih saat benturan adalah risiko
              nyata.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
        {[
          ["Kaca", "Tahan gores, Abbe tinggi, berat, mudah pecah."],
          ["CR-39", "Ringan, tahan bentur, Abbe 58, permukaan lunak."],
          ["Polikarbonat", "Paling kuat, Abbe 30, UV hampir 100%, wajib hard coat."],
        ].map(([head, sub]) => (
          <div key={head} style={{ borderLeft: `4px solid ${C.amber}`, paddingLeft: 16 }}>
            <div style={{ fontFamily: FONT.display, fontSize: 25, fontWeight: 600, color: tone.ink }}>{head}</div>
            <div style={{ marginTop: 4, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.4, color: tone.soft }}>{sub}</div>
          </div>
        ))}
      </div>

      <Takeaway tone={tone}>
        Perbandingan bahan harus didasarkan pada kriteria yang diukur. Abbe rendah berarti dispersi
        besar — dan dispersi besar adalah aberasi kromatis.
      </Takeaway>
    </Sheet>
  );
}
