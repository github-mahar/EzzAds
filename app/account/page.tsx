import AccountPanel from '@/components/features/AccountPanel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SYSTEM_CONFIG — EzzAds.ai',
    description: 'Manage your account, view usage statistics, and control system configuration.',
};

export default function AccountPage() {
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

            <AccountPanel />
        </div>
    );
}
