import SumUp from "@sumup/sdk";

export class SumUpService {
    private client: SumUp;
    private merchantCode: string;

    constructor() {
        const apiKey = process.env.SUMUP_API_KEY || "";
        this.merchantCode = process.env.SUMUP_MERCHANT_CODE || "";

        if (!apiKey || !this.merchantCode) {
            console.warn("SumUp credentials (SUMUP_API_KEY, SUMUP_MERCHANT_CODE) are missing.");
        }

        this.client = new SumUp({ apiKey });
    }

    async createCheckout(amount: number, currency: string = "PLN", returnUrl: string, email: string) {
        const checkoutRef = `ORDER-${Date.now()}`; // In production, use your DB ID

        try {
            const checkout = await this.client.checkouts.create({
                checkout_reference: checkoutRef,
                amount,
                currency: currency as any,
                description: "X-Trem Grip Order",
                redirect_url: returnUrl,
                merchant_code: this.merchantCode,
                hosted_checkout: {
                    enabled: true,
                },
            } as any);

            return checkout;
        } catch (error) {
            console.error("SumUp Checkout Error:", error);
            throw error;
        }
    }
}

export const sumupService = new SumUpService();
