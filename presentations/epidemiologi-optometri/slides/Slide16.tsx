import { C, FONT } from "../theme";
import { Label, Sheet, Takeaway, Title, Triad } from "../Frame";

const HOST_FACTORS = [
  "Umur",
  "Jenis kelamin",
  "Ras",
  "Genetik",
  "Pekerjaan",
  "Keadaan fisiologis",
  "Perilaku",
  "Status kekebalan",
];

/** Single versus multiple causation, and the triad that replaced the single cause. */
export default function Slide16() {
  return (
    <Sheet n={16} section="Penyebab">
      <Title>Satu sebab sudah usang.</Title>

      <div style={{ display: "flex", gap: 80, marginTop: 34, flex: 1 }}>
        <div style={{ flex: "0 0 560px" }}>
          <Label color={C.lime}>Teori</Label>

          <div style={{ marginTop: 12, borderTop: "1px solid " + C.rule, padding: "18px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p style={{ fontFamily: FONT.display, fontSize: 34, color: C.ink }}>Single causation</p>
              <Label color={C.inkGhost}>Tidak dipakai</Label>
            </div>
            <p style={{ marginTop: 8, fontSize: 22, lineHeight: 1.45, color: C.inkFaint }}>
              Satu penyebab tunggal. Dulu dikenal; kini tidak dapat diterima.
            </p>
          </div>

          <div style={{ borderTop: "1px solid " + C.ruleSoft, padding: "18px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p style={{ fontFamily: FONT.display, fontSize: 34, color: C.ink }}>Multiple causation</p>
              <Label color={C.lime}>Dianut</Label>
            </div>
            <p style={{ marginTop: 8, fontSize: 22, lineHeight: 1.45, color: C.inkSoft }}>
              Berbagai faktor: penyebab, manusia, dan lingkungan.
            </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <Label color={C.lime}>8 faktor penjamu</Label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 24, marginTop: 8 }}>
              {HOST_FACTORS.map((factor) => (
                <span key={factor} style={{ fontSize: 20, lineHeight: 1.6, color: C.inkFaint }}>
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ height: 360, flex: "none" }}>
            <Triad />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 8 }}>
            <div>
              <Label color={C.lime}>Host</Label>
              <p style={{ marginTop: 6, fontSize: 20, lineHeight: 1.4, color: C.inkFaint }}>
                Manusia atau makhluk hidup tempat penyakit berkembang.
              </p>
            </div>
            <div>
              <Label color={C.lime}>Agent</Label>
              <p style={{ marginTop: 6, fontSize: 20, lineHeight: 1.4, color: C.inkFaint }}>
                Penyebab sebenarnya: biologis dan kimia.
              </p>
            </div>
            <div>
              <Label color={C.lime}>Environment</Label>
              <p style={{ marginTop: 6, fontSize: 20, lineHeight: 1.4, color: C.inkFaint }}>
                Seluruh keadaan di luar manusia: polusi udara, kualitas air, bahan kimia, radiasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Takeaway>Seimbang: tidak terjadi penyakit. Miring: penyakit mendapat jalan.</Takeaway>
    </Sheet>
  );
}
