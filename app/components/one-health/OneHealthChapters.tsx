"use client";

import React, { useEffect, useRef, useState } from "react";
import OneHealthChapterIcon from "./OneHealthChapterIcon";
import OneHealthChainBand from "./OneHealthChainBand";
import { useTranslation } from "@/app/i18n/useTranslation";

interface ChapterData {
  id: string;
  num: string;
  title: string;
  headline: string;
  paragraph: string;
  accent: string;
  iconPath: React.ReactNode;
}

const splitHeadlineIntoLines = (text: string): string[] => {
  const words = text.split(" ");
  if (words.length <= 3) return [text];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

export default function OneHealthChapters() {
  const { t } = useTranslation();

  const CHAPTERS: ChapterData[] = [
    {
      id: "soil",
      num: "01",
      title: t("one_health_chapter_soil_title") || "Soil",
      headline: t("one_health_chapter_soil_headline") || "Where It Starts",
      paragraph:
        t("one_health_chapter_soil_para") ||
        "Healthy soil is alive — full of microbes, minerals, and structure that let roots do their job. Everything else in this chain depends on getting soil right first.",
      accent: "#8B5E34",
      iconPath: (
        <>
          <path d="M3 17 Q6 12 9 17 T15 17 T21 17" />
          <path d="M3 20 Q6 15 9 20 T15 20 T21 20" />
        </>
      ),
    },
    {
      id: "plant",
      num: "02",
      title: t("one_health_chapter_plant_title") || "Plant",
      headline: t("one_health_chapter_plant_headline") || "The First Beneficiary",
      paragraph:
        t("one_health_chapter_plant_para") ||
        "A plant grown in healthy soil is stronger before it's ever sprayed, fed, or harvested. Plant health starts underground, long before it shows above it.",
      accent: "#3F7D4B",
      iconPath: (
        <>
          <path d="M12 21 V9" />
          <path d="M12 9 C9 9 7 6 7 3" />
          <path d="M12 12 C15 12 17 9 17 6" />
        </>
      ),
    },
    {
      id: "animal",
      num: "03",
      title: t("one_health_chapter_animal_title") || "Animal",
      headline: t("one_health_chapter_animal_headline") || "Sharing the Same Foundation",
      paragraph:
        t("one_health_chapter_animal_para") ||
        "Animals raised on healthy feed and healthy land carry that health forward — into growth, into resistance to disease, into what they eventually become.",
      accent: "#9A6B2E",
      iconPath: (
        <>
          <circle cx="12" cy="8" r="2" />
          <circle cx="7" cy="14" r="1.8" />
          <circle cx="17" cy="14" r="1.8" />
          <circle cx="12" cy="17" r="1.8" />
        </>
      ),
    },
    {
      id: "food",
      num: "04",
      title: t("one_health_chapter_food_title") || "Food",
      headline: t("one_health_chapter_food_headline") || "What All of This Becomes",
      paragraph:
        t("one_health_chapter_food_para") ||
        "Every meal traces back through this chain — soil, plant, and animal all show up on a plate, whether anyone thinks about it or not.",
      accent: "#B8482A",
      iconPath: (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </>
      ),
    },
    {
      id: "people",
      num: "05",
      title: t("one_health_chapter_people_title") || "People",
      headline: t("one_health_chapter_people_headline") || "The Point of All of It",
      paragraph:
        t("one_health_chapter_people_para") ||
        "Food quality isn't separate from soil quality. When the chain holds up from the start, it shows up in the people eating at the end of it.",
      accent: "#9B6B43",
      iconPath: (
        <>
          <circle cx="12" cy="7" r="3" />
          <path d="M6 21 C6 15 9 13 12 13 C15 13 18 15 18 21" />
        </>
      ),
    },
    {
      id: "planet",
      num: "06",
      title: t("one_health_chapter_planet_title") || "Planet",
      headline: t("one_health_chapter_planet_headline") || "What Holds the Whole Chain",
      paragraph:
        t("one_health_chapter_planet_para") ||
        "Every link here draws on the same land, water, and climate. A chain that only works for one link at a time isn't sustainable — it has to hold across all of them, or it doesn't really hold.",
      accent: "#2F8A9C",
      iconPath: (
        <>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="9" ry="4" />
          <line x1="3" y1="12" x2="21" y2="12" />
        </>
      ),
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Direct DOM Refs for 60fps Zero-Re-render Scroll Performance
  const progressBarRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);
  const [revealedPanels, setRevealedPanels] = useState<boolean[]>(
    new Array(CHAPTERS.length).fill(false)
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Passive rAF-Throttled Zero-State Scroll Handler
  useEffect(() => {
    let ticking = false;

    const updateScrollMetrics = () => {
      ticking = false;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // 1. Update Top Scroll Progress Bar
      const totalScrollable = rect.height - viewportHeight;
      if (totalScrollable > 0) {
        const currentScroll = Math.max(0, -rect.top);
        const progress = Math.min(100, (currentScroll / totalScrollable) * 100);

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress}%`;
        }
      }

      // 2. Show/Hide Dot Navigator via Ref Class Manipulation
      if (navContainerRef.current) {
        const show = rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.2;
        navContainerRef.current.style.opacity = show ? "1" : "0";
        navContainerRef.current.style.pointerEvents = show ? "auto" : "none";
        navContainerRef.current.style.transform = show
          ? "translate3d(0, -50%, 0)"
          : "translate3d(24px, -50%, 0)";
      }

      // 3. Parallax Blobs
      if (!prefersReducedMotion) {
        if (blob1Ref.current) {
          blob1Ref.current.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
        }
        if (blob2Ref.current) {
          blob2Ref.current.style.transform = `translate3d(0, ${-scrollY * 0.05}px, 0)`;
        }
        if (blob3Ref.current) {
          blob3Ref.current.style.transform = `translate3d(0, ${scrollY * 0.04}px, 0)`;
        }
      }

      // 4. Find Chapter Nearest to Viewport Center
      let closestIdx = 0;
      let minDistance = Infinity;

      panelRefs.current.forEach((panel, idx) => {
        if (!panel) return;
        const panelRect = panel.getBoundingClientRect();
        const panelCenter = panelRect.top + panelRect.height / 2;
        const distance = Math.abs(panelCenter - viewportHeight / 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      if (closestIdx !== activeIndexRef.current) {
        activeIndexRef.current = closestIdx;
        setActiveIndex(closestIdx);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollMetrics);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollMetrics();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  // IntersectionObserver for Panel Reveals
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const container = containerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll(".health-panel");

    panels.forEach((panel) => {
      const idxStr = panel.getAttribute("data-idx");
      if (idxStr === null) return;
      const idx = parseInt(idxStr, 10);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setRevealedPanels((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        },
        { threshold: [0.2] }
      );
      observer.observe(panel);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const activeChapter = CHAPTERS[activeIndex];

  const scrollToChapter = (idx: number) => {
    const panel = panelRefs.current[idx];
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#EDF4ED] text-[#173522] overflow-x-clip"
    >
      {/* Keyframe styles for gentle organic floating */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ohoFloatSlow {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(0.8deg); }
            }
            @keyframes ohoFloatSlowReverse {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(-0.8deg); }
            }
          `,
        }}
      />

      {/* 1. Static Radial Gradient Parallax Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          ref={blob1Ref}
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.08] transition-colors duration-1000 ease-out will-change-transform"
          style={{
            background: `radial-gradient(circle, ${activeChapter.accent} 0%, transparent 70%)`,
          }}
        />
        <div
          ref={blob2Ref}
          className="absolute top-1/3 -right-32 w-[540px] h-[540px] rounded-full opacity-[0.08] transition-colors duration-1000 ease-out will-change-transform"
          style={{
            background: `radial-gradient(circle, ${activeChapter.accent} 0%, transparent 70%)`,
          }}
        />
        <div
          ref={blob3Ref}
          className="absolute bottom-1/4 -left-24 w-[500px] h-[500px] rounded-full opacity-[0.08] transition-colors duration-1000 ease-out will-change-transform"
          style={{
            background: `radial-gradient(circle, ${activeChapter.accent} 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* 2. Fixed Top Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[2px] z-50 transition-colors duration-300 pointer-events-none"
        style={{
          width: "0%",
          backgroundColor: activeChapter.accent,
        }}
      />

      {/* 3. Fixed Page Radial Ambient Glow Layer */}
      <div
        ref={ambientGlowRef}
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at 75% 50%, ${activeChapter.accent}20 0%, rgba(237,244,237,0) 70%)`,
        }}
      />

      {/* 4. Fixed Vertical Dot Navigator on Right Side (As requested: "keep the second ss") */}
      <div
        ref={navContainerRef}
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-[14px] transition-all duration-500 opacity-0 pointer-events-none"
      >
        {CHAPTERS.map((ch, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(idx)}
              aria-label={`Scroll to chapter ${ch.num} - ${ch.title}`}
              className="group relative p-1.5 focus:outline-none pointer-events-auto"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-[9px] h-[9px] scale-[1.4]"
                    : "w-[7px] h-[7px] bg-[#173522]/25 group-hover:bg-[#173522]/60"
                }`}
                style={{
                  backgroundColor: isActive ? ch.accent : undefined,
                  boxShadow: isActive ? `0 0 10px ${ch.accent}80` : undefined,
                }}
              />
              <span
                className={`absolute right-7 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider uppercase whitespace-nowrap transition-all duration-300 pointer-events-none ${
                  isActive
                    ? "opacity-100 font-bold translate-x-0"
                    : "opacity-0 group-hover:opacity-100 translate-x-1"
                }`}
                style={{
                  color: isActive ? ch.accent : "#173522",
                }}
              >
                {ch.num} {ch.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 5. Main Content: 6 Alternating Chapters (Comfortable spacing, no large empty gaps) */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
        {CHAPTERS.map((ch, idx) => {
          const isRevealed = revealedPanels[idx];
          const headlineLines = splitHeadlineIntoLines(ch.headline);
          // 01 Soil (idx=0, even)   -> Text LEFT  (order-1), Image RIGHT (order-2)
          // 02 Plant (idx=1, odd)   -> Image LEFT (order-1), Text RIGHT (order-2)
          // 03 Animal (idx=2, even) -> Text LEFT  (order-1), Image RIGHT (order-2)
          // 04 Food (idx=3, odd)    -> Image LEFT (order-1), Text RIGHT (order-2)
          // 05 People (idx=4, even) -> Text LEFT  (order-1), Image RIGHT (order-2)
          // 06 Planet (idx=5, odd)  -> Image LEFT (order-1), Text RIGHT (order-2)
          const isEven = idx % 2 === 0;

          return (
            <div
              key={ch.id}
              data-idx={idx}
              ref={(el) => {
                panelRefs.current[idx] = el;
              }}
              className="health-panel flex items-center justify-center py-6 sm:py-8 lg:py-10 relative"
            >
              {/* 2-Column Grid Row for Each Chapter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center w-full relative">
                
                {/* TEXT COLUMN */}
                <div
                  className={`${
                    isEven ? "md:order-1" : "md:order-2"
                  } relative flex flex-col items-start text-left transition-all duration-1000 ease-out z-10 ${
                    isRevealed || prefersReducedMotion
                      ? "opacity-100 translate-y-0"
                      : "opacity-15 translate-y-[28px]"
                  }`}
                >
                  {/* Outlined Huge Ghost Number behind the text block */}
                  <div
                    className="absolute left-0 -bottom-8 -z-10 font-serif font-bold text-[clamp(120px,18vw,230px)] leading-none select-none pointer-events-none transition-colors duration-700"
                    style={{
                      WebkitTextStroke: `1.5px ${ch.accent}1F`,
                      color: "transparent",
                    }}
                  >
                    {ch.num}
                  </div>

                  {/* Badge (48px) & Mono Label Header (Clean start without duplicate corner bullet) */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-full border border-current flex items-center justify-center shrink-0 transition-colors duration-500 bg-white/40 shadow-sm"
                      style={{ color: ch.accent }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 fill-none stroke-current"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {ch.iconPath}
                      </svg>
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#173522]/60 font-semibold">
                      {ch.num} — {ch.title}
                    </span>
                  </div>

                  {/* Chapter H2 Title with Masked Line-by-Line Reveal */}
                  <h2 className="relative z-10 font-serif font-bold text-[clamp(34px,4.4vw,58px)] leading-[1.05] max-w-[460px] text-[#173522] mt-4 flex flex-col items-start">
                    {headlineLines.map((lineText, lineIdx) => (
                      <span key={lineIdx} className="overflow-hidden inline-block w-full py-0.5">
                        <span
                          className="block transition-transform duration-800 ease-out"
                          style={{
                            transform:
                              isRevealed || prefersReducedMotion
                                ? "translateY(0)"
                                : "translateY(100%)",
                            transitionDuration: "800ms",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            transitionDelay: prefersReducedMotion ? "0ms" : `${lineIdx * 90}ms`,
                          }}
                        >
                          {lineText}
                        </span>
                      </span>
                    ))}
                  </h2>

                  {/* Chapter Paragraph Description */}
                  <p className="relative z-10 text-[15.5px] sm:text-[16.5px] max-w-[28em] text-[#173522]/86 leading-relaxed mt-4 font-sans font-normal">
                    {ch.paragraph}
                  </p>

                  {/* Thin Accent Rule */}
                  <div
                    className="relative z-10 h-[2px] mt-6 transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: isRevealed ? "110px" : "30px",
                      backgroundColor: ch.accent,
                    }}
                  />
                </div>

                {/* IMAGE / ILLUSTRATION COLUMN (With Dynamic Alternating Entrance & Float Animations) */}
                <div
                  className={`${
                    isEven ? "md:order-2" : "md:order-1"
                  } flex items-center justify-center py-4 lg:py-0 transition-all duration-1000 ease-out ${
                    isRevealed || prefersReducedMotion
                      ? "opacity-100 translate-x-0 scale-100 rotate-0"
                      : isEven
                      ? "opacity-0 translate-x-14 scale-90 rotate-3"
                      : "opacity-0 -translate-x-14 scale-90 -rotate-3"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div
                    className="w-[min(44vw,500px)] aspect-square flex items-center justify-center relative transition-transform duration-700 hover:scale-[1.04]"
                    style={{
                      animation:
                        isRevealed && !prefersReducedMotion
                          ? isEven
                            ? "ohoFloatSlow 7s ease-in-out infinite"
                            : "ohoFloatSlowReverse 7s ease-in-out infinite"
                          : "none",
                    }}
                  >
                    <OneHealthChapterIcon
                      activeChapterId={ch.id}
                      accentColor={ch.accent}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Chain Band Marquee */}
      <OneHealthChainBand />

      {/* 7. Smooth 120px Transition Gradient from #EDF4ED to #EDE9DA */}
      <div className="w-full h-[120px] bg-gradient-to-b from-[#EDF4ED] to-[#EDE9DA] pointer-events-none -mb-1" />
    </div>
  );
}
