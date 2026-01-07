import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { getTracking } from '@/lib/mondial-relay/services/tracking';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const shipmentNumber = searchParams.get('shipmentNumber');
        const language = searchParams.get('language') || 'FR';

        // Validate shipment number
        if (!shipmentNumber) {
            return NextResponse.json(
                { error: 'Shipment number is required' },
                { status: 400 }
            );
        }

        if (!/^[0-9]{8}$/.test(shipmentNumber)) {
            return NextResponse.json(
                { error: 'Invalid shipment number format. Must be 8 digits.' },
                { status: 400 }
            );
        }

        // Get tracking information
        const trackingData = await getTracking({
            shipmentNumber,
            language,
        });

        return NextResponse.json({
            success: true,
            shipmentNumber,
            tracking: trackingData,
        });
    } catch (error) {
        console.error('Tracking error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to get tracking information',
            },
            { status: 500 }
        );
    }
}
