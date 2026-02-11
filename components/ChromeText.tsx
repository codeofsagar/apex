import React from 'react';

interface ChromeTextProps {
    children: React.ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

export default function ChromeText({
    children,
    className = '',
    as: Component = 'span'
}: ChromeTextProps) {
    return (
        <Component
            className={`
        bg-clip-text text-transparent bg-linear-to-b from-gray-300 via-white to-gray-400
        drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
        ${className}
      `}
            style={{
                backgroundImage: 'linear-gradient(to bottom, #d1d5db 0%, #ffffff 50%, #9ca3af 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.5))'
            }}
        >
            {children}
        </Component>
    );
}
