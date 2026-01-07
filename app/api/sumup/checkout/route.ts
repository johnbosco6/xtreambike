import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

import { sumupService } from "@/lib/sumup";
import { OrdersService } from "@/lib/orders-service";
import { PaymentsService } from "@/lib/payments-service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            amount,
            email,
            returnUrl,
            items,
            customerName,
            shippingAddress,
            deliveryMethod,
            deliveryDetails,
            shippingCost = 0
        } = body;

        if (!amount || !email || !items) {
            return NextResponse.json(
                { error: "Missing required parameters (amount, email, items)" },
                { status: 400 }
            );
        }

        // Calculate totals
        const subtotal = parseFloat(amount) - parseFloat(shippingCost);

        // Create order in Supabase first
        const order = await OrdersService.createOrder({
            customer_email: email,
            customer_name: customerName || null,
            items: items,
            subtotal: subtotal,
            shipping_cost: parseFloat(shippingCost),
            total: parseFloat(amount),
            status: 'pending',
            payment_status: 'pending',
            delivery_method: deliveryMethod || null,
            delivery_details: deliveryDetails || null,
            shipping_address: shippingAddress || null,
        });

        if (!order) {
            throw new Error('Failed to create order in database');
        }

        // Construct detailed description for SumUp
        // Example: "Order #1234 - John Doe - 2x Grip, 1x Cleaner"
        const itemSummary = items.map((item: any) => `${item.quantity}x ${item.name} (${item.color || 'Standard'})`).join(', ');
        const description = `Order ${order.order_number} - ${customerName} - ${itemSummary}`.substring(0, 250); // specific max length if needed

        // Create SumUp checkout
        // Map frontend address to SumUp structure
        const customerDetails = {
            firstName: customerName?.split(' ')[0] || '',
            lastName: customerName?.split(' ').slice(1).join(' ') || '',
            address: shippingAddress?.address || '',
            city: shippingAddress?.city || '',
            postalCode: shippingAddress?.postalCode || '',
            country: typeof shippingAddress?.country === 'string' && shippingAddress.country.length === 2
                ? shippingAddress.country
                : 'FR' // Default or mapped country code needed. 
            // Note: Our frontend maps "France" -> "FR" for Mondial Relay. 
            // Inspecting earlier code: checkout-content maps it for API call BUT 
            // formData.country is stored as "France" or "Poland". 
            // SumUp likely needs ISO 2-letter.
        };

        // Simple helper for country mapping if needed 
        // (Assuming shippingAddress.country might be "France")
        const countryMap: Record<string, string> = {
            "France": "FR", "Belgique": "BE", "Belgium": "BE",
            "Espagne": "ES", "Spain": "ES", "Allemagne": "DE", "Germany": "DE",
            "Italie": "IT", "Italy": "IT", "Luxembourg": "LU",
            "Pays-Bas": "NL", "Netherlands": "NL", "Autriche": "AT", "Austria": "AT",
            "Portugal": "PT", "Pologne": "PL", "Poland": "PL"
        };

        if (shippingAddress?.country && countryMap[shippingAddress.country]) {
            customerDetails.country = countryMap[shippingAddress.country];
        }

        const checkout: any = await sumupService.createCheckout(
            parseFloat(amount),
            "EUR",
            returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order=${order.order_number}`,
            email,
            description,
            customerDetails
        );

        // Create payment transaction record
        await PaymentsService.createTransaction({
            order_id: order.id,
            provider: 'sumup',
            checkout_id: checkout.id,
            amount: parseFloat(amount),
            currency: 'EUR',
            status: 'pending',
            metadata: {
                checkout_reference: checkout.checkout_reference,
                description: checkout.description,
            },
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.order_number,
            checkoutId: checkout.id,
            status: checkout.status,
            redirectUrl: checkout.hosted_checkout_url,
        });

    } catch (error: any) {
        console.error("SumUp API Error (Full):", JSON.stringify(error, null, 2));
        console.error("SumUp API Message:", error.message);
        return NextResponse.json(
            { error: error.message || "Failed to create checkout" },
            { status: 500 }
        );
    }
}

