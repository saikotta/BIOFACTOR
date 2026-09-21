"use client";

import React, { useState } from "react";
import HeaderNav from "./HeaderNav";
import PromptModal from "./PromptModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full h-full bg-transparent text-white overflow-hidden flex flex-col justify-between select-none">
      {/* Top Navigation Row */}
      <div className="relative z-30 pt-6 sm:pt-8 px-6 sm:px-12 md:px-16 flex items-center justify-between">
        <HeaderNav />

        {/* Top Right Minimalist Engine Info */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-white/50 font-sans tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            ENGINE V4.2
          </span>
          <span>/</span>
          <span>4K RENDERING</span>
        </div>
      </div>

      {/* Main Minimalist Content Grid (No image, clean spatial alignment) */}
      <div className="relative z-20 flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 py-12 md:py-20">
        
        {/* Left Column: Badge & Refined Headline */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          {/* Availability Minimal Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-light uppercase tracking-widest text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>AI IMAGE GENERATOR</span>
          </div>

          {/* Headline - Refined Medium Weight & Minimal Elegance */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white/95 leading-[1.12] max-w-2xl mt-6">
            Generative AI Engine for Next-Gen Visuals
          </h1>
        </div>

        {/* Right Column: Concise Description & Minimalist CTA */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center lg:pl-6 space-y-8">
          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-md">
            Transform simple text prompts into cinema-grade visual masterpieces with hyper-realistic detail and infinite creative control.
          </p>

          {/* Orange/Purple CTA Button matching reference layout structure */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-medium rounded-full p-1.5 pr-6 inline-flex items-center gap-3.5 shadow-none hover:opacity-95 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black group-hover:translate-x-0.5 transition-transform">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <span className="text-sm font-medium tracking-wide">Start Creating</span>
          </button>
        </div>
      </div>

      {/* Oversized Brand Typography at Bottom (Minimalist Refined White Text) */}
      <div className="relative z-10 w-full overflow-hidden leading-none pt-4 pb-2 text-center pointer-events-none select-none border-t border-white/5">
        <h2 className="brand-oversized-text text-white font-semibold tracking-tighter opacity-90">
          DREAMFRAME
        </h2>
      </div>

      {/* Interactive Prompt Generator Modal */}
      <PromptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
