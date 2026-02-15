import type { Metadata } from 'next';
import { Mail, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
    title: 'TECHNICAL_LIAISON — EzzAds.ai',
    description: 'Initialize support connection. System status and FAQ.',
};

const FAQ_ITEMS = [
    {
        question: 'How does the generation engine work?',
        answer:
            'EzzAds uses structured system prompts combined with proven marketing psychology frameworks (AIDA, PAS, Emotional Triggers) to generate platform-optimized ad copy. Each generation produces 6 output blocks: Headlines, Hooks, Primary Text, CTA, Creative Direction, and optional Video Script.',
    },
    {
        question: 'What platforms are supported?',
        answer:
            'Currently optimized for Meta (Facebook/Instagram), Google Ads, TikTok, YouTube, and LinkedIn. Each platform has specific copy length, tone, and structural requirements that the engine adapts to automatically.',
    },
    {
        question: 'What is the difference between RECON and OPERATOR tiers?',
        answer:
            'RECON (Free) provides 5 generations per day with basic AIDA framework and single platform targeting. OPERATOR ($29/mo) unlocks unlimited generations, all 3 frameworks, multi-platform optimization, A/B variants, image prompts, and CREATIVE_ARCHIVE access.',
    },
    {
        question: 'Is the generated copy unique?',
        answer:
            'Yes. Each generation produces unique copy based on your specific product, audience, and campaign parameters. The engine does not use templates or recycled phrases. Every output is computed fresh using the selected framework.',
    },
    {
        question: 'How is my data handled?',
        answer:
            'All generation data is encrypted and stored securely via Supabase (PostgreSQL). API keys are server-side only. We do not share, sell, or expose your creative data to third parties. Saved ads are accessible only to the authenticated account owner.',
    },
];

export default function SupportPage() {
    return (
        <div className="max-w-[1440px] mx-auto px-6 py-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-boot">
                <div className="flex items-center gap-3">
                    <span className="mono-header text-xs">[TECHNICAL_LIAISON]</span>
                    <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} />
                    <span className="mono-label text-[10px]">SUPPORT_INTERFACE</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    Technical <span className="text-gradient-signal">Liaison</span>
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Initialize a support connection or review system documentation.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-boot-delay-1">
                {/* Contact Form */}
                <div className="lg:col-span-7">
                    <div className="card-void overflow-hidden">
                        <div
                            className="flex items-center justify-between px-6 py-3"
                            style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                        >
                            <span className="mono-header text-xs">[INITIALIZE_CONNECTION]</span>
                            <span className="mono-label text-[10px]">ENCRYPTED_CHANNEL</span>
                        </div>
                        <div className="p-6 flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="mono-header text-xs" htmlFor="contact-email">
                                    [OPERATOR_EMAIL] *
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    className="input-void"
                                    placeholder="your-email@domain.com"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="mono-header text-xs" htmlFor="contact-subject">
                                    [SUBJECT_LINE] *
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    className="input-void"
                                    placeholder="e.g., Generation engine output issue"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="mono-header text-xs" htmlFor="contact-message">
                                    [MESSAGE_BODY] *
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    className="input-void resize-none"
                                    placeholder="Describe the issue or inquiry with maximum detail..."
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                                <span className="mono-label text-[10px]">RESPONSE_TIME: &lt; 24H</span>
                                <button className="btn-signal">
                                    <MessageSquare size={14} />
                                    TRANSMIT_MESSAGE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* System Status */}
                    <div className="card-void p-5 flex flex-col gap-4">
                        <span className="mono-header text-xs">[SYSTEM_STATUS]</span>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'GENERATION_ENGINE', status: 'OPERATIONAL' },
                                { label: 'API_GATEWAY', status: 'OPERATIONAL' },
                                { label: 'DATABASE', status: 'OPERATIONAL' },
                                { label: 'AUTH_SERVICE', status: 'OPERATIONAL' },
                            ].map((system) => (
                                <div
                                    key={system.label}
                                    className="flex items-center justify-between py-2 px-3"
                                    style={{
                                        background: 'var(--color-bg-primary)',
                                        border: '1px solid var(--color-border-subtle)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    <span className="mono-label text-[10px]">{system.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="status-pulse" />
                                        <span
                                            className="text-[10px] font-semibold"
                                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-success)' }}
                                        >
                                            {system.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Direct Contact */}
                    <div className="card-void p-5 flex flex-col gap-3">
                        <span className="mono-header text-xs">[DIRECT_CHANNEL]</span>
                        <a
                            href="mailto:support@ezzads.ai"
                            className="flex items-center gap-3 py-2.5 px-3 text-xs transition-colors duration-100"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--color-accent-blue)',
                                background: 'var(--color-bg-primary)',
                                border: '1px solid var(--color-border-subtle)',
                                borderRadius: 'var(--radius-sharp)',
                            }}
                        >
                            <Mail size={14} />
                            support@ezzads.ai
                        </a>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 animate-boot-delay-2">
                <div className="flex items-center gap-3 mb-8">
                    <span className="mono-header text-xs">[KNOWLEDGE_BASE]</span>
                    <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} />
                    <span className="mono-label text-[10px]">{FAQ_ITEMS.length} ENTRIES</span>
                </div>

                <div className="flex flex-col gap-3">
                    {FAQ_ITEMS.map((item, index) => (
                        <details
                            key={index}
                            className="card-void group"
                        >
                            <summary
                                className="flex items-center justify-between px-6 py-4 cursor-pointer list-none"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                <div className="flex items-center gap-3">
                                    <HelpCircle size={14} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} />
                                    <span className="text-sm font-medium">{item.question}</span>
                                </div>
                                <ChevronDown
                                    size={14}
                                    className="transition-transform duration-100 group-open:rotate-180"
                                    style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
                                />
                            </summary>
                            <div
                                className="px-6 pb-4"
                                style={{ borderTop: '1px solid var(--color-border-subtle)' }}
                            >
                                <p className="text-xs leading-relaxed pt-4" style={{ color: 'var(--color-text-muted)' }}>
                                    {item.answer}
                                </p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
