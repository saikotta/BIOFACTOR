"use client";

import { useEffect, useRef } from "react";

function fitFrame(frame: HTMLIFrameElement | null) {
  const layout = frame?.contentDocument?.querySelector(".frame");
  if (frame && layout) frame.style.height = `${layout.getBoundingClientRect().height}px`;
}

export default function RuminantsMatrix() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let resizeTimer = 0;
    let resizeFrame = 0;
    const scheduleFit = () => {
      fitFrame(frameRef.current);
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => fitFrame(frameRef.current));
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => fitFrame(frameRef.current), 180);
    };

    scheduleFit();
    window.addEventListener("resize", scheduleFit, { passive: true });
    void frameRef.current?.contentDocument?.fonts.ready.then(scheduleFit);

    return () => {
      window.removeEventListener("resize", scheduleFit);
      window.cancelAnimationFrame(resizeFrame);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className="w-full bg-[#EAF3EA]" data-ruminants-static aria-label="Ruminant biology at every life stage">
      <iframe
        ref={frameRef}
        className="block w-full border-0"
        src="/ruminants-production-stages.html?v=1"
        title="Ruminant biology across life stages"
        loading="eager"
        style={{ height: "1600px" }}
        onLoad={(event) => fitFrame(event.currentTarget)}
      />
    </section>
  );
}




