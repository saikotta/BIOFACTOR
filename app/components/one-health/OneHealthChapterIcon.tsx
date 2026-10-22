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
    `<circle r="75" fill="#fff" filter="drop-shadow(0 8px 12px rgba(23,61,51,.16))"/>` +
    `<circle r="70" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` +
    `<circle r="70" fill="url(#oho-ch-shine)"/>` +
    `<circle class="oho-dz" r="62" fill="none" stroke="${dotColor}" stroke-width="1.6" stroke-dasharray="2 8" stroke-linecap="round"/>` +
    `<g class="oho-ic" transform="${iconTransform}">${icon}</g>` +
    `</svg>`
  );
}

/* ---- Icon content per chapter (gradient refs use oho-ch- prefix) -- */

const SOIL_ICON = `
<ellipse cx="0" cy="42" rx="30" ry="4.5" fill="#173d33" opacity=".14"/>
<path d="M-34 8h68v26a8 8 0 0 1-8 8h-52a8 8 0 0 1-8-8z" fill="#a8713a"/><path d="M-34 15V12a6 6 0 0 1 6-6h56a6 6 0 0 1 6 6v3z" fill="#6aa35a"/><path d="M-34 27h68v3h-68z" fill="#8a5a2b" opacity=".45"/>
<g fill="#6e4521"><circle cx="-22" cy="23" r="2.2"/><circle cx="-6" cy="34" r="2.6"/><circle cx="14" cy="25" r="2"/><circle cx="25" cy="35" r="2.4"/></g><path d="M0 16V30M0 22C-6 26-9 30-10 35M0 24C6 28 9 31 10 36" stroke="#f0dfb8" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M0 8V-20" stroke="#4f8a43" stroke-width="4.5" stroke-linecap="round"/><path d="M0-12C-16-12-26-22-24-34-10-34-1-26 0-12z" fill="#7fc06a"/><path d="M0-20C12-20 22-28 22-40 8-40 0-32 0-20z" fill="#5fa84f"/><path d="M-2-14C-9-19-14-25-19-30" stroke="#c4ebb0" stroke-width="1.6" fill="none" stroke-linecap="round"/>
`;

const PLANT_ICON = `
<ellipse cx="0" cy="42" rx="30" ry="4.5" fill="#173d33" opacity=".14"/><path d="M0 42C-1 26-2 8 3-16" stroke="#3f7d46" stroke-width="4.5" stroke-linecap="round" fill="none"/><path d="M-1 28C-26 30-38 14-35-2-17-1-3 10-1 28z" fill="#6dbb63"/><path d="M1 14C24 16 38 2 36-16 17-14 3-4 1 14z" fill="#93d67c"/><path d="M3-16C-8-24-4-38 6-44 16-36 13-24 3-16z" fill="#4f9d52"/><g stroke="#e2f6d4" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"><path d="M-3 24C-14 18-24 10-31 2M5 10C16 8 26 2 32-10M5-18C7-26 8-32 8-38"/></g>
`;

const ANIMAL_ICON = `
<g transform="translate(-4 0)"><ellipse cx="2" cy="42" rx="36" ry="4.5" fill="#173d33" opacity=".14"/><g fill="#fdfdf8"><rect x="-26" y="12" width="8" height="26" rx="3"/><rect x="18" y="12" width="8" height="26" rx="3"/></g><g fill="#e3e9e0"><rect x="-12" y="14" width="8" height="24" rx="3"/><rect x="6" y="14" width="8" height="24" rx="3"/></g><g fill="#3a4a42"><rect x="-26" y="34" width="8" height="5" rx="2"/><rect x="18" y="34" width="8" height="5" rx="2"/><rect x="-12" y="34" width="8" height="5" rx="2"/><rect x="6" y="34" width="8" height="5" rx="2"/></g><path d="M-34-4C-44 0-44 12-39 22" stroke="#5c7266" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="-34" y="-14" width="66" height="32" rx="15" fill="#fdfdf8"/><path d="M-22-10c8-4 14 2 10 10s-14 6-10-10zM6-12c8-2 14 6 8 12s-14-2-8-12z" fill="#5c7266"/><g transform="translate(30 -10)"><path d="M-2-14C-6-22-2-27 2-27M12-14C16-22 12-27 8-27" stroke="#e8c98a" stroke-width="3.5" fill="none" stroke-linecap="round"/><rect x="-6" y="-14" width="26" height="30" rx="11" fill="#fdfdf8"/><ellipse cx="-8" cy="-7" rx="7" ry="4" fill="#5c7266" transform="rotate(-20 -8 -7)"/><rect x="0" y="4" width="22" height="14" rx="7" fill="#f2b9a8"/><circle cx="15" cy="11" r="1.8" fill="#8a4a3a"/><circle cx="8" cy="-4" r="2.4" fill="#173d33"/></g></g>
`;

const FOOD_ICON = `
<ellipse cx="0" cy="42" rx="30" ry="4.5" fill="#173d33" opacity=".14"/><path d="M-24 4C-24-26 24-26 24 4" stroke="#b9803c" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="-8" cy="-8" r="14" fill="#8fd17a"/><path d="M-8-22V4M-8-8l-9-8M-8-8l9-8" stroke="#6bb25a" stroke-width="2" fill="none"/><circle cx="14" cy="-6" r="13" fill="#e05b4a"/><path d="M14-19c0-5 3-7 6-8" stroke="#6b4a2b" stroke-width="2.6" fill="none"/><path d="M16-18c4-5 9-4 10-3-1 4-6 6-10 3z" fill="#6dbb63"/><path d="M-30-12L-20-6L-30 14Z" fill="#f08a2c"/><path d="M-27-13l-3-9M-24-11l2-10" stroke="#5fa84f" stroke-width="3" stroke-linecap="round"/><path d="M-34 3h68l-8 33a6 6 0 0 1-6 5H-20a6 6 0 0 1-6-5z" fill="#d9a35f"/><path d="M-31 15h62M-28 26h56M-26 35h52M-14 4l4 37M0 4v37M14 4l-4 37" stroke="#b9803c" stroke-width="2" opacity=".8"/><rect x="-37" y="-1" width="74" height="9" rx="4.5" fill="#c98f4a"/>
`;

const PEOPLE_ICON = `
<ellipse cx="0" cy="42" rx="34" ry="4.5" fill="#173d33" opacity=".14"/><path d="M-36 34c0-14 6-24 14-24s14 10 14 24z" fill="#7fb6d6"/><circle cx="-22" cy="-6" r="9" fill="#f1c9a5"/><path d="M-31-7a9 9 0 0 1 18 0c-6-4-12-4-18 0z" fill="#3b2a20"/><path d="M8 34c0-14 6-24 14-24s14 10 14 24z" fill="#e8b86a"/><circle cx="22" cy="-6" r="9" fill="#c98e62"/><path d="M13-7a9 9 0 0 1 18 0c-6-4-12-4-18 0z" fill="#2a1c15"/><path d="M-13 42c0-13 5-22 13-22s13 9 13 22z" fill="#8fcf8a" stroke="#fff" stroke-width="2.5"/><circle cx="0" cy="8" r="8" fill="#e3b48c" stroke="#fff" stroke-width="2.5"/><path d="M-8 6a8 8 0 0 1 16 0c-5-3-11-3-16 0z" fill="#4a3426"/>
`;

/* ---- Planet: globe (r=85) instead of node circle (r=70) ---------- */
const PLANET_SVG =
  `<svg viewBox="-90 -90 180 180" role="img" aria-label="Planet">` +
  `<defs>${COMMON_DEFS}<linearGradient id="oho-ch-ocean" x1=".18" y1=".08" x2=".84" y2=".94"><stop stop-color="#63c8c1"/><stop offset=".5" stop-color="#21839a"/><stop offset="1" stop-color="#123e68"/></linearGradient><radialGradient id="oho-ch-atmos" cx=".28" cy=".22" r=".82"><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset=".88" stop-color="#c4f3e8" stop-opacity=".25"/><stop offset="1" stop-color="#80d8d1" stop-opacity=".85"/></radialGradient></defs>` +
  `<g clip-path="url(#oho-ch-gc)">` +
  `<circle r="85" fill="url(#oho-ch-ocean)"/>` +
  `<path d="M-60-39l15-13 17 3 8 12 14 4 4 12-10 8-7 18-13 8-8-10-15-3-7-14-13-8 4-11 14-6zM-21 5l13 3 11 15-4 21-11 16-9-12 3-17-9-12zM5-36l18-11 20 7 11 14-10 13-15-3-6 12-12-6-11 6-8-13zM29 8l17-8 14 11-2 18-13 11-14-8-8-13z" fill="#8fb87a"/>` +
  `<path d="M-52-33q12-10 23-2t21 2M-5-28q11-9 24-2t20 1M-43 8q10-7 18 0M17 28q12-8 24 0" fill="none" stroke="#c8d5a2" stroke-width="4" opacity=".62" stroke-linecap="round"/>` +
  `<circle r="85" fill="url(#oho-ch-atmos)"/><ellipse cx="-28" cy="-48" rx="20" ry="5" fill="#fff" opacity=".22" transform="rotate(-35 -28 -48)"/>` +
  `</g>` +
  `<circle r="85" fill="none" stroke="#c4f3e8" stroke-width="2.5" opacity=".85"/>` +
  `</svg>`;

/* ---- Map chapter IDs to full SVG strings --------------------------- */
const CHAPTER_SVGS: Record<string, string> = {
  soil: nodeSvg("Soil", "#efd9b8", "#dfe3d6", "#c9a37a", "scale(1.12)", SOIL_ICON),
  plant: nodeSvg("Plants", "#d3e9c6", "#dfe3d6", "#8fb97d", "scale(1.1)", PLANT_ICON),
  animal: nodeSvg(
    "Animals",
    "#d3dfd3",
    "#dfe3d6",
    "#9db4a6",
    "translate(0 4) scale(1.12)",
    ANIMAL_ICON
  ),
  food: nodeSvg("Food", "#f6dfbb", "#dfe3d6", "#d9b98a", "scale(1.1)", FOOD_ICON),
  people: nodeSvg(
    "People",
    "#d1e3ee",
    "#dfe3d6",
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
