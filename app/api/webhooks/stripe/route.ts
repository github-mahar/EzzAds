// ============================================
// STRIPE WEBHOOK HANDLER
// ============================================
// Listens for Stripe events to update user plan in Supabase.
// POST /api/webhooks/stripe
//
// Key events:
//   checkout.session.completed → Upgrade to PRO
//   customer.subscription.deleted → Downgrade to FREE
//   customer.subscription.updated → Handle plan changes
//
// To test locally with Stripe CLI:
//   stripe listen --forward-to localhost:3000/api/webhooks/stripe

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Use service role key for webhook (bypasses RLS)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    // If no webhook secret is configured, skip signature verification (dev mode)
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
        if (webhookSecret && signature) {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } else {
            // Dev mode — parse directly (not recommended for production)
            event = JSON.parse(body) as Stripe.Event;
            console.warn('[STRIPE WEBHOOK] No webhook secret configured — skipping signature verification');
        }
    } catch (err) {
        console.error('[STRIPE WEBHOOK] Signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    try {
        switch (event.type) {
            // ─────────────────────────────────────────
            // CHECKOUT COMPLETED → Upgrade to PRO
            // ─────────────────────────────────────────
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const supabaseUid = session.metadata?.supabase_uid;

                if (supabaseUid && session.mode === 'subscription') {
                    const { error } = await supabaseAdmin
                        .from('profiles')
                        .update({
                            plan_type: 'PRO',
                            stripe_customer_id: session.customer as string,
                            stripe_subscription_id: session.subscription as string,
                        })
                        .eq('id', supabaseUid);

                    if (error) {
                        console.error('[STRIPE WEBHOOK] Failed to upgrade user:', error.message);
                    } else {
                        console.log(`[STRIPE WEBHOOK] User ${supabaseUid} upgraded to PRO`);
                    }
                }
                break;
            }

            // ─────────────────────────────────────────
            // SUBSCRIPTION DELETED → Downgrade to FREE
            // ─────────────────────────────────────────
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const supabaseUid = subscription.metadata?.supabase_uid;

                if (supabaseUid) {
                    const { error } = await supabaseAdmin
                        .from('profiles')
                        .update({
                            plan_type: 'FREE',
                            stripe_subscription_id: null,
                        })
                        .eq('id', supabaseUid);

                    if (error) {
                        console.error('[STRIPE WEBHOOK] Failed to downgrade user:', error.message);
                    } else {
                        console.log(`[STRIPE WEBHOOK] User ${supabaseUid} downgraded to FREE`);
                    }
                }
                break;
            }

            // ─────────────────────────────────────────
            // SUBSCRIPTION UPDATED → Handle changes
            // ─────────────────────────────────────────
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const supabaseUid = subscription.metadata?.supabase_uid;

                if (supabaseUid) {
                    const isActive = subscription.status === 'active' || subscription.status === 'trialing';

                    const { error } = await supabaseAdmin
                        .from('profiles')
                        .update({
                            plan_type: isActive ? 'PRO' : 'FREE',
                        })
                        .eq('id', supabaseUid);

                    if (error) {
                        console.error('[STRIPE WEBHOOK] Failed to update subscription:', error.message);
                    }
                }
                break;
            }

            // ─────────────────────────────────────────
            // INVOICE PAYMENT FAILED → Alert
            // ─────────────────────────────────────────
            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                console.warn(`[STRIPE WEBHOOK] Payment failed for customer: ${invoice.customer}`);
                break;
            }

            default:
                // Unhandled event type
                break;
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('[STRIPE WEBHOOK] Processing error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
