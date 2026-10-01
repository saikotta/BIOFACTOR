import React from "react";

export default function RuminantsDataStrip() {
  return (
    <section className="w-full" data-ruminants-section="stats" data-motion style={{ minHeight: 0 }}>
      {/* 1. Pale Mint Editorial Data Band with Top Border */}
      <div className="w-full bg-[#D8E8D3] text-[#173522] border-t-4 border-[#6DBE45] pt-4 pb-3 md:pt-5 md:pb-4 lg:pt-6 lg:pb-4">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 items-stretch">
            {/* Cell 1: 944 Mt */}
            <div className="flex flex-col justify-between h-full space-y-4" data-stat>
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#173522] tracking-tight leading-none mb-3">
                  <span data-stat-number="944">944</span> Mt
                </div>
                <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-normal max-w-sm">
                  of milk was forecast to be produced worldwide in 2023. The largest producer, India, supplies about a quarter.
                </p>
              </div>
              <div className="pt-3 border-t border-[#173522]/20" data-stat-rule>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#173522]/70 uppercase">
                  FAO / FAOSTAT
                </span>
              </div>
            </div>

            {/* Cell 2: up to 12% */}
            <div className="flex flex-col justify-between h-full space-y-4" data-stat>
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#2D6A4F] tracking-tight leading-none mb-3">
                  up to <span data-stat-number="12">12</span>%
                </div>
                <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-normal max-w-sm">
                  of a ruminant&apos;s energy intake is lost as methane during rumen fermentation.
                </p>
              </div>
              <div className="pt-3 border-t border-[#173522]/20" data-stat-rule>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
                  FAO
                </span>
              </div>
            </div>

            {/* Cell 3: 19–26% */}
            <div className="flex flex-col justify-between h-full space-y-4" data-stat>
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#2D6A4F] tracking-tight leading-none mb-3">
                  <span data-stat-number="19">19</span>–<span data-stat-number="26">26</span>%
                </div>
                <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-normal max-w-sm">
                  of early- and mid-lactation dairy cows show subacute ruminal acidosis in surveys.
                </p>
              </div>
              <div className="pt-3 border-t border-[#173522]/20" data-stat-rule>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
                  PLAIZIER ET AL. 2008
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Compact Editorial Transition Pull-Quote Band */}
      <div className="w-full bg-[#EAF3EA] text-[#173522] pt-3 md:pt-3 lg:pt-4 pb-4 md:pb-5 lg:pb-6" data-ruminants-section="intro" style={{ minHeight: 0 }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <div className="max-w-[1040px]">
            <p className="font-serif text-lg sm:text-xl lg:text-[21px] xl:text-[22px] text-[#173522] leading-[1.48] font-normal" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Every kilogram of milk or meat depends on how well the rumen’s microbes ferment feed.{" "}
              <span className="text-[#2D6A4F] font-medium italic">When that community is balanced</span>, the animal gets more energy and protein from the same ration, stays healthier through stress, and wastes less feed as gas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


