import React from "react";

export default function RuminantsMethane() {
  return (
    <section className="w-full bg-[#F3F7F2] text-[#173522] border-t border-[#167A4A]/15 py-16 md:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-6 h-[1.5px] bg-[#D97706]" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#D97706] uppercase">
            03 / ENTERIC EMISSIONS REDUCTION
          </span>
        </div>

        {/* Heading & Intro */}
        <div className="max-w-[920px] mb-12 md:mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#173522] tracking-tight leading-[1.05] uppercase mb-4">
            Methane is feed energy the animal never uses.
          </h2>
          <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed">
            Enteric methane from ruminants represents not only 14.5% of global human-induced greenhouse gas emissions, but also 2–12% of the gross feed energy the animal consumes without gaining any benefit.
          </p>
        </div>

        {/* 2-Column Data & Information Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Data Display */}
          <div className="lg:col-span-4 bg-[#FEF3C7] border border-[#D97706]/20 rounded-2xl p-8 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#B45309] uppercase tracking-wider block mb-2">
                MAX COMMERCIAL REDUCTION
              </span>
              <div className="font-display font-black text-6xl sm:text-7xl text-[#D97706] tracking-tight leading-none mb-4">
                32%
              </div>
            </div>
            <p className="text-sm text-[#78350F] leading-relaxed">
              Maximum enteric methane reduction achieved in commercial dairy trial without impacting dry matter intake or milk yield.
            </p>
          </div>

          {/* Right Panel: Where biologicals stand today */}
          <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#167A4A]/20 rounded-2xl p-8 sm:p-10 flex flex-col justify-between gap-6 shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#167A4A]" />
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#173522] uppercase tracking-tight">
                  Where biologicals stand today
                </h3>
              </div>
              <p className="text-base text-[#26382D]/85 leading-relaxed mb-6">
                Chemical inhibitors can reduce methane drastically, but often suffer from consumer rejection, regulatory hurdles, or rapid microbial adaptation. Synthetic additives can also disrupt beneficial ruminal fermentation if overdosed.
              </p>
            </div>

            <div className="bg-[#EEF4EC] border-l-4 border-[#167A4A] p-5 rounded-r-xl">
              <p className="text-sm text-[#173522] leading-relaxed font-semibold">
                Biological solutions (direct-fed microbials, targeted enzyme blends, and precision bio-actives) work WITH the animal&apos;s natural rumen ecology, providing consistent emission reduction while simultaneously improving digestible energy yield.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
