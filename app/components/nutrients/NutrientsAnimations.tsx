"use client";

import React, { useEffect } from "react";

export default function NutrientsAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ------------------------------------------------------------------
    // 1. Bidirectional Reveal Observer (.br-rv, .rv, .br-ln, .ln, .br-quote, .quote, .br-callout, .call, .br-ph, .ph, .br-mx-wrap, .mx)
    // Replays on downward AND upward scroll re-entry; resets when offscreen
    // ------------------------------------------------------------------
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            target.classList.add("br-in", "in", "visible");
          } else if (entry.intersectionRatio < 0.05) {
            target.classList.remove("br-in", "in", "visible");
          }
        });
      },
      {
        threshold: [0, 0.1],
        rootMargin: "30px 0px 30px 0px",
      }
    );

    document
      .querySelectorAll(".br-rv, .rv, .br-ln, .ln, .br-quote, .quote, .br-callout, .call, .br-ph, .ph, .br-mx-wrap, .mx")
      .forEach((el) => {
        revealObserver.observe(el);
      });

    // ------------------------------------------------------------------
    // 2. Count-Up Observer ([data-cu]) — Replays cleanly on scroll entry
    // ------------------------------------------------------------------
    const cuElements = Array.from(document.querySelectorAll<HTMLElement>("[data-cu]"));
    const cuMap = new Map<HTMLElement, { targetText: string; isCounting: boolean; hasCounted: boolean }>();

    cuElements.forEach((el) => {
      const rawCu = el.getAttribute("data-cu");
      const targetText = rawCu && rawCu !== "true" && rawCu !== "false" ? rawCu : el.textContent || "";
      cuMap.set(el, { targetText, isCounting: false, hasCounted: false });
      if (!el.textContent || el.textContent === "true") {
        el.textContent = targetText;
      }
    });

    const cuObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const data = cuMap.get(el);
          if (!data) return;

          if (entry.isIntersecting) {
            if (!data.hasCounted && !data.isCounting) {
              data.isCounting = true;
              const t0 = performance.now();
              const target = data.targetText;

              (function runCount(now) {
                const progress = reduce ? 1 : Math.min(1, (now - t0) / 1500);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = target.replace(/\d+(?:\.\d+)?/g, (n) =>
                  n.includes(".") ? (Number(n) * ease).toFixed(1) : Math.round(Number(n) * ease).toString()
                );
                if (progress < 1) {
                  requestAnimationFrame(runCount);
                } else {
                  el.textContent = target;
                  data.isCounting = false;
                  data.hasCounted = true;
                }
              })(t0);
            }
          } else if (entry.intersectionRatio === 0) {
            data.hasCounted = false;
            el.textContent = data.targetText;
          }
        });
      },
      { threshold: 0.3 }
    );

    cuElements.forEach((el) => cuObserver.observe(el));

    // ------------------------------------------------------------------
    // 3. Parallax Scroll & Progress Observer (.br-ph-in, .ph-in)
    // ------------------------------------------------------------------
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;

        // Top scroll progress bar
        const bar = document.getElementById("br-progress-bar") || document.getElementById("bar");
        if (bar) {
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          bar.style.transform = `scaleX(${Math.min(1, Math.max(0, y / maxScroll))})`;
        }

        // Parallax image movement
        if (!reduce) {
          document.querySelectorAll<HTMLElement>(".br-ph-in, .ph-in").forEach((p) => {
            const r = p.parentElement?.getBoundingClientRect();
            if (r && r.bottom > 0 && r.top < window.innerHeight) {
              const offsetPx = ((r.top + r.height / 2 - window.innerHeight / 2) * -0.06).toFixed(1);
              p.style.transform = `scale(1.08) translate3d(0, ${offsetPx}px, 0)`;
            }
          });
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      revealObserver.disconnect();
      cuObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
