import { Film, Title, Label, Kicker } from "../Frame";
import { C, FONT, LIT } from "../theme";

function AberrationDiagram() {
  return (
    <svg width="740" height="420" viewBox="0 0 660 330" aria-hidden>
      <defs>
        <linearGradient id="abLens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#F4E9D2" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#CBB489" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <line x1="24" y1="165" x2="636" y2="165" stroke={C.ink} strokeWidth="1.4" strokeDasharray="7 7" opacity="0.6" />
      <path d="M170 30 C 132 90, 132 240, 170 300 C 208 240, 208 90, 170 30 Z" fill="rgba(255,252,244,0.7)" stroke={C.ink} strokeWidth="2.6" />
      {[
        { y: 62, stop: 470, c: "#3D6FD8" },
        { y: 105, stop: 512, c: "#2F8C57" },
        { y: 148, stop: 552, c: "#C9922A" },
      ].map((ray, i) => (
        <g key={i}>
          <line x1="34" y1={ray.y} x2="162" y2={ray.y} stroke={ray.c} strokeWidth="2.4" />
          <line x1="178" y1={ray.y} x2={ray.stop} y2="165" stroke={ray.c} strokeWidth="2.4" />
        </g>
      ))}
      {[
        { x: 470, c: "#3D6FD8" },
        { x: 512, c: "#2F8C57" },
        { x: 552, c: "#C9922A" },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy="165" r="13" fill={p.c} opacity="0.18" />
          <circle cx={p.x} cy="165" r="5" fill={p.c} />
        </g>
      ))}
      <line x1="470" y1="165" x2="552" y2="165" stroke={C.amber} strokeWidth="5" />
      <text x="452" y="200" fill={C.inkFaint} fontFamily={FONT.mono} fontSize="15">fokus biru</text>
      <text x="478" y="230" fill={C.inkFaint} fontFamily={FONT.mono} fontSize="15">fokus merah</text>
    </svg>
  );
}

export default function Slide13() {
  return (
    <Film n={13} section="02 · Sifat optik" accent="Aberasi kromatis">
      <div style={{ flex: "none" }}>
        <Title size={70} max={1200}>Tiga warna, tiga titik fokus, satu lensa</Title>
      </div>

      <div className="flex items-start" style={{ gap: 48, marginTop: 22, flex: 1 }}>
        <div
          style={{
            flex: "none",
            width: 780,
            background: LIT.plate,
            boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(20,21,24,0.09), 0 22px 42px rgba(58,46,28,0.18)",
            padding: "18px 20px 12px",
          }}
        >
          <AberrationDiagram />
          <div style={{ marginTop: 2, fontFamily: FONT.mono, fontSize: 16, letterSpacing: "0.1em", color: C.inkFaint }}>
            Tiga panjang gelombang, satu lensa, tiga titik fokus.
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              background: LIT.plateInk,
              boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset, 0 24px 42px rgba(20,21,24,0.38)",
              padding: "20px 24px",
            }}
          >
            <Label size={15} color={C.amber}>Aksial</Label>
            <div style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 23, lineHeight: 1.42, color: C.paper }}>
              Warna berbeda berfokus pada jarak berbeda sepanjang sumbu optik.
              Bayangan tampak berwarna karena setiap warna tajam di tempat lain.
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              background: LIT.plateFlat,
              boxShadow: "0 0 0 1px rgba(20,21,24,0.13)",
              padding: "20px 24px",
            }}
          >
            <Label size={15} color={C.ink}>Transversal</Label>
            <div style={{ marginTop: 8, fontFamily: FONT.text, fontSize: 23, lineHeight: 1.42, color: C.ink }}>
              Warna berbeda jatuh di titik berbeda pada bidang fokus yang sama,
              sehingga ukuran bayangan berubah dan tepi objek bergaris warna.
            </div>
          </div>

          <Kicker size={29} max={560}>
            Keduanya terjadi karena lensa gagal memfokuskan semua warna pada satu titik.
          </Kicker>
        </div>
      </div>
    </Film>
  );
}