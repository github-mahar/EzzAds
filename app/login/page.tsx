import AuthForm from '@/components/features/AuthForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AUTHENTICATE — EzzAds.ai',
    description: 'Initialize secure session. Login or create an operator account.',
};

export default function LoginPage() {
    return (
        <div className="max-w-[1440px] mx-auto px-6 py-16 flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-8 text-center items-center animate-boot">
                    <span className="mono-header text-xs">[SYSTEM_ACCESS]</span>
                    <h1 className="text-2xl font-bold">
                        Authenticate <span className="text-gradient-signal">Operator</span>
                    </h1>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Initialize a secure session to access the generation engine.
                    </p>
                </div>

                <AuthForm />
            </div>
        </div>
    );
}
