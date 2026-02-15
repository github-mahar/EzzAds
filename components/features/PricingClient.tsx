'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, Check, ArrowRight, AlertTriangle, Loader2 } from 'lucide-react';
import { PLANS } from '@/lib/stripe';
import { createClient } from '@/lib/supabase';

export default function PricingClient() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpgrade = async () => {
        setError(null);
        setLoading(true);

        try {
            // Check if user is authenticated first
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                // Redirect to login with return to pricing
                window.location.href = '/login?redirect=/pricing';
                return;
            }

            // Create checkout session
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                setError(result.error || 'Failed to initialize checkout. Please try again.');
                setLoading(false);
                return;
            }

            // Redirect to Stripe Checkout or Billing Portal
            if (result.url) {
                window.location.href = result.url;
            }
        } catch {
            setError('Network error. Please check your connection and try again.');
            setLoading(false);
        }
    };

    return (
        <>
            {/* Error Banner */}
            {error && (
                <div
                    className="max-w-3xl mx-auto mb-6 p-4 flex items-start gap-3 animate-boot"
                    style={{
                        background: 'rgba(239, 68, 68, 0.06)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: 'var(--radius-default)',
                    }}
                >
                    <AlertTriangle size={16} style={{ color: 'var(--color-accent-danger)', flexShrink: 0, marginTop: 2 }} />
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-danger)' }}>
                            [CHECKOUT_ERROR]
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                            {error}
                        </span>
                    </div>
                </div>
            )}

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
                        <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="btn-signal glow-signal w-full justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    INITIALIZING_CHECKOUT...
                                </>
                            ) : (
                                <>
                                    <Zap size={14} />
                                    UPGRADE_TO_OPERATOR
                                    <ArrowRight size={14} />
                                </>
                            )}
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
        </>
    );
}
