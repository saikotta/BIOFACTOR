"use client";

import { useEffect, useRef } from "react";

function fitGutFrame(frame: HTMLIFrameElement | null) {
  const stage = frame?.contentDocument?.querySelector<HTMLElement>(".stage");
  if (!frame || !stage) return;

  const frameWidth = frame.contentWindow?.innerWidth ?? 0;
  if (frameWidth >= 860) {
    stage.style.width = `${frameWidth}px`;
    stage.style.left = "0px";
    stage.style.top = "0px";
    stage.style.transform = "none";
    if (frame.style.height !== "760px") frame.style.height = "760px";
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
    <section className="w-full overflow-hidden bg-[#d8ecd4]" data-aquaculture-static aria-label="Shrimp gut health infographic">
      <iframe
        ref={frameRef}
        className="block w-full border-0"
        src="/shrimp-gut-health.html?embed=1"
        title="A healthy gut is the first line of disease defence"
        loading="eager"
        style={{ height: "760px" }}
        onLoad={(event) => fitGutFrame(event.currentTarget)}
      />
    </section>
  );
}
