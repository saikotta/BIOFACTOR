"use client";

import React, { useEffect, useState } from "react";

interface GrowingBarsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function GrowingBars({ className = "", size = "md" }: GrowingBarsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation immediately upon load
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Proportions matching the 5 vertical pills from the Biofactor logo
  const heights = {
    sm: [24, 34, 46, 38, 30],
    md: [32, 44, 58, 48, 40],
    lg: [42, 58, 76, 62, 52],
  }[size];

  const barWidth = {
    sm: "w-2.5",
    md: "w-3.5",
    lg: "w-4.5",
  }[size];

  const gap = {
    sm: "gap-1.5",
    md: "gap-2",
    lg: "gap-2.5",
  }[size];

  return (
    <div
      className={`inline-flex items-end ${gap} ${className}`}
      aria-label="Biofactor growing bars biological icon"
    >
      {/* Bar 1 */}
      <div
        className={`${barWidth} rounded-full bg-[#6BBF3A] origin-bottom transition-transform duration-700 ease-out`}
        style={{
          height: `${heights[0]}px`,
          transform: mounted ? "scaleY(1)" : "scaleY(0)",
          transitionDelay: "100ms",
        }}
      />

      {/* Bar 2 */}
      <div
        className={`${barWidth} rounded-full bg-[#6BBF3A] origin-bottom transition-transform duration-700 ease-out`}
        style={{
          height: `${heights[1]}px`,
          transform: mounted ? "scaleY(1)" : "scaleY(0)",
          transitionDelay: "220ms",
        }}
      />

      {/* Bar 3 (Peak) */}
      <div
        className={`${barWidth} rounded-full bg-[#6BBF3A] origin-bottom transition-transform duration-700 ease-out`}
        style={{
          height: `${heights[2]}px`,
          transform: mounted ? "scaleY(1)" : "scaleY(0)",
          transitionDelay: "340ms",
        }}
      />

      {/* Bar 4 */}
      <div
        className={`${barWidth} rounded-full bg-[#6BBF3A] origin-bottom transition-transform duration-700 ease-out`}
        style={{
          height: `${heights[3]}px`,
          transform: mounted ? "scaleY(1)" : "scaleY(0)",
          transitionDelay: "460ms",
        }}
      />

      {/* Bar 5 (Split Pill matching official logo asset) */}
      <div
        className={`flex flex-col justify-between origin-bottom transition-transform duration-700 ease-out`}
        style={{
          height: `${heights[4]}px`,
          transform: mounted ? "scaleY(1)" : "scaleY(0)",
          transitionDelay: "580ms",
        }}
      >
        <span
          className={`${barWidth} rounded-full bg-[#6BBF3A]`}
          style={{ height: `${heights[4] * 0.44}px` }}
        />
        <span
          className={`${barWidth} rounded-full bg-[#6BBF3A]`}
          style={{ height: `${heights[4] * 0.44}px` }}
        />
      </div>
    </div>
  );
}
