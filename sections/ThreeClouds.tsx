'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Clouds } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function CloudScene() {
    const group = useRef<THREE.Group>(null);

    // Texture loader removed to fix runtime error

    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.01;
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        }
    });

    return (
        <group ref={group}>
            {/* Reduced limit further to 80 to support active rendering during Zoom */}
            <Clouds limit={80}>
                {/* Using MeshStandardMaterial with high roughness 
                  prevents the 'plastic' look and reacts to the directional light 
                */}
                <meshStandardMaterial
                    transparent
                    opacity={0.8}
                    roughness={1}
                    metalness={0}
                    side={THREE.DoubleSide}
                />

                {/* Main thick clouds */}
                <Cloud
                    seed={10}
                    bounds={[15, 2, 2]}
                    volume={15}
                    color="#f2f2f2"
                    position={[0, 0, -5]}
                    opacity={0.6}
                    speed={0.2}
                    segments={20} // Reduced from 40 for performance
                />

                {/* Darker base clouds for depth (The 'Dull' look) */}
                <Cloud
                    seed={20}
                    bounds={[20, 3, 5]}
                    volume={10}
                    color="#899499" // Paynes Grey
                    position={[2, -3, -8]}
                    opacity={0.4}
                    speed={0.1}
                />

                {/* Wispy outer layers */}
                <Cloud
                    seed={30}
                    bounds={[25, 5, 10]}
                    volume={20}
                    color="#d1d5db"
                    position={[-5, 5, -12]}
                    opacity={0.3}
                    speed={0.3}
                    growth={4}
                />
            </Clouds>
        </group>
    );
}

export default function TexturedClouds() {
    return (
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-400 via-yellow-600 to-amber-900 pointer-events-none">
            {/* 
                Optimization: dpr={[1, 1.5]} ensures we don't render at full 4K on high-DPI screens, 
                which is the #1 cause of lag. 1.2x is even faster and visually sufficient for motion.
            */}
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.2]}>
                {/* Ambient light for general visibility */}
                <ambientLight intensity={0.2} />

                {/* Key light to create highlights on the cloud "rims" */}
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fffcf2" />

                {/* Rim light from behind for silhouette definition */}
                <pointLight position={[-10, -5, -10]} intensity={0.8} color="#94a3b8" />

                <CloudScene />

                {/* 
                   Optimization: Removed Bloom/EffectComposer to allow concurrent rendering 
                   with the heavy DemoSection zoom.
                */}
            </Canvas>
        </div>
    );
}