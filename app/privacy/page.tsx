'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';

export default function PrivacyPage() {
    return (
        <CinematicLayout
            desktopImage="/featuresdesktop.png"
            mobileImage="/featuremob.png"
        >
            <div className="max-w-4xl mx-auto text-left space-y-12 animate-fade-in-up">
                <div className="text-center mb-12">
                    <div className="w-full h-32 md:h-48 flex items-center justify-center mb-4">
                        <ChromeText
                            text="Privacy Policy"
                            size={2.5}
                            mobileSize={1.2}
                            height={0.5}
                            autoFit={true}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                    </div>
                    <p className="text-gray-400">Last Updated: October 2025</p>
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
