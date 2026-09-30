import React from "react";

export default function AquacultureClosing() {
  return (
    <div className="w-full">
      {/* Closing Quote Band */}
      <section className="relative w-full bg-[#111111] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <blockquote className="font-newsreader italic text-[clamp(28px,4vw,44px)] leading-[1.2] text-white mb-6">
            Manage the bottom, and the <span className="text-[#6BBF3A]">water follows</span>.
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full bg-[#111111] px-6 py-16 md:px-12 lg:px-20 xl:px-32">
        <div className="max-w-7xl mx-auto">
          {/* Wordmark */}
          <div className="mb-8">
            <h2 className="font-inter-tight font-extrabold text-[32px] md:text-[40px] text-white mb-4">
              BIOFACTOR BIOLOGICALS
            </h2>
            <p className="font-newsreader text-[16px] text-[#5C6B5E] max-w-xl">
              Turning microbial functions into measurable biological impact.
            </p>
          </div>

          {/* Logo placeholder */}
          <div className="border-2 border-dashed border-[#B8893A] p-8 rounded-sm mb-12 max-w-md">
            <p className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#B8893A] text-center">
              OFFICIAL LOGO PLACEMENT
            </p>
          </div>

          {/* References */}
          <div className="mb-12">
            <h3 className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E] mb-6">
              REFERENCES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ol className="space-y-4">
                <li className="font-newsreader text-[12px] text-[#5C6B5E]">
                  1. Boyd C.E. (2018). Pond bottom management in shrimp farming. Global Aquaculture Advocate.
                </li>
                <li className="font-newsreader text-[12px] text-[#5C6B5E]">
                  2. De Schryver P. et al. (2008). Probiotics in aquaculture. Water Research 42:1155-1164.
                </li>
                <li className="font-newsreader text-[12px] text-[#5C6B5E]">
                  3. Hargreaves J.A. (2013). Biofloc production systems for aquaculture. SRAC Publication.
                </li>
                <li className="font-newsreader text-[12px] text-[#5C6B5E]">
                  4. Liu H. et al. (2019). Effects of probiotics on shrimp gut microbiota. Aquaculture 502:33-40.
                </li>
                <li className="font-newsreader text-[12px] text-[#5C6B5E]">
                  5. Roy R. et al. (2010). Chelated minerals in shrimp nutrition. Journal of Applied Aquaculture 22:1-12.
                </li>
              </ol>
              <ol className="space-y-4" start={6}>
                <li className="font-newsreader text-[12px] text-[#5C6B5E]">
                  6. Tzchatzis N. et al. (2011). Anaerobic bacteria in pond sediment. Aquaculture Research 42:891-899.
                </li>
                <li className="font-newsreader text-[12px] text-[#5C6B5E]">
                  7. Wu Y. et al. (2020). Hydrogen sulphide toxicity in shrimp. Environmental Pollution 263:114425.
                </li>
                <li className="font-newsreader text-[12px] text-[#5C6B5E]">
                  8. Zhou J. et al. (2009). Probiotics in low-salinity shrimp farming. Aquaculture 290:1-9.
                </li>
              </ol>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-[#333333] pt-8">
            <p className="font-newsreader italic text-[12px] text-[#5C6B5E] max-w-3xl">
              Response to biologicals varies with strain, dose, pond conditions, species and management. Figures above come from published research and illustrate biological potential. They are not product-specific claims.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
