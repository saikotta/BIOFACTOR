import React from "react";

export default function PoultryMineralBioavailability() {
  return (
    <section className="w-full bg-[#EAF3EA] text-[#0a2d1a] py-20 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="font-display font-bold text-[clamp(2.5rem,4vw,4rem)] text-[#0a2d1a] tracking-tight leading-[0.95] mb-6">
            Unlocking the minerals<br />
            already in the feed.
          </h2>
          <p className="text-[#2d4a3a] text-base leading-relaxed max-w-2xl mb-8">
            Most of the phosphorus in grain and oilseed meal is locked in phytate, a compound birds cannot break down well. Mineral-solubilising bacteria in the gut produce phytase enzymes that break phytate apart.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p className="text-[#2d4a3a] text-base leading-relaxed">
              Phytate also binds calcium, zinc and iron. Farmers pay for minerals twice: once in the grain and again as supplements to make up for what the bird cannot use.
            </p>

            <div className="bg-white border border-[#c4d4c4] p-6 lg:p-8">
              <div className="font-mono text-xs font-semibold tracking-widest text-[#4a7c59] uppercase mb-4">
                Research evidence
              </div>
              <p className="text-[#2d4a3a] text-sm leading-relaxed">
                When broilers on a phosphorus-deficient diet were given Lactobacillus strains engineered to produce phytase, they grew as well as birds on a diet with adequate phosphorus.
              </p>
              <div className="mt-4 pt-4 border-t border-[#c4d4c4]">
                <div className="text-[#4a7c59] text-[10px] font-mono">
                  Applied and Environmental Microbiology, 2014
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mineral Cards */}
          <div className="space-y-4">
            <div className="bg-white border border-[#c4d4c4] p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#D4A574]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#D4A574] font-display font-bold text-2xl">P</span>
              </div>
              <div className="flex-1">
                <div className="text-[#0a2d1a] font-medium mb-1">Phosphorus</div>
                <div className="text-[#2d4a3a] text-sm">Released from phytate</div>
              </div>
            </div>

            <div className="bg-white border border-[#c4d4c4] p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#6B8F7A]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#6B8F7A] font-display font-bold text-2xl">Ca</span>
              </div>
              <div className="flex-1">
                <div className="text-[#0a2d1a] font-medium mb-1">Calcium</div>
                <div className="text-[#2d4a3a] text-sm">Shell and bone</div>
              </div>
            </div>

            <div className="bg-white border border-[#c4d4c4] p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#8B7F6F]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#8B7F6F] font-display font-bold text-xl">Zn · Fe</span>
              </div>
              <div className="flex-1">
                <div className="text-[#0a2d1a] font-medium mb-1">Zinc · Iron</div>
                <div className="text-[#2d4a3a] text-sm">Freed from binding</div>
              </div>
            </div>

            {/* Phytate Distribution */}
            <div className="bg-white border border-[#c4d4c4] p-6">
              <div className="font-mono text-xs font-semibold tracking-widest text-[#4a7c59] uppercase mb-4">
                Where feed phosphorus is locked up
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#0a2d1a] text-sm">Corn</span>
                    <span className="text-[#E8A0AD] font-mono text-sm">72% phytate</span>
                  </div>
                  <div className="w-full h-2 bg-[#e8e8e8] rounded overflow-hidden">
                    <div className="h-full bg-[#E8A0AD] rounded" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#0a2d1a] text-sm">Soybean meal</span>
                    <span className="text-[#E8A0AD] font-mono text-sm">60% phytate</span>
                  </div>
                  <div className="w-full h-2 bg-[#e8e8e8] rounded overflow-hidden">
                    <div className="h-full bg-[#E8A0AD] rounded" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#c4d4c4]">
                <p className="text-[#2d4a3a] text-xs">
                  Only 10–30% of the phosphorus in these ingredients is available to poultry.
                </p>
                <div className="text-[#8B7F6F] text-[10px] font-mono mt-2">
                  Mississippi State University Extension.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Band from Frame 6 to Frame 7 */}
      <div className="w-full h-[8px] sm:h-[10px] lg:h-[12px]" aria-hidden="true" />
    </section>
  );
}