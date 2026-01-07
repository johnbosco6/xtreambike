// Mondial Relay API1 Configuration
import { getMondialRelayKeys } from '../api-keys';

// Cache for Mondial Relay config
let cachedConfig: MondialRelayConfig | null = null;

interface MondialRelayConfig {
    api1: {
        url: string;
        enseigne: string;
        privateKey: string;
        marque: string;
    };
    defaults: {
        searchRadius: number;
        maxResults: number;
        defaultCountry: string;
        defaultLanguage: string;
    };
    deliveryModes: {
        [key: string]: {
            name: string;
            description: string;
            maxRadius: number;
        };
    };
}

// ... (imports remain the same)

/**
 * Get Mondial Relay configuration from Supabase with fallback to Environment Variables
 * This is async because we need to fetch from the database
 */
export async function getMondialRelayConfig(): Promise<MondialRelayConfig> {
    // Return cached config if available
    if (cachedConfig) {
        return cachedConfig;
    }

    let keys = {
        api1_url: '',
        api1_enseigne: '',
        api1_private_key: '',
        api1_marque: '',
    };

    try {
        // Try to fetch from Supabase
        keys = await getMondialRelayKeys() as any;
    } catch (error) {
        console.warn('Failed to load Mondial Relay config from Supabase, falling back to environment variables.');
    }

    // Fallback to environment variables if keys are missing from Supabase
    // Note: process.env will be available at runtime in Vercel
    const url = keys.api1_url || process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_URL || 'https://api.mondialrelay.com/Web_Services.asmx';
    const enseigne = keys.api1_enseigne || process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE || '';
    const privateKey = keys.api1_private_key || process.env.MONDIAL_RELAY_API1_PRIVATE_KEY || '';
    const marque = keys.api1_marque || process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_MARQUE || '';

    // Validate essential keys
    if (!enseigne || !privateKey) {
        console.warn('Mondial Relay keys are missing (Enseigne or Private Key). Tracking and Points Search will fail.');
    }

    cachedConfig = {
        api1: {
            url,
            enseigne,
            privateKey,
            marque,
        },
        defaults: {
            searchRadius: 50, // km
            maxResults: 20,
            defaultCountry: 'FR',
            defaultLanguage: 'FR',
        },
        deliveryModes: {
            '24R': {
                name: 'Point Relais® Standard',
                description: 'Livraison en Point Relais® (L + XL + S + C)',
                maxRadius: 100, // km
            },
            '24L': {
                name: 'Point Relais® XL',
                description: 'Livraison en Point Relais® XL',
                maxRadius: 100, // km
            },
            'XOH': {
                name: 'Express D+1',
                description: 'Livraison Express en Point Relais®',
                maxRadius: 75, // km
            },
        },
    };

    return cachedConfig;
}

// Legacy export for backwards compatibility (will be deprecated)
// Use getMondialRelayConfig() instead for runtime API calls
// This version is safe for build-time static analysis
export const MONDIAL_RELAY_CONFIG = {
    api1: {
        url: process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_URL || 'https://api.mondialrelay.com/Web_Services.asmx',
        enseigne: process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE || '',
        privateKey: process.env.MONDIAL_RELAY_API1_PRIVATE_KEY || '',
        marque: process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_MARQUE || '',
    },
    defaults: {
        searchRadius: 50,
        maxResults: 20,
        defaultCountry: 'FR',
        defaultLanguage: 'FR',
    },
    deliveryModes: {
        '24R': {
            name: 'Point Relais® Standard',
            description: 'Livraison en Point Relais® (L + XL + S + C)',
            maxRadius: 100,
        },
        '24L': {
            name: 'Point Relais® XL',
            description: 'Livraison en Point Relais® XL',
            maxRadius: 100,
        },
        'XOH': {
            name: 'Express D+1',
            description: 'Livraison Express en Point Relais®',
            maxRadius: 75,
        },
    },
} as const;

export type DeliveryModeKey = '24R' | '24L' | 'XOH';

