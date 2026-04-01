import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { OrdersService } from '@/lib/orders-service';

export const dynamic = 'force-dynamic';

// Helper function to convert country name to ISO 3166-1 alpha-2 code
const countryNameToISO = (countryName: string): string => {
    if (!countryName) return 'FR'; // Default to France if no country name is provided

    switch (countryName.toLowerCase()) {
        case 'france':
            return 'FR';
        case 'germany':
            return 'DE';
        case 'spain':
            return 'ES';
        case 'italy':
            return 'IT';
        case 'united kingdom':
        case 'royaume-uni':
            return 'GB';
        case 'belgium':
        case 'belgique':
            return 'BE';
        case 'luxembourg':
            return 'LU';
        case 'netherlands':
        case 'pays-bas':
            return 'NL';
        case 'switzerland':
        case 'suisse':
            return 'CH';
        case 'austria':
        case 'autriche':
            return 'AT';
        case 'portugal':
            return 'PT';
        case 'ireland':
        case 'irlande':
            return 'IE';
        // Add more countries as needed
        default:
            // If the country name is already a 2-letter code, return it.
            // Otherwise, default to France.
            return countryName.length === 2 ? countryName.toUpperCase() : 'FR';
    }
};

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            items,
            customerName,
            email,
            phone,
            customerAddress,
            shippingAddress,
            deliveryMethod,
            deliveryDetails,
            shippingCost,
            amount,
        } = body;

        // 0. Sync Customer in Supabase
        console.log(`[Checkout] Syncing customer record for ${email}...`);
        const nameParts = (customerName || '').split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');

        const customerId = await OrdersService.getOrCreateCustomer({
            email,
            firstName,
            lastName,
            phone,
            address: customerAddress || shippingAddress,
        });

        // 1. Create Order in Supabase early (status: pending, payment_status: pending)
        console.log(`[Checkout] Creating early order for ${email}...`);
        const order = await OrdersService.createOrder({
            customer_name: customerName,
            customer_email: email,
            customer_phone: phone, // NEW
            customer_id: customerId,
            items: items,
            subtotal: amount - (shippingCost || 0),
            shipping_cost: shippingCost || 0,
            total: amount,
            status: 'pending',
            payment_status: 'pending',
            billing_address: customerAddress, // NEW: Always store the home address
            shipping_address: shippingAddress || customerAddress, // Home delivery or fallback
            delivery_method: deliveryMethod,
            delivery_details: deliveryDetails,
        } as any);
        console.log(`[Checkout] Order created successfully: ID=${order.id}, Number=${order.order_number}, CustomerID=${customerId}`);

        // 2. Setup Stripe
        const stripe = await getStripeClient();

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

        // Build shipping details for Stripe payment intent
        let shippingDetails: any = undefined;
        if (deliveryMethod === 'home' && shippingAddress) {
            shippingDetails = {
                name: customerName,
                phone: phone || '',
                address: {
                    line1: shippingAddress.address,
                    city: shippingAddress.city,
                    postal_code: shippingAddress.postalCode,
                    country: shippingAddress.country ? countryNameToISO(shippingAddress.country) : 'FR',
                },
            };
        } else if (deliveryMethod === 'relay' && deliveryDetails) {
            shippingDetails = {
                name: customerName,
                phone: phone || '',
                address: {
                    line1: `Point Relais: ${deliveryDetails.name}`,
                    line2: deliveryDetails.address,
                    city: deliveryDetails.city,
                    postal_code: deliveryDetails.postalCode,
                    country: deliveryDetails.country ? countryNameToISO(deliveryDetails.country) : 'FR',
                },
            };
        }

        // 3. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: email,
            success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
            cancel_url: `${siteUrl}/checkout`,
            ...(shippingDetails ? {
                payment_intent_data: {
                    shipping: shippingDetails,
                },
            } : {}),
            metadata: {
                orderId: order.id, // Store our order ID to update it later
                orderNumber: order.order_number,
                customer_name: customerName,
                customer_email: email,
                customer_phone: phone || '',
                delivery_method: deliveryMethod,
                // Human-readable addresses for the Stripe Dashboard
                home_address: customerAddress ? `${customerAddress.address}, ${customerAddress.postalCode} ${customerAddress.city}, ${customerAddress.country}`.slice(0, 490) : 'N/A',
                destination_address: shippingAddress ? `${shippingAddress.address}, ${shippingAddress.postalCode} ${shippingAddress.city}, ${shippingAddress.country}` : (deliveryMethod === 'relay' && deliveryDetails ? `Point Relais: ${deliveryDetails.name}, ${deliveryDetails.address}, ${deliveryDetails.postalCode} ${deliveryDetails.city}` : 'N/A'),
                relay_id: deliveryMethod === 'relay' && deliveryDetails ? deliveryDetails.id : '',
                items_summary: items.map((item: any) => `${item.name} (x${item.quantity})`).join(', ').slice(0, 490),
                shipping_cost: String(shippingCost),
            },
        });

        return NextResponse.json({
            success: true,
            url: session.url,
            sessionId: session.id,
            orderId: order.id,
            orderNumber: order.order_number
        });

    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
