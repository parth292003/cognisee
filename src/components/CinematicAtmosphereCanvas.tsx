import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicAtmosphereCanvasProps {
  scrollProgress: number;
  isLightMode: boolean;
}

export const CinematicAtmosphereCanvas: React.FC<CinematicAtmosphereCanvasProps> = ({
  scrollProgress,
  isLightMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const gridGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 1. Subtle Floating Dust Motes / Photons
    const particleCount = 180;
    const posArray = new Float32Array(particleCount * 3);
    const speedArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
      speedArray[i / 3] = 0.2 + Math.random() * 0.4;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xfbfbf9,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 2. Minimalist Architectural Horizon Lines (Abstract Geodesic Coordinate Grid)
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);
    gridGroupRef.current = gridGroup;

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8a8f99,
      transparent: true,
      opacity: 0.08,
    });

    // Elegant horizontal and vertical perspective hairlines
    for (let y = -4; y <= 4; y += 2) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-12, y, -2),
        new THREE.Vector3(12, y, -2),
      ]);
      gridGroup.add(new THREE.Line(geo, lineMat));
    }

    for (let x = -8; x <= 8; x += 4) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, -6, -2),
        new THREE.Vector3(x, 6, -2),
      ]);
      gridGroup.add(new THREE.Line(geo, lineMat));
    }

    // Mouse Movement
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.3;
      mouseRef.current.targetY = ny * 0.2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Camera parallax & breathing
      camera.position.x = mouseRef.current.x + Math.sin(elapsedTime * 0.2) * 0.08;
      camera.position.y = mouseRef.current.y + Math.cos(elapsedTime * 0.15) * 0.06;
      camera.lookAt(0, 0, 0);

      // Dust motes gentle drift
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += Math.sin(elapsedTime * 0.5 + i) * 0.002;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Grid subtle rotation with scroll
      if (gridGroupRef.current) {
        gridGroupRef.current.rotation.z = scrollProgress * 0.1;
        gridGroupRef.current.position.y = -scrollProgress * 2.5;
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
  }, []);

  // Update particle opacity and color based on light/dark mode
  useEffect(() => {
    if (particlesRef.current) {
      const mat = particlesRef.current.material as THREE.PointsMaterial;
      mat.color.setHex(isLightMode ? 0x141619 : 0xfbfbf9);
      mat.opacity = isLightMode ? 0.15 : 0.25;
    }
  }, [isLightMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
