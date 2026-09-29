import React from "react";

export default function RuminantsDataStrip() {
  return (
    <section className="w-full">
      {/* 1. Very Thin Botanical Transition Band Above Dark Strip (#DCE7D6) */}
      <div className="w-full bg-[#DCE7D6] h-[8px] sm:h-[10px] lg:h-[12px]" aria-hidden="true" />

      {/* 2. Full-Bleed Muted Forest Green Data Strip (#294B38) */}
      <div className="w-full bg-[#294B38] text-[#F1F3EA] py-9 lg:py-[44px]">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-stretch">
            {/* Cell 1: 944 Mt */}
            <div className="md:pr-8 lg:pr-10 md:border-r border-[#F1F3EA]/18 pb-6 md:pb-0 border-b md:border-b-0 flex flex-col justify-between h-full">
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] text-[#E4EFCB] tracking-tight leading-none mb-5">
                  944 Mt
                </div>
                <p className="text-[15px] sm:text-[16px] text-[#F1F3EA] leading-[1.55] font-normal">
                  of milk was forecast to be produced worldwide in 2023. The largest producer, India, supplies about a quarter.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t border-[#F1F3EA]/16">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] text-[#F1F3EA]/62 uppercase">
                  FAO / FAOSTAT
                </span>
              </div>
            </div>

            {/* Cell 2: up to 12% */}
            <div className="md:px-8 lg:px-10 md:border-r border-[#F1F3EA]/18 pb-6 md:pb-0 border-b md:border-b-0 flex flex-col justify-between h-full">
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] text-[#E0B063] tracking-tight leading-none mb-5">
                  up to 12%
                </div>
                <p className="text-[15px] sm:text-[16px] text-[#F1F3EA] leading-[1.55] font-normal">
                  of a ruminant&apos;s energy intake is lost as methane during rumen fermentation.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t border-[#F1F3EA]/16">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] text-[#F1F3EA]/62 uppercase">
                  FAO
                </span>
              </div>
            </div>

            {/* Cell 3: 19–26% */}
            <div className="md:pl-8 lg:pl-10 flex flex-col justify-between h-full">
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] text-[#E8A0AD] tracking-tight leading-none mb-5">
                  19–26%
                </div>
                <p className="text-[15px] sm:text-[16px] text-[#F1F3EA] leading-[1.55] font-normal">
                  of early- and mid-lactation dairy cows show subacute ruminal acidosis in surveys.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t border-[#F1F3EA]/16">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] text-[#F1F3EA]/62 uppercase">
                  PLAIZIER ET AL. 2008
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pale Editorial Transition Pull-Quote Band (#EFF4EA) */}
      <div className="w-full bg-[#EFF4EA] text-[#173522] py-8 lg:py-11">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)] border-b border-[#173522]/10 pb-8 lg:pb-11">
          <div className="max-w-[850px] border-l-2 border-[#167A4A] pl-6 sm:pl-8">
            <p className="font-serif text-[clamp(1.25rem,1.55vw,1.5rem)] text-[#173522] leading-[1.52]">
              Every kilogram of milk or meat depends on how well the rumen’s microbes ferment feed.{" "}
              <span className="text-[#4F7F3D] font-medium">When that community is balanced</span>, the animal gets more energy and protein from the same ration, stays healthier through stress, and wastes less feed as gas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
