"use client";

import { useEffect, useRef } from "react";

function fitFrame(frame: HTMLIFrameElement | null) {
  if (!frame) return;
  const doc = frame.contentDocument;
  if (!doc) return;
  const card = doc.querySelector<HTMLElement>(".card");
  if (!card) return;
  // height = card bottom + controls + title + body padding
  const body = doc.body;
  const h = body ? body.scrollHeight : 0;
  if (h > 0) frame.style.height = h + "px";
}

export default function OrganicLoadSection() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let rafId = 0;
    let timerId = 0;

    const schedule = () => {
      fitFrame(frame);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => fitFrame(frame));
      clearTimeout(timerId);
      timerId = window.setTimeout(() => fitFrame(frame), 160);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(frame);

    frame.addEventListener("load", schedule);
    window.addEventListener("resize", schedule, { passive: true });

    schedule();

    return () => {
      frame.removeEventListener("load", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      className="w-full bg-[#EAF6EC] px-0"
      data-aquaculture-static
      aria-label="Interactive pond floor cross-section"
    >
      <iframe
        ref={frameRef}
        src="/pond-floor.html"
        title="Inside the pond floor: where toxins are born"
        className="block w-full border-0"
        loading="eager"
        style={{ height: "680px" }}
        onLoad={(e) => fitFrame(e.currentTarget)}
      />
    </section>
  );
}
