"use client";

import React from "react";

/* ================================================================ */
/*  CSS — icon animation keyframes (same as the orbit, oho- scoped)  */
/*  Plus chapter-icon-specific sizing & entrance animation.          */
/* ================================================================ */
const CSS = `
.oho-chapter-root{box-sizing:border-box}
.oho-chapter-root svg{width:100%;height:100%;display:block;overflow:visible}
.oho-chapter-root svg text{font-family:var(--font-sora),'Sora',system-ui,sans-serif}
.oho-chapter-icon-enter{animation:oho-ch-enter .5s ease-out}
@keyframes oho-ch-enter{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}

.oho-ink{stroke:#17402f;stroke-width:3;stroke-linejoin:round;stroke-linecap:round}
.oho-dz{transform-origin:0 0;animation:oho-dz 22s linear infinite}
@keyframes oho-dz{to{transform:rotate(360deg)}}
.oho-rootpath{fill:none;stroke:#8a5a1e;stroke-width:2.4;stroke-linecap:round;stroke-dasharray:1;animation:oho-grow 4s ease-in-out infinite}
@keyframes oho-grow{0%{stroke-dashoffset:1}45%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
.oho-sprout{transform-origin:0 -4px;animation:oho-sp 4s ease-in-out infinite}
@keyframes oho-sp{0%{transform:scale(.55)}45%,85%{transform:scale(1)}100%{transform:scale(.55)}}
.oho-mb{animation:oho-mb 3s ease-in-out infinite}
@keyframes oho-mb{50%{transform:translateY(-4px);opacity:.5}}
.oho-sway{transform-origin:0 30px;animation:oho-sw 3.6s ease-in-out infinite alternate}
@keyframes oho-sw{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
.oho-bob{animation:oho-bob 2.4s ease-in-out infinite}
@keyframes oho-bob{50%{transform:translateY(-4px)}}
.oho-tail{transform-origin:-26px -2px;animation:oho-wag 1.2s ease-in-out infinite alternate}
@keyframes oho-wag{from{transform:rotate(-14deg)}to{transform:rotate(16deg)}}
.oho-nod{transform-origin:24px -10px;animation:oho-nod 3.6s ease-in-out infinite}
@keyframes oho-nod{0%,80%,100%{transform:rotate(0)}88%{transform:rotate(-8deg)}}
.oho-blink{transform-origin:0 0;animation:oho-bl 4s infinite}
@keyframes oho-bl{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}
.oho-blink{transform-box:fill-box;transform-origin:50% 50%}
.oho-land{animation:oho-spin 26s linear infinite}
@keyframes oho-spin{to{transform:translateX(-260px)}}
.oho-tw{transform-box:fill-box;transform-origin:center;animation:oho-tw 2.4s ease-in-out infinite}
@keyframes oho-tw{50%{transform:scale(1.6) rotate(20deg);opacity:.4}}
.oho-drop{animation:oho-dp 3s ease-in infinite}
@keyframes oho-dp{0%{transform:translateY(-4px);opacity:0}30%{opacity:1}100%{transform:translateY(22px);opacity:0}}
.oho-pu{transform-box:fill-box;transform-origin:center;animation:oho-pu 1.6s ease-in-out infinite}
@keyframes oho-pu{50%{transform:scale(1.18)}}
@media (prefers-reduced-motion:reduce){
  .oho-chapter-root *{animation-duration:.01ms!important;animation-iteration-count:1!important}
}
`;

/* ================================================================ */
/*  Shared gradient/clipPath defs (oho-ch- prefix avoids clashes     */
/*  with the orbit's oho- IDs on the same page).                       */
/* ================================================================ */
const COMMON_DEFS = `
<radialGradient id="oho-ch-shine" cx=".3" cy=".25" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="oho-ch-soilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98a58"/><stop offset="1" stop-color="#7a4f2c"/></linearGradient>
<linearGradient id="oho-ch-leafG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9bd47f"/><stop offset="1" stop-color="#3f8f50"/></linearGradient>
<linearGradient id="oho-ch-leafG2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4e8a2"/><stop offset="1" stop-color="#5fa35a"/></linearGradient>
<linearGradient id="oho-ch-appleG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8f6b"/><stop offset="1" stop-color="#d13f2a"/></linearGradient>
<clipPath id="oho-ch-gc"><circle cx="0" cy="0" r="85"/></clipPath>
<radialGradient id="oho-ch-sh" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#0d2a1e" stop-opacity=".28"/></radialGradient>
<g id="oho-ch-land">
<path d="M-60 -48C-35 -68 5 -62 20 -42C40 -30 18 -10 30 8C22 40 0 62 -14 44C-24 22 -52 6 -48 -16C-52 -30 -58 -40 -60 -48Z" fill="#86a97a"/>
<path d="M30 -52C60 -62 100 -44 112 -20C118 0 90 10 80 -4C66 -10 48 -20 30 -52Z" fill="#86a97a"/>
<path d="M-118 -10C-100 -22 -86 -6 -90 14C-98 30 -118 22 -118 -10Z" fill="#86a97a"/>
<path d="M60 30C76 22 96 30 92 46C80 58 62 52 60 30Z" fill="#86a97a"/>
</g>
`;

/* ================================================================ */
/*  Helper: build a node-circle SVG for a chapter.                    */
/* ================================================================ */
function nodeSvg(
  label: string,
  fill: string,
  stroke: string,
  dotColor: string,
  iconTransform: string,
  icon: string
): string {
  return (
    `<svg viewBox="-90 -90 180 180" role="img" aria-label="${label}">` +
    `<defs>${COMMON_DEFS}</defs>` +
    `<circle r="70" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` +
    `<circle r="70" fill="url(#oho-ch-shine)"/>` +
    `<circle class="oho-dz" r="62" fill="none" stroke="${dotColor}" stroke-width="1.6" stroke-dasharray="2 8" stroke-linecap="round"/>` +
    `<g class="oho-ic" transform="${iconTransform}">${icon}</g>` +
    `</svg>`
  );
}

/* ---- Icon content per chapter (gradient refs use oho-ch- prefix) -- */

const SOIL_ICON = `
<rect x="-30" y="-2" width="60" height="38" rx="6" fill="url(#oho-ch-soilG)" class="oho-ink"/>
<path d="M-30 12Q-15 6 0 12T30 12M-30 24Q-15 18 0 24T30 24" fill="none" stroke="#6b4527" stroke-width="1.6" opacity=".6"/>
<path d="M-30 4Q-26 -4-20 -2Q-14 -8-8 -2Q0 -8 8 -2Q16 -8 22 -2Q28 -4 30 4V-2H-30Z" fill="#6fae57" class="oho-ink" stroke-width="2.2"/>
<path class="oho-rootpath" pathLength="1" d="M0 -2V10M0 10L-12 22M0 10L10 20M-12 22L-21 20M-12 22L-8 31M10 20L21 17"/>
<circle class="oho-mb" cx="-20" cy="10" r="2.6" fill="#b6f09a"/><circle class="oho-mb" style="animation-delay:-1s" cx="20" cy="8" r="2.6" fill="#b6f09a"/><circle class="oho-mb" style="animation-delay:-2s" cx="14" cy="28" r="2.4" fill="#b6f09a"/><circle cx="-22" cy="28" r="3" fill="#a07a52"/>
<g class="oho-sprout"><path d="M0 -2V-24" class="oho-ink"/><path d="M0 -24C-4 -40-24 -40-26 -34C-24 -22-8 -20 0 -24Z" fill="url(#oho-ch-leafG)" class="oho-ink" stroke-width="2.4"/><path d="M0 -26C2 -40 16 -46 26 -40C24 -28 8 -24 0 -26Z" fill="url(#oho-ch-leafG2)" class="oho-ink" stroke-width="2.4"/><path d="M-4 -26L-18 -33M4 -28L16 -37" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".7"/></g>
`;

const PLANT_ICON = `
<ellipse cx="0" cy="32" rx="26" ry="5" fill="#b9d3a6"/>
<g class="oho-sway"><path d="M0 32C-2 18 2 6 0 -6" fill="none" class="oho-ink"/>
<path d="M0 12C-4 -4-18-12-34-10C-32 8-16 18 0 12Z" fill="url(#oho-ch-leafG2)" class="oho-ink"/><path d="M-4 8C-14 2-22-2-28-6" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
<path d="M0 2C2-18 16-32 36-30C38-10 22 4 0 2Z" fill="url(#oho-ch-leafG)" class="oho-ink"/><path d="M6-2C16-10 24-18 30-26" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
<path d="M0-6C-8-18-6-30 0-38C6-30 8-18 0-6Z" fill="#c5e6a8" class="oho-ink" stroke-width="2.4"/>
<path class="oho-drop" d="M20-4q-5 8 0 11q5-3 0-11z" fill="#8fd3f0" stroke="#17402f" stroke-width="1.6"/></g>
<g fill="#ffd96b"><path class="oho-tw" d="M-30-26l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path class="oho-tw" style="animation-delay:-1.2s" d="M32 14l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/></g>
`;

const ANIMAL_ICON = `
<path d="M-34 32H34" stroke="#7fb868" stroke-width="5" stroke-linecap="round"/><path d="M-26 32l-3-8M-22 32l1-9M26 32l3-8" stroke="#5f9f4f" stroke-width="2.4" stroke-linecap="round"/>
<path class="oho-tail oho-ink" fill="none" d="M-30 -2C-40 0-40 12-37 22"/><circle cx="-37" cy="23" r="3" fill="#17402f"/>
<rect x="-24" y="14" width="9" height="18" rx="3" fill="#fff" class="oho-ink" stroke-width="2.4"/><rect x="2" y="14" width="9" height="18" rx="3" fill="#fff" class="oho-ink" stroke-width="2.4"/>
<rect x="-32" y="-12" width="52" height="32" rx="14" fill="#fff" class="oho-ink"/>
<path d="M-22-8Q-12-14-8-4Q-10 6-22 4Z" fill="#8bb27d"/><circle cx="6" cy="10" r="6" fill="#8bb27d"/>
<g class="oho-nod"><path d="M10-26L5-36M34-26L39-36" class="oho-ink" stroke-width="3.2"/>
<ellipse cx="6" cy="-18" rx="8" ry="5" fill="#f6b8b0" class="oho-ink" stroke-width="2.2" transform="rotate(-24 6 -18)"/><ellipse cx="38" cy="-18" rx="8" ry="5" fill="#f6b8b0" class="oho-ink" stroke-width="2.2" transform="rotate(24 38 -18)"/>
<rect x="10" y="-30" width="28" height="34" rx="13" fill="#fff" class="oho-ink"/><path d="M10-14Q16-26 22-24Q18-12 10-10Z" fill="#8bb27d"/>
<rect x="13" y="-6" width="22" height="14" rx="7" fill="#f6b8b0" class="oho-ink" stroke-width="2.4"/><circle cx="19" cy="1" r="1.8" fill="#17402f"/><circle cx="29" cy="1" r="1.8" fill="#17402f"/>
<g class="oho-blink"><circle cx="18" cy="-15" r="3.4" fill="#17402f"/><circle cx="30" cy="-15" r="3.4" fill="#17402f"/><circle cx="17" cy="-16.2" r="1.1" fill="#fff"/><circle cx="29" cy="-16.2" r="1.1" fill="#fff"/></g>
<circle cx="24" cy="6" r="2.4" fill="#ffd96b" stroke="#17402f" stroke-width="1.4"/></g>
`;

const FOOD_ICON = `
<g class="oho-bob"><path d="M-22 0L-30-22Q-26-26-22-22Z" fill="#f08a2a" class="oho-ink" stroke-width="2.4"/><path d="M-26-24l-5-8M-26-24l2-9M-26-24l7-5" stroke="#5f8e57" stroke-width="2.6" stroke-linecap="round"/></g>
<g class="oho-bob" style="animation-delay:.5s"><path d="M12-22C-4-26-6-4 4-2C8 0 14 -2 20-2C30-4 28-24 12-22Z" fill="url(#oho-ch-appleG)" class="oho-ink" stroke-width="2.6"/><path d="M12-22Q12-30 18-32" fill="none" class="oho-ink" stroke-width="2.4"/><path d="M14-30C20-36 28-34 28-34C26-28 20-26 14-30Z" fill="#6fae57" class="oho-ink" stroke-width="2"/><path d="M4-14Q5-8 8-6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".75"/></g>
<g class="oho-bob" style="animation-delay:1s"><circle cx="28" cy="-6" r="8" fill="#e5533a" class="oho-ink" stroke-width="2.4"/><path d="M24-12l4 3 4-3" stroke="#2f7a45" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>
<path d="M-32-4H32L26 32H-26Z" fill="#f3d08a" class="oho-ink"/>
<path d="M-29 8H29M-27 20H27M-16-4L-13 32M0-4V32M16-4L13 32" fill="none" stroke="#a8691f" stroke-width="2"/><path d="M-36-4H36" class="oho-ink" stroke-width="4"/>
`;

const PEOPLE_ICON = `
<path class="oho-pu" d="M0-30c-5-10-20-4-12 8l12 12 12-12c8-12-7-18-12-8z" fill="#e5533a" class="oho-ink" stroke="#17402f" stroke-width="2.2"/>
<g class="oho-bob"><circle cx="-20" cy="-8" r="8" fill="#fff3dc" class="oho-ink"/><circle cx="-23" cy="-9" r="1.2" fill="#17402f"/><circle cx="-17" cy="-9" r="1.2" fill="#17402f"/><path d="M-23-5Q-20-2-17-5" fill="none" stroke="#17402f" stroke-width="1.4" stroke-linecap="round"/></g>
<path d="M-36 30V12C-36 4-30 2-20 2C-10 2-6 4-6 12V30Z" fill="#7fb6c2" class="oho-ink"/>
<g class="oho-bob" style="animation-delay:.6s"><circle cx="20" cy="-8" r="8" fill="#fff3dc" class="oho-ink"/><circle cx="17" cy="-9" r="1.2" fill="#17402f"/><circle cx="23" cy="-9" r="1.2" fill="#17402f"/><path d="M17-5Q20-2 23-5" fill="none" stroke="#17402f" stroke-width="1.4" stroke-linecap="round"/></g>
<path d="M36 30V12C36 4 30 2 20 2C10 2 6 4 6 12V30Z" fill="#e3b35c" class="oho-ink"/>
<g class="oho-bob" style="animation-delay:.3s"><circle cx="0" cy="8" r="8.5" fill="#fff3dc" class="oho-ink"/><circle cx="-3" cy="7" r="1.2" fill="#17402f"/><circle cx="3" cy="7" r="1.2" fill="#17402f"/><path d="M-3 11Q0 14 3 11" fill="none" stroke="#17402f" stroke-width="1.4" stroke-linecap="round"/></g>
<path d="M-13 34V22C-13 17-9 17 0 17C9 17 13 17 13 22V34Z" fill="#8fc67a" class="oho-ink"/>
`;

/* ---- Planet: globe (r=85) instead of node circle (r=70) ---------- */
const PLANET_SVG =
  `<svg viewBox="-90 -90 180 180" role="img" aria-label="Planet">` +
  `<defs>${COMMON_DEFS}</defs>` +
  `<g clip-path="url(#oho-ch-gc)">` +
  `<rect x="-90" y="-90" width="180" height="180" fill="#dbe9e8"/>` +
  `<g class="oho-land"><use href="#oho-ch-land"/><use href="#oho-ch-land" x="260"/></g>` +
  `<g fill="none" stroke="#9fb9b6" stroke-width="1" opacity=".7"><ellipse rx="85" ry="30"/><ellipse rx="85" ry="62"/><ellipse rx="40" ry="85"/><path d="M-85 0H85M0 -85V85"/></g>` +
  `<circle r="85" fill="url(#oho-ch-sh)"/>` +
  `</g>` +
  `<circle r="85" fill="none" stroke="#c9dad7" stroke-width="2"/>` +
  `</svg>`;

/* ---- Map chapter IDs to full SVG strings --------------------------- */
const CHAPTER_SVGS: Record<string, string> = {
  soil: nodeSvg("Soil", "#f6e9dc", "#e2d8c9", "#c9a37a", "scale(1.12)", SOIL_ICON),
  plant: nodeSvg("Plants", "#e8f0dc", "#d3dfc3", "#8fb97d", "scale(1.1)", PLANT_ICON),
  animal: nodeSvg(
    "Animals",
    "#e8eeea",
    "#d3ddd6",
    "#9db4a6",
    "translate(0 4) scale(1.12)",
    ANIMAL_ICON
  ),
  food: nodeSvg("Food", "#f8ecdb", "#ecdcc3", "#d9b98a", "scale(1.1)", FOOD_ICON),
  people: nodeSvg(
    "People",
    "#e5eef0",
    "#d1dfe2",
    "#8fb3b9",
    "translate(0 4) scale(1.12)",
    PEOPLE_ICON
  ),
  planet: PLANET_SVG,
};

/** Public helper so other components (e.g. the closing section) can
 *  render the same icon for a given chapter id. */
export function getChapterIconSvg(chapterId: string): string {
  return CHAPTER_SVGS[chapterId] || CHAPTER_SVGS.soil;
}

/* ================================================================ */
/*  Component — sticky chapter icon that swaps with the active       */
/*  chapter, with an accent-coloured glow behind it.                   */
/* ================================================================ */
interface OneHealthChapterIconProps {
  activeChapterId: string;
  accentColor: string;
  prefersReducedMotion?: boolean;
}

export default function OneHealthChapterIcon({
  activeChapterId,
  accentColor,
  prefersReducedMotion = false,
}: OneHealthChapterIconProps) {
  const svg = getChapterIconSvg(activeChapterId);

  return (
    <div className="oho-chapter-root relative w-full h-full flex items-center justify-center pointer-events-none">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/* Accent-coloured glow that crossfades with the active chapter */}
      <div
        className="absolute inset-[-10%] rounded-full pointer-events-none transition-all duration-700 ease-out blur-2xl z-0"
        style={{
          background: `radial-gradient(circle, ${accentColor}2E 0%, ${accentColor}1A 40%, rgba(237,244,237,0) 70%)`,
        }}
      />
      {/* The active chapter's node icon — key forces remount → entrance anim */}
      <div
        key={activeChapterId}
        className="oho-chapter-icon-enter relative z-10 w-full h-full flex items-center justify-center"
        style={prefersReducedMotion ? { animation: "none" } : undefined}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
