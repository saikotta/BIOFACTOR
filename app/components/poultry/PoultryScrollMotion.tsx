"use client";

import { useEffect } from "react";

function cl(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function eo(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function ob(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function progress(el: HTMLElement, vh: number, start = 0.98, len = 0.5): number {
  const r = el.getBoundingClientRect();
  const topRatio = (vh - r.top) / vh;
  return cl((topRatio - (1 - start)) / len);
}

function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.innerHTML = "";
  const words = text.trim().split(/\s+/);
  return words.map((w) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.marginRight = "0.25em";
    span.textContent = w;
    el.appendChild(span);
    return span;
  });
}

function injectSporesCSS(reduced: boolean) {
  if (reduced || typeof document === "undefined" || document.getElementById("pm-spore-style")) return;
  const style = document.createElement("style");
  style.id = "pm-spore-style";
  style.textContent = `
    @keyframes pm-kenburns {
      0% { transform: scale(1); }
      100% { transform: scale(1.08); }
    }
    @keyframes pm-float {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(-25px) rotate(6deg); }
    }
  `;
  document.head.appendChild(style);
}

function createRays(rayEl: HTMLElement, sectionEl: HTMLElement, reduced: boolean) {
  if (reduced || rayEl.children.length > 0) return;
  for (let i = 0; i < 4; i++) {
    const ray = document.createElement("div");
    ray.style.cssText = `
      position: absolute;
      top: -20%;
      left: ${15 + i * 22}%;
      width: 120px;
      height: 140%;
      background: linear-gradient(185deg, rgba(255,255,255,0.06) 0%, transparent 70%);
      transform: rotate(-15deg);
      pointer-events: none;
    `;
    rayEl.appendChild(ray);
  }
}

function createSpores(sporeEl: HTMLElement, reduced: boolean) {
  if (reduced || sporeEl.children.length > 0) return;
  for (let i = 0; i < 12; i++) {
    const spore = document.createElement("div");
    spore.style.cssText = `
      position: absolute;
      width: ${3 + Math.random() * 4}px;
      height: ${3 + Math.random() * 4}px;
      border-radius: 50%;
      background: rgba(184, 233, 134, 0.4);
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      animation: pm-float ${6 + Math.random() * 5}s ease-in-out -${Math.random() * 5}s infinite alternate;
    `;
    sporeEl.appendChild(spore);
  }
}

export default function PoultryScrollMotion() {
  useEffect(() => {
    /* ---- reduced motion check ---- */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- inject ambient CSS ---- */
    injectSporesCSS(reduced);

    /* ---- wait for first paint so all DOM is ready ---- */
    let rafId = 0;
    let cleanupFn: (() => void) | null = null;

    const init = () => {
      const page = document.querySelector<HTMLElement>("[data-poultry-page]");
      if (!page) return;

      /* ═══════════════════════════════════════════════════════════
         HERO  SETUP
      ═══════════════════════════════════════════════════════════ */
      const heroSection  = page.querySelector<HTMLElement>('[data-pm-section="hero"]');
      const heroBg       = page.querySelector<HTMLElement>("[data-pm-hero-bg]");
      const heroImg      = page.querySelector<HTMLElement>("[data-pm-hero-img]");
      const heroRayEl    = page.querySelector<HTMLElement>("[data-pm-hero-rays]");
      const heroSporeEl  = page.querySelector<HTMLElement>("[data-pm-hero-spores]");
      const heroText     = page.querySelector<HTMLElement>("[data-pm-hero-text]");
      const heroEyebrow  = page.querySelector<HTMLElement>("[data-pm-hero-eyebrow]");
      const heroHeadline = page.querySelector<HTMLElement>("[data-pm-hero-headline]");
      const heroSubline  = page.querySelector<HTMLElement>("[data-pm-hero-subline]");

      /* Ken Burns on inner image */
      if (heroImg && !reduced) {
        heroImg.style.animation = "pm-kenburns 22s ease-in-out infinite alternate";
        heroImg.style.transformOrigin = "center center";
      }

      /* Light rays */
      if (heroRayEl && heroSection) {
        createRays(heroRayEl, heroSection, reduced);
      }

      /* Spores */
      if (heroSporeEl) {
        createSpores(heroSporeEl, reduced);
      }

      /* Hero entrance animations handled by CSS br-ln now */

      /* ═══════════════════════════════════════════════════════════
         DATA STRIP  setup  (panel fold-down)
         START 1.02, LENGTH .3
         Cursor soft light needs its own mousemove handler.
      ═══════════════════════════════════════════════════════════ */
      const stripSection = page.querySelector<HTMLElement>('[data-pm-section="datastrip"]');
      const stripPanels  = Array.from(page.querySelectorAll<HTMLElement>("[data-pm-strip-panel]")).sort(
        (a, b) => Number(a.dataset.pmStripPanel) - Number(b.dataset.pmStripPanel)
      );
      stripPanels.forEach(p => {
        p.style.transformOrigin = "top center";
        p.style.willChange = "transform";
      });

      /* Cursor spotlight removed for solid dark table background */

      /* ═══════════════════════════════════════════════════════════
         HEADINGS  –  split and prepare
      ═══════════════════════════════════════════════════════════ */
      /* Rise: ThreeBirds main h2 */
      const riseEl = page.querySelector<HTMLElement>('[data-pm-heading="rise"]');
      let riseWords: HTMLElement[] = [];
      if (riseEl) {
        riseWords = splitWords(riseEl);
        riseWords.forEach(w => { w.style.opacity = "0"; });
      }

      /* Flip: Closing h2 */
      const flipEl = page.querySelector<HTMLElement>('[data-pm-heading="flip"]');
      let flipWords: HTMLElement[] = [];
      if (flipEl) {
        flipEl.style.perspective = "500px";
        flipWords = splitWords(flipEl);
        flipWords.forEach(w => {
          w.style.transformOrigin = "top center";
          w.style.opacity = "0";
        });
      }

      /* Lean: DataStrip editorial paragraph – get the text div */
      const leanEl = stripSection?.querySelector<HTMLElement>(`[style*="Times New Roman"]`) ??
                     stripSection?.querySelectorAll<HTMLElement>("div")[8] ?? null;
      // We'll animate the whole block as "lean"

      /* ═══════════════════════════════════════════════════════════
         SPECIES FRAMES  –  mark will-change
      ═══════════════════════════════════════════════════════════ */
      const speciesFrames = Array.from(page.querySelectorAll<HTMLElement>("[data-pm-species-frame]"));
      speciesFrames.forEach(f => {
        f.style.willChange = "transform";
        f.style.transformOrigin = "left center";
      });
      const speciesTexts = Array.from(page.querySelectorAll<HTMLElement>("[data-pm-species-text]"));
      speciesTexts.forEach(t => { t.style.willChange = "transform"; });

      /* ═══════════════════════════════════════════════════════════
         MINI CARDS  –  per section group
         Each [data-pm-mini-card] within a parent section is k-indexed.
      ═══════════════════════════════════════════════════════════ */
      const miniCards = Array.from(page.querySelectorAll<HTMLElement>("[data-pm-mini-card]"));
      miniCards.forEach(c => { c.style.willChange = "transform"; });

      /* ═══════════════════════════════════════════════════════════
         PROGRESS BARS & COUNT-UPS (BIO-REMEDIATION STANDARD)
      ═══════════════════════════════════════════════════════════ */
      const bars = Array.from(page.querySelectorAll<HTMLElement>("[data-pm-bar]"));
      bars.forEach(b => {
        (b as HTMLElement & { _pmBarTarget?: number })._pmBarTarget = parseFloat(b.dataset.pmBar ?? "1");
        b.style.width = "0%";
      });

      // data-cu Count-up initialization
      page.querySelectorAll("[data-cu]").forEach((el) => {
        if (el.hasAttribute("data-obs")) return;
        el.setAttribute("data-obs", "1");
        const text = el.textContent || "";
        new IntersectionObserver((entries, observer) => {
          if (!entries[0].isIntersecting) return;
          observer.disconnect();
          const t0 = performance.now();
          const animate = (now: number) => {
            const p = reduced ? 1 : Math.min(1, (now - t0) / 1500);
            const k = 1 - Math.pow(1 - p, 3);
            el.textContent = text.replace(/\d+(?:\.\d+)?/g, (n) => 
              n.includes('.') ? (Number(n) * k).toFixed(1) : Math.round(Number(n) * k).toString()
            );
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }, { threshold: 0.6 }).observe(el);
      });

      // br-rv Scroll Reveal generic integration
      const rvObserver = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("br-in");
            rvObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.18 });

      page.querySelectorAll(".br-rv, .br-callout, .br-ln, .br-quote").forEach((el) => {
        if (!el.classList.contains("br-in") && !el.hasAttribute("data-obs")) {
          el.setAttribute("data-obs", "1");
          const topOffset = el.getBoundingClientRect().top;
          if (topOffset < window.innerHeight - (reduced ? 0 : 50)) {
            setTimeout(() => el.classList.add("br-in"), 150);
          } else {
            rvObserver.observe(el);
          }
        }
      });

      /* ═══════════════════════════════════════════════════════════
         FOOTER  spotlight
      ═══════════════════════════════════════════════════════════ */
      const footerEl = page.querySelector<HTMLElement>('[data-pm-section="footer"]');
      let footerSpotlight: HTMLElement | null = null;
      if (footerEl) {
        footerSpotlight = document.createElement("div");
        footerSpotlight.style.cssText = `
          position:absolute;
          top:-200px;left:50%;
          transform:translateX(-50%) scale(.1);
          width:1000px;height:400px;
          background:radial-gradient(ellipse at center, rgba(140,198,63,.55) 0%, transparent 70%);
          pointer-events:none;
          z-index:0;
          will-change:transform;
          opacity:0;
        `;
        footerEl.style.position = "relative";
        footerEl.style.overflow = "hidden";
        const firstChild = footerEl.firstElementChild as HTMLElement;
        if (firstChild) firstChild.style.position = "relative";
        footerEl.insertBefore(footerSpotlight, footerEl.firstChild);
      }

      /* ═══════════════════════════════════════════════════════════
         FLOATING SPHERES  –  light-green sections
      ═══════════════════════════════════════════════════════════ */
      const sphereSections = [
        page.querySelector<HTMLElement>('[data-pm-section="threebirds"]'),
        page.querySelector<HTMLElement>('[data-pm-section="layers"]'),
        page.querySelector<HTMLElement>('[data-pm-section="broilers"]'),
      ].filter(Boolean) as HTMLElement[];

      const sphereData: { el: HTMLElement; speed: number; section: HTMLElement }[] = [];

      sphereSections.forEach(sec => {
        const speeds = [.12,-.22,.18,-.3,.08,-.15,.35].map((s, i) => (i % 2 === 0 ? s : -s));
        for (let i = 0; i < 7; i++) {
          const size = 70 + Math.random() * 230;
          const sphere = document.createElement("div");
          sphere.style.cssText = `
            position:absolute;
            width:${size}px;height:${size}px;
            border-radius:50%;
            background:radial-gradient(circle at 35% 35%, #b8f068, #4a9a3a);
            border:1px solid rgba(140,198,63,.3);
            left:${Math.random() * 90}%;
            top:${Math.random() * 80}%;
            pointer-events:none;
            z-index:0;
            opacity:.18;
            will-change:transform;
            ${reduced ? "" : `animation:pm-float ${7 + Math.random() * 4}s ease-in-out ${-(Math.random() * 6)}s infinite alternate;`}
          `;
          sec.style.position = "relative";
          sec.style.overflow = "hidden";
          sec.appendChild(sphere);
          sphereData.push({ el: sphere, speed: speeds[i], section: sec });
        }
      });

      /* ═══════════════════════════════════════════════════════════
         SMOOTHING STATE
      ═══════════════════════════════════════════════════════════ */
      // hero
      let heroBgP: number = reduced ? 1 : 0, heroBgC: number = heroBgP;
      let heroTxtP: number = reduced ? 1 : 0, heroTxtC: number = heroTxtP;

      // strip panels: current smoothed value per panel
      const stripCur: number[] = [0, 0, 0].map(() => (reduced ? 1 : 0));

      // heading rise words
      const riseCur: number[]  = riseWords.map(() => (reduced ? 1 : 0));
      // heading flip words
      const flipCur: number[]  = flipWords.map(() => (reduced ? 1 : 0));

      // species frames
      const frameCur: number[] = speciesFrames.map(() => (reduced ? 1 : 0));
      // species texts
      const textCur: number[]  = speciesTexts.map(() => (reduced ? 1 : 0));

      // mini cards
      const cardCur: number[]  = miniCards.map(() => (reduced ? 1 : 0));

      // progress bars
      const barCur: number[]   = bars.map(() => (reduced ? 1 : 0));

      // footer spotlight
      let footerCur: number = reduced ? 1 : 0;

      /* ═══════════════════════════════════════════════════════════
         REDUCED-MOTION: force everything visible immediately
      ═══════════════════════════════════════════════════════════ */
      if (reduced) {
        riseWords.forEach(w => { w.style.opacity = "1"; w.style.transform = "none"; });
        flipWords.forEach(w => { w.style.opacity = "1"; w.style.transform = "none"; });
        stripPanels.forEach(p => { p.style.opacity = "1"; p.style.transform = "none"; });
        speciesFrames.forEach(f => { f.style.opacity = "1"; f.style.transform = "none"; });
        speciesTexts.forEach(t => { t.style.opacity = "1"; t.style.transform = "none"; });
        miniCards.forEach(c => { c.style.opacity = "1"; c.style.transform = "none"; });
        bars.forEach(b => {
          b.style.width = `${((b as HTMLElement & { _pmBarTarget?: number })._pmBarTarget ?? 1) * 100}%`;
        });
        if (footerSpotlight) {
          footerSpotlight.style.transform = "translateX(-50%) scale(1)";
          footerSpotlight.style.opacity = "1";
        }
        return;
      }

      /* ─── smooth helper ─────────────────────────────────────── */
      function smooth(cur: number, tgt: number): number {
        const next = cur + (tgt - cur) * 0.34;
        return Math.abs(next - tgt) < 0.003 ? tgt : next;
      }

      /* ═══════════════════════════════════════════════════════════
         rAF LOOP
      ═══════════════════════════════════════════════════════════ */
      let lastScrollY = -1;
      const SNAP = 50; // px outside viewport threshold

      function tick() {
        rafId = requestAnimationFrame(tick);
        const vh   = window.innerHeight;
        const sy   = window.scrollY;
        const same = sy === lastScrollY;
        lastScrollY = sy;

        /* ─────────────────────────────────────────────────────────
           HERO parallax  (only while scrollY < 1.3 * vh)
        ───────────────────────────────────────────────────────── */
        if (heroBg && heroSection) {
          const heroR = heroSection.getBoundingClientRect();
          const inHeroZone = sy < 1.3 * vh && heroR.bottom > -SNAP;

          const bgTgt  = inHeroZone ? 1 : heroBgC;
          const txtTgt = inHeroZone ? 1 : heroTxtC;

          heroBgC  = smooth(heroBgC,  same ? heroBgC  : (inHeroZone ? sy / vh : heroBgC));
          heroTxtC = smooth(heroTxtC, same ? heroTxtC : (inHeroZone ? sy / vh : heroTxtC));

          if (inHeroZone || !same) {
            heroBg.style.transform = `none`;

            const txtY     = sy * 0.28;
            const txtScale = 1 + sy / 3500;
            const txtOp    = Math.max(0, 1 - sy / (0.85 * vh));
            if (heroText) {
              heroText.style.transform = `translateY(${txtY}px) scale(${txtScale})`;
              heroText.style.opacity   = String(txtOp);
            }
          }
          void bgTgt; void txtTgt; // suppress unused
        }

        /* ─────────────────────────────────────────────────────────
           DATA STRIP  panels  fold-down
           START 1.02, LENGTH .3
        ───────────────────────────────────────────────────────── */
        if (stripSection && stripPanels.length) {
          const pStrip = progress(stripSection, vh, 1.02, 0.3);
          stripPanels.forEach((panel, idx) => {
            const r = panel.getBoundingClientRect();
            if (r.bottom < -SNAP || r.top > vh + SNAP) return;

            const t   = eo(cl(pStrip * 1.9 - idx * 0.3));
            const tgt = t;
            stripCur[idx] = smooth(stripCur[idx], tgt);
            const c = stripCur[idx];

            const rotX = -95 + 95 * c;
            const op   = cl(t * 2);
            panel.style.transform = `perspective(700px) rotateX(${rotX}deg)`;
            panel.style.opacity   = String(op);
          });
        }

        /* ─────────────────────────────────────────────────────────
           HEADING: RISE (ThreeBirds h2)
           LENGTH .45
        ───────────────────────────────────────────────────────── */
        if (riseEl && riseWords.length) {
          const r = riseEl.getBoundingClientRect();
          if (r.bottom > -SNAP && r.top < vh + SNAP) {
            const p = progress(riseEl, vh, 0.98, 0.45);
            const N = riseWords.length;
            riseWords.forEach((word, i) => {
              const t   = eo(cl(p * 2.3 - i * 0.2));
              riseCur[i] = smooth(riseCur[i], t);
              const c = riseCur[i];
              word.style.transform = `translateY(${(1 - c) * 115}%)`;
              word.style.opacity   = String(c);
              void N;
            });
          }
        }

        /* ─────────────────────────────────────────────────────────
           HEADING: FLIP (Closing h2)
           LENGTH .45
        ───────────────────────────────────────────────────────── */
        if (flipEl && flipWords.length) {
          const r = flipEl.getBoundingClientRect();
          if (r.bottom > -SNAP && r.top < vh + SNAP) {
            const p = progress(flipEl, vh, 0.98, 0.45);
            flipWords.forEach((word, i) => {
              const t   = eo(cl(p * 2.3 - i * 0.2));
              flipCur[i] = smooth(flipCur[i], t);
              const c = flipCur[i];
              word.style.transform = `perspective(500px) rotateX(${(1 - c) * -90}deg)`;
              word.style.opacity   = String(t);
            });
          }
        }

        /* ─────────────────────────────────────────────────────────
           SPECIES FRAMES
        ───────────────────────────────────────────────────────── */
        speciesFrames.forEach((frame, i) => {
          const r = frame.getBoundingClientRect();
          if (r.bottom < -SNAP || r.top > vh + SNAP) return;

          const p   = progress(frame, vh, 0.98, 0.7);
          const e   = eo(cl(p * 1.3));
          const obt = ob(cl(p * 1.5));
          const op  = cl(p * 4);

          frameCur[i] = smooth(frameCur[i], e);
          const c = frameCur[i];

          if (i === 0) {
            /* book-cover open: rotateY -100 to 0, origin left */
            frame.style.transformOrigin = "left center";
            frame.style.transform = `perspective(1100px) rotateY(${(1 - c) * -100}deg)`;
            frame.style.opacity   = String(op);
          } else if (i === 1) {
            /* arc swing: translate + rotate + scale, easeOutBack */
            const o = ob(cl(p * 1.5));
            frame.style.transformOrigin = "left bottom";
            frame.style.transform = `
              translate(${(1 - o) * -280}px, ${(1 - o) * 170}px)
              rotate(${(1 - o) * -18}deg)
              scale(${0.65 + o * 0.35})
            `;
            frame.style.opacity = String(op);
            void obt;
          } else if (i === 2) {
            /* blob morph: rotate + scale + border-radius */
            frame.style.transformOrigin = "center center";
            frame.style.transform = `rotate(${(1 - c) * -20}deg) scale(${0.5 + c * 0.5})`;
            frame.style.borderRadius = `${(1 - c) * 50}%`;
            frame.style.opacity = String(op);
          }
        });

        /* ─────────────────────────────────────────────────────────
           SPECIES TEXTS
        ───────────────────────────────────────────────────────── */
        speciesTexts.forEach((txt, i) => {
          const r = txt.getBoundingClientRect();
          if (r.bottom < -SNAP || r.top > vh + SNAP) return;

          const p  = progress(txt, vh, 0.98, 0.55);
          const e  = eo(cl(p * 1.4 - 0.25));
          const op = cl(e * 1.6);

          textCur[i] = smooth(textCur[i], e);
          const c = textCur[i];

          if (i === 0) {
            /* translateX 90 + skewX -7 */
            txt.style.transform = `translateX(${(1 - c) * 90}px) skewX(${(1 - c) * -7}deg)`;
            txt.style.opacity   = String(op);
          } else if (i === 1) {
            /* rotateX from top */
            txt.style.transformOrigin = "top center";
            txt.style.transform = `perspective(900px) rotateX(${(1 - c) * -50}deg)`;
            txt.style.opacity   = String(op);
          } else if (i === 2) {
            /* translateY + scale */
            txt.style.transform = `translateY(${(1 - c) * 90}px) scale(${0.92 + c * 0.08})`;
            txt.style.opacity   = String(op);
          }
        });

        /* ─────────────────────────────────────────────────────────
           MINI CARDS  (per-section, k-indexed within their parent)
        ───────────────────────────────────────────────────────── */
        miniCards.forEach((card, globalIdx) => {
          const r = card.getBoundingClientRect();
          if (r.bottom < -SNAP || r.top > vh + SNAP) return;

          // find which section this card is in, get local index
          const parentSection = card.closest("section") ?? card.closest("footer");
          let k = globalIdx;
          if (parentSection) {
            const siblings = Array.from(parentSection.querySelectorAll("[data-pm-mini-card]"));
            k = siblings.indexOf(card);
          }
          const p   = progress(card.closest("section") ?? card, vh, 0.98, 0.45);
          const t   = cl(p * 1.5 - 0.55 - k * 0.15);
          const obT = ob(t);
          const op  = t;

          cardCur[globalIdx] = smooth(cardCur[globalIdx], obT);
          const c = cardCur[globalIdx];

          card.style.transform = `translateY(${(1 - c) * 40}px)`;
          card.style.opacity   = String(cl(op));
        });

        /* ─────────────────────────────────────────────────────────
           PROGRESS BARS
        ───────────────────────────────────────────────────────── */
        bars.forEach((bar, i) => {
          const r = bar.getBoundingClientRect();
          if (r.bottom < -SNAP || r.top > vh + SNAP) return;

          const section = bar.closest("section");
          const p  = section ? progress(section, vh, 0.98, 0.45) : progress(bar, vh);
          const pW = cl(p * 1.6 - 0.6);

          barCur[i] = smooth(barCur[i], pW);
          bar.style.width = `${((bar as HTMLElement & { _pmBarTarget?: number })._pmBarTarget ?? 1) * barCur[i] * 100}%`;
        });

        /* ─────────────────────────────────────────────────────────
           FLOATING SPHERES  parallax
        ───────────────────────────────────────────────────────── */
        sphereData.forEach(({ el, speed, section: sec }) => {
          const sr = sec.getBoundingClientRect();
          if (sr.bottom < -SNAP || sr.top > vh + SNAP) return;
          const sCenter = sr.top + sr.height / 2;
          const offset  = (sCenter - vh / 2) / vh;
          const ty = offset * speed * 1000;
          el.style.transform = `translateY(${ty}px)`;
        });

        /* ─────────────────────────────────────────────────────────
           FOOTER spotlight
           START 1, LENGTH .8
        ───────────────────────────────────────────────────────── */
        if (footerSpotlight && footerEl) {
          const p   = progress(footerEl, vh, 1, 0.8);
          const e   = eo(cl(p * 1));
          footerCur = smooth(footerCur, e);
          const c   = footerCur;
          footerSpotlight.style.transform = `translateX(-50%) scale(${0.1 + c * 0.9})`;
          footerSpotlight.style.opacity   = String(cl(p));
        }
      }

      rafId = requestAnimationFrame(tick);

      /* ═══════════════════════════════════════════════════════════
         CLEANUP
      ═══════════════════════════════════════════════════════════ */
      cleanupFn = () => {
        cancelAnimationFrame(rafId);
      };
    };

    /* Run init on next paint to ensure DOM from server components is ready */
    const raf0 = requestAnimationFrame(() => {
      const raf1 = requestAnimationFrame(init);
      return raf1;
    });

    return () => {
      cancelAnimationFrame(raf0);
      cancelAnimationFrame(rafId);
      if (cleanupFn) cleanupFn();
      document.getElementById("pm-spore-style")?.remove();
      document.getElementById("pm-cursor-light")?.remove();
    };
  }, []);

  return null;
}
