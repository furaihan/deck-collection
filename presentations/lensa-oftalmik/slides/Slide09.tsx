import { Film, Title, Label, Numeral, Kicker } from "../Frame";
import { C, FONT, LIT } from "../theme";

export default function Slide09() {
  return (
    <Film n={9} section="01 · Kaca dan sejarahnya" accent="Trade-off" foot="Sumber menandai 'tidak bisa diwarna' sebagai perkara yang masih diperdebatkan: berkas Optik menyebut pewarnaan kaca mungkin lewat lapisan oksida logam di ruang vakum.">
      <div style={{ flex: "none" }}>
        <Title size={72} max={1200}>Kaca menang di permukaan, kalah di benturan</Title>
      </div>

      <div className="flex" style={{ gap: 30, marginTop: 30, flex: 1 }}>
        <div
          style={{
            width: 560,
            flex: "none",
            background: "linear-gradient(158deg, #1E2025 0%, #131417 56%, #090A0B 100%)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 30px 54px rgba(20,21,24,0.46)",
            padding: "32px 34px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Label size={16} color={C.amber}>Kelebihan</Label>
          <div style={{ marginTop: 18, fontFamily: FONT.display, fontWeight: 700, fontSize: 56, lineHeight: 1.02, color: C.paper }}>
            Tahan gores,
            <br />
            <span style={{ color: C.amberSoft }}>Abbe tinggi</span>,
            <br />
            jernih dan stabil.
          </div>
          <div style={{ marginTop: "auto", paddingTop: 24, fontFamily: FONT.text, fontSize: 22, lineHeight: 1.45, color: C.onInk }}>
            Komposisi homogen, indeks bias tepat, tahan bahan kimia dan goresan.
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              background: LIT.plate,
              boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 20px 38px rgba(58,46,28,0.17)",
              padding: "22px 26px 24px",
            }}
          >
            <Label size={16} color={C.ink}>Kekurangan</Label>
            <div style={{ marginTop: 10, fontFamily: FONT.text, fontSize: 27, lineHeight: 1.42, color: C.ink }}>
              Mudah pecah, tidak bisa dibor, dan pewarnaan hanya mungkin lewat lapisan
              oksida logam tipis di ruang vakum — mesin besar, biaya tinggi.
            </div>
          </div>

          <div style={{ display: "flex", gap: 18, marginTop: 18 }}>
            {[
              { v: "1.523", note: "indeks bias crown" },
              { v: "58.9", note: "nilai Abbe, dispersi rendah" },
              { v: "2.54", note: "berat jenis, dua kali air" },
            ].map((s) => (
              <div
                key={s.v}
                style={{
                  flex: 1,
                  background: LIT.plateFlat,
                  boxShadow: "0 0 0 1px rgba(20,21,24,0.12)",
                  padding: "16px 18px",
                }}
              >
                <Numeral size={46}>{s.v}</Numeral>
                <div style={{ marginTop: 4, fontFamily: FONT.text, fontSize: 19, lineHeight: 1.35, color: C.inkSoft }}>{s.note}</div>
              </div>
            ))}
          </div>

          <Kicker size={34} max={820}>
            Kaca lama dipakai karena matanya menuntut ketajaman, bukan karena
            bahunya kuat menahan berat.
          </Kicker>
        </div>
      </div>
    </Film>
  );
}