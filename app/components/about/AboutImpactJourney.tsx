"use client";

import React, { useEffect, useRef } from "react";

export default function AboutImpactJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const rafRef     = useRef<number | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const svg     = svgRef.current;
    if (!section || !svg) return;
    const sectionEl = section;

    /* ── helpers ─────────────────────────────────────── */
    const NS  = "http://www.w3.org/2000/svg";
    const D2R = Math.PI / 180;
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let animationObserver: IntersectionObserver | null = null;
    const haloRafIds: number[] = [];
    let replayEl: HTMLElement | null = null;
    let replayHandler: (() => void) | null = null;

    function e(tag: string, attrs: Record<string, string | number>, parent?: Element) {
      const el = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
      if (parent) parent.appendChild(el);
      return el;
    }
    function pt(cx: number, cy: number, r: number, deg: number): [number, number] {
      return [cx + r * Math.cos(deg * D2R), cy + r * Math.sin(deg * D2R)];
    }
    function mid(a: number, b: number) { return (a + b) / 2; }

    function sectorD(cx: number, cy: number, ro: number, ri: number, a0: number, a1: number, gap = 2) {
      const s = a0 + gap, en = a1 - gap;
      const [x0,y0] = pt(cx,cy,ro,s), [x1,y1] = pt(cx,cy,ro,en);
      const [x2,y2] = pt(cx,cy,ri,en), [x3,y3] = pt(cx,cy,ri,s);
      const lg = (en-s) > 180 ? 1 : 0;
      return `M${x0},${y0} A${ro},${ro} 0 ${lg},1 ${x1},${y1} L${x2},${y2} A${ri},${ri} 0 ${lg},0 ${x3},${y3} Z`;
    }
    function innerArcD(cx: number, cy: number, ri: number, a0: number, a1: number) {
      const s = a0+5, en = a1-5, r = ri+7;
      const [x0,y0] = pt(cx,cy,r,s), [x1,y1] = pt(cx,cy,r,en);
      const lg = (en-s) > 180 ? 1 : 0;
      return `M${x0},${y0} A${r},${r} 0 ${lg},1 ${x1},${y1}`;
    }
    function outArcD(cx: number, cy: number, ro: number, a0: number, a1: number) {
      const [x0,y0] = pt(cx,cy,ro,a0), [x1,y1] = pt(cx,cy,ro,a1);
      const lg = (a1-a0) > 180 ? 1 : 0;
      return `M${x0},${y0} A${ro},${ro} 0 ${lg},1 ${x1},${y1}`;
    }

    const RO = 120, RI = 58;
    const RINGS = [
      { cx:490, cy:380, type:"bowl", oe:14 },
      { cx:680, cy:348, type:"hill", oe:24 },
      { cx:870, cy:380, type:"bowl", oe:14 },
    ];

    const BOXES: {
      ring:number; s:number; e:number; rg:string; year:string; icon:string;
      desc:string[]; dir:"left"|"right"|"above"|"below"; lx:number; ly:number; dotFrac:number;
    }[] = [
      { ring:0, s:120, e:180, rg:"jrg0", year:"2014", icon:"leaf",
        desc:["Establishment and manufacturing of","Biofertilizers in AP & TG"],
        dir:"left",  lx:282, ly:360, dotFrac:0.92 },
      { ring:0, s:60,  e:120, rg:"jrg1", year:"2016", icon:"hen",
        desc:["Entered into poultry segments &","Manufacturing of micron sized nutrients"],
        dir:"below", lx:490, ly:558, dotFrac:0.5 },
      { ring:0, s:0,   e:60,  rg:"jrg2", year:"2017", icon:"fish",
        desc:["Started Aqua Division"],
        dir:"below", lx:596, ly:540, dotFrac:0.12 },
      { ring:1, s:180, e:230, rg:"jrg3", year:"2018", icon:"flask",
        desc:["AADHAAR R&D centre","recognised by DSIR"],
        dir:"left",  lx:468, ly:248, dotFrac:0.78 },
      { ring:1, s:230, e:310, rg:"jrg4", year:"2019", icon:"cow",
        desc:["Started manufacturing of","large animals feed supplements"],
        dir:"above", lx:680, ly:128, dotFrac:0.5 },
      { ring:1, s:310, e:360, rg:"jrg5", year:"2020", icon:"pins",
        desc:["Started business expansion","in MH, KA and TN"],
        dir:"right", lx:902, ly:248, dotFrac:0.22 },
      { ring:2, s:120, e:180, rg:"jrg6", year:"2022", icon:"magnify",
        desc:["Research collaboration with","IIHR, IIOR, ANGRAU"],
        dir:"below", lx:840, ly:555, dotFrac:0.92 },
      { ring:2, s:60,  e:120, rg:"jrg7", year:"2023", icon:"ladybug",
        desc:["Research collaboration with CIRCOT","& Started Biocontrols division"],
        dir:"below", lx:940, ly:572, dotFrac:0.5 },
      { ring:2, s:0,   e:60,  rg:"jrg8", year:"2024", icon:"tractor",
        desc:["Operation in 16 states"],
        dir:"right", lx:1090, ly:360, dotFrac:0.12 },
    ];

    /* ── gradients ───────────────────────────────────── */
    const gradColors = [
      ["#b8ecbc","#2f9444"], ["#fde99a","#d98518"], ["#c4f2c8","#32a057"],
      ["#aaedcc","#259a62"], ["#f0f0a0","#8fa020"], ["#ccf2b0","#3fa043"],
      ["#a4eece","#23946a"], ["#fde5b0","#c2701a"], ["#fef3b0","#d89a1e"],
    ];
    const defs = svg.querySelector("defs")!;
    svg.replaceChildren(defs);
    defs.replaceChildren();
    gradColors.forEach(([c0,c1], i) => {
      const rg = e("radialGradient", { id:`jrg${i}`, cx:"50%", cy:"50%", r:"65%" }, defs);
      e("stop", { offset:"0%",   "stop-color":c0 }, rg);
      e("stop", { offset:"100%", "stop-color":c1 }, rg);
    });

    /* ── bg ──────────────────────────────────────────── */
    e("rect", { x:0, y:0, width:1300, height:680, fill:"#e3f1df" }, svg);

    /* ── outline arcs ────────────────────────────────── */
    for (const rg of RINGS) {
      const [a0,a1] = rg.type === "bowl" ? [0,180] : [180,360];
      e("path", { d:outArcD(rg.cx,rg.cy,RO+rg.oe,a0,a1), fill:"none", stroke:"#3f9a52", "stroke-width":1.4, opacity:0.5 }, svg);
    }

    /* ── illustration helper ─────────────────────────── */
    const IFS = "rgba(255,255,240,0.18)";
    const IST = "rgba(255,255,240,0.92)";
    const SW  = 2.4;

    function illus(parent: Element, icon: string) {
      const add = (tag: string, a: Record<string,string|number>) =>
        e(tag, { fill:IFS, stroke:IST, "stroke-width":SW, ...a }, parent);
      const ln  = (x1:number,y1:number,x2:number,y2:number,extra:Record<string,string|number>={}) =>
        e("line", { x1,y1,x2,y2, stroke:IST, "stroke-width":SW, fill:"none", ...extra }, parent);
      const ci  = (cx:number,cy:number,r:number,extra:Record<string,string|number>={}) =>
        e("circle", { cx,cy,r, fill:IFS, stroke:IST, "stroke-width":SW, ...extra }, parent);
      const pa  = (d:string, extra:Record<string,string|number>={}) =>
        e("path", { d, fill:IFS, stroke:IST, "stroke-width":SW, ...extra }, parent);

      if (icon === "leaf") {
        add("ellipse",{cx:0,cy:0,rx:13,ry:19,transform:"rotate(-20)"});
        ln(0,-19,0,17,{transform:"rotate(-20)","stroke-width":1.4,opacity:0.7});
        ln(0,-6,7,1,  {transform:"rotate(-20)","stroke-width":1.2,opacity:0.6});
        ln(0,4,-6,9,  {transform:"rotate(-20)","stroke-width":1.2,opacity:0.6});
        for (const [dx,dy] of [[-17,9],[17,4],[-10,-13]]) {
          e("circle",{cx:dx,cy:dy,r:3.2,fill:"none",stroke:IST,"stroke-width":1.4},parent);
          e("circle",{cx:dx,cy:dy,r:0.9,fill:IST},parent);
        }
      } else if (icon === "hen") {
        add("ellipse",{cx:2,cy:2,rx:14,ry:11});
        ci(16,-10,7);
        pa("M13,-17 Q16,-22 18,-17 Q20,-22 22,-17");
        add("polygon",{points:"22,-10 28,-12 22,-8","stroke-width":1.4});
        pa("M-12,-2 Q-22,-14 -18,-3 Q-24,-8 -16,4",{fill:"none"});
        e("circle",{cx:18,cy:-11,r:1.8,fill:IST},parent);
      } else if (icon === "fish") {
        add("ellipse",{cx:0,cy:-2,rx:18,ry:10});
        pa("M-18,-6 Q-28,-2 -18,4");
        e("circle",{cx:12,cy:-4,r:2.2,fill:IST},parent);
        pa("M0,-12 Q5,-18 10,-12",{fill:"none"});
        pa("M-24,12 Q-18,7 -12,12 Q-6,7 0,12 Q6,7 12,12 Q18,7 24,12",{fill:"none","stroke-width":1.7,opacity:0.75});
      } else if (icon === "flask") {
        pa("M-6,-20 L-6,0 L-18,18 L18,18 L6,0 L6,-20 Z");
        ln(-8,-20,8,-20);
        for (const [bx,by] of [[-8,6],[2,12],[7,4]])
          e("circle",{cx:bx,cy:by,r:2.8,fill:"none",stroke:IST,"stroke-width":1.4,opacity:0.8},parent);
      } else if (icon === "cow") {
        add("ellipse",{cx:0,cy:4,rx:18,ry:15});
        pa("M-14,-12 Q-22,-26 -8,-20",{fill:"none"});
        pa("M14,-12 Q22,-26 8,-20",{fill:"none"});
        add("ellipse",{cx:-22,cy:-4,rx:5,ry:7,"stroke-width":1.7});
        add("ellipse",{cx:22,cy:-4,rx:5,ry:7,"stroke-width":1.7});
        e("circle",{cx:-7,cy:0,r:2.8,fill:"none",stroke:IST,"stroke-width":1.4},parent);
        e("circle",{cx:7, cy:0,r:2.8,fill:"none",stroke:IST,"stroke-width":1.4},parent);
        add("ellipse",{cx:-5,cy:11,rx:3.5,ry:2.5,"stroke-width":1.4});
        add("ellipse",{cx:5, cy:11,rx:3.5,ry:2.5,"stroke-width":1.4});
      } else if (icon === "pins") {
        ci(0,-14,8); pa("M0,-6 L0,10",{fill:"none"});
        e("ellipse",{cx:0,cy:14,rx:7,ry:3,fill:"none",stroke:IST,"stroke-width":1.3,opacity:0.6},parent);
        ci(-18,-5,5,{"stroke-width":1.7}); pa("M-18,0 L-18,11",{fill:"none","stroke-width":1.7});
        ci(18,-8,5, {"stroke-width":1.7}); pa("M18,-3 L18,8",  {fill:"none","stroke-width":1.7});
      } else if (icon === "magnify") {
        ci(-4,-4,13);
        ln(6,6,18,18,{"stroke-width":SW+0.6});
        e("ellipse",{cx:-4,cy:-4,rx:6,ry:9,fill:"none",stroke:IST,"stroke-width":1.4,transform:"rotate(-15,-4,-4)"},parent);
        ln(-4,-13,-4,5,{transform:"rotate(-15,-4,-4)","stroke-width":1.2,opacity:0.75});
      } else if (icon === "ladybug") {
        add("ellipse",{cx:0,cy:3,rx:13,ry:15});
        ci(0,-16,6);
        ln(0,-13,0,18);
        for (const [sx,sy] of [[-5,0],[5,0],[-5,10],[5,10]])
          e("circle",{cx:sx,cy:sy,r:3,fill:"none",stroke:IST,"stroke-width":1.4},parent);
        pa("M-4,-21 Q-10,-29 -6,-35",{fill:"none","stroke-width":1.5});
        pa("M4,-21 Q10,-29 6,-35",   {fill:"none","stroke-width":1.5});
        e("circle",{cx:-6,cy:-35,r:1.8,fill:IST},parent);
        e("circle",{cx:6, cy:-35,r:1.8,fill:IST},parent);
      } else if (icon === "tractor") {
        e("rect",{x:-20,y:-14,width:36,height:22,rx:4,fill:IFS,stroke:IST,"stroke-width":SW},parent);
        e("rect",{x:-8, y:-24,width:20,height:14,rx:3,fill:IFS,stroke:IST,"stroke-width":SW},parent);
        e("circle",{cx:-10,cy:16,r:15,fill:"none",stroke:IST,"stroke-width":SW},parent);
        e("circle",{cx:-10,cy:16,r:6, fill:"none",stroke:IST,"stroke-width":1.3},parent);
        e("circle",{cx:20, cy:16,r:9, fill:"none",stroke:IST,"stroke-width":SW},parent);
        ln(-28,31,34,31,{"stroke-width":1.5,opacity:0.55});
      }
    }

    function gearPath() {
      let d = "";
      for (let i = 0; i < 10; i++) {
        const a = (i/10)*Math.PI*2;
        const ps: [number,number][] = [
          [19*Math.cos(a),       19*Math.sin(a)],
          [25*Math.cos(a+0.17),  25*Math.sin(a+0.17)],
          [25*Math.cos(a+0.26),  25*Math.sin(a+0.26)],
          [19*Math.cos(a+0.43),  19*Math.sin(a+0.43)],
        ];
        d += (i===0?"M":"L") + ps.map(p=>`${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" L");
      }
      return d+"Z";
    }

    /* ── boxes ───────────────────────────────────────── */
    interface BoxState {
      hoverG: SVGElement; bloomG: SVGElement; iG: SVGElement;
      hitPath: SVGElement; lblG: SVGElement; leaderLine: SVGElement;
      lineLen: number; sPath: SVGElement; yearT: SVGElement;
      cx: number; cy: number; s: number; en: number;
    }
    const BSTATE: BoxState[] = [];

    for (let bi = 0; bi < BOXES.length; bi++) {
      const box  = BOXES[bi];
      const ring = RINGS[box.ring];
      const { cx, cy } = ring;
      const { s, e: en, rg, year, icon, desc, dir, lx, ly, dotFrac } = box;

      const outerG  = e("g", {}, svg);
      const hoverG  = e("g", {}, outerG);
      hoverG.style.transformOrigin = `${cx}px ${cy}px`;

      const bloomG  = e("g", {}, hoverG);
      const bStyle  = bloomG.style;
      bStyle.transformOrigin = `${cx}px ${cy}px`;
      bStyle.opacity   = "0";
      bStyle.transform = `scale(0) rotate(${mid(s,en)>180?-14:14}deg)`;

      const sd     = sectorD(cx,cy,RO,RI,s,en);
      const sPath  = e("path", { d:sd, fill:`url(#${rg})` }, bloomG);

      // texture circles
      const m = mid(s,en), mr = (RO+RI)/2;
      for (const [da,dr] of [[-14,mr+12],[14,mr-10],[0,mr+2],[-24,RI+22]]) {
        const [px,py] = pt(cx,cy,dr,m+da);
        e("circle",{cx:px,cy:py,r:8.5,fill:"rgba(255,255,255,0.17)"},bloomG);
      }

      e("path",{d:innerArcD(cx,cy,RI,s,en),fill:"none",stroke:"rgba(255,255,255,0.5)","stroke-width":1.4,"stroke-linecap":"round"},bloomG);

      const [ix,iy] = pt(cx,cy,mr,m);
      const iG = e("g",{transform:`translate(${ix.toFixed(1)},${iy.toFixed(1)})`},bloomG);
      iG.style.opacity = "0";
      illus(iG, icon);

      // hit area (added to svg root after all layers)
      const hitPath = e("path",{
        d:sd, fill:"transparent", stroke:"transparent", "stroke-width":10,
        tabindex:"0", "aria-label":`${year}: ${desc.join(" ")}`
      });
      hitPath.classList.add("j-hit");

      // label group
      const lblG = e("g",{ tabindex:"0","aria-label":`${year}: ${desc.join(" ")}` },svg);
      lblG.classList.add("j-lbl");
      lblG.style.opacity = "0";

      const dotR  = RI + (RO-RI)*dotFrac;
      const [dotX,dotY] = pt(cx,cy,dotR,m);
      const lineLen = Math.hypot(lx-dotX, ly-dotY);

      e("circle",{cx:dotX,cy:dotY,r:3,fill:"#14702f"},lblG);
      const leaderLine = e("line",{x1:dotX,y1:dotY,x2:lx,y2:ly,stroke:"#3f9a52","stroke-width":1,opacity:0.7},lblG);
      leaderLine.style.strokeDasharray  = String(lineLen);
      leaderLine.style.strokeDashoffset = String(lineLen);

      const LW   = (dir==="left"||dir==="right") ? 168 : (desc.length===1?116:150);
      const textX = dir==="left" ? lx-LW/2 : dir==="right" ? lx+LW/2 : lx;
      const yearY = dir==="above" ? ly-26 : ly+8;

      const yearT = e("text",{
        x:textX, y:yearY, "text-anchor":"middle",
        "font-family":"'Poppins',system-ui,sans-serif",
        "font-size":18, "font-weight":700, fill:"#14702f"
      },lblG);
      yearT.textContent = year;

      desc.forEach((line,li) => {
        const dt = e("text",{
          x:textX, y:yearY+17+li*14, "text-anchor":"middle",
          "font-family":"'Poppins',system-ui,sans-serif",
          "font-size":11, fill:"#4a5c4e"
        },lblG);
        dt.textContent = line;
      });

      BSTATE.push({ hoverG, bloomG, iG, hitPath, lblG, leaderLine,
        lineLen, sPath, yearT,
        cx, cy, s, en });
    }

    // Append hit areas on top
    for (const bs of BSTATE) svg.appendChild(bs.hitPath);

    /* ── gears ───────────────────────────────────────── */
    const GEARS: SVGElement[] = [];
    for (let i = 0; i < RINGS.length; i++) {
      const { cx, cy } = RINGS[i];
      const posG  = e("g",{transform:`translate(${cx},${cy})`},svg);
      const animG = e("g",{},posG);
      animG.style.transformOrigin = "0px 0px";
      animG.style.transform  = "scale(0.08)";
      animG.style.opacity    = "0";

      const halo = e("circle",{cx:0,cy:0,r:36,fill:"rgba(20,112,47,0.18)"},animG);
      const ph0 = i*(Math.PI*2/3);
      let ph = ph0;
      const haloTick = () => {
        if (disposed) return;
        ph += 0.017;
        const frac = (Math.sin(ph)+1)/2;
        halo.setAttribute("opacity",(0.28+0.38*frac).toFixed(3));
        halo.setAttribute("r",(33+5*frac).toFixed(2));
        haloRafIds[i] = requestAnimationFrame(haloTick);
      };
      haloRafIds[i] = requestAnimationFrame(haloTick);

      e("circle",{cx:0,cy:0,r:30,fill:"#14702f"},animG);

      const spinG = e("g",{},animG);
      spinG.style.transformOrigin = "0px 0px";
      spinG.style.animation = i%2===0
        ? "jGearCW 8s linear infinite"
        : "jGearCCW 8s linear infinite";
      e("path",{d:gearPath(),fill:"none",stroke:"rgba(255,255,255,0.68)","stroke-width":1.3},spinG);

      e("ellipse",{cx:0,cy:0,rx:6,ry:9,fill:"none",stroke:"#b0f4be","stroke-width":1.4,transform:"rotate(-20)"},animG);
      e("line",{x1:0,y1:-9,x2:0,y2:8,stroke:"#b0f4be","stroke-width":1,transform:"rotate(-20)",opacity:0.85},animG);

      GEARS.push(animG);
    }

    /* ── seed + vine ─────────────────────────────────── */
    const vineEl = e("path",{d:"",fill:"none",stroke:"#3f9a52","stroke-width":2.2,"stroke-linecap":"round","stroke-linejoin":"round",opacity:0.72},svg);
    const seedG  = e("g",{transform:"translate(-100,-100)"},svg);
    e("circle",{cx:0,cy:0,r:5.5,fill:"white",stroke:"#3f9a52","stroke-width":1.8},seedG);
    e("ellipse",{cx:0,cy:0,rx:2.4,ry:3.8,fill:"none",stroke:"rgba(63,154,82,0.9)","stroke-width":1,transform:"rotate(-20)"},seedG);
    seedG.style.opacity = "0";

    /* ── seed path data ──────────────────────────────── */
    function arcPts(cx:number,cy:number,r:number,a0:number,a1:number,n=26):[number,number][] {
      const pts:[number,number][] = [];
      for (let i=0;i<=n;i++) pts.push(pt(cx,cy,r, a0+(a1-a0)*(i/n)));
      return pts;
    }
    const R0=RINGS[0],R1=RINGS[1],R2=RINGS[2];
    const SEG = {
      p0: arcPts(R0.cx,R0.cy,RO+R0.oe,148,12,22),
      p1: arcPts(R1.cx,R1.cy,RO+R1.oe,205,335,26),
      p2: arcPts(R2.cx,R2.cy,RO+R2.oe,148,12,22),
    };
    const T = {r0s:0,r0e:0.38,h1s:0.38,h1e:0.45,r1s:0.45,r1e:0.83,h2s:0.83,h2e:0.90,r2s:0.90,r2e:1};

    const HOP1: [number,number] = [
      (SEG.p0[SEG.p0.length-1][0]+SEG.p1[0][0])/2,
      Math.min(SEG.p0[SEG.p0.length-1][1],SEG.p1[0][1])-52,
    ];
    const HOP2: [number,number] = [
      (SEG.p1[SEG.p1.length-1][0]+SEG.p2[0][0])/2,
      Math.min(SEG.p1[SEG.p1.length-1][1],SEG.p2[0][1])-44,
    ];

    function qBez(p0:[number,number],p1:[number,number],cp:[number,number],t:number):[number,number] {
      return [
        (1-t)*(1-t)*p0[0]+2*(1-t)*t*cp[0]+t*t*p1[0],
        (1-t)*(1-t)*p0[1]+2*(1-t)*t*cp[1]+t*t*p1[1],
      ];
    }
    function itp(pts:[number,number][],frac:number):[number,number] {
      const t=Math.max(0,Math.min(1,frac)), fi=t*(pts.length-1);
      const lo=Math.floor(fi), hi=Math.min(lo+1,pts.length-1), f=fi-lo;
      return [pts[lo][0]+(pts[hi][0]-pts[lo][0])*f, pts[lo][1]+(pts[hi][1]-pts[lo][1])*f];
    }
    function seedAt(p:number):[number,number] {
      if (p<=T.r0e) return itp(SEG.p0,(p-T.r0s)/(T.r0e-T.r0s));
      if (p<=T.h1e) return qBez(SEG.p0[SEG.p0.length-1],SEG.p1[0],HOP1,(p-T.h1s)/(T.h1e-T.h1s));
      if (p<=T.r1e) return itp(SEG.p1,(p-T.r1s)/(T.r1e-T.r1s));
      if (p<=T.h2e) return qBez(SEG.p1[SEG.p1.length-1],SEG.p2[0],HOP2,(p-T.h2s)/(T.h2e-T.h2s));
      return itp(SEG.p2,(p-T.r2s)/(T.r2e-T.r2s));
    }
    function vineD(prog:number) {
      const f = (pp:[number,number]) => `${pp[0].toFixed(1)},${pp[1].toFixed(1)}`;
      let d = "";
      if (prog>=T.r0s) {
        const sl=SEG.p0.slice(0,Math.max(2,Math.ceil(Math.min((prog-T.r0s)/(T.r0e-T.r0s),1)*SEG.p0.length)));
        d+="M"+f(sl[0])+sl.slice(1).map(pp=>" L"+f(pp)).join("");
      }
      if (prog>=T.h1e) {
        const t=Math.min((prog-T.h1s)/(T.h1e-T.h1s),1);
        const [hx,hy]=qBez(SEG.p0[SEG.p0.length-1],SEG.p1[0],HOP1,t);
        const [sx,sy]=SEG.p0[SEG.p0.length-1];
        d+=` M${sx.toFixed(1)},${sy.toFixed(1)} Q${HOP1[0].toFixed(1)},${HOP1[1].toFixed(1)} ${hx.toFixed(1)},${hy.toFixed(1)}`;
      }
      if (prog>=T.r1s) {
        const sl=SEG.p1.slice(0,Math.max(2,Math.ceil(Math.min((prog-T.r1s)/(T.r1e-T.r1s),1)*SEG.p1.length)));
        d+=" M"+f(sl[0])+sl.slice(1).map(pp=>" L"+f(pp)).join("");
      }
      if (prog>=T.h2e) {
        const t=Math.min((prog-T.h2s)/(T.h2e-T.h2s),1);
        const [hx,hy]=qBez(SEG.p1[SEG.p1.length-1],SEG.p2[0],HOP2,t);
        const [sx,sy]=SEG.p1[SEG.p1.length-1];
        d+=` M${sx.toFixed(1)},${sy.toFixed(1)} Q${HOP2[0].toFixed(1)},${HOP2[1].toFixed(1)} ${hx.toFixed(1)},${hy.toFixed(1)}`;
      }
      if (prog>=T.r2s) {
        const sl=SEG.p2.slice(0,Math.max(2,Math.ceil(Math.min((prog-T.r2s)/(T.r2e-T.r2s),1)*SEG.p2.length)));
        d+=" M"+f(sl[0])+sl.slice(1).map(pp=>" L"+f(pp)).join("");
      }
      return d||"M0,0";
    }

    const BLOOM_AT = [
      T.r0s+(T.r0e-T.r0s)*0.05,
      T.r0s+(T.r0e-T.r0s)*0.42,
      T.r0s+(T.r0e-T.r0s)*0.78,
      T.r1s+(T.r1e-T.r1s)*0.05,
      T.r1s+(T.r1e-T.r1s)*0.50,
      T.r1s+(T.r1e-T.r1s)*0.88,
      T.r2s+(T.r2e-T.r2s)*0.05,
      T.r2s+(T.r2e-T.r2s)*0.42,
      T.r2s+(T.r2e-T.r2s)*0.78,
    ];

    /* ── animation engine ────────────────────────────── */
    const TOTAL_MS = 5400;
    let bloomed  = new Array(9).fill(false);
    let startTS: number | null = null;
    function bloomBox(bs: BoxState) {
      const bG  = bs.bloomG;
      const iEl = bs.iG;
      bG.style.transition = "none";
      bG.style.opacity    = "0";
      bG.style.transform  = `scale(0) rotate(${mid(bs.s,bs.en)>180?-14:14}deg)`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bG.style.transition = "opacity 0.45s ease, transform 0.95s cubic-bezier(0.34,1.56,0.64,1)";
        bG.style.opacity    = "1";
        bG.style.transform  = "scale(1) rotate(0deg)";
        setTimeout(() => { iEl.style.transition="opacity 0.3s ease"; iEl.style.opacity="1"; }, 320);
      }));
    }

    function drawLeader(bs: BoxState) {
      const ll  = bs.leaderLine;
      const lbl = bs.lblG;
      lbl.style.opacity = "0";
      ll.style.transition      = "none";
      ll.style.strokeDashoffset = String(bs.lineLen);
      requestAnimationFrame(() => {
        lbl.style.transition = "opacity 0.25s ease";
        lbl.style.opacity    = "1";
        requestAnimationFrame(() => {
          ll.style.transition       = "stroke-dashoffset 0.55s ease";
          ll.style.strokeDashoffset = "0";
        });
      });
    }

    function resetAll() {
      bloomed  = new Array(9).fill(false);
      startTS  = null;
      GEARS.forEach(g => { g.style.transition="none"; g.style.opacity="0"; g.style.transform="scale(0.08)"; });
      BSTATE.forEach(bs => {
        bs.bloomG.style.cssText = "transform-origin:"+bs.bloomG.style.transformOrigin+";opacity:0;transform:scale(0) rotate(0deg);";
        bs.iG.style.cssText = "opacity:0;";
        bs.lblG.style.cssText = "opacity:0;";
        bs.leaderLine.style.strokeDashoffset = String(bs.lineLen);
        bs.leaderLine.style.transition = "none";
      });
      vineEl.setAttribute("d","");
      seedG.setAttribute("transform","translate(-100,-100)");
      seedG.style.opacity = "0";
    }

    function showInstant() {
      sectionEl.querySelectorAll<HTMLElement>(".j-eye,.j-head,.j-para,.j-replay").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.transition = "none";
      });
      GEARS.forEach(g => { g.style.transition="none"; g.style.opacity="1"; g.style.transform="scale(1)"; });
      BSTATE.forEach(bs => {
        bs.bloomG.style.opacity="1";
        bs.bloomG.style.transform="scale(1) rotate(0deg)";
        bs.iG.style.opacity="1";
        bs.lblG.style.opacity="1";
        bs.leaderLine.style.strokeDashoffset="0";
      });
      seedG.style.opacity="0";
    }

    function startAnim() {
      if (runningRef.current) return;
      runningRef.current = true;

      // text fade
      const eye  = sectionEl.querySelector<HTMLElement>(".j-eye");
      const head = sectionEl.querySelector<HTMLElement>(".j-head");
      const para = sectionEl.querySelector<HTMLElement>(".j-para");
      setTimeout(()=>{ if(eye)  { eye.style.transition ="opacity .55s,transform .55s"; eye.style.opacity ="1"; eye.style.transform ="none"; }},80);
      setTimeout(()=>{ if(head) { head.style.transition="opacity .55s .14s,transform .55s .14s"; head.style.opacity="1"; head.style.transform="none"; }},80);
      setTimeout(()=>{ if(para) { para.style.transition="opacity .55s .28s,transform .55s .28s"; para.style.opacity="1"; para.style.transform="none"; }},80);

      // gears
      GEARS.forEach((g,i) => {
        setTimeout(()=>{
          g.style.transition="opacity .45s ease, transform .6s cubic-bezier(0.34,1.56,0.64,1)";
          g.style.opacity="1"; g.style.transform="scale(1)";
        }, 480+i*200);
      });

      // seed travel
      setTimeout(()=>{
        seedG.style.transition="opacity 0.3s ease";
        seedG.style.opacity="1";

        function frame(ts: number) {
          if (!startTS) startTS = ts;
          const prog = Math.min((ts-startTS)/TOTAL_MS,1);

          const [sx,sy] = seedAt(prog);
          seedG.setAttribute("transform",`translate(${sx.toFixed(1)},${sy.toFixed(1)})`);
          vineEl.setAttribute("d", vineD(prog));

          BLOOM_AT.forEach((th,i) => {
            if (!bloomed[i] && prog>=th) {
              bloomed[i]=true;
              bloomBox(BSTATE[i]);
              setTimeout(()=>drawLeader(BSTATE[i]),380);
            }
          });

          if (prog < 1) {
            rafRef.current = requestAnimationFrame(frame);
          } else {
            seedG.style.transition="opacity .5s";
            seedG.style.opacity="0";
            runningRef.current=false;
            if (replayEl) { replayEl.style.transition="opacity .4s ease .8s"; replayEl.style.opacity="1"; }
          }
        }
        rafRef.current = requestAnimationFrame(frame);
      },500);
    }

    replayEl = sectionEl.querySelector<HTMLElement>(".j-replay");
    if (replayEl) {
      replayHandler = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        runningRef.current=false;
        if (replayEl) replayEl.style.opacity="0";
        resetAll();
        setTimeout(startAnim,80);
      };
      replayEl.addEventListener("click", replayHandler);
    }

    /* ── hover / focus ───────────────────────────────── */
    BSTATE.forEach((_,i) => {
      const { hitPath, lblG } = BSTATE[i];
      const on  = () => {
        const bs = BSTATE[i];
        const m  = mid(bs.s,bs.en);
        const [dx,dy] = [8*Math.cos(m*D2R), 8*Math.sin(m*D2R)];
        bs.hoverG.style.transition="transform .22s ease";
        bs.hoverG.style.transform =`translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px)`;
        bs.sPath.setAttribute("stroke","rgba(255,255,255,0.85)");
        bs.sPath.setAttribute("stroke-width","2.5");
        bs.yearT.style.textDecoration="underline";
      };
      const off = () => {
        const bs = BSTATE[i];
        bs.hoverG.style.transition="transform .22s ease";
        bs.hoverG.style.transform ="translate(0,0)";
        bs.sPath.removeAttribute("stroke");
        bs.sPath.removeAttribute("stroke-width");
        bs.yearT.style.textDecoration="none";
      };
      hitPath.addEventListener("pointerenter",on); hitPath.addEventListener("pointerleave",off);
      hitPath.addEventListener("focus",on);        hitPath.addEventListener("blur",off);
      lblG.addEventListener("pointerenter",on);    lblG.addEventListener("pointerleave",off);
      lblG.addEventListener("focus",on);           lblG.addEventListener("blur",off);
    });

    /* ── trigger ─────────────────────────────────────── */
    const startWhenVisible = () => {
      if (document.hidden) return;
      animationObserver?.disconnect();
      startAnim();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) return;
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) startWhenVisible();
    };

    if (REDUCED) {
      showInstant();
    } else {
      animationObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) startWhenVisible();
      },{ threshold:0.1 });
      animationObserver.observe(sectionEl);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) startWhenVisible();
    }

    return () => {
      disposed = true;
      animationObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      haloRafIds.forEach(cancelAnimationFrame);
      if (replayEl && replayHandler) replayEl.removeEventListener("click", replayHandler);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#e3f1df] py-16 overflow-x-hidden"
      aria-label="Our Journey of Impact"
    >
      {/* gear keyframes injected once */}
      <style>{`
        @keyframes jGearCW  { to { transform: rotate(360deg);  } }
        @keyframes jGearCCW { to { transform: rotate(-360deg); } }
        .j-hit  { pointer-events: all; cursor: pointer; }
        .j-lbl  { pointer-events: all; cursor: pointer; }
        #jSvg * { pointer-events: none; }
        #jSvg .j-hit { pointer-events: all; }
        #jSvg .j-lbl { pointer-events: all; }
      `}</style>

      <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-start gap-0">

        {/* ── left text column ── */}
        <div className="flex-none w-full lg:w-[252px] lg:pr-7 pt-0 lg:pt-12 mb-8 lg:mb-0">
          <div
            className="j-eye text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#14702f] mb-3"
            style={{ opacity:0, transform:"translateY(16px)" }}
          >
            From 2014 to Now
          </div>
          <h2
            className="j-head text-[clamp(1.6rem,2.2vw,2rem)] font-bold leading-[1.18] text-[#14702f] mb-4"
            style={{ opacity:0, transform:"translateY(16px)" }}
          >
            Our Journey<br/>of Impact
          </h2>
          <p
            className="j-para text-[0.86rem] leading-[1.8] text-[#4a5c4e]"
            style={{ opacity:0, transform:"translateY(16px)" }}
          >
            From a vision in 2014 to a global mission today — here&apos;s how Biofactor grew, innovated and built a healthier planet through science and nature.
          </p>
          <button
            className="j-replay mt-6 px-5 py-2 bg-[#14702f] text-white text-[0.75rem] font-semibold tracking-wide rounded-full hover:bg-[#0e4e23] transition-colors"
            style={{ opacity:0 }}
            aria-label="Replay animation"
          >
            ↺ Replay
          </button>
        </div>

        {/* ── diagram scroller ── */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div style={{ minWidth:"960px" }}>
            <svg
              id="jSvg"
              ref={svgRef}
              viewBox="0 0 1300 680"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display:"block", width:"100%", maxWidth:"1300px", height:"auto" }}
              role="img"
              aria-label="Biofactor Biologicals journey diagram from 2014 to 2024"
            >
              <defs />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
