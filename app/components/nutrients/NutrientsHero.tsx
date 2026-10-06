"use client";

import React, { useEffect } from "react";
import BiofactorScrollHero from "../BiofactorScrollHero";

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

    // For above-the-fold hero elements, fire immediately with a short delay
    // so the CSS transition has time to initialize before adding .br-in
    const triggerHeroAnimations = () => {
      document.querySelectorAll(".br-ln, .br-quote").forEach((el) => {
        if (!el.classList.contains("br-in")) {
          el.classList.add("br-in");
        }
      });
    };

    // Small delay so CSS paint is complete before animation starts
    setTimeout(triggerHeroAnimations, 120);
    setTimeout(triggerHeroAnimations, 350);

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

      <BiofactorScrollHero>
        <div className="relative w-full h-full flex flex-col justify-end pb-14 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1700px] mx-auto z-20">
          <div className="w-full max-w-4xl">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-[1.5px] bg-[#B8E986] opacity-90" aria-hidden="true" />
              <span className="font-mono text-[13px] sm:text-[14px] font-semibold tracking-[0.16em] uppercase text-[#B8E986]">
                PLANT NUTRITION · BIOLOGICAL MOBILISATION
              </span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-sans font-extrabold uppercase text-white tracking-tight leading-[0.9] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px] mb-5 max-w-[850px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              <span className="br-ln block"><span>BIOLOGY THAT</span></span>
              <span className="br-ln br-d1 block">
                <span><span className="text-[#B8E986]">MOVES</span> NUTRIENTS</span>
              </span>
            </h1>

            {/* Subtitle Copy */}
            <p className="font-serif italic font-normal text-white/95 leading-[1.45] tracking-tight text-[1.25rem] sm:text-[1.4rem] md:text-[1.55rem] max-w-[640px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] br-quote">
              Converting unavailable soil reserves into active plant nutrition through living microbial pathways.
            </p>
          </div>
        </div>
      </BiofactorScrollHero>
    </>
  );
}
