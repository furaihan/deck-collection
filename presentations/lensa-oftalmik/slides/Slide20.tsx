import { Film, Title, Label } from "../Frame";
import { C, FONT, LIT } from "../theme";

const revision = [
  { topic: "Kaca", fact: "Amorf: mendingin tanpa kristalisasi.", ref: "F05" },
  { topic: "Bahan kaca", fact: "Silika >1700 °C, soda, kapur.", ref: "F06" },
  { topic: "Dua proses", fact: "Batch vs continuous flow.", ref: "F07" },
  { topic: "Indeks bias", fact: "Crown 1.523 · CR-39 1.498.", ref: "F10" },
  { topic: "Nomor Abbe", fact: "V = (nd−1)/(nF−nC); flint <50.", ref: "F12" },
  { topic: "Aberasi", fact: "Aksial vs transversal.", ref: "F13" },
  { topic: "Transparansi", fact: "r = [(n−1)/(n+1)]².", ref: "F14" },
  { topic: "UV", fact: "Polikarbonat ~100%, s/d 390 nm.", ref: "F15" },
  { topic: "Berat jenis", fact: "Crown 2.54 · CR-39 1.32.", ref: "F16" },
  { topic: "Benturan", fact: "FDA 1972; poli > hi-index > CR-39 > kaca.", ref: "F17" },
  { topic: "Goresan", fact: "Mohs 1–10; lensa 4–5; wajib hard coat.", ref: "F18" },
  { topic: "Termoset", fact: "CR-39: monomer, susut 14%, oksigen menghambat.", ref: "F19" },
];

export default function Slide20() {
  return (
    <Film n={20} section="Penutup" accent="Poin hafalan" foot="Nomor di kanan merujuk ke frame tempat angka itu dibahas." dark>
      <div className="flex" style={{ gap: 48, flex: 1 }}>
        <div style={{ width: 500, flex: "none", display: "flex", flexDirection: "column" }}>
          <Title size={82} color={C.paper} lineHeight={0.96}>Dua belas angka untuk dibawa pulang</Title>
          <div style={{ width: 140, height: 6, background: C.amber, marginTop: 22, boxShadow: "0 0 22px rgba(227,154,46,0.6)" }} />
          <div style={{ marginTop: 18, fontFamily: FONT.text, fontSize: 23, lineHeight: 1.5, color: C.onInk, maxWidth: 440 }}>
            Kalau hanya satu hal yang tersisa setelah kuliah ini, biarlah itu
            hubungan antara indeks bias, nomor Abbe, dan berat jenis.
          </div>

          <div style={{ marginTop: "auto", borderTop: "1px solid rgba(244,239,230,0.2)", paddingTop: 16 }}>
            <Label size={15} color={C.amber}>Tiga sumbu yang mengikat semuanya</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 12 }}>
              {[
                ["Indeks naik", "lensa lebih tipis"],
                ["Indeks naik", "Abbe turun"],
                ["Indeks naik", "berat jenis naik"],
              ].map((row) => (
                <div key={row[1]} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: FONT.text, fontSize: 21, color: C.paper }}>{row[0]}</span>
                  <span style={{ flex: "none", width: 20, height: 1.5, background: "#6F6A5E" }} />
                  <span style={{ fontFamily: FONT.text, fontSize: 21, color: C.onInk }}>{row[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 22, fontFamily: FONT.mono, fontSize: 16, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6F6A5E" }}>
            Dispensing II · Lensa Oftalmik
          </div>
        </div>

        <div style={{ flex: 1, columnCount: 2, columnGap: 40 }}>
          {revision.map((r) => (
            <div
              key={r.topic}
              style={{
                breakInside: "avoid",
                borderTop: "1px solid rgba(244,239,230,0.16)",
                paddingTop: 8,
                paddingBottom: 8,
                display: "flex",
                alignItems: "baseline",
                gap: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT.text, fontWeight: 600, fontSize: 20, color: C.paper, lineHeight: 1.25 }}>{r.topic}</div>
                <div style={{ fontFamily: FONT.text, fontSize: 18, color: C.onInk, lineHeight: 1.35 }}>{r.fact}</div>
              </div>
              <span style={{ fontFamily: FONT.mono, fontSize: 14, color: C.amber }}>{r.ref}</span>
            </div>
          ))}
        </div>
      </div>
    </Film>
  );
}