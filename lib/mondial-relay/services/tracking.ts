import { XMLParser } from 'fast-xml-parser';
import { MONDIAL_RELAY_CONFIG } from '../config';
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
 * Method: WSI2_TracingColisDetaille
 */
export async function getTracking(params: {
    shipmentNumber: string;
    language?: string;
}): Promise<FormattedTrackingData> {
    const { shipmentNumber, language = 'FR' } = params;

    // Validate shipment number (8 digits)
    if (!/^[0-9]{8}$/.test(shipmentNumber)) {
        throw new Error('Invalid shipment number format. Must be 8 digits.');
    }

    const enseigne = MONDIAL_RELAY_CONFIG.api1.enseigne;
    const privateKey = MONDIAL_RELAY_CONFIG.api1.privateKey;

    // Generate security key
    const security = generateTrackingSecurityKey({
        enseigne,
        expedition: shipmentNumber,
        langue: language,
        privateKey,
    });

    // Build SOAP request
    const soapRequest = buildTrackingSOAP({
        Enseigne: enseigne,
        Expedition: shipmentNumber,
        Langue: language,
        Security: security,
    });

    // Make API call
    const response = await fetch(MONDIAL_RELAY_CONFIG.api1.url, {
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

    // Extract response from SOAP envelope
    const soapBody = result['soap:Envelope']?.['soap:Body'];
    const apiResponse: TrackingResponse = soapBody?.WSI2_TracingColisDetailleResponse?.WSI2_TracingColisDetailleResult;

    // Check status
    const statusCode = apiResponse.STAT;
    if (!['0', '80', '81', '82', '83'].includes(statusCode)) {
        throw new Error(`Mondial Relay error code ${statusCode}: ${getErrorMessage(statusCode)}`);
    }

    // Format and return tracking data
    return formatTrackingData(apiResponse);
}

/**
 * Build SOAP XML request for tracking
 */
function buildTrackingSOAP(params: {
    Enseigne: string;
    Expedition: string;
    Langue: string;
    Security: string;
}): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <WSI2_TracingColisDetaille xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>${params.Enseigne}</Enseigne>
      <Expedition>${params.Expedition}</Expedition>
      <Langue>${params.Langue}</Langue>
      <Security>${params.Security}</Security>
    </WSI2_TracingColisDetaille>
  </soap:Body>
</soap:Envelope>`;
}

/**
 * Format tracking data for frontend consumption
 */
function formatTrackingData(response: TrackingResponse): FormattedTrackingData {
    const events = response.Tracing?.ret_WSI2_TracingColisDetaille || [];

    return {
        status: getStatusFromCode(response.STAT),
        pointRelaisName: response.Relais_Libelle,
        pointRelaisId: response.Relais_Num,
        events: Array.isArray(events)
            ? events.map(formatTrackingEvent)
            : events
                ? [formatTrackingEvent(events)]
                : [],
    };
}

/**
 * Format individual tracking event
 */
function formatTrackingEvent(event: TrackingEvent) {
    return {
        description: event.Tracing_Libelle,
        date: event.Tracing_Date,
        time: event.Tracing_Heure,
        location: event.Tracing_Lieu,
        pointRelaisId: event.Tracing_Relais,
        country: event.Tracing_Pays,
    };
}

/**
 * Get status description from status code
 */
function getStatusFromCode(code: string): string {
    const statusMap: Record<string, string> = {
        '0': 'Opération effectuée avec succès',
        '80': 'Colis enregistré',
        '81': 'Colis en traitement chez Mondial Relay',
        '82': 'Colis livré',
        '83': 'Anomalie',
    };

    return statusMap[code] || 'Statut inconnu';
}

/**
 * Get error message from error code
 */
function getErrorMessage(code: string): string {
    const errorMessages: Record<string, string> = {
        '1': 'Enseigne invalide',
        '8': 'Mot de passe ou hachage invalide',
        '24': 'Numéro d\'expédition ou de suivi invalide',
        '74': 'Langue invalide',
        '94': 'Colis Inexistant',
        '97': 'Clé de sécurité invalide',
        '98': 'Erreur générique (Paramètres invalides)',
        '99': 'Erreur générique du service',
    };

    return errorMessages[code] || `Unknown error code: ${code}`;
}
