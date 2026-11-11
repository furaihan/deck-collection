import {
  CirclePlay,
  ClipboardCheck,
  FileStack,
  LayoutDashboard,
  Search,
  Share2,
  UserCog,
  WifiOff,
} from "lucide-react";
import { C, FONT, T } from "../theme";
import { Sheet, Head, Body, inkOn } from "../Frame";

const features = [
  { icon: UserCog, title: "Akun & peran", detail: "peserta · kurator · reviewer · admin" },
  { icon: FileStack, title: "CMS kurasi", detail: "draft → review ganda → terbit" },
  { icon: CirclePlay, title: "Mesin latihan skenario", detail: "umpan balik setelah keputusan" },
  { icon: Search, title: "Pencarian & filter kasus", detail: "menemukan kasus yang dilatih" },
  { icon: ClipboardCheck, title: "Kuis & pre/post-test", detail: "sebelum dan sesudah program" },
  { icon: Share2, title: "Bagikan ke WhatsApp", detail: "berbagi hasil latihan" },
  { icon: WifiOff, title: "Hemat data & cache offline", detail: "untuk koneksi lemah" },
  { icon: LayoutDashboard, title: "Dasbor evaluasi", detail: "skor, penyelesaian, dan SUS" },
];

const stack = [
  { label: "Framework", value: "Laravel · PHP ≥ 8.5" },
  { label: "Antarmuka", value: "Blade + JS · PWA" },
  { label: "Basis data", value: "PostgreSQL" },
  { label: "Hosting", value: "VPS 2 vCPU · 2 GB · US$6/bln" },
];

/** What gets built: the eight MVP features, and what they run on. */
export default function Slide04() {
  const tone = inkOn("arcane");

  return (
    <Sheet n={4} section="Solusi" ground="arcane">
      <Head size={T.h1Sm} max={1400}>
        Delapan fitur MVP, satu PWA ringan.
      </Head>

      <Body size={30} color={tone.soft} lh={1.4} max={1420} style={{ marginTop: 24 }}>
        Tanpa AI, tanpa crawler, tanpa chatbot. Dikembangkan hybrid dalam 4 sprint × 2 minggu.
      </Body>

      <div
        style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 72,
          rowGap: 0,
        }}
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                padding: "18px 0",
                borderTop: i < 2 ? "none" : `1px solid ${tone.ruleSoft}`,
              }}
            >
              <Icon size={24} strokeWidth={1.6} color={tone.accent} style={{ flex: "none", marginTop: 5 }} />
              <div>
                <div
                  style={{
                    fontFamily: FONT.text,
                    fontWeight: 600,
                    fontSize: 28,
                    lineHeight: 1.2,
                    color: tone.ink,
                  }}
                >
                  {feature.title}
                </div>
                <Body size={21} color={tone.soft} lh={1.35} style={{ marginTop: 5 }}>
                  {feature.detail}
                </Body>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "auto", display: "flex", gap: 20, flex: "none" }}>
        {stack.map((item) => (
          <div key={item.label} style={{ flex: 1, background: C.emeraldDeep, padding: "22px 24px 26px" }}>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: T.micro,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                lineHeight: 1.3,
                color: C.mist,
              }}
            >
              {item.label}
            </div>
            <div style={{ marginTop: 12, fontFamily: FONT.text, fontWeight: 500, fontSize: 24, color: C.mist }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
