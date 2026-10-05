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

    // Trigger matrix entrance animation when #s4 enters viewport
    const sec = document.getElementById("s4");
    const triggerMatrixAnimation = () => {
      const doc = frameRef.current?.contentDocument;
      if (!doc) return;
      const frame = doc.querySelector(".frame");
      const matrix = doc.getElementById("life-stage-matrix");
      if (frame && matrix) {
        frame.classList.add("is-intro");
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
      window.cancelAnimationFrame(resizeFrame);
      window.clearTimeout(resizeTimer);
      io.disconnect();
    };
  }, []);

  return (
    <section id="s4" data-n="Every stage" className="w-full bg-[#EAF3EA] mxw" data-ruminants-static aria-label="Ruminant biology at every life stage">
      <iframe
        ref={frameRef}
        className="block w-full border-0"
        src="/ruminants-production-stages.html?v=1"
        title="Ruminant biology across life stages"
        loading="eager"
        style={{ height: "1600px" }}
        onLoad={(event) => {
          fitFrame(event.currentTarget);
          const sec = document.getElementById("s4");
          if (sec) {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const doc = event.currentTarget.contentDocument;
              const frame = doc?.querySelector(".frame");
              const matrix = doc?.getElementById("life-stage-matrix");
              if (frame && matrix) {
                frame.classList.add("is-intro");
                matrix.classList.add("is-animated", "sweep-active");
              }
            }
          }
        }}
      />
    </section>
  );
}




