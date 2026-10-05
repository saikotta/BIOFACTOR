import React from "react";

export default function BioremidationDataStrip() {
  return (
    <section className="w-full">
      {/* 1. Deep Forest Editorial Data Band — Directly Attached to Hero Section without Top White Gap */}
      <div className="w-full bg-[#1B3B2B] text-[#F1F3EA] py-8 md:py-10 lg:py-12 border-t border-[#2A523D]">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 items-stretch">
            {/* Cell 1: 3.4 bn */}
            <div className="flex flex-col justify-between h-full space-y-4 br-rv">
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#90CDF4] tracking-tight leading-none mb-3" data-cu>
                  3.4 bn
                </div>
                <p className="text-sm sm:text-base text-[#F1F3EA]/90 leading-relaxed font-normal max-w-sm">
                  people still lacked safely managed sanitation in 2024.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F1F3EA]/15 relative">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#90CDF4] uppercase inline-flex items-baseline">
                  WHO / UNICEF JMP<sup className="text-[10px] font-semibold text-[#90CDF4] relative -top-[5px] ml-[2px]">9</sup>
                </span>
              </div>
            </div>

            {/* Cell 2: 14 */}
            <div className="flex flex-col justify-between h-full space-y-4 br-rv br-d1">
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#E0B063] tracking-tight leading-none mb-3" data-cu>
                  14
                </div>
                <p className="text-sm sm:text-base text-[#F1F3EA]/90 leading-relaxed font-normal max-w-sm">
                  countries could report how much of their industrial wastewater is treated. The rest of the world has no reliable data.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F1F3EA]/15 relative">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#E0B063] uppercase inline-flex items-baseline">
                  UN-WATER, 2021<sup className="text-[10px] font-semibold text-[#E0B063] relative -top-[5px] ml-[2px]">3</sup>
                </span>
              </div>
            </div>

            {/* Cell 3: 56% */}
            <div className="flex flex-col justify-between h-full space-y-4 br-rv br-d2">
              <div>
                <div className="font-display font-extrabold text-[clamp(2.75rem,3.8vw,4.5rem)] text-[#81E6D9] tracking-tight leading-none mb-3" data-cu>
                  56%
                </div>
                <p className="text-sm sm:text-base text-[#F1F3EA]/90 leading-relaxed font-normal max-w-sm">
                  of household wastewater worldwide was safely treated in 2020. Data on industrial wastewater is too thin for a global figure.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F1F3EA]/15 relative">
                <span className="font-mono text-xs font-semibold tracking-widest text-[#81E6D9] uppercase inline-flex items-baseline">
                  UN-WATER, 2021<sup className="text-[10px] font-semibold text-[#81E6D9] relative -top-[5px] ml-[2px]">3</sup>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Editorial Transition Pull-Quote Band — Full Width Spanning to Right Margin */}
      <div className="w-full bg-transparent text-[#173522] pt-10 md:pt-12 lg:pt-14 pb-7 md:pb-9 lg:pb-11 br-rv">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <div className="w-full">
            <p className="font-serif text-lg sm:text-xl lg:text-[21px] xl:text-[22px] text-[#173522] leading-[1.48] font-normal">
              The gap between what we generate and what we treat ends up in rivers, lakes and groundwater.{" "}
              <span className="text-[#2D6A4F] font-medium italic">Microbes are the workforce that closes it:</span>{" "}
              they break down organic load, remove nitrogen, decolourise dyes and turn toxic metals into less harmful forms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
