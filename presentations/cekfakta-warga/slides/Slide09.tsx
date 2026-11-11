import { BookOpen, Building, ClipboardList, Coins, Cpu, Globe, Users, Waypoints } from "lucide-react";
import { C, FONT } from "../theme";
import { Sheet, Head, Body, Label, inkOn } from "../Frame";

const impact = [
  {
    icon: Users,
    title: "Pengguna",
    body: "Peserta terbiasa memeriksa sumber, tanggal, konteks, lokasi, dan bukti. Peningkatan diukur lewat pre/post-test, bukan diasumsikan.",
  },
  {
    icon: Building,
    title: "Komunitas & mitra",
    body: "Modul latihan siap pakai dan fasilitator terlatih; organisasi cek fakta mendapat kanal edukasi dengan atribusi.",
  },
  {
    icon: Cpu,
    title: "Teknologi",
    body: "PWA ringan dengan alur kurasi review ganda dan asesmen terintegrasi yang bisa direplikasi ke komunitas lain.",
  },
  {
    icon: BookOpen,
    title: "Pengetahuan",
    body: "Data evaluasi dan artikel ilmiah tentang efektivitas latihan verifikasi untuk orang dewasa di Indonesia.",
  },
];

const sustain = [
  {
    icon: Coins,
    title: "Biaya operasional rendah",
    body: "Hosting US$18/bulan sudah dibayar sampai 7 bulan pasca-proyek.",
  },
  {
    icon: ClipboardList,
    title: "Serah terima lengkap",
    body: "Kode sumber, handbook teknis, dan panduan diserahkan dengan berita acara.",
  },
  {
    icon: Waypoints,
    title: "Konten berbasis relawan",
    body: "Kerangka kurasi dan review ganda memungkinkan relawan menambah kasus tanpa pengembang.",
  },
  {
    icon: Globe,
    title: "Replikasi & pendanaan lanjutan",
    body: "Jejaring Solver MIT Solve membuka peluang lanjutan; selisih US$2.110 dialokasikan untuk hosting.",
  },
];

/** What changes, and what keeps running after the grant ends. */
export default function Slide09() {
  const tone = inkOn("mist");

  return (
    <Sheet n={9} section="Dampak" ground="mist">
      <Head size={84} max={1400}>
        Yang berubah, dan yang tetap berjalan.
      </Head>

      <div style={{ display: "flex", marginTop: 40, flex: 1, minHeight: 0 }}>
        <div style={{ width: 872, flex: "none", background: C.jade, padding: "28px 36px 32px" }}>
          <Label color={C.arcane}>Dampak</Label>
          <div style={{ marginTop: 14 }}>
            {impact.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: 20,
                    height: 148,
                    padding: "18px 0",
                    borderTop: "1px solid rgba(24,35,47,0.18)",
                  }}
                >
                  <Icon size={24} strokeWidth={1.6} color={C.arcane} style={{ flex: "none", marginTop: 4 }} />
                  <div>
                    <div style={{ fontFamily: FONT.text, fontWeight: 600, fontSize: 26, color: C.void }}>
                      {item.title}
                    </div>
                    <Body size={21} color={C.arcane} lh={1.4} style={{ marginTop: 5, maxWidth: 720 }}>
                      {item.body}
                    </Body>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1, background: C.mist, padding: "28px 36px 32px", marginLeft: 24 }}>
          <Label color={C.onMistFaint}>Keberlanjutan</Label>
          <div style={{ marginTop: 14 }}>
            {sustain.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: 20,
                    height: 148,
                    padding: "18px 0",
                    borderTop: `1px solid ${tone.ruleSoft}`,
                  }}
                >
                  <Icon size={24} strokeWidth={1.6} color={tone.accent} style={{ flex: "none", marginTop: 4 }} />
                  <div>
                    <div style={{ fontFamily: FONT.text, fontWeight: 600, fontSize: 26, color: tone.ink }}>
                      {item.title}
                    </div>
                    <Body size={21} color={tone.soft} lh={1.4} style={{ marginTop: 5, maxWidth: 700 }}>
                      {item.body}
                    </Body>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "auto", flex: "none", borderTop: `1px solid ${tone.rule}`, paddingTop: 18 }}>
        <Body size={21} color={tone.faint} lh={1.5} max={1600}>
          Dampak sosial jangka panjang — berkurangnya penyebaran konten keliru di jejaring peserta — belum
          diukur dalam proyek ini dan menjadi agenda lanjutan.
        </Body>
      </div>
    </Sheet>
  );
}
