import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-transparent text-white mix-blend-difference">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-4 group">
                {/* Stylized 'A' Logo */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                    {/* Simple Triangle/A Shape SVG */}
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <path d="M50 10 L90 90 L10 90 Z" />
                        {/* Refined crossbar or inner detail to match 'A' better if needed, keeping simple triangle for now as per 'A' shape */}
                    </svg>
                    {/* Text 'A' Overlay/Effect if needed, but SVG path is cleaner. 
                 Let's try a specific 'A' shape path. 
                 M50 15 L85 90 H15 L50 15 Z is outer triangle.
                 Maybe just the letter A in a nice font if SVG is too generic? 
                 The image shows a thin, tall A. 
                 Let's stick to a custom path for a "stylized A".
             */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-2xl md:text-3xl tracking-tighter text-gray-200">A</span>
                    </div>
                </div>

                {/* Text Logo */}
                <span className="font-serif text-lg md:text-xl tracking-[0.2em] text-gray-200 uppercase">
                    Apex Flow Labs
                </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 text-[10px] tracking-[0.15em] font-medium text-gray-300">
                {["Companion AI", "Academy", "Publishing", "Health", "Media", "Affiliate", "Gear", "Pricing"].map((item) => (
                    <Link
                        key={item}
                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="hover:text-white transition-colors duration-300 uppercase"
                    >
                        {item}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Toggle (Simplified for now) */}
            <div className="lg:hidden">
                <span className="text-xs uppercase tracking-widest">Menu</span>
            </div>
        </nav>
    );
}
