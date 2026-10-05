"use client";

import { useEffect, useRef } from "react";

function fitFrame(frame: HTMLIFrameElement | null) {
  const document = frame?.contentDocument;
  const layout = document?.querySelector(".layout");
  if (frame && document && layout) {
    document.documentElement.style.setProperty("--host-height", `${window.innerHeight}px`);
    frame.style.height = `${layout.getBoundingClientRect().height}px`;
  }
}

export default function PoultryMineralBioavailability() {
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
    <section className="w-full bg-[#d9ebd3]" data-poultry-static aria-label="Mineral bioavailability">
      <iframe
        ref={frameRef}
        className="block w-full border-0"
        src="/poultry-mineral-bioavailability.html?v=2&poultryStatic=1"
        title="Mineral bioavailability"
        loading="eager"
        style={{ height: "1800px" }}
        onLoad={(event) => fitFrame(event.currentTarget)}
      />
    </section>
  );
}