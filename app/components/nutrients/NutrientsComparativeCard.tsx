import React from "react";

export default function NutrientsComparativeCard() {
  return (
    <section className="relative w-full bg-[#EAF3EA] text-[#173522] pt-8 pb-12 md:pb-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 md:px-8 lg:px-10">
        {/* Full-width Comparative Card on Light Aesthetic separated with vertical divider | */}
        <div className="w-full bg-[#F4FAF4] text-[#173522] rounded-2xl p-6 sm:p-10 lg:p-12 lg:px-16 shadow-lg border border-[#2D6A4F]/25 relative overflow-hidden">
          {/* Subtle green glow accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D6A4F]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start relative z-10">
            {/* Left Block (50% Equal Width) */}
            <div className="space-y-3 lg:pr-4">
              <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase block">
                01 / THE CONUNDRUM
              </span>
              <p className="font-sans text-base sm:text-lg text-[#173522]/90 leading-relaxed">
                "A large proportion of the nutrients required for plant growth exists in nature in forms that are unavailable, inaccessible or difficult for plants to absorb."
              </p>
            </div>

            {/* Vertical Divider | (Centered at 50%) */}
            <div className="hidden lg:block absolute left-1/2 top-2 bottom-2 w-[1px] bg-[#2D6A4F]/20 -translate-x-1/2" />

            {/* Right Block (50% Equal Width) */}
            <div className="space-y-3 lg:pl-8 border-t border-[#2D6A4F]/20 pt-6 lg:border-t-0 lg:pt-0">
              <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase block">
                02 / THE BIOLOGICAL EQUATION
              </span>
              <p className="font-sans text-base sm:text-lg text-[#173522]/90 leading-relaxed">
                "This is where biology changes the equation. Microorganisms can fix atmospheric nitrogen, solubilise phosphorus and mobilise potassium, converting inaccessible nutrient pools into forms that can enter the plant–soil nutrient cycle."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
