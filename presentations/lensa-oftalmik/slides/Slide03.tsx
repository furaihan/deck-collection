import { Film, Title } from "../Frame";
import { C, FONT } from "../theme";

const entries = [
  { year: "424 SM", name: "Aristophanes", note: "Drama The Clouds menyebut kaca-pembakar: lensa konveks yang memfokuskan matahari sampai menyalakan api." },
  { year: "4 SM – 65 M", name: "Seneca", note: "Gelas bulat berisi air memperbesar tulisan. Efek pembesaran tercatat pertama kali dalam Naturales Quaestiones." },
  { year: "965 – 1038", name: "Alhazen", note: "Teori optik pertama yang utuh: cahaya membentuk bayangan di retina, bukan keluar dari mata." },
  { year: "1214 – 1294", name: "Roger Bacon", note: "Konsep batu membaca: sepotong lensa yang diasah supaya huruf jelas bagi mata yang menua." },
  { year: "1590", name: "Zacharias Janssen", note: "Dua lensa dalam satu tabung: mikroskop pertama, dan bukti bahwa lensa bisa disusun." },
  { year: "1668", name: "Isaac Newton", note: "Lensa cembung digabung cermin cekung menjadi teleskop reflektor, lebih efektif daripada teleskop lensa." },
];

export default function Slide03() {
  return (
    <Film n={3} section="01 · Kaca dan sejarahnya" accent="Sebelum kacamata">
      <div style={{ flex: "none" }}>
        <Title size={66} max={1260}>Seribu tujuh ratus tahun sebelum kacamata</Title>
      </div>

      <div className="flex flex-1 flex-col justify-center" style={{ marginTop: 14 }}>
        {entries.map((entry, index) => (
          <div
            key={entry.name}
            className="flex"
            style={{
              borderTop: index === 0 ? `2.5px solid ${C.ink}` : `1px solid ${C.ruleSoft}`,
              paddingTop: 14,
              paddingBottom: 14,
              alignItems: "baseline",
            }}
          >
            <div style={{ width: 240, flex: "none", fontFamily: FONT.mono, fontSize: 20, color: C.inkFaint, letterSpacing: "0.03em" }}>
              {entry.year}
            </div>
            <div style={{ width: 330, flex: "none", fontFamily: FONT.display, fontWeight: 700, fontSize: 34, lineHeight: 1.05 }}>
              {entry.name}
            </div>
            <div style={{ flex: 1, fontFamily: FONT.text, fontSize: 24, lineHeight: 1.4, color: C.inkSoft }}>
              {entry.note}
            </div>
          </div>
        ))}
        <div style={{ borderTop: `2.5px solid ${C.ink}` }} />
      </div>
    </Film>
  );
}