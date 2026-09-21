"use client";

import React, { useEffect, useRef } from "react";

const TOTAL_FRAMES = 150;

interface CanvasScrollHeroProps {
  children: React.ReactNode;
}

export default function CanvasScrollHero({ children }: CanvasScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const images: HTMLImageElement[] = [];

    const getFrameUrl = (index: number) => {
      const padded = String(index).padStart(4, "0");
      return `/frames/frame_${padded}.png`;
    };

    // Preload first frame immediately for instant first render
    const img1 = new Image();
    img1.src = getFrameUrl(1);
    img1.onload = () => {
      images[1] = img1;
      renderFrame(1);
    };

    // Preload remaining frames progressively
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (i === 1) continue;
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        images[i] = img;
      };
      images[i] = img;
    }
    imagesRef.current = images;

    // Render frame to canvas with retina DPR scaling & cover fill
    const renderFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const roundedIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(frameIndex))
      );
      
      // Fall back to nearest available frame if target frame is still loading
      let img = imagesRef.current[roundedIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // Find nearest loaded frame
        for (let offset = 1; offset <= TOTAL_FRAMES; offset++) {
          const prev = Math.max(1, roundedIndex - offset);
          const next = Math.min(TOTAL_FRAMES, roundedIndex + offset);
          if (imagesRef.current[prev]?.complete && imagesRef.current[prev]?.naturalWidth > 0) {
            img = imagesRef.current[prev];
            break;
          }
          if (imagesRef.current[next]?.complete && imagesRef.current[next]?.naturalWidth > 0) {
            img = imagesRef.current[next];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep luxury gold / dark tone background fill
      ctx.fillStyle = "#050403";
      ctx.fillRect(0, 0, width, height);

      // Draw image with object-fit: cover scaling
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawHeight = width / imgAspect;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    };

    // Calculate scroll progress (0..1) -> frame (1..150)
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / scrollableHeight));

      if (prefersReducedMotion) {
        targetFrameRef.current = 1;
      } else {
        targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
      }
    };

    // Smooth animation loop using LERP
    const loop = () => {
      const lerpFactor = 0.14; // Apple-level fluid easing
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * lerpFactor;
        renderFrame(currentFrameRef.current);
      } else if (currentFrameRef.current !== targetFrameRef.current) {
        currentFrameRef.current = targetFrameRef.current;
        renderFrame(currentFrameRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    handleScroll();
    loop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050403]">
      {/* Sticky Full-Screen Canvas Background */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-[#050403]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
        {/* Subtle dark luxury vignette overlay for seamless edge blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050403]/40 via-transparent to-[#050403]/60 pointer-events-none" />
      </div>

      {/* Sticky Overlay for Hero UI Content */}
      <div className="sticky top-0 -mt-[100vh] h-screen w-full z-10 pointer-events-none flex flex-col justify-between">
        <div className="w-full h-full pointer-events-auto flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}
