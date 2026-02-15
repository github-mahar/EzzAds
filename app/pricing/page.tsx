import type { Metadata } from 'next';
import PricingClient from '@/components/features/PricingClient';

export const metadata: Metadata = {
    title: 'COMPUTE_PLANS — EzzAds.ai',
    description: 'Choose your operational tier. Free reconnaissance or full operator access with unlimited generations.',
};

export default function PricingPage() {
    return (
        <div className="max-w-[1440px] mx-auto px-6 py-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-12 text-center items-center animate-boot">
                <span className="mono-header text-xs">[COMPUTE_PLANS]</span>
                <h1 className="text-2xl md:text-3xl font-bold">
                    Select Your <span className="text-gradient-signal">Operational Tier</span>
                </h1>
                <p className="text-sm max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
                    No hidden fees. No throttled performance. Choose the tier that matches your deployment scale.
                </p>
            </div>

            <PricingClient />
        </div>
    );
}
