import { HandCoins } from "lucide-react";
import { C, FONT, T } from "../theme";
import { Sheet, Head, Body, Label, Bar, inkOn } from "../Frame";

const labelStyle = {
  fontFamily: FONT.mono,
  fontSize: 18,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  lineHeight: 1.3,
};

const budget = [
  { label: "Pengembangan", amount: "46.425.000", pct: 32.6 },
  { label: "Implementasi lapangan", amount: "41.330.000", pct: 29.0 },
  { label: "Lain-lain & kontingensi", amount: "23.647.413", pct: 16.6 },
  { label: "Diseminasi", amount: "12.290.000", pct: 8.6 },
  { label: "Pelatihan", amount: "10.890.000", pct: 7.6 },
  { label: "Perangkat lunak & cloud", amount: "5.178.630", pct: 3.6 },
  { label: "Perangkat keras", amount: "2.798.000", pct: 2.0 },
];

/** The budget: one total, seven components, and the note that governs it. */
export default function Slide07() {
  const tone = inkOn("mist");

  return (
    <Sheet n={7} section="Anggaran" ground="mist">
      <Head size={T.h1Sm} max={1400}>
        Rp142.559.043 untuk sembilan bulan.
      </Head>

      <div style={{ display: "flex", marginTop: 56 }}>
        <div style={{ width: 420, flex: "none", background: C.jade, padding: "28px 30px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <HandCoins size={20} strokeWidth={1.6} color={C.arcane} />
            <Label color={C.arcane}>Diminta</Label>
          </div>

          <div
            style={{
              marginTop: 18,
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1,
              color: C.void,
            }}
          >
            Rp142.559.043
          </div>

          <div
            style={{
              marginTop: 12,
              fontFamily: FONT.display,
              fontWeight: 600,
              fontSize: 36,
              lineHeight: 1,
              color: C.void,
            }}
          >
            US$7.890
          </div>

          <div style={{ height: 1, background: "rgba(24,35,47,0.22)", marginTop: 26 }} />

          <p style={{ marginTop: 16, fontSize: 20, lineHeight: 1.5, color: C.arcane }}>
            Kurs JISDOR 23 Okt 2026 · Rp18.069/US$
          </p>

          <p style={{ marginTop: 14, fontSize: 22, lineHeight: 1.45, color: C.void, maxWidth: 360 }}>
            Di bawah Solver Award US$10.000 per tim terpilih.
          </p>

          <div style={{ height: 1, background: "rgba(24,35,47,0.22)", marginTop: 26 }} />

          <p style={{ ...labelStyle, marginTop: 16, color: C.arcane }}>Dasar harga satuan</p>
          <p style={{ marginTop: 10, fontSize: 20, lineHeight: 1.5, color: C.void, maxWidth: 360 }}>
            Harga resmi produk dan layanan; SBM TA 2026 sebagai batas tertinggi; upah BPS Februari 2026
            Rp4,75 juta/bulan.
          </p>
        </div>

        <div style={{ flex: 1, marginLeft: 60 }}>
          {budget.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                height: 70,
                borderTop: `1px solid ${tone.ruleSoft}`,
              }}
            >
              <span style={{ width: 300, flex: "none", fontSize: 23, lineHeight: 1.2, color: tone.ink }}>
                {item.label}
              </span>
              <Bar pct={item.pct} tone={tone} color={tone.signal} height={14} />
              <span
                style={{
                  width: 190,
                  flex: "none",
                  textAlign: "right",
                  fontFamily: FONT.mono,
                  fontSize: 21,
                  color: tone.ink,
                }}
              >
                {item.amount}
              </span>
              <span
                style={{
                  width: 70,
                  flex: "none",
                  textAlign: "right",
                  fontFamily: FONT.mono,
                  fontSize: 19,
                  color: tone.faint,
                }}
              >
                {item.pct.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto", flex: "none", borderTop: `1px solid ${tone.rule}`, paddingTop: 20 }}>
        <Body size={22} color={tone.soft} lh={1.5} max={1600}>
          Contingency 10% (Rp12.959.913) hanya dipakai dengan persetujuan project manager berdasarkan risk
          register. Tarif SBM adalah batas tertinggi, sehingga realisasi bisa lebih rendah.
        </Body>
      </div>
    </Sheet>
  );
}
