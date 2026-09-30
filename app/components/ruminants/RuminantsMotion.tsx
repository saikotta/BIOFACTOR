"use client";

import { useEffect } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function animateCounter(element: HTMLElement, target: number, delay: number) {
  window.setTimeout(() => {
    const started = performance.now();
    const frame = (now: number) => {
      const progress = clamp((now - started) / 550, 0, 1);
      element.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) window.requestAnimationFrame(frame);
    };
    window.requestAnimationFrame(frame);
  }, delay);
}

function prepareText(section: HTMLElement) {
  section.querySelectorAll<HTMLElement>(
    "[data-motion-eyebrow], [data-motion-heading], h3, h4, p, [data-stage-row], [data-stage-quote]",
  ).forEach((item, index) => {
    item.style.setProperty("--i", String(index));
    item.classList.add("rm-reveal");
  });
}

export default function RuminantsMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("main");
    if (!root) return;
    root.classList.add("rm-motion-ready");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 720px)");
    const header = document.querySelector<HTMLElement>("header");
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-ruminants-section]"));
    const images = Array.from(root.querySelectorAll<HTMLImageElement>("img[data-stage-image], [data-methane-image] img"));
    const cleanupCallbacks: Array<() => void> = [];

    sections.forEach(prepareText);
    const hero = root.querySelector<HTMLElement>("[data-ruminants-section=hero]");
    if (hero) window.requestAnimationFrame(() => hero.classList.add("rm-hero-ready"));
    root.querySelectorAll<HTMLElement>("[data-motion], [data-stage-image], [data-methane-image] img").forEach((element) => {
      element.style.willChange = "transform, opacity";
    });

    const showImmediately = () => {
      hero?.classList.add("rm-hero-ready");
      root.querySelectorAll<HTMLElement>(".rm-reveal, [data-stage-image], [data-methane-image] img").forEach((element) => {
        element.classList.add("rm-in");
        element.style.willChange = "auto";
      });
      root.querySelectorAll<HTMLElement>("[data-stat-number]").forEach((element) => {
        element.textContent = element.dataset.statNumber || element.textContent;
      });
      root.querySelectorAll<SVGPathElement>("[data-diagram-path]").forEach((path) => path.style.strokeDashoffset = "0");
    };

    if (reduced) {
      showImmediately();
      return () => {};
    }

    const progress = document.createElement("div");
    progress.className = "ruminants-scroll-progress";
    document.body.appendChild(progress);

    const grain = document.createElement("div");
    grain.className = "ruminants-grain";
    document.body.appendChild(grain);

    const ambient = document.createElement("div");
    ambient.className = "ruminants-ambient";
    for (let index = 0; index < 13; index += 1) {
      const microbe = document.createElement("span");
      microbe.style.setProperty("--x", `${4 + (index * 17) % 92}%`);
      microbe.style.setProperty("--y", `${8 + (index * 29) % 84}%`);
      microbe.style.setProperty("--s", `${8 + (index * 7) % 27}px`);
      microbe.style.setProperty("--d", `${index * 0.7}s`);
      ambient.appendChild(microbe);
    }
    document.body.appendChild(ambient);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.classList.add("rm-in");
        target.style.willChange = "auto";
        revealObserver.unobserve(target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    root.querySelectorAll<HTMLElement>(".rm-reveal, [data-stage-image], [data-methane-image] img").forEach((element) => revealObserver.observe(element));

    const statTimers = new WeakSet<HTMLElement>();
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const stat = entry.target as HTMLElement;
        if (statTimers.has(stat)) return;
        statTimers.add(stat);
        const delay = Number(stat.dataset.statIndex || 0) * 120;
        stat.querySelectorAll<HTMLElement>("[data-stat-number]").forEach((number) => {
          number.textContent = "0";
          animateCounter(number, Number(number.dataset.statNumber || 0), delay);
        });
        stat.classList.add("rm-in");
        statObserver.unobserve(stat);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    root.querySelectorAll<HTMLElement>("[data-stat]").forEach((stat, index) => {
      stat.dataset.statIndex = String(index);
      stat.classList.add("rm-reveal");
      statObserver.observe(stat);
      stat.addEventListener("mouseenter", () => stat.classList.add("rm-stat-hover"));
      stat.addEventListener("mouseleave", () => stat.classList.remove("rm-stat-hover"));
    });

    const diagram = root.querySelector<HTMLElement>("[data-motion=diagram]");
    if (diagram) {
      diagram.querySelectorAll<SVGPathElement>("path").forEach((path, index) => {
        const length = path.getTotalLength();
        path.dataset.diagramPath = "true";
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        path.style.setProperty("--i", String(index));
      });
      const diagramObserver = new IntersectionObserver((entries) => {
        if (!entries[0]?.isIntersecting) return;
        diagram.classList.add("rm-in");
        diagram.querySelectorAll<SVGPathElement>("[data-diagram-path]").forEach((path) => path.classList.add("rm-draw"));
        diagramObserver.disconnect();
      }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
      diagramObserver.observe(diagram);
      cleanupCallbacks.push(() => diagramObserver.disconnect());
    }

    const methaneImage = root.querySelector<HTMLElement>("[data-methane-image]");
    if (methaneImage) {
      for (let index = 0; index < 16; index += 1) {
        const particle = document.createElement("span");
        particle.className = `ruminants-particle ${index % 3 === 0 ? "kept" : "lost"}`;
        particle.style.setProperty("--px", `${8 + Math.random() * 84}%`);
        particle.style.setProperty("--delay", `${0.5 + index * 0.18}s`);
        particle.style.setProperty("--drift", `${-24 + Math.random() * 48}px`);
        methaneImage.appendChild(particle);
      }
    }

    const table = root.querySelector<HTMLElement>("[data-ruminants-section=matrix]");
    const matrixStage = root.querySelector<HTMLElement>("[data-matrix-stage]");
    const matrixColumns = table ? Array.from(table.querySelectorAll<HTMLElement>("[data-matrix-column]")) : [];
    const rail = document.createElement("span");
    const marker = document.createElement("span");
    if (table && matrixStage) {
      rail.className = "ruminants-matrix-rail";
      marker.className = "ruminants-matrix-marker";
      matrixStage.append(rail, marker);
    }

    let scrollFrame = 0;
    let scrollY = window.scrollY;
    const updateScroll = () => {
      scrollFrame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pageProgress = clamp(scrollY / maxScroll, 0, 1);
      progress.style.transform = `scaleX(${pageProgress})`;
      header?.classList.toggle("ruminants-header-scrolled", scrollY > 60);

      const hero = root.querySelector<HTMLElement>("[data-ruminants-section=hero]");
      if (hero && !mobile.matches) {
        const distance = hero.getBoundingClientRect().top + hero.offsetHeight / 2 - window.innerHeight / 2;
        hero.style.setProperty("--hero-parallax", `${distance * -0.05}px`);
      }
      images.forEach((image, index) => {
        if (mobile.matches) {
          image.style.removeProperty("--image-parallax");
          return;
        }
        const distance = image.getBoundingClientRect().top + image.offsetHeight / 2 - window.innerHeight / 2;
        image.style.setProperty("--image-parallax", `${distance * (index % 2 ? 0.035 : -0.035)}px`);
      });

      if (table && matrixColumns.length) {
        const bounds = table.getBoundingClientRect();
        const p = clamp(-bounds.top / Math.max(1, table.offsetHeight - window.innerHeight), 0, 1);
        const active = Math.min(4, Math.floor(p * 5));
        marker.style.transform = `translateX(${10 + p * 80}%)`;
        rail.style.transform = `scaleX(${p})`;
        matrixColumns.forEach((column, index) => {
          column.style.opacity = index < active ? "0.6" : index === active ? "1" : "0.28";
          column.classList.toggle("rm-matrix-active", index === active);
        });
      }

      const closing = root.querySelector<HTMLElement>("[data-ruminants-section=closing]");
      closing?.classList.toggle("rm-dark", closing.getBoundingClientRect().top < window.innerHeight * 0.55);
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    updateScroll();

    Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise<void>((resolve) => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    }))).then(updateScroll);

    cleanupCallbacks.push(() => {
      revealObserver.disconnect();
      statObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScroll);
      window.cancelAnimationFrame(scrollFrame);
      progress.remove();
      grain.remove();
      ambient.remove();
      rail.remove();
      marker.remove();
      methaneImage?.querySelectorAll(".ruminants-particle").forEach((particle) => particle.remove());
      root.classList.remove("rm-motion-ready");
    });

    return () => cleanupCallbacks.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
