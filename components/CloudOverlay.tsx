'use client';

export default function CloudOverlay() {
    return (
        <>
            <style jsx>{`
                @keyframes cloudLoop {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-50%, 0, 0);
                    }
                }
                .cloud-scroll {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 250.625em;
                    height: 100%;
                    background: url(https://terriotech.com/cloud-overlay.png) 0 100% repeat-x;
                    animation: cloudLoop 80s linear infinite;
                    pointer-events: none;
                }
            `}</style>
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="cloud-scroll" />
            </div>
        </>
    );
}
