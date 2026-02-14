'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const ORB_SCALE = 1.5; 
const SETTINGS = {
  // Increased intensity slightly to compensate for lower glow, making the core energy brighter
  electricIntensity: 0.45, 
  arcFrequency: 0.76,
  // Reduced glow strength significantly for sharper look
  glowStrength: 0.30       
};

const THEME = {
  deep: new THREE.Color(0x000000), // Darker deep color for contrast
  base: new THREE.Color(0x010a2e),
  main: new THREE.Color(0x0040ff), // Sharper blue
  accent: new THREE.Color(0x3399ff), // Brighter accent
  highlight: new THREE.Color(0xcce6ff),
};

// --- SHADERS (Unchanged helper functions) ---
const noiseHelperFunctions = `
  float hash(float n) { return fract(sin(n) * 43758.5453); }
  float hash3D(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 x) {
    vec3 p = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0 + p.z * 113.0;
    return mix(mix(mix(hash(n), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
               mix(mix(hash(n + 113.0), hash(n + 114.0), f.x), mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float value = 0.0; float amplitude = 0.5; float frequency = 1.0;
    for (int i = 0; i < 5; i++) { value += amplitude * noise(p * frequency); frequency *= 2.0; amplitude *= 0.5; }
    return value;
  }
  float fbm_improved(vec3 p) {
    float value = 0.0; float amplitude = 0.5; float frequency = 1.0;
    vec3 warp = vec3(fbm(p + vec3(0.0, 23.4, 12.7)), fbm(p + vec3(41.2, 0.0, 89.3)), fbm(p + vec3(16.8, 33.5, 0.0))) * 0.3;
    p += warp;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency); frequency *= 2.1; amplitude *= 0.5;
      p = vec3(p.y + p.z, p.z - p.x, p.x + p.y) * 0.7;
    }
    return value;
  }
  float voronoi(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p); float minDist = 1.0;
    for (int x = -1; x <= 1; x++) {
      for (int y = -1; y <= 1; y++) {
        for (int z = -1; z <= 1; z++) {
          vec3 neighbor = vec3(float(x), float(y), float(z));
          vec3 point = neighbor + hash3D(i + neighbor) - f;
          float dist = length(point); minDist = min(minDist, dist);
        }
      }
    }
    return minDist;
  }
`;

// --- VERTEX SHADER (Made distortion slightly sharper/faster) ---
const electricVertexShader = `
  uniform float time; uniform vec2 mouse; uniform float mouseInfluence;
  uniform float electricIntensity; uniform float arcFrequency; uniform vec3 themeColors[5];
  varying vec3 vPosition; varying vec3 vNormal; varying float vIntensity; varying float vDistFromMouse; varying vec2 vUv;
  ${noiseHelperFunctions}
  void main() {
    vec3 pos = position; vNormal = normal; vUv = uv;
    // Faster, tighter wave movement for more "energy" feel
    float wave = sin(position.x * 4.0 + time * 3.0) * cos(position.y * 4.0 + time * 2.5) * sin(position.z * 4.0 + time * 3.2) * 0.2;
    wave += fbm_improved(vec3(position.x * 3.5 + time * 1.5, position.y * 3.5 - time * 1.8, position.z * 3.5 + time * 1.6)) * 0.15;
    
    float arcNoise = fbm(vec3(position.x * 5.0 + time * 3.0, position.y * 5.0 + time * 2.0, position.z * 5.0 + time * 4.0));
    float voronoiPattern = voronoi(vec3(position.x * 4.0 + time * 1.0, position.y * 4.0 - time * 1.2, position.z * 4.0 + time * 0.9));
    arcNoise = mix(arcNoise, 1.0 - voronoiPattern, 0.4);
    float electricDistortion = fbm_improved(vec3(position.x * 3.0 - time * 2.0, position.y * 4.0 + time * 1.5, position.z * 3.0 - time * 1.8));
    float arcEffect = 0.0;
    float arcThreshold = mix(0.65, 0.55, arcFrequency * 0.5);
    if (arcNoise > arcThreshold) { float arcStrength = smoothstep(arcThreshold, arcThreshold + 0.2, arcNoise); arcEffect = arcStrength * arcFrequency * 2.0; }
    
    pos += normal * (wave * 0.2 * electricIntensity);
    pos += normal * (arcEffect * 0.5 * electricIntensity);
    // Sharper distortion spike
    pos += normal * (pow(electricDistortion, 2.0) * 0.25 * electricIntensity);
    
    vIntensity = wave * 0.5 + 0.5 + arcEffect * 2.5 + electricDistortion * 0.5;
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// --- FRAGMENT SHADER (Sharpened arcs, reduced glow) ---
const electricFragmentShader = `
  uniform float time; uniform float mouseInfluence; uniform float electricIntensity;
  uniform float glowStrength; uniform float arcFrequency; uniform vec3 themeColors[5];
  varying vec3 vPosition; varying vec3 vNormal; varying float vIntensity; varying float vDistFromMouse; varying vec2 vUv;
  ${noiseHelperFunctions}
  void main() {
    vec3 deepColor = themeColors[0]; vec3 baseColor = themeColors[1]; vec3 mainColor = themeColors[2];
    vec3 accentColor = themeColors[3]; vec3 highlightColor = themeColors[4];
    float t1 = sin(time * 0.7) * 0.5 + 0.5; float t2 = sin(time * 0.5 + 1.5) * 0.5 + 0.5; float t3 = sin(time * 1.3 + 0.7) * 0.5 + 0.5;
    
    float noisePattern = fbm_improved(vec3(vPosition.x * 3.0 + time * 1.0, vPosition.y * 3.0 - time * 0.7, vPosition.z * 3.0 + time * 1.2));
    float pulse = sin(time * 3.0 + vPosition.x * 0.5) * 0.5 + 0.5; 
    float fastPulse = sin(time * 20.0 + vPosition.y * 2.0) * 0.5 + 0.5; // Faster pulse

    float arcSpeed1 = 12.0; 
    float arcTravel1 = sin(vPosition.x * 14.0 + vPosition.y * 14.0 + time * arcSpeed1);
    float arcTravel2 = sin(vPosition.y * 10.0 + vPosition.z * 10.0 + time * (arcSpeed1 * 0.8));
    float branchPattern = voronoi(vec3(vPosition.x * 6.0 + time * 2.5, vPosition.y * 6.0 - time * 2.0, vPosition.z * 6.0 + time * 3.0));
    
    // **SHARPER ARCS**: Tighter smoothstep thresholds for higher contrast edges
    float arc1 = smoothstep(0.85, 0.98, arcTravel1) * smoothstep(0.98, 0.85, arcTravel1);
    float arc2 = smoothstep(0.8, 0.95, arcTravel2) * smoothstep(0.95, 0.8, arcTravel2);
    
    float arcMix = max(arc1, arc2);
    float arc = mix(arcMix, 1.0 - branchPattern, 0.2) * electricIntensity * arcFrequency * 2.5;

    // Darker base, less ambient noise
    vec3 baseColorMix = mix(deepColor, baseColor, noisePattern * 0.4);
    
    // **NARROWER ARCS**: Reduced width factor
    float arcWidth = (0.2 + sin(time * 10.0 + vPosition.x * 10.0) * 0.15);
    
    vec3 arcColor = mix(mainColor, accentColor, arcWidth * t2);
    arcColor = mix(arcColor, highlightColor, arc * t3); // Sharper highlight on arcs
    
    vec3 finalColor = mix(baseColorMix, arcColor, arc * arcWidth);

    // **REDUCED GLOW**: Significantly dialed back the ambient glow multiplier
    float glow = pow(vIntensity, 3.0) * glowStrength * 0.4; 
    vec3 glowColor = mix(mainColor, accentColor, noisePattern);
    finalColor += glowColor * glow;
    finalColor += highlightColor * glow * 0.3 * pulse;
    
    // Higher contrast brightness
    float brightnessFactor = 0.8 + electricIntensity * 0.5;
    finalColor *= brightnessFactor;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// --- COMPOSITE SHADER (Relaxed Vignette) ---
const alphaFixShader = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0.003 },
    time: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float amount;
    uniform float time;
    varying vec2 vUv;
    void main() {
       // Chromatic aberration for electrical feel
       float dynamic = amount * (1.5 + sin(time * 10.0) * 0.5);
       vec2 center = vUv - 0.5;
       float distToCenter = length(center);
       vec2 offset = normalize(center) * dynamic * smoothstep(0.0, 0.6, distToCenter);
       
       vec4 cr = texture2D(tDiffuse, vUv + offset);
       vec4 cg = texture2D(tDiffuse, vUv);
       vec4 cb = texture2D(tDiffuse, vUv - offset);
       vec3 color = vec3(cr.r, cg.g, cb.b);
       
       float brightness = max(max(color.r, color.g), color.b);
       
       // Higher threshold for sharper cutoff of faint glow
       float alpha = smoothstep(0.05, 0.4, brightness); 

       // **RELAXED VIGNETTE**: Pushed the start of the fade further out (0.45 to 0.55)
       // so it doesn't look like a tight circle border.
       float vignette = 1.0 - smoothstep(0.45, 0.6, distToCenter);
       alpha *= vignette;
       
       gl_FragColor = vec4(color, alpha);
    }
  `
};

export default function ElectricOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    if (width === 0) width = 100;
    if (height === 0) height = 100;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.5, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Turned off AA for sharper edges
      alpha: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); 
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // --- SPHERE GEOMETRY (Increased segments for sharper wireframe) ---
    const createElectricWireframeSphere = (radius: number, segments: number) => {
      const positions = [], normals = [], uvs = [], indices = [];
      for (let y = 0; y <= segments; y++) {
        const v = y / segments; const phi = v * Math.PI;
        for (let x = 0; x <= segments; x++) {
          const u = x / segments; const theta = u * Math.PI * 2;
          const noiseFactor = Math.sin(theta * 10) * Math.cos(phi * 9) * 0.03; // Sharper noise
          const distortion = 1.0 + noiseFactor;
          const px = -radius * Math.cos(theta) * Math.sin(phi) * distortion;
          const py = radius * Math.cos(phi) * distortion;
          const pz = radius * Math.sin(theta) * Math.sin(phi) * distortion;
          positions.push(px, py, pz);
          const normal = new THREE.Vector3(px, py, pz).normalize();
          normals.push(normal.x, normal.y, normal.z);
          uvs.push(u, v);
        }
      }
      for (let y = 0; y < segments; y++) {
        for (let x = 0; x < segments; x++) {
          const a = (segments + 1) * y + x; const b = (segments + 1) * y + x + 1;
          const c = (segments + 1) * (y + 1) + x; const d = (segments + 1) * (y + 1) + x + 1;
          indices.push(a, b, a, c);
          if ((x % 3 === 0 && y % 2 === 0) || (x % 2 === 0 && y % 3 === 0)) indices.push(a, d);
          if ((x + y) % 4 === 0) indices.push(b, c);
          if (y === segments - 1) indices.push(c, d);
          if (x === segments - 1) indices.push(b, d);
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      return geometry;
    };

    const electricMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() },
        mouseInfluence: { value: 0.0 },
        electricIntensity: { value: SETTINGS.electricIntensity },
        arcFrequency: { value: SETTINGS.arcFrequency },
        glowStrength: { value: SETTINGS.glowStrength },
        themeColors: { value: [THEME.deep, THEME.base, THEME.main, THEME.accent, THEME.highlight] }
      },
      vertexShader: electricVertexShader,
      fragmentShader: electricFragmentShader,
      transparent: true,
      wireframe: true,
      wireframeLinewidth: 5.5, // Slightly thicker wires for definition
      side: THREE.DoubleSide,
      depthWrite: false, // Helps with internal glowing feel
      blending: THREE.AdditiveBlending // Cleaner energy look
    });

    // Increased segments for sharper definition
    const sphereGeometry = createElectricWireframeSphere(ORB_SCALE, 124);
    const electricSphere = new THREE.LineSegments(sphereGeometry, electricMaterial);
    scene.add(electricSphere);

    // --- BOLTS (Sharpened) ---
    const boltCount = 10;
    const bolts = new THREE.Group();
    // Additive blending for sharper bolts
    const boltMaterial = new THREE.LineBasicMaterial({ color: THEME.highlight, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    for(let i=0; i<boltCount; i++) {
        const group = new THREE.Group();
        const pts = [];
        const start = new THREE.Vector3((Math.random()-0.5)*2, (Math.random()-0.5)*2, (Math.random()-0.5)*2).normalize().multiplyScalar(ORB_SCALE * 0.9);
        const end = start.clone().multiplyScalar(5.3 + Math.random() * 0.6);
        const segments = 18;
        for(let j=0; j<=segments; j++) {
            const t = j/segments;
            const p = new THREE.Vector3().lerpVectors(start, end, t);
            // More jagged bolts
            if (j>0 && j<segments) p.add(new THREE.Vector3((Math.random()-0.5)*0.4, (Math.random()-0.5)*0.4, (Math.random()-0.5)*0.4));
            pts.push(p);
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(geo, boltMaterial.clone());
        line.userData = { active: false, age: 0, lifetime: 0.4 }; // Shorter lifetime for faster flashing
        line.visible = false;
        group.add(line);
        bolts.add(group);
    }
    scene.add(bolts);

    // --- COMPOSER ---
    const renderTarget = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType
    });

    const composer = new EffectComposer(renderer, renderTarget);
    const renderPass = new RenderPass(scene, camera);
    renderPass.clearColor = new THREE.Color(0x000000);
    renderPass.clearAlpha = 0; 
    composer.addPass(renderPass);

    // **TIGHTER BLOOM**: Lower strength, smaller radius, higher threshold
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.1, 0.1, 0.1);
    composer.addPass(bloomPass);

    const finalPass = new ShaderPass(alphaFixShader);
    composer.addPass(finalPass);

    // --- ANIMATION ---
    let time = 0;
    const animate = () => {
        time += 0.015; // Faster animation speed
        electricMaterial.uniforms.time.value = time;
        finalPass.uniforms.time.value = time;
        electricSphere.rotation.y += 0.008;
        electricSphere.rotation.x += 0.004;

        bolts.children.forEach(grp => {
            const line = grp.children[0] as THREE.Line;
            if(line.userData.active) {
                line.userData.age += 0.016;
                (line.material as THREE.LineBasicMaterial).opacity = 1 - (line.userData.age / line.userData.lifetime);
                if(line.userData.age > line.userData.lifetime) { 
                    line.userData.active = false; 
                    line.visible = false; 
                }
            } else if (Math.random() > 0.97) {
                line.userData.active = true;
                line.userData.age = 0;
                line.visible = true;
                (line.material as THREE.LineBasicMaterial).opacity = 1;
            }
        });

        composer.render();
        requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);

    // --- RESIZE OBSERVER ---
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0) {
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
                composer.setSize(width, height);
                bloomPass.resolution.set(width, height);
            }
        }
    });
    resizeObserver.observe(container);

    return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(animId);
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        renderer.dispose();
        renderTarget.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full bg-transparent" />;
}