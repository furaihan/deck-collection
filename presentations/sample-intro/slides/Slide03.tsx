const specs = [
  { label: "Canvas", value: "1920 x 1080" },
  { label: "Units", value: "px only" },
  { label: "Discovery", value: "import.meta.glob" },
  { label: "Order", value: "array index" },
];

export default function Slide03() {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_560px] overflow-hidden bg-[#16181d] text-[#f6f4ef]">
      <div className="flex flex-col justify-center px-[140px] py-[120px]">
        <p className="text-[30px] font-medium tracking-[0.2em] text-[#7fb0ff]">
          THE SHAPE OF IT
        </p>
        <blockquote className="mt-[44px] max-w-[980px] text-[88px] font-medium leading-[1.1] tracking-[-0.035em]">
          &ldquo;A deck that cannot be found by its folder is a deck that will
          go missing.&rdquo;
        </blockquote>
        <p className="mt-[56px] max-w-[760px] text-[28px] leading-[1.5] text-[#f6f4ef]/55">
          The library is a projection of the filesystem, not a database that has
          to be kept honest by hand.
        </p>
      </div>

      <div className="flex flex-col justify-center border-l border-white/10 bg-[#0f1115] px-[72px]">
        <p className="text-[22px] font-medium tracking-[0.22em] text-[#f6f4ef]/40">
          SPECIFICATION
        </p>
        <dl className="mt-[40px] space-y-[34px]">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-[20px] font-medium tracking-[0.16em] text-[#f6f4ef]/40">
                {spec.label.toUpperCase()}
              </dt>
              <dd className="mt-[6px] text-[34px] font-medium tracking-[-0.01em]">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}