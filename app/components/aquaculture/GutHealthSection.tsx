"use client";

import { useEffect, useRef } from "react";

function fitGutFrame(frame: HTMLIFrameElement | null) {
  const stage = frame?.contentDocument?.querySelector<HTMLElement>(".stage") || frame?.contentDocument?.querySelector<HTMLElement>("#stage");
  if (!frame || !stage) return;

  const frameWidth = frame.contentWindow?.innerWidth ?? 0;
  if (frameWidth >= 860) {
    stage.style.width = `${frameWidth}px`;
    stage.style.left = "0px";
    stage.style.top = "0px";
    stage.style.transform = "none";
    const height = Math.max(800, Math.ceil(stage.scrollHeight));
    if (frame.style.height !== `${height}px`) frame.style.height = `${height}px`;
    return;
  }

  stage.style.width = "";
  stage.style.left = "";
  stage.style.top = "";
  stage.style.transform = "";
  const height = Math.ceil(stage.scrollHeight);
  if (frame.style.height !== `${height}px`) frame.style.height = `${height}px`;
}

export default function GutHealthSection() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let resizeFrame = 0;
    let resizeTimer = 0;
    const scheduleFit = () => {
      fitGutFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => fitGutFrame(frame));
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => fitGutFrame(frame), 140);
    };
    const resizeObserver = new ResizeObserver(scheduleFit);
    const stageObserver = new ResizeObserver(scheduleFit);
    const observeStage = () => {
      const stage = frame.contentDocument?.querySelector<HTMLElement>(".stage");
      if (stage) stageObserver.observe(stage);
      scheduleFit();
    };

    scheduleFit();
    window.addEventListener("resize", scheduleFit, { passive: true });
    frame.addEventListener("load", observeStage);
    resizeObserver.observe(frame);
    observeStage();
    void frame.contentDocument?.fonts.ready.then(scheduleFit);

    return () => {
      window.removeEventListener("resize", scheduleFit);
      frame.removeEventListener("load", observeStage);
      window.cancelAnimationFrame(resizeFrame);
      window.clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      stageObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="gut-health-sec"
      data-n="Shrimp Gut Health"
      data-motion
      className="w-full overflow-hidden"
      data-aquaculture-static
      aria-label="Shrimp gut health infographic"
      style={{ background: "linear-gradient(180deg, #E5F0D4 0%, #DDE9C8 50%, #D1E4B9 100%)" }}
    >
      <iframe
        ref={frameRef}
        className="block w-full border-0"
        src="/shrimp-gut-health.html?embed=1"
        title="A healthy gut is the first line of disease defence"
        loading="eager"
        style={{ height: "760px" }}
        onLoad={(event) => {
          fitGutFrame(event.currentTarget);
          const sec = document.getElementById("gut-health-sec");
          if (sec) {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const doc = event.currentTarget.contentDocument;
              const stage = doc?.querySelector(".stage") || doc?.body;
              if (stage) stage.classList.add("is-animated");
              if (doc && typeof (doc.defaultView as any)?.runBars === "function") {
                (doc.defaultView as any).runBars();
              }
            }
          }
        }}
      />
    </section>
  );
}
