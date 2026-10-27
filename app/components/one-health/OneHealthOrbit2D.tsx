"use client";

import React, { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Scoped CSS — every class / keyframe / id is prefixed with oho-     */
/*  to avoid collisions with the rest of the site.                      */
/* ------------------------------------------------------------------ */
const CSS = `
.oho-root{
  --ink:#17402f;--sage:#86a97a;--line:#a5bd9b;--amber:#a8691f;--cap:#52705f;
  box-sizing:border-box;
}
.oho-root svg{width:100%;max-width:1400px;height:auto;overflow:visible;display:block}
.oho-root svg text{font-family:var(--font-sora),'Sora',system-ui,sans-serif}
.oho-cap{
  margin:10px auto 0;min-height:2.6em;max-width:560px;
  text-align:center;font-family:var(--font-sora),'Sora',system-ui,sans-serif;
  font-size:15px;line-height:1.6;color:var(--cap);transition:opacity .3s;
}
.oho-lbl{font-weight:800;font-size:23px;letter-spacing:.17em;fill:var(--ink)}
.oho-orbit{
  fill:none;stroke:var(--line);stroke-width:2.2;
  stroke-dasharray:1;stroke-dashoffset:1;
  animation:oho-draw 2.4s .1s cubic-bezier(.6,0,.2,1) forwards;
}
@keyframes oho-draw{to{stroke-dashoffset:0}}
.oho-spoke{
  stroke:#b9c9b0;stroke-width:1.6;stroke-dasharray:3 7;stroke-linecap:round;
  animation:oho-flow 1.6s linear infinite;
}
@keyframes oho-flow{to{stroke-dashoffset:-20}}
.oho-node{cursor:pointer}
.oho-pop{transition:transform .45s cubic-bezier(.3,1.6,.5,1)}
.oho-node:hover .oho-pop,.oho-node.on .oho-pop{transform:scale(1.13)}
.oho-halo{fill:none;stroke:var(--sage);stroke-width:2;opacity:0;transform-origin:0 0}
.oho-node:hover .oho-halo,.oho-node.on .oho-halo{animation:oho-ping 1.4s ease-out infinite}
@keyframes oho-ping{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.45)}}
.oho-ink{stroke:#17402f;stroke-width:3;stroke-linejoin:round;stroke-linecap:round}
.oho-rootpath{
  fill:none;stroke:#8a5a1e;stroke-width:2.4;stroke-linecap:round;
  stroke-dasharray:1;animation:oho-grow 4s ease-in-out infinite;
}
@keyframes oho-grow{
  0%{stroke-dashoffset:1}
  45%,85%{stroke-dashoffset:0}
  100%{stroke-dashoffset:-1}
}
.oho-sprout{transform-origin:0 -4px;animation:oho-sp 4s ease-in-out infinite}
@keyframes oho-sp{
  0%{transform:scale(.55)}
  45%,85%{transform:scale(1)}
  100%{transform:scale(.55)}
}
.oho-sway{transform-origin:0 30px;animation:oho-sw 3.6s ease-in-out infinite alternate}
@keyframes oho-sw{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
.oho-bob{animation:oho-bob 2.4s ease-in-out infinite}
@keyframes oho-bob{50%{transform:translateY(-4px)}}
.oho-tail{transform-origin:-26px -2px;animation:oho-wag 1.2s ease-in-out infinite alternate}
@keyframes oho-wag{from{transform:rotate(-14deg)}to{transform:rotate(16deg)}}
.oho-blink{transform-origin:0 0;animation:oho-bl 4s infinite}
@keyframes oho-bl{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}
.oho-land{animation:oho-spin 26s linear infinite}
@keyframes oho-spin{to{transform:translateX(-260px)}}
.oho-ringpulse{transform-origin:800px 305px;animation:oho-rp 4.5s ease-in-out infinite}
@keyframes oho-rp{50%{transform:scale(1.025)}}
.oho-bB{transform-origin:800px 492px;animation:oho-bp 2.2s ease-in-out infinite}
@keyframes oho-bp{50%{transform:scale(1.18)}}
.oho-dz{transform-origin:0 0;animation:oho-dz 22s linear infinite}
@keyframes oho-dz{to{transform:rotate(360deg)}}
.oho-mb{animation:oho-mb 3s ease-in-out infinite}
@keyframes oho-mb{50%{transform:translateY(-4px);opacity:.5}}
.oho-tw{transform-box:fill-box;transform-origin:center;animation:oho-tw 2.4s ease-in-out infinite}
@keyframes oho-tw{50%{transform:scale(1.6) rotate(20deg);opacity:.4}}
.oho-drop{animation:oho-dp 3s ease-in infinite}
@keyframes oho-dp{0%{transform:translateY(-4px);opacity:0}30%{opacity:1}100%{transform:translateY(22px);opacity:0}}
.oho-pu{transform-box:fill-box;transform-origin:center;animation:oho-pu 1.6s ease-in-out infinite}
@keyframes oho-pu{50%{transform:scale(1.18)}}
.oho-blink{transform-box:fill-box;transform-origin:50% 50%}
@media (prefers-reduced-motion:reduce){
  .oho-root *{animation-duration:.01ms!important;animation-iteration-count:1!important}
}
`;

/* ------------------------------------------------------------------ */
/*  SVG markup — identical to the reference design but with oho-       */
/*  prefixed classes and ids.                                           */
/* ------------------------------------------------------------------ */
const SVG_MARKUP = `
<svg viewBox="0 -50 1600 700" role="img" aria-label="One Planet surrounded by soil, plants, animals, food and people. There is no Planet B.">
<defs>
<clipPath id="oho-gc"><circle cx="0" cy="0" r="85"/></clipPath>
<radialGradient id="oho-sh" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#0d2a1e" stop-opacity=".28"/></radialGradient>
<path id="oho-topArc" d="M 652 305 A 148 148 0 0 1 948 305"/>
<path id="oho-botArc" d="M 636 305 A 164 164 0 0 0 964 305"/>
<g id="oho-land">
<path d="M-60 -48C-35 -68 5 -62 20 -42C40 -30 18 -10 30 8C22 40 0 62 -14 44C-24 22 -52 6 -48 -16C-52 -30 -58 -40 -60 -48Z" fill="#86a97a"/>
<path d="M30 -52C60 -62 100 -44 112 -20C118 0 90 10 80 -4C66 -10 48 -20 30 -52Z" fill="#86a97a"/>
<path d="M-118 -10C-100 -22 -86 -6 -90 14C-98 30 -118 22 -118 -10Z" fill="#86a97a"/>
<path d="M60 30C76 22 96 30 92 46C80 58 62 52 60 30Z" fill="#86a97a"/>
</g>
<radialGradient id="oho-shine" cx=".3" cy=".25" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="oho-soilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98a58"/><stop offset="1" stop-color="#7a4f2c"/></linearGradient>
<linearGradient id="oho-leafG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9bd47f"/><stop offset="1" stop-color="#3f8f50"/></linearGradient>
<linearGradient id="oho-leafG2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4e8a2"/><stop offset="1" stop-color="#5fa35a"/></linearGradient>
<linearGradient id="oho-appleG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8f6b"/><stop offset="1" stop-color="#d13f2a"/></linearGradient>
</defs>

<!-- orbit -->
<ellipse class="oho-orbit" cx="800" cy="305" rx="560" ry="235" pathLength="1"/>
<g id="oho-spokes"></g>
<g id="oho-dots"></g>

<!-- centre -->
<g class="oho-ringpulse">
<circle cx="800" cy="305" r="168" fill="#f1f4ec" stroke="#e1e8da" stroke-width="2"/>
<circle cx="800" cy="305" r="136" fill="#17402f"/>
</g>
<text font-family="'Sora',sans-serif" font-weight="800" font-size="20" letter-spacing="3" fill="#17402f"><textPath href="#oho-topArc" startOffset="50%" text-anchor="middle">THERE IS NO</textPath></text>
<text font-family="'Sora',sans-serif" font-weight="800" fill="#a8691f"><textPath href="#oho-botArc" startOffset="50%" text-anchor="middle"><tspan font-size="30">PLAN</tspan><tspan font-size="17">et</tspan></textPath></text>
<text class="oho-bB" x="800" y="505" text-anchor="middle" font-family="'Sora',sans-serif" font-weight="800" font-size="30" fill="#a8691f">B</text>
<g transform="translate(800 285)">
<g clip-path="url(#oho-gc)">
<rect x="-90" y="-90" width="180" height="180" fill="#dbe9e8"/>
<g class="oho-land"><use href="#oho-land"/><use href="#oho-land" x="260"/></g>
<g fill="none" stroke="#9fb9b6" stroke-width="1" opacity=".7"><ellipse rx="85" ry="30"/><ellipse rx="85" ry="62"/><ellipse rx="40" ry="85"/><path d="M-85 0H85M0 -85V85"/></g>
<circle r="85" fill="url(#oho-sh)"/>
</g>
<circle r="85" fill="none" stroke="#c9dad7" stroke-width="2"/>
</g>
<text x="800" y="414" text-anchor="middle" font-family="'Sora',sans-serif" font-weight="700" font-size="19" letter-spacing="4.2" fill="#fff">ONE PLANET</text>

<!-- nodes -->
<g id="oho-nodes">

<g class="oho-node" data-k="soil"><text class="oho-lbl" text-anchor="middle" dominant-baseline="middle">SOIL</text>
<g class="oho-body"><circle class="oho-halo" r="70"/><g class="oho-pop"><circle r="70" fill="#f6e9dc" stroke="#e2d8c9" stroke-width="2"/><circle r="70" fill="url(#oho-shine)"/><circle class="oho-dz" r="62" fill="none" stroke="#c9a37a" stroke-width="1.6" stroke-dasharray="2 8" stroke-linecap="round"/>
<g class="oho-ic" transform="scale(1.12)">
<rect x="-30" y="-2" width="60" height="38" rx="6" fill="url(#oho-soilG)" class="oho-ink"/>
<path d="M-30 12Q-15 6 0 12T30 12M-30 24Q-15 18 0 24T30 24" fill="none" stroke="#6b4527" stroke-width="1.6" opacity=".6"/>
<path d="M-30 4Q-26 -4-20 -2Q-14 -8-8 -2Q0 -8 8 -2Q16 -8 22 -2Q28 -4 30 4V-2H-30Z" fill="#6fae57" class="oho-ink" stroke-width="2.2"/>
<path class="oho-rootpath" pathLength="1" d="M0 -2V10M0 10L-12 22M0 10L10 20M-12 22L-21 20M-12 22L-8 31M10 20L21 17"/>
<circle class="oho-mb" cx="-20" cy="10" r="2.6" fill="#b6f09a"/><circle class="oho-mb" style="animation-delay:-1s" cx="20" cy="8" r="2.6" fill="#b6f09a"/><circle class="oho-mb" style="animation-delay:-2s" cx="14" cy="28" r="2.4" fill="#b6f09a"/><circle cx="-22" cy="28" r="3" fill="#a07a52"/>
<g class="oho-sprout"><path d="M0 -2V-24" class="oho-ink"/><path d="M0 -24C-4 -40-24 -40-26 -34C-24 -22-8 -20 0 -24Z" fill="url(#oho-leafG)" class="oho-ink" stroke-width="2.4"/><path d="M0 -26C2 -40 16 -46 26 -40C24 -28 8 -24 0 -26Z" fill="url(#oho-leafG2)" class="oho-ink" stroke-width="2.4"/><path d="M-4 -26L-18 -33M4 -28L16 -37" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".7"/></g>
</g></g></g></g>

<g class="oho-node" data-k="plants"><text class="oho-lbl" text-anchor="middle" dominant-baseline="middle">PLANTS</text>
<g class="oho-body"><circle class="oho-halo" r="70"/><g class="oho-pop"><circle r="70" fill="#e8f0dc" stroke="#d3dfc3" stroke-width="2"/><circle r="70" fill="url(#oho-shine)"/><circle class="oho-dz" r="62" fill="none" stroke="#8fb97d" stroke-width="1.6" stroke-dasharray="2 8" stroke-linecap="round"/>
<g class="oho-ic" transform="scale(1.1)">
<ellipse cx="0" cy="32" rx="26" ry="5" fill="#b9d3a6"/>
<g class="oho-sway"><path d="M0 32C-2 18 2 6 0 -6" fill="none" class="oho-ink"/>
<path d="M0 12C-4 -4-18-12-34-10C-32 8-16 18 0 12Z" fill="url(#oho-leafG2)" class="oho-ink"/><path d="M-4 8C-14 2-22-2-28-6" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
<path d="M0 2C2-18 16-32 36-30C38-10 22 4 0 2Z" fill="url(#oho-leafG)" class="oho-ink"/><path d="M6-2C16-10 24-18 30-26" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
<path d="M0-6C-8-18-6-30 0-38C6-30 8-18 0-6Z" fill="#c5e6a8" class="oho-ink" stroke-width="2.4"/>
<path class="oho-drop" d="M20-4q-5 8 0 11q5-3 0-11z" fill="#8fd3f0" stroke="#17402f" stroke-width="1.6"/></g>
<g fill="#ffd96b"><path class="oho-tw" d="M-30-26l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path class="oho-tw" style="animation-delay:-1.2s" d="M32 14l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/></g>
</g></g></g></g>

<g class="oho-node" data-k="animals"><text class="oho-lbl" text-anchor="middle" dominant-baseline="middle">ANIMALS</text>
<g class="oho-body"><circle class="oho-halo" r="70"/><g class="oho-pop"><circle r="70" fill="#e8eeea" stroke="#d3ddd6" stroke-width="2"/><circle r="70" fill="url(#oho-shine)"/><circle class="oho-dz" r="62" fill="none" stroke="#9db4a6" stroke-width="1.6" stroke-dasharray="2 8" stroke-linecap="round"/>
<g class="oho-ic" transform="translate(0 4) scale(1.12)">
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
</g></g></g></g>

<g class="oho-node" data-k="food"><text class="oho-lbl" text-anchor="middle" dominant-baseline="middle">FOOD</text>
<g class="oho-body"><circle class="oho-halo" r="70"/><g class="oho-pop"><circle r="70" fill="#f8ecdb" stroke="#ecdcc3" stroke-width="2"/><circle r="70" fill="url(#oho-shine)"/><circle class="oho-dz" r="62" fill="none" stroke="#d9b98a" stroke-width="1.6" stroke-dasharray="2 8" stroke-linecap="round"/>
<g class="oho-ic" transform="scale(1.1)">
<g class="oho-bob"><path d="M-22 0L-30-22Q-26-26-22-22Z" fill="#f08a2a" class="oho-ink" stroke-width="2.4"/><path d="M-26-24l-5-8M-26-24l2-9M-26-24l7-5" stroke="#5f8e57" stroke-width="2.6" stroke-linecap="round"/></g>
<g class="oho-bob" style="animation-delay:.5s"><path d="M12-22C-4-26-6-4 4-2C8 0 14 -2 20-2C30-4 28-24 12-22Z" fill="url(#oho-appleG)" class="oho-ink" stroke-width="2.6"/><path d="M12-22Q12-30 18-32" fill="none" class="oho-ink" stroke-width="2.4"/><path d="M14-30C20-36 28-34 28-34C26-28 20-26 14-30Z" fill="#6fae57" class="oho-ink" stroke-width="2"/><path d="M4-14Q5-8 8-6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".75"/></g>
<g class="oho-bob" style="animation-delay:1s"><circle cx="28" cy="-6" r="8" fill="#e5533a" class="oho-ink" stroke-width="2.4"/><path d="M24-12l4 3 4-3" stroke="#2f7a45" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>
<path d="M-32-4H32L26 32H-26Z" fill="#f3d08a" class="oho-ink"/>
<path d="M-29 8H29M-27 20H27M-16-4L-13 32M0-4V32M16-4L13 32" fill="none" stroke="#a8691f" stroke-width="2"/><path d="M-36-4H36" class="oho-ink" stroke-width="4"/>
</g></g></g></g>

<g class="oho-node" data-k="people"><text class="oho-lbl" text-anchor="middle" dominant-baseline="middle">PEOPLE</text>
<g class="oho-body"><circle class="oho-halo" r="70"/><g class="oho-pop"><circle r="70" fill="#e5eef0" stroke="#d1dfe2" stroke-width="2"/><circle r="70" fill="url(#oho-shine)"/><circle class="oho-dz" r="62" fill="none" stroke="#8fb3b9" stroke-width="1.6" stroke-dasharray="2 8" stroke-linecap="round"/>
<g class="oho-ic" transform="translate(0 4) scale(1.12)">
<path class="oho-pu" d="M0-30c-5-10-20-4-12 8l12 12 12-12c8-12-7-18-12-8z" fill="#e5533a" class="oho-ink" stroke="#17402f" stroke-width="2.2"/>
<g class="oho-bob"><circle cx="-20" cy="-8" r="8" fill="#fff3dc" class="oho-ink"/><circle cx="-23" cy="-9" r="1.2" fill="#17402f"/><circle cx="-17" cy="-9" r="1.2" fill="#17402f"/><path d="M-23-5Q-20-2-17-5" fill="none" stroke="#17402f" stroke-width="1.4" stroke-linecap="round"/></g>
<path d="M-36 30V12C-36 4-30 2-20 2C-10 2-6 4-6 12V30Z" fill="#7fb6c2" class="oho-ink"/>
<g class="oho-bob" style="animation-delay:.6s"><circle cx="20" cy="-8" r="8" fill="#fff3dc" class="oho-ink"/><circle cx="17" cy="-9" r="1.2" fill="#17402f"/><circle cx="23" cy="-9" r="1.2" fill="#17402f"/><path d="M17-5Q20-2 23-5" fill="none" stroke="#17402f" stroke-width="1.4" stroke-linecap="round"/></g>
<path d="M36 30V12C36 4 30 2 20 2C10 2 6 4 6 12V30Z" fill="#e3b35c" class="oho-ink"/>
<g class="oho-bob" style="animation-delay:.3s"><circle cx="0" cy="8" r="8.5" fill="#fff3dc" class="oho-ink"/><circle cx="-3" cy="7" r="1.2" fill="#17402f"/><circle cx="3" cy="7" r="1.2" fill="#17402f"/><path d="M-3 11Q0 14 3 11" fill="none" stroke="#17402f" stroke-width="1.4" stroke-linecap="round"/></g>
<path d="M-13 34V22C-13 17-9 17 0 17C9 17 13 17 13 22V34Z" fill="#8fc67a" class="oho-ink"/>
</g></g></g></g>

</g>
</svg>
`;

/* ------------------------------------------------------------------ */
/*  Captions shown under the diagram when a node is hovered / tapped   */
/* ------------------------------------------------------------------ */
const FACTS: Record<string, string> = {
  soil: "Healthy soil feeds everything else. It holds water, carbon and billions of living organisms.",
  plants: "Plants turn sunlight into food and oxygen, and they hold the soil together.",
  animals: "Animals turn plant matter into milk, eggs and meat, and return nutrients to the land.",
  food: "Food is where the cycle reaches the table: what grows well here feeds us all.",
  people: "People tend the land, raise the animals and decide what the next harvest looks like.",
};

const ORDER = ["soil", "plants", "animals", "food", "people"];
const DEFAULT_CAPTION = "Hover or tap a circle to pause the orbit.";

const CX = 800;
const CY = 305;
const RX = 560;
const RY = 235;
const R = 70;
const SVG_NS = "http://www.w3.org/2000/svg";

/** Overshoot / back-ease used for the node pop-in. */
function backEase(q: number): number {
  const c = 1.7;
  return 1 + (c + 1) * Math.pow(q - 1, 3) + c * Math.pow(q - 1, 2);
}

interface NodeData {
  k: string;
  g: SVGGElement;
  body: SVGGElement;
  lbl: SVGTextElement;
  w: number;
  base: number;
  line: SVGLineElement | null;
  dot: SVGCircleElement | null;
}

export default function OneHealthOrbit2D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const svg = wrap.querySelector("svg");
    if (!svg) return;

    const spokesGroup = wrap.querySelector("#oho-spokes") as SVGGElement | null;
    const dotsGroup = wrap.querySelector("#oho-dots") as SVGGElement | null;
    if (!spokesGroup || !dotsGroup) return;

    // ---- Collect node references ---------------------------------------
    const nodes: NodeData[] = ORDER.map((k, i) => {
      const g = wrap.querySelector(`.oho-node[data-k="${k}"]`) as SVGGElement;
      return {
        k,
        g,
        body: g.querySelector(".oho-body") as SVGGElement,
        lbl: g.querySelector(".oho-lbl") as SVGTextElement,
        w: 110,
        base: i * 72 - 90,
        line: null as SVGLineElement | null,
        dot: null as SVGCircleElement | null,
      };
    });

    // ---- Create spoke lines + orbit dots imperatively ------------------
    nodes.forEach((n) => {
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("class", "oho-spoke");
      line.setAttribute("x1", String(CX));
      line.setAttribute("y1", String(CY));
      spokesGroup.appendChild(line);
      n.line = line;

      const dot = document.createElementNS(SVG_NS, "circle");
      dot.setAttribute("r", "6");
      dot.setAttribute("fill", "#6f9d5e");
      dotsGroup.appendChild(dot);
      n.dot = dot;
    });

    // ---- Re-measure label widths once webfonts are ready ----------------
    const meas = () => {
      nodes.forEach((n) => {
        try {
          const w = n.lbl.getComputedTextLength();
          if (w) n.w = w;
        } catch {
          /* ignore */
        }
      });
    };
    meas();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(meas).catch(() => {});
    }

    // ---- Caption helper (direct DOM update, no re-render) --------------
    const setCap = (text: string) => {
      if (capRef.current) capRef.current.textContent = text;
    };

    // ---- Animation state ----------------------------------------------
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    let target = reduce ? 0 : 7;
    let speed = reduce ? 0 : 7;
    let ang = 0;
    let last = 0;
    let t0 = 0;

    // ---- Hover / tap handlers -----------------------------------------
    const handlers: Array<{
      enter: () => void;
      leave: () => void;
      click: () => void;
    }> = [];

    nodes.forEach((n) => {
      const enter = () => {
        n.g.classList.add("on");
        target = 0;
        setCap(FACTS[n.k] ?? DEFAULT_CAPTION);
      };
      const leave = () => {
        n.g.classList.remove("on");
        target = reduce ? 0 : 7;
        setCap(DEFAULT_CAPTION);
      };
      const click = () => {
        if (n.g.classList.contains("on")) {
          leave();
        } else {
          nodes.forEach((m) => m.g.classList.remove("on"));
          enter();
        }
      };

      n.g.addEventListener("mouseenter", enter);
      n.g.addEventListener("mouseleave", leave);
      n.g.addEventListener("click", click);
      handlers.push({ enter, leave, click });
    });

    // ---- Animation loop -----------------------------------------------
    let rafId = 0;

    const frame = (ts: number) => {
      if (!t0) {
        t0 = ts;
        last = ts;
      }
      const dt = Math.min((ts - last) / 1000, 0.05);
      const t = (ts - t0) / 1000;
      last = ts;

      speed += (target - speed) * Math.min(1, dt * 4);
      ang += speed * dt;

      const p = Math.min(t / 2.4, 1);
      const spin = reduce ? 0 : Math.pow(1 - p, 3) * 140;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const th = (n.base + ang + spin) * (Math.PI / 180);
        const c = Math.cos(th);
        const s = Math.sin(th);
        const x = CX + RX * c;
        const y = CY + RY * s;

        let q = Math.max(0, Math.min(1, (t - 0.5 - i * 0.14) / 0.6));
        if (reduce) q = 1;
        const sc = q >= 1 ? 1 : backEase(q);

        n.body.setAttribute(
          "transform",
          `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${Math.max(sc, 0.001).toFixed(3)})`
        );

        // Label sits outward in a fixed radial direction — never swaps sides
        const lx = x + c * (R + 16 + n.w / 2);
        const ly = y + s * (R + 26);
        n.lbl.setAttribute("x", lx.toFixed(1));
        n.lbl.setAttribute("y", ly.toFixed(1));
        n.lbl.style.opacity = String(q);

        // Spoke line from centre toward node
        const dx = x - CX;
        const dy = y - CY;
        const L = Math.hypot(dx, dy) || 1;
        const a = 172 / L;
        const b = (R + 4) / L;
        n.line!.setAttribute("x1", (CX + dx * a).toFixed(1));
        n.line!.setAttribute("y1", (CY + dy * a).toFixed(1));
        n.line!.setAttribute("x2", (x - dx * b).toFixed(1));
        n.line!.setAttribute("y2", (y - dy * b).toFixed(1));
        n.line!.style.opacity = String(q * 0.9);

        // Orbit dot just ahead of the node
        const th2 = th + (36 * Math.PI) / 180;
        n.dot!.setAttribute("cx", (CX + RX * Math.cos(th2)).toFixed(1));
        n.dot!.setAttribute("cy", (CY + RY * Math.sin(th2)).toFixed(1));
        n.dot!.style.opacity = String(p);
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    // ---- Cleanup ------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      nodes.forEach((n, i) => {
        n.g.removeEventListener("mouseenter", handlers[i].enter);
        n.g.removeEventListener("mouseleave", handlers[i].leave);
        n.g.removeEventListener("click", handlers[i].click);
        // remove dynamically-created spokes / dots
        n.line?.remove();
        n.dot?.remove();
      });
    };
  }, []);

  return (
    <div ref={wrapRef} className="oho-root w-full flex flex-col items-center justify-center">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="w-full" dangerouslySetInnerHTML={{ __html: SVG_MARKUP }} />
      <p ref={capRef} className="oho-cap" aria-live="polite">
        {DEFAULT_CAPTION}
      </p>
    </div>
  );
}
