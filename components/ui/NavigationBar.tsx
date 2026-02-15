'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, BarChart3, Archive, Settings, Cpu, LogIn, Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

const NAV_ITEMS = [
    { label: 'HOME', href: '/', moniker: 'BASE' },
    { label: 'GENERATE', href: '/generate', moniker: 'ENGINE' },
    { label: 'ARCHIVE', href: '/dashboard', moniker: 'DATA' },
    { label: 'COMPUTE_PLANS', href: '/pricing', moniker: 'PLANS' },
    { label: 'SYSTEM_CONFIG', href: '/account', moniker: 'CONFIG' },
];

const NAV_ICONS: Record<string, React.ReactNode> = {
    '/': <Cpu size={14} />,
    '/generate': <Zap size={14} />,
    '/dashboard': <Archive size={14} />,
    '/pricing': <BarChart3 size={14} />,
    '/account': <Settings size={14} />,
};

export default function NavigationBar() {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const generationsLeft = 5; // Will connect to usage tracking

    useEffect(() => {
        const supabase = createClient();

        // Get initial session
        supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
            setUser(currentUser);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50"
            style={{ background: 'rgba(2, 4, 8, 0.92)', backdropFilter: 'blur(12px)' }}
        >
            {/* Usage Progress Bar */}
            <div className="h-[2px] w-full" style={{ background: 'var(--color-border-subtle)' }}>
                <div
                    className="h-full transition-all duration-300"
                    style={{
                        width: `${((5 - generationsLeft) / 5) * 100}%`,
                        background: 'var(--color-accent-blue)',
                    }}
                />
            </div>

            <div className="flex items-center justify-between px-6 py-3 max-w-[1440px] mx-auto">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div
                        className="w-8 h-8 flex items-center justify-center"
                        style={{
                            background: 'var(--color-accent-blue)',
                            borderRadius: 'var(--radius-sharp)',
                        }}
                    >
                        <Zap size={16} color="#FFFFFF" strokeWidth={2.5} />
                    </div>
                    <span
                        className="text-sm font-semibold tracking-wider"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
                    >
                        EzzAds<span style={{ color: 'var(--color-accent-blue)' }}>.ai</span>
                    </span>
                </Link>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2 px-3 py-2 text-xs tracking-wider transition-all duration-100"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
                                    background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                    borderRadius: 'var(--radius-sharp)',
                                    borderBottom: isActive ? '1px solid var(--color-accent-blue)' : '1px solid transparent',
                                }}
                            >
                                {NAV_ICONS[item.href]}
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side: Status + Auth */}
                <div className="flex items-center gap-3">
                    {/* Generation Counter */}
                    <div
                        className="hidden sm:flex items-center gap-2 px-3 py-1.5"
                        style={{
                            background: 'var(--color-bg-secondary)',
                            border: '1px solid var(--color-border-subtle)',
                            borderRadius: 'var(--radius-sharp)',
                        }}
                    >
                        <span className="status-pulse" />
                        <span
                            className="text-xs"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                        >
                            GENERATIONS_LEFT:
                        </span>
                        <span
                            className="text-xs font-bold"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-blue)' }}
                        >
                            {generationsLeft}
                        </span>
                    </div>

                    {/* Auth Button */}
                    {user ? (
                        <Link
                            href="/account"
                            className="flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-wider transition-all duration-100"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--color-accent-blue)',
                                background: 'rgba(37, 99, 235, 0.06)',
                                border: '1px solid rgba(37, 99, 235, 0.2)',
                                borderRadius: 'var(--radius-sharp)',
                            }}
                        >
                            <span className="status-pulse" />
                            {user.email?.split('@')[0]?.toUpperCase().slice(0, 8)}
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-wider transition-all duration-100"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--color-border-subtle)',
                                borderRadius: 'var(--radius-sharp)',
                            }}
                        >
                            <LogIn size={12} />
                            AUTHENTICATE
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex items-center justify-center p-2"
                        style={{ border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sharp)' }}
                        aria-label="Toggle navigation menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X size={16} style={{ color: 'var(--color-text-muted)' }} />
                        ) : (
                            <Menu size={16} style={{ color: 'var(--color-text-muted)' }} />
                        )}
                    </button>
                </div>
            </div>

            {/* Bottom Border */}
            <div className="h-px w-full" style={{ background: 'var(--color-border-subtle)' }} />

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden flex flex-col gap-1 px-4 py-3"
                    style={{
                        background: 'var(--color-bg-secondary)',
                        borderBottom: '1px solid var(--color-border-subtle)',
                    }}
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs tracking-wider transition-all duration-100"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
                                    background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                    borderRadius: 'var(--radius-sharp)',
                                }}
                            >
                                {NAV_ICONS[item.href]}
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
