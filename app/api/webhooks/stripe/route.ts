import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { OrdersService } from '@/lib/orders-service';
import { PaymentsService } from '@/lib/payments-service';

// Disable body parsing — Stripe needs the raw body for signature verification
export const runtime = 'nodejs';

export async function POST(request: Request) {
    const body = await request.text();
    const headersList = headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;

        try {
            const metadata = session.metadata || {};

            // Parse items and addresses from metadata
            const items = metadata.items ? JSON.parse(metadata.items) : [];
            const shippingAddress = metadata.shippingAddress ? JSON.parse(metadata.shippingAddress) : null;
            const deliveryDetails = metadata.deliveryDetails ? JSON.parse(metadata.deliveryDetails) : null;
            const shippingCost = parseFloat(metadata.shippingCost || '0');

            // Create the order in Supabase
            const order = await OrdersService.createOrder({
                customer_name: metadata.customerName,
                customer_email: metadata.email,
                items: items,
                subtotal: (session.amount_total / 100) - shippingCost,
                shipping_cost: shippingCost,
                total: session.amount_total / 100,
                status: 'pending',
                payment_status: 'completed',
                shipping_address: shippingAddress,
                delivery_method: metadata.deliveryMethod,
                delivery_details: deliveryDetails,
            } as any);

            // Create payment transaction record
            await PaymentsService.createTransaction({
                order_id: order.id,
                provider: 'stripe',
                transaction_id: session.payment_intent,
                checkout_id: session.id,
                amount: session.amount_total / 100,
                currency: session.currency || 'eur',
                status: 'completed',
                metadata: {
                    stripe_session_id: session.id,
                    stripe_payment_intent: session.payment_intent,
                    customer_email: metadata.email,
                },
            } as any);

            console.log(`✅ Order created: ${order.order_number} for ${metadata.email}`);

        } catch (error) {
            console.error('Error processing checkout.session.completed:', error);
            // Return 200 to prevent Stripe from retrying (we log the error)
            return NextResponse.json({ received: true, error: 'Processing error' });
        }
    }

    return NextResponse.json({ received: true });
}
