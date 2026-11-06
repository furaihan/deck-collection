import { C } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const INPUT = [
  ["Manajemen", "Pembiayaan"],
  ["SDM", "Farmasi & alkes", "Litbang"],
  ["Upaya kesehatan", "Pemberdayaan"],
];
const PROSES = ["Kualitas layanan", "Kepuasan pasien"];
const HASIL = ["Status kesehatan", "Status gizi", "Perlindungan finansial", "Responsiveness"];

function Chain({ children, label, hot }: { children: React.ReactNode; label: string; hot?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 34, alignItems: "center", marginTop: 18 }}>
      <div style={{ width: 132, flex: "none" }}>
        <Label color={hot ? C.pinkDeep : undefined}>{label}</Label>
      </div>
      <div style={{ flex: 1, display: "flex", gap: 12 }}>{children}</div>
    </div>
  );
}

function Cell({ children, hot }: { children: React.ReactNode; hot?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        background: hot ? C.pink : C.sheet,
        border: "1px solid " + (hot ? C.pink : C.rule),
        padding: "16px 18px",
        fontSize: 24,
        lineHeight: 1.2,
        color: hot ? C.onPink : C.ink,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

/** The Lampiran diagram: input, process, output, outcome. Labels only. */
export default function Slide07() {
  return (
    <Sheet n={7} section="Sistem Kesehatan Nasional" cite="Lampiran Perpres 72/2012" line={false}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={860}>Kerangka berpikir</Title>
        <p style={{ fontSize: 24, color: C.inkFaint, maxWidth: 520, textAlign: "right", lineHeight: 1.4 }}>
          Tujuh masukan, dua keluaran, satu hasil.
        </p>
      </div>

      <div style={{ marginTop: 32, flex: 1, display: "flex", flexDirection: "column", paddingBottom: 10 }}>
        {INPUT.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 34, alignItems: "center", marginTop: i === 0 ? 0 : 10 }}>
            <div style={{ width: 132, flex: "none" }}>
              {i === 0 ? <Label>Masukan</Label> : null}
            </div>
            <div style={{ flex: 1, display: "flex", gap: 10 }}>
              {row.map((c) => (
                <Cell key={c}>{c}</Cell>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 26, width: "100%", height: 1, background: C.rule }} />

        <Chain label="Proses">
          {PROSES.map((p) => (
            <Cell key={p}>{p}</Cell>
          ))}
        </Chain>

        <Chain label="Keluaran" hot>
          <Cell hot>Derajat kesehatan setinggi-tingginya</Cell>
        </Chain>

        <div style={{ marginTop: 30, display: "flex", gap: 34, alignItems: "flex-start" }}>
          <div style={{ width: 132, flex: "none", paddingTop: 2 }}>
            <Label>Hasil</Label>
          </div>
          <div style={{ flex: 1, display: "flex", gap: 12 }}>
            {HASIL.map((h) => (
              <div key={h} style={{ flex: 1, borderTop: "1px solid " + C.pinkLine, paddingTop: 10, fontSize: 19, color: C.inkSoft, lineHeight: 1.35 }}>
                {h}
              </div>
            ))}
          </div>
        </div>

        <p style={{ marginTop: "auto", fontSize: 17, color: C.inkGhost, letterSpacing: "0.02em", paddingTop: 12 }}>
          Faktor lingkungan: transisi demografi &middot; AEC &middot; perubahan iklim &middot; Post-2015 &middot; middle income trap
        </p>
      </div>
    </Sheet>
  );
}
