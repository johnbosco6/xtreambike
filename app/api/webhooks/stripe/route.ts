import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getStripeClient } from '@/lib/stripe';
import { OrdersService } from '@/lib/orders-service';
import { PaymentsService } from '@/lib/payments-service';

export const dynamic = 'force-dynamic';

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
    const stripe = await getStripeClient();

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
            const orderId = metadata.orderId;

            // Parse addresses from metadata
            const customerAddress = metadata.customerAddress ? JSON.parse(metadata.customerAddress) : null;
            const shippingAddress = metadata.shippingAddress ? JSON.parse(metadata.shippingAddress) : null;
            const deliveryDetails = metadata.deliveryDetails ? JSON.parse(metadata.deliveryDetails) : null;
            const shippingCost = parseFloat(metadata.shippingCost || '0');

            const addressToStore = shippingAddress || customerAddress;

            // Fetch the full session from Stripe with line_items expanded
            let items: any[] = [];
            try {
                const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
                    expand: ['line_items'],
                });
                const lineItemsData = fullSession.line_items?.data || [];
                // Filter out shipping cost line items
                const productItems = lineItemsData.filter(
                    (li: any) => li.description !== 'Livraison Point Relais' && li.description !== 'Livraison à domicile'
                );
                items = productItems.map((li: any) => ({
                    name: li.description || 'Article',
                    price: li.price?.unit_amount ? li.price.unit_amount / 100 : 0,
                    quantity: li.quantity || 1,
                }));
            } catch (lineItemsError) {
                console.warn('Could not fetch line items, using metadata summary:', lineItemsError);
                items = [{ name: metadata.itemsSummary || 'Commande', quantity: 1 }];
            }

            let order;
            if (orderId) {
                // UPDATE existing order (Early Capture Flow)
                // Set payment_status to 'completed' AND order status to 'processing'
                order = await OrdersService.updatePaymentStatus(orderId, 'completed');
                if (order) {
                    await OrdersService.updateOrderStatus(order.id, 'processing');
                    await OrdersService.updateDeliveryDetails(order.id, metadata.deliveryMethod, deliveryDetails);
                }
            } else {
                // CREATE new order (Legacy Fallback Flow)
                order = await OrdersService.createOrder({
                    customer_name: metadata.customerName,
                    customer_email: metadata.email,
                    customer_phone: metadata.phone, // NEW
                    items: items,
                    subtotal: (session.amount_total / 100) - shippingCost,
                    shipping_cost: shippingCost,
                    total: session.amount_total / 100,
                    status: 'processing',
                    payment_status: 'completed',
                    billing_address: customerAddress, // NEW
                    shipping_address: addressToStore,
                    delivery_method: metadata.deliveryMethod,
                    delivery_details: deliveryDetails,
                } as any);
            }

            if (!order) {
                throw new Error(`Failed to find or update order: ${orderId}`);
            }

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
                    early_capture: !!orderId
                },
            } as any);

            console.log(`✅ Order processed: ${order.order_number} (status: completed)`);

        } catch (error) {
            console.error('Error processing checkout.session.completed:', error);
            return NextResponse.json({ received: true, error: 'Processing error' });
        }
    }

    return NextResponse.json({ received: true });
}
