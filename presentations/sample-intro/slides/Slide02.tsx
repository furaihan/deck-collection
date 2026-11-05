import { Check } from "lucide-react";

const points = [
  {
    title: "The folder is the registry",
    body: "Drop a directory into presentations/ and Vite resolves it. There is no index file to keep in sync.",
  },
  {
    title: "Order lives in code",
    body: "Presentation.tsx default-exports the slide array. Filenames are labels, not sequence.",
  },
  {
    title: "One canvas, 1920 by 1080",
    body: "Slides are drawn in pixels against a fixed sheet and scaled to whatever screen is watching.",
  },
  {
    title: "Isolated from the shell",
    body: "The canvas pins its own base type and colour, so app theming never bleeds into a deck.",
  },
];

export default function Slide02() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f6f4ef] text-[#16181d]">
      <div className="flex h-full flex-col px-[140px] py-[112px]">
        <div className="flex items-baseline justify-between border-b-[1.5px] border-[#16181d]/15 pb-[36px]">
          <h2 className="text-[76px] font-semibold leading-[1.05] tracking-[-0.03em]">
            Four rules, one contract
          </h2>
          <span className="text-[24px] font-medium tracking-[0.18em] text-[#16181d]/45">
            02
          </span>
        </div>

        <ul className="mt-[56px] grid grid-cols-2 gap-x-[80px] gap-y-[44px]">
          {points.map((point) => (
            <li key={point.title} className="flex gap-[26px]">
              <span className="mt-[6px] grid size-[52px] shrink-0 place-items-center rounded-full bg-[#16181d]">
                <Check className="size-[28px] text-[#f6f4ef]" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-[36px] font-semibold leading-[1.25] tracking-[-0.015em]">
                  {point.title}
                </p>
                <p className="mt-[12px] max-w-[620px] text-[26px] leading-[1.5] text-[#16181d]/65">
                  {point.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
