
import { NextResponse } from "next/server";
import { sumupService } from "@/lib/sumup";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const checkoutId = searchParams.get("checkoutId");

        if (!checkoutId) {
            return NextResponse.json(
                { error: "Missing required parameter: checkoutId" },
                { status: 400 }
            );
        }

        const checkout: any = await sumupService.getCheckout(checkoutId);

        return NextResponse.json({
            status: checkout.status, // PAID, PENDING, FAILED
            transactionId: checkout.transaction_id,
            amount: checkout.amount,
            currency: checkout.currency,
        });

    } catch (error: any) {
        console.error("SumUp Verify Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to verify checkout" },
            { status: 500 }
        );
    }
}
