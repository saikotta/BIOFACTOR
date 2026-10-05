import React from "react";
import Image from "next/image";
import styles from "./NutrientsHero.module.css";

export default function NutrientsHero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] flex items-end justify-start overflow-hidden bg-[#0A1A10]">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/nutriants/nutriants-hero.jpg"
          alt="Soil Microbiology and Plant Nutrition"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
      </div>

      {/* Multi-stage Shadow and Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A1A10] via-[#0A1A10]/20 to-transparent opacity-90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A1A10]/70 via-[#0A1A10]/20 to-transparent" />
      <div className="absolute inset-0 z-10 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] pointer-events-none" />

      {/* Hero Content Box - Anchored Bottom Left */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-3xl space-y-4">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1.5px] bg-[#B8E986]" />
            <span className="font-mono text-xs font-semibold tracking-widest text-[#B8E986] uppercase">
              PLANT NUTRITION · BIOLOGICAL MOBILISATION
            </span>
          </div>

          {/* Main Title */}
          <h1 className={`${styles.headline} font-extrabold text-white uppercase tracking-tight leading-[1.08]`}>
            BIOLOGY THAT MOVES NUTRIENTS
          </h1>

          {/* Subtitle / Narrative Intro */}
          <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#EAF3EA]/90 leading-relaxed font-normal">
            Converting unavailable soil reserves into active plant nutrition through living microbial pathways.
          </p>
        </div>
      </div>
    </section>
  );
}
