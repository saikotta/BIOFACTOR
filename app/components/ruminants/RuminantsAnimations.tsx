"use client";

import { useEffect, useRef, useState } from "react";

export default function RuminantsAnimations() {
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Show everything immediately
      document.body.style.setProperty("--motion-disabled", "1");
      return;
    }

    // CSS-based scroll progress
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    // IntersectionObserver for scroll reveals
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px 200px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add("animate-in");
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe all elements with data-motion
    const animatedElements = document.querySelectorAll("[data-motion]");
    animatedElements.forEach((el) => observer.observe(el));

    // Observe stage blocks
    const stageBlocks = document.querySelectorAll("[data-ruminants-section]");
    stageBlocks.forEach((el) => observer.observe(el));

    // Handle scroll for progress and bacteria pause
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();

          // Pause bacteria during scroll
          isScrollingRef.current = true;
          const bacteria = document.querySelectorAll(".bacteria-capsule");
          bacteria.forEach((b) => {
            (b as HTMLElement).style.animationPlayState = "paused";
          });

          // Clear previous timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Resume after scroll stops
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
            bacteria.forEach((b) => {
              (b as HTMLElement).style.animationPlayState = "running";
            });
          }, 150);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress();

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      document.body.style.removeProperty("--motion-disabled");
    };
  }, [isClient]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        ref={scrollProgressRef}
        className="fixed top-0 left-0 w-full h-[4px] bg-[#8BC53F] z-[100] origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </>
  );
}
