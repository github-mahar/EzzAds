// ============================================
// STRIPE CLIENT — THE EZZADS GENERATOR
// ============================================
// Per techstack.md §6: Stripe handles subscriptions.
// Flow: Stripe Checkout → Webhook → Update user plan in database.

import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
    typescript: true,
});

export const STRIPE_STATUS = process.env.STRIPE_SECRET_KEY ? 'CONFIGURED' : 'PENDING_CONFIGURATION' as const;

// Price ID for the Operator tier — set this after creating in Stripe Dashboard
// You can create products via: Stripe Dashboard → Products → Add Product
// Or let the checkout API auto-create one below
export const STRIPE_PRICE_ID = process.env.STRIPE_OPERATOR_PRICE_ID || null;

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
