"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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
    imgSrc: "/images/one-health/soil.png",
  },
  {
    id: "plant",
    name: "PLANT",
    baseAngleDeg: 342, // Top-Right (+72°)
    imgSrc: "/images/one-health/plant.png",
  },
  {
    id: "animal",
    name: "ANIMAL",
    baseAngleDeg: 54, // Bottom-Right (+72°)
    imgSrc: "/images/one-health/animal.png",
  },
  {
    id: "food",
    name: "FOOD",
    baseAngleDeg: 126, // Bottom-Left (+72°)
    imgSrc: "/images/one-health/food.png",
  },
  {
    id: "people",
    name: "PEOPLE",
    baseAngleDeg: 198, // Top-Left (+72°)
    imgSrc: "/images/one-health/people.png",
  },
];

const DEFAULT_CORE: CoreSlotConfig = {
  name: "PLANET",
  tagline: "ONE HEALTH CORE",
  imgSrc: "/images/one-health/planet.png",
};

interface OneHealthOrbit3DProps {
  domains?: DomainSlotConfig[];
  core?: CoreSlotConfig;
  entranceProgress?: number; // 0 to 1 for entrance orchestration
}

interface LabelState {
  id: string;
  name: string;
  x: number;
  y: number;
  opacity: number;
}

export default function OneHealthOrbit3D({
  domains = DEFAULT_DOMAINS,
  core = DEFAULT_CORE,
  entranceProgress = 1,
}: OneHealthOrbit3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [labelStates, setLabelStates] = useState<LabelState[]>([]);

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

    // 1. Scene & Perspective Camera Setup (FOV 30, camera position at (0, 0.6, D), lookAt(0, 0, 0))
    const scene = new THREE.Scene();
    const fov = 30;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);

    // Orbit parameters
    const planetRadius = 1.5;
    const domainSphereRadius = 0.85;

    // Fit without cropping calculation
    const halfHeight = 3.9; // 2.6 + 0.85 + label room
    const halfWidth = 6.4;

    const updateCameraDistance = (aspect: number) => {
      const fovRad = (fov * Math.PI) / 180;
      const halfFovTan = Math.tan(fovRad / 2);
      const dHeight = halfHeight / halfFovTan;
      const dWidth = halfWidth / (halfFovTan * aspect);
      return Math.max(dHeight, dWidth);
    };

    let camDistance = updateCameraDistance(width / height);
    camera.position.set(0, 0.6, camDistance);
    camera.lookAt(0, 0, 0);

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
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    // 3. Parent Group at World Origin (0,0,0)
    const sceneGroup = new THREE.Group();
    sceneGroup.position.set(0, 0, 0);
    scene.add(sceneGroup);

    // 4. Lighting System (Illuminated front and shadow sides)
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

    // 5. Texture Loaders
    const textureLoader = new THREE.TextureLoader();
    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

    const loadDomainTexture = (url: string) => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set(1, 1);
      tex.offset.set(0, 0);
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    };

    const loadPlanetTexture = (url: string) => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    };

    // 6. Central Planet Mesh (Radius 1.5, normal UVs, axial tilt z=0.2)
    const planetTexture = loadPlanetTexture(core.imgSrc);
    const planetGeo = new THREE.SphereGeometry(planetRadius, 48, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      map: planetTexture,
      color: 0xffffff,
      roughness: 0.8,
      metalness: 0.0,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetMesh.position.set(0, 0, 0);
    planetMesh.rotation.z = 0.2;
    sceneGroup.add(planetMesh);

    // Planet Outer Atmosphere Rim
    const atmosGeo = new THREE.SphereGeometry(planetRadius * 1.025, 32, 24);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x147a46,
      transparent: true,
      opacity: 0.14,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    atmosMesh.rotation.z = 0.2;
    sceneGroup.add(atmosMesh);

    // 7. 5 Domain Spheres with Front Projection UVs & rotation.x = -0.3
    const domainMeshes: THREE.Mesh[] = [];
    const domainGeos: THREE.BufferGeometry[] = [];
    const domainMats: THREE.Material[] = [];
    const domainFresnelMeshes: THREE.Mesh[] = [];

    const domainSphereGeo = new THREE.SphereGeometry(domainSphereRadius, 48, 32);
    const posAttr = domainSphereGeo.attributes.position;
    const uvAttr = domainSphereGeo.attributes.uv;
    for (let i = 0; i < posAttr.count; i++) {
      const px = posAttr.getX(i);
      const py = posAttr.getY(i);
      uvAttr.setXY(i, (px / domainSphereRadius) * 0.5 + 0.5, (py / domainSphereRadius) * 0.5 + 0.5);
    }
    uvAttr.needsUpdate = true;

    const fresnelGeo = new THREE.SphereGeometry(domainSphereRadius * 1.02, 32, 24);

    domains.forEach((d) => {
      const tex = loadDomainTexture(d.imgSrc);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.0,
      });
      const mesh = new THREE.Mesh(domainSphereGeo, mat);
      mesh.rotation.x = -0.3; // Pole faces away from camera to remove pinched top
      sceneGroup.add(mesh);

      const fresnelMat = new THREE.MeshBasicMaterial({
        color: 0xa9e889,
        transparent: true,
        opacity: 0.28,
        side: THREE.BackSide,
      });
      const fresnelMesh = new THREE.Mesh(fresnelGeo, fresnelMat);
      mesh.add(fresnelMesh);
      domainFresnelMeshes.push(fresnelMesh);

      domainMeshes.push(mesh);
      domainGeos.push(domainSphereGeo);
      domainMats.push(mat);
    });

    // 8. Smooth Ellipse 3D Orbit Line (256 points with custom depth-fading shader)
    const ORBIT_POINTS_COUNT = 256;
    const orbitLinePositions = new Float32Array(ORBIT_POINTS_COUNT * 3);

    for (let i = 0; i < ORBIT_POINTS_COUNT; i++) {
      const a = (i / (ORBIT_POINTS_COUNT - 1)) * Math.PI * 2;
      orbitLinePositions[i * 3 + 0] = Math.cos(a) * 5.2;
      orbitLinePositions[i * 3 + 1] = -Math.sin(a) * 2.6;
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
      const px = (Math.random() - 0.5) * 16;
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

    // 11. ResizeObserver for responsive canvas & camera distance
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth || 1200;
      height = container.clientHeight || 700;

      const aspect = width / height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      camDistance = updateCameraDistance(aspect);
      camera.position.set(0, 0.6, camDistance);
      camera.lookAt(0, 0, 0);

      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 3D to 2D Screen Projection Vectors
    const sphereProjVec = new THREE.Vector3();
    const sphereEdgeProjVec = new THREE.Vector3();

    // 12. Animation Loop Setup
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

        // Slow planet spin
        planetMesh.rotation.y = (elapsed / 45) * Math.PI * 2;

        // Continuous orbit rotation (~100s per revolution)
        const orbitPeriod = 100;
        const currentOrbitAngle = (elapsed / orbitPeriod) * Math.PI * 2;

        // Comet Head Position
        const cometAngle = currentOrbitAngle + Math.PI * 0.4;
        const cx = Math.cos(cometAngle) * 5.2;
        const cy = -Math.sin(cometAngle) * 2.6;
        const cz = Math.sin(cometAngle) * 2.4;
        cometHeadMesh.position.set(cx, cy, cz);

        // Comet Tail Update (14 points trailing behind comet angle)
        const tailPosAttr = cometTailGeo.attributes.position;
        for (let t = 0; t < TAIL_POINTS; t++) {
          const trailAngle = cometAngle - (t * 0.035);
          const tx = Math.cos(trailAngle) * 5.2;
          const ty = -Math.sin(trailAngle) * 2.6;
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

        const newLabelStates: LabelState[] = [];

        // Staggered pop-in calculation (Soil, Plant, Animal, Food, People)
        const currentProgress = entranceRef.current;

        domains.forEach((d, idx) => {
          const mesh = domainMeshes[idx];

          const baseRad = (d.baseAngleDeg * Math.PI) / 180;
          const totalAngle = baseRad + currentOrbitAngle;

          const sx = Math.cos(totalAngle) * 5.2;
          const sy = -Math.sin(totalAngle) * 2.6;
          const sz = Math.sin(totalAngle) * 2.4;

          mesh.position.set(sx, sy, sz);

          // Keep rotation.x = -0.3 so poles face away from camera
          mesh.rotation.x = -0.3;
          mesh.rotation.y = (elapsed / (25 + idx * 3)) * Math.PI * 2;

          // Depth scaling 0.93 to 1.07
          const zNorm = sz / 2.4;
          const depthScale = 0.93 + 0.14 * ((zNorm + 1) / 2);

          const isHovered = hoveredDomainRef.current === d.id;
          const hoverMultiplier = isHovered ? 1.06 : 1.0;

          // Staggered sphere entrance delay (140ms apart)
          const sphereDelay = 0.2 + idx * 0.12;
          const sphereProgress = Math.max(0, Math.min(1, (currentProgress - sphereDelay) / 0.3));
          const entranceScale = prefersReducedMotion ? 1 : sphereProgress;

          const finalScale = depthScale * hoverMultiplier * entranceScale;

          mesh.scale.setScalar(finalScale);

          // Projected screen positions for labels
          sphereProjVec.set(sx, sy, sz);
          sphereProjVec.applyMatrix4(sceneGroup.matrixWorld);
          sphereProjVec.project(camera);

          const sphereCenterSx = (sphereProjVec.x * 0.5 + 0.5) * width;
          const sphereCenterSy = (-(sphereProjVec.y * 0.5) + 0.5) * height;

          sphereEdgeProjVec.set(sx + domainSphereRadius * finalScale, sy, sz);
          sphereEdgeProjVec.applyMatrix4(sceneGroup.matrixWorld);
          sphereEdgeProjVec.project(camera);
          const sphereEdgePx = (sphereEdgeProjVec.x * 0.5 + 0.5) * width;
          const sphereScreenRadius = Math.abs(sphereEdgePx - sphereCenterSx);

          const labelPx = sphereCenterSx;

          // Back half (sin(totalAngle) < 0): label ABOVE sphere (-16px)
          // Front half (sin(totalAngle) >= 0): label BELOW sphere (+16px)
          const isBackHalf = Math.sin(totalAngle) < 0;
          const labelPy = isBackHalf
            ? sphereCenterSy - sphereScreenRadius - 16
            : sphereCenterSy + sphereScreenRadius + 16;

          const labelOpacity = (0.75 + 0.25 * ((zNorm + 1) / 2)) * entranceScale;

          newLabelStates.push({
            id: d.id,
            name: d.name,
            x: labelPx,
            y: labelPy,
            opacity: labelOpacity,
          });
        });

        setLabelStates(newLabelStates);
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

      planetGeo.dispose();
      planetMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();

      domainGeos.forEach((g) => g.dispose());
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
    >
      {/* Upright HTML Pill Labels positioned above (back half) or below (front half) spheres */}
      {labelStates.map((lbl) => (
        <div
          key={lbl.id}
          className="absolute z-30 pointer-events-auto cursor-pointer transition-opacity duration-300"
          style={{
            transform: `translate3d(calc(-50% + ${lbl.x}px), calc(-50% + ${lbl.y}px), 0)`,
            left: 0,
            top: 0,
            opacity: lbl.opacity,
          }}
          onMouseEnter={() => setHoveredDomainId(lbl.id)}
          onMouseLeave={() => setHoveredDomainId(null)}
        >
          <span
            className="inline-flex items-center font-semibold tracking-wider uppercase transition-colors duration-300 whitespace-nowrap shadow-sm text-[13px] sm:text-[14px]"
            style={{
              backgroundColor: "rgba(237, 244, 237, 0.85)",
              border: "1px solid rgba(20, 122, 70, 0.2)",
              padding: "3px 12px",
              borderRadius: "999px",
              color: hoveredDomainId === lbl.id ? "#147A46" : "#173522",
            }}
          >
            {lbl.name}
          </span>
        </div>
      ))}
    </div>
  );
}
