"use client";

import React, { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;

interface BiofactorScrollHeroProps {
  children: React.ReactNode;
}

export default function BiofactorScrollHero({ children }: BiofactorScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const getFrameUrl = (index: number) => {
      const padded = String(index + 1).padStart(4, "0");
      return `/frames/frame_${padded}.webp`;
    };

    // Canvas render helper with cover-style sizing & retina DPR scaling (capped at 2)
    const renderFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const roundedIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(frameIndex))
      );

      // Find best available loaded frame if target frame is still decoding/loading
      let img = imagesRef.current[roundedIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = roundedIndex - offset;
          const next = roundedIndex + offset;
          if (
            prev >= 0 &&
            imagesRef.current[prev]?.complete &&
            imagesRef.current[prev]?.naturalWidth > 0
          ) {
            img = imagesRef.current[prev];
            break;
          }
          if (
            next < TOTAL_FRAMES &&
            imagesRef.current[next]?.complete &&
            imagesRef.current[next]?.naturalWidth > 0
          ) {
            img = imagesRef.current[next];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Cap DPR at 2 to avoid unnecessary canvas workload on high-DPI screens
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = window.innerWidth;
      const height = window.innerHeight;

      const targetCanvasWidth = Math.floor(width * dpr);
      const targetCanvasHeight = Math.floor(height * dpr);

      if (
        canvas.width !== targetCanvasWidth ||
        canvas.height !== targetCanvasHeight
      ) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep dark base fill
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Draw image object-fit: cover scaling
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

    // Preload all 240 frame images as early as possible without creating objects during scroll
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
      images[i] = img;
    }
    imagesRef.current = images;

    // Draw initial frame (index 0) as soon as ready
    const firstImg = images[0];
    const drawFirstFrame = () => {
      renderFrame(0);
      lastRenderedFrameRef.current = 0;
    };
    if (firstImg) {
      if (firstImg.complete) {
        drawFirstFrame();
      } else {
        firstImg.onload = () => {
          if ("decode" in firstImg) {
            firstImg.decode().then(drawFirstFrame).catch(drawFirstFrame);
          } else {
            drawFirstFrame();
          }
        };
      }
    }

    // Calculate section-relative scroll progress (0..1) -> targetFrame (0..239)
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / scrollableHeight));

      if (prefersReducedMotion) {
        targetFrameRef.current = 0;
      } else {
        targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
      }
    };

    // Continuous LERP animation loop using requestAnimationFrame
    const loop = () => {
      const lerpFactor = 0.28;
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * lerpFactor;
        if (Math.abs(targetFrameRef.current - currentFrameRef.current) < 0.1) {
          currentFrameRef.current = targetFrameRef.current;
        }
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const roundedFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (roundedFrame !== lastRenderedFrameRef.current) {
        renderFrame(roundedFrame);
        lastRenderedFrameRef.current = roundedFrame;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      lastRenderedFrameRef.current = -1;
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial trigger
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
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {/* Sticky Full-Screen Canvas Background (Layer 0: Canvas) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Cinematic Atmospheric Left Dark Gradient (Layer 1: Shadow Overlay - Vertically reshaped to expose natural top-left hero light for logo contrast) */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 10%, rgba(0,0,0,0.35) 24%, rgba(0,0,0,0.85) 36%, rgba(0,0,0,0.85) 100%)",
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,0.35) 36%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0) 50%)",
            WebkitMaskImage:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,0.35) 36%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0) 50%)",
          }}
        />
      </div>

      {/* Sticky Hero Overlay (Layer 2: BIOFACTOR UI Layer) */}
      <div className="sticky top-0 -mt-[100vh] h-screen w-full z-20 pointer-events-none flex flex-col justify-between">
        <div className="w-full h-full pointer-events-auto flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}
