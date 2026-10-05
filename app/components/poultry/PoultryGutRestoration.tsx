"use client";

import { useEffect, useRef } from "react";

function fitFrame(frame: HTMLIFrameElement | null) {
  const document = frame?.contentDocument;
  const content = document?.querySelector(".page");
  if (frame && document && content) {
    document.documentElement.style.setProperty("--host-height", `${window.innerHeight}px`);
    frame.style.height = `${content.getBoundingClientRect().height}px`;
  }
}

export default function PoultryGutRestoration() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let resizeTimer = 0;
    let resizeFrame = 0;
    let contentObserver: ResizeObserver | null = null;
    const scheduleFit = () => {
      fitFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => fitFrame(frame));
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => fitFrame(frame), 180);
    };
    const observeContent = () => {
      const content = frame.contentDocument?.querySelector<HTMLElement>(".page");
      if (!content) return;
      contentObserver?.disconnect();
      contentObserver = new ResizeObserver(scheduleFit);
      contentObserver.observe(content);
      scheduleFit();
      void frame.contentDocument?.fonts.ready.then(scheduleFit);
    };

    scheduleFit();
    frame.addEventListener("load", observeContent);
    observeContent();
    window.addEventListener("resize", scheduleFit, { passive: true });

    return () => {
      frame.removeEventListener("load", observeContent);
      window.removeEventListener("resize", scheduleFit);
      window.cancelAnimationFrame(resizeFrame);
      window.clearTimeout(resizeTimer);
      contentObserver?.disconnect();
    };
  }, []);

  return (
    <section className="w-full bg-[#dcebd0]" data-poultry-static aria-label="Poultry gut probiotic and prebiotic comparison">
      <iframe
        ref={frameRef}
        className="block w-full border-0"
        src="/poultry-gut-ledger.html?poultryStatic=1"
        title="Probiotics and prebiotics comparison ledger"
        loading="eager"
        style={{ height: "1800px" }}
        onLoad={(event) => fitFrame(event.currentTarget)}
      />
    </section>
  );
}