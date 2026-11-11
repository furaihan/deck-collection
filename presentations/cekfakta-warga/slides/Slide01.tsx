import { CalendarDays, FileSearch, Globe, MapPin, MessageSquareQuote } from "lucide-react";
import { C, FONT, T } from "../theme";

const mono = {
  fontFamily: FONT.mono,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  lineHeight: 1.3,
};

const checks = [
  { label: "Sumber", icon: Globe },
  { label: "Tanggal", icon: CalendarDays },
  { label: "Konteks", icon: MessageSquareQuote },
  { label: "Lokasi", icon: MapPin },
  { label: "Bukti", icon: FileSearch },
];

const facts = [
  { label: "Durasi", value: "9 bulan", ask: false },
  { label: "Penerima", value: "80 peserta", ask: false },
  { label: "Diminta", value: "US$7.890", ask: true },
];

/**
 * Cover. The sheet is split: the void field carries the argument, and a jade
 * annex carries the five checks — the one thing the product actually asks a
 * reader to do. The ask is the only filled field on the page.
 */
export default function Slide01() {
  return (
    <div
      lang="id"
      className="relative h-full w-full overflow-hidden"
      style={{ background: C.void, color: C.onVoid, fontFamily: FONT.text }}
    >
      {/* The annex: colour as a role, not as decoration. */}
      <div
        style={{
          position: "absolute",
          left: 1360,
          top: 0,
          right: 0,
          bottom: 0,
          background: C.jade,
          color: C.void,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 96,
            top: 196,
            ...mono,
            fontSize: T.micro,
            fontWeight: 500,
            color: C.arcane,
          }}
        >
          Yang diperiksa
        </span>

        <div style={{ position: "absolute", left: 96, right: 96, top: 240 }}>
          {checks.map((check) => {
            const Icon = check.icon;
            return (
              <div
                key={check.label}
                style={{
                  height: 128,
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  borderTop: `1px solid rgba(24,35,47,0.16)`,
                }}
              >
                <Icon size={26} strokeWidth={1.5} color={C.arcane} />
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 600,
                    fontSize: 34,
                    lineHeight: 1,
                    color: C.void,
                  }}
                >
                  {check.label}
                </span>
              </div>
            );
          })}
        </div>

        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 96,
            right: 96,
            top: 880,
            height: 1,
            background: "rgba(24,35,47,0.16)",
          }}
        />

        <span
          style={{
            position: "absolute",
            left: 96,
            top: 902,
            ...mono,
            fontSize: 20,
            color: C.arcane,
          }}
        >
          6 November 2026
        </span>
      </div>

      {/* The field: the argument, in the deck's own voice. */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 96,
          width: 1168,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ ...mono, fontSize: 18, color: C.onVoidFaint, whiteSpace: "nowrap" }}>
          IT Project Management · S2 Informatika AMIKOM Yogyakarta
        </span>
        <span style={{ ...mono, fontSize: 18, color: C.jade, whiteSpace: "nowrap" }}>
          Proposal hibah
        </span>
      </div>

      <div
        aria-hidden
        style={{ position: "absolute", left: 96, top: 170, width: 1168, height: 1, background: C.ruleVoid }}
      />

      <h1
        style={{
          position: "absolute",
          left: 96,
          top: 220,
          fontFamily: FONT.display,
          fontWeight: 700,
          fontSize: T.cover,
          lineHeight: 0.84,
          letterSpacing: "-0.005em",
          color: C.onVoid,
        }}
      >
        CekFakta Warga
      </h1>

      <p
        style={{
          position: "absolute",
          left: 96,
          top: 412,
          maxWidth: 1050,
          fontSize: 38,
          lineHeight: 1.35,
          color: C.jade,
        }}
      >
        Platform latihan verifikasi informasi berbasis skenario untuk masyarakat dewasa.
      </p>

      <div style={{ position: "absolute", left: 96, top: 620, display: "flex", gap: 20 }}>
        {facts.map((fact) => (
          <div
            key={fact.label}
            style={{
              width: 300,
              background: fact.ask ? C.jade : "transparent",
              border: `1px solid ${fact.ask ? C.jade : C.ruleVoid}`,
              padding: "30px 28px 32px",
            }}
          >
            <div
              style={{
                ...mono,
                fontSize: T.micro,
                fontWeight: 500,
                color: fact.ask ? C.arcane : C.onVoidFaint,
              }}
            >
              {fact.label}
            </div>
            <div
              style={{
                marginTop: 18,
                fontFamily: FONT.display,
                fontWeight: 600,
                fontSize: 50,
                lineHeight: 1,
                color: fact.ask ? C.void : C.onVoid,
              }}
            >
              {fact.value}
            </div>
          </div>
        ))}
      </div>

      <div
        aria-hidden
        style={{ position: "absolute", left: 96, top: 880, width: 1168, height: 1, background: C.ruleVoid }}
      />

      <div
        style={{
          position: "absolute",
          left: 96,
          top: 902,
          width: 1168,
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <span style={{ fontSize: 22, color: C.onVoidSoft }}>
          Muhammad Zhafar Al Fathi · Putu Agus Indra Yoga · Andhityas Dhemri Suryantoro
        </span>
        <span style={{ ...mono, fontSize: 20, color: C.jade }}>MIT Solve · 2027</span>
      </div>
    </div>
  );
}
