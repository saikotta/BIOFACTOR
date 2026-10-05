"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
// Reuse the identical CSS module from Bioremediation to keep things perfectly synced without creating new files
import styles from "../bioremediation/BioremidationHero.module.css";

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

      <section className={styles.heroSection} id="s1">
        {/* Background Image Container */}
        <div className={styles.bgWrapper}>
          <img
            src="/images/nutriants/nutriants-hero.jpg"
            alt="Soil Microbiology and Plant Nutrition"
            className={styles.bgImage}
          />
        </div>



        {/* Restrained Readability Overlay */}
        <div className={styles.overlay} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.contentBlock}>
            {/* Eyebrow Label */}
            <div className={styles.eyebrowWrapper}>
              <span className={styles.eyebrowLine} aria-hidden="true" style={{ background: '#B8E986' }} />
              <span className={styles.eyebrowText} style={{ color: '#B8E986' }}>PLANT NUTRITION · BIOLOGICAL MOBILISATION</span>
            </div>

            {/* Main Display Headline */}
            <h1 className={styles.headline}>
              <span className="br-ln"><span>BIOLOGY THAT</span></span>
              <span className="br-ln br-d1"><span><span className="text-[#B8E986]">MOVES</span> NUTRIENTS</span></span>
            </h1>

            {/* Subtitle Copy */}
            <p className={`${styles.subtitle} br-quote br-in`} style={{ color: '#EAF3EA' }}>
              Converting unavailable soil reserves into active plant nutrition through living microbial pathways.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
