import SumUp from "@sumup/sdk";
import { getSumUpKeys } from "./api-keys";

export class SumUpService {
    private client: SumUp | null = null;
    private merchantCode: string = "";
    private initialized: boolean = false;

    /**
     * Initialize the SumUp client with credentials from Supabase or Environment Variables
     * This is async because we need to fetch from the database
     */
    private async initialize() {
        if (this.initialized) {
            return;
        }

        try {
            // Priority 1: Try fetching from Supabase
            let apiKey: string | undefined;
            let merchantCode: string | undefined;

            try {
                const keys = await getSumUpKeys();
                apiKey = keys.api_key;
                merchantCode = keys.merchant_code;
            } catch (error) {
                console.warn("Failed to fetch SumUp keys from Supabase, trying env vars...", error);
            }

            // Priority 2: Fallback to environment variables
            if (!apiKey) {
                apiKey = process.env.SUMUP_API_KEY;
            }
            if (!merchantCode) {
                merchantCode = process.env.SUMUP_MERCHANT_CODE;
            }

            this.merchantCode = merchantCode || "";

            if (!apiKey || !this.merchantCode) {
                const missing = [];
                if (!apiKey) missing.push("SUMUP_API_KEY");
                if (!this.merchantCode) missing.push("SUMUP_MERCHANT_CODE");

                console.error(`SumUp initialization failed. Missing credentials: ${missing.join(", ")}. Checked both Supabase and Environment Variables.`);
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

    async getCheckout(checkoutId: string) {
        await this.initialize();
        if (!this.client) throw new Error("SumUp client not initialized");

        try {
            // @ts-ignore - SDK typing might be incomplete for newer methods
            const checkout = await this.client.checkouts.findById(checkoutId);
            return checkout;
        } catch (error) {
            console.error("SumUp GetCheckout Error:", error);
            throw error;
        }
    }
}

export const sumupService = new SumUpService();

