/**
 * Mondial Relay Point Relais Search Service
 * Uses WSI4_PointRelais_Recherche SOAP API
 */
import { XMLParser } from 'fast-xml-parser';
import { getMondialRelayCredentials, MONDIAL_RELAY_API_URL } from '../config';
import { generateSearchSecurityKey } from '../security';
import type { FormattedPointRelais } from '../types';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
});

export interface SearchOptions {
    postalCode?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    deliveryMode?: string;
    searchRadius?: number;
    maxResults?: number;
    pointRelaisId?: string;
}

/**
 * Search for Mondial Relay Point Relais
 */
export async function searchPointRelais(options: SearchOptions): Promise<FormattedPointRelais[]> {
    const { enseigne, privateKey, apiUrl } = getMondialRelayCredentials();

    if (!enseigne || !privateKey) {
        throw new Error('Mondial Relay API credentials are not configured. Set NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE and MONDIAL_RELAY_API1_PRIVATE_KEY in environment variables.');
    }

    const {
        postalCode = '',
        country = 'FR',
        latitude,
        longitude,
        deliveryMode = '24R',
        searchRadius = 50,
        maxResults = 20,
        pointRelaisId = '',
    } = options;

    // Format GPS coordinates if provided
    const lat = latitude !== undefined ? latitude.toFixed(6).replace('.', ',') : '';
    const lon = longitude !== undefined ? longitude.toFixed(6).replace('.', ',') : '';

    // All values used in the hash (as strings, matching SOAP XML values)
    const hashParams = {
        enseigne,
        pays: country,
        numPointRelais: pointRelaisId,
        cp: postalCode,
        latitude: lat,
        longitude: lon,
        taille: '',
        poids: '',
        action: deliveryMode,
        delaiEnvoi: '',
        rayonRecherche: String(searchRadius),
        nombreResultats: String(Math.min(maxResults, 30)),
        privateKey,
    };

    const security = generateSearchSecurityKey(hashParams);

    // Build SOAP XML
    const soapXml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>${enseigne}</Enseigne>
      <Pays>${country}</Pays>
      <NumPointRelais>${pointRelaisId}</NumPointRelais>
      <Ville></Ville>
      <CP>${postalCode}</CP>
      <Latitude>${lat}</Latitude>
      <Longitude>${lon}</Longitude>
      <Taille></Taille>
      <Poids></Poids>
      <Action>${deliveryMode}</Action>
      <DelaiEnvoi></DelaiEnvoi>
      <RayonRecherche>${searchRadius}</RayonRecherche>
      <TypeActivite></TypeActivite>
      <NACE></NACE>
      <NombreResultats>${Math.min(maxResults, 30)}</NombreResultats>
      <Security>${security}</Security>
    </WSI4_PointRelais_Recherche>
  </soap:Body>
</soap:Envelope>`;

    console.log(`[MondialRelay] Searching: CP=${postalCode}, Pays=${country}, Action=${deliveryMode}, Rayon=${searchRadius}`);
    console.log(`[MondialRelay] API URL: ${apiUrl}`);

    // Make the SOAP call
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche',
        },
        body: soapXml,
    });

    if (!response.ok) {
        throw new Error(`Mondial Relay HTTP error: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();

    // Quick regex extraction for STAT (more reliable than XML parser for SOAP)
    const statMatch = xmlText.match(/<STAT>(\d+)<\/STAT>/);
    const stat = statMatch ? statMatch[1] : 'UNKNOWN';

    console.log(`[MondialRelay] Response STAT: ${stat}`);

    if (stat !== '0') {
        const errorMsg = getErrorMessage(stat);
        console.error(`[MondialRelay] ❌ API Error: STAT=${stat} — ${errorMsg}`);
        throw new Error(`Mondial Relay error ${stat}: ${errorMsg}`);
    }

    // Parse the full XML response
    const parsed = parser.parse(xmlText);
    const soapBody = parsed?.['soap:Envelope']?.['soap:Body'];
    const apiResult = soapBody?.WSI4_PointRelais_RechercheResponse?.WSI4_PointRelais_RechercheResult;

    if (!apiResult?.PointsRelais) {
        console.log('[MondialRelay] No PointsRelais in response');
        return [];
    }

    const rawPoints = apiResult.PointsRelais.PointRelais_Details;
    if (!rawPoints) {
        return [];
    }

    // Ensure it's always an array (single result comes as object)
    const pointsArray = Array.isArray(rawPoints) ? rawPoints : [rawPoints];

    const formatted = pointsArray.map((pr: any): FormattedPointRelais => ({
        id: String(pr.Num || ''),
        name: `${pr.LgAdr1 || ''} ${pr.LgAdr2 || ''}`.trim(),
        address: `${pr.LgAdr3 || ''} ${pr.LgAdr4 || ''}`.trim(),
        postalCode: String(pr.CP || ''),
        city: String(pr.Ville || ''),
        country: String(pr.Pays || ''),
        distance: String(pr.Distance || ''),
        latitude: String(pr.Latitude || ''),
        longitude: String(pr.Longitude || ''),
        openingHours: {
            monday: pr.Horaires_Lundi?.string || [],
            tuesday: pr.Horaires_Mardi?.string || [],
            wednesday: pr.Horaires_Mercredi?.string || [],
            thursday: pr.Horaires_Jeudi?.string || [],
            friday: pr.Horaires_Vendredi?.string || [],
            saturday: pr.Horaires_Samedi?.string || [],
            sunday: pr.Horaires_Dimanche?.string || [],
        },
        photoUrl: pr.URL_Photo || '',
        mapUrl: pr.URL_Plan || '',
    }));

    console.log(`[MondialRelay] ✅ Found ${formatted.length} Point Relais`);
    return formatted;
}

function getErrorMessage(code: string): string {
    const errors: Record<string, string> = {
        '1': 'Enseigne invalide',
        '2': 'Numéro d\'enseigne vide',
        '8': 'Mot de passe ou hash invalide',
        '9': 'Ville non trouvée',
        '16': 'Code pays invalide',
        '19': 'Code postal invalide',
        '24': 'Numéro de Point Relais invalide',
        '49': 'Action invalide (mode de livraison)',
        '65': 'Rayon de recherche invalide',
        '67': 'Latitude invalide',
        '68': 'Longitude invalide',
        '97': 'Clé de sécurité invalide (hash MD5 incorrect)',
        '98': 'Erreur interne (paramètres invalides)',
        '99': 'Erreur serveur Mondial Relay',
    };
    return errors[code] || `Erreur inconnue (code ${code})`;
}
