"use client";

import React, { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;

interface BiofactorScrollHeroProps {
  children: React.ReactNode;
  posterSrc?: string;
}

export default function BiofactorScrollHero({ children }: BiofactorScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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

    const isMobile = window.innerWidth < 768;
    const frameStep = isMobile ? 2 : 1;

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

      // If no valid frame is loaded yet, keep existing canvas/poster content without clearing to black
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Cap DPR at 2 to avoid unnecessary canvas workload on high-DPI screens
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = window.innerWidth;
      const headerOffset = width >= 768 ? 72 : 64;
      const height = Math.max(300, window.innerHeight - headerOffset);

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

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    let isDestroyed = false;

    // Frame loader helper that only stores the element in images[] once onload succeeds
    const loadFrame = (idx: number): Promise<HTMLImageElement | null> => {
      if (images[idx]?.complete && images[idx].naturalWidth > 0) {
        return Promise.resolve(images[idx]);
      }
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          images[idx] = img;
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // Load initial frame (index 0) immediately and render without delay
    loadFrame(0).then((firstImg) => {
      if (isDestroyed || !firstImg) return;
      renderFrame(0);
      lastRenderedFrameRef.current = 0;
    });

    // Progressive queue with controlled concurrency so network isn't saturated for navigation
    const loadProgressive = async () => {
      await new Promise((r) => setTimeout(r, 100));
      if (isDestroyed) return;

      const indices: number[] = [];
      for (let i = 1; i < TOTAL_FRAMES; i += frameStep) {
        indices.push(i);
      }

      const CONCURRENCY = isMobile ? 3 : 6;
      let currentIndex = 0;

      const worker = async () => {
        while (currentIndex < indices.length && !isDestroyed) {
          const idx = indices[currentIndex++];
          await loadFrame(idx);
        }
      };

      await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
    };

    loadProgressive();

    // Desktop: calculate section-relative scroll progress (0..1) -> targetFrame (0..239)
    const handleScroll = () => {
      if (isMobile) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const headerOffset = window.innerWidth >= 768 ? 72 : 64;
      const viewH = window.innerHeight - headerOffset;
      const scrollableHeight = rect.height - viewH;
      if (scrollableHeight <= 0) return;

      const scrolled = -rect.top + headerOffset;
      const progress = Math.min(1, Math.max(0, scrolled / scrollableHeight));

      if (prefersReducedMotion) {
        targetFrameRef.current = 0;
      } else {
        targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
      }
    };

    // Desktop: continuous LERP animation loop on scroll scrub
    const desktopLoop = () => {
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

      animFrameIdRef.current = requestAnimationFrame(desktopLoop);
    };

    // Mobile: smooth continuous playback loop so hero is alive with microbial animation without empty scroll traps
    let mobileFrame = 0;
    let lastMobileTime = performance.now();
    const MOBILE_FRAME_INTERVAL = 1000 / 24; // 24 FPS

    const mobileLoop = (now: number) => {
      if (isDestroyed) return;
      if (now - lastMobileTime >= MOBILE_FRAME_INTERVAL) {
        lastMobileTime = now;
        if (!prefersReducedMotion) {
          mobileFrame = (mobileFrame + 1) % TOTAL_FRAMES;
          renderFrame(mobileFrame);
        }
      }
      animFrameIdRef.current = requestAnimationFrame(mobileLoop);
    };

    const handleResize = () => {
      lastRenderedFrameRef.current = -1;
      renderFrame(isMobile ? mobileFrame : currentFrameRef.current);
    };

    if (isMobile) {
      animFrameIdRef.current = requestAnimationFrame(mobileLoop);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      animFrameIdRef.current = requestAnimationFrame(desktopLoop);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      isDestroyed = true;
      if (!isMobile) {
        window.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100vh-64px)] md:h-[400vh] bg-[#0A1A10]"
    >
      {/* Hero Container: Clean relative block on mobile (0 extra height/delay), sticky on desktop */}
      <div className="relative md:sticky md:top-[72px] h-full md:h-[calc(100vh-72px)] w-full overflow-hidden z-0 bg-[#0A1A10]">
        {/* Instant Native Poster Image - zero blank delay on first load or resize */}
        <img
          src="/frames/frame_0001.webp"
          alt="Biofactor nutrients animation background"
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        />

        {/* Animated Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10"
        />

        {/* Atmospheric Gradient Overlays for contrast and typography readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0A1A10]/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#0A1A10]/40 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between"
        >
          <div className="w-full h-full pointer-events-auto flex flex-col justify-between">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
