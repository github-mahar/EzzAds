// ============================================
// STRIPE CLIENT — THE EZZADS GENERATOR
// ============================================
// Per techstack.md §6: Stripe handles subscriptions.
// Flow: Stripe Checkout → Webhook → Update user plan in database.

// Note: Stripe SDK will be installed when payment flow is activated.
// The secret key is stored in .env.local as STRIPE_SECRET_KEY (server-side only).
// The publishable key is stored as NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (client-side safe).

export const STRIPE_STATUS = process.env.STRIPE_SECRET_KEY ? 'CONFIGURED' : 'PENDING_CONFIGURATION' as const;

export const PLANS = {
    FREE: {
        id: 'FREE',
        name: 'RECON_TIER',
        displayName: 'Reconnaissance',
        generationsPerDay: 5,
        features: [
            '5 generations per day',
            'Basic output structure',
            'Single platform targeting',
            'Standard frameworks (AIDA)',
        ],
        price: 0,
    },
    PRO: {
        id: 'PRO',
        name: 'OPERATOR_TIER',
        displayName: 'Operator',
        generationsPerDay: -1, // Unlimited
        features: [
            'Unlimited generations',
            'Advanced hook variations',
            'A/B variant generation',
            'Image prompt generation',
            'All frameworks (AIDA, PAS, Emotional)',
            'Multi-platform optimization',
            'Priority processing',
            'CREATIVE_ARCHIVE access',
        ],
        price: 29,
    },
} as const;
