import type { Metadata } from 'next';
import Link from 'next/link';
import { Archive, Trash2, Eye, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'CREATIVE_ARCHIVE — EzzAds.ai',
    description: 'Your saved ad generations. Access, review, and manage all archived creative outputs.',
};

// Demo saved ads — will be replaced with Supabase queries
const DEMO_SAVED_ADS = [
    {
        id: 'EZZ-001',
        productName: 'NexusTracker Pro',
        platform: 'META',
        tone: 'BOLD',
        goal: 'SALES',
        createdAt: '2026-02-15T10:30:00Z',
        headline: 'Stop Burning Ad Spend on Copy That Doesn\'t Convert',
        rating: 'OPTIMAL',
    },
    {
        id: 'EZZ-002',
        productName: 'CloudSync Enterprise',
        platform: 'GOOGLE',
        tone: 'PROFESSIONAL',
        goal: 'LEADS',
        createdAt: '2026-02-14T15:45:00Z',
        headline: 'Enterprise Cloud Migration — Without the Downtime',
        rating: 'HIGH',
    },
    {
        id: 'EZZ-003',
        productName: 'FitForge App',
        platform: 'TIKTOK',
        tone: 'AGGRESSIVE',
        goal: 'AWARENESS',
        createdAt: '2026-02-14T09:20:00Z',
        headline: 'Your gym app is boring. This one isn\'t.',
        rating: 'OPTIMAL',
    },
    {
        id: 'EZZ-004',
        productName: 'FinVault Capital',
        platform: 'LINKEDIN',
        tone: 'PROFESSIONAL',
        goal: 'LEADS',
        createdAt: '2026-02-13T14:10:00Z',
        headline: 'Your Portfolio Deserves AI-Grade Risk Analysis',
        rating: 'HIGH',
    },
];

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DashboardPage() {
    return (
        <div className="max-w-[1440px] mx-auto px-6 py-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-boot">
                <div className="flex items-center gap-3">
                    <span className="mono-header text-xs">[CREATIVE_ARCHIVE]</span>
                    <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} />
                    <span className="mono-label text-[10px]">{DEMO_SAVED_ADS.length} RECORDS</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    Creative <span className="text-gradient-signal">Archive</span>
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    All saved ad generations. Sorted by creation date. Access and manage your creative assets.
                </p>
            </div>

            {/* Stats Bar */}
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-boot-delay-1"
            >
                {[
                    { label: 'TOTAL_ARCHIVED', value: '4' },
                    { label: 'THIS_WEEK', value: '3' },
                    { label: 'TOP_PLATFORM', value: 'META' },
                    { label: 'AVG_RATING', value: 'OPTIMAL' },
                ].map((stat) => (
                    <div key={stat.label} className="card-void p-4 flex flex-col gap-2">
                        <span className="mono-label text-[10px]">{stat.label}</span>
                        <span
                            className="text-lg font-bold"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
                        >
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Saved Ads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-boot-delay-2">
                {DEMO_SAVED_ADS.map((ad) => (
                    <div key={ad.id} className="card-void overflow-hidden group">
                        {/* Card Header */}
                        <div
                            className="flex items-center justify-between px-5 py-3"
                            style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="text-[10px] px-2 py-0.5"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--color-accent-blue)',
                                        background: 'rgba(37, 99, 235, 0.08)',
                                        border: '1px solid rgba(37, 99, 235, 0.2)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    {ad.platform}
                                </span>
                                <span className="mono-label text-[10px]">{ad.id}</span>
                            </div>
                            <span className="mono-label text-[10px]">{formatDate(ad.createdAt)}</span>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="mono-label text-[10px]">PRODUCT</span>
                                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {ad.productName}
                                    </span>
                                </div>
                                <span
                                    className="text-[9px] px-1.5 py-0.5 shrink-0"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: ad.rating === 'OPTIMAL' ? 'var(--color-accent-success)' : 'var(--color-accent-blue)',
                                        background: ad.rating === 'OPTIMAL' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(37, 99, 235, 0.08)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    {ad.rating}
                                </span>
                            </div>

                            <div
                                className="p-3"
                                style={{
                                    background: 'var(--color-bg-primary)',
                                    border: '1px solid var(--color-border-subtle)',
                                    borderRadius: 'var(--radius-sharp)',
                                }}
                            >
                                <span className="mono-label text-[9px] block mb-1">TOP_HEADLINE</span>
                                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                    &quot;{ad.headline}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                {[
                                    { label: 'TONE', value: ad.tone },
                                    { label: 'GOAL', value: ad.goal },
                                ].map((tag) => (
                                    <span
                                        key={tag.label}
                                        className="text-[9px] px-1.5 py-0.5"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--color-text-muted)',
                                            border: '1px solid var(--color-border-subtle)',
                                            borderRadius: 'var(--radius-sharp)',
                                        }}
                                    >
                                        {tag.label}: {tag.value}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card Actions */}
                        <div
                            className="flex items-center justify-between px-5 py-3"
                            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
                        >
                            <Link
                                href="/result"
                                className="flex items-center gap-1.5 text-[10px] tracking-wider transition-colors duration-100"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                            >
                                <Eye size={10} />
                                VIEW_FULL
                            </Link>
                            <button
                                className="flex items-center gap-1.5 text-[10px] tracking-wider transition-colors duration-100 hover:text-[var(--color-accent-danger)]"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                            >
                                <Trash2 size={10} />
                                DELETE
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State CTA */}
            {DEMO_SAVED_ADS.length === 0 && (
                <div
                    className="card-void p-12 text-center flex flex-col items-center gap-4"
                >
                    <Archive size={32} style={{ color: 'var(--color-text-muted)' }} />
                    <span className="mono-header text-xs">[ARCHIVE_EMPTY]</span>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        No saved generations found. Initialize your first ad generation to populate the archive.
                    </p>
                    <Link href="/generate" className="btn-signal">
                        <Zap size={14} />
                        INITIALIZE_GENERATION
                    </Link>
                </div>
            )}
        </div>
    );
}
