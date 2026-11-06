import { C, FONT } from "../theme";
import { Sheet, Title } from "../Frame";

const KASUS = [
  { no: "01", head: "Anak kelas 5 SD", ask: "Siapa yang seharusnya menyaring?" },
  { no: "02", head: "Siswa SMA & gawai", ask: "Upaya promotif siapa yang hilang?" },
  { no: "03", head: "Pegawai kantor", ask: "Promotif, preventif, kuratif?" },
  { no: "04", head: "Desa tanpa layanan mata", ask: "Subsistem mana yang paling berperan?" },
];

/** Four cases cut to a title and a question. The room answers, not the slide. */
export default function Slide19() {
  return (
    <Sheet n={19} section="Studi kasus" cite="Empat situasi">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={64} max={1000}>Empat kasus</Title>
        <p style={{ fontSize: 24, color: C.inkFaint, maxWidth: 460, textAlign: "right", lineHeight: 1.4 }}>
          Kasus kelima menyusul: soal biaya.
        </p>
      </div>

      <div className="grid grid-cols-2" style={{ marginTop: 44, columnGap: 64, rowGap: 52, flex: 1, gridTemplateRows: "1fr 1fr" }}>
        {KASUS.map((k) => (
          <div key={k.no} style={{ borderTop: "2px solid " + C.ink, paddingTop: 24, display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 52,
                lineHeight: 0.85,
                color: C.pink,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {k.no}
            </span>
            <p style={{ fontSize: 40, color: C.ink, marginTop: 22, lineHeight: 1.12 }}>{k.head}</p>
            <p style={{ fontSize: 26, color: C.pinkDeep, marginTop: 18, lineHeight: 1.35, fontWeight: 500 }}>
              {k.ask}
            </p>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
