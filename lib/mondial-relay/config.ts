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
 * Get Mondial Relay configuration
 * Priority: 1) Supabase api_keys table, 2) Environment variables
 */
export async function getMondialRelayConfig(): Promise<MondialRelayConfig> {
    // Return cached config if available
    if (cachedConfig) {
        return cachedConfig;
    }

    let supabaseKeys: Record<string, string> = {};

    try {
        // Try to fetch from Supabase api_keys table
        const keys = await getMondialRelayKeys();
        supabaseKeys = keys || {};
        console.log('[MondialRelay] Loaded keys from Supabase api_keys table');
    } catch (error) {
        // This is expected if api_keys table doesn't exist or has no mondial_relay entries
        console.log('[MondialRelay] Supabase api_keys not available, using environment variables');
    }

    // Resolve keys: Supabase first, then env vars
    const url = supabaseKeys.api1_url || process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_URL || 'https://api.mondialrelay.com/Web_Services.asmx';
    const enseigne = supabaseKeys.api1_enseigne || process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE || '';
    const privateKey = supabaseKeys.api1_private_key || process.env.MONDIAL_RELAY_API1_PRIVATE_KEY || '';
    const marque = supabaseKeys.api1_marque || process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_MARQUE || '';

    // Log key status (masked for security)
    console.log(`[MondialRelay] Config: enseigne=${enseigne ? enseigne.substring(0, 4) + '****' : 'MISSING'}, privateKey=${privateKey ? '****' + privateKey.substring(privateKey.length - 2) : 'MISSING'}`);

    // Validate essential keys
    if (!enseigne || !privateKey) {
        console.error('[MondialRelay] ❌ CRITICAL: API keys are missing! Set NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE and MONDIAL_RELAY_API1_PRIVATE_KEY in Vercel environment variables.');
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

