import GeneratorEngine from '@/components/features/GeneratorEngine';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'INITIALIZE_GENERATION — EzzAds.ai',
    description: 'Configure and generate high-converting ad copy using AI-driven marketing frameworks.',
};

export default function GeneratePage() {
    return (
        <div className="max-w-[1440px] mx-auto px-6 py-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-boot">
                <div className="flex items-center gap-3">
                    <span className="mono-header text-xs">[AD_CONFIGURATION]</span>
                    <div
                        className="h-px flex-1"
                        style={{ background: 'var(--color-border-subtle)' }}
                    />
                    <span className="mono-label text-[10px]">ENGINE_V1.0</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    Initialize <span className="text-gradient-signal">Generation</span>
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Configure your ad parameters below. All fields feed directly into the conversion framework engine.
                </p>
            </div>

            {/* Generator Engine Component */}
            <GeneratorEngine />
        </div>
    );
}
