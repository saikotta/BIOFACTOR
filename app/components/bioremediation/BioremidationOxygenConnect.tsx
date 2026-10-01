import React from "react";

export default function BioremidationOxygenConnect() {
  return (
    <section className="relative w-full text-[#173522] pt-6 md:pt-8 lg:pt-10 pb-16 md:pb-24 overflow-hidden bg-[#EAF3EA]">
      {/* Opaque Base Color Layer */}
      <div className="absolute inset-0 z-0 bg-[#EAF3EA]" aria-hidden="true" />

      {/* Background Microbes Image Overlay (Parity with Ruminants Rumen Factory) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-[position:80%_center] opacity-40 mix-blend-multiply"
        style={{ backgroundImage: "url('/images/ruminants-rumen-microbes-bg.png')" }}
        aria-hidden="true"
      />

      {/* Pale Warm Botanical Overlay (85% Opacity) */}
      <div className="absolute inset-0 z-0 bg-[#EAF3EA]/85" aria-hidden="true" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* Eyebrow Label — Matched to Ruminants SS1 */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#2D6A4F]" aria-hidden="true" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
            HOW BIOLOGICAL TREATMENT WORKS
          </span>
        </div>

        {/* Big Headline & Subtitle — Matched to SS1/SS2 */}
        <div className="max-w-[1100px] mb-10 md:mb-14">
          <h2 className="font-display font-extrabold text-[clamp(2.25rem,4vw,4.25rem)] text-[#173522] tracking-tight leading-[1.04] mb-5 uppercase">
            Three oxygen conditions, three kinds of microbial work.
          </h2>
          <p className="font-serif text-lg sm:text-xl text-[#26382D]/85 leading-relaxed max-w-[920px]">
            Good treatment moves wastewater through zones with no oxygen, low oxygen and plenty of oxygen. Each zone favours different microbes, and each removes a different part of the pollution.
          </p>
        </div>

        {/* Process Flow Card Container — Matched to White/Light Ruminants Container (SS2 Image 2) */}
        <div className="w-full bg-[#FFFFFF]/80 backdrop-blur-sm rounded-2xl p-6 sm:p-10 md:p-12 border border-[#173522]/10 shadow-[0_4px_24px_rgba(23,53,34,0.04)] overflow-x-auto text-[#173522]">
          <div className="min-w-[980px] py-4 px-2">
            {/* Top Row: Flow Diagram */}
            <div className="grid grid-cols-[170px_1fr_170px] gap-4 items-center">
              {/* Left Input: RAW WASTEWATER */}
              <div className="space-y-3">
                <div>
                  <span className="font-mono text-xs font-bold tracking-widest text-[#167A4A] uppercase block">
                    RAW WASTEWATER
                  </span>
                  <span className="font-mono text-sm text-[#26382D] font-medium block mt-1 opacity-85">
                    organics · N · P · dyes · metals
                  </span>
                </div>
                {/* Visual Arrow pointing into Anaerobic */}
                <div className="flex items-center pt-2">
                  <div className="w-full h-[1.5px] bg-[#167A4A]" />
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#167A4A]" />
                </div>
              </div>

              {/* Middle 3 Oxygen Conditions Boxes */}
              <div className="grid grid-cols-3 gap-5 relative">
                {/* Zone 1: ANAEROBIC */}
                <div className="rounded-xl border border-[#D69E2E]/60 bg-[#FFFDF5] p-5 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-md hover:border-[#D69E2E]">
                  <div>
                    <div className="font-mono text-xs font-bold tracking-wider text-[#B7791F] uppercase mb-4 pb-2 border-b border-[#D69E2E]/20">
                      ANAEROBIC · NO O₂
                    </div>
                    <ul className="space-y-2 text-sm text-[#2D3748] font-serif">
                      <li className="font-medium">Solids broken down</li>
                      <li className="font-medium">Azo dyes cleaved</li>
                      <li className="font-medium">Cr(VI) reduced to Cr(III)</li>
                    </ul>
                  </div>
                  <div className="pt-4 font-mono text-xs text-[#718096] italic">
                    Biogas released
                  </div>
                </div>

                {/* Arrow Zone 1 -> Zone 2 */}
                <div className="absolute left-[33%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 hidden md:flex items-center">
                  <div className="w-4 h-[1.5px] bg-[#A0AEC0]" />
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#A0AEC0]" />
                </div>

                {/* Zone 2: ANOXIC */}
                <div className="rounded-xl border border-[#9F7AEA]/60 bg-[#FAF5FF] p-5 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-md hover:border-[#9F7AEA] relative">
                  <div>
                    <div className="font-mono text-xs font-bold tracking-wider text-[#6B46C1] uppercase mb-4 pb-2 border-b border-[#9F7AEA]/20">
                      ANOXIC · LOW O₂
                    </div>
                    <div className="space-y-1 text-sm text-[#2D3748] font-serif">
                      <p className="font-medium">Nitrate → N₂ gas</p>
                      <p className="text-xs text-[#5A67D8] font-mono">(denitrification)</p>
                    </div>
                  </div>
                  <div className="pt-4 font-mono text-xs text-[#718096] leading-tight">
                    Nitrogen leaves as harmless gas
                  </div>
                </div>

                {/* Arrow Zone 2 -> Zone 3 */}
                <div className="absolute left-[66.6%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 hidden md:flex items-center">
                  <div className="w-4 h-[1.5px] bg-[#A0AEC0]" />
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#A0AEC0]" />
                </div>

                {/* Zone 3: AEROBIC */}
                <div className="rounded-xl border border-[#4299E1]/60 bg-[#F0F8FF] p-5 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-md hover:border-[#4299E1] relative">
                  {/* Decorative Microbe Circles */}
                  <div className="absolute top-4 right-4 flex flex-col gap-1.5 opacity-60">
                    <span className="w-2.5 h-2.5 rounded-full border border-[#3182CE]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3182CE] ml-2" />
                    <span className="w-2 h-2 rounded-full border border-[#3182CE]" />
                  </div>

                  <div>
                    <div className="font-mono text-xs font-bold tracking-wider text-[#2B6CB0] uppercase mb-4 pb-2 border-b border-[#4299E1]/20">
                      AEROBIC · HIGH O₂
                    </div>
                    <ul className="space-y-2 text-sm text-[#2D3748] font-serif">
                      <li className="font-medium">Organic load oxidised</li>
                      <li className="font-medium">Ammonia → nitrate</li>
                      <li className="font-medium">Dye by-products broken down</li>
                    </ul>
                  </div>
                  <div className="pt-4 font-mono text-xs text-[#718096] italic">
                    BOD and odour fall
                  </div>
                </div>
              </div>

              {/* Right Output: CLEANER WATER */}
              <div className="pl-4 flex items-center">
                <div className="w-full flex items-center">
                  <div className="w-10 h-[1.5px] bg-[#167A4A]" />
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#167A4A]" />
                  <span className="font-mono text-xs font-bold tracking-widest text-[#167A4A] uppercase ml-3 whitespace-nowrap">
                    CLEANER<br />WATER
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Nitrate Return Loop Arc (Centered directly underneath the Box 3 -> Box 2 arc curve) */}
            <div className="grid grid-cols-[170px_1fr_170px] gap-4 items-start mt-2">
              <div /> {/* Left Spacer */}
              
              <div className="w-full relative h-12">
                {/* SVG Arc originating from Aerobic Box 3 (83.3%) and pointing UP into Anoxic Box 2 (50%) */}
                <div className="w-full h-7 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 28" preserveAspectRatio="none" fill="none">
                    {/* Curved dashed line from 83.3% (Box 3) to 50% (Box 2) */}
                    <path
                      d="M 83.3 2 C 83.3 26, 50 26, 50 10"
                      stroke="#6B46C1"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  {/* Arrowhead pointing UP at 50% (Anoxic Box 2) */}
                  <div className="absolute left-[50%] top-[3px] -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#6B46C1]" />
                </div>
                
                {/* Text centered specifically under the loop curve (between 50% and 83.3% -> centered at 66.6%) */}
                <div className="absolute left-[66.6%] -translate-x-1/2 top-7 whitespace-nowrap">
                  <span className="font-mono text-[10px] text-[#6B46C1] font-bold tracking-wider uppercase">
                    nitrate returned for removal
                  </span>
                </div>
              </div>
              
              <div /> {/* Right Spacer */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
