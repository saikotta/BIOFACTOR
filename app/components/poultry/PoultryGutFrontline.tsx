"use client";

import { useEffect, useRef } from "react";

function fitFrame(frame: HTMLIFrameElement | null) {
  const document = frame?.contentDocument;
  const content = document?.querySelector("main");
  const bodyElement = document?.body;
  const view = document?.defaultView;
  if (!frame || !document || !content || !bodyElement || !view) return;

  const body = view.getComputedStyle(bodyElement);
  const bottomPadding = Number.parseFloat(body.paddingBottom) || 0;
  const height = Math.ceil(content.getBoundingClientRect().bottom + bottomPadding);
  if (height > 0) frame.style.height = `${height}px`;
}

export default function PoultryGutFrontline() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    let resizeTimer = 0;
    let resizeFrame = 0;
    const observer = new ResizeObserver(() => scheduleFit());
    const scheduleFit = () => {
      fitFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => fitFrame(frame));
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => fitFrame(frame), 180);
    };
    const observeDocument = () => {
      const document = frame?.contentDocument;
      const documentElement = document?.documentElement;
      if (!document || !documentElement) return;
      observer.disconnect();
      observer.observe(documentElement);
      scheduleFit();
      void document.fonts.ready.then(scheduleFit);
    };

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
    <section className="w-full bg-[#E8F1E6]" data-poultry-static aria-label="First colonisers">
      <iframe
        ref={frameRef}
        className="block w-full border-0"
        src="/first-colonisers.html?poultryStatic=1&poultryDiagramMotion=1"
        title="First colonisers: how bacteria compete to establish in a chick's gut"
        loading="eager"
        style={{ height: "1500px" }}
        onLoad={(event) => fitFrame(event.currentTarget)}
      />
    </section>
  );
}
