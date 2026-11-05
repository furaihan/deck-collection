import { Film, Title, Label, Kicker } from "../Frame";
import { Table } from "../Pieces";
import { C, FONT, LIT } from "../theme";

const raw = [
  { name: "Pasir kuarsa", formula: "SiO₂", note: "Titik lebur di atas 1700 °C. Bahan dasar seluruh kaca silikat.", tag: "> 1700 °C" },
  { name: "Soda", formula: "Na₂CO₃", note: "Menurunkan titik cair kaca, sehingga peleburan mungkin pada suhu yang bisa dicapai tungku.", tag: "menurunkan titik cair kaca" },
  { name: "Kapur", formula: "CaO", note: "Memberi kestabilan kimia: kaca tidak larut oleh air dan tidak keruh oleh cuaca.", tag: "stabil" },
];

export default function Slide06() {
  return (
    <Film n={6} section="01 · Kaca dan sejarahnya" accent="Bahan dasar" foot="Angka suhu adalah titik kerja di dalam pot peleburan, bukan titik lebur bahan mentah.">
      <div style={{ flex: "none" }}>
        <Title size={70} max={1200}>Pasir, soda, kapur: tiga bahan, satu tungku</Title>
      </div>

      <div className="flex" style={{ gap: 48, marginTop: 30, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {raw.map((item, i) => (
            <div
              key={item.name}
              style={{
                background: LIT.plate,
                boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 16px 30px rgba(58,46,28,0.14)",
                padding: "18px 24px 20px",
                display: "flex",
                alignItems: "center",
                gap: 22,
              }}
            >
              <div style={{ flex: 1 }}>
                <div className="flex items-baseline" style={{ gap: 14 }}>
                  <span style={{ fontFamily: FONT.text, fontWeight: 600, fontSize: 30, color: C.ink }}>{item.name}</span>
                  <span style={{ fontFamily: FONT.mono, fontSize: 20, color: C.inkFaint }}>{item.formula}</span>
                </div>
                <div style={{ marginTop: 6, fontFamily: FONT.text, fontSize: 23, lineHeight: 1.42, color: C.inkSoft, maxWidth: 640 }}>
                  {item.note}
                </div>
              </div>
              <div style={{ width: 210, flex: "none", textAlign: "right" }}>
                <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 25, lineHeight: 1.1, color: i === 0 ? C.amberText : C.inkSoft }}>
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: 500, flex: "none", display: "flex", flexDirection: "column" }}>
          <Label size={16}>Bahan lensa kaca</Label>
          <div style={{ marginTop: 12 }}>
            <Table
              columns={[
                { head: "Bahan", width: 0.36 },
                { head: "Kenapa dipakai", width: 0.64 },
              ]}
              rows={[
                ["Quartz", "Birefringent; dipakai paling awal, lalu ditinggalkan."],
                ["Crown", "Pilihan setelah quartz; paling umum di banyak negara."],
                ["Hi-index", "Schott & Abbe: mengatasi aberasi kromatis, tampak lebih tipis."],
              ]}
              size={22}
            />
          </div>
          <Kicker size={30} max={470}>
            Tiga bahan dasar, lalu dipilih: quartz dulu, crown kemudian, hi-index untuk mata yang menuntut tepi tipis.
          </Kicker>
        </div>
      </div>
    </Film>
  );
}