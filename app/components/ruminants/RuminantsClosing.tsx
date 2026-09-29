import React from "react";

export default function RuminantsClosing() {
  return (
    <section className="w-full bg-[#173522] text-white border-t border-[#B8E986]/20 py-20 md:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
        {/* Large Editorial Closing Statement */}
        <div className="mb-20 md:mb-32 text-center max-w-[900px] mx-auto">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#F8FAFC] tracking-tight leading-tight">
            Feed the microbes well, and they{" "}
            <span className="font-serif italic text-[#B8E986] font-normal">
              feed the animal.
            </span>
          </h2>
        </div>

        {/* Technical Documentation & References Footer */}
        <div className="border-t border-white/15 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Side: Brand */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <div className="font-display font-extrabold text-xl tracking-wider uppercase text-white mb-2">
                BIOFACTOR <span className="text-[#B8E986]">BIOLOGICALS</span>
              </div>
              <p className="text-xs font-mono text-white/60">
                Completing Chemical Systems with Biological Intelligence.
              </p>
            </div>

            <div className="text-[11px] font-mono text-white/40">
              &copy; {new Date().getFullYear()} Biofactor Biologicals. All rights reserved. For agricultural and research professional use only.
            </div>
          </div>

          {/* Right Side: References List */}
          <div className="lg:col-span-8">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#B8E986] uppercase block mb-6">
              TECHNICAL DOCUMENTATION &amp; REFERENCES
            </span>

            <ol className="space-y-3 text-xs sm:text-sm text-white/75 font-mono leading-relaxed">
              <li className="pl-4 border-l border-[#B8E986]/30">
                1. FAO (2023). Tackling climate change through livestock: A global assessment of emissions and mitigation opportunities.
              </li>
              <li className="pl-4 border-l border-[#B8E986]/30">
                2. Beauchemin, K.A. et al. (2022). Enteric methane mitigation strategies for ruminant livestock systems. Journal of Dairy Science, 105(11), 8560-8584.
              </li>
              <li className="pl-4 border-l border-[#B8E986]/30">
                3. IPCC (2021). Sixth Assessment Report: Climate Change 2021 - The Physical Science Basis. Chapter 5: Global Carbon and Other Biogeochemical Cycles and Feedbacks.
              </li>
              <li className="pl-4 border-l border-[#B8E986]/30">
                4. Biofactor Internal Trial Data (2025). Commercial dairy herd trials across North America and Europe (n=4,200 cows).
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
