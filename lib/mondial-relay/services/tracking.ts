/**
 * Mondial Relay Tracking Service
 * Uses WSI2_TracingColisDetaillé SOAP API
 */
import { XMLParser } from 'fast-xml-parser';
import { getMondialRelayCredentials, MONDIAL_RELAY_API_URL } from '../config';
import { generateTrackingSecurityKey } from '../security';
import type { TrackingResponse, TrackingEvent } from '../types';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
});

export interface FormattedTrackingData {
    status: string;
    pointRelaisName?: string;
    pointRelaisId?: string;
    events: Array<{
        description: string;
        date: string;
        time: string;
        location: string;
        pointRelaisId?: string;
        country?: string;
    }>;
}

/**
 * Get tracking information for a shipment
 */
export async function getTracking(params: {
    shipmentNumber: string;
    language?: string;
}): Promise<FormattedTrackingData> {
    const { enseigne, privateKey, apiUrl } = getMondialRelayCredentials();
    const { shipmentNumber, language = 'FR' } = params;

    if (!enseigne || !privateKey) {
        throw new Error('Mondial Relay credentials not configured');
    }

    if (!/^[0-9]{8}$/.test(shipmentNumber)) {
        throw new Error('Invalid shipment number format. Must be 8 digits.');
    }

    const security = generateTrackingSecurityKey({
        enseigne,
        expedition: shipmentNumber,
        langue: language,
        privateKey,
    });

    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WSI2_TracingColisDetaille xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>${enseigne}</Enseigne>
      <Expedition>${shipmentNumber}</Expedition>
      <Langue>${language}</Langue>
      <Security>${security}</Security>
    </WSI2_TracingColisDetaille>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI2_TracingColisDetaille',
        },
        body: soapRequest,
    });

    if (!response.ok) {
        throw new Error(`Mondial Relay API error: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const result = parser.parse(xmlText);

    const soapBody = result['soap:Envelope']?.['soap:Body'];
    const apiResponse: TrackingResponse = soapBody?.WSI2_TracingColisDetailleResponse?.WSI2_TracingColisDetailleResult;

    const statusCode = apiResponse.STAT;
    if (!['0', '80', '81', '82', '83'].includes(statusCode)) {
        throw new Error(`Mondial Relay tracking error ${statusCode}`);
    }

    const events = apiResponse.Tracing?.ret_WSI2_TracingColisDetaille || [];
    return {
        status: getStatusFromCode(statusCode),
        pointRelaisName: apiResponse.Relais_Libelle,
        pointRelaisId: apiResponse.Relais_Num,
        events: Array.isArray(events)
            ? events.map(formatEvent)
            : events ? [formatEvent(events)] : [],
    };
}

function formatEvent(event: TrackingEvent) {
    return {
        description: event.Tracing_Libelle,
        date: event.Tracing_Date,
        time: event.Tracing_Heure,
        location: event.Tracing_Lieu,
        pointRelaisId: event.Tracing_Relais,
        country: event.Tracing_Pays,
    };
}

function getStatusFromCode(code: string): string {
    const map: Record<string, string> = {
        '0': 'Opération effectuée avec succès',
        '80': 'Colis enregistré',
        '81': 'Colis en traitement chez Mondial Relay',
        '82': 'Colis livré',
        '83': 'Anomalie',
    };
    return map[code] || 'Statut inconnu';
}
