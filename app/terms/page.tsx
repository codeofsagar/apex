'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';

export default function TermsPage() {
    return (
        <CinematicLayout
            desktopImage="/featuresdesktop.png"
            mobileImage="/featuremob.png"
        >
            <div className="max-w-4xl mx-auto text-left space-y-12 animate-fade-in-up">
                <div className="text-center mb-12">
                    <div className="w-full h-32 md:h-48 flex items-center justify-center mb-4">
                        <ChromeText
                            text="Terms of Service"
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
                        <h2 className="text-2xl text-apex font-bold mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing or using Apex Companion AI, you agree to be bound by these Terms of Service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-apex font-bold mb-4">2. Use License</h2>
                        <p>We grant you a limited, non-exclusive, non-transferable license to use the service for your personal or internal business purposes.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-apex font-bold mb-4">3. User Responsibilities</h2>
                        <p>You are responsible for maintaining the confidentiality of your account capabilities and for all activities that occur under your account.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-apex font-bold mb-4">4. Termination</h2>
                        <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.</p>
                    </section>
                </div>
            </div>
        </CinematicLayout>
    );
}
