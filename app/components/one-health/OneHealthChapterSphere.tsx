"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface OneHealthChapterSphereProps {
  activeChapterId: string;
  accentColor: string;
  prefersReducedMotion?: boolean;
}

const TEXTURE_MAPS: Record<string, string> = {
  soil: "/images/one-health/soil.png",
  plant: "/images/one-health/plant.png",
  animal: "/images/one-health/animal.png",
  food: "/images/one-health/food.png",
  people: "/images/one-health/people.png",
  planet: "/images/one-health/planet.png",
};

export default function OneHealthChapterSphere({
  activeChapterId,
  accentColor,
  prefersReducedMotion = false,
}: OneHealthChapterSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeChapterRef = useRef<string>(activeChapterId);
  const accentColorRef = useRef<string>(accentColor);
  const isVisibleRef = useRef<boolean>(true);
  const scrollYRef = useRef<number>(0);

  // Mouse parallax refs
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sync refs with props
  useEffect(() => {
    activeChapterRef.current = activeChapterId;
  }, [activeChapterId]);

  useEffect(() => {
    accentColorRef.current = accentColor;
  }, [accentColor]);

  // Track scroll position for scroll-driven rotation & breathing scale
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to pause rendering only when chapters wrapper is off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targetToObserve = container.closest(".relative") || container;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(targetToObserve);
    return () => observer.disconnect();
  }, []);

  // Pointer move handler for subtle 3D camera parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseTargetRef.current = {
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer (pixel ratio max 1.5, high performance, no shadows)
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.background = "transparent";
    canvas.style.border = "none";
    canvas.style.outline = "none";
    canvas.style.boxShadow = "none";
    container.appendChild(canvas);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainDirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainDirLight.position.set(-10, 12, 12);
    scene.add(mainDirLight);

    const backRimLight = new THREE.DirectionalLight(0xd4ecd4, 0.4);
    backRimLight.position.set(10, -6, -10);
    scene.add(backRimLight);

    // 3. Preload Textures Once (Anisotropy capped at 4)
    const textureLoader = new THREE.TextureLoader();
    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    const loadedTextures: Record<string, THREE.Texture> = {};

    Object.entries(TEXTURE_MAPS).forEach(([key, url]) => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;

      if (key === "planet") {
        tex.repeat.set(0.8, 0.8);
        tex.offset.set(0.1, 0.1);
        tex.wrapS = THREE.MirroredRepeatWrapping;
        tex.wrapT = THREE.MirroredRepeatWrapping;
      } else {
        tex.wrapS = THREE.MirroredRepeatWrapping;
        tex.repeat.x = 2;
        tex.offset.x = -0.5;
        tex.wrapT = THREE.ClampToEdgeWrapping;
      }
      loadedTextures[key] = tex;
    });

    // 4. Main 3D Sphere Geometry & Material (48x32 segments)
    const sphereGeo = new THREE.SphereGeometry(1, 48, 32);
    const initialTex = loadedTextures[activeChapterRef.current] || loadedTextures.soil;

    const sphereMat = new THREE.MeshStandardMaterial({
      map: initialTex,
      bumpMap: initialTex,
      bumpScale: 0.4,
      roughness: 1.0,
      metalness: 0.0,
      transparent: true,
      opacity: 1.0,
    });

    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // 5. Tilted Orbit Ring (LineLoop) & Small Traveling Dot
    const ringSegments = 96;
    const ringPoints: THREE.Vector3[] = [];
    const ringRx = 1.45;
    const ringRz = 1.45;

    for (let i = 0; i < ringSegments; i++) {
      const theta = (i / ringSegments) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(theta) * ringRx, 0, Math.sin(theta) * ringRz));
    }

    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
    const ringMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColorRef.current),
      transparent: true,
      opacity: 0.35,
    });
    const ringLine = new THREE.LineLoop(ringGeo, ringMat);

    const dotGeo = new THREE.SphereGeometry(0.04, 16, 12);
    const dotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColorRef.current),
      transparent: true,
      opacity: 0.9,
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = THREE.MathUtils.degToRad(70);
    orbitGroup.rotation.z = THREE.MathUtils.degToRad(15);
    orbitGroup.add(ringLine);
    orbitGroup.add(dotMesh);
    scene.add(orbitGroup);

    // 6. Soft Ground Shadow Plane
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(16, 14, 11, 0.38)");
      grad.addColorStop(0.5, "rgba(16, 14, 11, 0.15)");
      grad.addColorStop(1, "rgba(16, 14, 11, 0)");
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.35;
    scene.add(shadowMesh);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Transition State Variables
    let currentChapterKey = activeChapterRef.current;
    let isTransitioning = false;
    let transitionProgress = 0;
    let targetScale = 1.0;
    let currentScale = 1.0;
    let currentOpacity = 1.0;
    let extraRotationKick = 0;

    // 8. Pausable Render Loop Setup
    let startTime: number | null = null;
    let animId: number = 0;
    let isRunning = false;

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        isRunning = false;
        animId = 0;
        return;
      }

      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      if (currentChapterKey !== activeChapterRef.current) {
        currentChapterKey = activeChapterRef.current;
        isTransitioning = true;
        transitionProgress = 0;
        extraRotationKick = Math.PI * 0.5;
      }

      if (isTransitioning) {
        transitionProgress += 0.035;
        if (transitionProgress <= 0.5) {
          const p = transitionProgress / 0.5;
          targetScale = 1.0 - p * 0.15;
          currentOpacity = 1.0 - p * 0.6;
        } else if (transitionProgress <= 0.55) {
          const targetKey = activeChapterRef.current;
          currentChapterKey = targetKey;
          const newTex = loadedTextures[targetKey] || loadedTextures.soil;
          sphereMat.map = newTex;
          sphereMat.bumpMap = newTex;
          sphereMat.needsUpdate = true;
        } else if (transitionProgress <= 1.0) {
          const p = (transitionProgress - 0.55) / 0.45;
          targetScale = 0.85 + p * 0.15;
          currentOpacity = 0.4 + p * 0.6;
        } else {
          isTransitioning = false;
          targetScale = 1.0;
          currentOpacity = 1.0;
        }
      } else {
        targetScale = 1.0;
        currentOpacity = 1.0;
      }

      currentScale += (targetScale - currentScale) * 0.1;
      sphereMat.opacity = currentOpacity;

      const scrollBreathing = Math.sin(scrollYRef.current * 0.002) * 0.03;
      const finalScale = currentScale + scrollBreathing;
      sphereMesh.scale.setScalar(finalScale);

      shadowMesh.scale.set(finalScale * 1.05, finalScale * 0.8, 1);

      ringMat.color.set(accentColorRef.current);
      dotMat.color.set(accentColorRef.current);

      const dotAngle = elapsed * 0.8;
      dotMesh.position.set(Math.cos(dotAngle) * ringRx, 0, Math.sin(dotAngle) * ringRz);

      if (!prefersReducedMotion) {
        const lerpF = 0.05;
        mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * lerpF;
        mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * lerpF;

        camera.position.x = mouseCurrentRef.current.x * 0.3;
        camera.position.y = -mouseCurrentRef.current.y * 0.2;
        camera.lookAt(0, 0, 0);

        const autoSpin = elapsed * 0.35;
        const scrollSpin = scrollYRef.current * 0.0015;
        sphereMesh.rotation.y = autoSpin + scrollSpin;

        if (extraRotationKick > 0.001) {
          sphereMesh.rotation.y += extraRotationKick * 0.18;
          extraRotationKick *= 0.88;
        }

        orbitGroup.rotation.y = autoSpin * 0.3 + scrollSpin * 0.5;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!isRunning && isVisibleRef.current) {
        isRunning = true;
        animId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
      isRunning = false;
    };

    const targetToObserve = container.closest(".relative") || container;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(targetToObserve);

    startLoop();

    // Strict Mode Resource Disposal
    return () => {
      stopLoop();
      observer.disconnect();
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();

      Object.values(loadedTextures).forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      {/* Soft Radial Glow Div (120% size, accent color at 18% opacity fading to transparent, blurred, crossfades color) */}
      <div
        className="absolute inset-[-10%] rounded-full pointer-events-none transition-all duration-700 ease-out blur-2xl z-0"
        style={{
          background: `radial-gradient(circle, ${accentColor}2E 0%, ${accentColor}1A 40%, rgba(237,244,237,0) 70%)`,
        }}
      />
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center z-10"
      />
    </div>
  );
}
