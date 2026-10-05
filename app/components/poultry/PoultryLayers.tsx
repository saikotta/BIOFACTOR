import React from "react";

export default function PoultryLayers() {
  return (
    <section className="w-full relative overflow-hidden py-8 lg:py-12 min-h-[85vh] bg-[#DCE8D5]" data-pm-section="layers">
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

      <div className="relative z-10 w-full max-w-[1600px] mx-auto pl-[clamp(20px,5vw,72px)] pr-5 lg:pr-12 h-full flex flex-col justify-center">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Content */}
          <div className="space-y-6 lg:space-y-8 w-[95%] pl-8 lg:pl-16" data-pm-species-text="1">
            {/* Small Label */}
            <div className="font-mono text-xs font-semibold tracking-[0.25em] text-[#2D5A42] uppercase mb-2">
              COMMERCIAL EGG PRODUCTION
            </div>

            {/* Large Heading */}
            <h2 className="font-space-grotesk font-extrabold text-[clamp(4rem,8vw,8rem)] text-[#2D5A42] tracking-tight leading-[0.85] uppercase mb-4">
              LAYERS
            </h2>

            {/* Priority */}
            <div className="font-mono text-xs font-semibold tracking-[0.2em] text-[#2d2d2d] uppercase max-w-md mb-6">
              Priority · sustained lay, strong shells and gut stability over a long cycle
            </div>

            {/* Body Heading */}
            <h3 className="font-space-grotesk font-semibold text-xl lg:text-2xl text-[#1a1a1a] tracking-tight leading-tight mb-4 br-rv">
              A long laying cycle needs a stable gut.
            </h3>

            {/* Body Paragraph */}
            <p className="text-base lg:text-lg text-[#2d2d2d] leading-relaxed mb-6 br-rv br-d1" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
              A laying hen produces for a year or more, and every egg draws heavily on calcium and phosphorus. A balanced gut community supports feed efficiency and mineral uptake across the whole cycle, and helps keep Salmonella out of the flock and off the eggs.
            </p>

            {/* Feature Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 br-rv br-d2">
              {/* Left Feature Box */}
              <div className="border border-[#c4d4c4] p-5">
                <div className="font-space-grotesk font-bold text-base text-[#1a1a1a] mb-2">
                  More eggs per kg feed
                </div>
                <p className="text-sm text-[#2d2d2d] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                  Better digestion and nutrient absorption in the gut.
                </p>
              </div>

              {/* Right Feature Box */}
              <div className="border border-[#c4d4c4] p-5">
                <div className="font-space-grotesk font-bold text-base text-[#1a1a1a] mb-2">
                  Stronger shells
                </div>
                <p className="text-sm text-[#2d2d2d] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                  Better mineral uptake supports shell formation, especially late in lay.
                </p>
              </div>
            </div>

            {/* Highlighted Statement with Vertical Accent Line */}
            <div className="flex gap-4 mb-6 br-rv br-d2">
              <div className="w-1 bg-[#6BBF3A] flex-shrink-0" />
              <div>
                <p className="text-base lg:text-lg text-[#1a1a1a] leading-relaxed font-medium" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                  More eggs, thicker shells. A meta-analysis of 47 studies found probiotics increased egg production, eggshell thickness and eggshell weight, and lowered feed per egg.
                </p>
                <a href="https://1aeac708-3778-4d03-9206-4cc07b2aea77.frame.claudeusercontent.com/_f/1790257515-c213/?__frame_v=manifest.670f8fc4f84795ee.json#p6" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#6BBF3A] hover:text-[#1a1a1a] transition-colors mt-2 inline-block">
                  [6]
                </a>
              </div>
            </div>

            {/* Bottom Divider Line */}
            <div className="w-full h-[1px] bg-[#c4d4c4]" />
          </div>

          {/* Right Side - Image */}
          <div className="flex flex-col items-center" data-pm-species-frame="1">
            {/* Spacer to align image top with "A long laying cycle needs a stable gut." */}
            <div className="h-[60px] lg:h-[90px]" />
            {/* Image */}
            <div className="group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(45,90,66,0.25)] active:scale-[0.98] w-[75%] h-[520px] lg:h-[580px] rounded-sm overflow-hidden" data-layer-image>
              <img
                src="/images/poultry-hero-right.png"
                alt="Layers - sustained lay, strong shells and gut"
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
