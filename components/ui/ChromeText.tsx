'use client';

import { Center, Environment, Text3D } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react';
import * as THREE from 'three';

interface ChromeTextProps {
    text: string;
    size?: number;
    height?: number;
    curveSegments?: number;
    bevelEnabled?: boolean;
    bevelThickness?: number;
    bevelSize?: number;
    bevelOffset?: number;
    bevelSegments?: number;
    rotation?: [number, number, number];
    className?: string; // For container sizing
    mobileScale?: number; // Multiplier for mobile devices (<768px)
    mobileSize?: number; // Specific size for mobile devices (overrides mobileScale if provided)
    envMapIntensity?: number; // Control reflection intensity
    letterSpacing?: number; // Adjusted letter spacing
    autoFit?: boolean; // Automatically scale down to fit viewport width
}

function Scene({
    text,
    size = 1,
    height = 0.5,
    curveSegments = 12,
    bevelEnabled = true,
    bevelThickness = 0.1,
    bevelSize = 0.05,
    bevelOffset = 0,
    bevelSegments = 5,
    rotation = [0, 0, 0],
    mobileScale = 0.5, // Default mobile scale factor
    mobileSize,
    autoFit = false,
    envMapIntensity = 1.5,
    letterSpacing = 0,
}: ChromeTextProps) {
    const [scaleFactor, setScaleFactor] = useState(1);
    const { viewport } = useThree();
    const textRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            let currentScale = 1;

            // 1. Determine base scale from mobile/desktop props
            if (isMobile) {
                if (mobileSize !== undefined && size > 0) {
                    currentScale = mobileSize / size;
                } else {
                    currentScale = mobileScale;
                }
            }

            // 2. Apply autoFit logic if enabled
            if (autoFit && textRef.current?.geometry) {
                textRef.current.geometry.computeBoundingBox();
                const box = textRef.current.geometry.boundingBox;

                if (box) {
                    const textWidth = box.max.x - box.min.x;
                    // Calculate visual width with current scale
                    const visualWidth = textWidth * currentScale;

                    // Available width in viewport units (with padding)
                    // Mobile usually needs more aggressive padding
                    const padding = isMobile ? 0.8 : 0.9;
                    const maxAllowedWidth = viewport.width * padding;

                    if (visualWidth > maxAllowedWidth) {
                        // Scale down to fit
                        const fitScale = maxAllowedWidth / textWidth;
                        currentScale = Math.min(currentScale, fitScale);
                    }
                }
            }

            setScaleFactor(currentScale);
        };

        // Run initially and on resize
        // We use a timeout to ensure geometry is ready, though usually it's sync after load
        // R3F Text3D loads font async, but component suspends? 
        // If font is loaded, geometry exists. If not, it might not be ready.
        // Let's try running it immediately.
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileScale, mobileSize, size, viewport.width, autoFit, text]); // Re-run when text changes too


    // Create materials inside the component to ensure React context is available
    const material = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'), // High reflectivity base
        metalness: 1.0,  // Full metal
        roughness: 0.1,  // Very smooth/polished
        envMapIntensity: envMapIntensity, // Strong reflections
    }), [envMapIntensity]);


    return (
        <>
            {/* Optimization: Reduced resolution for reflections. 256 is plenty for "shiny metal" look. */}
            <Environment preset="city" resolution={256} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={1} />
            <Center rotation={rotation} scale={scaleFactor}>
                <Text3D
                    ref={textRef}
                    font="/fonts/helvetiker_bold.typeface.json"
                    size={size}
                    height={height}
                    curveSegments={curveSegments}
                    bevelEnabled={bevelEnabled}
                    bevelThickness={bevelThickness}
                    bevelSize={bevelSize}
                    bevelOffset={bevelOffset}
                    bevelSegments={bevelSegments} // Lower poly count bevel
                    material={material}
                    letterSpacing={letterSpacing}
                >
                    {text}
                </Text3D>
            </Center>
        </>
    );
}

export default function ChromeText({
    text,
    className = "w-full h-40",
    ...props
}: ChromeTextProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                rootMargin: "200px", // Render slightly before entering viewport
                threshold: 0
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={className}>
            {/* Using Low FOV Perspective Camera to restore 3D feel but minimize distortion */}
            {/* Optimization: Render Canvas only when in viewport to save WebGL contexts */}
            {isVisible && (
                <Canvas
                    dpr={[1, 1.2]} // Capped at 1.2x for performance (visual difference is negligible)
                    frameloop="demand" // Only render when props change or textures load. Huge optimization for static text.
                    gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
                    camera={{ position: [0, 0, 30], fov: 15 }}
                >
                    <Suspense fallback={null}>
                        <Scene text={text} {...props} />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
