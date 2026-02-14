'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Clouds } from '@react-three/drei';
import * as THREE from 'three';

// Individual animated cloud wrapper
function DriftingCloud({ seed, bounds, volume, color, basePosition, opacity, segments, speed = 1, bobAmount = 0.5 }: {
    seed: number;
    bounds: [number, number, number];
    volume: number;
    color: string;
    basePosition: [number, number, number];
    opacity: number;
    segments: number;
    speed?: number;
    bobAmount?: number;
}) {
    const ref = useRef<THREE.Group>(null);
    const offset = useRef(Math.random() * Math.PI * 2);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime;
            // Horizontal drift
            ref.current.position.x = basePosition[0] + Math.sin(t * 0.08 * speed + offset.current) * 2;
            // Vertical bob
            ref.current.position.y = basePosition[1] + Math.sin(t * 0.15 * speed + offset.current * 2) * bobAmount;
            // Depth sway
            ref.current.position.z = basePosition[2] + Math.cos(t * 0.05 * speed + offset.current) * 0.5;
        }
    });

    return (
        <group ref={ref}>
            <Cloud
                seed={seed}
                bounds={bounds}
                volume={volume}
                color={color}
                opacity={opacity}
                segments={segments}
            />
        </group>
    );
}

function CloudScene() {
    const group = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (group.current) {
            // Slow continuous rotation for depth
            group.current.rotation.y += delta * 0.01;
        }
    });

    return (
        <group ref={group}>
            <Clouds limit={60}>
                <meshStandardMaterial
                    transparent
                    opacity={1}
                    roughness={1}
                    metalness={0}
                    emissive="#2a4a50"
                    emissiveIntensity={0.5}
                    side={THREE.DoubleSide}
                />

                {/* Main Storm Mass - Dark core */}
                <DriftingCloud
                    seed={42}
                    bounds={[14, 4, 4]}
                    volume={14}
                    color="#4a7a82"
                    basePosition={[0, 1, -2]}
                    opacity={1}
                    segments={18}
                    speed={0.8}
                    bobAmount={0.4}
                />

                {/* Lower Heavy Clouds */}
                <DriftingCloud
                    seed={55}
                    bounds={[20, 3, 6]}
                    volume={10}
                    color="#3a5d62"
                    basePosition={[4, -3, -5]}
                    opacity={0.95}
                    segments={14}
                    speed={1.2}
                    bobAmount={0.6}
                />

                {/* Upper Drifting Layer */}
                <DriftingCloud
                    seed={123}
                    bounds={[22, 5, 8]}
                    volume={12}
                    color="#5a8a92"
                    basePosition={[-4, 5, -7]}
                    opacity={0.7}
                    segments={14}
                    speed={0.6}
                    bobAmount={0.8}
                />

                {/* Side Cloud - Left */}
                <DriftingCloud
                    seed={77}
                    bounds={[16, 3, 5]}
                    volume={9}
                    color="#446870"
                    basePosition={[-7, -1, -3]}
                    opacity={0.85}
                    segments={12}
                    speed={1.0}
                    bobAmount={0.5}
                />

                {/* Side Cloud - Right */}
                <DriftingCloud
                    seed={91}
                    bounds={[14, 3, 4]}
                    volume={8}
                    color="#4e7a82"
                    basePosition={[7, 2, -4]}
                    opacity={0.8}
                    segments={10}
                    speed={1.4}
                    bobAmount={0.3}
                />

                {/* Foreground Wisp */}
                <DriftingCloud
                    seed={33}
                    bounds={[10, 2, 3]}
                    volume={6}
                    color="#5a8a90"
                    basePosition={[2, -5, 2]}
                    opacity={0.5}
                    segments={8}
                    speed={1.8}
                    bobAmount={0.7}
                />
            </Clouds>
        </group>
    );
}

export default function TexturedClouds() {
    return (
        <div className="absolute inset-0 w-full h-full bg-[#101f35] pointer-events-none">

            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                dpr={[1, 1.2]}
                gl={{ powerPreference: "high-performance", antialias: false }}
            >
                {/* 1. Ambient: Dim moody light */}
                <ambientLight intensity={0.8} color="#2a4a50" />

                {/* 2. Storm Light: From above */}
                <directionalLight position={[-5, 10, 5]} intensity={2.5} color="#5a8a95" />

                {/* 3. Under-glow: Deep teal */}
                <pointLight position={[5, -10, 5]} intensity={1.5} color="#2a4a50" />

                {/* 4. Rim Light: Subtle edge highlight */}
                <pointLight position={[0, 5, -10]} intensity={1} color="#3a6a75" />

                {/* 5. Flash accent: Occasional bright spot */}
                <pointLight position={[-8, 3, 3]} intensity={0.8} color="#5a8a95" />

                <CloudScene />
            </Canvas>
        </div>
    );
}