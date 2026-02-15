import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="relative z-10 mt-auto"
            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
        >
            <div className="max-w-[1440px] mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 flex items-center justify-center"
                                style={{
                                    background: 'var(--color-accent-blue)',
                                    borderRadius: 'var(--radius-sharp)',
                                }}
                            >
                                <Zap size={12} color="#FFFFFF" strokeWidth={2.5} />
                            </div>
                            <span
                                className="text-sm font-semibold tracking-wider"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                EzzAds<span style={{ color: 'var(--color-accent-blue)' }}>.ai</span>
                            </span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            Military-grade ad generation engine.
                            Conversion-optimized. Framework-driven.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-3">
                        <span className="mono-header text-xs">NAVIGATION</span>
                        <div className="flex flex-col gap-2">
                            {[
                                { label: 'INITIALIZE_GENERATION', href: '/generate' },
                                { label: 'CREATIVE_ARCHIVE', href: '/dashboard' },
                                { label: 'COMPUTE_PLANS', href: '/pricing' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-xs transition-colors duration-100 hover:text-[var(--color-accent-blue)]"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* System */}
                    <div className="flex flex-col gap-3">
                        <span className="mono-header text-xs">SYSTEM</span>
                        <div className="flex flex-col gap-2">
                            {[
                                { label: 'SYSTEM_CONFIG', href: '/account' },
                                { label: 'TECHNICAL_LIAISON', href: '/support' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-xs transition-colors duration-100 hover:text-[var(--color-accent-blue)]"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-3">
                        <span className="mono-header text-xs">STATUS</span>
                        <div className="flex items-center gap-2">
                            <span className="status-pulse" />
                            <span
                                className="text-xs"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-success)' }}
                            >
                                ALL_SYSTEMS_OPERATIONAL
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <div className="flex justify-between">
                                <span className="mono-label text-[10px]">API_LATENCY</span>
                                <span
                                    className="text-[10px]"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-success)' }}
                                >
                                    142ms
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="mono-label text-[10px]">UPTIME</span>
                                <span
                                    className="text-[10px]"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-success)' }}
                                >
                                    99.98%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2"
                    style={{ borderTop: '1px solid var(--color-border-subtle)' }}
                >
                    <span className="mono-label text-[10px]">
                        © {currentYear} EZZADS.AI — PROPRIETARY SYSTEM
                    </span>
                    <span className="mono-label text-[10px]">
                        BUILD_VERSION: 1.0.0 // CLASSIFICATION: OPERATIONAL
                    </span>
                </div>
            </div>
        </footer>
    );
}
