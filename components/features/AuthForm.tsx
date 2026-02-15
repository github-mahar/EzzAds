'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Zap, ArrowRight, AlertTriangle, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase';

type AuthMode = 'LOGIN' | 'SIGNUP' | 'MAGIC_LINK';

export default function AuthForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/generate';

    const [mode, setMode] = useState<AuthMode>('LOGIN');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [magicLinkSent, setMagicLinkSent] = useState(false);

    const supabase = createClient();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        router.push(redirectTo);
        router.refresh();
    };

    const handleSignup = async () => {
        setLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        setError(null);
        setMagicLinkSent(true);
        setLoading(false);
    };

    const handleMagicLink = async () => {
        setLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        setMagicLinkSent(true);
        setLoading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'LOGIN') handleLogin();
        else if (mode === 'SIGNUP') handleSignup();
        else handleMagicLink();
    };

    // Success state after magic link / signup confirmation
    if (magicLinkSent) {
        return (
            <div className="card-void p-8 text-center flex flex-col items-center gap-4 animate-boot">
                <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: 'var(--radius-default)',
                    }}
                >
                    <Mail size={20} style={{ color: 'var(--color-accent-success)' }} />
                </div>
                <span className="mono-header text-xs" style={{ color: 'var(--color-accent-success)' }}>
                    [TRANSMISSION_SENT]
                </span>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {mode === 'SIGNUP'
                        ? 'Verification link sent. Check your email to activate your operator account.'
                        : 'Magic link dispatched. Check your inbox to authenticate.'}
                </p>
                <span className="mono-label text-[10px]">{email}</span>
            </div>
        );
    }

    return (
        <div className="card-void overflow-hidden animate-boot-delay-1">
            {/* Mode Tabs */}
            <div className="flex" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                {([
                    { mode: 'LOGIN' as AuthMode, label: 'LOGIN' },
                    { mode: 'SIGNUP' as AuthMode, label: 'REGISTER' },
                    { mode: 'MAGIC_LINK' as AuthMode, label: 'MAGIC_LINK' },
                ]).map((tab) => (
                    <button
                        key={tab.mode}
                        onClick={() => { setMode(tab.mode); setError(null); }}
                        className="flex-1 py-3 text-center text-[11px] tracking-wider transition-all duration-100"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: mode === tab.mode ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
                            background: mode === tab.mode ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                            borderBottom: mode === tab.mode ? '2px solid var(--color-accent-blue)' : '2px solid transparent',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                {/* Error Banner */}
                {error && (
                    <div
                        className="p-3 flex items-start gap-2"
                        style={{
                            background: 'rgba(239, 68, 68, 0.06)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: 'var(--radius-sharp)',
                        }}
                    >
                        <AlertTriangle size={14} style={{ color: 'var(--color-accent-danger)', flexShrink: 0, marginTop: 1 }} />
                        <span className="text-xs" style={{ color: 'var(--color-accent-danger)' }}>{error}</span>
                    </div>
                )}

                {/* Email */}
                <div className="flex flex-col gap-2">
                    <label className="mono-header text-xs" htmlFor="auth-email">
                        [OPERATOR_EMAIL]
                    </label>
                    <input
                        id="auth-email"
                        type="email"
                        required
                        className="input-void"
                        placeholder="operator@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password (not for magic link) */}
                {mode !== 'MAGIC_LINK' && (
                    <div className="flex flex-col gap-2">
                        <label className="mono-header text-xs" htmlFor="auth-password">
                            [ACCESS_CODE]
                        </label>
                        <input
                            id="auth-password"
                            type="password"
                            required
                            minLength={6}
                            className="input-void"
                            placeholder="Minimum 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-signal glow-signal w-full justify-center mt-2"
                >
                    {loading ? (
                        <>
                            <span
                                className="inline-block w-3 h-3 border border-white border-t-transparent animate-spin"
                                style={{ borderRadius: '50%' }}
                            />
                            PROCESSING...
                        </>
                    ) : (
                        <>
                            <Zap size={14} />
                            {mode === 'LOGIN' && 'AUTHENTICATE'}
                            {mode === 'SIGNUP' && 'REGISTER_OPERATOR'}
                            {mode === 'MAGIC_LINK' && 'DISPATCH_MAGIC_LINK'}
                            <ArrowRight size={14} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
