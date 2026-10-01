import React from "react";
import MicrobeField from "../MicrobeField";

export default function BioremidationApplications() {
  return (
    <section id="applications" className="relative w-full bg-[#EAF3EA] text-[#173522] pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 lg:pb-14 overflow-hidden">
      {/* Floating Microorganism Canvas Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90 overflow-hidden">
        <MicrobeField
          position="absolute"
          densityMultiplier={2.8}
          motionMultiplier={0.8}
          opacityMultiplier={0.95}
          rotationMultiplier={0.6}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* Section Boundary Divider */}
        <div className="w-full border-t border-[#167A4A]/14 mb-8 md:mb-10 lg:mb-12" aria-hidden="true" />

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
            DIFFERENT WASTES NEED DIFFERENT MICROBES
          </span>
        </div>

        <h2 className="font-display font-extrabold text-[clamp(2.25rem,3.8vw,4rem)] text-[#173522] tracking-tight leading-[1.02] uppercase mb-12 md:mb-20 lg:mb-[80px] max-w-[1000px]">
          DIFFERENT WASTES NEED<br />
          DIFFERENT MICROBES.
        </h2>

        {/* 2 Application Chapters (Industrial & Sewage) */}
        <div className="space-y-28 md:space-y-40 lg:space-y-48">

          {/* CHAPTER 1: INDUSTRIAL (LEFT = Title + Priority + Image, RIGHT = Editorial Content) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Vertically Centered Title + Priority + Image */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <div>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase block mb-2">
                  TEXTILE · TANNERY · PROCESS
                </span>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#173522] tracking-tight uppercase mb-2">
                  INDUSTRIAL
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[#26382D]/70 tracking-wide uppercase">
                  Priority · colour, toxic metals, compounds normal sludge can't handle
                </p>
              </div>

              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#E8EFE6]">
                <img
                  src="/images/bioremidation/industrial.jpg"
                  alt="Industrial Bio-Remediation"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Editorial Content Right */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h5 className="font-serif font-semibold text-2xl sm:text-3xl text-[#173522] leading-snug">
                  Specialist microbes for specialist pollutants.
                </h5>
                <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed max-w-2xl font-sans">
                  Industrial effluents carry compounds that ordinary sewage bacteria rarely meet. Azo dyes make up about two-thirds of synthetic dyes, and an estimated 10–15% of dye produced is discarded into the environment. Tannery effluent can carry hexavalent chromium, which is toxic and carcinogenic.
                </p>
              </div>

              {/* Editorial Evidence Rows */}
              <div className="pt-6 border-t border-[#173522]/12 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    DYE DECOLOURISATION
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    Bacterial azoreductases split the azo bond without oxygen. An aerobic step then breaks down the aromatic amines this produces.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline pt-4 border-t border-[#173522]/08">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    CHROMIUM DETOXIFICATION
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    Chromium-resistant bacteria reduce toxic Cr(VI) to far less mobile and less toxic Cr(III).
                  </p>
                </div>
              </div>

              {/* Key Programming Note - Pull-Quote Style */}
              <div className="pt-6 border-l-2 border-[#2D6A4F] pl-6 my-2">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                  50% OF 100 MG/L Cr(VI) REDUCED IN 24 HOURS
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  Bacteria isolated from tannery effluent achieved this, and an enriched tannery community removed Cr(VI) completely at up to 5 mg/L within 24 hours. Without active microbes, organic matter alone reduced only 13%.
                </p>
              </div>
            </div>
          </div>


          {/* CHAPTER 2: SEWAGE (LEFT = Editorial Content, RIGHT = Vertically Centered Title + Priority + Image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Editorial Content Left */}
            <div className="lg:col-span-7 lg:order-1 order-2 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h5 className="font-serif font-semibold text-2xl sm:text-3xl text-[#173522] leading-snug">
                  Strengthening the biology plants already run on.
                </h5>
                <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed max-w-2xl font-sans">
                  Activated sludge, the most common sewage process, is a managed microbial community. It works well when stable, but it can be slow to start, lose performance after shock loads or toxic inflows, and struggle with nitrogen removal. Adding selected microbes (bioaugmentation) targets these weak points.
                </p>
              </div>

              {/* Editorial Evidence Rows */}
              <div className="pt-6 border-t border-[#173522]/12 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    FASTER START-UP
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    New or restarted plants reach working performance sooner.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline pt-4 border-t border-[#173522]/08">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    SHOCK RESISTANCE
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    Selected strains help the community recover after toxic or heavy loads.
                  </p>
                </div>
              </div>

              {/* Key Programming Note - Pull-Quote Style */}
              <div className="pt-6 border-l-2 border-[#2D6A4F] pl-6 my-2">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                  MORE STABLE, BETTER SETTLING, FASTER RECOVERY
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  A review of industrial bioaugmentation reports more stable operation, better flocculation, shorter start-up, resistance to shock loads and better cold-weather performance. It also notes that added strains must survive and not wash out, which depends on dose and acclimatisation.
                </p>
              </div>
            </div>

            {/* Right Column: Vertically Centered Title + Priority + Image */}
            <div className="lg:col-span-5 lg:order-2 order-1 flex flex-col justify-center space-y-4">
              <div>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase block mb-2">
                  SEWAGE TREATMENT PLANTS
                </span>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#173522] tracking-tight uppercase mb-2">
                  SEWAGE
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[#26382D]/70 tracking-wide uppercase">
                  Priority · BOD, nitrogen, odour, stable operation under changing load
                </p>
              </div>

              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#E8EFE6]">
                <img
                  src="/images/bioremidation/sewage.jpg"
                  alt="Municipal Sewage Bio-Remediation"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
