"use client";

import { useEffect, useRef } from "react";

function fitFrame(frame: HTMLIFrameElement | null) {
  if (!frame) return;
  const doc = frame.contentDocument;
  if (!doc) return;
  const target = doc.querySelector(".layout") || doc.querySelector("main") || doc.body;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const style = doc.defaultView?.getComputedStyle(target);
  const marginTop = parseFloat(style?.marginTop || "0");
  const marginBottom = parseFloat(style?.marginBottom || "0");
  const height = Math.ceil(rect.height + marginTop + marginBottom);
  if (height > 0) frame.style.height = `${height}px`;
}

export default function PoultryMineralBioavailability() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    let resizeTimer = 0;
    let resizeFrame = 0;

    const scheduleFit = () => {
      fitFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => fitFrame(frame));
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => fitFrame(frame), 150);
    };

    const observeDocument = () => {
      const doc = frame?.contentDocument;
      if (!doc || !doc.documentElement) return;
      observer.disconnect();
      observer.observe(doc.documentElement);
      if (doc.body) observer.observe(doc.body);
      scheduleFit();
      void doc.fonts.ready.then(scheduleFit);
    };

    const observer = new ResizeObserver(() => scheduleFit());
    frame?.addEventListener("load", observeDocument);
    observeDocument();
    window.addEventListener("resize", scheduleFit, { passive: true });

    return () => {
      frame?.removeEventListener("load", observeDocument);
      window.removeEventListener("resize", scheduleFit);
      observer.disconnect();
      window.cancelAnimationFrame(resizeFrame);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className="w-full bg-[#d9ebd3]" data-ruminants-section="mineral" data-n="Minerals" aria-label="Mineral bioavailability">
      <div className="rv w-full">
        <iframe
          ref={frameRef}
          className="block w-full border-0"
          src="/poultry-mineral-bioavailability.html?v=2"
          title="Mineral bioavailability"
          loading="eager"
          style={{ height: "400px" }}
          onLoad={(event) => fitFrame(event.currentTarget)}
        />
      </div>
    </section>
  );
}