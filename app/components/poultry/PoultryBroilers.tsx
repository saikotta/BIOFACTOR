import React from "react";

export default function PoultryBroilers() {
  return (
    <section className="w-full relative overflow-hidden py-8 lg:py-12 min-h-[85vh] bg-[#DDE9D5]">
      {/* Subtle capsule decorations */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1600 846" fill="none">
          <rect x="100" y="150" width="30" height="12" rx="6" stroke="#C4D4C4" strokeWidth="1" transform="rotate(15, 115, 156)" />
          <rect x="200" y="300" width="25" height="10" rx="5" stroke="#D4DCC4" strokeWidth="1" transform="rotate(-10, 212, 305)" />
          <rect x="300" y="500" width="28" height="11" rx="5.5" stroke="#C4CCC4" strokeWidth="1" transform="rotate(5, 314, 505)" />
          <rect x="400" y="200" width="32" height="13" rx="6.5" stroke="#D4D4C4" strokeWidth="1" transform="rotate(-20, 416, 206)" />
          <rect x="500" y="400" width="26" height="10" rx="5" stroke="#C4D4C4" strokeWidth="1" transform="rotate(10, 513, 405)" />
          <rect x="600" y="600" width="30" height="12" rx="6" stroke="#C4DCC4" strokeWidth="1" transform="rotate(-5, 615, 606)" />
          <rect x="700" y="100" width="28" height="11" rx="5.5" stroke="#D4C4C4" strokeWidth="1" transform="rotate(20, 714, 105)" />
          <rect x="800" y="350" width="24" height="9" rx="4.5" stroke="#C4DCC4" strokeWidth="1" transform="rotate(-15, 812, 354)" />
          <rect x="900" y="550" width="30" height="12" rx="6" stroke="#D4D4C4" strokeWidth="1" transform="rotate(8, 915, 556)" />
          <rect x="1000" y="250" width="26" height="10" rx="5" stroke="#C4D4C4" strokeWidth="1" transform="rotate(-12, 1013, 255)" />
          <rect x="1100" y="450" width="28" height="11" rx="5.5" stroke="#D4C4C4" strokeWidth="1" transform="rotate(18, 1114, 455)" />
          <rect x="1200" y="650" width="30" height="12" rx="6" stroke="#D4D4C4" strokeWidth="1" transform="rotate(-8, 1215, 656)" />
          <rect x="1300" y="180" width="25" height="10" rx="5" stroke="#C4D4C4" strokeWidth="1" transform="rotate(25, 1312, 185)" />
          <rect x="1400" y="380" width="28" height="11" rx="5.5" stroke="#C4DCC4" strokeWidth="1" transform="rotate(-20, 1414, 385)" />
          <rect x="150" y="700" width="26" height="10" rx="5" stroke="#D4D4C4" strokeWidth="1" transform="rotate(12, 163, 705)" />
          <rect x="350" y="80" width="30" height="12" rx="6" stroke="#D4DCC4" strokeWidth="1" transform="rotate(-25, 365, 86)" />
          <rect x="550" y="150" width="24" height="9" rx="4.5" stroke="#C4D4C4" strokeWidth="1" transform="rotate(30, 562, 154)" />
          <rect x="750" y="750" width="28" height="11" rx="5.5" stroke="#D4D4C4" strokeWidth="1" transform="rotate(-15, 764, 755)" />
          <rect x="950" y="50" width="30" height="12" rx="6" stroke="#D4D4C4" strokeWidth="1" transform="rotate(20, 965, 56)" />
          <rect x="1150" y="200" width="26" height="10" rx="5" stroke="#C4D4C4" strokeWidth="1" transform="rotate(-10, 1163, 205)" />
          <rect x="1350" y="550" width="28" height="11" rx="5.5" stroke="#D4C4C4" strokeWidth="1" transform="rotate(15, 1364, 555)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Side - Broiler image */}
          <div className="flex items-center justify-center">
            <div className="w-[75%] aspect-[3/4] max-h-[600px] overflow-hidden rounded-sm" data-broiler-image>
              <img
                src="/images/poultry-broilers.png"
                alt="Broilers in a commercial poultry production setting"
                loading="eager"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

          {/* Right Side - Explanatory Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Broilers heading and priority above the explanatory matter */}
            <div className="flex flex-col justify-start items-start space-y-4">
              <div className="font-mono text-xs font-semibold tracking-[0.25em] text-[#6BBF3A] uppercase">
                MEAT PRODUCTION
              </div>

              <h2 className="font-space-grotesk font-extrabold text-[clamp(4rem,8vw,8rem)] text-[#6BBF3A] tracking-tight leading-[0.85] uppercase">
                BROILERS
              </h2>

              <div className="font-mono text-xs font-semibold tracking-[0.2em] text-[#2d2d2d] uppercase max-w-md">
                Priority · precisely fast, even growth, low FCR and control of genetic materials
              </div>
            </div>

            {/* Body Heading */}
            <h3 className="font-space-grotesk font-semibold text-xl lg:text-2xl text-[#1a1a1a] tracking-tight leading-tight mb-4">
              Fast growth depends on a gut that stays intact.
            </h3>

            {/* Body Paragraph */}
            <p className="text-base lg:text-lg text-[#2d2d2d] leading-relaxed mb-6" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
              Gut damage in broilers, caused by <span className="italic">Clostridium perfringens</span>, can hinder growth. <span className="italic">Bacillus</span> probiotics offer a biological solution.
            </p>

            {/* Two-column Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Left Box - Growth and FCR */}
              <div className="border border-[#6BBF3A] p-5">
                <div className="font-space-grotesk font-bold text-base text-[#1a1a1a] mb-2">
                  Growth and FCR
                </div>
                <p className="text-sm text-[#2d2d2d] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                  Probiotics improved daily gain and feed conversion across 60 broiler studies.
                </p>
              </div>

              {/* Right Box - Gut lesions */}
              <div className="border border-[#6BBF3A] p-5">
                <div className="font-space-grotesk font-bold text-base text-[#1a1a1a] mb-2">
                  Gut lesions
                </div>
                <p className="text-sm text-[#2d2d2d] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                  <span className="italic">Bacillus subtilis</span> reduced necrotic enteritis lesions as well as antibiotics did.
                </p>
              </div>
            </div>

            {/* Highlighted Statement with Vertical Accent Line */}
            <div className="flex gap-4 mb-6">
              <div className="w-1 bg-[#6BBF3A] flex-shrink-0" />
              <div>
                <h4 className="font-space-grotesk font-bold text-base text-[#1a1a1a] mb-2">
                  As effective as antibiotics on growth.
                </h4>
                <p className="text-base lg:text-lg text-[#2d2d2d] leading-relaxed font-medium" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                  Across 28 controlled necrotic enteritis trials, <span className="italic">B. subtilis</span> matched in-feed antibiotics for body weight, daily gain, FCR and lesion scores. Antibiotics were still better at cutting mortality in severe outbreaks.
                </p>
              </div>
            </div>

            {/* Bottom Divider Line */}
            <div className="w-full h-[1px] bg-[#c4d4c4]" />
          </div>
        </div>
      </div>
    </section>
  );
}
