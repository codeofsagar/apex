'use client';

import CinematicLayout from '@/components/CinematicLayout';

export default function PrivacyPage() {
    return (
        <CinematicLayout>
            <div className="max-w-4xl mx-auto text-left space-y-12 animate-fade-in-up">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 mt-4">Last Updated: October 2025</p>
                </div>

                <div className="space-y-8 text-gray-300 leading-relaxed font-light">
                    <section>
                        <h2 className="text-2xl text-apex font-bold mb-4">1. Introduction</h2>
                        <p>Apex Companion AI ("we", "our", "us") respects your privacy. This policy describes how we collect, use, and protect your information.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-apex font-bold mb-4">2. Data We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Account information (name, email).</li>
                            <li>Project details and context provided by you.</li>
                            <li>Usage data and interaction history.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-apex font-bold mb-4">3. How We Use Data</h2>
                        <p>Your data is used solely to provide and improve the Companion AI service, specifically to maintain context and assist with your projects.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-apex font-bold mb-4">4. Data Protection</h2>
                        <p>We implement enterprise-grade security measures to protect your data from unauthorized access.</p>
                    </section>
                </div>
            </div>
        </CinematicLayout>
    );
}
