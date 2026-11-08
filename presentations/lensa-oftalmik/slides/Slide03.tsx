import { Glasses } from "lucide-react";
import { FONT, PART } from "../theme";
import { Figure, Sheet, Takeaway, Title, inkOn } from "../Frame";
import franklin from "../assets/franklin.jpg";

const EVENTS = [
  {
    when: "Akhir abad ke-13",
    who: "Italia",
    what: "Kacamata korektif pertama yang berfungsi, dibagikan secara sukarela. Sasaran awalnya presbiopia.",
  },
  {
    when: "Abad ke-14",
    who: "Nicholas dari Kuba",
    what: "Lensa cekung untuk mengoreksi myopia — rabun jauh.",
  },
  {
    when: "1784",
    who: "Benjamin Franklin",
    what: "Lensa bifokal: penglihatan jauh dan dekat disatukan dalam satu bingkai.",
  },
  {
    when: "1959",
    who: "Bernard Maitenaz",
    what: "Lensa progresif Varilux: jarak fokus berubah tanpa garis.",
  },
];

/**
 * Four dates carry the whole history of the spectacle. The portrait earns its
 * place because 1784 is the one invention in the list the reader can name.
 */
export default function Slide03() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={3} part={PART.asal}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <Glasses size={28} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 2 }} />
        <Title max={1150}>Bifokal lahir di Philadelphia</Title>
      </div>

      <div style={{ display: "flex", gap: 76, marginTop: 22, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {EVENTS.map((event, i) => (
            <div
              key={event.when}
              style={{
                display: "grid",
                gridTemplateColumns: "230px 1fr",
                gap: 26,
                alignItems: "baseline",
                padding: "16px 0",
                borderTop: `1px solid ${i === 0 ? tone.rule : tone.ruleSoft}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 18,
                    letterSpacing: "0.02em",
                    lineHeight: 1.3,
                    color: i === 2 ? tone.amber : tone.faint,
                  }}
                >
                  {event.when}
                </div>
                <div
                  style={{
                    marginTop: 5,
                    fontFamily: FONT.display,
                    fontSize: 26,
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: tone.ink,
                  }}
                >
                  {event.who}
                </div>
              </div>
              <p style={{ fontFamily: FONT.text, fontSize: 26, lineHeight: 1.38, color: tone.soft }}>{event.what}</p>
            </div>
          ))}

          <p
            style={{
              marginTop: 14,
              fontFamily: FONT.text,
              fontSize: 21,
              lineHeight: 1.4,
              color: tone.faint,
              maxWidth: 880,
            }}
          >
            Penemu kacamata abad ke-13 dan lensa cekung abad ke-14 masih diperdebatkan: sumber
            mencatat nama Salvinno D’Amarte atau Allesandro Della Spina, dan Nicholas dari Kuba.
          </p>
        </div>

        <div style={{ flex: "none", display: "flex", alignItems: "flex-start" }}>
          <Figure
            src={franklin}
            alt="Lukisan Benjamin Franklin oleh Joseph-Siffred Duplessis, 1778"
            width={400}
            height={512}
            caption="Benjamin Franklin, Joseph-Siffred Duplessis, 1778. Domain publik."
            tone={tone}
          />
        </div>
      </div>

      <Takeaway tone={tone}>
        Tiga abad dari kacamata baca sampai lensa progresif — setiap langkah adalah usaha
        membengkokkan cahaya dengan tepat.
      </Takeaway>
    </Sheet>
  );
}
