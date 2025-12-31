import { NextResponse } from "next/server";
import { PaymentsService } from "@/lib/payments-service";
import { OrdersService } from "@/lib/orders-service";

/**
 * SumUp Webhook Handler
 * Receives payment status updates from SumUp
 * 
 * Configure this webhook URL in your SumUp dashboard:
 * https://your-domain.com/api/sumup/webhook
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log('SumUp Webhook received:', JSON.stringify(body, null, 2));

        const {
            id,              // checkout_id
            status,          // PENDING, PAID, FAILED, CANCELLED
            transaction_id,
            amount,
            currency,
            checkout_reference,
        } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Missing checkout ID" },
                { status: 400 }
            );
        }

        // Get the payment transaction by checkout_id
        const transaction = await PaymentsService.getTransactionByCheckoutId(id);

        if (!transaction) {
            console.error(`No transaction found for checkout_id: ${id}`);
            return NextResponse.json(
                { error: "Transaction not found" },
                { status: 404 }
            );
        }

        // Map SumUp status to our status
        let paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
        let orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' = 'pending';

        switch (status?.toUpperCase()) {
            case 'PAID':
                paymentStatus = 'completed';
                orderStatus = 'processing';
                break;
            case 'FAILED':
                paymentStatus = 'failed';
                break;
            case 'CANCELLED':
                paymentStatus = 'failed';
                orderStatus = 'cancelled';
                break;
            case 'PENDING':
            default:
                paymentStatus = 'pending';
                break;
        }

        // Update payment transaction
        await PaymentsService.updateTransactionByCheckoutId(
            id,
            paymentStatus,
            transaction_id,
            {
                webhook_received_at: new Date().toISOString(),
                sumup_status: status,
                amount,
                currency,
                checkout_reference,
            }
        );

        // Update order status if payment is completed
        if (transaction.order_id) {
            if (paymentStatus === 'completed') {
                await OrdersService.updatePaymentStatus(transaction.order_id, 'completed');
                await OrdersService.updateOrderStatus(transaction.order_id, orderStatus);
            } else if (paymentStatus === 'failed') {
                await OrdersService.updatePaymentStatus(transaction.order_id, 'failed');
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Webhook processed successfully'
        });

    } catch (error: any) {
        console.error("SumUp Webhook Error:", error);
        return NextResponse.json(
            { error: error.message || "Webhook processing failed" },
            { status: 500 }
        );
    }
}

// Handle GET requests (for webhook verification if needed)
export async function GET() {
    return NextResponse.json({
        message: "SumUp webhook endpoint is active"
    });
}
