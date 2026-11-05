import { Layers } from "lucide-react";

/**
 * Cover. Drawn on the slide's own 1920x1080 sheet; nothing here reads from the
 * app shell's theme.
 */
export default function Slide01() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0d1b2a] text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(110% 80% at 78% 22%, rgba(94,160,255,0.42) 0%, rgba(13,27,42,0) 62%), radial-gradient(90% 70% at 12% 88%, rgba(255,138,76,0.30) 0%, rgba(13,27,42,0) 58%)",
        }}
      />

      <div className="absolute inset-y-0 right-0 w-[820px]">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="absolute rounded-[999px] border border-white/10"
            style={{
              width: 300 + i * 96,
              height: 300 + i * 96,
              right: -140,
              top: 540 - (300 + i * 96) / 2,
            }}
          />
        ))}
      </div>

      <div className="relative flex h-full flex-col justify-between px-[140px] py-[120px]">
        <div className="flex items-center gap-[22px]">
          <span className="grid size-[64px] place-items-center rounded-[16px] bg-[#5ea0ff]/15 ring-1 ring-[#5ea0ff]/40">
            <Layers className="size-[32px] text-[#bcd6ff]" strokeWidth={1.75} />
          </span>
          <span className="text-[26px] font-medium tracking-[0.28em] text-[#8fb3d9]">
            DECK LOADER
          </span>
        </div>

        <div className="max-w-[1180px]">
          <h1 className="text-[132px] font-semibold leading-[0.94] tracking-[-0.04em]">
            Presentations
            <br />
            written as
            <span className="text-[#7fb0ff]"> code</span>.
          </h1>
          <p className="mt-56 max-w-[860px] text-[34px] leading-[1.45] text-[#a9c0d6]">
            Every deck is a folder. Every slide is a React component. Nothing is
            registered, uploaded, or edited from here.
          </p>
        </div>

        <div className="flex items-center gap-[20px] text-[24px] text-[#7f97ad]">
          <span className="h-px w-[120px] bg-[#7f97ad]/50" />
          <span>presentations/sample-intro</span>
        </div>
      </div>
    </div>
  );
}
