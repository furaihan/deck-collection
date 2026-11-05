import { Film, Title, Label, Numeral, Kicker } from "../Frame";
import { Table, Fraction } from "../Pieces";
import { C, FONT, LIT } from "../theme";

export default function Slide10() {
  return (
    <Film n={10} section="02 · Sifat optik" accent="Index bias" foot="CR-39 ditulis 1.502 di Eropa dan 1.498 di USA: angka yang sama, garis spektrum yang berbeda.">
      <div style={{ flex: "none" }}>
        <Title size={72} max={1240}>Satu angka yang memutuskan seberapa tipis lensa</Title>
      </div>

      <div className="flex" style={{ gap: 44, marginTop: 26, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: LIT.plate,
              boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 20px 38px rgba(58,46,28,0.16)",
              padding: "22px 26px 24px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: C.ink }}>n =</span>
            <Fraction numerator="kecepatan cahaya di ruang hampa" denominator="kecepatan cahaya di bahan" size={25} />
          </div>

          <div style={{ display: "flex", gap: 18, marginTop: 18 }}>
            {[
              { v: "546.07", note: "nm · Eropa · e-line" },
              { v: "587.56", note: "nm · USA · helium d" },
            ].map((g) => (
              <div
                key={g.v}
                style={{
                  flex: 1,
                  background: LIT.plateFlat,
                  boxShadow: "0 0 0 1px rgba(20,21,24,0.12)",
                  padding: "16px 20px",
                }}
              >
                <Numeral size={48}>{g.v}</Numeral>
                <div style={{ marginTop: 4, fontFamily: FONT.mono, fontSize: 18, color: C.inkFaint }}>{g.note}</div>
              </div>
            ))}
          </div>

          <Kicker size={34} max={660}>
            Makin tinggi indeks bias, makin tipis lensa pada kekuatan yang sama.
            Harganya dibayar di nomor Abbe.
          </Kicker>
        </div>

        <div style={{ width: 640, flex: "none", display: "flex", flexDirection: "column" }}>
          <Label size={16}>Index bias material</Label>
          <div style={{ marginTop: 10 }}>
            <Table
              columns={[
                { head: "Material", width: 0.6 },
                { head: "n", width: 0.4, align: "right" },
              ]}
              rows={[
                ["Crown glass", "1.523"],
                ["CR-39", "1.498"],
                ["Polikarbonat", "1.586"],
                ["Mid-index plastik", "1.557"],
                ["High-index plastik", "1.595"],
                ["High-index glass", "1.701"],
                ["Ultra high-index", "1.802"],
              ]}
              emphasis={[1]}
              size={26}
            />
          </div>

          <div style={{ marginTop: "auto", borderTop: `1px solid ${C.rule}`, paddingTop: 12 }}>
            <div style={{ fontFamily: FONT.text, fontSize: 20, lineHeight: 1.4, color: C.inkSoft }}>
              Tujuh material, satu garis: makin tinggi indeks, makin tipis lensa
              yang bisa dibuat darinya.
            </div>
          </div>
        </div>
      </div>
    </Film>
  );
}