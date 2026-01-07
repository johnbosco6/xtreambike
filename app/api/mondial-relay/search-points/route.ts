import { NextRequest, NextResponse } from 'next/server';
import { searchPointRelais } from '@/lib/mondial-relay/services/point-relais-search';

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

        return NextResponse.json({
            success: true,
            count: results.length,
            pointsRelais: results,
        });
    } catch (error) {
        console.error('Point Relais search error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to search Point Relais',
            },
            { status: 500 }
        );
    }
}
