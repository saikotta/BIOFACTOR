"use client";

import React, { useEffect, useState } from "react";
import styles from "./BioremidationHero.module.css";

export default function BioremidationHero() {
  const [motes, setMotes] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generate motes on client side
    const newMotes = Array.from({ length: 22 }).map(() => ({
      left: Math.random() * 100 + "%",
      top: 40 + Math.random() * 55 + "%",
      delay: -Math.random() * 9 + "s",
      duration: 7 + Math.random() * 6 + "s",
    }));
    setMotes(newMotes);

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

    // Tracking (Bar + Parallax)
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
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#2D6A4F] origin-left scale-x-0 z-[60]"
      />

      <section className={styles.heroSection} id="s1">
        {/* Background Image Container */}
        <div className={styles.bgWrapper}>
          <img
            src="/images/bioremidation/remidation-hero.jpg"
            alt="Bio-Remediation Hero"
            className={styles.bgImage}
          />
        </div>

        {/* Floating Ambient Particles matching HTML motes */}
        <div className="br-motes" aria-hidden="true">
          {motes.map((m, i) => (
            <i 
              key={i} 
              className="br-mote-dot" 
              style={{ left: m.left, top: m.top, animationDelay: m.delay, animationDuration: m.duration }} 
            />
          ))}
        </div>

        {/* Restrained Readability Overlay */}
        <div className={styles.overlay} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.contentBlock}>
            {/* Eyebrow Label */}
            <div className={styles.eyebrowWrapper}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span className={styles.eyebrowText}>BIO-REMEDIATION</span>
            </div>

            {/* Main Display Headline */}
            <h1 className={styles.headline}>
              <span className="br-ln"><span>BIOLOGY THAT</span></span>
              <span className="br-ln br-d1"><span><span className={styles.accentGreen}>CLEANS</span> WATER &amp;</span></span>
              <span className="br-ln br-d2"><span>RESTORES ECOSYSTEMS.</span></span>
            </h1>

            {/* Subtitle Copy */}
            <p className={`${styles.subtitle} br-quote br-in`}>
              Targeted microbial consortia that degrade complex organic contaminants, eliminate toxic sludge, and restore natural water quality without synthetic chemicals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
