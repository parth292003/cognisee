import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sphereVertexShader, sphereFragmentShader } from '../shaders/sphereShaders';

gsap.registerPlugin(ScrollTrigger);

interface PersistentSphereCanvasProps {
  activeDomainId?: string;
  onSceneChange?: (sceneIndex: number, isLight: boolean) => void;
}

// 9 Scene target coordinates for the persistent 3D world
const SCENE_TARGETS = [
  // Scene 01: First Contact (Dark) - Right offset, telephoto, restrained optical glass
  {
    x: 2.1, y: 0.08, z: 0.0,
    scale: 1.45,
    deform: 0.06,
    envLight: 0.0,
    collective: 0.0,
    camFov: 32,
    isLight: false,
  },
  // Scene 02: Intelligence Takes Form (Cream) - Centered, scaled, liquid breathing surface tension
  {
    x: 0.0, y: -0.1, z: 0.45,
    scale: 1.8,
    deform: 0.22,
    envLight: 1.0,
    collective: 0.0,
    camFov: 30,
    isLight: true,
  },
  // Scene 03: Many Worlds of Knowledge (Dark) - Sweeps left, filaments reach across
  {
    x: -2.0, y: 0.0, z: 0.0,
    scale: 1.35,
    deform: 0.12,
    envLight: 0.0,
    collective: 0.0,
    camFov: 32,
    isLight: false,
  },
  // Scene 04: Human Agency (Cream) - Center-right, calm, dignified stillness
  {
    x: 1.7, y: -0.18, z: 0.1,
    scale: 1.5,
    deform: 0.04,
    envLight: 1.0,
    collective: 0.0,
    camFov: 32,
    isLight: true,
  },
  // Scene 05: Trust and Responsibility (Dark) - Center-left, exploratory filaments
  {
    x: -1.6, y: -0.1, z: 0.0,
    scale: 1.4,
    deform: 0.14,
    envLight: 0.0,
    collective: 0.0,
    camFov: 32,
    isLight: false,
  },
  // Scene 06: Collective Intelligence (Dark) - Cellular division: 4 satellite bodies orbit
  {
    x: 0.0, y: 0.0, z: -0.2,
    scale: 0.95,
    deform: 0.18,
    envLight: 0.0,
    collective: 1.0,
    camFov: 34,
    isLight: false,
  },
  // Scene 07: Governance & Sovereignty (Dark) - Planar alignment of network
  {
    x: 0.0, y: -0.12, z: -0.1,
    scale: 1.1,
    deform: 0.1,
    envLight: 0.0,
    collective: 0.65,
    camFov: 33,
    isLight: false,
  },
  // Scene 08: The Founding Position (Cream) - Quiet monolith beside paper
  {
    x: 2.2, y: 0.0, z: -0.2,
    scale: 1.25,
    deform: 0.03,
    envLight: 1.0,
    collective: 0.0,
    camFov: 32,
    isLight: true,
  },
  // Scene 09: Final Transformation (Dark) - Re-converged into unified refined sphere
  {
    x: 0.0, y: -0.55, z: 0.35,
    scale: 1.6,
    deform: 0.08,
    envLight: 0.0,
    collective: 0.0,
    camFov: 32,
    isLight: false,
  },
];

export const PersistentSphereCanvas: React.FC<PersistentSphereCanvasProps> = ({
  activeDomainId,
  onSceneChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // 3D Objects & Materials
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const sphereMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);
  const filamentsGroupRef = useRef<THREE.Group | null>(null);
  const satelliteGroupRef = useRef<THREE.Group | null>(null);
  const subSpheresRef = useRef<{ mesh: THREE.Mesh; target: THREE.Vector3; line: THREE.Line }[]>([]);

  // Interpolated animation values
  const currentProps = useRef({
    x: 2.1,
    y: 0.08,
    z: 0.0,
    scale: 1.45,
    deform: 0.06,
    envLight: 0.0,
    collective: 0.0,
    fov: 32,
    reveal: 0.0,
  });

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera with Cinematic Telephoto Perspective
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    cameraRef.current = camera;

    // 2. High-Precision WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0e2417, 1.4);
    scene.add(ambientLight);

    const studioKeyLight = new THREE.DirectionalLight(0xf6efe5, 3.2);
    studioKeyLight.position.set(3.5, 4.5, 4.0);
    scene.add(studioKeyLight);

    const rimLight = new THREE.DirectionalLight(0xa6d4bd, 2.0);
    rimLight.position.set(-4.0, -2.0, -3.0);
    scene.add(rimLight);

    const internalEmeraldLight = new THREE.PointLight(0xb7de9d, 3.8, 12, 1.2);
    internalEmeraldLight.position.set(0, 0, 0);
    scene.add(internalEmeraldLight);

    // 4. Master 3D Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    masterGroupRef.current = masterGroup;

    // 5. Contact Floor Shadow (Soft Grounding Plane)
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0,0,0,0.45)');
      grad.addColorStop(0.5, 'rgba(7,20,14,0.2)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.65;
    masterGroup.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // 6. The Master Sphere (Living Digital Sculpture)
    const sphereGeometry = new THREE.SphereGeometry(1.55, 128, 128);
    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: sphereVertexShader,
      fragmentShader: sphereFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uDeformStrength: { value: 0.06 },
        uFluidPulse: { value: 1.0 },
        uColorBase: { value: new THREE.Color('#07140E') },
        uColorCore: { value: new THREE.Color('#13231A') },
        uColorGlow: { value: new THREE.Color('#B7DE9D') },
        uOpacity: { value: 0.94 },
        uEnvLightness: { value: 0.0 },
        uRevealProgress: { value: 0.0 },
      },
      transparent: true,
      depthWrite: true,
    });
    sphereMaterialRef.current = sphereMaterial;

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    masterGroup.add(sphereMesh);
    sphereMeshRef.current = sphereMesh;

    // 7. Intelligence Filaments (Procedural 3D Splines)
    const filamentsGroup = new THREE.Group();
    masterGroup.add(filamentsGroup);
    filamentsGroupRef.current = filamentsGroup;

    // Main narrative intelligence thread
    const narrativeSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6.5, -3.2, -1.0),
      new THREE.Vector3(-3.2, -1.5, 0.4),
      new THREE.Vector3(-1.4, -0.4, 1.4),
      new THREE.Vector3(0.0, 0.0, 1.56), // Touching surface
      new THREE.Vector3(1.6, 0.7, 1.1),
      new THREE.Vector3(4.0, 1.6, 0.0),
      new THREE.Vector3(7.0, 2.5, -1.2),
    ]);
    const threadGeo = new THREE.TubeGeometry(narrativeSpline, 120, 0.015, 8, false);
    const threadMat = new THREE.MeshStandardMaterial({
      color: 0xb7de9d,
      emissive: 0x577f67,
      emissiveIntensity: 0.8,
      roughness: 0.25,
    });
    const threadMesh = new THREE.Mesh(threadGeo, threadMat);
    filamentsGroup.add(threadMesh);

    // Restrained secondary filaments
    const secondaryCurves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, -1.55, 0.0),
        new THREE.Vector3(1.2, -1.8, 0.8),
        new THREE.Vector3(2.5, -1.2, 0.4),
        new THREE.Vector3(3.8, -0.6, 0.0),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.1, 1.1, 0.0),
        new THREE.Vector3(-2.2, 1.6, 0.5),
        new THREE.Vector3(-3.5, 1.9, 0.0),
      ]),
    ];

    secondaryCurves.forEach((curve) => {
      const geo = new THREE.TubeGeometry(curve, 60, 0.009, 6, false);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xa6d4bd,
        transparent: true,
        opacity: 0.35,
      });
      filamentsGroup.add(new THREE.Mesh(geo, mat));
    });

    // 8. Collective Intelligence Satellite Spheres (Scene 06 & 07)
    const satelliteGroup = new THREE.Group();
    masterGroup.add(satelliteGroup);
    satelliteGroupRef.current = satelliteGroup;

    const satellitePositions = [
      new THREE.Vector3(-2.6, 1.2, 0.2), // Clinical Intuition
      new THREE.Vector3(2.4, -0.8, 0.3),  // Aerospace Diagnostics
      new THREE.Vector3(-1.9, -1.5, -0.2),// Institutional Sovereignty
      new THREE.Vector3(2.2, 1.3, -0.1),  // Semiconductor Systems
    ];

    subSpheresRef.current = satellitePositions.map((pos) => {
      const nodeGeo = new THREE.SphereGeometry(0.38, 48, 48);
      const nodeMat = new THREE.ShaderMaterial({
        vertexShader: sphereVertexShader,
        fragmentShader: sphereFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uDeformStrength: { value: 0.08 },
          uFluidPulse: { value: 1.0 },
          uColorBase: { value: new THREE.Color('#07140E') },
          uColorCore: { value: new THREE.Color('#286F61') },
          uColorGlow: { value: new THREE.Color('#B7DE9D') },
          uOpacity: { value: 0.92 },
          uEnvLightness: { value: 0.0 },
          uRevealProgress: { value: 1.0 },
        },
        transparent: true,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.scale.set(0.001, 0.001, 0.001);
      satelliteGroup.add(nodeMesh);

      // Connecting filament from master to satellite
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xb7de9d,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      satelliteGroup.add(line);

      return { mesh: nodeMesh, target: pos, line };
    });

    // 9. Opening Cinematic Reveal Animation (Reverse-Engineered Pattern)
    gsap.fromTo(
      currentProps.current,
      { reveal: 0.0 },
      {
        reveal: 1.0,
        duration: 2.2,
        ease: 'power3.out',
        delay: 0.2,
      }
    );

    // 10. GSAP ScrollTrigger Choreography across all 9 scenes
    const sceneElements = document.querySelectorAll('section[data-scene-index]');
    sceneElements.forEach((el, index) => {
      const target = SCENE_TARGETS[index];
      if (!target) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(currentProps.current, {
            x: target.x,
            y: target.y,
            z: target.z,
            scale: target.scale,
            deform: target.deform,
            envLight: target.envLight,
            collective: target.collective,
            fov: target.camFov,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          onSceneChange?.(index, target.isLight);
        },
        onEnterBack: () => {
          gsap.to(currentProps.current, {
            x: target.x,
            y: target.y,
            z: target.z,
            scale: target.scale,
            deform: target.deform,
            envLight: target.envLight,
            collective: target.collective,
            fov: target.camFov,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          onSceneChange?.(index, target.isLight);
        },
      });
    });

    // 11. Pointer Parallax Listener
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.25;
      mouseRef.current.targetY = ny * 0.2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 12. Responsive Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 13. Render Loop with Handheld Camera Breathing & Dynamic Satellite Orbit
    let clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Handheld organic breathing motion (reverse engineered from igloo.inc)
      const shakeX = Math.sin(elapsedTime * 0.45) * 0.015;
      const shakeY = Math.cos(elapsedTime * 0.35) * 0.012;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Update camera FOV if changed
      if (camera.fov !== currentProps.current.fov) {
        camera.fov = currentProps.current.fov;
        camera.updateProjectionMatrix();
      }

      // Update Master Group Position, Scale, Rotation
      if (masterGroup) {
        masterGroup.position.set(
          currentProps.current.x + mouseRef.current.x + shakeX,
          currentProps.current.y + mouseRef.current.y + shakeY,
          currentProps.current.z
        );
        masterGroup.scale.setScalar(currentProps.current.scale);
        masterGroup.rotation.y = elapsedTime * 0.12;
      }

      // Update Sphere Shader Uniforms
      if (sphereMaterialRef.current) {
        sphereMaterialRef.current.uniforms.uTime.value = elapsedTime;
        sphereMaterialRef.current.uniforms.uDeformStrength.value = currentProps.current.deform;
        sphereMaterialRef.current.uniforms.uEnvLightness.value = currentProps.current.envLight;
        sphereMaterialRef.current.uniforms.uRevealProgress.value = currentProps.current.reveal;
      }

      // Update Shadow Mesh Opacity & Scale
      if (shadowMeshRef.current) {
        shadowMeshRef.current.scale.setScalar(currentProps.current.scale * 1.1);
        (shadowMeshRef.current.material as THREE.MeshBasicMaterial).opacity =
          (1.0 - currentProps.current.envLight * 0.4) * 0.6 * currentProps.current.reveal;
      }

      // Update Collective Satellite Spheres
      const collectiveFactor = currentProps.current.collective;
      subSpheresRef.current.forEach((item, idx) => {
        const orbitAngle = elapsedTime * 0.35 + idx * ((Math.PI * 2) / 4);
        const radius = 2.4 * collectiveFactor;

        const curX = Math.cos(orbitAngle) * radius;
        const curY = item.target.y * collectiveFactor + Math.sin(elapsedTime * 1.2 + idx) * 0.06;
        const curZ = Math.sin(orbitAngle) * radius * 0.5;

        item.mesh.position.set(curX, curY, curZ);
        const s = Math.max(collectiveFactor * 0.85, 0.001);
        item.mesh.scale.setScalar(s);

        // Update connecting filament to satellite
        const posAttr = item.line.geometry.attributes.position as THREE.BufferAttribute;
        if (posAttr) {
          posAttr.setXYZ(0, 0, 0, 0);
          posAttr.setXYZ(1, curX, curY, curZ);
          posAttr.needsUpdate = true;
        }

        if (item.mesh.material instanceof THREE.ShaderMaterial) {
          item.mesh.material.uniforms.uTime.value = elapsedTime;
        }
      });

      // Internal light color shift based on active domain
      if (activeDomainId) {
        internalEmeraldLight.intensity = 4.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
