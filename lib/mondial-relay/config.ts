// Mondial Relay API1 Configuration
// Simple, direct env var access — no Supabase dependency

export const MONDIAL_RELAY_ENSEIGNE = process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE || '';
export const MONDIAL_RELAY_PRIVATE_KEY = process.env.MONDIAL_RELAY_API1_PRIVATE_KEY || '';
export const MONDIAL_RELAY_API_URL = process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_URL || 'https://api.mondialrelay.com/Web_Services.asmx';

export function getMondialRelayCredentials() {
    const enseigne = MONDIAL_RELAY_ENSEIGNE;
    const privateKey = MONDIAL_RELAY_PRIVATE_KEY;

    if (!enseigne || !privateKey) {
        console.error(
            '[MondialRelay] ❌ MISSING CREDENTIALS!',
            `Enseigne: ${enseigne ? 'SET' : 'MISSING'}`,
            `PrivateKey: ${privateKey ? 'SET' : 'MISSING'}`,
            '→ Add NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE and MONDIAL_RELAY_API1_PRIVATE_KEY to your environment variables.'
        );
    }

    return { enseigne, privateKey, apiUrl: MONDIAL_RELAY_API_URL };
}
