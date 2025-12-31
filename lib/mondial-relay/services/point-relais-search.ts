import { XMLParser } from 'fast-xml-parser';
import { MONDIAL_RELAY_CONFIG } from '../config';
import { generatePointRelaisSearchSecurityKey } from '../security';
import type {
    PointRelaisSearchParams,
    PointRelaisSearchResponse,
    FormattedPointRelais,
    PointRelais,
} from '../types';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
});

/**
 * Search for Point Relais® using Mondial Relay API1
 * Method: WSI4_PointRelais_Recherche
 */
export async function searchPointRelais(params: {
    postalCode?: string;
    country: string;
    latitude?: number;
    longitude?: number;
    deliveryMode?: '24R' | '24L' | 'XOH';
    searchRadius?: number;
    maxResults?: number;
    pointRelaisId?: string;
}): Promise<FormattedPointRelais[]> {
    const {
        postalCode,
        country,
        latitude,
        longitude,
        deliveryMode = '24R',
        searchRadius = MONDIAL_RELAY_CONFIG.defaults.searchRadius,
        maxResults = MONDIAL_RELAY_CONFIG.defaults.maxResults,
        pointRelaisId,
    } = params;

    // Validate inputs
    if (!postalCode && !latitude && !longitude && !pointRelaisId) {
        throw new Error('Either postalCode, GPS coordinates, or pointRelaisId must be provided');
    }

    const enseigne = MONDIAL_RELAY_CONFIG.api1.enseigne;
    const privateKey = MONDIAL_RELAY_CONFIG.api1.privateKey;

    // Format parameters
    const searchParams: Partial<PointRelaisSearchParams> = {
        Pays: country,
        NombreResultats: Math.min(maxResults, 30),
    };

    if (pointRelaisId) {
        searchParams.NumPointRelais = pointRelaisId;
    }

    if (postalCode) {
        searchParams.CP = postalCode;
    }

    if (latitude !== undefined && longitude !== undefined) {
        searchParams.Latitude = formatGPSCoordinate(latitude);
        searchParams.Longitude = formatGPSCoordinate(longitude);
    }

    searchParams.Action = deliveryMode;
    searchParams.RayonRecherche = searchRadius;

    // Generate security key
    const security = generatePointRelaisSearchSecurityKey({
        enseigne,
        pays: country,
        numPointRelais: searchParams.NumPointRelais,
        cp: searchParams.CP,
        latitude: searchParams.Latitude,
        longitude: searchParams.Longitude,
        taille: searchParams.Taille,
        poids: searchParams.Poids?.toString(),
        action: searchParams.Action,
        delaiEnvoi: searchParams.DelaiEnvoi?.toString(),
        rayonRecherche: searchParams.RayonRecherche?.toString(),
        nombreResultats: searchParams.NombreResultats.toString(),
        privateKey,
    });

    // Build SOAP request
    const soapRequest = buildPointRelaisSearchSOAP({
        ...searchParams,
        Enseigne: enseigne,
        Security: security,
    });

    // Make API call
    const response = await fetch(MONDIAL_RELAY_CONFIG.api1.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche',
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
    const apiResponse: PointRelaisSearchResponse = soapBody?.WSI4_PointRelais_RechercheResponse?.WSI4_PointRelais_RechercheResult;

    // Check status
    if (apiResponse.STAT !== '0') {
        throw new Error(`Mondial Relay error code ${apiResponse.STAT}: ${getErrorMessage(apiResponse.STAT)}`);
    }

    // Format and return results
    const pointsRelais = apiResponse.PointsRelais?.PointRelais_Details || [];
    return Array.isArray(pointsRelais)
        ? pointsRelais.map(formatPointRelais)
        : [formatPointRelais(pointsRelais)];
}

/**
 * Build SOAP XML request for Point Relais search
 */
function buildPointRelaisSearchSOAP(params: any): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>${params.Enseigne}</Enseigne>
      <Pays>${params.Pays}</Pays>
      <NumPointRelais>${params.NumPointRelais || ''}</NumPointRelais>
      <Ville></Ville>
      <CP>${params.CP || ''}</CP>
      <Latitude>${params.Latitude || ''}</Latitude>
      <Longitude>${params.Longitude || ''}</Longitude>
      <Taille>${params.Taille || ''}</Taille>
      <Poids>${params.Poids || ''}</Poids>
      <Action>${params.Action || ''}</Action>
      <DelaiEnvoi>${params.DelaiEnvoi || ''}</DelaiEnvoi>
      <RayonRecherche>${params.RayonRecherche || ''}</RayonRecherche>
      <TypeActivite></TypeActivite>
      <NACE></NACE>
      <NombreResultats>${params.NombreResultats}</NombreResultats>
      <Security>${params.Security}</Security>
    </WSI4_PointRelais_Recherche>
  </soap:Body>
</soap:Envelope>`;
}

/**
 * Format Point Relais data for frontend consumption
 */
function formatPointRelais(pr: PointRelais): FormattedPointRelais {
    return {
        id: pr.Num,
        name: `${pr.LgAdr1} ${pr.LgAdr2}`.trim(),
        address: `${pr.LgAdr3} ${pr.LgAdr4}`.trim(),
        postalCode: pr.CP,
        city: pr.Ville,
        country: pr.Pays,
        distance: pr.Distance,
        latitude: pr.Latitude,
        longitude: pr.Longitude,
        openingHours: {
            monday: pr.Horaires_Lundi?.string || [],
            tuesday: pr.Horaires_Mardi?.string || [],
            wednesday: pr.Horaires_Mercredi?.string || [],
            thursday: pr.Horaires_Jeudi?.string || [],
            friday: pr.Horaires_Vendredi?.string || [],
            saturday: pr.Horaires_Samedi?.string || [],
            sunday: pr.Horaires_Dimanche?.string || [],
        },
        photoUrl: pr.URL_Photo,
        mapUrl: pr.URL_Plan,
        unavailabilityPeriods: pr.Informations_Dispo?.map(info => ({
            start: info.Debut,
            end: info.Fin,
        })),
    };
}

/**
 * Format GPS coordinate to Mondial Relay format
 */
function formatGPSCoordinate(coordinate: number): string {
    const formatted = coordinate.toFixed(7);
    return formatted.padStart(11, '0');
}

/**
 * Get error message from error code
 */
function getErrorMessage(code: string): string {
    const errorMessages: Record<string, string> = {
        '1': 'Enseigne invalide',
        '8': 'Mot de passe ou hachage invalide',
        '16': 'Code pays invalide',
        '19': 'Code postal invalide',
        '49': 'Action invalide',
        '67': 'Latitude invalide',
        '68': 'Longitude invalide',
        '70': 'Numéro de Point Relais invalide',
        '97': 'Clé de sécurité invalide',
        '98': 'Erreur générique (Paramètres invalides)',
        '99': 'Erreur générique du service',
    };

    return errorMessages[code] || `Unknown error code: ${code}`;
}
