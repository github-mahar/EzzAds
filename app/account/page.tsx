import type { Metadata } from 'next';
import Link from 'next/link';
import { User, Zap, ArrowRight, LogOut, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'SYSTEM_CONFIG — EzzAds.ai',
    description: 'Manage your account, view usage statistics, and control system configuration.',
};

// Demo user data — will be replaced with Supabase auth
const DEMO_USER = {
    email: 'operator@ezzads.ai',
    planType: 'FREE' as const,
    generationsUsedToday: 2,
    generationsLimit: 5,
    createdAt: '2026-01-15T08:00:00Z',
    totalGenerations: 47,
};

export default function AccountPage() {
    const usagePercent = (DEMO_USER.generationsUsedToday / DEMO_USER.generationsLimit) * 100;

    return (
        <div className="max-w-[1440px] mx-auto px-6 py-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-boot">
                <div className="flex items-center gap-3">
                    <span className="mono-header text-xs">[SYSTEM_CONFIG]</span>
                    <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} />
                    <span className="mono-label text-[10px]">OPERATOR_PROFILE</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    System <span className="text-gradient-signal">Configuration</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-boot-delay-1">
                {/* Main Content */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Profile Card */}
                    <div className="card-void overflow-hidden">
                        <div
                            className="flex items-center justify-between px-6 py-3"
                            style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                        >
                            <span className="mono-header text-xs">[OPERATOR_IDENTITY]</span>
                            <span className="mono-label text-[10px]">AUTHENTICATED</span>
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
                                    <span className="text-sm font-semibold">{DEMO_USER.email}</span>
                                    <span className="mono-label text-[10px]">
                                        MEMBER_SINCE: {new Date(DEMO_USER.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                {[
                                    { label: 'EMAIL', value: DEMO_USER.email },
                                    { label: 'PLAN_TYPE', value: DEMO_USER.planType },
                                    { label: 'TOTAL_GENERATIONS', value: DEMO_USER.totalGenerations.toString() },
                                    { label: 'ACCOUNT_STATUS', value: 'ACTIVE' },
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
                            {/* Usage Bar */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="mono-label text-[10px]">DAILY_CONSUMPTION</span>
                                    <span
                                        className="text-xs font-bold"
                                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-blue)' }}
                                    >
                                        {DEMO_USER.generationsUsedToday} / {DEMO_USER.generationsLimit}
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
                                            width: `${usagePercent}%`,
                                            background: usagePercent > 80 ? 'var(--color-accent-danger)' : 'var(--color-accent-blue)',
                                            boxShadow: `0 0 10px ${usagePercent > 80 ? 'rgba(239, 68, 68, 0.3)' : 'var(--color-accent-glow)'}`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="status-pulse" />
                                <span className="mono-label text-[10px]" style={{ color: 'var(--color-accent-success)' }}>
                                    {DEMO_USER.generationsLimit - DEMO_USER.generationsUsedToday} GENERATIONS REMAINING
                                </span>
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
                                    RECON_TIER
                                </span>
                                <span className="mono-label text-[10px]">$0 / MONTH</span>
                            </div>
                            <Shield size={24} style={{ color: 'var(--color-text-muted)' }} />
                        </div>
                        <Link href="/pricing" className="btn-signal w-full justify-center">
                            <Zap size={14} />
                            UPGRADE_TIER
                            <ArrowRight size={14} />
                        </Link>
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
                                className="flex items-center gap-2 py-2.5 px-3 text-xs transition-colors duration-100"
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
                        className="btn-void w-full justify-center"
                        style={{ color: 'var(--color-accent-danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                    >
                        <LogOut size={14} />
                        TERMINATE_SESSION
                    </button>
                </div>
            </div>
        </div>
    );
}
