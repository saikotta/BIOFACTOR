"use client";

import React, { useEffect } from "react";

export default function PoultryScrollMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ------------------------------------------------------------------
    // 1. Motes Generator (22 pale gold motes) — Generated ONCE
    // ------------------------------------------------------------------
    const m = document.querySelector(".motes");
    if (m && m.children.length === 0) {
      for (let i = 0; i < 22; i++) {
        const e = document.createElement("i");
        e.style.left = Math.random() * 100 + "%";
        e.style.top = 40 + Math.random() * 55 + "%";
        e.style.animationDelay = -Math.random() * 9 + "s";
        e.style.animationDuration = 7 + Math.random() * 6 + "s";
        m.appendChild(e);
      }
    }

    // ------------------------------------------------------------------
    // 2. Offscreen Continuous Animation Pausing (Hero motes)
    // ------------------------------------------------------------------
    const heroSec = document.querySelector('[data-ruminants-section="hero"]');
    const motesEl = document.querySelector<HTMLElement>(".motes");
    let heroObserver: IntersectionObserver | null = null;

    if (heroSec && motesEl) {
      heroObserver = new IntersectionObserver(
        (entries) => {
          const isVisible = entries[0].isIntersecting;
          motesEl.style.animationPlayState = isVisible ? "running" : "paused";
          motesEl.style.display = isVisible ? "block" : "none";
        },
        { threshold: 0.02 }
      );
      heroObserver.observe(heroSec);
    }

    // ------------------------------------------------------------------
    // 3. Reliable Viewport Reveal Observer (.rv, .ph, .led, .call)
    // Triggers ONCE on downward scroll (150px rootMargin, 0 threshold).
    // Once revealed, elements NEVER reset or hide.
    // ------------------------------------------------------------------
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("in", "visible");
            revealObserver.unobserve(target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "150px 0px 150px 0px"
      }
    );

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".rv, .led, .call, .ph"));
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Immediate load check: if already inside or near viewport on mount, reveal right away
      if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
        el.classList.add("in", "visible");
      } else {
        revealObserver.observe(el);
      }
    });

    // ------------------------------------------------------------------
    // 4. Count-Up Observer — EaseOutCubic count over 1.5s
    // ------------------------------------------------------------------
    const cuElements = Array.from(document.querySelectorAll<HTMLElement>("[data-cu]"));
    const cuMap = new Map<HTMLElement, { targetText: string; isCounting: boolean; hasCounted: boolean }>();

    cuElements.forEach((el) => {
      const rawCu = el.getAttribute("data-cu");
      const targetText = (rawCu && rawCu !== "true" && rawCu !== "false") ? rawCu : (el.textContent || "");
      cuMap.set(el, { targetText, isCounting: false, hasCounted: false });
      if (!el.textContent || el.textContent === "true") {
        el.textContent = targetText;
      }
    });

    const triggerCountUp = (el: HTMLElement) => {
      const data = cuMap.get(el);
      if (!data || data.hasCounted || data.isCounting) return;
      data.isCounting = true;
      const t0 = performance.now();
      const target = data.targetText;

      (function runCount(now) {
        const progress = reduce ? 1 : Math.min(1, (now - t0) / 1500);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = target.replace(/\d+/g, (n) => String(Math.round(+n * ease)));
        if (progress < 1) {
          requestAnimationFrame(runCount);
        } else {
          el.textContent = target;
          data.isCounting = false;
          data.hasCounted = true;
        }
      })(t0);
    };

    const cuObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            triggerCountUp(el);
            cuObserver.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "100px 0px 100px 0px" }
    );

    cuElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        triggerCountUp(el);
      } else {
        cuObserver.observe(el);
      }
    });

    // ------------------------------------------------------------------
    // 5. Parallax Tracking for Visible Parallax Elements (.ph-in)
    // ------------------------------------------------------------------
    const visibleParallaxItems = new Set<HTMLElement>();
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visibleParallaxItems.add(el);
          } else {
            visibleParallaxItems.delete(el);
          }
        });
      },
      { rootMargin: "60px 0px 60px 0px" }
    );

    document.querySelectorAll<HTMLElement>(".ph-in").forEach((el) => {
      parallaxObserver.observe(el);
    });

    // ------------------------------------------------------------------
    // 6. Single Coordinated Scroll Handler (Top Bar & Section Rail)
    // ------------------------------------------------------------------
    const secElements = Array.from(document.querySelectorAll<HTMLElement>("[data-n]"));
    const railContainer = document.getElementById("rail");
    let railDots: HTMLAnchorElement[] = [];

    if (railContainer) {
      railContainer.innerHTML = "";
      railDots = secElements.map((s) => {
        const a = document.createElement("a");
        a.title = s.dataset.n || "";
        a.href = "#";
        a.onclick = (ev) => {
          ev.preventDefault();
          s.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        };
        railContainer.appendChild(a);
        return a;
      });
    }

    let ticking = false;
    let activeRailIndex = -1;
    let winH = window.innerHeight;
    let docMaxScroll = Math.max(1, document.documentElement.scrollHeight - winH);

    const updateMetrics = () => {
      winH = window.innerHeight;
      docMaxScroll = Math.max(1, document.documentElement.scrollHeight - winH);
    };

    window.addEventListener("resize", updateMetrics, { passive: true });

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;

        // A. Top Progress Bar
        const bar = document.getElementById("bar");
        if (bar) {
          bar.style.transform = `scaleX(${y / docMaxScroll})`;
        }

        // B. Active Section Rail Dot
        let newActiveIndex = -1;
        for (let i = 0; i < secElements.length; i++) {
          const r = secElements[i].getBoundingClientRect();
          if (r.top < winH * 0.5 && r.bottom > winH * 0.3) {
            newActiveIndex = i;
            break;
          }
        }

        if (railContainer) {
          if (newActiveIndex !== activeRailIndex) {
            activeRailIndex = newActiveIndex;
            for (let i = 0; i < railDots.length; i++) {
              railDots[i].classList.toggle("on", i === activeRailIndex);
            }
          }
          railContainer.style.opacity = y > winH * 0.6 ? "1" : "0";
        }

        // C. Parallax Calculation for Parallax Elements (.ph-in)
        if (!reduce && visibleParallaxItems.size > 0) {
          const updates: Array<{ el: HTMLElement; offsetPx: string }> = [];
          const vCenter = winH / 2;

          visibleParallaxItems.forEach((pImg) => {
            const parent = pImg.parentElement;
            if (!parent) return;
            const r = parent.getBoundingClientRect();
            const elCenter = r.top + r.height / 2;
            const offsetPx = ((elCenter - vCenter) * -0.06).toFixed(1);
            updates.push({ el: pImg, offsetPx });
          });

          for (let i = 0; i < updates.length; i++) {
            updates[i].el.style.transform = `scale(1.10) translate3d(0, ${updates[i].offsetPx}px, 0)`;
          }
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ------------------------------------------------------------------
    // Cleanup Function
    // ------------------------------------------------------------------
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateMetrics);
      heroObserver?.disconnect();
      revealObserver.disconnect();
      cuObserver.disconnect();
      parallaxObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="bar" id="bar" aria-hidden="true" />

      {/* Desktop Right-Side Section Rail */}
      <nav className="rail" id="rail" aria-label="Sections" />

      {/* Standardized Motion System CSS (Matches locked Ruminants system) */}
      <style jsx global>{`
        /* Progress Bar */
        .bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #6DBE45;
          transform-origin: 0 50%;
          transform: scaleX(0);
          z-index: 60;
        }

        /* Section Rail */
        .rail {
          position: fixed;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 40;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .rail a {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(20, 51, 36, 0.25);
          transition: transform 0.4s, background-color 0.4s;
          display: block;
        }
        .rail a.on {
          background: #6DBE45;
          transform: scale(1.7);
        }

        /* Hero Motes */
        .motes {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .motes i {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #F4E3A1;
          opacity: 0;
          animation: mote 9s linear infinite;
        }
        @keyframes mote {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          20% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateY(-220px);
          }
        }

        /* Hero Masked Vertical Reveal */
        .ln {
          display: block;
          overflow: hidden;
          padding-bottom: 0.06em;
        }
        .ln > span {
          display: inline-block;
          transform: translateY(105%);
          animation: up 1s cubic-bezier(0.2, 0.7, 0.2, 1) 0.2s forwards;
        }
        .ln + .ln > span {
          animation-delay: 0.38s;
        }
        .ln:nth-child(3) > span {
          animation-delay: 0.56s;
        }
        @keyframes up {
          to {
            transform: none;
          }
        }

        /* Hero Quote Fade */
        .quote {
          opacity: 0;
          animation: fade 1s 0.9s forwards;
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }

        /* Global Reveal System (.rv) */
        .rv {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s, transform 0.9s;
        }
        .rv.in,
        .rv.visible {
          opacity: 1;
          transform: none;
        }
        .rv.d1 {
          transition-delay: 0.15s;
        }
        .rv.d2 {
          transition-delay: 0.3s;
        }

        /* Stats Accent Line */
        .led {
          position: relative;
        }
        .led::after {
          content: "";
          position: absolute;
          left: 0;
          top: -4px;
          height: 2px;
          width: 0;
          background: #6DBE45;
          transition: width 1.2s 0.3s;
        }
        .led.in::after,
        .led.visible::after {
          width: 60px;
        }

        /* Photo Clip Reveal (.ph) */
        .ph {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          clip-path: inset(0 0 100% 0 round 22px);
          transition: clip-path 1.3s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .ph.in,
        .ph.visible,
        .in .ph {
          clip-path: inset(0 0 0 0 round 22px);
        }
        .ph-in {
          will-change: transform;
        }

        /* Table Row Hover (Desktop hover:hover devices only) */
        @media (hover: hover) {
          .trow {
            transition: background 0.35s, color 0.35s, padding 0.35s;
          }
          .trow:hover {
            background: #1B3B2B !important;
            color: #ffffff !important;
            padding-left: 24px !important;
          }
          .trow:hover * {
            color: #ffffff !important;
          }
          .trow:hover sup {
            color: #6DBE45 !important;
          }
        }

        /* Callout Accent Line */
        .call {
          position: relative;
        }
        .call::before {
          content: "";
          position: absolute;
          left: -3px;
          top: 0;
          width: 3px;
          height: 0;
          background: #6DBE45;
          transition: height 1.2s 0.4s;
        }
        .call.in::before,
        .call.visible::before,
        .in .call::before {
          height: 100%;
        }

        /* Mobile Breakpoint for Rail */
        @media (max-width: 860px) {
          .rail {
            display: none !important;
          }
        }

        /* Prefers Reduced Motion Accessibility Override */
        @media (prefers-reduced-motion: reduce) {
          .ln > span,
          .quote,
          .rv,
          .ph,
          .motes i {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            transition: none !important;
          }
          html {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}
