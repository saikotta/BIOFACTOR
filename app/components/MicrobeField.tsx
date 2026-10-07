"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * MicrobeField — Reference Canvas Implementation with Visual Weight & Soft Botanical Balance.
 */

type Kind = "rod" | "coccus" | "spiral";
type Cell = {
  x: number;
  y: number;
  z: number;
  a: number;
  va: number;
  vx: number;
  vy: number;
  waveAmp: number;
  waveFreq: number;
  phase: number;
  s: HTMLCanvasElement;
  w: number;
  h: number;
  fadeAlpha: number;
};

// Biofactor Softened Botanical Palette (Blended 35% toward #EAF3EA)
const HUES = [
  "rgb(96, 164, 130)",  // Softened Botanical Green
  "rgb(112, 166, 133)", // Softened Deep Leaf
  "rgb(120, 175, 141)", // Softened Muted Sage
  "rgb(104, 153, 122)", // Softened Forest Green
  "rgb(130, 155, 129)", // Softened Soft Moss
  "rgb(213, 190, 131)", // Softened Mineral Gold
  "rgb(118, 157, 131)", // Softened Olive Green
  "rgb(112, 172, 140)", // Softened Bio Green
];

export type ExclusionZone = {
  xMinPct: number;
  xMaxPct: number;
  yMinPct: number;
  yMaxPct: number;
};

interface MicrobeFieldProps {
  densityMultiplier?: number;
  motionMultiplier?: number;
  opacityMultiplier?: number;
  rotationMultiplier?: number;
  position?: "fixed" | "absolute";
  exclusionZones?: ExclusionZone[];
  minVisibleCount?: number;
  textFading?: boolean;
  desktopCount?: number;
  mobileCount?: number;
}

const M = 45; // wrap margin in px

export default function MicrobeField({
  densityMultiplier = 1.0,
  motionMultiplier = 1.0,
  opacityMultiplier = 1.0,
  rotationMultiplier = 1.0,
  position = "fixed",
  exclusionZones = [],
  minVisibleCount,
  textFading = false,
  desktopCount,
  mobileCount,
}: MicrobeFieldProps = {}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useIsomorphicLayoutEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0;
    let H = 0;
    let cells: Cell[] = [];
    let raf = 0;
    let lastTime = performance.now();
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollVelocity = 0;
    let zoom = 1.0;
    let link = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let isVisible = true;

    type TextRect = { x: number; y: number; w: number; h: number };
    let textRects: TextRect[] = [];

    // Problem 1 Fix: Measure real text ink using getClientRects() on inline text elements with 10px padding
    const measureTextRects = () => {
      if (!textFading || !cv) return;
      const heroElem = cv.closest("div.relative") || cv.parentElement?.parentElement || cv.parentElement;
      if (!heroElem) return;
      const heroRect = heroElem.getBoundingClientRect();
      const pad = 10;
      const rects: TextRect[] = [];

      const textTargets = heroElem.querySelectorAll("h1 span, [class*='smallWord'], p, div.text-\\[11px\\], .text-\\[11px\\]");
      textTargets.forEach((el) => {
        if (el.contains(cv)) return;
        const clientRects = el.getClientRects();
        for (let rIdx = 0; rIdx < clientRects.length; rIdx++) {
          const r = clientRects[rIdx];
          if (r.width > 0 && r.height > 0) {
            rects.push({
              x: r.left - heroRect.left - pad,
              y: r.top - heroRect.top - pad,
              w: r.width + pad * 2,
              h: r.height + pad * 2,
            });
          }
        }
      });
      textRects = rects;
    };

    const handleScroll = () => {
      if (reduce) return;
      const currentY = window.scrollY;
      const dy = currentY - lastY;
      lastY = currentY;
      // Smoothly accumulate bounded scroll impulse into velocity buffer
      const impulse = Math.max(-30, Math.min(30, dy * 0.25));
      scrollVelocity = Math.max(-40, Math.min(40, scrollVelocity + impulse));
    };

    function sprite(kind: Kind, len: number, rad: number, hue: string) {
      const pad = rad * 3;
      const w = Math.ceil(len + pad * 2);
      const h = Math.ceil(rad * 2 + pad * 2);
      const c = document.createElement("canvas");
      c.width = w * DPR;
      c.height = h * DPR;
      const g = c.getContext("2d");
      if (!g) return { c, w, h };

      g.scale(DPR, DPR);
      g.translate(w / 2, h / 2);
      g.shadowColor = hue;
      g.shadowBlur = rad * 1.2; // Reduced sprite glow
      g.strokeStyle = hue;
      g.lineWidth = Math.max(1.2, rad * 0.32);
      g.fillStyle = "rgba(22, 122, 74, 0.08)";
      g.beginPath();

      if (kind === "rod") {
        const l = len / 2 - rad;
        g.moveTo(-l, -rad);
        g.lineTo(l, -rad);
        g.arc(l, 0, rad, -Math.PI / 2, Math.PI / 2);
        g.lineTo(-l, rad);
        g.arc(-l, 0, rad, Math.PI / 2, Math.PI * 1.5);
      } else if (kind === "coccus") {
        g.arc(0, 0, rad, 0, Math.PI * 2);
      } else {
        // Spiral
        for (let i = 0; i <= 40; i++) {
          const t = i / 40;
          const x = -len / 2 + t * len;
          const y = Math.sin(t * Math.PI * 3.2) * rad;
          if (i) g.lineTo(x, y);
          else g.moveTo(x, y);
        }
      }

      if (kind !== "spiral") g.fill();
      g.stroke();

      if (kind === "rod") {
        g.shadowBlur = 0;
        g.fillStyle = hue;
        g.globalAlpha = 0.55;
        for (let i = 0; i < 2; i++) {
          g.beginPath();
          g.arc((Math.random() - 0.5) * len * 0.5, (Math.random() - 0.5) * rad * 0.6, rad * 0.22, 0, Math.PI * 2);
          g.fill();
        }
      }
      return { c, w, h };
    }

    const wrap = (v: number, size: number) => {
      if (!isFinite(size) || size <= 0) return v;
      const span = size + 2 * M;
      return ((((v + M) % span) + span) % span) - M;
    };

    const smoothstep = (min: number, max: number, val: number) => {
      const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    function getSafePerimeterPosition(
      candX: number,
      candY: number,
      z: number
    ): { x: number; y: number } {
      if (!exclusionZones || exclusionZones.length === 0 || z < 0.25) {
        return { x: candX, y: candY };
      }

      for (const zone of exclusionZones) {
        const xMin = zone.xMinPct * W;
        const xMax = zone.xMaxPct * W;
        const yMin = zone.yMinPct * H;
        const yMax = zone.yMaxPct * H;

        if (candX >= xMin && candX <= xMax && candY >= yMin && candY <= yMax) {
          const regions: Array<{ x: number; y: number }> = [];
          if (yMin > 40) {
            regions.push({
              x: Math.random() * W,
              y: 15 + Math.random() * Math.max(yMin - 30, 20),
            });
          }
          if (H - yMax > 40) {
            regions.push({
              x: Math.random() * W,
              y: yMax + 15 + Math.random() * Math.max(H - yMax - 30, 20),
            });
          }
          if (W - xMax > 40) {
            regions.push({
              x: xMax + 15 + Math.random() * Math.max(W - xMax - 30, 20),
              y: Math.random() * H,
            });
          }
          if (xMin > 40) {
            regions.push({
              x: 15 + Math.random() * Math.max(xMin - 30, 20),
              y: Math.random() * H,
            });
          }

          if (regions.length > 0) {
            return regions[(Math.random() * regions.length) | 0];
          }
        }
      }

      return { x: candX, y: candY };
    }

    function build() {
      let n = 0;
      if (desktopCount !== undefined && mobileCount !== undefined) {
        n = W >= 861 ? desktopCount : mobileCount;
      } else {
        const baseRawN = (W * H) / 48000;
        const minN = Math.round(4 * Math.min(densityMultiplier, 1.25));
        const maxN = Math.round(8 * densityMultiplier);
        n = minVisibleCount !== undefined ? minVisibleCount : Math.round(Math.min(maxN, Math.max(minN, baseRawN * densityMultiplier)));
      }

      cells = [];
      const targetMinDist = W >= 861 ? 110 : 70;
      let currentMinDist = targetMinDist;

      for (let i = 0; i < n; i++) {
        // Requirement 3: 55% small & far (0.05..0.30), 33% medium (0.35..0.70), 12% large & near (0.75..1.00)
        const depthR = Math.random();
        const z = depthR < 0.55
          ? 0.05 + Math.random() * 0.25
          : depthR < 0.88
          ? 0.35 + Math.random() * 0.35
          : 0.75 + Math.random() * 0.25;

        const r = Math.random();
        const kind: Kind = r < 0.62 ? "rod" : r < 0.88 ? "coccus" : "spiral";

        const m = 1 - 0.25 * smoothstep(0.45, 1.0, z);
        const baseRaw = 3 + z * 7;
        const base = baseRaw * m;
        const len = (kind === "rod" ? baseRaw * (3.2 + Math.random() * 2) : kind === "spiral" ? baseRaw * 6 : baseRaw * 2) * m;
        const s = sprite(kind, len, base, HUES[(Math.random() * HUES.length) | 0]);

        // Requirement 2: Poisson-disk / Blue noise style spacing across whole hero
        let candX = Math.random() * W;
        let candY = Math.random() * H;

        for (let attempt = 0; attempt < 40; attempt++) {
          const testX = Math.random() * W;
          const testY = Math.random() * H;
          let tooClose = false;
          for (const other of cells) {
            const dx = testX - other.x;
            const dy = testY - other.y;
            if (dx * dx + dy * dy < currentMinDist * currentMinDist) {
              tooClose = true;
              break;
            }
          }
          if (!tooClose) {
            candX = testX;
            candY = testY;
            break;
          }
          if (attempt === 39) {
            currentMinDist = Math.max(20, currentMinDist * 0.90);
          }
        }

        const safePos = getSafePerimeterPosition(candX, candY, z);
        const x = safePos.x;
        const y = safePos.y;

        const dirAngle = Math.random() * Math.PI * 2;
        const speedMultiplier = z < 0.35 ? 0.4 + z * 0.5 : z < 0.72 ? 0.6 + z * 0.5 : 0.8 + z * 0.5;
        const speed = (3.5 + Math.random() * 4.5) * motionMultiplier * speedMultiplier;

        cells.push({
          x,
          y,
          z,
          a: Math.random() * Math.PI * 2,
          va: (Math.random() - 0.5) * 0.14 * rotationMultiplier,
          vx: Math.cos(dirAngle) * speed,
          vy: Math.sin(dirAngle) * speed,
          waveAmp: (8 + Math.random() * 16) * motionMultiplier,
          waveFreq: 0.4 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          s: s.c,
          w: s.w,
          h: s.h,
          fadeAlpha: 1.0,
        });
      }
    }

    function getNearestSectionState(): { sectionId: string; zoomT: number; linkT: number } {
      if (position === "absolute") {
        return { sectionId: "Section", zoomT: 1.00, linkT: 0.00 };
      }

      const mid = (window.innerHeight || 800) * 0.5;

      const heroElem = document.querySelector("main > div");
      const primordialElem = document.getElementById("primordial-elements");
      const chemistryElem = document.getElementById("chemistry-field-section");
      const numbersElem = document.getElementById("biofactor-numbers-section");
      const thinkElem = document.getElementById("how-we-think-section");

      const sections = [
        { id: "Hero", elem: heroElem, zoomT: 1.00, linkT: 0.00 },
        { id: "Primordial", elem: primordialElem, zoomT: 1.22, linkT: 0.00 },
        { id: "Chemistry", elem: chemistryElem, zoomT: 1.50, linkT: 0.20 },
        { id: "Numbers", elem: numbersElem, zoomT: 1.72, linkT: 0.55 },
        { id: "How We Think", elem: thinkElem, zoomT: 1.93, linkT: 1.00 },
      ];

      let bestState = { sectionId: "Hero", zoomT: 1.00, linkT: 0.00 };
      let minDistance = Infinity;

      for (const sec of sections) {
        if (!sec.elem) continue;
        const r = sec.elem.getBoundingClientRect();
        const centerDistance = Math.abs(r.top + r.height / 2 - mid);

        if (centerDistance < minDistance) {
          minDistance = centerDistance;
          bestState = { sectionId: sec.id, zoomT: sec.zoomT, linkT: sec.linkT };
        }
      }

      return bestState;
    }

    function applyExclusionSteering(cell: Cell, width: number, height: number, deltaTime: number) {
      if (!exclusionZones || exclusionZones.length === 0 || cell.z < 0.25) return;

      for (const zone of exclusionZones) {
        const xMin = zone.xMinPct * width;
        const xMax = zone.xMaxPct * width;
        const yMin = zone.yMinPct * height;
        const yMax = zone.yMaxPct * height;
        const zoneCx = (xMin + xMax) / 2;
        const zoneCy = (yMin + yMax) / 2;
        const halfW = (xMax - xMin) / 2 + 25;
        const halfH = (yMax - yMin) / 2 + 25;

        const dx = cell.x - zoneCx;
        const dy = cell.y - zoneCy;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx < halfW && absDy < halfH) {
          const dist = Math.hypot(dx, dy) || 1;
          const nx = dx / dist;
          const ny = dy / dist;

          const steerForce = 15 * deltaTime;
          cell.vx += nx * steerForce;
          cell.vy += ny * steerForce;

          if (absDx < halfW - 10 && absDy < halfH - 10) {
            if (halfW - absDx < halfH - absDy) {
              cell.x = dx > 0 ? xMax + 10 : xMin - 10;
            } else {
              cell.y = dy > 0 ? yMax + 10 : yMin - 10;
            }
          }
        }
      }
    }

    function draw(now: number) {
      if (!ctx) return;
      const dt = Math.min(Math.max(0, (now - lastTime) / 1000), 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, W, H);

      if (!reduce) {
        scrollVelocity *= 0.90;
      } else {
        scrollVelocity = 0;
      }

      const { zoomT, linkT } = getNearestSectionState();

      if (!reduce) {
        zoom += (zoomT - zoom) * 0.04;
        link += (linkT - link) * 0.04;
      } else {
        zoom = 1.0;
        link = linkT;
      }

      const cx = W / 2;
      const cy = H / 2;

      const pos: { px: number; py: number; cell: Cell; index: number }[] = [];

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        if (!reduce) {

          c.x += c.vx * dt;
          c.y += c.vy * dt;
          c.a += c.va * dt;

          const currentSpeed = Math.hypot(c.vx, c.vy);
          const maxSpeed = (10 + c.z * 12) * motionMultiplier;
          if (currentSpeed > maxSpeed && currentSpeed > 0) {
            c.vx = (c.vx / currentSpeed) * maxSpeed;
            c.vy = (c.vy / currentSpeed) * maxSpeed;
          }

          const parallaxFactor = 0.18 + c.z * 0.37;
          c.y -= scrollVelocity * parallaxFactor * dt * 60 * 0.15;

          // NaN / Finite Safeguard
          if (!isFinite(c.x) || !isFinite(c.y) || !isFinite(c.vx) || !isFinite(c.vy) || !isFinite(c.fadeAlpha)) {
            c.x = Math.random() * W;
            c.y = Math.random() * H;
            const dirAngle = Math.random() * Math.PI * 2;
            const speed = (3.5 + Math.random() * 4.5) * motionMultiplier * (0.6 + c.z * 0.7);
            c.vx = Math.cos(dirAngle) * speed;
            c.vy = Math.sin(dirAngle) * speed;
            c.fadeAlpha = 1.0;
          }

          c.x = wrap(c.x, W);
          c.y = wrap(c.y, H);

          if (exclusionZones.length > 0 && c.z >= 0.25) {
            applyExclusionSteering(c, W, H, dt);
          }

          for (let j = i + 1; j < cells.length; j++) {
            const c2 = cells[j];
            if (c2.z < 0.25) continue;

            const dx = c.x - c2.x;
            const dy = c.y - c2.y;
            const distSq = dx * dx + dy * dy;
            const minDist = 58;

            if (distSq > 0 && distSq < minDist * minDist) {
              const dist = Math.sqrt(distSq);
              const overlap = minDist - dist;
              const nx = dx / dist;
              const ny = dy / dist;
              const force = overlap * 0.04;
              c.x += nx * force;
              c.y += ny * force;
            }
          }
        }

        const px = cx + (c.x - cx) * (1 + (zoom - 1) * c.z * 0.6);
        const py = cy + (c.y - cy) * (1 + (zoom - 1) * c.z * 0.6);

        // Pure function of current position with smooth 0.4s bidirectional fade
        let targetAlpha = 1;
        if (textFading && textRects.length > 0) {
          for (let rIdx = 0; rIdx < textRects.length; rIdx++) {
            const tr = textRects[rIdx];
            if (px >= tr.x && px <= tr.x + tr.w && py >= tr.y && py <= tr.y + tr.h) {
              targetAlpha = 0;
              break;
            }
          }
          c.fadeAlpha += (targetAlpha - c.fadeAlpha) * Math.min(1, dt / 0.4);
        } else {
          c.fadeAlpha = 1.0;
        }

        if (c.fadeAlpha <= 0.005) {
          continue;
        }

        const k = zoom * (0.75 + c.z * 0.5);

        pos.push({ px, py, cell: c, index: i });

        // Problem 2 Fix: Far / Medium / Near layer opacities = 0.6 / 0.8 / 1.0
        const layerBaseAlpha = c.z < 0.35 ? 0.60 : c.z < 0.72 ? 0.80 : 1.00;
        ctx.globalAlpha = Math.min(1.0, layerBaseAlpha * opacityMultiplier * c.fadeAlpha);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(c.a);
        ctx.scale(k, k);
        ctx.drawImage(c.s, -c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      }

      if (link > 0.001) {
        const R = Math.min(W, H) * 0.25;
        type CandidatePair = { i: number; j: number; d: number; p1: (typeof pos)[0]; p2: (typeof pos)[0] };
        const candidates: CandidatePair[] = [];

        for (let i = 0; i < pos.length; i++) {
          const p1 = pos[i];
          for (let j = i + 1; j < pos.length; j++) {
            const p2 = pos[j];
            if (Math.abs(p1.cell.z - p2.cell.z) > 0.35) continue;

            const dx = p1.px - p2.px;
            const dy = p1.py - p2.py;
            const d = Math.hypot(dx, dy);

            if (d < R) {
              candidates.push({ i, j, d, p1, p2 });
            }
          }
        }

        candidates.sort((a, b) => a.d - b.d);

        const connectionCounts = new Int32Array(pos.length);
        const acceptedPairs: CandidatePair[] = [];

        for (const cand of candidates) {
          if (connectionCounts[cand.i] < 2 && connectionCounts[cand.j] < 2) {
            connectionCounts[cand.i]++;
            connectionCounts[cand.j]++;
            acceptedPairs.push(cand);
          }
        }

        for (const pair of acceptedPairs) {
          const { p1, p2, d } = pair;
          const lineAlpha = (1 - d / R) * 0.55 * link;

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = `rgba(22, 122, 74, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          if (!reduce) {
            const p = (now * 0.00025 + (p1.index + p2.index) * 0.13) % 1;
            const sx = p1.px + (p2.px - p1.px) * p;
            const sy = p1.py + (p2.py - p1.py) * p;

            ctx.beginPath();
            ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(22, 122, 74, ${Math.min(0.9, lineAlpha * 1.8).toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;
    }

    const frame = (time: number) => {
      if (isVisible) {
        draw(time);
      } else {
        lastTime = time;
      }
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      if (!cv || !ctx) return;
      const parent = cv.parentElement || cv;
      const parentW = parent.clientWidth || window.innerWidth || 1000;
      const parentH = parent.clientHeight || window.innerHeight || 800;
      const widthChanged = Math.round(parentW) !== Math.round(W);
      W = Math.max(100, parentW);
      H = Math.max(100, parentH);
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      measureTextRects();
      if (widthChanged || !cells.length) build();
      if (reduce) draw(performance.now());
    };

    resize();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
          if (e.isIntersecting) {
            lastTime = performance.now();
          }
        });
      },
      { threshold: 0 }
    );
    if (cv.parentElement) {
      io.observe(cv.parentElement);
    }

    const handleVisibility = () => {
      if (!document.hidden) {
        lastTime = performance.now();
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
    });
    if (cv.parentElement) {
      ro.observe(cv.parentElement);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("visibilitychange", handleVisibility);
    
    // Layout settlement timer after 500ms
    const timer500 = setTimeout(measureTextRects, 500);

    if (!reduce) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(timer500);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [densityMultiplier, motionMultiplier, opacityMultiplier, rotationMultiplier]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: position,
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: position === "absolute" ? 0 : -1,
        pointerEvents: "none",
      }}
    />
  );
}
