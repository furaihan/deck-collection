import { Film, Title, Prose, Label } from "../Frame";
import { C, FONT } from "../theme";

/** The biconvex lens: parallel rays, one focal point, the frame's only drawing. */
function LensFigure() {
  return (
    <svg width="600" height="470" viewBox="0 0 600 470" aria-hidden>
      <defs>
        <linearGradient id="lensGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="46%" stopColor="#F6EAD2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C9B486" stopOpacity="0.38" />
        </linearGradient>
        <radialGradient id="focusGlow">
          <stop offset="0%" stopColor="#FFD98A" stopOpacity="0.95" />
          <stop offset="60%" stopColor={C.amber} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.amber} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="470" cy="235" r="52" fill="url(#focusGlow)" />
      <line x1="0" y1="235" x2="600" y2="235" stroke={C.ink} strokeWidth="1.2" opacity="0.55" />

      {[118, 186, 254].map((y, i) => (
        <g key={i}>
          <line x1="10" y1={y} x2="252" y2={y} stroke={C.ink} strokeWidth="1.6" />
          <line x1="252" y1={y} x2="470" y2="235" stroke={C.ink} strokeWidth="1.6" />
        </g>
      ))}

      <path d="M252 74 C 198 122, 198 348, 252 396 C 306 348, 306 122, 252 74 Z" fill="url(#lensGlass)" stroke={C.ink} strokeWidth="2.6" />
      <path d="M252 74 C 226 122, 226 348, 252 396" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.75" />

      <circle cx="470" cy="235" r="6" fill={C.holeGate} />
      <line x1="470" y1="235" x2="470" y2="424" stroke={C.amber} strokeWidth="1.6" strokeDasharray="5 7" />
      <line x1="252" y1="424" x2="470" y2="424" stroke={C.amber} strokeWidth="1.6" />
      <text x="344" y="450" fill={C.inkFaint} fontFamily={FONT.mono} fontSize="17" letterSpacing="1.6">f</text>
      <text x="262" y="58" fill={C.inkFaint} fontFamily={FONT.mono} fontSize="16" letterSpacing="1.2">n = 1.498</text>
    </svg>
  );
}

export default function Slide01() {
  return (
    <Film n={1} section="Dispensing II · Semester 3" accent="26-1">
      <div className="flex flex-1 items-center" style={{ gap: 54 }}>
        <div style={{ flex: 1, maxWidth: 900 }}>
          <Title size={196} lineHeight={0.84}>Lensa<br />Oftalmik</Title>
          <div
            style={{
              width: 210,
              height: 7,
              margin: "40px 0 30px",
              background: `linear-gradient(90deg, ${C.amber} 0%, ${C.amber} 62%, rgba(227,154,46,0) 100%)`,
            }}
          />
          <Prose size={31} max={700} color={C.ink}>
            Dari kaca cair di pot peleburan sampai CR-39 dan polikarbonat:
            bahan, sifat optik, dan sifat fisik lensa kacamata.
          </Prose>
          <div style={{ marginTop: 44, display: "flex", gap: 44 }}>
            <Label size={17}>Empat berkas kuliah</Label>
            <Label size={17}>20 frame</Label>
          </div>
        </div>
        <div style={{ flex: "none", width: 600 }}>
          <LensFigure />
        </div>
      </div>
    </Film>
  );
}
