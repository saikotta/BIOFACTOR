import React from "react";

export default function PoultryGutFrontline() {
  return (
    <section className="w-full relative overflow-hidden py-6 lg:py-8">
      {/* Background Image - Full Frame */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/poultry-chicks-hero.png"
          alt="Newly hatched chicks with eggs and green grass"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* MAIN HEADLINE - Full Width Top */}
        <div className="mb-4 lg:mb-6">
          <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,3rem)] text-[#1a3d2e] tracking-tight leading-[0.88] uppercase text-center">
            Whoever colonises the gut first sets the course.
          </h2>
        </div>

        {/* Main Content - Overlaid on Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          {/* Left Side - Diagram and Matter */}
          <div className="space-y-4 lg:space-y-6">
            {/* Diagram - No Box, Direct on Background */}
            <div>
              {/* Diagram - Transparent, No Background Box */}
              <svg viewBox="0 0 577 404" width="100%" height="auto" style={{ fontFamily: "'JetBrains Mono','IBM Plex Mono',monospace" }}>
                <text x="35" y="30" fontSize="13" fontWeight="700" letterSpacing="1.9" fill="#4a7c59" textAnchor="start">BENEFICIAL BACTERIA · ON THE VILLI</text>
                <text x="35" y="50" fontSize="13" fontWeight="700" letterSpacing="1.9" fill="#c77a68" textAnchor="start">SALMONELLA · CLOSTRIDIUM · KEPT OUT</text>
                <path d="M29 202 C160 101 417 101 548 202 C417 303 160 303 29 202 Z" stroke="#1a3d2e" strokeWidth="3" fill="none" strokeLinejoin="round"/>
                <line x1="100" y1="149" x2="100" y2="169" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="143" y1="138" x2="143" y2="159" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="186" y1="133" x2="186" y2="153" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="229" y1="129" x2="229" y2="149" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="272" y1="127" x2="272" y2="147" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="315" y1="127" x2="315" y2="148" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="359" y1="131" x2="359" y2="149" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="402" y1="132" x2="402" y2="153" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="445" y1="137" x2="445" y2="159" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="488" y1="149" x2="488" y2="169" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="100" y1="255" x2="100" y2="235" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="143" y1="266" x2="143" y2="245" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="186" y1="271" x2="186" y2="251" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="229" y1="275" x2="229" y2="255" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="272" y1="277" x2="272" y2="257" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="315" y1="277" x2="315" y2="256" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="359" y1="273" x2="359" y2="255" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="402" y1="272" x2="402" y2="251" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="445" y1="267" x2="445" y2="245" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <line x1="488" y1="255" x2="488" y2="235" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round"/>
                <rect x="114" y="168.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(-5, 129, 175)"/>
                <rect x="169" y="160.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(-4, 184, 167)"/>
                <rect x="223" y="154.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(-1, 238, 161)"/>
                <rect x="287" y="154.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(0, 302, 161)"/>
                <rect x="350" y="157.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(2, 365, 164)"/>
                <rect x="416" y="165.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(5, 431, 172)"/>
                <rect x="114" y="223.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(5, 129, 230)"/>
                <rect x="169" y="231.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(4, 184, 238)"/>
                <rect x="223" y="237.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(1, 238, 244)"/>
                <rect x="287" y="237.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(0, 302, 244)"/>
                <rect x="350" y="234.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(-2, 365, 241)"/>
                <rect x="416" y="226.5" width="30" height="13" rx="6.5" fill="#4a7c59" stroke="#1a3d2e" strokeWidth="2" transform="rotate(-5, 431, 233)"/>
                <rect x="243.5" y="192" width="27" height="14" rx="7" fill="#c77a68" stroke="#1a3d2e" strokeWidth="2.5"/>
                <rect x="310.5" y="198" width="27" height="14" rx="7" fill="#c77a68" stroke="#1a3d2e" strokeWidth="2.5"/>
                <text x="35" y="390" fontSize="13" fontWeight="400" letterSpacing="1.9" fill="#1a3d2e" textAnchor="start">SMALL INTESTINE · SCHEMATIC</text>
              </svg>
            </div>

            {/* Explanatory Matter */}
            <div className="space-y-4">
              <p className="text-base lg:text-xl text-[#0a2d1a] leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                A chick hatches with an almost empty gut. The first bacteria to settle there shape how the gut lining develops, how the immune system matures and which pathogens can find a place to attach.
              </p>

              {/* Historical Callout - No Vertical Line */}
              <div>
                <p className="text-sm lg:text-lg text-[#0a2d1a] leading-relaxed" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                  <span className="font-semibold text-[#8b7355]">The idea is 50 years old.</span> In 1973, Nurmi and Rantala showed that day-old chicks given gut bacteria from healthy adult hens resisted <span className="italic">Salmonella</span> colonisation. This became known as competitive exclusion.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Empty (Image shows through) */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}