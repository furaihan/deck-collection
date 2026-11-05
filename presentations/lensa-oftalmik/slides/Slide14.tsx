import { Film, Title, Label, Numeral, Kicker } from "../Frame";
import { C, FONT, LIT } from "../theme";

export default function Slide14() {
  return (
    <Film n={14} section="02 · Sifat optik" accent="Transparansi" foot="r dihitung per permukaan; satu lensa punya dua permukaan, jadi kehilangan totalnya dua kali angka ini.">
      <div style={{ flex: "none" }}>
        <Title size={72} max={1240}>Cahaya yang hilang di setiap permukaan</Title>
      </div>

      <div className="flex" style={{ gap: 44, marginTop: 26, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: LIT.plate,
              boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 20px 38px rgba(58,46,28,0.16)",
              padding: "20px 26px",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 50, color: C.ink }}>r =</span>
            <span style={{ fontFamily: FONT.text, fontSize: 38, color: C.ink, letterSpacing: "0.02em" }}>
              [ (n − 1) / (n + 1) ]²
            </span>
          </div>

          <div style={{ display: "flex", gap: 18, marginTop: 18 }}>
            {[
              { k: "CR-39", n: "1.498", v: "3.97%", hot: false },
              { k: "Kaca high-index", n: "1.806", v: "8.25%", hot: true },
            ].map((r) => (
              <div
                key={r.k}
                style={{
                  flex: 1,
                  background: r.hot
                    ? LIT.plateInkHigh
                    : LIT.plateFlat,
                  boxShadow: r.hot
                    ? "0 1px 0 rgba(255,255,255,0.12) inset, 0 22px 40px rgba(20,21,24,0.36)"
                    : "0 0 0 1px rgba(20,21,24,0.12)",
                  padding: "26px 24px",
                }}
              >
                <div style={{ fontFamily: FONT.mono, fontSize: 17, color: r.hot ? "#9A948A" : C.inkFaint }}>
                  {r.k} · n {r.n}
                </div>
                <Numeral size={84} color={r.hot ? C.amberSoft : C.ink}>{r.v}</Numeral>
                <div style={{ marginTop: 4, fontFamily: FONT.text, fontSize: 21, color: r.hot ? C.onInk : C.inkSoft }}>
                  per permukaan
                </div>
              </div>
            ))}
          </div>

          <Kicker size={33} max={700}>
            Makin tinggi indeks, makin banyak cahaya dipantulkan sebelum sempat masuk.
          </Kicker>
        </div>

        <div style={{ width: 560, flex: "none" }}>
          <div
            style={{
              background: LIT.plateInk,
              boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 26px 46px rgba(20,21,24,0.40)",
              padding: "24px 26px",
            }}
          >
            <Label size={16} color={C.amber}>Yang didapat dari lapisan</Label>
            <div style={{ marginTop: 12, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.45, color: C.paper }}>
              Bayangan hantu berkurang, tampilan seperti kaca hilang, dan transmisi
              cahaya tampak bertambah.
            </div>
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(244,239,230,0.18)" }}>
              <div style={{ fontFamily: FONT.text, fontSize: 21, lineHeight: 1.45, color: C.onInk }}>
                Multicoat bukan kemewahan pada indeks tinggi. Tanpa itu, pantulan
                dari dua permukaan mengambil hampir seperenam cahaya.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${C.rule}` }}>
            <Label size={15}>Penting juga untuk</Label>
            <div style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.4, color: C.inkSoft }}>
              Lensa baru yang lebih datar: pantulan dari permukaan datar paling
              mengganggu pemakai.
            </div>
          </div>
        </div>
      </div>
    </Film>
  );
}