import { C, FONT } from "../theme";
import { FieldBox } from "../Frame";

const mono = {
  fontFamily: FONT.mono,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  lineHeight: 1.3,
};

/** Closing: the ask, stated once, with the team under it. */
export default function Slide10() {
  return (
    <div
      lang="id"
      className="relative h-full w-full overflow-hidden"
      style={{ background: C.void, color: C.onVoid, fontFamily: FONT.text }}
    >
      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: 96,
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <span style={{ ...mono, fontSize: 20, color: C.onVoidFaint }}>Penutup</span>
        <span style={{ ...mono, fontSize: 20, color: C.onVoidFaint }}>
          CekFakta Warga · 2027 Global Learning Challenge
        </span>
      </div>

      <div
        aria-hidden
        style={{ position: "absolute", left: 96, right: 96, top: 142, height: 1, background: C.ruleVoid }}
      />

      <h2
        style={{
          position: "absolute",
          left: 96,
          top: 220,
          maxWidth: 1240,
          fontFamily: FONT.display,
          fontWeight: 600,
          fontSize: 84,
          lineHeight: 1.02,
          color: C.onVoid,
        }}
      >
        US$7.890 untuk 80 warga, 40 kasus, dan bukti belajar yang bisa diukur.
      </h2>

      <p
        style={{
          position: "absolute",
          left: 96,
          top: 500,
          maxWidth: 1080,
          fontSize: 30,
          lineHeight: 1.5,
          color: C.onVoidSoft,
        }}
      >
        Dana grant menyempurnakan prototipe menjadi MVP siap pilot, menjalankan pilot empat minggu, dan
        mengukur hasil belajarnya.
      </p>

      <p
        style={{
          position: "absolute",
          left: 96,
          top: 660,
          maxWidth: 1080,
          fontSize: 24,
          lineHeight: 1.5,
          color: C.jade,
        }}
      >
        Selaras dengan 2027 Global Learning Challenge: asesmen yang mengukur hasil belajar, desain
        low-resource, dan keterlibatan komunitas. Batas pengajuan 6 November 2026.
      </p>

      <div style={{ position: "absolute", left: 1400, top: 220, width: 424 }}>
        <FieldBox label="Diminta" border={C.ruleVoid} faint={C.onVoidFaint}>
          <div
            style={{
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: 56,
              lineHeight: 1,
              color: C.onVoid,
            }}
          >
            US$7.890
          </div>
          <div style={{ marginTop: 10, fontFamily: FONT.mono, fontSize: 22, color: C.jade }}>
            Rp142.559.043
          </div>
          <div style={{ marginTop: 14, fontSize: 20, lineHeight: 1.4, color: C.onVoidFaint }}>
            9 bulan · 80 peserta · ≥ 40 kasus
          </div>
        </FieldBox>
      </div>

      <div
        aria-hidden
        style={{ position: "absolute", left: 96, right: 96, top: 880, height: 1, background: C.ruleVoid }}
      />

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: 902,
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <span style={{ fontSize: 22, color: C.onVoidSoft }}>
          Muhammad Zhafar Al Fathi · Putu Agus Indra Yoga · Andhityas Dhemri Suryantoro
        </span>
        <span style={{ ...mono, fontSize: 20, color: C.jade }}>MIT Solve · 6 November 2026</span>
      </div>
    </div>
  );
}
