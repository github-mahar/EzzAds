'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface CopyButtonProps {
    text: string;
    label?: string;
}

export default function CopyButton({ text, label = 'COPY' }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] tracking-wider transition-all duration-100"
            style={{
                fontFamily: 'var(--font-mono)',
                color: copied ? 'var(--color-accent-success)' : 'var(--color-text-muted)',
                background: copied ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                border: `1px solid ${copied ? 'var(--color-accent-success)' : 'var(--color-border-subtle)'}`,
                borderRadius: 'var(--radius-sharp)',
            }}
        >
            {copied ? <Check size={10} /> : <Copy size={10} />}
            {copied ? 'COPIED' : label}
        </button>
    );
}
