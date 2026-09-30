"use client";

import React, { useEffect, useRef, useState } from "react";

interface PulseLineDividerProps {
  className?: string;
  centerText?: string;
}

export default function PulseLineDivider({ className = "", centerText }: PulseLineDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -50px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full py-8 md:py-12 flex items-center justify-center overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div className="w-full max-w-[1280px] px-6 sm:px-10 flex items-center gap-4">
        {/* Left Pulse SVG */}
        <div className="flex-1 overflow-hidden h-[36px] flex items-center">
          <svg
            viewBox="0 0 500 40"
            preserveAspectRatio="none"
            className="w-full h-[36px]"
          >
            <path
              d="M 0 20 L 180 20 L 195 20 L 202 6 L 210 34 L 218 2 L 226 26 L 232 20 L 245 20 L 500 20"
              fill="none"
              stroke="#6BBF3A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 600,
                strokeDashoffset: isVisible ? 0 : 600,
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </svg>
        </div>

        {/* Optional Center Badge or Accent */}
        {centerText ? (
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] md:text-xs uppercase tracking-widest text-[#B8893A] px-3 py-1 bg-white border border-[#B8893A]/30 rounded-full font-semibold shadow-xs whitespace-nowrap">
            {centerText}
          </span>
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-[#6BBF3A] shrink-0 shadow-xs" />
        )}

        {/* Right Pulse SVG */}
        <div className="flex-1 overflow-hidden h-[36px] flex items-center">
          <svg
            viewBox="0 0 500 40"
            preserveAspectRatio="none"
            className="w-full h-[36px]"
          >
            <path
              d="M 0 20 L 255 20 L 268 20 L 274 26 L 282 2 L 290 34 L 298 6 L 305 20 L 320 20 L 500 20"
              fill="none"
              stroke="#6BBF3A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 600,
                strokeDashoffset: isVisible ? 0 : 600,
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
