import { C, FONT } from "../theme";
import { Sheet, Title } from "../Frame";

const ALASAN = [
  { no: "01", head: "Bagian dari SKN", word: "kedudukan" },
  { no: "02", head: "Mengelola layanan", word: "kemampuan" },
  { no: "03", head: "Tahu arah rujukan", word: "jalan pasien" },
  { no: "04", head: "Layanan terpadu", word: "kerja bersama" },
];

/** Four reasons, four words. The numerals carry the page. */
export default function Slide02() {
  return (
    <Sheet n={2} section="Pembuka" cite="Capaian pembelajaran">
      <Title max={1500}>Mengapa optometris mempelajari ini</Title>

      <p style={{ marginTop: 18, fontSize: 30, color: C.inkSoft, maxWidth: 1200 }}>
        Capaian pembelajaran: menjelaskan SKN — definisi, landasan, Panca Karya, Panca Karsa.
      </p>

      <div className="grid grid-cols-4" style={{ marginTop: 56, columnGap: 40, flex: 1, gridTemplateRows: "1fr", paddingBottom: 96 }}>
        {ALASAN.map((a) => (
          <div
            key={a.no}
            style={{ borderTop: "2px solid " + C.ink, paddingTop: 22, display: "flex", flexDirection: "column" }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 96,
                lineHeight: 0.85,
                color: C.pink,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {a.no}
            </span>
            <div style={{ marginTop: "auto", paddingTop: 26, paddingBottom: 8 }}>
              <p style={{ fontSize: 32, color: C.ink, lineHeight: 1.18, fontWeight: 500 }}>{a.head}</p>
              <p style={{ marginTop: 12, fontSize: 19, color: C.inkGhost, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {a.word}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "auto", paddingBottom: 12, fontSize: 28, color: C.inkSoft, borderTop: "1px solid " + C.rule, paddingTop: 20 }}>
        Empat alasan, satu titik: pasien mata menempuh jalur panjang sebelum dan sesudah meja periksa.
      </p>
    </Sheet>
  );
}
