"use client";

/**
 * PoultryScrollMotion
 *
 * A self-contained scroll-scrubbed motion system for the Poultry page.
 * Pure vanilla JS/DOM manipulation — no libraries, no CSS transitions for
 * the animated properties. Runs a single rAF loop; all effects are driven
 * by scroll position only (scrubbed forward on scroll-down, backward on
 * scroll-up). Continuous ambient loops (Ken Burns, spores, light-rays) are
 * CSS animations injected once at mount.
 *
 * Rules honoured from the spec:
 *  - progress p = clamp((vh*START - el.top) / (vh*LENGTH))
 *  - default START 0.98, LENGTH 0.45
 *  - smoothing: cur += (tgt - cur) * 0.34; snap < 0.003
 *  - easeOutCubic  eo(t) = 1 - (1-t)^3
 *  - easeOutBack   ob(t) = 1 + 2.7(t-1)^3 + 1.7(t-1)^2
 *  - animate only transform / opacity (+ border-radius, clip-path)
 *  - will-change: transform on moving elements
 *  - passive scroll listener
 *  - skip parallax when el > 50px outside viewport
 *  - prefers-reduced-motion: force p=1 everywhere, disable CSS loops
 *  - no blur, no preloader, no progress bar, no custom cursor
 */

import { useEffect } from "react";

/* ─── easings ──────────────────────────────────────────────────────────── */
const cl = (t: number) => Math.max(0, Math.min(1, t));
const eo = (t: number) => { const c = cl(t); return 1 - (1 - c) ** 3; };
const ob = (t: number) => {
  const c = cl(t);
  return 1 + 2.7 * (c - 1) ** 3 + 1.7 * (c - 1) ** 2;
};

/* ─── progress helper ───────────────────────────────────────────────────── */
function progress(el: Element, vh: number, START = 0.98, LENGTH = 0.45): number {
  const r = el.getBoundingClientRect();
  if (r.bottom <= vh + 2) return 1;
  return cl((vh * START - r.top) / (vh * LENGTH));
}

/* ─── word / letter splitter helpers ────────────────────────────────────── */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.innerText;
  el.innerHTML = "";
  return text.split(/\s+/).filter(Boolean).map((word, i) => {
    const mask = document.createElement("span");
    mask.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;";
    const inner = document.createElement("span");
    inner.style.cssText = "display:inline-block;will-change:transform;";
    inner.textContent = word;
    inner.dataset.pmWordIdx = String(i);
    if (i > 0) mask.style.marginLeft = "0.25em";
    mask.appendChild(inner);
    el.appendChild(mask);
    return inner;
  });
}

function splitLetters(el: HTMLElement): HTMLElement[] {
  const text = el.innerText;
  el.innerHTML = "";
  const letters: HTMLElement[] = [];
  [...text].forEach((ch, i) => {
    if (ch === " ") {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    const span = document.createElement("span");
    span.style.cssText = "display:inline-block;will-change:transform;";
    span.textContent = ch;
    span.dataset.pmLetterIdx = String(i);
    el.appendChild(span);
    letters.push(span);
  });
  return letters;
}

/* ─── spore CSS injection ───────────────────────────────────────────────── */
function injectSporesCSS(reduced: boolean) {
  if (reduced) return;
  const style = document.createElement("style");
  style.id = "pm-spore-style";
  style.textContent = `
@keyframes pm-spore-rise {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  10%  { opacity: 0.85; }
  80%  { opacity: 0.5; }
  100% { transform: translateY(-80vh) translateX(var(--pm-spore-drift)); opacity: 0; }
}
@keyframes pm-ray-move {
  from { background-position: 0 0; }
  to   { background-position: 300px 0; }
}
@keyframes pm-kenburns {
  from { transform: scale(1.02) translateX(-2%); }
  to   { transform: scale(1.16) translateX(2%); }
}
@keyframes pm-float {
  from { transform: translate(0, 0); }
  to   { transform: translate(24px, -30px); }
}
  `;
  document.head.appendChild(style);
}

/* ─── Spore factory ─────────────────────────────────────────────────────── */
function createSpores(container: HTMLElement, reduced: boolean) {
  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement("div");
    const size = 3 + Math.random() * 7;
    const left = 5 + Math.random() * 90;
    const drift = -80 + Math.random() * 160;
    const dur = 7 + Math.random() * 9;
    const delay = -(Math.random() * 12);
    el.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(170,220,80,.6);
      box-shadow:0 0 14px 4px rgba(170,220,80,.45);
      left:${left}%;
      bottom:5%;
      pointer-events:none;
      z-index:3;
      --pm-spore-drift:${drift}px;
      ${reduced
        ? "opacity:0;"
        : `animation:pm-spore-rise ${dur}s linear ${delay}s infinite;`}
    `;
    container.appendChild(el);
  }
}

/* ─── Light-rays factory ────────────────────────────────────────────────── */
function createRays(container: HTMLElement, hero: Element, reduced: boolean) {
  const heroH = (hero as HTMLElement).offsetHeight || window.innerHeight;
  container.style.cssText = `
    position:absolute;
    inset:0;
    pointer-events:none;
    z-index:2;
    background: repeating-linear-gradient(
      105deg,
      transparent 0px, transparent 90px,
      rgba(255,240,180,.07) 90px, rgba(255,240,180,.07) 150px
    );
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%);
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%);
    ${reduced
      ? ""
      : `animation: pm-ray-move 16s linear infinite;`}
  `;
  void heroH; // suppress unused
}



/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */
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
        b._pmBarTarget = parseFloat(b.dataset.pmBar ?? "1");
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

      // br-rv & rv Scroll Reveal generic bidirectional integration
      const rvObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            target.classList.add("br-in", "in", "visible");
          } else if (entry.intersectionRatio < 0.05) {
            target.classList.remove("br-in", "in", "visible");
          }
        });
      }, { threshold: [0, 0.1], rootMargin: "30px 0px 30px 0px" });

      page.querySelectorAll(".br-rv, .rv, .br-callout, .call, .br-ln, .ln, .br-quote, .quote, .br-ph, .ph, .br-mx-wrap, .mx").forEach((el) => {
        rvObserver.observe(el);
      });

      /* ═══════════════════════════════════════════════════════════
         FOOTER  (Standard solid dark footer)
      ═══════════════════════════════════════════════════════════ */

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
          b.style.width = `${(b._pmBarTarget ?? 1) * 100}%`;
        });
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
          bar.style.width = `${(bar._pmBarTarget ?? 1) * barCur[i] * 100}%`;
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

/* ─── Augment HTMLElement for the bar target ────────────────────────────── */
declare global {
  interface HTMLElement {
    _pmBarTarget?: number;
  }
}
