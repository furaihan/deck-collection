import { C, FONT } from "../theme";
import { Label, Sheet, Title } from "../Frame";

const TUJUAN = [
  { no: "I", head: "Derajat kesehatan" },
  { no: "II", head: "Kebutuhan masyarakat" },
  { no: "III", head: "Keadilan biaya" },
];

const PELAKU = ["Masyarakat", "Pemerintah", "Legislatif", "Yudikatif"];

/** Three ends, four parties. Almost no prose. */
export default function Slide05() {
  return (
    <Sheet n={5} section="Sistem Kesehatan Nasional" cite="Tujuan &amp; pelaku">
      <Title size={66} max={1000}>Tiga tujuan, empat pelaku</Title>

      <div style={{ display: "flex", gap: 64, marginTop: 46, flex: 1 }}>
        <div style={{ flex: 1.15, display: "flex", flexDirection: "column" }}>
          <Label>Tujuan</Label>
          <div style={{ marginTop: 18, flex: 1, display: "flex", flexDirection: "column" }}>
            {TUJUAN.map((t) => (
              <div
                key={t.no}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  flex: 1,
                  borderTop: "1px solid " + C.rule,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 46,
                    lineHeight: 0.9,
                    color: C.pink,
                    width: 76,
                    flex: "none",
                  }}
                >
                  {t.no}
                </span>
                <span style={{ fontSize: 36, color: C.ink, lineHeight: 1.15 }}>{t.head}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: "none", width: 620, display: "flex", flexDirection: "column" }}>
          <Label>Pelaku</Label>
          <div style={{ marginTop: 18, flex: 1, display: "flex", flexDirection: "column" }}>
            {PELAKU.map((p) => (
              <div
                key={p}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  borderTop: "1px solid " + C.rule,
                  fontSize: 34,
                  color: C.ink,
                  lineHeight: 1.15,
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  );
}
