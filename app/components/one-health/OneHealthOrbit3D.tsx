"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export interface DomainSlotConfig {
  id: "soil" | "plant" | "animal" | "food" | "people";
  name: string;
  baseAngleDeg: number;
  imgSrc: string;
}

export interface CoreSlotConfig {
  name: string;
  tagline: string;
  imgSrc: string;
}

// 5 Domains evenly spaced by angle (2π/5 = 72°)
const DEFAULT_DOMAINS: DomainSlotConfig[] = [
  {
    id: "soil",
    name: "SOIL",
    baseAngleDeg: 270, // Top / Back
    imgSrc: "/images/one-health/soil.webp",
  },
  {
    id: "plant",
    name: "PLANT",
    baseAngleDeg: 342, // Top-Right (+72°)
    imgSrc: "/images/one-health/plant.webp",
  },
  {
    id: "animal",
    name: "ANIMAL",
    baseAngleDeg: 54, // Bottom-Right (+72°)
    imgSrc: "/images/one-health/animal.webp",
  },
  {
    id: "food",
    name: "FOOD",
    baseAngleDeg: 126, // Bottom-Left (+72°)
    imgSrc: "/images/one-health/food.webp",
  },
  {
    id: "people",
    name: "PEOPLE",
    baseAngleDeg: 198, // Top-Left (+72°)
    imgSrc: "/images/one-health/people.webp",
  },
];

const DEFAULT_CORE: CoreSlotConfig = {
  name: "PLANET",
  tagline: "ONE HEALTH CORE",
  imgSrc: "/images/one-health/planet.jpg",
};

interface OneHealthOrbit3DProps {
  domains?: DomainSlotConfig[];
  core?: CoreSlotConfig;
  entranceProgress?: number; // 0 to 1 for entrance orchestration
}

export default function OneHealthOrbit3D({
  domains = DEFAULT_DOMAINS,
  core = DEFAULT_CORE,
  entranceProgress = 1,
}: OneHealthOrbit3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Refs for mouse parallax, intersection observer & animation state
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredDomainRef = useRef<string | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const entranceRef = useRef<number>(1);

  // Sync refs with props/state
  useEffect(() => {
    hoveredDomainRef.current = hoveredDomainId;
  }, [hoveredDomainId]);

  useEffect(() => {
    entranceRef.current = entranceProgress;
  }, [entranceProgress]);

  // Reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    return () => {
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
    };
  }, []);

  // IntersectionObserver to pause rendering when hero is off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Pointer parallax interaction (max 0.1 units)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      mouseTargetRef.current = {
        x: Math.max(-1, Math.min(1, normX)),
        y: Math.max(-1, Math.min(1, normY)),
      };
    };

    const handleMouseLeave = () => {
      mouseTargetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  // Main Three.js setup & render loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth || 1200;
    let height = container.clientHeight || 700;

    // 1. Scene & Perspective Camera Setup (FOV 20, camera position at (0, 0.6, D))
    const scene = new THREE.Scene();
    const fov = 20;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);

    // Orbit parameters: rx = 7.6, ry = 3.2, rz = 2.4. Planet = 1.85, Photo sphere = 1.15
    const planetRadius = 1.85;
    const domainSphereRadius = 1.15;

    let camDistance = 15;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    // CSS2DRenderer Setup for synchronized 2D labels (pointer-events none on renderer)
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0";
    labelRenderer.domElement.style.left = "0";
    labelRenderer.domElement.style.width = "100%";
    labelRenderer.domElement.style.height = "100%";
    labelRenderer.domElement.style.pointerEvents = "none";
    container.appendChild(labelRenderer.domElement);

    // 3. Parent Group at World Origin (0,0,0)
    const sceneGroup = new THREE.Group();
    sceneGroup.position.set(0, 0, 0);
    scene.add(sceneGroup);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd4ecd4, 0.5);
    scene.add(hemiLight);

    const mainDirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainDirLight.position.set(-10, 14, 12);
    scene.add(mainDirLight);

    const backRimLight = new THREE.DirectionalLight(0xd4ecd4, 0.45);
    backRimLight.position.set(10, -6, -10);
    scene.add(backRimLight);

    // 5. Texture Loaders & Shared Geometry (SphereGeometry 1, 64, 48)
    const textureLoader = new THREE.TextureLoader();
    const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    const loadDomainTexture = (url: string) => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set(1, 1);
      tex.offset.set(0, 0);
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = maxAnisotropy;
      return tex;
    };

    const sharedSphereGeo = new THREE.SphereGeometry(1, 64, 48);

    // 6. Central Planet Mesh (Radius 1.4, tilted via parent Group at rotation.x = -0.25)
    const planetGroup = new THREE.Group();
    planetGroup.position.set(0, 0, 0);
    planetGroup.rotation.x = -0.25;
    sceneGroup.add(planetGroup);

    const planetMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.0,
      emissive: new THREE.Color(0x000000),
    });

    const planetTexturePath = core.imgSrc || "/images/one-health/planet.jpg";
    const planetTexture = textureLoader.load(
      planetTexturePath,
      (tex) => {
        console.log(`[Planet Texture] Loaded successfully from ${planetTexturePath}. Dimensions: ${tex.image?.width}x${tex.image?.height}`);
        tex.colorSpace = THREE.SRGBColorSpace;
        planetMat.map = tex;
        planetMat.color.set(0xffffff);
        planetMat.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn(`[Planet Texture] Failed to load planet texture: ${planetTexturePath}`, err);
        planetMat.color.set("#2a6fb0");
        planetMat.needsUpdate = true;
      }
    );
    planetTexture.colorSpace = THREE.SRGBColorSpace;
    planetMat.map = planetTexture;

    const planetMesh = new THREE.Mesh(sharedSphereGeo, planetMat);
    planetMesh.scale.setScalar(planetRadius);
    planetGroup.add(planetMesh);

    // Planet Outer Atmosphere Rim
    const atmosGeo = new THREE.SphereGeometry(planetRadius * 1.025, 32, 24);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x147a46,
      transparent: true,
      opacity: 0.14,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    planetGroup.add(atmosMesh);

    // 7. 5 Domain Photo Spheres inside Groups tilted at rotation.x = -0.25 (Radius 1.05)
    const domainGroups: THREE.Group[] = [];
    const domainMeshes: THREE.Mesh[] = [];
    const domainMats: THREE.Material[] = [];
    const domainFresnelMeshes: THREE.Mesh[] = [];
    const domainCSS2DObjects: CSS2DObject[] = [];
    const domainLabelSide: ("below" | "above")[] = [];
    const domainIsFading: boolean[] = [false, false, false, false, false];

    const fresnelGeo = new THREE.SphereGeometry(domainSphereRadius * 1.02, 32, 24);

    domains.forEach((d) => {
      const domainGroup = new THREE.Group();
      domainGroup.rotation.x = -0.25;
      sceneGroup.add(domainGroup);

      const tex = loadDomainTexture(d.imgSrc);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.0,
      });
      const mesh = new THREE.Mesh(sharedSphereGeo, mat);
      mesh.scale.setScalar(domainSphereRadius);
      domainGroup.add(mesh);

      const fresnelMat = new THREE.MeshBasicMaterial({
        color: 0xa9e889,
        transparent: true,
        opacity: 0.28,
        side: THREE.BackSide,
      });
      const fresnelMesh = new THREE.Mesh(fresnelGeo, fresnelMat);
      domainGroup.add(fresnelMesh);
      domainFresnelMeshes.push(fresnelMesh);

      // Create pill label div element wrapped in CSS2DObject
      const labelDiv = document.createElement("div");
      labelDiv.className = "pointer-events-auto cursor-pointer";
      labelDiv.style.pointerEvents = "auto";
      labelDiv.style.transition = "opacity 0.15s ease-out";

      const span = document.createElement("span");
      span.className = "inline-flex items-center font-semibold tracking-wider uppercase transition-colors duration-300 whitespace-nowrap shadow-sm text-[13px] sm:text-[14px]";
      span.style.backgroundColor = "rgba(237, 244, 237, 0.85)";
      span.style.border = "1px solid rgba(20, 122, 70, 0.2)";
      span.style.padding = "3px 12px";
      span.style.borderRadius = "999px";
      span.style.color = "#173522";
      span.innerText = d.name;

      span.addEventListener("mouseenter", () => {
        setHoveredDomainId(d.id);
        span.style.color = "#147A46";
      });
      span.addEventListener("mouseleave", () => {
        setHoveredDomainId(null);
        span.style.color = "#173522";
      });

      labelDiv.appendChild(span);

      const labelObject = new CSS2DObject(labelDiv);
      // Default initial side: below -> center.set(0.5, 0) at (0, -(1.05 + 0.22), 0) = (0, -1.27, 0)
      labelObject.center.set(0.5, 0);
      labelObject.position.set(0, -(domainSphereRadius + 0.22), 0);
      domainGroup.add(labelObject);

      domainCSS2DObjects.push(labelObject);
      domainLabelSide.push("below");

      domainGroups.push(domainGroup);
      domainMeshes.push(mesh);
      domainMats.push(mat);
    });

    // 8. Smooth Ellipse 3D Orbit Line (rx = 7.6, ry = 3.2, rz = 2.4)
    const ORBIT_POINTS_COUNT = 256;
    const orbitLinePositions = new Float32Array(ORBIT_POINTS_COUNT * 3);

    for (let i = 0; i < ORBIT_POINTS_COUNT; i++) {
      const a = (i / (ORBIT_POINTS_COUNT - 1)) * Math.PI * 2;
      orbitLinePositions[i * 3 + 0] = Math.cos(a) * 7.6;
      orbitLinePositions[i * 3 + 1] = -Math.sin(a) * 3.2;
      orbitLinePositions[i * 3 + 2] = Math.sin(a) * 2.4;
    }

    const orbitLineGeo = new THREE.BufferGeometry();
    orbitLineGeo.setAttribute("position", new THREE.BufferAttribute(orbitLinePositions, 3));

    const orbitLineMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color("#7FBF8E") },
        uProgress: { value: 1.0 },
      },
      vertexShader: `
        varying float vZ;
        void main() {
          vZ = position.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vZ;
        uniform vec3 uColor;
        uniform float uProgress;
        void main() {
          float normZ = (vZ + 2.4) / 4.8;
          float opacity = mix(0.12, 0.50, clamp(normZ, 0.0, 1.0));
          gl_FragColor = vec4(uColor, opacity * uProgress);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const orbitLineMesh = new THREE.Line(orbitLineGeo, orbitLineMat);
    sceneGroup.add(orbitLineMesh);

    // 9. Glowing Comet Head & Tail
    const cometHeadGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const cometHeadMat = new THREE.MeshBasicMaterial({
      color: 0xe6f7ea,
    });
    const cometHeadMesh = new THREE.Mesh(cometHeadGeo, cometHeadMat);
    sceneGroup.add(cometHeadMesh);

    const TAIL_POINTS = 14;
    const tailPositions = new Float32Array(TAIL_POINTS * 3);

    const cometTailGeo = new THREE.BufferGeometry();
    cometTailGeo.setAttribute("position", new THREE.BufferAttribute(tailPositions, 3));

    const cometTailMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color("#B5E7C4") },
      },
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        void main() {
          gl_FragColor = vec4(uColor, 0.45);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const cometTailLine = new THREE.Line(cometTailGeo, cometTailMat);
    sceneGroup.add(cometTailLine);

    // 10. Drifting Pollen Particles (60 points)
    const POLLEN_COUNT = 60;
    const pollenPositions = new Float32Array(POLLEN_COUNT * 3);
    const pollenData: { x: number; y: number; z: number; speed: number; phase: number }[] = [];

    for (let i = 0; i < POLLEN_COUNT; i++) {
      const px = (Math.random() - 0.5) * 18;
      const py = (Math.random() - 0.5) * 10;
      const pz = (Math.random() - 0.5) * 8;
      pollenPositions[i * 3 + 0] = px;
      pollenPositions[i * 3 + 1] = py;
      pollenPositions[i * 3 + 2] = pz;
      pollenData.push({
        x: px,
        y: py,
        z: pz,
        speed: 0.002 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const pollenGeo = new THREE.BufferGeometry();
    pollenGeo.setAttribute("position", new THREE.BufferAttribute(pollenPositions, 3));

    const pollenMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xcfe8cf,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });

    const pollenPoints = new THREE.Points(pollenGeo, pollenMat);
    sceneGroup.add(pollenPoints);



    // 11. Camera Fitting Logic (Fit bounds + 40px label height to 96% width & 94% height)
    const fitCameraAndCenterScene = (w: number, h: number) => {
      const aspect = w / h;
      const fovRad = (fov * Math.PI) / 180;
      const tanHalfFov = Math.tan(fovRad / 2);

      let d = 15.0;

      for (let iter = 0; iter < 6; iter++) {
        let maxNDCX = -Infinity;
        let minNDCX = Infinity;
        let maxNDCY = -Infinity;
        let minNDCY = Infinity;

        for (let i = 0; i < 72; i++) {
          const sampleAngle = (i / 72) * Math.PI * 2;

          domains.forEach((dom) => {
            const baseRad = (dom.baseAngleDeg * Math.PI) / 180;
            const totalAngle = baseRad + sampleAngle;
            const sx = Math.cos(totalAngle) * 7.6;
            const sy = -Math.sin(totalAngle) * 3.2;
            const sz = Math.sin(totalAngle) * 2.4;
            const zNorm = sz / 2.4;
            const depthScale = 0.95 + 0.09 * ((zNorm + 1) / 2);
            const rWorld = domainSphereRadius * depthScale;

            const distZ = d - sz;
            const frustumHalfH = distZ * tanHalfFov;
            const frustumHalfW = frustumHalfH * aspect;

            const labelPadWorld = (40 / h) * (frustumHalfH * 2);

            const topY = (sy + rWorld + labelPadWorld - 0.6) / frustumHalfH;
            const botY = (sy - rWorld - labelPadWorld - 0.6) / frustumHalfH;
            const rightX = (sx + rWorld) / frustumHalfW;
            const leftX = (sx - rWorld) / frustumHalfW;

            if (topY > maxNDCY) maxNDCY = topY;
            if (botY < minNDCY) minNDCY = botY;
            if (rightX > maxNDCX) maxNDCX = rightX;
            if (leftX < minNDCX) minNDCX = leftX;
          });

          const distZPlanet = d;
          const frustumHalfHPlanet = distZPlanet * tanHalfFov;
          const frustumHalfWPlanet = frustumHalfHPlanet * aspect;
          const planetR = planetRadius;
          const planetTop = (planetR - 0.6) / frustumHalfHPlanet;
          const planetBot = (-planetR - 0.6) / frustumHalfHPlanet;
          const planetRight = planetR / frustumHalfWPlanet;
          const planetLeft = -planetR / frustumHalfWPlanet;

          if (planetTop > maxNDCY) maxNDCY = planetTop;
          if (planetBot < minNDCY) minNDCY = planetBot;
          if (planetRight > maxNDCX) maxNDCX = planetRight;
          if (planetLeft < minNDCX) minNDCX = planetLeft;
        }

        const spanY = maxNDCY - minNDCY;
        const spanX = maxNDCX - minNDCX;
        const scaleNeededY = spanY / 1.88; // 94% height
        const scaleNeededX = spanX / 1.92; // 96% width
        const scaleFactor = Math.max(scaleNeededY, scaleNeededX);

        d = d * scaleFactor;
      }

      camDistance = d;
      camera.position.set(0, 0.6, camDistance);
      camera.lookAt(0, 0, 0);

      // Center bounds exactly on both X and Y axes
      let minFinalY = Infinity;
      let maxFinalY = -Infinity;
      let minFinalX = Infinity;
      let maxFinalX = -Infinity;

      for (let i = 0; i < 72; i++) {
        const sampleAngle = (i / 72) * Math.PI * 2;
        domains.forEach((dom) => {
          const baseRad = (dom.baseAngleDeg * Math.PI) / 180;
          const totalAngle = baseRad + sampleAngle;
          const sx = Math.cos(totalAngle) * 7.6;
          const sy = -Math.sin(totalAngle) * 3.2;
          const sz = Math.sin(totalAngle) * 2.4;
          const zNorm = sz / 2.4;
          const depthScale = 0.95 + 0.09 * ((zNorm + 1) / 2);
          const rWorld = domainSphereRadius * depthScale;

          const distZ = camDistance - sz;
          const frustumHalfH = distZ * tanHalfFov;
          const frustumHalfW = frustumHalfH * aspect;
          const labelPadWorld = (40 / h) * (frustumHalfH * 2);

          const topY = (sy + rWorld + labelPadWorld - 0.6) / frustumHalfH;
          const botY = (sy - rWorld - labelPadWorld - 0.6) / frustumHalfH;
          const rightX = (sx + rWorld) / frustumHalfW;
          const leftX = (sx - rWorld) / frustumHalfW;

          if (topY > maxFinalY) maxFinalY = topY;
          if (botY < minFinalY) minFinalY = botY;
          if (rightX > maxFinalX) maxFinalX = rightX;
          if (leftX < minFinalX) minFinalX = leftX;
        });
      }

      const centerNDCY = (maxFinalY + minFinalY) / 2;
      const centerNDCX = (maxFinalX + minFinalX) / 2;

      sceneGroup.position.y = -centerNDCY * (camDistance * tanHalfFov);
      sceneGroup.position.x = -centerNDCX * (camDistance * tanHalfFov * aspect);
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth || 1200;
      height = container.clientHeight || 700;

      const aspect = width / height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      fitCameraAndCenterScene(width, height);

      renderer.setSize(width, height, false);
      labelRenderer.setSize(width, height);
    };

    fitCameraAndCenterScene(width, height);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const sphereProjVec = new THREE.Vector3();
    const sphereEdgeVec = new THREE.Vector3();
    const camDirVec = new THREE.Vector3();
    const camRightVec = new THREE.Vector3();

    // 12. Animation Loop Setup
    let startTime: number | null = null;
    let animId: number = 0;
    let isRunning = false;
    let frameCount = 0;

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        isRunning = false;
        animId = 0;
        return;
      }

      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      frameCount++;

      // Update entrance uniform
      orbitLineMat.uniforms.uProgress.value = prefersReducedMotion ? 1.0 : entranceRef.current;

      if (!prefersReducedMotion) {
        // Pointer parallax (max 0.1 units)
        const lerpFactor = 0.05;
        mouseCurrentRef.current.x +=
          (mouseTargetRef.current.x - mouseCurrentRef.current.x) * lerpFactor;
        mouseCurrentRef.current.y +=
          (mouseTargetRef.current.y - mouseCurrentRef.current.y) * lerpFactor;

        camera.position.x = mouseCurrentRef.current.x * 0.1;
        camera.position.y = 0.6 - mouseCurrentRef.current.y * 0.1;
        camera.position.z = camDistance;
        camera.lookAt(0, 0, 0);

        // Planet spin: ~90s per full turn (2π)
        planetMesh.rotation.y = (elapsed / 90) * Math.PI * 2;

        const orbitPeriod = 100;
        const currentOrbitAngle = (elapsed / orbitPeriod) * Math.PI * 2;

        // Comet Head Position (rx = 7.6, ry = 3.2, rz = 2.4)
        const cometAngle = currentOrbitAngle + Math.PI * 0.4;
        const cx = Math.cos(cometAngle) * 7.6;
        const cy = -Math.sin(cometAngle) * 3.2;
        const cz = Math.sin(cometAngle) * 2.4;
        cometHeadMesh.position.set(cx, cy, cz);

        // Comet Tail Update
        const tailPosAttr = cometTailGeo.attributes.position;
        for (let t = 0; t < TAIL_POINTS; t++) {
          const trailAngle = cometAngle - (t * 0.035);
          const tx = Math.cos(trailAngle) * 7.6;
          const ty = -Math.sin(trailAngle) * 3.2;
          const tz = Math.sin(trailAngle) * 2.4;
          tailPosAttr.setXYZ(t, tx, ty, tz);
        }
        tailPosAttr.needsUpdate = true;

        // Pollen Particles Motion
        const pollenPosAttr = pollenGeo.attributes.position;
        for (let p = 0; p < POLLEN_COUNT; p++) {
          const pd = pollenData[p];
          pd.y += pd.speed;
          pd.x += Math.sin(elapsed * 0.8 + pd.phase) * 0.0015;
          if (pd.y > 5.0) pd.y = -5.0;
          pollenPosAttr.setXYZ(p, pd.x, pd.y, pd.z);
        }
        pollenPosAttr.needsUpdate = true;

        domains.forEach((d, idx) => {
          const group = domainGroups[idx];
          const mesh = domainMeshes[idx];
          const labelObj = domainCSS2DObjects[idx];

          const baseRad = (d.baseAngleDeg * Math.PI) / 180;
          const totalAngle = baseRad + currentOrbitAngle;

          const sx = Math.cos(totalAngle) * 7.6;
          const sy = -Math.sin(totalAngle) * 3.2;
          const sz = Math.sin(totalAngle) * 2.4;

          group.position.set(sx, sy, sz);

          // Spin ONLY child mesh: ~50s per full turn (2π)
          mesh.rotation.y = (elapsed / 50) * Math.PI * 2;

          const zNorm = sz / 2.4;
          const depthScale = 0.95 + 0.09 * ((zNorm + 1) / 2);
          const isHovered = hoveredDomainRef.current === d.id;
          const hoverMultiplier = isHovered ? 1.06 : 1.0;
          const sphereDelay = 0.2 + idx * 0.12;
          const sphereProgress = Math.max(0, Math.min(1, (entranceRef.current - sphereDelay) / 0.3));
          const entranceScale = prefersReducedMotion ? 1 : sphereProgress;

          const finalScale = depthScale * hoverMultiplier * entranceScale;
          group.scale.setScalar(finalScale);

          // Side decision based ONLY on orbit angle:
          // Front half (sin(totalAngle) > 0, sy < 0, lower on screen) -> BELOW
          // Back half (sin(totalAngle) <= 0, sy >= 0, upper on screen) -> ABOVE
          const targetSide: "below" | "above" = Math.sin(totalAngle) > 0 ? "below" : "above";
          const currentSide = domainLabelSide[idx];

          if (targetSide !== currentSide && !domainIsFading[idx]) {
            domainIsFading[idx] = true;
            labelObj.element.style.opacity = "0";

            setTimeout(() => {
              domainLabelSide[idx] = targetSide;
              if (targetSide === "below") {
                labelObj.center.set(0.5, 0);
                labelObj.position.set(0, -(domainSphereRadius + 0.22), 0);
              } else {
                labelObj.center.set(0.5, 1);
                labelObj.position.set(0, +(domainSphereRadius + 0.22), 0);
              }
              const baseOpacity = (0.75 + 0.25 * ((zNorm + 1) / 2)) * entranceScale;
              labelObj.element.style.opacity = `${baseOpacity}`;
              domainIsFading[idx] = false;
            }, 150);
          } else if (!domainIsFading[idx]) {
            if (currentSide === "below") {
              labelObj.center.set(0.5, 0);
              labelObj.position.set(0, -(domainSphereRadius + 0.22), 0);
            } else {
              labelObj.center.set(0.5, 1);
              labelObj.position.set(0, +(domainSphereRadius + 0.22), 0);
            }
            const baseOpacity = (0.75 + 0.25 * ((zNorm + 1) / 2)) * entranceScale;
            labelObj.element.style.opacity = `${baseOpacity}`;
          }
        });


      }

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
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
    observer.observe(container);

    startLoop();

    // Cleanup & Resource Disposal
    return () => {
      stopLoop();
      observer.disconnect();
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (container.contains(labelRenderer.domElement)) {
        container.removeChild(labelRenderer.domElement);
      }

      sharedSphereGeo.dispose();
      planetMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();

      domainMats.forEach((m) => m.dispose());
      domainFresnelMeshes.forEach((fm) => {
        fm.geometry.dispose();
        (fm.material as THREE.Material).dispose();
      });
      fresnelGeo.dispose();

      orbitLineGeo.dispose();
      orbitLineMat.dispose();

      cometHeadGeo.dispose();
      cometHeadMat.dispose();
      cometTailGeo.dispose();
      cometTailMat.dispose();

      pollenGeo.dispose();
      pollenMat.dispose();

      renderer.dispose();
    };
  }, [domains, core, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-visible"
    />
  );
}
