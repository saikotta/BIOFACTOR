import React from "react";

export default function RuminantsDataStrip() {
  return (
    <section className="w-full">
      {/* Small Pale Separator Gap between Frame 1 and Frame 2 (12px mobile / 16px tablet / 24px desktop) */}
      <div className="w-full h-3 md:h-4 lg:h-6" aria-hidden="true" />

      {/* 1. Deep Forest Editorial Data Band — Compact 36px Vertical Padding */}
      <div className="w-full bg-[#1B3B2B] text-[#F1F3EA] py-7 md:py-8 lg:py-9">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 items-stretch">
            {/* Cell 1: 944 Mt */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#E4EFCB] tracking-tight leading-none mb-3">
                  944 Mt
                </div>
                <p className="text-sm sm:text-base text-[#F1F3EA]/90 leading-relaxed font-normal max-w-sm">
                  of milk was forecast to be produced worldwide in 2023. The largest producer, India, supplies about a quarter.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F1F3EA]/15">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#E4EFCB]/80 uppercase">
                  FAO / FAOSTAT
                </span>
              </div>
            </div>

            {/* Cell 2: up to 12% */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#E0B063] tracking-tight leading-none mb-3">
                  up to 12%
                </div>
                <p className="text-sm sm:text-base text-[#F1F3EA]/90 leading-relaxed font-normal max-w-sm">
                  of a ruminant&apos;s energy intake is lost as methane during rumen fermentation.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F1F3EA]/15">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#E0B063]/80 uppercase">
                  FAO
                </span>
              </div>
            </div>

            {/* Cell 3: 19–26% */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#E8A0AD] tracking-tight leading-none mb-3">
                  19–26%
                </div>
                <p className="text-sm sm:text-base text-[#F1F3EA]/90 leading-relaxed font-normal max-w-sm">
                  of early- and mid-lactation dairy cows show subacute ruminal acidosis in surveys.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F1F3EA]/15">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#E8A0AD]/80 uppercase">
                  PLAIZIER ET AL. 2008
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Compact Editorial Transition Pull-Quote Band — 40-56px Top, 28-44px Bottom Padding */}
      <div className="w-full bg-transparent text-[#173522] pt-10 md:pt-12 lg:pt-14 pb-7 md:pb-9 lg:pb-11">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <div className="max-w-[1040px]">
            <p className="font-serif text-lg sm:text-xl lg:text-[21px] xl:text-[22px] text-[#173522] leading-[1.48] font-normal">
              Every kilogram of milk or meat depends on how well the rumen’s microbes ferment feed.{" "}
              <span className="text-[#2D6A4F] font-medium italic">When that community is balanced</span>, the animal gets more energy and protein from the same ration, stays healthier through stress, and wastes less feed as gas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


