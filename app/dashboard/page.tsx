import DashboardView from '@/components/features/DashboardView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CREATIVE_ARCHIVE — EzzAds.ai',
    description: 'Access your saved ad generations. View, copy, and manage your creative archive.',
};

export default function DashboardPage() {
    return (
        <div className="max-w-[1440px] mx-auto px-6 py-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-boot">
                <div className="flex items-center gap-3">
                    <span className="mono-header text-xs">[CREATIVE_ARCHIVE]</span>
                    <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} />
                    <span className="mono-label text-[10px]">SAVED_GENERATIONS</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    Creative <span className="text-gradient-signal">Archive</span>
                </h1>
            </div>

            <DashboardView />
        </div>
    );
}
