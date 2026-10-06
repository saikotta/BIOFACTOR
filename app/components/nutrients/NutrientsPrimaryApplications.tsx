import React from "react";

export default function NutrientsPrimaryApplications() {
  return (
    <section id="primary-nutrients" className="relative w-full bg-[#EAF3EA] text-[#173522] pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16 overflow-hidden">

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] space-y-20 md:space-y-28">

        {/* ==========================================
            CHAPTER 1: NITROGEN (N)
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start border-b border-[#173522]/15 pb-16 br-rv">
          {/* LEFT: Heading + Giant Element Symbol & Sleek Compact Card */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-2">
            {/* Section Heading shifted rightwards */}
            <div className="w-full text-left space-y-1 pb-1 pl-12 sm:pl-20 lg:pl-24">
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#173522] uppercase tracking-tight">
                NITROGEN
              </h2>
              <p className="font-serif italic text-xl sm:text-2xl text-[#2D6A4F] font-normal">
                From the atmosphere to biology.
              </p>
            </div>

            {/* Giant Letter N (Atomic text pulled right under letter with negative margin) */}
            <div className="group flex flex-col items-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(22,122,74,0.25)] cursor-pointer active:scale-[0.98] rounded-xl p-4">
              <span className="font-display font-extrabold text-[12rem] sm:text-[14rem] lg:text-[15rem] text-[#1E40AF] leading-none block select-none tracking-tighter transition-transform duration-700 group-hover:scale-105">
                N
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#173522]/70 uppercase block -mt-6 sm:-mt-8 mb-2 transition-transform duration-700 group-hover:scale-105">
                NITROGEN · ATOMIC NO. 7
              </span>
            </div>

            {/* Compact Percentage Bar Card */}
            <div className="w-full max-w-[340px] p-3.5 sm:p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-[#1E40AF]/25 shadow-sm space-y-2.5 text-left br-rv br-d1">
              <div className="flex justify-between items-center font-mono text-[10px] font-bold text-[#173522] uppercase tracking-wider">
                <span>EARTH'S ATMOSPHERE BY VOLUME</span>
                <span className="text-[#1E40AF]">N₂</span>
              </div>
              <div className="w-full h-2 bg-[#EAF3EA] rounded-full overflow-hidden">
                <div className="h-full bg-[#1E40AF] rounded-full w-[78%]" />
              </div>
              <div className="space-y-0.5">
                <div className="font-display font-extrabold text-2xl text-[#173522]">
                  ~<span data-cu>78</span>%
                </div>
                <div className="text-xs text-[#173522]/80 font-sans leading-snug">
                  is nitrogen. Plants cannot use atmospheric N₂ directly.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Side starting at top alignment */}
          <div className="lg:col-span-7 flex flex-col space-y-6 pt-1">
            <div className="space-y-4 text-base sm:text-lg text-[#173522]/90 leading-relaxed font-sans br-rv br-d1">
              <p>
                The atmosphere contains approximately 78% nitrogen. Yet plants cannot use atmospheric N₂ directly. Nitrogen-fixing microorganisms convert that inert atmospheric nitrogen into biologically useful forms.
              </p>
              <p>
                Under suitable symbiotic conditions, legumes can fix more than 250 kg N per hectare in a growing season. In other systems, biological nitrogen fixation is lower and depends on the microorganism, crop, soil and environment.
              </p>
            </div>

            {/* Clean Evidence Rows */}
            <div className="border-t border-[#173522]/15 pt-4 space-y-4 br-rv br-d2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-baseline">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase">
                  GLOBAL FIXATION
                </span>
                <span className="sm:col-span-2 text-sm sm:text-base text-[#173522]/90 font-sans">
                  <strong>50–70 Tg N</strong> fixed biologically in agricultural systems every year, worldwide.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-baseline border-t border-[#173522]/10 pt-3">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase">
                  FIXATION CAPACITY
                </span>
                <span className="sm:col-span-2 text-sm sm:text-base text-[#173522]/90 font-sans">
                  <strong>Up to 311 kg N/ha</strong> reported for faba bean; up to 389 kg N/ha for red clover.
                </span>
              </div>
            </div>

            {/* Editorial Pull Quote */}
            <div className="border-l-2 border-transparent pl-4 py-1 br-callout br-rv br-d2">
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                BIOLOGICAL PRINCIPLE
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#173522] leading-relaxed">
                "Biology does not invent nitrogen. It opens a pathway to the largest nitrogen reservoir on Earth."
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================
            CHAPTER 2: PHOSPHORUS (P) — ALTERNATED
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start border-b border-[#173522]/15 pb-16 br-rv">
          {/* LEFT: Text Side (Order 2 on mobile, Order 1 on Desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 pt-1 order-2 lg:order-1">
            <div className="space-y-4 text-base sm:text-lg text-[#173522]/90 leading-relaxed font-sans br-rv br-d1">
              <p>
                Phosphorus is abundant in many soils. Most of it, however, remains locked in insoluble mineral or chemically bound forms that plants cannot readily access.
              </p>
              <p>
                Phosphate-solubilising microorganisms release organic acids, chelating compounds and other metabolites that help convert these forms into more plant-available phosphorus.
              </p>
            </div>

            {/* Clean Evidence Rows */}
            <div className="border-t border-[#173522]/15 pt-4 space-y-4 br-rv br-d2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-baseline">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase">
                  ORGANIC ACIDS
                </span>
                <span className="sm:col-span-2 text-sm sm:text-base text-[#173522]/90 font-sans">
                  <strong>Gluconic, citric &amp; oxalic acids</strong> release bound phosphate from calcium and iron complexes.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-baseline border-t border-[#173522]/10 pt-3">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase">
                  P-USE EFFICIENCY
                </span>
                <span className="sm:col-span-2 text-sm sm:text-base text-[#173522]/90 font-sans">
                  <strong>+7.5 kg yield / kg P</strong> average gain with biofertilisers across field trials worldwide.
                </span>
              </div>
            </div>

            {/* Editorial Pull Quote */}
            <div className="border-l-2 border-transparent pl-4 py-1 br-callout br-rv br-d2">
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                BIOLOGICAL PRINCIPLE
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#173522] leading-relaxed">
                "The real question is not simply 'how much phosphorus is added.' It is: how much of the phosphorus already present can biology make accessible?"
              </p>
            </div>
          </div>

          {/* RIGHT: Heading + Giant Element Symbol & Sleek Compact Card (Order 1 on mobile, Order 2 on Desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-2 order-1 lg:order-2">
            {/* Section Heading shifted rightwards */}
            <div className="w-full text-left space-y-1 pb-1 pl-12 sm:pl-20 lg:pl-24">
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#173522] uppercase tracking-tight">
                PHOSPHORUS
              </h2>
              <p className="font-serif italic text-xl sm:text-2xl text-[#2D6A4F] font-normal">
                From locked-up to available.
              </p>
            </div>

            {/* Giant Letter P (Atomic text pulled right under letter with negative margin) */}
            <div className="group flex flex-col items-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(146,64,14,0.25)] cursor-pointer active:scale-[0.98] rounded-xl p-4">
              <span className="font-display font-extrabold text-[12rem] sm:text-[14rem] lg:text-[15rem] text-[#92400E] leading-none block select-none tracking-tighter transition-transform duration-700 group-hover:scale-105">
                P
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#173522]/70 uppercase block -mt-6 sm:-mt-8 mb-2 transition-transform duration-700 group-hover:scale-105">
                PHOSPHORUS · ATOMIC NO. 15
              </span>
            </div>

            {/* Compact Percentage Bar Card */}
            <div className="w-full max-w-[340px] p-3.5 sm:p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-[#92400E]/25 shadow-sm space-y-2.5 text-left br-rv br-d1">
              <div className="flex justify-between items-center font-mono text-[10px] font-bold text-[#173522] uppercase tracking-wider">
                <span>APPLIED FERTILISER P USED BY THE CROP</span>
                <span className="text-[#92400E]">SEASON 1</span>
              </div>
              <div className="w-full h-2 bg-[#EAF3EA] rounded-full overflow-hidden">
                <div className="h-full bg-[#92400E] rounded-full w-[25%]" />
              </div>
              <div className="space-y-0.5">
                <div className="font-display font-extrabold text-2xl text-[#173522]">
                  10–25%
                </div>
                <div className="text-xs text-[#173522]/80 font-sans leading-snug">
                  The rest is rapidly fixed in the soil.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            CHAPTER 3: POTASSIUM (K)
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start br-rv">
          {/* LEFT: Heading + Giant Element Symbol & Sleek Compact Card */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-2">
            {/* Section Heading shifted rightwards */}
            <div className="w-full text-left space-y-1 pb-1 pl-12 sm:pl-20 lg:pl-24">
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#173522] uppercase tracking-tight">
                POTASSIUM
              </h2>
              <p className="font-serif italic text-xl sm:text-2xl text-[#2D6A4F] font-normal">
                From mineral reserves to plant availability.
              </p>
            </div>

            {/* Giant Letter K (Atomic text pulled right under letter with negative margin) */}
            <div className="group flex flex-col items-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(107,33,168,0.25)] cursor-pointer active:scale-[0.98] rounded-xl p-4">
              <span className="font-display font-extrabold text-[12rem] sm:text-[14rem] lg:text-[15rem] text-[#6B21A8] leading-none block select-none tracking-tighter transition-transform duration-700 group-hover:scale-105">
                K
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#173522]/70 uppercase block -mt-6 sm:-mt-8 mb-2 transition-transform duration-700 group-hover:scale-105">
                POTASSIUM · ATOMIC NO. 19
              </span>
            </div>

            {/* Compact Percentage Bar Card */}
            <div className="w-full max-w-[340px] p-3.5 sm:p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-[#6B21A8]/25 shadow-sm space-y-2.5 text-left br-rv br-d1">
              <div className="flex justify-between items-center font-mono text-[10px] font-bold text-[#173522] uppercase tracking-wider">
                <span>TOTAL SOIL K HELD IN MINERAL FORMS</span>
                <span className="text-[#6B21A8]">FELDSPAR · MICA</span>
              </div>
              <div className="w-full h-2 bg-[#EAF3EA] rounded-full overflow-hidden">
                <div className="h-full bg-[#6B21A8] rounded-full w-[95%]" />
              </div>
              <div className="space-y-0.5">
                <div className="font-display font-extrabold text-2xl text-[#173522]">
                  <span data-cu>90</span>–98%
                </div>
                <div className="text-xs text-[#173522]/80 font-sans leading-snug">
                  of the total K in most soils is not readily available to plants.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Side */}
          <div className="lg:col-span-7 flex flex-col space-y-6 pt-1">
            <div className="space-y-4 text-base sm:text-lg text-[#173522]/90 leading-relaxed font-sans br-rv br-d1">
              <p>
                Soils can contain enormous quantities of potassium. Only a small fraction is immediately available to plants.
              </p>
              <p>
                Potassium-solubilising microorganisms release potassium from mineral sources through organic-acid production and biological weathering.
              </p>
            </div>

            {/* Clean Evidence Rows */}
            <div className="border-t border-[#173522]/15 pt-4 space-y-4 br-rv br-d2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-baseline">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase">
                  DIRECT RECOVERY
                </span>
                <span className="sm:col-span-2 text-sm sm:text-base text-[#173522]/90 font-sans">
                  <strong>Only 2–10%</strong> of soil K is in water-soluble &amp; exchangeable forms roots can take up directly.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-baseline border-t border-[#173522]/10 pt-3">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase">
                  WEATHERING MECHANISM
                </span>
                <span className="sm:col-span-2 text-sm sm:text-base text-[#173522]/90 font-sans">
                  <strong>Acidolysis &amp; chelation</strong> break silicate lattices to release soluble potassium ions.
                </span>
              </div>
            </div>

            {/* Editorial Pull Quote */}
            <div className="border-l-2 border-transparent pl-4 py-1 br-callout br-rv br-d2">
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                BIOLOGICAL PRINCIPLE
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#173522] leading-relaxed">
                "Again, the opportunity is not simply to add more potassium. It is to unlock more of what already exists."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
