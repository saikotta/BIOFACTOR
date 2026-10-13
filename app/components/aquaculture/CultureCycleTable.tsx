"use client";

import { useEffect, useRef } from "react";
import { useIframeSrc } from "../useIframeSrc";

function fitFrame(frame: HTMLIFrameElement | null) {
  if (!frame || !frame.contentDocument) return;
  const doc = frame.contentDocument;
  const frameEl = doc.querySelector<HTMLElement>(".frame");
  if (!frameEl) return;
  const height = Math.ceil(frameEl.getBoundingClientRect().height || frameEl.offsetHeight);
  if (height > 0) frame.style.height = `${height + 12}px`;
}

export default function CultureCycleTable() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const frameSrc = useIframeSrc("/aquaculture-culture-cycle.html?v=2");

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let resizeTimer = 0;
    let resizeFrame = 0;

    const scheduleFit = () => {
      fitFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => fitFrame(frame));
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => fitFrame(frame), 150);
    };

    const resizeObserver = new ResizeObserver(scheduleFit);
    const frameObserver = new ResizeObserver(scheduleFit);

    const attachDocObserver = () => {
      scheduleFit();
      const doc = frame.contentDocument;
      if (doc) {
        const frameEl = doc.querySelector<HTMLElement>(".frame");
        if (frameEl) frameObserver.observe(frameEl);
      }
    };

    scheduleFit();
    window.addEventListener("resize", scheduleFit, { passive: true });
    frame.addEventListener("load", attachDocObserver);
    resizeObserver.observe(frame);
    attachDocObserver();
    void frame.contentDocument?.fonts.ready.then(scheduleFit);

    const t1 = setTimeout(scheduleFit, 300);
    const t2 = setTimeout(scheduleFit, 1200);
    const t3 = setTimeout(scheduleFit, 2500);

    // Trigger matrix entrance animation when #culture-cycle-sec enters viewport
    const sec = document.getElementById("culture-cycle-sec");
    const triggerMatrixAnimation = () => {
      const doc = frame?.contentDocument;
      if (!doc) return;
      const frameEl = doc.querySelector<HTMLElement>(".frame");
      const matrix = doc.getElementById("culture-cycle-matrix");
      if (frameEl && matrix) {
        frameEl.classList.add("is-intro");
        matrix.classList.add("is-animated", "sweep-active");
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          triggerMatrixAnimation();
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sec) io.observe(sec);

    return () => {
      window.removeEventListener("resize", scheduleFit);
      frame.removeEventListener("load", attachDocObserver);
      window.cancelAnimationFrame(resizeFrame);
      window.clearTimeout(resizeTimer);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      resizeObserver.disconnect();
      frameObserver.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section
      id="culture-cycle-sec"
      data-n="Culture Cycle"
      data-motion
      className="w-full"
      data-aquaculture-static
      aria-label="Aquaculture biology across culture cycle"
      style={{ background: "linear-gradient(180deg, #D1E4B9 0%, #C4DEA9 100%)" }}
    >
      <iframe
        ref={frameRef}
        className="block w-full border-0"
        src={frameSrc}
        title="Aquaculture biology across culture cycle"
        loading="eager"
        style={{ height: "780px" }}
        onLoad={(event) => {
          const frame = event.currentTarget;
          fitFrame(frame);
          const section = document.getElementById("culture-cycle-sec");
          if (!section) return;

          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const doc = frame.contentDocument;
            const frameEl = doc?.querySelector<HTMLElement>(".frame");
            const matrix = doc?.getElementById("culture-cycle-matrix");
            if (frameEl && matrix) {
              frameEl.classList.add("is-intro");
              matrix.classList.add("is-animated", "sweep-active");
            }
          }
        }}
      />
    </section>
  );
}
