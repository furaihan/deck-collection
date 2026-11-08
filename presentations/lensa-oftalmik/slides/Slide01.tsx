import { C, COURSE, FONT, T } from "../theme";
import { Sheet } from "../Frame";
import coverGlasses from "../assets/cover-glasses.jpg";

const PARTS = [
  { n: "I", label: "Asal dan bahan" },
  { n: "II", label: "Optik lensa" },
  { n: "III", label: "Kekuatan dan permukaan" },
  { n: "IV", label: "Lensa plastik" },
];

/**
 * Cover. Drawing paper on the left, the photograph of a corrective pair on the
 * right, and the four parts of the lecture as the only contents the deck needs.
 */
export default function Slide01() {
  return (
    <Sheet n={1} part="Sampul" bare>
      <img
        src={coverGlasses}
        alt="Sepasang kacamata korektif berbingkai tipis"
        style={{ position: "absolute", right: 0, top: 0, width: 860, height: 1080, objectFit: "cover" }}
      />

      <div
        aria-hidden
        style={{ position: "absolute", right: 0, bottom: 0, width: 860, height: 96, background: C.petrol }}
      />
      <span
        style={{
          position: "absolute",
          right: 34,
          bottom: 36,
          fontFamily: FONT.mono,
          fontSize: 15,
          letterSpacing: "0.03em",
          color: C.onDarkSoft,
        }}
      >
        Foto: Jacek Halicki · CC BY-SA 4.0
      </span>

      <div style={{ position: "absolute", left: 96, top: 0, width: 900, height: 1080 }}>
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 120,
            fontFamily: FONT.mono,
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: C.inkFaint,
          }}
        >
          Dispensing II · Rangkuman kuliah
        </span>

        <h1
          style={{
            position: "absolute",
            left: 0,
            top: 176,
            fontFamily: FONT.display,
            fontWeight: 600,
            fontSize: T.cover,
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            color: C.ink,
          }}
        >
          Lensa
          <br />
          Oftalmik
        </h1>

        <div aria-hidden style={{ position: "absolute", left: 0, top: 512, width: 104, height: 5, background: C.amber }} />

        <p
          style={{
            position: "absolute",
            left: 0,
            top: 550,
            width: 770,
            fontFamily: FONT.text,
            fontSize: T.lede,
            lineHeight: 1.4,
            color: C.inkSoft,
          }}
        >
          Dari pasir kuarsa sampai polikarbonat: bahan lensa, angka optiknya, dan batas fisik yang
          membuatnya layak dipakai.
        </p>

        <div
          style={{
            position: "absolute",
            left: 0,
            top: 790,
            width: 820,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 36,
            rowGap: 16,
          }}
        >
          {PARTS.map((part) => (
            <div key={part.n} style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.1em", color: C.amberDeep, width: 44 }}>
                {part.n}
              </span>
              <span style={{ fontFamily: FONT.text, fontSize: T.small, lineHeight: 1.3, color: C.ink }}>
                {part.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            top: 958,
            width: 770,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${C.rule}`,
            paddingTop: 18,
          }}
        >
          <span style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.06em", color: C.inkFaint }}>
            {COURSE}
          </span>
          <span style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.06em", color: C.inkFaint }}>
            20 lembar
          </span>
        </div>
      </div>
    </Sheet>
  );
}
