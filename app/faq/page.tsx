'use client';

import CinematicLayout from '@/components/CinematicLayout';

const faqs = [
    { q: "What makes this different from ChatGPT?", a: "ChatGPT is a generalist. Apex Companion AI is a specialist built to remember your specific context and drive execution, not just conversation." },
    { q: "Does it remember me?", a: "Yes. Long-term memory is the core feature. It builds a profile of your goals and projects over time." },
    { q: "Who is it for?", a: "Builders, founders, and operators who need clarity and execution support." },
    { q: "When does access open?", a: "We are onboarding users in waves. Request access to join the queue." },
    { q: "How does it integrate with Apex Flow Labs?", a: "It serves as the intelligence layer for the entire ecosystem." }
];

export default function FAQPage() {
    return (
        <CinematicLayout>
            <div className="max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    Frequent Questions
                </h1>

                <div className="space-y-6 text-left">
                    {faqs.map((item, idx) => (
                        <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <h3 className="text-xl md:text-2xl text-apex font-bold mb-2 group-hover:text-white transition-colors">
                                {item.q}
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed">
                                {item.a}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="pt-8">
                    <button className="mystic-button">
                        Request Access
                    </button>
                </div>
            </div>
        </CinematicLayout>
    );
}
