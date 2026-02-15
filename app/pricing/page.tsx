import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Check, ArrowRight } from 'lucide-react';
import { PLANS } from '@/lib/stripe';

export const metadata: Metadata = {
    title: 'COMPUTE_PLANS — EzzAds.ai',
    description: 'Choose your operational tier. Free reconnaissance or full operator access.',
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

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto animate-boot-delay-1">
                {/* FREE PLAN */}
                <div className="card-void p-0 overflow-hidden flex flex-col">
                    <div
                        className="px-6 py-5 flex flex-col gap-1"
                        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                    >
                        <span className="mono-header text-xs">[{PLANS.FREE.name}]</span>
                        <h2 className="text-xl font-bold">{PLANS.FREE.displayName}</h2>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                                ${PLANS.FREE.price}
                            </span>
                            <span className="mono-label text-[10px]">/ MONTH</span>
                        </div>
                    </div>

                    <div className="px-6 py-5 flex flex-col gap-3 flex-1">
                        <span className="mono-label text-[10px]">INCLUDED_CAPABILITIES:</span>
                        {PLANS.FREE.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-2">
                                <Check size={12} style={{ color: 'var(--color-text-muted)', marginTop: 2, flexShrink: 0 }} />
                                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="px-6 py-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                        <Link href="/generate" className="btn-void w-full justify-center">
                            DEPLOY_FREE
                        </Link>
                    </div>
                </div>

                {/* PRO PLAN */}
                <div
                    className="card-void p-0 overflow-hidden flex flex-col"
                    style={{
                        borderColor: 'rgba(37, 99, 235, 0.3)',
                        boxShadow: '0 0 40px rgba(37, 99, 235, 0.06)',
                    }}
                >
                    <div
                        className="px-6 py-5 flex flex-col gap-1 relative"
                        style={{
                            borderBottom: '1px solid rgba(37, 99, 235, 0.2)',
                            background: 'rgba(37, 99, 235, 0.03)',
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="mono-header text-xs">[{PLANS.PRO.name}]</span>
                            <span
                                className="text-[9px] px-2 py-0.5 font-semibold"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: '#FFFFFF',
                                    background: 'var(--color-accent-blue)',
                                    borderRadius: 'var(--radius-sharp)',
                                }}
                            >
                                RECOMMENDED
                            </span>
                        </div>
                        <h2 className="text-xl font-bold">{PLANS.PRO.displayName}</h2>
                        <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                                ${PLANS.PRO.price}
                            </span>
                            <span className="mono-label text-[10px]">/ MONTH</span>
                        </div>
                    </div>

                    <div className="px-6 py-5 flex flex-col gap-3 flex-1">
                        <span className="mono-label text-[10px]">FULL_CAPABILITIES:</span>
                        {PLANS.PRO.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-2">
                                <Check size={12} style={{ color: 'var(--color-accent-blue)', marginTop: 2, flexShrink: 0 }} />
                                <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(37, 99, 235, 0.2)' }}>
                        <button className="btn-signal glow-signal w-full justify-center">
                            <Zap size={14} />
                            UPGRADE_TO_OPERATOR
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="max-w-3xl mx-auto mt-16 animate-boot-delay-2">
                <span className="mono-header text-xs block mb-6">[FEATURE_COMPARISON_MATRIX]</span>
                <div className="card-void overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                                <th className="text-left px-5 py-3">
                                    <span className="mono-label text-[10px]">CAPABILITY</span>
                                </th>
                                <th className="text-center px-5 py-3">
                                    <span className="mono-label text-[10px]">RECON</span>
                                </th>
                                <th className="text-center px-5 py-3">
                                    <span className="mono-label text-[10px]">OPERATOR</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { feature: 'Daily generations', free: '5', pro: 'Unlimited' },
                                { feature: 'Platforms', free: '1', pro: 'All 5' },
                                { feature: 'Frameworks', free: 'AIDA', pro: 'AIDA + PAS + Emotional' },
                                { feature: 'A/B Variants', free: '—', pro: '✓' },
                                { feature: 'Image prompts', free: '—', pro: '✓' },
                                { feature: 'CREATIVE_ARCHIVE', free: '—', pro: '✓' },
                                { feature: 'Priority processing', free: '—', pro: '✓' },
                            ].map((row, idx) => (
                                <tr
                                    key={row.feature}
                                    style={{
                                        borderBottom: idx < 6 ? '1px solid var(--color-border-subtle)' : undefined,
                                    }}
                                >
                                    <td className="px-5 py-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                        {row.feature}
                                    </td>
                                    <td
                                        className="px-5 py-3 text-center text-xs"
                                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                                    >
                                        {row.free}
                                    </td>
                                    <td
                                        className="px-5 py-3 text-center text-xs"
                                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-blue)' }}
                                    >
                                        {row.pro}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
