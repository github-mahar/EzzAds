'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User, Zap, ArrowRight, LogOut, Shield, CreditCard, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { getUsageStats, getProfile } from '@/lib/db';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Profile } from '@/lib/db';

export default function AccountPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const upgradeSuccess = searchParams.get('upgrade') === 'success';
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [usageData, setUsageData] = useState<{
        usedToday: number;
        limit: number;
        total: number;
        planType: string;
    } | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(async ({ data: { user: currentUser } }) => {
            setUser(currentUser);
            if (currentUser) {
                const [profileData, usage] = await Promise.all([
                    getProfile(),
                    getUsageStats(),
                ]);
                setProfile(profileData);
                setUsageData(usage);
            }
            setLoading(false);
        });
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="processing-bar w-48" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="card-void p-12 text-center flex flex-col items-center gap-4 animate-boot">
                <User size={32} style={{ color: 'var(--color-text-muted)' }} />
                <span className="mono-header text-xs">[SESSION_INACTIVE]</span>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    No active session detected. Authenticate to access system configuration.
                </p>
                <Link href="/login?redirect=/account" className="btn-signal">
                    <Zap size={14} />
                    AUTHENTICATE
                </Link>
            </div>
        );
    }

    const generationsUsedToday = usageData?.usedToday ?? 0;
    const generationsLimit = usageData?.limit === -1 ? '∞' : (usageData?.limit ?? 5);
    const totalGenerations = usageData?.total ?? 0;
    const planType = usageData?.planType ?? 'FREE';
    const usagePercent = typeof generationsLimit === 'number'
        ? (generationsUsedToday / generationsLimit) * 100
        : 10;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-boot-delay-1">
            {/* Upgrade Success Banner */}
            {upgradeSuccess && (
                <div
                    className="lg:col-span-12 p-4 flex items-center gap-3 animate-boot"
                    style={{
                        background: 'rgba(16, 185, 129, 0.06)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: 'var(--radius-default)',
                    }}
                >
                    <CheckCircle size={16} style={{ color: 'var(--color-accent-success)', flexShrink: 0 }} />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-success)' }}>
                            [UPGRADE_COMPLETE]
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                            Welcome to the Operator Tier. All capabilities unlocked. Unlimited generations active.
                        </span>
                    </div>
                </div>
            )}
            {/* Main Content */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Profile Card */}
                <div className="card-void overflow-hidden">
                    <div
                        className="flex items-center justify-between px-6 py-3"
                        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                    >
                        <span className="mono-header text-xs">[OPERATOR_IDENTITY]</span>
                        <span
                            className="text-[10px] px-2 py-0.5"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--color-accent-success)',
                                background: 'rgba(16, 185, 129, 0.08)',
                                borderRadius: 'var(--radius-sharp)',
                            }}
                        >
                            AUTHENTICATED
                        </span>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 flex items-center justify-center"
                                style={{
                                    background: 'rgba(37, 99, 235, 0.08)',
                                    border: '1px solid rgba(37, 99, 235, 0.2)',
                                    borderRadius: 'var(--radius-default)',
                                }}
                            >
                                <User size={20} style={{ color: 'var(--color-accent-blue)' }} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-semibold">{user.email}</span>
                                <span className="mono-label text-[10px]">
                                    MEMBER_SINCE: {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            {[
                                { label: 'EMAIL', value: user.email ?? 'N/A' },
                                { label: 'PLAN_TYPE', value: planType },
                                { label: 'TOTAL_GENERATIONS', value: totalGenerations.toString() },
                                { label: 'ACCOUNT_STATUS', value: profile ? 'ACTIVE' : 'PENDING_SYNC' },
                                { label: 'USER_ID', value: user.id.slice(0, 12) + '...' },
                                { label: 'AUTH_PROVIDER', value: user.app_metadata?.provider?.toUpperCase() ?? 'EMAIL' },
                            ].map((field) => (
                                <div
                                    key={field.label}
                                    className="flex flex-col gap-1 p-3"
                                    style={{
                                        background: 'var(--color-bg-primary)',
                                        border: '1px solid var(--color-border-subtle)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    <span className="mono-label text-[9px]">{field.label}</span>
                                    <span className="mono-data text-xs">{field.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Usage Stats */}
                <div className="card-void overflow-hidden">
                    <div
                        className="flex items-center justify-between px-6 py-3"
                        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                    >
                        <span className="mono-header text-xs">[USAGE_TELEMETRY]</span>
                        <span className="mono-label text-[10px]">TODAY</span>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="mono-label text-[10px]">DAILY_CONSUMPTION</span>
                                <span
                                    className="text-xs font-bold"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-blue)' }}
                                >
                                    {generationsUsedToday} / {generationsLimit}
                                </span>
                            </div>
                            <div
                                className="h-2 w-full overflow-hidden"
                                style={{
                                    background: 'var(--color-bg-primary)',
                                    border: '1px solid var(--color-border-subtle)',
                                    borderRadius: 'var(--radius-sharp)',
                                }}
                            >
                                <div
                                    className="h-full transition-all duration-300"
                                    style={{
                                        width: `${Math.min(usagePercent, 100)}%`,
                                        background: usagePercent > 80 ? 'var(--color-accent-danger)' : 'var(--color-accent-blue)',
                                        boxShadow: `0 0 10px ${usagePercent > 80 ? 'rgba(239, 68, 68, 0.3)' : 'var(--color-accent-glow)'}`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="status-pulse" />
                            <span className="mono-label text-[10px]" style={{ color: 'var(--color-accent-success)' }}>
                                {typeof generationsLimit === 'number'
                                    ? `${generationsLimit - generationsUsedToday} GENERATIONS REMAINING`
                                    : 'UNLIMITED GENERATIONS'}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 pt-2" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                            <div className="flex flex-col gap-0.5">
                                <span className="mono-label text-[9px]">LIFETIME_TOTAL</span>
                                <span className="mono-data text-lg font-bold">{totalGenerations}</span>
                            </div>
                            {profile?.last_generation_date && (
                                <div className="flex flex-col gap-0.5">
                                    <span className="mono-label text-[9px]">LAST_ACTIVE</span>
                                    <span className="mono-data text-xs">
                                        {new Date(profile.last_generation_date).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Plan Card */}
                <div className="card-void p-5 flex flex-col gap-4">
                    <span className="mono-header text-xs">[CURRENT_PLAN]</span>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                                {planType === 'PRO' ? 'OPERATOR_TIER' : 'RECON_TIER'}
                            </span>
                            <span className="mono-label text-[10px]">
                                {planType === 'PRO' ? '$29 / MONTH' : '$0 / MONTH'}
                            </span>
                        </div>
                        <Shield size={24} style={{ color: planType === 'PRO' ? 'var(--color-accent-blue)' : 'var(--color-text-muted)' }} />
                    </div>
                    {planType !== 'PRO' ? (
                        <Link href="/pricing" className="btn-signal w-full justify-center">
                            <Zap size={14} />
                            UPGRADE_TIER
                            <ArrowRight size={14} />
                        </Link>
                    ) : (
                        <button
                            onClick={async () => {
                                try {
                                    const res = await fetch('/api/checkout', { method: 'POST' });
                                    const data = await res.json();
                                    if (data.url) window.location.href = data.url;
                                } catch { /* silently fail */ }
                            }}
                            className="btn-void w-full justify-center"
                            style={{ color: 'var(--color-accent-blue)', borderColor: 'rgba(37, 99, 235, 0.2)' }}
                        >
                            <CreditCard size={14} />
                            MANAGE_SUBSCRIPTION
                        </button>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="card-void p-5 flex flex-col gap-3">
                    <span className="mono-header text-xs">[QUICK_ACTIONS]</span>
                    {[
                        { label: 'INITIALIZE_GENERATION', href: '/generate', icon: <Zap size={12} /> },
                        { label: 'CREATIVE_ARCHIVE', href: '/dashboard', icon: <Shield size={12} /> },
                        { label: 'TECHNICAL_LIAISON', href: '/support', icon: <User size={12} /> },
                    ].map((action) => (
                        <Link
                            key={action.href}
                            href={action.href}
                            className="flex items-center gap-2 py-2.5 px-3 text-xs transition-colors duration-100 hover:border-[var(--color-accent-blue)]"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--color-text-muted)',
                                background: 'var(--color-bg-primary)',
                                border: '1px solid var(--color-border-subtle)',
                                borderRadius: 'var(--radius-sharp)',
                            }}
                        >
                            {action.icon}
                            {action.label}
                        </Link>
                    ))}
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="btn-void w-full justify-center"
                    style={{ color: 'var(--color-accent-danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                >
                    <LogOut size={14} />
                    TERMINATE_SESSION
                </button>
            </div>
        </div>
    );
}
