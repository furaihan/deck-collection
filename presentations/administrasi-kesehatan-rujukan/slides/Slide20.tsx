import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const TAHAP = ["Promotif", "Preventif", "Kuratif", "Rehabilitatif"];

const RANTAI = ["Optometris", "Puskesmas", "Rumah sakit", "BPJS"];

/** The closing plate: one case, four links in the chain, one sentence. */
export default function Slide20() {
  return (
    <Sheet n={20} section="Studi kasus" cite="Kasus 05" line={false} tone="pink">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Title size={62} max={980} color={C.onPink}>
          Lansia, katarak, biaya
        </Title>
        <Label color={C.onPinkFaint}>Kasus 05</Label>
      </div>

      <p style={{ marginTop: 20, fontSize: 36, lineHeight: 1.35, color: C.onPink, maxWidth: 1240 }}>
        Operasi katarak ditanggung BPJS. Pasien tidak tahu prosedurnya.
      </p>

      <div style={{ display: "flex", gap: 18, marginTop: "auto" }}>
        {RANTAI.map((r, i) => (
          <div
            key={r}
            style={{
              flex: 1,
              borderTop: "2px solid " + C.onPink,
              paddingTop: 14,
            }}
          >
            <span style={{ fontSize: 19, letterSpacing: "0.14em", color: C.onPinkFaint }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p style={{ fontSize: 32, color: C.onPink, marginTop: 10, lineHeight: 1.15 }}>{r}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
        {TAHAP.map((t, i) => (
          <span
            key={t}
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.07em",
              color: i === 2 ? C.pink : C.onPink,
              background: i === 2 ? C.onPink : "transparent",
              border: "1px solid " + (i === 2 ? C.onPink : "rgba(255,244,248,0.35)"),
              padding: "9px 20px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "auto", borderTop: "2px solid " + C.onPink, paddingTop: 20, paddingBottom: 8 }}>
        <p style={{ fontFamily: FONT.display, fontSize: 46, lineHeight: 1.16, color: C.onPink, maxWidth: 1320 }}>
          Pelayanan kesehatan bukan sekadar pekerjaan, tetapi bentuk pengabdian untuk kehidupan.
        </p>
      </div>
    </Sheet>
  );
}
