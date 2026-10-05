"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./NutrientsHero.module.css";

export default function NutrientsHero() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Standard reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("br-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18 });

    const pio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("br-in");
          pio.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    const initializeObservers = () => {
      document.querySelectorAll(".br-rv, .br-mx-wrap, .br-callout, .br-ln").forEach((el) => {
        if (!el.classList.contains("br-in") && !el.hasAttribute("data-obs")) {
          el.setAttribute("data-obs", "1");
          io.observe(el);
        }
      });
      
      document.querySelectorAll(".br-ph").forEach((p) => {
        if (!p.classList.contains("br-in") && !p.hasAttribute("data-obs")) {
          p.setAttribute("data-obs", "1");
          pio.observe(p);
        }
      });

      // Count Up
      document.querySelectorAll("[data-cu]").forEach((el) => {
        if (el.hasAttribute("data-obs")) return;
        el.setAttribute("data-obs", "1");
        const text = el.textContent || "";
        new IntersectionObserver((entries, observer) => {
          if (!entries[0].isIntersecting) return;
          observer.disconnect();
          const t0 = performance.now();
          const animate = (now: number) => {
            const p = reduce ? 1 : Math.min(1, (now - t0) / 1500);
            const k = 1 - Math.pow(1 - p, 3);
            el.textContent = text.replace(/\d+(?:\.\d+)?/g, (n) => 
              n.includes('.') ? (Number(n) * k).toFixed(1) : Math.round(Number(n) * k).toString()
            );
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }, { threshold: 0.6 }).observe(el);
      });
    };

    initializeObservers();
    setTimeout(initializeObservers, 150);
    setTimeout(initializeObservers, 500);
    setTimeout(initializeObservers, 1500);

    // Tracking (Bar)
    let tk = false;
    const bar = document.getElementById("br-progress-bar");
    const onScroll = () => {
      if (tk) return;
      tk = true;
      requestAnimationFrame(() => {
        tk = false;
        const y = window.scrollY;
        if (bar) {
          const mx = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          bar.style.transform = `scaleX(${Math.min(1, Math.max(0, y / mx))})`;
        }
        if (!reduce) {
          document.querySelectorAll(".br-ph-in").forEach((p) => {
            const r = p.parentElement?.getBoundingClientRect();
            if (r && r.bottom > 0 && r.top < window.innerHeight) {
              (p as HTMLElement).style.transform = `translateY(${((r.top + r.height / 2 - window.innerHeight / 2) * -0.06).toFixed(1)}px)`;
            }
          });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div 
        id="br-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#B8E986] origin-left scale-x-0 z-[60]"
      />

      <section className="relative w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] flex items-end justify-start overflow-hidden bg-[#0A1A10]" id="s1">
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
            <div className="flex items-center gap-3 br-rv">
              <span className="w-8 h-[1.5px] bg-[#B8E986]" />
              <span className="font-mono text-xs font-semibold tracking-widest text-[#B8E986] uppercase">
                PLANT NUTRITION · BIOLOGICAL MOBILISATION
              </span>
            </div>

            {/* Main Title */}
            <h1 className={`${styles.headline} font-extrabold text-white uppercase tracking-tight leading-[1.08]`}>
              <span className="br-ln"><span>BIOLOGY THAT</span></span>
              <span className="br-ln br-d1"><span><span className="text-[#B8E986]">MOVES</span> NUTRIENTS</span></span>
            </h1>

            {/* Subtitle / Narrative Intro */}
            <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#EAF3EA]/90 leading-relaxed font-normal br-quote br-in">
              Converting unavailable soil reserves into active plant nutrition through living microbial pathways.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
