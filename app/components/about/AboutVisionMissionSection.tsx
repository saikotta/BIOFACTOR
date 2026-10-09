"use client";

import React, { useEffect, useState, useRef } from "react";

export default function AboutVisionMissionSection() {
  const [iframeHeight, setIframeHeight] = useState("680px");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 820) {
          setIframeHeight("1150px");
        } else {
          setIframeHeight("680px");
        }
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#e6fbc9] overflow-hidden">
      <iframe
        src="/vision-mission-chain.html"
        title="Vision & Mission Chain"
        className="w-full border-none block"
        style={{ height: iframeHeight }}
      />
    </section>
  );
}
