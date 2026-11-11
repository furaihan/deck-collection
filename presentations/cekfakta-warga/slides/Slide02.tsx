import { Newspaper, MessagesSquare, ChartColumn } from "lucide-react";
import { C, T } from "../theme";
import { Sheet, Head, Body, Figure, Label, inkOn } from "../Frame";

const entries = [
  {
    value: "1.923",
    label: "konten hoaks diklarifikasi Komdigi sepanjang 2024 — penipuan menjadi kategori terbesar.",
    tag: "[3] ANTARA, Jan 2025",
    icon: Newspaper,
  },
  {
    value: "1.674",
    label: "hoaks tercatat Ditjen Pengawasan Ruang Digital, 22 Okt 2024 – 20 Okt 2025.",
    tag: "[4] JawaPos, Jul 2026",
    icon: MessagesSquare,
  },
  {
    value: "34,42",
    label: "skor pilar pemberdayaan IMDI 2025 — pilar terendah, dari indeks total 44,53.",
    tag: "[7] Komdigi / InfoPublik",
    icon: ChartColumn,
  },
];

/** The problem: the numbers, and the gap they leave open. */
export default function Slide02() {
  const tone = inkOn("void");

  return (
    <Sheet n={2} section="Masalah" ground="void">
      <Head max={1240}>Klarifikasi selalu datang belakangan.</Head>

      <div style={{ display: "flex", gap: 48, marginTop: 56 }}>
        {entries.map((entry) => {
          const Icon = entry.icon;
          return (
            <div key={entry.value} style={{ width: 520, flex: "none" }}>
              <div style={{ height: 1, background: tone.rule }} />
              <Figure size={132} color={tone.ink} style={{ marginTop: 30 }}>
                {entry.value}
              </Figure>
              <Body
                size={T.small}
                color={tone.soft}
                lh={1.4}
                style={{ marginTop: 26, maxWidth: 470, minHeight: 112 }}
              >
                {entry.label}
              </Body>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
                <Icon size={20} strokeWidth={1.6} color={tone.accent} />
                <Label color={tone.faint} size={T.micro}>
                  {entry.tag}
                </Label>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 40, background: C.jade, padding: "26px 32px 30px", maxWidth: 1420 }}>
        <Body size={28} color={C.void} lh={1.45}>
          Komdigi mengingatkan informasi yang tidak sesuai fakta — termasuk konten lama yang beredar kembali —
          memicu persepsi keliru, kepanikan, dan polarisasi, dan menilai cara lama literasi digital tidak lagi
          cukup di era AI [5], [6].
        </Body>
      </div>

      <div
        style={{
          marginTop: "auto",
          flex: "none",
          borderTop: `3px solid ${tone.accent}`,
          paddingTop: 24,
          maxWidth: 1600,
        }}
      >
        <Body size={32} color={tone.ink} lh={1.4}>
          Layanan cek fakta menjawab “apakah ini benar?”. Yang belum ada: tempat warga berlatih memeriksa
          sendiri sebelum membagikan.
        </Body>
      </div>
    </Sheet>
  );
}
