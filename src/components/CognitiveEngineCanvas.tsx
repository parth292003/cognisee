import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CognitiveEngineCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activeSection: string;
}

export const CognitiveEngineCanvas: React.FC<CognitiveEngineCanvasProps> = ({
  scrollProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const userRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FAF9F6');

    // Telephoto camera to eliminate wide-angle distortion (Apple / Igloo standard)
    const camera = new THREE.PerspectiveCamera(
      32,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Renderer with high visual precision
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // --- Studio Lighting ---
    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Cool rim light for glass edge definition
    const rimLight = new THREE.DirectionalLight(0xe8f0fe, 1.4);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // Soft daylight ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Warm caustic under-light
    const causticLight = new THREE.PointLight(0xd4a373, 1.2, 10);
    causticLight.position.set(0, -2.5, 1);
    scene.add(causticLight);

    // --- Shadow / Ground Plane ---
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.08 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // --- Master Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- Optical Materials ---
    // Translucent refractive crystal (Apple glass precision)
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.54,
      thickness: 1.4,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      metalness: 0.02,
    });

    // Titanium hardware retaining rings
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8cbd0,
      metalness: 0.88,
      roughness: 0.22,
    });

    // Inner amber tacit kernel
    const amberKernelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd48b38,
      emissive: 0xc97a2b,
      emissiveIntensity: 0.65,
      roughness: 0.15,
      transmission: 0.6,
      thickness: 0.8,
      metalness: 0.1,
    });

    // Laser optical beam material
    const laserMaterial = new THREE.LineBasicMaterial({
      color: 0xe63946,
      linewidth: 2,
      transparent: true,
      opacity: 0.8,
    });

    // --- 3D Geometries & Components ---

    // 1. Central Prismatic Monolith (Explodable into left/right halves)
    const leftPrismGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.4, 6, 1, false, 0, Math.PI);
    const rightPrismGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.4, 6, 1, false, Math.PI, Math.PI);

    const leftPrism = new THREE.Mesh(leftPrismGeo, crystalMaterial);
    leftPrism.castShadow = true;
    leftPrism.receiveShadow = true;

    const rightPrism = new THREE.Mesh(rightPrismGeo, crystalMaterial);
    rightPrism.castShadow = true;
    rightPrism.receiveShadow = true;

    const prismGroup = new THREE.Group();
    prismGroup.add(leftPrism);
    prismGroup.add(rightPrism);
    masterGroup.add(prismGroup);

    // 2. Inner Tacit Core (Octahedron of unwritten judgment)
    const tacitCoreGeo = new THREE.OctahedronGeometry(0.48, 0);
    const tacitCore = new THREE.Mesh(tacitCoreGeo, amberKernelMaterial);
    tacitCore.castShadow = true;
    masterGroup.add(tacitCore);

    // 3. Concentric Titanium Retaining & Vernier Rings
    const ringGeo1 = new THREE.TorusGeometry(1.15, 0.025, 16, 64);
    const ring1 = new THREE.Mesh(ringGeo1, titaniumMaterial);
    ring1.rotation.x = Math.PI / 2;
    masterGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.35, 0.02, 16, 64);
    const ring2 = new THREE.Mesh(ringGeo2, titaniumMaterial);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(1.55, 0.015, 16, 64);
    const ring3 = new THREE.Mesh(ringGeo3, titaniumMaterial);
    masterGroup.add(ring3);

    // 4. Optical Collimator Lenses (for Agency by Design section)
    const lensGeo = new THREE.SphereGeometry(0.7, 32, 16);
    lensGeo.scale(1, 1, 0.18);
    const lens1 = new THREE.Mesh(lensGeo, crystalMaterial);
    const lens2 = new THREE.Mesh(lensGeo, crystalMaterial);
    const lensGroup = new THREE.Group();
    lensGroup.add(lens1);
    lensGroup.add(lens2);
    lensGroup.visible = false;
    masterGroup.add(lensGroup);

    // 5. Laser Ray / Epistemic Alignment Beam
    const laserPoints = [
      new THREE.Vector3(-4, 0, 0),
      new THREE.Vector3(4, 0, 0),
    ];
    const laserGeo = new THREE.BufferGeometry().setFromPoints(laserPoints);
    const laserLine = new THREE.Line(laserGeo, laserMaterial);
    laserLine.visible = false;
    masterGroup.add(laserLine);

    // 6. Specialist Domain Nodes (Orbiting constellation)
    const satelliteNodes: THREE.Mesh[] = [];
    const satelliteCount = 4;
    const satGeo = new THREE.IcosahedronGeometry(0.22, 0);

    for (let i = 0; i < satelliteCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, crystalMaterial);
      satMesh.castShadow = true;
      satMesh.visible = false;
      masterGroup.add(satMesh);
      satelliteNodes.push(satMesh);
    }

    // Connective laser rays between satellite nodes
    const networkLineMat = new THREE.LineBasicMaterial({
      color: 0x2b59c3,
      transparent: true,
      opacity: 0.35,
    });
    const networkPoints = new Float32Array(satelliteCount * 6);
    const networkGeo = new THREE.BufferGeometry();
    networkGeo.setAttribute('position', new THREE.BufferAttribute(networkPoints, 3));
    const networkLines = new THREE.LineSegments(networkGeo, networkLineMat);
    networkLines.visible = false;
    masterGroup.add(networkLines);

    // 7. Ambient Optical Floating Particles (Subtle laboratory dust motes)
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8e939e,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- Interaction Listeners ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x * 0.4;
      mousePos.current.targetY = y * 0.3;

      if (isDragging.current) {
        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;
        userRotation.current.y += deltaX * 0.005;
        userRotation.current.x += deltaY * 0.005;
        dragStart.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation & Scroll Progression Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Base gentle breathing rotation
      const baseRotY = elapsedTime * 0.15 + userRotation.current.y;
      const baseRotX = Math.sin(elapsedTime * 0.2) * 0.05 + userRotation.current.x;

      // Current scroll progress (0.0 to 1.0)
      const p = scrollProgress;

      // --- STATE TRANSFORMATIONS BASED ON SCROLL PROGRESS ---

      if (p < 0.22) {
        // --- PHASE 0: HERO MONOLITH ---
        // Unitary pristine crystal
        leftPrism.position.x = 0;
        rightPrism.position.x = 0;
        leftPrism.rotation.y = 0;
        rightPrism.rotation.y = 0;
        tacitCore.scale.setScalar(0.7 + Math.sin(elapsedTime * 2) * 0.03);

        ring1.scale.setScalar(1);
        ring2.scale.setScalar(1);
        ring3.scale.setScalar(1);

        lensGroup.visible = false;
        laserLine.visible = false;
        satelliteNodes.forEach((s) => (s.visible = false));
        networkLines.visible = false;

        masterGroup.position.set(0, 0, 0);
        masterGroup.scale.setScalar(1.0);
        camera.position.set(mousePos.current.x, mousePos.current.y + 0.2, 7.5);
      } else if (p >= 0.22 && p < 0.44) {
        // --- PHASE 1: TACIT KNOWLEDGE DISSECTION (Polanyi's Paradox) ---
        // Normalizing progress for this phase (0 to 1)
        const localP = (p - 0.22) / 0.22;

        // The crystal halves smoothly split open laterally (like Apple exploded hardware view)
        const separation = THREE.MathUtils.lerp(0, 1.45, localP);
        leftPrism.position.x = -separation;
        rightPrism.position.x = separation;
        leftPrism.rotation.y = localP * 0.4;
        rightPrism.rotation.y = -localP * 0.4;

        // The inner tacit kernel expands into prominent focus with warm emission
        const kernelScale = THREE.MathUtils.lerp(0.7, 1.35, localP);
        tacitCore.scale.setScalar(kernelScale);
        tacitCore.rotation.y = elapsedTime * 0.8;
        tacitCore.rotation.x = elapsedTime * 0.4;

        // Rings extend along the lateral axis
        ring1.position.x = -separation * 0.6;
        ring2.position.x = separation * 0.6;
        ring3.scale.setScalar(1 + localP * 0.3);

        lensGroup.visible = false;
        laserLine.visible = false;
        satelliteNodes.forEach((s) => (s.visible = false));
        networkLines.visible = false;

        masterGroup.position.set(mousePos.current.x * 0.5, 0.1, 0);
        camera.position.set(0, 0.4, 7.2);
      } else if (p >= 0.44 && p < 0.66) {
        // --- PHASE 2: AGENCY BY DESIGN (Optical Collimator / Amplification) ---
        const localP = (p - 0.44) / 0.22;

        // Prism halves fold back into precision optical assembly
        leftPrism.position.x = -0.3;
        rightPrism.position.x = 0.3;

        // Reveal the optical lens array along a precision laser line
        lensGroup.visible = true;
        laserLine.visible = true;
        satelliteNodes.forEach((s) => (s.visible = false));
        networkLines.visible = false;

        const lensSpacing = THREE.MathUtils.lerp(1.2, 1.8, localP);
        lens1.position.set(-lensSpacing, 0, 0);
        lens2.position.set(lensSpacing, 0, 0);
        lens1.rotation.y = Math.PI / 2;
        lens2.rotation.y = Math.PI / 2;

        // Laser beam pulses
        laserLine.position.y = Math.sin(elapsedTime * 3) * 0.02;

        // Focus calibration
        const focusFactor = 0.5 + Math.sin(elapsedTime * 1.5) * 0.5;
        tacitCore.position.set(0, 0, 0);
        tacitCore.scale.setScalar(0.9 + focusFactor * 0.3);

        masterGroup.position.set(0, -0.2, 0);
        camera.position.set(mousePos.current.x * 0.8, 0.3, 7.0);
      } else if (p >= 0.66 && p < 0.85) {
        // --- PHASE 3: THE PLURAL COUNCIL & COLLECTIVE INTELLIGENCE ---
        const localP = (p - 0.66) / 0.19;

        lensGroup.visible = false;
        laserLine.visible = false;

        // Orbiting satellite nodes representing specialist domains (Aerospace, Medicine, Finance, Infrastructure)
        satelliteNodes.forEach((sat, i) => {
          sat.visible = true;
          const angle = (i / satelliteCount) * Math.PI * 2 + elapsedTime * 0.2;
          const radius = THREE.MathUtils.lerp(1.5, 2.3, localP);
          const yOffset = Math.sin(angle * 2) * 0.4;
          sat.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
          sat.rotation.x = elapsedTime;
          sat.rotation.y = elapsedTime * 1.2;
        });

        // Update network laser lines connecting nodes to central core
        networkLines.visible = true;
        const positions = networkLines.geometry.attributes.position.array as Float32Array;
        let idx = 0;
        satelliteNodes.forEach((sat) => {
          positions[idx++] = 0;
          positions[idx++] = 0;
          positions[idx++] = 0;
          positions[idx++] = sat.position.x;
          positions[idx++] = sat.position.y;
          positions[idx++] = sat.position.z;
        });
        networkLines.geometry.attributes.position.needsUpdate = true;

        leftPrism.position.x = 0;
        rightPrism.position.x = 0;
        tacitCore.scale.setScalar(1.1);

        masterGroup.position.set(0, 0, 0);
        camera.position.set(mousePos.current.x, 0.5, 7.8);
      } else {
        // --- PHASE 4: SOVEREIGN WISDOM VAULT & RESTING STANCE ---
        const localP = Math.min(1, (p - 0.85) / 0.15);

        satelliteNodes.forEach((s) => (s.visible = false));
        networkLines.visible = false;
        lensGroup.visible = false;
        laserLine.visible = false;

        // Monolith locks tight into cylindrical vault core
        leftPrism.position.x = 0;
        rightPrism.position.x = 0;

        // Rings align into concentric vault governance shields
        ring1.rotation.set(Math.PI / 2, elapsedTime * 0.4, 0);
        ring2.rotation.set(Math.PI / 2, -elapsedTime * 0.3, 0);
        ring3.rotation.set(Math.PI / 2, elapsedTime * 0.2, 0);

        ring1.scale.setScalar(1.2);
        ring2.scale.setScalar(1.4);
        ring3.scale.setScalar(1.6);

        // Core descends gracefully toward ground contact
        const groundY = THREE.MathUtils.lerp(0, -0.6, localP);
        masterGroup.position.set(0, groundY, 0);
        shadowPlane.position.y = -2.1;

        camera.position.set(mousePos.current.x * 0.5, 0.1, 7.5);
      }

      // Smooth master rotation
      masterGroup.rotation.y = baseRotY;
      masterGroup.rotation.x = baseRotX;

      // Particle system gentle drift
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      // Clean geometry and textures
      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0 select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
      title="Click and drag to inspect the Cognitive Engine in 3D"
    >
      {/* Interactive Telemetry / Inspection HUD */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-3 pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF9F6]/80 backdrop-blur-md border border-[#111215]/10 text-[10px] font-mono text-[#111215]/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C98A4B] animate-pulse" />
          <span>{isHovered ? 'INTERACTIVE // DRAG TO ROTATE' : 'ENGINE: REAL-TIME 3D'}</span>
        </div>
      </div>
    </div>
  );
};
