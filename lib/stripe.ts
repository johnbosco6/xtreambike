import Stripe from 'stripe';
import { ApiKeysService } from './api-keys';

export async function getStripeClient(): Promise<Stripe> {
    let apiKey = process.env.STRIPE_SECRET_KEY;

    if (!apiKey) {
        try {
            const keys = await ApiKeysService.getServiceKeys('stripe');
            apiKey = keys.secret_key || keys.api_key;
        } catch (error) {
            console.warn('Failed to fetch Stripe key from Supabase:', error);
        }
    }

    if (!apiKey || apiKey === 'dummy_key_for_build') {
        throw new Error('Stripe API key not configured. Set STRIPE_SECRET_KEY or configure in Supabase.');
    }

    return new Stripe(apiKey, {
        typescript: true,
    });
}

// Keep the legacy export for now but it might use a dummy key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build', {
    typescript: true,
});
