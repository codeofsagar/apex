'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
    title: string;
    containerClass?: string;
    wordClass?: string;
}

export default function AnimatedTitle({ title, containerClass = "", wordClass = "text-apex" }: AnimatedTitleProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    end: "center bottom",
                    toggleActions: "play none none reverse",
                },
            });

            titleAnimation.to(
                ".animated-word",
                {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
                    ease: "power2.inOut",
                    stagger: 0.05, // Slightly faster stagger for premium feel
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`animated-title ${containerClass}`}>
            {title.split(' ').map((word, i) => (
                <span
                    key={i}
                    className={`animated-word inline-block opacity-0 translate-y-10 ${wordClass}`}
                    style={{
                        transform: 'translate3d(0, 40px, 0) rotateY(10deg) rotateX(-90deg)',
                        transformOrigin: '50% 50% -150px'
                    }}
                    dangerouslySetInnerHTML={{ __html: word + '&nbsp;' }}
                />
            ))}
        </div>
    );
}
