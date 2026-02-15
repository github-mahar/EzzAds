import ResultDisplay from '@/components/features/ResultDisplay';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GENERATION_OUTPUT — EzzAds.ai',
    description: 'View your AI-generated ad copy results with structured output blocks.',
};

export default function ResultPage() {
    return (
        <div className="max-w-[1440px] mx-auto px-6 py-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-boot">
                <div className="flex items-center gap-3">
                    <span className="mono-header text-xs">[GENERATION_OUTPUT]</span>
                    <div
                        className="h-px flex-1"
                        style={{ background: 'var(--color-border-subtle)' }}
                    />
                    <span className="mono-label text-[10px]">INTELLIGENCE_REPORT</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    Output <span className="text-gradient-signal">Analysis</span>
                </h1>
            </div>

            <ResultDisplay />
        </div>
    );
}
