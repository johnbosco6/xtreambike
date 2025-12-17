import { NextResponse } from "next/server"
import { sumupService } from "@/lib/sumup"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { amount, email, returnUrl } = body

        if (!amount || !email) {
            return NextResponse.json(
                { error: "Missing required parameters" },
                { status: 400 }
            )
        }

        const checkout: any = await sumupService.createCheckout(amount, "PLN", returnUrl, email)

        return NextResponse.json({
            checkoutId: checkout.id,
            status: checkout.status,
            redirectUrl: checkout.hosted_checkout_url // Use the URL provided by SumUp
        })

    } catch (error: any) {
        console.error("SumUp API Error (Full):", JSON.stringify(error, null, 2))
        console.error("SumUp API Message:", error.message)
        return NextResponse.json(
            { error: error.message || "Failed to create checkout" },
            { status: 500 }
        )
    }
}
