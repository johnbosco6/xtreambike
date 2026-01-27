import { NextResponse } from 'next/server';
import { OrdersService } from '@/lib/orders-service';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Destructure to separate order fields from potential extra data
        const {
            items,
            customerName,
            email,
            shippingAddress,
            deliveryMethod,
            deliveryDetails,
            shippingCost,
            amount
        } = body;

        // Construct order data matching the database schema
        // Note: You might need to adjust fields based on your exact DB schema
        // This assumes OrdersService.createOrder handles the mapping or we pass compatible object

        // We'll treat this as a "Paid" order or "Pending" depending on requirement. 
        // Since user removed SumUp, maybe they want it to be "Pending Payment" or just "Confirmed" (Pay on Delivery?)
        // Let's set status to 'pending' and payment_status to 'unpaid' or 'paid' if it's manual.
        // For now, let's assume 'pending' status.

        const orderData = {
            customer_name: customerName,
            customer_email: email,
            items: items,
            total_amount: amount,
            status: 'pending',
            payment_status: 'pending', // or 'on_delivery' if supported
            shipping_address: shippingAddress,
            delivery_method: deliveryMethod,
            delivery_details: deliveryDetails,
            shipping_cost: shippingCost,
            created_at: new Date().toISOString()
        };

        const order = await OrdersService.createOrder(orderData as any);

        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.order_number
        });

    } catch (error: any) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}
