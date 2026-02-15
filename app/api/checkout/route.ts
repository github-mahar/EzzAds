// ============================================
// STRIPE CHECKOUT SESSION API
// ============================================
// Creates a Stripe Checkout session for the Operator ($29/mo) plan.
// POST /api/checkout → returns { url: string }

import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PRICE_ID, PLANS } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
    try {
        // 1. Verify authenticated user
        const supabase = await createServerSupabaseClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        // 2. Get origin for redirect URLs
        const origin = request.headers.get('origin') || 'http://localhost:3000';

        // 3. Check if user already has an active Stripe customer
        const customers = await stripe.customers.list({
            email: user.email,
            limit: 1,
        });

        let customerId: string;
        if (customers.data.length > 0) {
            customerId = customers.data[0].id;

            // Check for active subscriptions
            const subscriptions = await stripe.subscriptions.list({
                customer: customerId,
                status: 'active',
                limit: 1,
            });

            if (subscriptions.data.length > 0) {
                // User already has an active subscription — redirect to billing portal
                const portalSession = await stripe.billingPortal.sessions.create({
                    customer: customerId,
                    return_url: `${origin}/account`,
                });

                return NextResponse.json({
                    success: true,
                    url: portalSession.url,
                    type: 'portal',
                });
            }
        } else {
            // Create new Stripe customer
            const customer = await stripe.customers.create({
                email: user.email!,
                metadata: {
                    supabase_uid: user.id,
                },
            });
            customerId = customer.id;
        }

        // 4. Build line items
        let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];

        if (STRIPE_PRICE_ID) {
            lineItems = [{ price: STRIPE_PRICE_ID, quantity: 1 }];
        } else {
            lineItems = [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'EzzAds.ai — Operator Tier',
                            description: `${PLANS.PRO.features.join(' • ')}`,
                        },
                        unit_amount: PLANS.PRO.price * 100,
                        recurring: { interval: 'month' },
                    },
                    quantity: 1,
                },
            ];
        }

        // 5. Create checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            line_items: lineItems,
            success_url: `${origin}/account?upgrade=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/pricing?upgrade=cancelled`,
            metadata: {
                supabase_uid: user.id,
            },
            subscription_data: {
                metadata: {
                    supabase_uid: user.id,
                },
            },
        });

        return NextResponse.json({
            success: true,
            url: session.url,
            type: 'checkout',
        });
    } catch (error) {
        console.error('[STRIPE] Checkout error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create checkout session',
            },
            { status: 500 }
        );
    }
}
