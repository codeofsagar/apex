'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    fullWidth?: boolean;
}

export default function FadeIn({
    children,
    className = "",
    delay = 0,
    direction = 'up',
    duration = 0.8,
    fullWidth = false
}: FadeInProps) {
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            let x = 0;
            let y = 0;

            if (direction === 'up') y = 40;
            if (direction === 'down') y = -40;
            if (direction === 'left') x = 40;
            if (direction === 'right') x = -40;

            gsap.fromTo(el.current,
                { opacity: 0, x, y, filter: "blur(10px)" }, // Added blur for that "award-winning" feel
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    filter: "blur(0px)",
                    duration: duration,
                    delay: delay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el.current,
                        start: "top 90%", // Trigger slightly later
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }, el);

        return () => ctx.revert();
    }, [delay, direction, duration]);

    return (
        <div ref={el} className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            {children}
        </div>
    );
}
