"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const COLOURS_HEX = [0x1F7A4D, 0x3F7D4B, 0x8B5E34, 0xC9A77C, 0x2B9462];

interface InstanceData {
  x: number;
  y: number;
  z: number;
  phase: number;
  speed: number;
}

export default function MicrobeField3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;
    let rafId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let heroObs: IntersectionObserver | null = null;
    let resizeObs: ResizeObserver | null = null;

    const container = containerRef.current;
    const parent = container?.parentElement;
    if (!container || !parent) return;

    const isMobile = window.innerWidth < 640;
    const NS = isMobile ? 40 : 70;
    const NR = isMobile ? 25 : 45;
    const TOTAL = NS + NR;
    const dprCap = isMobile ? 1.5 : 1.75;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    if (!renderer) return;

    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.className = "fld";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.z = 8;

    const ambLight = new THREE.AmbientLight(
      new THREE.Color().setHex(0xffffff, THREE.LinearSRGBColorSpace),
      0.9 * Math.PI
    );
    scene.add(ambLight);

    const hemiLight = new THREE.HemisphereLight(
      new THREE.Color().setHex(0xf4f8f1, THREE.LinearSRGBColorSpace),
      new THREE.Color().setHex(0x8b7355, THREE.LinearSRGBColorSpace),
      0.6 * Math.PI
    );
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(
      new THREE.Color().setHex(0xffffff, THREE.LinearSRGBColorSpace),
      1.1 * Math.PI
    );
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    const mat = new THREE.MeshStandardMaterial({ roughness: 0.4 });
    const sphereGeo = new THREE.SphereGeometry(0.07, 12, 10);
    const rodGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.24, 10);

    const sm = new THREE.InstancedMesh(sphereGeo, mat, NS);
    const rd = new THREE.InstancedMesh(rodGeo, mat, NR);

    group.add(sm);
    group.add(rd);

    const threeColours = COLOURS_HEX.map((hex) =>
      new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace)
    );

    const B: InstanceData[] = [];
    for (let i = 0; i < TOTAL; i++) {
      const isSphere = i < NS;
      const instIdx = isSphere ? i : i - NS;
      const mesh = isSphere ? sm : rd;
      mesh.setColorAt(instIdx, threeColours[i % 5]);

      B.push({
        x: 0,
        y: 0,
        z: 0,
        phase: Math.random() * 6.28,
        speed: 0.6 + Math.random() * 0.8,
      });
    }

    const dummyObj = new THREE.Object3D();
    let mx = 0;
    let my = 0;
    let px = 0;
    let py = 0;
    let isVisible = true;
    const t0 = performance.now();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handlePointerMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const updateSize = () => {
      if (!renderer || isCancelled) return;
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const hh = Math.tan((15 * Math.PI) / 180) * 8;
      const hw = hh * camera.aspect;

      for (let i = 0; i < TOTAL; i++) {
        B[i].x = (Math.random() * 1.5 - 0.3) * hw;
        B[i].y = (Math.random() * 2 - 1) * hh * 0.95;
        B[i].z = Math.random() * 3.5 - 2.5;
      }

      if (prefersReduced) {
        renderFrame(performance.now());
      }
    };

    const renderFrame = (now: number) => {
      if (!renderer || isCancelled) return;
      const t = prefersReduced ? 3 : (now - t0) / 1000;
      px += (mx * 0.4 - px) * 0.05;
      py += (-my * 0.25 - py) * 0.05;
      group.position.set(px, -py, 0);

      for (let i = 0; i < TOTAL; i++) {
        const isSphere = i < NS;
        const instIdx = isSphere ? i : i - NS;
        const mesh = isSphere ? sm : rd;
        const b = B[i];

        dummyObj.position.set(
          b.x + Math.sin(t * 0.3 * b.speed + b.phase) * 0.18,
          b.y + Math.cos(t * 0.25 * b.speed + b.phase) * 0.22,
          b.z
        );
        dummyObj.rotation.set(
          b.phase,
          t * 0.35 * b.speed + b.phase,
          b.phase * 0.5
        );
        dummyObj.updateMatrix();
        mesh.setMatrixAt(instIdx, dummyObj.matrix);
      }

      sm.instanceMatrix.needsUpdate = true;
      rd.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const animateLoop = (now: number) => {
      rafId = 0;
      if (isCancelled || !isVisible || document.hidden) return;
      renderFrame(now);
      rafId = requestAnimationFrame(animateLoop);
    };

    const startLoop = () => {
      if (!rafId && !prefersReduced && !isCancelled) {
        rafId = requestAnimationFrame(animateLoop);
      }
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    heroObs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isVisible = entry?.isIntersecting ?? true;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    });
    heroObs.observe(parent);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resizeObs = new ResizeObserver(updateSize);
    resizeObs.observe(parent);

    updateSize();
    if (prefersReduced) {
      renderFrame(performance.now());
    } else {
      startLoop();
    }

    return () => {
      isCancelled = true;
      stopLoop();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      heroObs?.disconnect();
      resizeObs?.disconnect();

      sphereGeo.dispose();
      rodGeo.dispose();
      mat.dispose();
      sm.dispose();
      rd.dispose();
      renderer?.dispose();
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
