import React from "react";

export default function RuminantsLifeStages() {
  return (
    <section className="w-full bg-[#F7FAF6] text-[#173522] border-t border-[#167A4A]/15 py-16 md:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-6 h-[1.5px] bg-[#167A4A]" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#167A4A] uppercase">
            02 / TARGETED ANIMAL APPLICATIONS
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#173522] tracking-tight leading-[1.05] uppercase mb-12 md:mb-20 max-w-[900px]">
          From the first week of life to peak lactation.
        </h2>

        {/* 3 Life Stage Editorial Sections (Alternating Left/Right Rhythm) */}
        <div className="flex flex-col gap-16 md:gap-24">
          {/* ROW 1: CALVES (LEFT = Stage + Image, RIGHT = Content) */}
          <div className="border-t-2 border-[#0284c7] pt-8 lg:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (38–40% width): Stage Identity & Image Placeholder */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs font-semibold tracking-wider text-[#0284c7] uppercase">
                  STAGE 01 — REARING
                </span>
                <h3 className="font-display font-black text-5xl sm:text-6xl text-[#0284c7] tracking-tight uppercase mt-2 mb-3">
                  CALVES
                </h3>
                <p className="text-sm font-mono text-[#26382D]/70 leading-relaxed">
                  Early-life gut colonisation &amp; early rumen development.
                </p>
              </div>

              {/* CALVES IMAGE PLACEHOLDER */}
              <div className="w-full aspect-[4/3] bg-[#0284c7]/8 border border-[#0284c7]/25 rounded-lg flex flex-col items-center justify-center p-6 text-center mt-2">
                <span className="font-mono text-xs font-bold tracking-wider text-[#0284c7] uppercase mb-1">
                  CALVES IMAGE PLACEHOLDER
                </span>
                <span className="font-serif italic text-xs text-[#26382D]/60">
                  Young healthy dairy calf / early-life development
                </span>
              </div>
            </div>

            {/* Right Column (60–62% width): Detailed Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h4 className="font-display font-bold text-2xl sm:text-3xl text-[#173522]">
                A calf starts life as a single-stomached animal.
              </h4>
              <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed">
                The first few weeks of life determine how quickly the calf transitions from milk dependence to a fully functioning adult rumen. Early microbial seeding accelerates ruminal papillae development and establishes foundational gut immunity that persists into adulthood.
              </p>

              {/* Evidence Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-[#E0F2FE] border border-[#0284c7]/20 rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#0369a1] block mb-1">EARLY WEANING</span>
                  <p className="text-sm text-[#0c4a6e] leading-snug">
                    Up to 14 days earlier transition to solid feed through accelerated ruminal papillae growth.
                  </p>
                </div>
                <div className="bg-[#E0F2FE] border border-[#0284c7]/20 rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#0369a1] block mb-1">IMMUNE BOOSTER</span>
                  <p className="text-sm text-[#0c4a6e] leading-snug">
                    Lower incidence of calf scours and early respiratory issues through competitive exclusion.
                  </p>
                </div>
              </div>

              {/* Key Programming Note Box */}
              <div className="bg-[#FFFFFF] border-l-4 border-[#0284c7] p-5 rounded-r-xl shadow-xs">
                <span className="font-mono text-xs font-bold text-[#0369a1] block mb-1">EARLY MICROBIOME PROGRAMMING</span>
                <p className="text-sm text-[#26382D]/90 leading-relaxed font-serif italic">
                  Intervention in the first 4 weeks of life creates a permanent shift in ruminal microbial architecture that improves feed conversion efficiency across the animal&apos;s entire productive lifetime.
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2: TRANSITION (REVERSED: LEFT = Content, RIGHT = Stage + Image) */}
          <div className="border-t-2 border-[#d97706] pt-8 lg:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (60–62% width): Detailed Content */}
            <div className="lg:col-span-7 lg:order-1 flex flex-col gap-6">
              <h4 className="font-display font-bold text-2xl sm:text-3xl text-[#173522]">
                The critical weeks around calving.
              </h4>
              <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed">
                The transition period (3 weeks pre-calving to 3 weeks post-calving) is the highest metabolic risk window in a dairy cow&apos;s life. Rapid diet changes, immune suppression, and energy deficits create severe ruminal dysbiosis if not actively managed.
              </p>

              {/* Evidence Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-[#FEF3C7] border border-[#d97706]/20 rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#b45309] block mb-1">METABOLIC STABILITY</span>
                  <p className="text-sm text-[#78350f] leading-snug">
                    Reduced incidence of subclinical ketosis and displaced abomasum by keeping ruminal pH stable.
                  </p>
                </div>
                <div className="bg-[#FEF3C7] border border-[#d97706]/20 rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#b45309] block mb-1">DRY MATTER INTAKE</span>
                  <p className="text-sm text-[#78350f] leading-snug">
                    1.2–1.8 kg higher daily dry matter intake during early lactation post-calving recovery.
                  </p>
                </div>
              </div>

              {/* Key Programming Note Box */}
              <div className="bg-[#FFFFFF] border-l-4 border-[#d97706] p-5 rounded-r-xl shadow-xs">
                <span className="font-mono text-xs font-bold text-[#b45309] block mb-1">INFLAMMATION CONTROL</span>
                <p className="text-sm text-[#26382D]/90 leading-relaxed font-serif italic">
                  Targeted biologicals reduce systemic inflammatory response after calving, redirecting energy from immune activation toward milk synthesis and rapid reproductive recovery.
                </p>
              </div>
            </div>

            {/* Right Column (38–40% width): Stage Identity & Image Placeholder */}
            <div className="lg:col-span-5 lg:order-2 flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs font-semibold tracking-wider text-[#d97706] uppercase">
                  STAGE 02 — PERIPARTURIENT
                </span>
                <h3 className="font-display font-black text-5xl sm:text-6xl text-[#d97706] tracking-tight uppercase mt-2 mb-3">
                  TRANSITION
                </h3>
                <p className="text-sm font-mono text-[#26382D]/70 leading-relaxed">
                  Periparturient metabolic balance &amp; dry matter intake recovery.
                </p>
              </div>

              {/* TRANSITION IMAGE PLACEHOLDER */}
              <div className="w-full aspect-[4/3] bg-[#d97706]/8 border border-[#d97706]/25 rounded-lg flex flex-col items-center justify-center p-6 text-center mt-2">
                <span className="font-mono text-xs font-bold tracking-wider text-[#d97706] uppercase mb-1">
                  TRANSITION IMAGE PLACEHOLDER
                </span>
                <span className="font-serif italic text-xs text-[#26382D]/60">
                  Dairy cow around transition &amp; calving period
                </span>
              </div>
            </div>
          </div>

          {/* ROW 3: LACTATION (LEFT = Stage + Image, RIGHT = Content) */}
          <div className="border-t-2 border-[#167A4A] pt-8 lg:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (38–40% width): Stage Identity & Image Placeholder */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs font-semibold tracking-wider text-[#167A4A] uppercase">
                  STAGE 03 — PRODUCTION
                </span>
                <h3 className="font-display font-black text-5xl sm:text-6xl text-[#167A4A] tracking-tight uppercase mt-2 mb-3">
                  LACTATION
                </h3>
                <p className="text-sm font-mono text-[#26382D]/70 leading-relaxed">
                  Peak milk production &amp; sustained feed efficiency.
                </p>
              </div>

              {/* LACTATION IMAGE PLACEHOLDER */}
              <div className="w-full aspect-[4/3] bg-[#167A4A]/8 border border-[#167A4A]/25 rounded-lg flex flex-col items-center justify-center p-6 text-center mt-2">
                <span className="font-mono text-xs font-bold tracking-wider text-[#167A4A] uppercase mb-1">
                  LACTATION IMAGE PLACEHOLDER
                </span>
                <span className="font-serif italic text-xs text-[#26382D]/60">
                  Healthy lactating dairy cow / peak milk production
                </span>
              </div>
            </div>

            {/* Right Column (60–62% width): Detailed Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h4 className="font-display font-bold text-2xl sm:text-3xl text-[#173522]">
                A more efficient rumen turns more food into milk.
              </h4>
              <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed">
                During peak lactation, the cow&apos;s metabolic demand is extreme. Optimising the ratio of propionate to acetate in the rumen unlocks additional energy for milk fat and protein synthesis without increasing feed intake.
              </p>

              {/* Evidence Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-[#D1FAE5] border border-[#167A4A]/20 rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#047857] block mb-1">MILK YIELD &amp; QUALITY</span>
                  <p className="text-sm text-[#065f46] leading-snug">
                    +1.4–2.2 L/hd/day increase in energy-corrected milk yield with improved fat and protein ratio.
                  </p>
                </div>
                <div className="bg-[#D1FAE5] border border-[#167A4A]/20 rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#047857] block mb-1">FEED CONVERSION RATIO</span>
                  <p className="text-sm text-[#065f46] leading-snug">
                    4.8–6.5% improvement in overall herd feed efficiency across total lactation length.
                  </p>
                </div>
              </div>

              {/* Key Programming Note Box */}
              <div className="bg-[#FFFFFF] border-l-4 border-[#167A4A] p-5 rounded-r-xl shadow-xs">
                <span className="font-mono text-xs font-bold text-[#047857] block mb-1">SUSTAINED PRODUCTION</span>
                <p className="text-sm text-[#26382D]/90 leading-relaxed font-serif italic">
                  Maintains peak milk yield for 3–5 weeks longer while reducing body condition loss during negative energy balance in early lactation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

