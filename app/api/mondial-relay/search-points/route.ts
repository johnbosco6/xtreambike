import { NextRequest, NextResponse } from 'next/server';
import { searchPointRelais } from '@/lib/mondial-relay/services/point-relais-search';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { postalCode, country, latitude, longitude, deliveryMode, searchRadius, maxResults, pointRelaisId } = body;

        if (!postalCode && !latitude && !longitude && !pointRelaisId) {
            return NextResponse.json(
                { success: false, error: 'postalCode, GPS coordinates, or pointRelaisId is required' },
                { status: 400 }
            );
        }

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

        return NextResponse.json({
            success: true,
            count: results.length,
            pointsRelais: results,
        });
    } catch (error) {
        console.error('[MondialRelay] Search error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        );
    }
}
