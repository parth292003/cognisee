import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LivingSphereCanvasProps {
  currentSection?: number;
  scrollYProgress?: number;
  interactive?: boolean;
}

export const LivingSphereCanvas: React.FC<LivingSphereCanvasProps> = ({
  currentSection = 0,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereGroupRef = useRef<THREE.Group | null>(null);
  const mainSphereRef = useRef<THREE.Mesh | null>(null);
  const innerCoreRef = useRef<THREE.Mesh | null>(null);
  const satelliteGroupRef = useRef<THREE.Group | null>(null);
  const satelliteMeshRef = useRef<THREE.Mesh | null>(null);
  const orbitalRingsRef = useRef<THREE.Group | null>(null);
  const collectiveNodesRef = useRef<THREE.Group | null>(null);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    cameraRef.current = camera;

    // 2. Renderer with anti-aliasing and alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Lighting setup (designed for translucent glass caustics & emerald reflections)
    const ambientLight = new THREE.AmbientLight(0x13231a, 1.8);
    scene.add(ambientLight);

    // Rim light from top right (white/cream specular)
    const keyLight = new THREE.DirectionalLight(0xf6efe5, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Emerald core uplight from bottom left
    const greenUplight = new THREE.PointLight(0xb7de9d, 4.5, 12, 1.2);
    greenUplight.position.set(-2.5, -2, 1.5);
    scene.add(greenUplight);

    // Subtle mint backlight
    const mintBacklight = new THREE.PointLight(0xa6d4bd, 2.8, 15, 1.5);
    mintBacklight.position.set(0, -1, -3);
    scene.add(mintBacklight);

    // 4. Main Sphere Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    sphereGroupRef.current = masterGroup;

    // A. Outer Glass Sphere
    const sphereGeometry = new THREE.SphereGeometry(1.65, 64, 64);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x091a11,
      emissive: 0x0e2417,
      emissiveIntensity: 0.25,
      roughness: 0.06,
      metalness: 0.1,
      transmission: 0.88,
      ior: 1.42,
      thickness: 1.5,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xf6efe5),
      transparent: true,
      opacity: 0.94,
    });
    const mainSphere = new THREE.Mesh(sphereGeometry, glassMaterial);
    masterGroup.add(mainSphere);
    mainSphereRef.current = mainSphere;

    // B. Inner Emerald / Jade Core
    const innerGeometry = new THREE.SphereGeometry(0.85, 48, 48);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d7054,
      emissive: 0x286f61,
      emissiveIntensity: 0.65,
      roughness: 0.25,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    masterGroup.add(innerCore);
    innerCoreRef.current = innerCore;

    // C. Orbital Paths & Filaments
    const orbitalGroup = new THREE.Group();
    masterGroup.add(orbitalGroup);
    orbitalRingsRef.current = orbitalGroup;

    // Ring 1 (Tilted ellipse 1)
    const curve1 = new THREE.EllipseCurve(0, 0, 2.5, 2.1, 0, 2 * Math.PI, false, 0);
    const points1 = curve1.getPoints(120);
    const ringGeo1 = new THREE.BufferGeometry().setFromPoints(
      points1.map(p => new THREE.Vector3(p.x, p.y, 0))
    );
    const ringMat1 = new THREE.LineBasicMaterial({
      color: 0xb7de9d,
      transparent: true,
      opacity: 0.45,
      linewidth: 1
    });
    const ring1 = new THREE.LineLoop(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    orbitalGroup.add(ring1);

    // Ring 2 (Tilted ellipse 2)
    const curve2 = new THREE.EllipseCurve(0, 0, 2.7, 1.8, 0, 2 * Math.PI, false, 0);
    const points2 = curve2.getPoints(120);
    const ringGeo2 = new THREE.BufferGeometry().setFromPoints(
      points2.map(p => new THREE.Vector3(p.x, p.y, 0))
    );
    const ringMat2 = new THREE.LineBasicMaterial({
      color: 0xa6d4bd,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.LineLoop(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    orbitalGroup.add(ring2);

    // Ring 3 (Outer sweeping filament)
    const curve3 = new THREE.EllipseCurve(0, 0, 3.1, 2.6, 0, 2 * Math.PI, false, 0);
    const points3 = curve3.getPoints(140);
    const ringGeo3 = new THREE.BufferGeometry().setFromPoints(
      points3.map(p => new THREE.Vector3(p.x, p.y, 0))
    );
    const ringMat3 = new THREE.LineBasicMaterial({
      color: 0x577f67,
      transparent: true,
      opacity: 0.25,
    });
    const ring3 = new THREE.LineLoop(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    ring3.rotation.z = -Math.PI / 6;
    orbitalGroup.add(ring3);

    // Crosshair axes (for Section 2 precision look)
    const axisMat = new THREE.LineBasicMaterial({
      color: 0x577f67,
      transparent: true,
      opacity: 0.2,
    });
    const vertGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -2.8, 0),
      new THREE.Vector3(0, 2.8, 0),
    ]);
    const vertAxis = new THREE.Line(vertGeo, axisMat);
    orbitalGroup.add(vertAxis);

    const horizGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.8, 0, 0),
      new THREE.Vector3(2.8, 0, 0),
    ]);
    const horizAxis = new THREE.Line(horizGeo, axisMat);
    orbitalGroup.add(horizAxis);

    // D. Satellite Sphere (for dual system in Section 4)
    const satelliteGroup = new THREE.Group();
    masterGroup.add(satelliteGroup);
    satelliteGroupRef.current = satelliteGroup;

    const satGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xb7de9d,
      emissive: 0x577f67,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.3,
    });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    satMesh.position.set(2.4, 0.4, 0.5);
    satelliteGroup.add(satMesh);
    satelliteMeshRef.current = satMesh;

    // E. Collective Intelligence Sub-Nodes (Section 7)
    const collectiveGroup = new THREE.Group();
    masterGroup.add(collectiveGroup);
    collectiveNodesRef.current = collectiveGroup;

    const nodePositions = [
      new THREE.Vector3(-1.8, 1.2, 0.3),
      new THREE.Vector3(1.6, -1.1, -0.4),
      new THREE.Vector3(-1.3, -1.4, 0.5),
      new THREE.Vector3(1.9, 1.3, -0.2),
    ];

    nodePositions.forEach((pos) => {
      const nodeGeo = new THREE.SphereGeometry(0.32, 24, 24);
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color: 0x142019,
        emissive: 0x286f61,
        emissiveIntensity: 0.4,
        roughness: 0.1,
        transmission: 0.85,
        transparent: true,
        opacity: 0.8,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      collectiveGroup.add(node);

      // Connective thread from core to node
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        pos,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xb7de9d,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      collectiveGroup.add(line);
    });

    // Start with collective nodes hidden/dimmed until Section 7
    collectiveGroup.visible = false;

    // 5. Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.45;
      mouseRef.current.targetY = ny * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Group rotation & gentle float
      if (masterGroup) {
        masterGroup.rotation.y = elapsedTime * 0.12 + mouseRef.current.x;
        masterGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08 + mouseRef.current.y;
        masterGroup.position.y = Math.sin(elapsedTime * 0.6) * 0.08;
      }

      // Orbital rings rotate at distinct speeds
      if (orbitalGroup) {
        orbitalGroup.children.forEach((child, i) => {
          child.rotation.z += 0.0015 * (i % 2 === 0 ? 1 : -1.2);
        });
      }

      // Satellite orbit
      if (satelliteGroup) {
        satelliteGroup.rotation.y = elapsedTime * 0.35;
        satelliteGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.2;
      }

      // Inner core pulse
      if (innerCore) {
        const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
        innerCore.scale.set(pulse, pulse, pulse);
      }

      // Dynamic updates based on currentSection
      if (collectiveGroup) {
        collectiveGroup.visible = currentSection >= 6;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full pointer-events-none"
      style={{ minHeight: '100%', minWidth: '100%' }}
    />
  );
};
