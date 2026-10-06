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
  waveAmp: number;
  waveFreq: number;
  phase: number;
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
}: MicrobeFieldProps = {}) {
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
    let lastTime = performance.now();
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollVelocity = 0;
    let zoom = 1.0;
    let link = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | null = null;

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
          // Calculate all available safe perimeter regions around the zone
          const regions: Array<{ x: number; y: number }> = [];

          // Region 0: Above zone
          if (yMin > 40) {
            regions.push({
              x: Math.random() * W,
              y: 15 + Math.random() * Math.max(yMin - 30, 20),
            });
          }
          // Region 1: Below zone
          if (H - yMax > 40) {
            regions.push({
              x: Math.random() * W,
              y: yMax + 15 + Math.random() * Math.max(H - yMax - 30, 20),
            });
          }
          // Region 2: Right of zone
          if (W - xMax > 40) {
            regions.push({
              x: xMax + 15 + Math.random() * Math.max(W - xMax - 30, 20),
              y: Math.random() * H,
            });
          }
          // Region 3: Left of zone
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
      // Configurable count formula: clamp min/max scaled by densityMultiplier
      // Reduced to max 8 bacteria for performance
      const baseRawN = (W * H) / 48000;
      const minN = Math.round(4 * Math.min(densityMultiplier, 1.25));
      const maxN = Math.round(8 * densityMultiplier);
      const n = Math.round(Math.min(maxN, Math.max(minN, baseRawN * densityMultiplier)));
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
        
        // Stratified depth assignment: 25% Large foreground, 45% Midground, 30% Small background
        const depthR = Math.random();
        const z = depthR < 0.25
          ? 0.75 + Math.random() * 0.25
          : depthR < 0.70
          ? 0.35 + Math.random() * 0.40
          : 0.05 + Math.random() * 0.30;

        const r = Math.random();
        const kind: Kind = r < 0.62 ? "rod" : r < 0.88 ? "coccus" : "spiral";

        // Smooth depth-based size multiplier: m(z) = 1 - 0.25 * smoothstep(0.45, 1.0, z)
        const m = 1 - 0.25 * smoothstep(0.45, 1.0, z);
        const baseRaw = 3 + z * 7;
        const base = baseRaw * m;
        const len = (kind === "rod" ? baseRaw * (3.2 + Math.random() * 2) : kind === "spiral" ? baseRaw * 6 : baseRaw * 2) * m;
        const s = sprite(kind, len, base, HUES[(Math.random() * HUES.length) | 0]);

        // Jitter within grid square with multi-region safe placement & minimum spatial separation (58px minimum spacing)
        let candX = (col + 0.10 + Math.random() * 0.80) * cellW;
        let candY = (row + 0.10 + Math.random() * 0.80) * cellH;
        let safePos = getSafePerimeterPosition(candX, candY, z);

        for (let attempt = 0; attempt < 10; attempt++) {
          let tooClose = false;
          const minDist = 58; // 58px center-to-center minimum spacing
          for (const other of cells) {
            const dx = safePos.x - other.x;
            const dy = safePos.y - other.y;
            if (dx * dx + dy * dy < minDist * minDist) {
              tooClose = true;
              break;
            }
          }
          if (!tooClose) break;
          candX = (col + Math.random()) * cellW;
          candY = (row + Math.random()) * cellH;
          safePos = getSafePerimeterPosition(candX, candY, z);
        }

        const x = safePos.x;
        const y = safePos.y;

        // Varied organic 360-degree direction and time-based velocity
        const dirAngle = Math.random() * Math.PI * 2;
        const speed = (3.5 + Math.random() * 4.5) * motionMultiplier * (0.6 + z * 0.7);

        cells.push({
          x,
          y,
          z,
          a: Math.random() * Math.PI * 2,
          va: (Math.random() - 0.5) * 0.14 * rotationMultiplier, // Continuous rotation in rad/sec
          vx: Math.cos(dirAngle) * speed,
          vy: Math.sin(dirAngle) * speed,
          waveAmp: (8 + Math.random() * 16) * motionMultiplier,
          waveFreq: 0.4 + Math.random() * 0.4, // 8s to 15s oscillation cycles
          phase: Math.random() * Math.PI * 2, // Randomized starting phase offset
          s: s.c,
          w: s.w,
          h: s.h,
        });
      }
    }

    // Nearest section resolver for microscope magnification (zoomT) and quorum links (linkT)
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

          // Tiny local deflection force (15 * dt) to gently curve trajectory around text without acceleration spikes
          const steerForce = 15 * deltaTime;
          cell.vx += nx * steerForce;
          cell.vy += ny * steerForce;

          // Soft boundary nudge out if deeply inside text box
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

    let lastCoverageCheck = 0;

    function checkSpatialCoverage(time: number, width: number, height: number) {
      if (reduce || cells.length === 0 || time - lastCoverageCheck < 800) return;
      lastCoverageCheck = time;

      const cols = 4;
      const rows = 3;
      const cellW = width / cols;
      const cellH = height / rows;

      // Count visible cells per quadrant
      const counts = new Int32Array(12);
      for (let i = 0; i < cells.length; i++) {
        const cItem = cells[i];
        if (cItem.x >= 10 && cItem.x <= width - 10 && cItem.y >= 10 && cItem.y <= height - 10) {
          const col = Math.min(cols - 1, Math.max(0, (cItem.x / cellW) | 0));
          const row = Math.min(rows - 1, Math.max(0, (cItem.y / cellH) | 0));
          counts[row * cols + col]++;
        }
      }

      // Identify open quadrants (not inside foreground exclusion zones)
      const openQuadrants: number[] = [];
      for (let r = 0; r < rows; r++) {
        for (let cIdx = 0; cIdx < cols; cIdx++) {
          const idx = r * cols + cIdx;
          const qCx = (cIdx + 0.5) * cellW;
          const qCy = (r + 0.5) * cellH;

          let isInsideZone = false;
          if (exclusionZones && exclusionZones.length > 0) {
            for (const zone of exclusionZones) {
              if (
                qCx >= zone.xMinPct * width &&
                qCx <= zone.xMaxPct * width &&
                qCy >= zone.yMinPct * height &&
                qCy <= zone.yMaxPct * height
              ) {
                isInsideZone = true;
                break;
              }
            }
          }
          if (!isInsideZone) {
            openQuadrants.push(idx);
          }
        }
      }

      if (openQuadrants.length === 0) return;

      const emptyQuadrants = openQuadrants.filter((qIdx) => counts[qIdx] === 0);

      if (emptyQuadrants.length > 0) {
        // ONLY select cells that are strictly OFFSCREEN (never touch or pathfind visible cells!)
        let offscreenIdx = -1;
        let maxOffDist = -1;

        for (let i = 0; i < cells.length; i++) {
          const cItem = cells[i];
          const isOff = cItem.x < -15 || cItem.x > width + 15 || cItem.y < -15 || cItem.y > height + 15;
          if (isOff) {
            const dx = cItem.x < 0 ? -cItem.x : cItem.x > width ? cItem.x - width : 0;
            const dy = cItem.y < 0 ? -cItem.y : cItem.y > height ? cItem.y - height : 0;
            const dist = dx * dx + dy * dy;
            if (dist > maxOffDist) {
              maxOffDist = dist;
              offscreenIdx = i;
            }
          }
        }

        if (offscreenIdx >= 0) {
          const targetQ = emptyQuadrants[(Math.random() * emptyQuadrants.length) | 0];
          const targetRow = (targetQ / cols) | 0;
          const targetCol = targetQ % cols;
          const targetCx = (targetCol + 0.5) * cellW;
          const targetCy = (targetRow + 0.5) * cellH;

          const cToMove = cells[offscreenIdx];
          let spawnX = targetCx;
          let spawnY = targetCy;

          if (targetCol === 0) spawnX = -35;
          else if (targetCol === cols - 1) spawnX = width + 35;
          else if (targetRow === 0) spawnY = -35;
          else if (targetRow === rows - 1) spawnY = height + 35;
          else {
            spawnX = Math.random() < 0.5 ? -35 : width + 35;
          }

          cToMove.x = spawnX;
          cToMove.y = spawnY;

          // Shallow diagonal inward angle (avoid pure horizontal or vertical vectors)
          const baseInwardAngle = Math.atan2(targetCy - spawnY, targetCx - spawnX);
          const inwardAngle = baseInwardAngle + (Math.random() - 0.5) * 0.8;
          const speed = (10 + Math.random() * 12) * motionMultiplier * (0.5 + cToMove.z * 0.5); // 10-22 px/sec (~0.2 px/frame)
          cToMove.vx = Math.cos(inwardAngle) * speed;
          cToMove.vy = Math.sin(inwardAngle) * speed;
        }
      }
    }

    function draw(now: number) {
      if (!ctx) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, W, H);

      // Smooth exponential momentum decay for scroll-reactive velocity
      if (!reduce) {
        scrollVelocity *= 0.90;
      } else {
        scrollVelocity = 0;
      }

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

      // Throttled 4x3 Spatial Coverage Check (runs every 800ms to keep open quadrants populated without affecting visible motion)
      checkSpatialCoverage(now, W, H);

      // Track rendered screen positions for Quorum Cell-to-Cell Communication
      const pos: { px: number; py: number; cell: Cell; index: number }[] = [];

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        if (!reduce) {
          // LAYER 1: Calm, continuous multi-directional fluid drift (no artificial horizontal wave oscillation)
          c.x += c.vx * dt;
          c.y += c.vy * dt;
          c.a += c.va * dt;

          // Clamp translational speed to calm fluid range (10-24 px/sec => ~0.15-0.35 px/frame)
          const currentSpeed = Math.hypot(c.vx, c.vy);
          const maxSpeed = (10 + c.z * 12) * motionMultiplier;
          if (currentSpeed > maxSpeed && currentSpeed > 0) {
            c.vx = (c.vx / currentSpeed) * maxSpeed;
            c.vy = (c.vy / currentSpeed) * maxSpeed;
          }

          // LAYER 2: Temporary scroll-reactive depth-scaled parallax displacement
          const parallaxFactor = 0.18 + c.z * 0.37; // Far (0.18) -> Med (0.365) -> Near (0.55)
          c.y -= scrollVelocity * parallaxFactor * dt * 60 * 0.15;

          c.x = wrap(c.x, W);
          c.y = wrap(c.y, H);

          // Smooth trajectory steering around exclusion zones (curves naturally around text/cards without hard teleporting)
          if (exclusionZones.length > 0 && c.z >= 0.25) {
            applyExclusionSteering(c, W, H, dt);
          }

          // LAYER 3: Gentle live drift separation (prevents moving microbes from forming clusters)
          for (let j = i + 1; j < cells.length; j++) {
            const c2 = cells[j];
            if (c2.z < 0.25) continue; // Allow soft background depth overlap

            const dx = c.x - c2.x;
            const dy = c.y - c2.y;
            const distSq = dx * dx + dy * dy;
            const minDist = 58; // 58px center-to-center minimum spacing

            if (distSq > 0 && distSq < minDist * minDist) {
              const dist = Math.sqrt(distSq);
              const overlap = minDist - dist;
              const nx = dx / dist;
              const ny = dy / dist;
              // Very gentle 4% separation displacement nudge per frame
              const force = overlap * 0.04;
              c.x += nx * force;
              c.y += ny * force;
            }
          }
        }

        // VISIBLE POPULATION SAFEGUARD
        let visibleCount = 0;
        for (let k = 0; k < cells.length; k++) {
          const cellItem = cells[k];
          if (cellItem.x >= 10 && cellItem.x <= W - 10 && cellItem.y >= 10 && cellItem.y <= H - 10) {
            visibleCount++;
          }
        }

        const targetMinVisible = minVisibleCount !== undefined
          ? minVisibleCount
          : Math.round(Math.min(24, Math.max(12, cells.length * 0.80)));

        if (!reduce && visibleCount < targetMinVisible && cells.length > 0) {
          let farthestIdx = -1;
          let maxOffDist = -1;
          for (let k = 0; k < cells.length; k++) {
            const cellItem = cells[k];
            const dx = cellItem.x < 0 ? -cellItem.x : cellItem.x > W ? cellItem.x - W : 0;
            const dy = cellItem.y < 0 ? -cellItem.y : cellItem.y > H ? cellItem.y - H : 0;
            const offDist = dx * dx + dy * dy;
            if (offDist > maxOffDist) {
              maxOffDist = offDist;
              farthestIdx = k;
            }
          }

          if (farthestIdx >= 0 && maxOffDist > 0) {
            const cellToRecycle = cells[farthestIdx];
            const edge = (Math.random() * 4) | 0;
            let candX = 0;
            let candY = 0;
            if (edge === 0) { candX = Math.random() * W; candY = -45; }
            else if (edge === 1) { candX = W + 45; candY = Math.random() * H; }
            else if (edge === 2) { candX = Math.random() * W; candY = H + 45; }
            else { candX = -45; candY = Math.random() * H; }

            cellToRecycle.x = candX;
            cellToRecycle.y = candY;

            const inwardAngle = Math.atan2(cy - cellToRecycle.y, cx - cellToRecycle.x) + (Math.random() - 0.5) * 0.6;
            const speed = (3.5 + Math.random() * 4.5) * motionMultiplier * (0.6 + cellToRecycle.z * 0.7);
            cellToRecycle.vx = Math.cos(inwardAngle) * speed;
            cellToRecycle.vy = Math.sin(inwardAngle) * speed;
          }
        }

        // REFERENCE RADIAL DEPTH SPREAD FORMULA
        const px = cx + (c.x - cx) * (1 + (zoom - 1) * c.z * 0.6);
        const py = cy + (c.y - cy) * (1 + (zoom - 1) * c.z * 0.6);

        // REFERENCE SIZE MAGNIFICATION FORMULA
        const k = zoom * (0.75 + c.z * 0.5);

        pos.push({ px, py, cell: c, index: i });

        // Multiply cell alpha by 0.55 * opacityMultiplier
        const baseAlpha = Math.max(0.12, Math.min(0.9, 1 - Math.abs(c.z - 0.55) * 1.3));
        ctx.globalAlpha = Math.min(0.85, baseAlpha * 0.55 * opacityMultiplier);

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

    const frame = (time: number) => {
      draw(time);
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
      if (reduce) draw(performance.now());
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (!reduce) raf = requestAnimationFrame(frame); // reduced motion: one static render

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
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
