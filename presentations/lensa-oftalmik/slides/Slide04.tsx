import { Film, Title, Label, Kicker } from "../Frame";
import { C, FONT, LIT } from "../theme";

const milestones = [
  {
    year: "Akhir 1200-an",
    place: "Italia",
    name: "Salvino d'Armate",
    note: "Kacamata korektif pertama yang benar-benar dipakai: dua lensa diikat satu bingkai, awalnya untuk presbiopia.",
  },
  {
    year: "Abad ke-14",
    place: "Eropa",
    name: "Nicholas dari Kuba",
    note: "Lensa cekung masuk untuk rabun jauh. Mata yang terlalu kuat kini punya alat, bukan cuma mata yang menua.",
  },
  {
    year: "1784",
    place: "Paris",
    name: "Benjamin Franklin",
    note: "Bifokal: lensa jauh dan lensa dekat digabung dalam satu bingkai, dipisah garis datar di tengah.",
  },
  {
    year: "1959",
    place: "Prancis",
    name: "Bernard Maitenaz",
    note: "Varilux, lensa progresif pertama: kekuatan berubah halus dari atas ke bawah, tanpa garis terlihat.",
  },
];

export default function Slide04() {
  return (
    <Film n={4} section="01 · Kaca dan sejarahnya" accent="Koreksi penglihatan" foot="Sumber menandai beberapa nama sebagai bacaan yang tidak pasti; ditulis apa adanya.">
      <div style={{ flex: "none" }}>
        <Title size={72} max={1290}>Kacamata belajar melihat lebih dulu, lalu mengoreksi</Title>
      </div>

      <div className="flex flex-1 items-stretch" style={{ gap: 26, marginTop: 34 }}>
        {milestones.map((m, i) => (
          <div
            key={m.name}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: i === 2 ? LIT.plateInk : LIT.plate,
              boxShadow: i === 2 ? LIT.inkShadow : LIT.plateShadow,
              padding: "24px 26px 22px",
            }}
          >
            <div style={{ height: 5, background: i === 2 ? C.amber : C.ink, flex: "none" }} />
            <div style={{ marginTop: 16 }}>
              <Label size={15} color={i === 2 ? "#8B8578" : C.inkFaint}>{m.place}</Label>
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: 50,
                lineHeight: 0.94,
                color: i === 2 ? C.paper : C.ink,
              }}
            >
              {m.year}
            </div>
            <div
              style={{
                marginTop: 16,
                fontFamily: FONT.text,
                fontWeight: 600,
                fontSize: 27,
                lineHeight: 1.24,
                color: i === 2 ? C.amberSoft : C.ink,
              }}
            >
              {m.name}
            </div>
            <div
              style={{
                marginTop: 9,
                fontFamily: FONT.text,
                fontSize: 24,
                lineHeight: 1.44,
                color: i === 2 ? C.onInk : C.inkSoft,
              }}
            >
              {m.note}
            </div>
            <div style={{ marginTop: "auto", paddingTop: 20 }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 15, letterSpacing: "0.18em", color: i === 2 ? "#7E7869" : C.inkFaint }}>
                {["01", "02", "03", "04"][i]} / 04
              </span>
            </div>
          </div>
        ))}
      </div>

      <Kicker size={28} max={1400}>
        Empat langkah, satu arah: dari membaca huruf yang sudah terlalu kecil,
        menuju lensa yang menyelesaikan dua jarak sekaligus.
      </Kicker>
    </Film>
  );
}