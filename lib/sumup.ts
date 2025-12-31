import SumUp from "@sumup/sdk";
import { getSumUpKeys } from "./api-keys";

export class SumUpService {
    private client: SumUp | null = null;
    private merchantCode: string = "";
    private initialized: boolean = false;

    /**
     * Initialize the SumUp client with credentials from Supabase
     * This is async because we need to fetch from the database
     */
    private async initialize() {
        if (this.initialized) {
            return;
        }

        try {
            const keys = await getSumUpKeys();
            const apiKey = keys.api_key;
            this.merchantCode = keys.merchant_code;

            if (!apiKey || !this.merchantCode) {
                console.warn("SumUp credentials (api_key, merchant_code) are missing from Supabase.");
                return;
            }

            this.client = new SumUp({ apiKey });
            this.initialized = true;
        } catch (error) {
            console.error("Failed to initialize SumUp service:", error);
            throw error;
        }
    }

    async createCheckout(amount: number, currency: string = "EUR", returnUrl: string, email: string) {
        // Ensure we're initialized
        await this.initialize();

        if (!this.client) {
            throw new Error("SumUp client not initialized");
        }

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

