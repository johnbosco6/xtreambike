import { NextRequest, NextResponse } from 'next/server';
import { searchPointRelais } from '@/lib/mondial-relay/services/point-relais-search';
import { getMondialRelayConfig } from '@/lib/mondial-relay/config';

export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            postalCode,
            country = 'FR',
            latitude,
            longitude,
            deliveryMode = '24R',
            searchRadius,
            maxResults,
            pointRelaisId,
        } = body;

        // Validate required parameters
        if (!postalCode && !latitude && !longitude && !pointRelaisId) {
            return NextResponse.json(
                { error: 'Either postalCode, GPS coordinates, or pointRelaisId is required' },
                { status: 400 }
            );
        }

        // Pre-check: verify API keys are configured
        const config = await getMondialRelayConfig();
        if (!config.api1.enseigne || !config.api1.privateKey) {
            console.error('[MondialRelay] API keys not configured! Enseigne:', config.api1.enseigne ? 'SET' : 'MISSING', 'PrivateKey:', config.api1.privateKey ? 'SET' : 'MISSING');
            return NextResponse.json(
                {
                    success: false,
                    error: 'Mondial Relay API keys are not configured. Please add NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE and MONDIAL_RELAY_API1_PRIVATE_KEY to your environment variables.'
                },
                { status: 500 }
            );
        }

        console.log(`[MondialRelay] Searching points: CP=${postalCode}, country=${country}, mode=${deliveryMode}`);

        // Search for Point Relais
        const results = await searchPointRelais({
            postalCode,
            country,
            latitude,
            longitude,
            deliveryMode,
            searchRadius,
            maxResults,
            pointRelaisId,
        });

        console.log(`[MondialRelay] Found ${results.length} Point Relais`);

        return NextResponse.json({
            success: true,
            count: results.length,
            pointsRelais: results,
        });
    } catch (error) {
        console.error('[MondialRelay] Point Relais search error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Failed to search Point Relais';

        return NextResponse.json(
            {
                success: false,
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}
