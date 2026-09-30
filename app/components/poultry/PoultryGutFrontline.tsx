import React from "react";

export default function PoultryGutFrontline() {
  return (
    <section className="w-full relative overflow-hidden py-8 lg:py-12 min-h-[85vh] bg-[#EAF3EA]">
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
        {/* Editorial Content - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
          {/* Left Side - Content */}
          <div className="space-y-4 lg:space-y-5 relative z-10 px-6 lg:px-12">
            {/* MAIN HEADLINE - Two Lines */}
            <div className="mb-6 lg:mb-8">
              <h2 className="font-space-grotesk font-bold text-[clamp(1.75rem,3vw,3rem)] text-[#0a2d1a] tracking-tight leading-[1.1] uppercase">
                Whoever colonises the gut<br />
                first sets the course.
              </h2>
            </div>

            {/* Diagram - As Provided */}
            <div className="mb-6 lg:mb-8">
              <svg viewBox="0 0 1702 924" width="100%" height="auto" style={{ fontFamily: 'Inter,Montserrat,Arial,sans-serif', fontWeight: '700' }}>
                <title>Beneficial bacteria on the villi</title>

                <g letterSpacing="7" fontSize="32">
                  <text x="75" y="130" fill="#0B3B2A">BENEFICIAL BACTERIA · ON THE VILLI</text>
                  <text x="75" y="180" fill="#F4775A">SALMONELLA · CLOSTRIDIUM · KEPT OUT</text>
                </g>

                {/* lens */}
                <path d="M240,480 Q840,140 1445,480 Q840,820 240,480 Z"
                      fill="none" stroke="#0B3B2A" strokeWidth="4"/>

                {/* villi ticks */}
                <g stroke="#2E7D4F" strokeWidth="3" strokeLinecap="round">
                  {/* top */}
                  <path d="M401,383V415M482,335V388M567,332V370M668,315V358M772,306V352M880,306V352M987,312V345M1091,318V368M1197,337V387M1278,363V415"/>
                  {/* bottom */}
                  <path d="M401,545V597M482,572V622M567,590V642M668,600V644M772,606V650M880,606V655M987,600V652M1091,590V642M1197,570V620M1278,542V595"/>
                </g>

                {/* beneficial bacteria */}
                <g fill="#4E9A5B" stroke="#0B3B2A" strokeWidth="3">
                  <rect x="427" y="407" width="66" height="32" rx="16" transform="rotate(-8 460 423)"/>
                  <rect x="556" y="381" width="66" height="32" rx="16" transform="rotate(-5 589 396)"/>
                  <rect x="699" y="367" width="66" height="32" rx="16"/>
                  <rect x="833" y="367" width="66" height="32" rx="16"/>
                  <rect x="976" y="373" width="66" height="32" rx="16" transform="rotate(4 1009 388)"/>
                  <rect x="1133" y="394" width="66" height="32" rx="16" transform="rotate(5 1166 409)"/>

                  <rect x="428" y="522" width="66" height="32" rx="16" transform="rotate(6 461 538)"/>
                  <rect x="556" y="545" width="66" height="32" rx="16" transform="rotate(3 591 561)"/>
                  <rect x="684" y="557" width="66" height="32" rx="16"/>
                  <rect x="833" y="557" width="66" height="32" rx="16"/>
                  <rect x="991" y="549" width="66" height="32" rx="16" transform="rotate(-5 1024 565)"/>
                  <rect x="1138" y="525" width="66" height="32" rx="16" transform="rotate(-8 1171 541)"/>
                </g>

                {/* harmful bacteria */}
                <g fill="#F4775A" stroke="#0B3B2A" strokeWidth="3">
                  <rect x="720" y="454" width="66" height="32" rx="16"/>
                  <rect x="894" y="461" width="66" height="32" rx="16"/>
                </g>

                {/* footer */}
                <text x="75" y="827" fontSize="28" letterSpacing="6" fill="#0B3B2A">SMALL INTESTINE · SCHEMATIC</text>
                <line x1="798" y1="816" x2="898" y2="816" stroke="#F4775A" strokeWidth="4"/>
              </svg>
            </div>

            {/* Body Copy - Serif Font */}
            <div className="space-y-4 max-w-xl">
              <p className="text-sm lg:text-base text-[#0a2d1a] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                <span className="text-[#DC2626] font-medium">A chick hatches with an almost empty gut.</span> The first bacteria to settle there shape how the gut lining develops, how the immune system matures and which pathogens can find a place to attach.
              </p>

              <p className="text-sm lg:text-base text-[#0a2d1a] leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, Times, serif' }}>
                <span className="text-[#DC2626] font-medium">The idea is 50 years old.</span> In 1973, Nurmi and Rantala showed that day-old chicks given gut bacteria from healthy adult hens resisted <span className="italic">Salmonella</span> colonisation. This became known as competitive exclusion.
              </p>
            </div>
          </div>

          {/* Right Side - Empty for Gap */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
