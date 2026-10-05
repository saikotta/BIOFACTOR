"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   ResourcesAnimations
   One client component that wires up every animation for the
   Scientific Resource Hub. Import it once at the top of the page
   and render it as <ResourcesAnimations />.

   Handles:
   1.  Scroll progress bar
   2.  Hero IntersectionObserver (replay on re-enter / reset on leave)
   3.  Section-header IntersectionObserver (replay)
   4.  Card IntersectionObserver — entrance, "live" class after 2s,
       3D tilt, cursor glow overlay, image hover parallax, streak
   5.  Tag stagger delays (applied once)
   6.  Card text-body child stagger delays (applied once)
   7.  Download count-up (reruns each time card re-enters)
   8.  FLIP filter transition on chip click
   9.  All listeners cleaned up on unmount
────────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* quartic ease-out  t → 1-(1-t)^4 */
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function formatCount(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/* Animate a number from 0 to target over `duration` ms */
function countUp(
  el: HTMLElement,
  target: number,
  duration: number,
  suffix: string
): () => void {
  let start: number | null = null;
  let raf = 0;

  function step(ts: number) {
    if (start === null) start = ts;
    const elapsed = ts - start;
    const t = Math.min(elapsed / duration, 1);
    el.textContent = formatCount(target * easeOutQuart(t)) + suffix;
    if (t < 1) raf = requestAnimationFrame(step);
  }

  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

export default function ResourcesAnimations() {
  const cleanupRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    /* Respect reduced-motion — do nothing, CSS handles final state */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fns = cleanupRef.current;

    /* ── helpers ─────────────────────────────────────────────── */
    function on<K extends keyof HTMLElementEventMap>(
      el: Element,
      type: K,
      handler: (e: HTMLElementEventMap[K]) => void,
      opts?: AddEventListenerOptions
    ) {
      el.addEventListener(type as string, handler as EventListener, opts);
      fns.push(() =>
        el.removeEventListener(type as string, handler as EventListener, opts)
      );
    }

    /* ── 1. SCROLL PROGRESS BAR ─────────────────────────────── */
    const bar = document.querySelector<HTMLElement>(".rh-scroll-bar");
    if (bar) {
      function updateBar() {
        const doc = document.documentElement;
        const scrolled = doc.scrollTop;
        const total = doc.scrollHeight - doc.clientHeight;
        bar!.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
      }
      window.addEventListener("scroll", updateBar, { passive: true });
      fns.push(() => window.removeEventListener("scroll", updateBar));
      updateBar();
    }

    /* ── 2. HERO — fade in subtitle/search/cue on scroll ───── */
    const heroSub = document.querySelector<HTMLElement>("[data-hero-sub]");
    const heroSearch = document.querySelector<HTMLElement>("[data-hero-search]");
    const heroCue = document.querySelector<HTMLElement>("[data-hero-cue]");

    function heroIn() {
      heroSub?.classList.add("in");
      heroSearch?.classList.add("in");
      heroCue?.classList.add("in");
    }
    function heroOut() {
      heroSub?.classList.remove("in");
      heroSearch?.classList.remove("in");
      heroCue?.classList.remove("in");
    }

    const heroSection = document.querySelector<HTMLElement>("[data-hero-bg]")?.closest("section");
    if (heroSection) {
      const heroObs = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e.isIntersecting) heroOut();
          else if (e.intersectionRatio >= 0.15) heroIn();
        },
        { threshold: [0, 0.15], rootMargin: "0px 0px -6% 0px" }
      );
      heroObs.observe(heroSection);
      fns.push(() => heroObs.disconnect());
    }

    /* ── 3. SECTION HEADERS ─────────────────────────────────── */
    const observedHeads = new WeakSet<HTMLElement>();

    function setupSectionHead(head: HTMLElement) {
      if (observedHeads.has(head)) return;
      observedHeads.add(head);
      const obs = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e.isIntersecting) {
            head.classList.remove("in");
          } else if (e.intersectionRatio >= 0.15) {
            head.classList.add("in");
          }
        },
        { threshold: [0, 0.15], rootMargin: "0px 0px -6% 0px" }
      );
      obs.observe(head);
      fns.push(() => obs.disconnect());
    }

    document.querySelectorAll<HTMLElement>("[data-section-head]").forEach(setupSectionHead);

    /* Watch for new section headers (when sections expand/collapse) */
    const headMutationObs = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.dataset && "sectionHead" in node.dataset) setupSectionHead(node);
          node.querySelectorAll<HTMLElement>("[data-section-head]").forEach(setupSectionHead);
        });
      });
    });
    const mainForHeads = document.querySelector("main");
    if (mainForHeads) {
      headMutationObs.observe(mainForHeads, { childList: true, subtree: true });
      fns.push(() => headMutationObs.disconnect());
    }

    /* ── 4–10. CARDS ────────────────────────────────────────── */

    /* Track live timers so we can cancel on leave */
    const liveTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
    /* Track count-up cancel fns */
    const countCancels = new WeakMap<HTMLElement, () => void>();
    /* Track which cards we've already set up (avoid double-setup on MutationObserver) */
    const observedCards = new WeakSet<HTMLElement>();

    function setupCard(card: HTMLElement) {
      if (observedCards.has(card)) return;
      observedCards.add(card);

      /* ── stagger delays (set once) ── */
      const staggerIndex = parseInt(card.dataset.staggerIndex ?? "0", 10);
      const staggerDelay = staggerIndex * 90; /* ms */

      /* Card entrance delay */
      card.style.transitionDelay = `${staggerDelay}ms`;

      /* Image reveal delay = stagger + 150ms */
      const imgEl = card.querySelector<HTMLElement>("[data-card-img] img");
      if (imgEl) {
        imgEl.style.transitionDelay = `${staggerDelay + 150}ms`;
      }

      /* Tag delays — horizontal slide */
      const tags = card.querySelectorAll<HTMLElement>("[data-tag]");
      tags.forEach((tag, ti) => {
        const tagDelay = staggerDelay + (ti === 0 ? 600 : 720);
        tag.style.transitionDelay = `${tagDelay}ms`;
      });

      /* Text body child delays */
      const bodyChildren = card.querySelectorAll<HTMLElement>("[data-body] > *");
      const bodyDelays = [
        staggerDelay + 500,
        staggerDelay + 620,
        staggerDelay + 740,
        staggerDelay + 860,
      ];
      bodyChildren.forEach((child, ci) => {
        if (bodyDelays[ci] !== undefined) {
          child.style.transitionDelay = `${bodyDelays[ci]}ms`;
        }
      });

      /* ── inject light streak into card image ── */
      const cardImgWrap = card.querySelector<HTMLElement>("[data-card-img]");
      if (cardImgWrap && !cardImgWrap.querySelector(".rh-streak")) {
        const streak = document.createElement("div");
        streak.className = "rh-streak";
        cardImgWrap.appendChild(streak);
      }

      /* ── IntersectionObserver for this card ── */
      const cardObs = new IntersectionObserver(
        (entries) => {
          const e = entries[0];

          if (!e.isIntersecting) {
            /* fully left — reset */
            card.classList.remove("in", "live");
            const t = liveTimers.get(card);
            if (t) { clearTimeout(t); liveTimers.delete(card); }
            const cc = countCancels.get(card);
            if (cc) { cc(); countCancels.delete(card); }
            return;
          }

          if (e.intersectionRatio >= 0.15) {
            card.classList.add("in");

            if (!card.classList.contains("live") && !liveTimers.has(card)) {
              const t = setTimeout(() => {
                card.classList.add("live");
                liveTimers.delete(card);
              }, staggerDelay + 2000);
              liveTimers.set(card, t);
            }

            const countEl = card.querySelector<HTMLElement>("[data-count]");
            if (countEl) {
              const target = parseInt(countEl.dataset.countTarget ?? "0", 10);
              const prev = countCancels.get(card);
              if (prev) prev();
              const cancel = countUp(countEl, target, 1600, " downloads");
              countCancels.set(card, cancel);
            }
          }
        },
        { threshold: [0, 0.15], rootMargin: "0px 0px -6% 0px" }
      );

      cardObs.observe(card);
      fns.push(() => cardObs.disconnect());

      /* ── hover shadow only, no tilt — mousemove ── */
      on(card, "mousemove", (_e: MouseEvent) => {
        /* intentionally empty — tilt and parallax disabled */
      });

      on(card, "mouseleave", () => {
        /* reset any inline transform that might linger */
        card.style.transform = "";
        const img = card.querySelector<HTMLElement>("[data-card-img] img");
        if (img) {
          img.style.transform = "";
          img.style.transition = "";
        }
      });
    }

    /* Set up all cards currently in the DOM */
    document.querySelectorAll<HTMLElement>("[data-card]").forEach(setupCard);

    /* Watch for new cards added by React re-renders (filter changes) */
    const cardMutationObs = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          /* The added node itself might be a card */
          if (node.dataset && "card" in node.dataset) {
            setupCard(node);
          }
          /* Or it might contain cards (e.g. a grid wrapper was added) */
          node.querySelectorAll<HTMLElement>("[data-card]").forEach(setupCard);
        });
      });
    });

    const mainEl = document.querySelector("main");
    if (mainEl) {
      cardMutationObs.observe(mainEl, { childList: true, subtree: true });
      fns.push(() => cardMutationObs.disconnect());
    }

    /* ── 8. FLIP FILTER TRANSITION ───────────────────────────── */
    /*
      Listen for clicks on [data-chip] buttons. When clicked:
      a) Snapshot positions of all [data-card] elements (FIRST)
      b) Fade+scale them all out over 350ms
      c) After 350ms, dispatch a custom "rh-do-filter" event so the
         React state update can fire, then after React re-renders
         read NEW positions (LAST) and animate from old → new.
    */
    const chips = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chip]")
    );

    chips.forEach((chip) => {
      on(chip, "click", () => {
        const allCards = Array.from(
          document.querySelectorAll<HTMLElement>("[data-card]")
        );

        /* FIRST — record current bounding rects */
        const firsts = new Map<HTMLElement, DOMRect>();
        allCards.forEach((c) => firsts.set(c, c.getBoundingClientRect()));

        /* Phase (a): fade out all cards */
        allCards.forEach((c) => {
          c.style.transition = "opacity 0.35s ease, transform 0.35s ease";
          c.style.opacity = "0";
          c.style.transform = "scale(0.9)";
        });

        /* Phase (b): after 350ms, let React re-render then FLIP */
        setTimeout(() => {
          /* React state change is triggered by the chip's onClick
             which React has already registered; our CSS fade-out
             runs in parallel. After 350ms React will have re-rendered.
             We read NEW rects and play FLIP. */
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const newCards = Array.from(
                document.querySelectorAll<HTMLElement>("[data-card]")
              );

              newCards.forEach((c, i) => {
                const last = c.getBoundingClientRect();
                const first = firsts.get(c);

                if (first) {
                  const dx = first.left - last.left;
                  const dy = first.top - last.top;
                  /* Jump to old position instantly */
                  c.style.transition = "none";
                  c.style.transform = `translate(${dx}px, ${dy}px) scale(0.9)`;
                  c.style.opacity = "0";
                }

                /* Animate to final (LAST) position */
                const delay = i * 40;
                requestAnimationFrame(() => {
                  c.style.transition = `opacity 0.7s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`;
                  c.style.transform = "translate(0px, 0px) scale(1)";
                  c.style.opacity = "1";
                });
              });
            });
          });
        }, 350);
      });
    });

    /* ── Cleanup on unmount ─────────────────────────────────── */
    return () => {
      fns.forEach((fn) => fn());
      fns.length = 0;
    };
  }, []);

  /* Renders only the fixed scroll-progress bar element */
  return <div className="rh-scroll-bar" aria-hidden="true" />;
}
