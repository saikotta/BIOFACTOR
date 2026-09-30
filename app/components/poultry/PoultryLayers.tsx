import React from "react";

export default function PoultryLayers() {
  return (
    <section className="w-full relative overflow-hidden py-8 lg:py-12 min-h-[85vh] bg-[#EAF3EA]">
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
        {/* Editorial Content - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
          {/* Left Side - Content */}
          <div className="space-y-6 lg:space-y-8 relative z-10 px-6 lg:px-12">
            {/* Section Label */}
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1.5px] bg-[#2D6A4F]" />
                <div className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
                  05 / LAYERS
                </div>
              </div>
              <h2 className="font-space-grotesk font-extrabold text-[clamp(2.25rem,3.8vw,4rem)] text-[#0a2d1a] tracking-tight leading-[1.02] uppercase">
                COMMERCIAL EGG PRODUCTION
              </h2>
            </div>

            {/* Priority */}
            <div className="mb-6 lg:mb-8">
              <div className="font-mono text-xs font-semibold tracking-[0.25em] text-[#2D6A4F] uppercase">
                PRIORITY · SUSTAINED LAY, STRONG SHELLS AND GUT STABILITY OVER A LONG CYCLE
              </div>
            </div>

            {/* Main Text */}
            <div className="space-y-4 max-w-xl mb-6 lg:mb-8">
              <p className="text-sm lg:text-base text-[#0a2d1a] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                A long laying cycle needs a stable gut. A laying hen produces for a year or more, and every egg draws heavily on calcium and phosphorus. A balanced gut community supports feed efficiency and mineral uptake across the whole cycle, and helps keep Salmonella out of the flock and off the eggs.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 max-w-xl mb-6 lg:mb-8">
              <div>
                <h3 className="font-space-grotesk font-bold text-lg text-[#2D6A4F] mb-2">
                  More eggs per kg feed
                </h3>
                <p className="text-sm lg:text-base text-[#0a2d1a] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                  Better digestion and nutrient absorption in the gut.
                </p>
              </div>

              <div>
                <h3 className="font-space-grotesk font-bold text-lg text-[#2D6A4F] mb-2">
                  Stronger shells
                </h3>
                <p className="text-sm lg:text-base text-[#0a2d1a] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                  Better mineral uptake supports shell formation, especially late in lay.
                </p>
              </div>
            </div>

            {/* Summary with Citation */}
            <div className="max-w-xl">
              <p className="text-sm lg:text-base text-[#0a2d1a] leading-relaxed mb-2" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                More eggs, thicker shells. A meta-analysis of 47 studies found probiotics increased egg production, eggshell thickness and eggshell weight, and lowered feed per egg.
              </p>
              <a href="https://1aeac708-3778-4d03-9206-4cc07b2aea77.frame.claudeusercontent.com/_f/1790257515-c213/?__frame_v=manifest.670f8fc4f84795ee.json#p6" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#2D6A4F] hover:text-white transition-colors">
                [6]
              </a>
            </div>
          </div>

          {/* Right Side - Empty for Gap */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
