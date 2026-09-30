import React from "react";

export default function BioremidationClosing() {
  return (
    <section className="w-full bg-[#173F2B] text-white pt-9 md:pt-10 lg:pt-[42px] pb-9 md:pb-10 lg:pb-[44px] overflow-hidden border-t border-[#167A4A]/25">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* TOP MICRO-LABELS */}
        <div className="flex items-center justify-between mb-7 md:mb-9">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            BIOFACTOR · BIO-REMEDIATION
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            FOCUS · <span className="text-[#B8E986]">WASTEWATER &amp; EFFLUENT</span>
          </span>
        </div>

        {/* PRIMARY CLOSING AREA — ASYMMETRIC EDITORIAL COMPOSITION (RUMINANTS & POULTRY PARITY) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-9 md:mb-11 lg:mb-[44px]">
          {/* LEFT AREA: Statement with vertical biological green accent */}
          <div className="lg:col-span-7 xl:col-span-8 flex max-w-[820px]">
            {/* Vertical Biological Green Accent Bar */}
            <div className="w-[2px] bg-[#B8E986]/60 mr-5 sm:mr-6 lg:mr-8 flex-shrink-0 self-stretch rounded-full" />

            {/* Display Quote Text */}
            <h2 className="font-display font-extrabold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] xl:text-[48px] text-[#F8FAFC] tracking-tight leading-[1.05]">
              Clean water is not the absence <br className="hidden sm:block" />
              of microbes. It is the{" "}
              <span className="font-serif italic text-[#B8E986] font-normal">
                right microbes
              </span>
              , doing the work.
            </h2>
          </div>

          {/* RIGHT AREA: Biofactor Brand Identity Typographic Signature */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center gap-3">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-4 text-xs sm:text-[13px] md:text-[13.5px] lg:text-[14px] text-white/60 font-mono leading-relaxed items-start">
            {/* LEFT COLUMN: 1–5 */}
            <ul className="flex flex-col gap-4 sm:gap-[18px] list-none p-0 m-0">
              <li className="pl-4 border-l border-[#B8E986]/40">
                1. Central Pollution Control Board (2021). National Inventory of Sewage Treatment Plants, as reported by <em>Down To Earth</em>, 22 September 2021. <span className="underline decoration-white/30 font-semibold text-white/80">downtoearth.org.in</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40">
                2. NITI Aayog &amp; NFSSM Alliance (2021). Service and business models: faecal sludge and septage management in urban areas. <span className="underline decoration-white/30 font-semibold text-white/80">niti.gov.in</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40">
                3. UN-Water (2021). Progress on wastewater treatment: 2021 update. <span className="underline decoration-white/30 font-semibold text-white/80">unwater.org</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40">
                4. Pinheiro L.R.S. et al. (2022). Degradation of azo dyes: bacterial potential for bioremediation. <em>Sustainability</em> 14(3):1510. <span className="underline decoration-white/30 font-semibold text-white/80">mdpi.com</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40">
                5. Plestenjak et al. (2022). Reduction of hexavalent chromium using bacterial isolates and a microbial community enriched from tannery effluent. <em>Scientific Reports</em> 12. <span className="underline decoration-white/30 font-semibold text-white/80">doi:10.1038/s41598-022-24797-z</span>
              </li>
            </ul>

            {/* RIGHT COLUMN: 6–9 */}
            <ul className="flex flex-col gap-4 sm:gap-[18px] list-none p-0 m-0">
              <li className="pl-4 border-l border-[#B8E986]/40">
                6. Raper E. et al. (2018). Industrial wastewater treatment through bioaugmentation. <em>Process Safety and Environmental Protection</em> 118:178–187. <span className="font-semibold text-white/80">ScienceDirect</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40">
                7. Bioaugmentation as a tool to protect the structure and function of an activated-sludge microbial community against a 3-chloroaniline shock load (2003). <em>Applied and Environmental Microbiology</em> 69(3):1511–1520. <span className="underline decoration-white/30 font-semibold text-white/80">doi:10.1128/AEM.69.3.1511-1520.2003</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40">
                8. Pradhan S. et al. (2011). Impacts of biological additives, part 1: solids accumulation in septic tanks. <em>Journal of Environmental Health</em> 74(5):16–21. <span className="font-semibold text-white/80">University of Minnesota</span>
              </li>
              <li className="pl-4 border-l border-[#B8E986]/40">
                9. UNICEF DATA. Sanitation: 3.4 billion people lacked safely managed sanitation services in 2024 (WHO/UNICEF Joint Monitoring Programme). <span className="underline decoration-white/30 font-semibold text-white/80">data.unicef.org</span>
              </li>
            </ul>
          </div>

          {/* SCIENTIFIC DISCLAIMER */}
          <div className="border-t border-white/10 mt-6 pt-5 md:mt-7">
            <p className="text-[12px] sm:text-[13px] font-mono text-white/40 leading-relaxed max-w-[920px]">
              Performance of biological treatment varies with effluent composition, temperature, pH, retention time, dose and plant design. Figures above come from published research and illustrate biological potential. They are not product-specific claims or discharge-compliance guarantees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
