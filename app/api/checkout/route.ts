import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            items,
            customerName,
            email,
            phone,
            shippingAddress,
            deliveryMethod,
            deliveryDetails,
            shippingCost,
            amount,
        } = body;

        // Build line items for Stripe Checkout
        const lineItems: any[] = items.map((item: any) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    ...(item.color ? { description: `Couleur: ${item.color}` } : {}),
                },
                unit_amount: Math.round(item.price * 100), // Stripe uses cents
            },
            quantity: item.quantity,
        }));

        // Add shipping as a line item
        if (shippingCost > 0) {
            lineItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: deliveryMethod === 'relay' ? 'Livraison Point Relais' : 'Livraison à domicile',
                    },
                    unit_amount: Math.round(shippingCost * 100),
                },
                quantity: 1,
            });
        }

        // Get the site URL for redirects
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: email,
            success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/checkout`,
            metadata: {
                customerName,
                email,
                phone: phone || '',
                deliveryMethod,
                shippingAddress: shippingAddress ? JSON.stringify(shippingAddress) : '',
                deliveryDetails: deliveryDetails ? JSON.stringify(deliveryDetails) : '',
                shippingCost: String(shippingCost),
                items: JSON.stringify(items),
            },
        });

        return NextResponse.json({
            success: true,
            url: session.url,
            sessionId: session.id,
        });

    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
