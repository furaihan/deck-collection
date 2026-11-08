import { History } from "lucide-react";
import { FONT } from "../theme";
import { Sheet, Takeaway, Title, inkOn } from "../Frame";

const EVENTS = [
  {
    when: "424 SM",
    who: "Aristophanes",
    what: "Dalam drama The Clouds disebut kaca pembakar: lensa konveks yang memusatkan sinar matahari sampai menyalakan api.",
  },
  {
    when: "4–65 M",
    who: "Seneca",
    what: "Bola gelas berisi air memperbesar objek yang dilihat melaluinya, dicatat dalam Naturales Quaestiones.",
  },
  {
    when: "965–1038",
    who: "Alhazen",
    what: "Teori optik pertama tentang lensa mata manusia: bayangan benda terbentuk di retina.",
  },
  {
    when: "1214–1294",
    who: "Roger Bacon",
    what: "Konsep ‘batu membaca’: lensa yang diasah membuat tulisan kecil terbaca.",
  },
  {
    when: "1590",
    who: "Zacharias Janssen",
    what: "Mikroskop pertama, dua lensa dalam satu tabung.",
  },
  {
    when: "1668",
    who: "Isaac Newton",
    what: "Lensa cembung digabung cermin cekung: teleskop reflektor, lebih efektif daripada teleskop lensa.",
  },
];

/**
 * The prologue: optics was a question about light for twenty centuries before
 * anyone put a lens on a nose. Six dated findings, set as a two-column register.
 */
export default function Slide02() {
  const tone = inkOn("chalk");

  return (
    <Sheet n={2} part="Bagian I · Asal dan bahan">
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <History size={26} strokeWidth={1.75} color={tone.amber} style={{ position: "relative", top: 3 }} />
        <Title max={1400}>Dua puluh abad sebelum kacamata</Title>
      </div>

      <div
        style={{
          marginTop: 44,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 64,
          rowGap: 26,
        }}
      >
        {EVENTS.map((event, i) => (
          <div
            key={event.when}
            style={{
              borderTop: `1px solid ${i < 2 ? tone.rule : tone.ruleSoft}`,
              paddingTop: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 20,
                  letterSpacing: "0.02em",
                  color: i === 5 ? tone.amber : tone.faint,
                  whiteSpace: "nowrap",
                }}
              >
                {event.when}
              </span>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 30,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  color: tone.ink,
                }}
              >
                {event.who}
              </span>
            </div>
            <p
              style={{
                marginTop: 8,
                maxWidth: 740,
                fontFamily: FONT.text,
                fontSize: 26,
                lineHeight: 1.35,
                color: tone.soft,
              }}
            >
              {event.what}
            </p>
          </div>
        ))}
      </div>

      <Takeaway tone={tone}>
        Lensa lahir dari pertanyaan tentang cahaya, jauh sebelum ada yang bertanya tentang mata.
      </Takeaway>
    </Sheet>
  );
}
