"use client";

import { useEffect, useRef } from "react";

/**
 * MicrobeField — Reference Canvas Implementation with Visual Weight & Soft Botanical Balance.
 *
 * Client Visual Weight Adjustments:
 *  - Reduced Count Formula: clamp(W * H / 48000, 14, 36) (~36 at 1920x918, 27 at 1440x900, 14 at 390x844).
 *  - Stratified Jittered Grid Placement across viewport (even distribution without middle clumping).
 *  - Lighter Alpha: Draw globalAlpha multiplied by 0.55.
 *  - Blended Pale Botanical Hues: 35% blended toward #EAF3EA.
 *  - Reduced Sprite Glow: shadowBlur reduced from rad * 2.2 to rad * 1.2.
 *  - Removed edge-fade radial mask entirely.
 *
 * Preserved Systems & Locks:
 *  - Layering (zIndex: -1 behind isolated Home wrapper).
 *  - Magnification Targets (Hero 1.00 -> Primordial 1.22 -> Chemistry 1.50 -> Numbers 1.72 -> How We Think 1.93).
 *  - Radial Depth Spread & Size Magnification scale formulas.
 *  - Near-depth sprite trim m(z) = 1 - 0.25 * smoothstep(0.45, 1.0, z).
 *  - Scroll parallax, drift, rotation, wrap logic, shape mix.
 *  - Quorum nearest-first greedy selection & travelling signal dots.
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
  s: HTMLCanvasElement;
  w: number;
  h: number;
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

const M = 80; // wrap margin in px

export default function MicrobeField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let cells: Cell[] = [];
    let raf = 0;
    let lastY = window.scrollY;
    let zoom = 1.0;
    let link = 0;

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

    const wrap = (v: number, size: number) => ((((v + M) % (size + 2 * M)) + size + 2 * M) % (size + 2 * M)) - M;

    const smoothstep = (min: number, max: number, val: number) => {
      const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    function build() {
      // Reduced count formula: clamp(W * H / 48000, 14, 36)
      const n = Math.round(Math.min(36, Math.max(14, (W * H) / 48000)));
      cells = [];

      // Stratified jittered grid placement across viewport
      const aspect = W / (H || 1);
      const cols = Math.max(1, Math.ceil(Math.sqrt(n * aspect)));
      const rows = Math.max(1, Math.ceil(n / cols));
      const cellW = W / cols;
      const cellH = H / rows;

      for (let i = 0; i < n; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const z = Math.random();
        const r = Math.random();
        const kind: Kind = r < 0.62 ? "rod" : r < 0.88 ? "coccus" : "spiral";

        // Smooth depth-based size multiplier: m(z) = 1 - 0.25 * smoothstep(0.45, 1.0, z)
        const m = 1 - 0.25 * smoothstep(0.45, 1.0, z);
        const baseRaw = 3 + z * 7;
        const base = baseRaw * m;
        const len = (kind === "rod" ? baseRaw * (3.2 + Math.random() * 2) : kind === "spiral" ? baseRaw * 6 : baseRaw * 2) * m;
        const s = sprite(kind, len, base, HUES[(Math.random() * HUES.length) | 0]);

        // Jitter within grid square (0.15 to 0.85 offset)
        const x = (col + 0.15 + Math.random() * 0.70) * cellW;
        const y = (row + 0.15 + Math.random() * 0.70) * cellH;

        cells.push({
          x,
          y,
          z,
          a: Math.random() * Math.PI * 2,
          va: (Math.random() - 0.5) * 0.004,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          s: s.c,
          w: s.w,
          h: s.h,
        });
      }
    }

    // Nearest section resolver for microscope magnification (zoomT) and quorum links (linkT)
    function getNearestSectionState(): { sectionId: string; zoomT: number; linkT: number } {
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

    function draw(scrollDelta: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // 1. Determine target zoom and link state from nearest section
      const { zoomT, linkT } = getNearestSectionState();

      // 2. Reference smooth interpolation (0.04 lerp speed)
      if (!reduce) {
        zoom += (zoomT - zoom) * 0.04;
        link += (linkT - link) * 0.04;
      } else {
        zoom = 1.0;
        link = linkT;
      }

      const cx = W / 2;
      const cy = H / 2;

      // Track rendered screen positions for Quorum Cell-to-Cell Communication
      const pos: { px: number; py: number; cell: Cell; index: number }[] = [];

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        if (!reduce) {
          c.vx += (Math.random() - 0.5) * 0.02;
          c.vy += (Math.random() - 0.5) * 0.02;
          c.vx *= 0.985;
          c.vy *= 0.985;
          c.x += c.vx * (0.4 + c.z);
          // REFERENCE SCROLL PARALLAX FORMULA
          c.y += c.vy * (0.4 + c.z) - scrollDelta * (0.05 + c.z * 0.25);
          c.a += c.va + c.vx * 0.002;
          c.x = wrap(c.x, W);
          c.y = wrap(c.y, H);
        }

        // REFERENCE RADIAL DEPTH SPREAD FORMULA
        const px = cx + (c.x - cx) * (1 + (zoom - 1) * c.z * 0.6);
        const py = cy + (c.y - cy) * (1 + (zoom - 1) * c.z * 0.6);

        // REFERENCE SIZE MAGNIFICATION FORMULA
        const k = zoom * (0.75 + c.z * 0.5);

        pos.push({ px, py, cell: c, index: i });

        // Multiply cell alpha by 0.55 for lighter, softer appearance
        const baseAlpha = Math.max(0.12, Math.min(0.9, 1 - Math.abs(c.z - 0.55) * 1.3));
        ctx.globalAlpha = baseAlpha * 0.55;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(c.a);
        ctx.scale(k, k);
        ctx.drawImage(c.s, -c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      }

      // 3. QUORUM-STYLE CELL-TO-CELL INTERACTION NETWORK (NEAREST-FIRST GREEDY SELECTION)
      if (link > 0.001) {
        const R = Math.min(W, H) * 0.25;
        type CandidatePair = { i: number; j: number; d: number; p1: (typeof pos)[0]; p2: (typeof pos)[0] };
        const candidates: CandidatePair[] = [];

        // Build candidate list of pairs within radius R and similar depth (|z1 - z2| <= 0.35)
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

        // Sort candidate pairs by distance (nearest-first)
        candidates.sort((a, b) => a.d - b.d);

        // Greedily accept pairs while both cells have < 2 connections
        const connectionCounts = new Int32Array(pos.length);
        const acceptedPairs: CandidatePair[] = [];

        for (const cand of candidates) {
          if (connectionCounts[cand.i] < 2 && connectionCounts[cand.j] < 2) {
            connectionCounts[cand.i]++;
            connectionCounts[cand.j]++;
            acceptedPairs.push(cand);
          }
        }

        const now = performance.now();

        // Draw connections and travelling signals
        for (const pair of acceptedPairs) {
          const { p1, p2, d } = pair;
          const lineAlpha = (1 - d / R) * 0.55 * link;

          // Thin botanical connection stroke (0.9 CSS px)
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = `rgba(22, 122, 74, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          // Travelling biological signal dot (radius 1.2 CSS px)
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

    const frame = () => {
      const y = window.scrollY;
      const d = y - lastY;
      lastY = y;
      draw(d);
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      if (!cv || !ctx) return;
      const r = cv.getBoundingClientRect();
      const widthChanged = Math.round(r.width) !== Math.round(W);
      W = r.width;
      H = r.height;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // Height-only changes (mobile URL bar) do not reshuffle the field
      if (widthChanged || !cells.length) build();
      if (reduce) draw(0);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) raf = requestAnimationFrame(frame); // reduced motion: one static render

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Task A: Positioned behind all Home content
        pointerEvents: "none",
      }}
    />
  );
}
