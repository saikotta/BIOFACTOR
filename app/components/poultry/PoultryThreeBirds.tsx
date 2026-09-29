import React from "react";

export default function PoultryThreeBirds() {
  return (
    <>
      <section className="w-full bg-[#EAF3EA] py-8 lg:py-12 text-[#0a2d1a] relative overflow-hidden">
      {/* Subtle bacterial background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1600 846" fill="none">
          {/* Scattered capsule outlines */}
          <rect x="100" y="150" width="30" height="12" rx="6" stroke="#2d4a3a" strokeWidth="1" transform="rotate(15, 115, 156)" />
          <rect x="200" y="300" width="25" height="10" rx="5" stroke="#4a7c59" strokeWidth="1" transform="rotate(-10, 212, 305)" />
          <rect x="300" y="500" width="28" height="11" rx="5.5" stroke="#3d4a3a" strokeWidth="1" transform="rotate(5, 314, 505)" />
          <rect x="400" y="200" width="32" height="13" rx="6.5" stroke="#2d4a3a" strokeWidth="1" transform="rotate(-20, 416, 206)" />
          <rect x="500" y="400" width="26" height="10" rx="5" stroke="#4a5a3a" strokeWidth="1" transform="rotate(10, 513, 405)" />
          <rect x="600" y="600" width="30" height="12" rx="6" stroke="#3d5a4a" strokeWidth="1" transform="rotate(-5, 615, 606)" />
          <rect x="700" y="100" width="28" height="11" rx="5.5" stroke="#4a4a3a" strokeWidth="1" transform="rotate(20, 714, 105)" />
          <rect x="800" y="350" width="24" height="9" rx="4.5" stroke="#3d5a4a" strokeWidth="1" transform="rotate(-15, 812, 354)" />
          <rect x="900" y="550" width="30" height="12" rx="6" stroke="#4a5a3a" strokeWidth="1" transform="rotate(8, 915, 556)" />
          <rect x="1000" y="250" width="26" height="10" rx="5" stroke="#3d4a3a" strokeWidth="1" transform="rotate(-12, 1013, 255)" />
          <rect x="1100" y="450" width="28" height="11" rx="5.5" stroke="#4a4a3a" strokeWidth="1" transform="rotate(18, 1114, 455)" />
          <rect x="1200" y="650" width="30" height="12" rx="6" stroke="#2d4a3a" strokeWidth="1" transform="rotate(-8, 1215, 656)" />
          <rect x="1300" y="180" width="25" height="10" rx="5" stroke="#3d4a3a" strokeWidth="1" transform="rotate(25, 1312, 185)" />
          <rect x="1400" y="380" width="28" height="11" rx="5.5" stroke="#3d5a4a" strokeWidth="1" transform="rotate(-20, 1414, 385)" />
          <rect x="150" y="700" width="26" height="10" rx="5" stroke="#4a5a3a" strokeWidth="1" transform="rotate(12, 163, 705)" />
          <rect x="350" y="80" width="30" height="12" rx="6" stroke="#4a7c59" strokeWidth="1" transform="rotate(-25, 365, 86)" />
          <rect x="550" y="150" width="24" height="9" rx="4.5" stroke="#3d4a3a" strokeWidth="1" transform="rotate(30, 562, 154)" />
          <rect x="750" y="750" width="28" height="11" rx="5.5" stroke="#2d4a3a" strokeWidth="1" transform="rotate(-15, 764, 755)" />
          <rect x="950" y="50" width="30" height="12" rx="6" stroke="#4a5a3a" strokeWidth="1" transform="rotate(20, 965, 56)" />
          <rect x="1150" y="200" width="26" height="10" rx="5" stroke="#3d4a3a" strokeWidth="1" transform="rotate(-10, 1163, 205)" />
          <rect x="1350" y="550" width="28" height="11" rx="5.5" stroke="#4a4a3a" strokeWidth="1" transform="rotate(15, 1364, 555)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 lg:px-12">
        {/* MAIN HEADLINE */}
        <div className="mb-8 lg:mb-12">
          <h2 className="font-space-grotesk font-bold text-[clamp(2rem,4vw,4rem)] text-[#0a2d1a] tracking-tight leading-[1.05]">
            Breeders, layers and<br />
            broilers need different<br />
            things from the gut.
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT SECTION */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold tracking-[0.2em] text-[#D4A574] uppercase">
              PARENT STOCK
            </div>

            <div className="font-space-grotesk font-extrabold text-[clamp(2.5rem,6vw,6.5rem)] text-[#D4A574] tracking-tight leading-[0.9]">
              BREEDERS
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs font-semibold tracking-widest text-[#2d4a3a] uppercase">
                Priority · egg hygiene, hatchability
              </div>
              <div className="font-mono text-xs font-semibold tracking-widest text-[#2d4a3a] uppercase">
                and a clean start for the chick
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="space-y-4 lg:space-y-6">
            {/* Heading */}
            <h3 className="font-space-grotesk font-semibold text-[clamp(1.5rem,2.5vw,2.5rem)] text-[#0a2d1a] tracking-tight leading-tight">
              A healthy breeder passes on a healthy start.
            </h3>

            {/* Body Paragraph */}
            <p className="text-base lg:text-lg text-[#2d4a3a] leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Breeder hens can pass pathogens such as <span className="italic">Salmonella</span> to the next generation through the egg. Keeping the breeder gut stable reduces what reaches the egg, and applying beneficial bacteria in the hatchery protects the embryo and gives the chick its first beneficial microbes.
            </p>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Card */}
              <div className="bg-white border border-[#c4d4c4] p-5">
                <div className="font-space-grotesk font-bold text-base text-[#0a2d1a] mb-2">
                  Less vertical transmission
                </div>
                <p className="text-sm text-[#2d4a3a] leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                  A stable breeder gut sheds fewer pathogens into the reproductive tract and onto eggs.
                </p>
              </div>

              {/* Right Card */}
              <div className="bg-white border border-[#c4d4c4] p-5">
                <div className="font-space-grotesk font-bold text-base text-[#0a2d1a] mb-2">
                  Hatchery protection
                </div>
                <p className="text-sm text-[#2d4a3a] leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                  Beneficial bacteria sprayed onto hatching eggs compete with pathogens on the shell.
                </p>
              </div>
            </div>

            {/* Chart Panel */}
            <div className="bg-white border border-[#c4d4c4] p-4 lg:p-5">
              <div className="font-space-grotesk font-bold text-sm text-[#0a2d1a] mb-1">
                Hatching eggs sprayed with probiotic bacteria
              </div>
              <p className="text-xs text-[#2d4a3a] mb-3 leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                Share of egg contents and embryos positive for Salmonella Enteritidis by day 18 of incubation
              </p>

              {/* Bar Chart */}
              <div className="space-y-3 mb-3">
                {/* Untreated */}
                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[10px] text-[#2d4a3a] uppercase">Untreated</span>
                    <span className="font-space-grotesk font-bold text-xs text-[#f0799c]">60–70%</span>
                  </div>
                  <div className="w-full h-3 bg-[#e8e8e8] rounded overflow-hidden">
                    <div className="h-full bg-[#f0799c] rounded" style={{ width: '65%' }}></div>
                  </div>
                </div>

                {/* Chemical disinfectant */}
                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[10px] text-[#2d4a3a] uppercase">Chemical disinfectant</span>
                    <span className="font-space-grotesk font-bold text-xs text-[#d47a7a]">60–70%</span>
                  </div>
                  <div className="w-full h-3 bg-[#e8e8e8] rounded overflow-hidden">
                    <div className="h-full bg-[#d47a7a] rounded" style={{ width: '65%' }}></div>
                  </div>
                </div>

                {/* Probiotic spray */}
                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[10px] text-[#2d4a3a] uppercase">Probiotic spray</span>
                    <span className="font-space-grotesk font-bold text-xs text-[#8fdcc0]">&lt;20%</span>
                  </div>
                  <div className="w-full h-3 bg-[#e8e8e8] rounded overflow-hidden">
                    <div className="h-full bg-[#8fdcc0] rounded" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>

              {/* Chart Note */}
              <div className="font-mono text-[10px] text-[#4a7c59] leading-relaxed">
                Scale 0–100%. 560 hatching eggs, two Lactobacillus strains. Kosuri et al. 2025, Poultry Science.[5]
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    {/* Transition Band from Frame 4 to Frame 5 */}
    <div className="w-full h-[8px] sm:h-[10px] lg:h-[12px]" aria-hidden="true" />
    </>
  );
}