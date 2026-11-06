import { C, FONT } from "../theme";
import { Label, Lever, Sheet, Takeaway, Title } from "../Frame";

const SIDES = [
  {
    key: "Host",
    lever: <Lever tilt={-9} label="Pengungkit miring ke host" />,
    mech: "Host menjadi peka terhadap penyakit.",
    example: "Kekurangan nutrisi \u2192 tubuh tidak mampu melawan infeksi secara efektif, meskipun ada agen berbahaya.",
  },
  {
    key: "Agent",
    lever: <Lever tilt={9} label="Pengungkit miring ke agent" />,
    mech: "Agen lebih mudah menimbulkan penyakit pada host.",
    example: "COVID-19 (SARS-CoV-2): droplet batuk / bersin, kontak permukaan terkontaminasi.",
  },
  {
    key: "Environment",
    lever: <Lever tilt={9} fulcrum={70} label="Titik tumpu bergeser ke environment" />,
    mech: "Lingkungan berubah atau titik tumpu bergeser.",
    example:
      "Polusi udara \u2192 saluran napas menyempit. Banjir \u2192 air terkontaminasi Leptospira \u2192 leptospirosis.",
  },
];

/** Three ways the balance can tip, each with its own lever. */
export default function Slide17() {
  return (
    <Sheet n={17} section="Penyebab">
      <Title>Ketika keseimbangan miring.</Title>
      <p style={{ marginTop: 14, fontSize: 28, lineHeight: 1.45, color: C.inkSoft, maxWidth: 1200 }}>
        Penyakit terjadi bila keseimbangan terganggu dan pengungkit miring ke salah satu sisi.
      </p>

      <div style={{ display: "flex", gap: 30, marginTop: 40, flex: 1 }}>
        {SIDES.map((side, i) => (
          <div key={side.key} style={{ flex: 1, borderTop: "2px solid " + (i === 0 ? C.lime : C.rule), paddingTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p style={{ fontFamily: FONT.display, fontSize: 38, color: C.ink }}>{side.key}</p>
              <Label color={C.inkGhost}>{String(i + 1).padStart(2, "0")}</Label>
            </div>
            <div style={{ marginTop: 8 }}>{side.lever}</div>
            <p style={{ marginTop: 8, fontSize: 22, lineHeight: 1.4, color: C.ink, fontWeight: 500 }}>{side.mech}</p>
            <p style={{ marginTop: 10, fontSize: 20, lineHeight: 1.45, color: C.inkFaint }}>{side.example}</p>
          </div>
        ))}
      </div>

      <Takeaway>Yang bergeser bisa host, agent, atau lingkungan &mdash; dan titik tumpunya ikut bergeser.</Takeaway>
    </Sheet>
  );
}
