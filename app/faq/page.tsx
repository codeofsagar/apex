'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

const faqs = [
    { q: "What makes this different from ChatGPT?", a: "ChatGPT is a generalist. Apex Companion AI is a specialist built to remember your specific context and drive execution, not just conversation." },
    { q: "Does it remember me?", a: "Yes. Long-term memory is the core feature. It builds a profile of your goals and projects over time." },
    { q: "Who is it for?", a: "Builders, founders, and operators who need clarity and execution support." },
    { q: "When does access open?", a: "We are onboarding users in waves. Request access to join the queue." },
    { q: "How does it integrate with Apex Flow Labs?", a: "It serves as the intelligence layer for the entire ecosystem." }
];

export default function FAQPage() {
    return (
        <CinematicLayout
            desktopImage="/op.png" // CHANGE THIS: "/faq-bg.png"
            mobileImage="/mobop.png" // CHANGE THIS: "/faq-mobile.png"
        >
            <div className="max-w-4xl mx-auto text-center space-y-16">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-4">
                    <ChromeText
                        text="Frequent Questions"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.05}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

                <div className="space-y-6 text-left">
                    {faqs.map((item, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group hover:scale-[1.02] duration-300">
                                <h3 className="text-xl md:text-2xl text-apex font-bold mb-2 group-hover:text-white transition-colors">
                                    {item.q}
                                </h3>
                                <p className="text-apex opacity-80 font-light leading-relaxed">
                                    {item.a}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.6} className="pt-8">
                    <button className="mystic-button">
                        Request Access
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
