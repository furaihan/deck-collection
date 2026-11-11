import { Fragment } from "react";
import { ArrowRight, CalendarDays, FileSearch, Globe, MapPin, MessageSquareQuote } from "lucide-react";
import { C, FONT } from "../theme";
import { Sheet, Head, Body, Label, inkOn } from "../Frame";

const checks = [
  { label: "Sumber", q: "Siapa yang menerbitkan, dan apa rekam jejaknya?", icon: Globe },
  { label: "Tanggal", q: "Kapan ini terbit, dan masih berlaku?", icon: CalendarDays },
  { label: "Konteks", q: "Apa yang terjadi sebelum dan sesudahnya?", icon: MessageSquareQuote },
  { label: "Lokasi", q: "Di mana ini terjadi — dan apakah cocok?", icon: MapPin },
  { label: "Bukti", q: "Adakah sumber lain yang menguatkannya?", icon: FileSearch },
];

const loop = ["Kasus", "Periksa", "Putuskan", "Jelaskan", "Ukur"];

/** The solution: five checks, one decision, one explanation. */
export default function Slide03() {
  const tone = inkOn("mist");

  return (
    <Sheet n={3} section="Solusi" ground="mist">
      <Head max={1300}>Lima pemeriksaan, satu keputusan.</Head>

      <Body size={34} color={tone.soft} lh={1.4} max={1280} style={{ marginTop: 26 }}>
        CekFakta Warga mengubah kasus hoaks yang sudah diklarifikasi sumber tepercaya menjadi latihan
        interaktif. Pengguna tidak langsung diberi jawaban.
      </Body>

      <div
        style={{
          display: "flex",
          marginTop: 60,
          height: 236,
          width: 1650,
          borderBottom: `1px solid ${tone.ruleSoft}`,
        }}
      >
        {checks.map((check, i) => {
          const Icon = check.icon;
          return (
          <div
            key={check.label}
            style={{
              width: 330,
              flex: "none",
              height: "100%",
              paddingLeft: i === 0 ? 0 : 30,
              borderLeft: i === 0 ? "none" : `1px solid ${tone.ruleSoft}`,
            }}
          >
            <Icon size={32} strokeWidth={1.5} color={tone.accent} />
            <div
              style={{
                marginTop: 20,
                fontFamily: FONT.display,
                fontWeight: 600,
                fontSize: 38,
                lineHeight: 1,
                color: tone.ink,
              }}
            >
              {check.label}
            </div>
            <Body size={22} color={tone.soft} lh={1.4} style={{ marginTop: 10, maxWidth: 272 }}>
              {check.q}
            </Body>
          </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 44,
          flex: "none",
          background: C.jade,
          padding: "24px 30px 26px",
          maxWidth: 1650,
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <Label color={C.arcane} size={20} style={{ flex: "none" }}>
          Setelah memutuskan
        </Label>
        <Body size={24} color={C.void} lh={1.4}>
          Penjelasan, tautan klarifikasi asli, dan kuis singkat — jawabannya tidak pernah diberikan lebih dulu.
        </Body>
      </div>

      <div style={{ marginTop: "auto", flex: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {loop.map((step, i) => (
            <Fragment key={step}>
              {i > 0 ? <ArrowRight size={20} strokeWidth={1.6} color={tone.accent} /> : null}
              <Label color={tone.ink} size={20}>
                {step}
              </Label>
            </Fragment>
          ))}
        </div>

        <div style={{ height: 1, background: tone.ruleSoft, marginTop: 26 }} />

        <Body size={20} color={tone.faint} lh={1.5} max={1600} style={{ marginTop: 20 }}>
          Dasar bukti: permainan prebunking Bad News menurunkan penilaian keandalan berita palsu
          (d = 0,52) [10]; lateral reading terbukti efektif pada pemeriksa fakta profesional [11].
        </Body>
      </div>
    </Sheet>
  );
}
