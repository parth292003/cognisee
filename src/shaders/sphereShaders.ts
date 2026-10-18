export const sphereVertexShader = `
  uniform float uTime;
  uniform float uDeformStrength;
  uniform float uFluidPulse;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Harmonic surface tension wave (smooth liquid breathing, never spiky or bacterial)
    float wave1 = sin(position.y * 2.2 + uTime * 0.75) * cos(position.x * 2.0 + uTime * 0.6);
    float wave2 = sin(position.z * 2.5 - uTime * 0.5) * 0.5;
    float displacement = (wave1 + wave2) * 0.5 * uDeformStrength;
    
    // Add subtle heartbeat pulse
    displacement += sin(uTime * 1.5) * 0.015 * uFluidPulse;
    vDisplacement = displacement;

    vec3 displacedPosition = position + normal * displacement;
    vec4 worldPosition = modelMatrix * vec4(displacedPosition, 1.0);
    vWorldPosition = worldPosition.xyz;

    vec4 mvPosition = viewMatrix * worldPosition;
    vViewPosition = -mvPosition.xyz;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const sphereFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorCore;
  uniform vec3 uColorGlow;
  uniform float uOpacity;
  uniform float uEnvLightness; // 0.0 for deep forest dark, 1.0 for warm cream
  uniform float uRevealProgress; // 0.0 (veiled) to 1.0 (fully materialized)

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // 1. Optical Fresnel rim calculation
    float NdotV = max(dot(normal, viewDir), 0.0);
    float fresnel = pow(1.0 - NdotV, 3.2);

    // 2. Subsurface volumetric caustic (emerald light traveling through the interior)
    float causticWave = sin(vPosition.y * 3.2 - uTime * 1.1 + vPosition.x * 1.8) * 0.5 + 0.5;
    causticWave = pow(causticWave, 4.0);
    vec3 causticGlow = mix(uColorCore, uColorGlow, causticWave * 0.85);

    // 3. Deep Obsidian Core with Beer-Lambert absorption
    float coreDepth = clamp(1.0 - length(vPosition) * 0.45, 0.0, 1.0);
    vec3 baseColor = mix(uColorBase, uColorCore, coreDepth);

    // 4. Combine core, subsurface caustics, and outer crystal rim
    vec3 finalColor = mix(baseColor, causticGlow, 0.45 + vDisplacement * 0.8);
    finalColor = mix(finalColor, uColorGlow, fresnel * 0.88);

    // 5. Specular highlight (Studio Key Light from high-right)
    vec3 lightDir = normalize(vec3(2.5, 4.0, 3.0));
    vec3 halfVec = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfVec), 0.0), 48.0);
    vec3 specularColor = mix(vec3(0.96, 0.94, 0.88), vec3(0.85, 0.95, 0.88), fresnel);
    finalColor += specularColor * spec * 0.75;

    // 6. Environment light adaptation (Cream background bounce)
    if (uEnvLightness > 0.05) {
      vec3 creamBounce = vec3(0.12, 0.18, 0.14) * (1.0 - NdotV);
      finalColor = mix(finalColor, finalColor + creamBounce, uEnvLightness);
    }

    // 7. Opening sequence reveal effect (gradual emergence from shadow)
    finalColor *= clamp(uRevealProgress, 0.0, 1.0);
    float alpha = mix(uOpacity * uRevealProgress, 0.98, fresnel * 0.5);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;
