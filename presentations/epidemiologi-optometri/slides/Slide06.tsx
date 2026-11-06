import { C, FONT } from "../theme";
import { Label, Panel, Sheet, Takeaway, Title } from "../Frame";

const LAYERS = [
  { t: "Fisik", d: "Polusi udara, kualitas air, bahan kimia, radiasi." },
  { t: "Biologis", d: "Virus, bakteri, jamur, parasit." },
  { t: "Sosial", d: "Perilaku, pekerjaan, status sosial-ekonomi." },
];

/** The ecological approach: the person is read together with the whole environment. */
export default function Slide06() {
  return (
    <Sheet n={6} section="Ekologi">
      <Title>Penyakit tidak berdiri sendiri.</Title>
      <p style={{ marginTop: 18, fontSize: 30, lineHeight: 1.45, color: C.inkSoft, maxWidth: 1180 }}>
        Frekuensi dan distribusi penyakit dikaji dari seluruh latar belakang lingkungan &mdash; fisik,
        biologis, sosial.
      </p>

      <div style={{ marginTop: 44, flex: 1 }}>
        {LAYERS.map((layer, i) => (
          <div
            key={layer.t}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 40,
              borderTop: i === 0 ? "1px solid " + C.rule : "1px solid " + C.ruleSoft,
              padding: "26px 0",
            }}
          >
            <span style={{ fontFamily: FONT.mono, fontSize: 18, color: C.inkGhost, width: 40 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: FONT.display, fontSize: 44, color: C.ink, width: 260, flex: "none" }}>
              {layer.t}
            </span>
            <span style={{ fontSize: 28, lineHeight: 1.4, color: C.inkSoft }}>{layer.d}</span>
          </div>
        ))}
      </div>

      <Panel tone="lime" style={{ marginTop: 20, display: "flex", gap: 40, alignItems: "baseline" }}>
        <Label color={C.lime}>Contoh</Label>
        <p style={{ fontSize: 26, lineHeight: 1.5, color: C.ink, maxWidth: 1200 }}>
          Miopia pada anak bukan hanya &ldquo;matanya bermasalah&rdquo;. Lihat juga kebiasaan gadget,
          aktivitas di luar ruang, dan lingkungan belajar.
        </p>
      </Panel>

      <Takeaway>Manusia dan total lingkungannya &mdash; bukan organ yang dipotong dari konteks.</Takeaway>
    </Sheet>
  );
}
