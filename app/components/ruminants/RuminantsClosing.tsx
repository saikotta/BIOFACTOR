import React from "react";

export default function RuminantsClosing() {
  return (
    <section className="w-full bg-[#173F2B] text-white pt-9 md:pt-10 lg:pt-[42px] pb-9 md:pb-10 lg:pb-[44px] overflow-hidden relative z-20" data-ruminants-section="closing" data-motion>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* TOP MICRO-LABELS */}
        <div className="flex items-center justify-between mb-7 md:mb-9">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            BIOFACTOR · RUMINANTS
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            FOCUS · <span className="text-[#B8E986]">WHOLE ANIMAL</span>
          </span>
        </div>

        {/* PRIMARY CLOSING AREA — ASYMMETRIC EDITORIAL COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-9 md:mb-11 lg:mb-[44px]">
          {/* LEFT / PRIMARY AREA: Quote with thin vertical accent */}
          <div className="lg:col-span-7 xl:col-span-8 flex max-w-[780px]">
            {/* Vertical Biological Green Accent */}
            <div className="w-[2px] bg-[#B8E986]/60 mr-5 sm:mr-6 lg:mr-8 flex-shrink-0 self-stretch rounded-full" data-closing-rule />

            {/* Display Quote — Forced Exact 2 Lines on Desktop */}
            <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] md:text-[44px] lg:text-[48px] xl:text-[50px] text-[#F8FAFC] tracking-tight leading-[1.02]">
              Feed the microbes well, and{" "}
              <br className="hidden sm:block" />
              <span className="font-serif italic text-[#B8E986] font-normal inline">
                they feed the animal.
              </span>
            </h2>
          </div>

          {/* RIGHT AREA: Biofactor Brand Identity Signature */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center gap-3.5">
            <div>
              <div className="font-display font-extrabold text-lg sm:text-[21px] lg:text-[22px] tracking-[0.15em] uppercase text-white mb-1.5">
                BIOFACTOR <span className="text-[#B8E986]">BIOLOGICALS</span>
              </div>
              <p className="font-serif italic text-sm sm:text-[16px] lg:text-[17px] text-white/70 leading-relaxed max-w-sm">
                Turning microbial functions into measurable biological impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DEDICATED TECHNICAL REFERENCES LOWER BAND */}
      <div className="w-full bg-[#0F291C]/80 border-t border-white/12 pt-8 md:pt-9 lg:pt-10 pb-8 md:pb-9 lg:pb-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <span className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase block mb-5">
            REFERENCES
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-4 md:gap-y-0 text-xs sm:text-[13px] md:text-[13.5px] lg:text-[14px] text-white/60 font-mono leading-relaxed items-start">
            {/* LEFT COLUMN: 1–4 */}
            <ul className="flex flex-col gap-4 sm:gap-[18px] list-none p-0 m-0">
              <li className="pl-4 border-l border-[#B8E986]/40" data-reference>
                1. Press Information Bureau, Government of India (2023). India ranks first in milk production in the world contributing 24% of global milk production (FAOSTAT, 2021–22). <span className="underline decoration-white/30">pib.gov.in</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40" data-reference>
                2. FAO. Enteric methane: background. <span className="underline decoration-white/30">fao.org</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40" data-reference>
                3. Plaizier J.C., Krause D.O., Gozho G.N., McBride B.W. (2008). Subacute ruminal acidosis in dairy cows: the physiological causes, incidence and consequences. <em>The Veterinary Journal</em> 176:21–31. <span className="font-semibold text-white/80">ScienceDirect</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40" data-reference>
                4. Signorini M.L. et al. (2012). Impact of probiotic administration on the health and fecal microbiota of young calves: a meta-analysis of randomized controlled trials of lactic acid bacteria. <em>Research in Veterinary Science</em> 93:250–258. <span className="font-semibold text-white/80">ScienceDirect</span>
              </li>
            </ul>

            {/* RIGHT COLUMN: 5–7 */}
            <ul className="flex flex-col gap-4 sm:gap-[18px] list-none p-0 m-0">
              <li className="pl-4 border-l border-[#B8E986]/40" data-reference>
                5. Desnoyers M. et al. (2009). Meta-analysis of the influence of <em>Saccharomyces cerevisiae</em> supplementation on ruminal parameters and milk production of ruminants. <em>Journal of Dairy Science</em> 92:1620–1632. <span className="font-semibold text-white/80">ScienceDirect</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40" data-reference>
                6. Jeyanathan J., Martin C., Morgavi D.P. (2014). The use of direct-fed microbials for mitigation of ruminant methane emissions: a review. <em>Animal</em> 8:250–261. <span className="font-semibold text-white/80">Cambridge Core</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40" data-reference>
                7. FAO forecast: world milk production in 2023 to reach 944 million tonnes, as reported by <em>The Cattle Site</em>. <span className="underline decoration-white/30">thecattlesite.com</span>
              </li>
            </ul>
          </div>

          {/* SCIENTIFIC DISCLAIMER */}
          <div className="border-t border-white/10 mt-6 pt-5 md:mt-7">
            <p className="text-[12px] sm:text-[13px] font-mono text-white/40 leading-relaxed max-w-[880px]">
              Response to biologicals varies with strain, dose, ration, stage of lactation, housing and management. Figures above come from published research and illustrate biological potential. They are not product-specific claims.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}




