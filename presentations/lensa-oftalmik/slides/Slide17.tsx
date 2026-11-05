import { Film, Title, Label, Kicker } from "../Frame";
import { C, FONT, LIT } from "../theme";

const speed = [
  { label: "Polikarbonat tanpa lapis", value: 244, display: "244", hot: true },
  { label: "Polikarbonat berlapis", value: 153, display: "153" },
  { label: "CR-39 tanpa lapis", value: 49, display: "49" },
  { label: "Kaca diperkeras", value: 18, display: "18" },
  { label: "Kaca crown", value: 12, display: "12" },
];

export default function Slide17() {
  const top = 244;
  return (
    <Film n={17} section="03 · Sifat fisik" accent="Daya tahan benturan" foot="Angka diambil dari uji dengan peluru yang sama; metode tes berbeda dapat menghasilkan peringkat yang berbeda.">
      <div style={{ flex: "none" }}>
        <Title size={70} max={1240}>Bola baja 5/8 inci, dijatuhkan dari 50 inci</Title>
      </div>

      <div className="flex" style={{ gap: 44, marginTop: 24, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: LIT.plateInkHigh,
              boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 28px 50px rgba(20,21,24,0.44)",
              padding: "24px 28px",
            }}
          >
            <Label size={16} color={C.amber}>Sejak awal 1972</Label>
            <div style={{ marginTop: 10, fontFamily: FONT.display, fontWeight: 700, fontSize: 46, lineHeight: 1.06, color: C.paper }}>
              Setiap lensa wajib
              <br />
              lulus uji benturan.
            </div>
            <div style={{ marginTop: 14, fontFamily: FONT.text, fontSize: 21, lineHeight: 1.45, color: C.onInk }}>
              Kaca tanpa pelapisan tidak lulus; kaca yang diperkeras bisa lulus.
              Aturan ini lahir karena angka kecelakaan mata akibat pecahan lensa tinggi.
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Label size={15}>Pembanding · bola yang mengenai mata</Label>
            <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
              {[
                { name: "Cricket", v: "42" },
                { name: "Tenis", v: "50" },
                { name: "Badminton", v: "60" },
                { name: "Squash", v: "70" },
              ].map((b) => (
                <div
                  key={b.name}
                  style={{
                    flex: 1,
                    background: LIT.plateFlat,
                    boxShadow: "0 0 0 1px rgba(20,21,24,0.12)",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: C.ink, lineHeight: 1 }}>{b.v}</div>
                  <div style={{ fontFamily: FONT.text, fontSize: 18, color: C.inkFaint, marginTop: 2 }}>{b.name}</div>
                </div>
              ))}
            </div>
          </div>
          <Kicker size={26} max={720}>
            Kaca crown hancur di bawah kecepatan lemparan cricket. Polikarbonat
            bertahan jauh melewati semuanya.
          </Kicker>
        </div>

        <div style={{ width: 760, flex: "none" }}>
          <Label size={16}>Kecepatan kerusakan · meter/detik</Label>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 16 }}>
            {speed.map((d) => (
              <div key={d.label} className="flex items-center" style={{ gap: 14 }}>
                <div style={{ width: 270, flex: "none", fontFamily: FONT.text, fontSize: 22, color: d.hot ? C.ink : C.inkSoft, fontWeight: d.hot ? 600 : 400 }}>
                  {d.label}
                </div>
                <div
                  style={{
                    width: (d.value / top) * 330,
                    height: 30,
                    flex: "none",
                    background: d.hot
                      ? LIT.barHot
                      : LIT.bar,
                    boxShadow: d.hot
                      ? "0 12px 24px rgba(180,120,30,0.34), 0 1px 0 rgba(255,255,255,0.5) inset"
                      : "0 12px 24px rgba(20,21,24,0.28), 0 1px 0 rgba(255,255,255,0.13) inset",
                  }}
                />
                <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 26, color: d.hot ? C.ink : C.inkSoft }}>
                  {d.display}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Film>
  );
}