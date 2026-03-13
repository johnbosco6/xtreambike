/**
 * Mondial Relay Shipment Creation Service
 * Uses WSI2_CreationEtiquette SOAP API to create shipments
 * and generate shipping labels.
 */
import { XMLParser } from 'fast-xml-parser';
import { getMondialRelayCredentials, MONDIAL_RELAY_API_URL } from '../config';
import { generateCreationSecurityKey } from '../security';
import { MONDIAL_RELAY_ERROR_CODES } from '../types';
import type { ShipmentCreationParams, ShipmentCreationResponse } from '../types';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
});

// ============================================
// Sender Details (X-Trem Grip)
// ============================================
const SENDER = {
    langage: 'FR',
    ad1: 'X-Trem Grip',
    ad2: 'Jordan Deschamps',
    ad3: '3 rue de la villa bleue',
    ad4: '',
    ville: 'Galan',
    cp: '65330',
    pays: 'FR',
    tel1: '0787106822',
    tel2: '',
    mail: 'xtremgrip@gmail.com',
} as const;

/**
 * Create a Mondial Relay shipment and generate a shipping label.
 *
 * This calls the WSI2_CreationEtiquette SOAP API which:
 * 1. Registers the shipment in the Mondial Relay system (visible in dashboard)
 * 2. Generates a PDF shipping label
 * 3. Returns an expedition number for tracking
 */
export async function createShipment(
    params: ShipmentCreationParams
): Promise<ShipmentCreationResponse> {
    const { enseigne, privateKey, apiUrl } = getMondialRelayCredentials();

    if (!enseigne || !privateKey) {
        throw new Error(
            'Mondial Relay API credentials are not configured. ' +
            'Set NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE and MONDIAL_RELAY_API1_PRIVATE_KEY.'
        );
    }

    const {
        recipientName,
        recipientAddress,
        recipientCity,
        recipientPostalCode,
        recipientCountry = 'FR',
        recipientPhone,
        recipientEmail,
        relayPointId,
        orderNumber,
        weight = 200,
        deliveryMode = '24R',
        instructions = '',
    } = params;

    // Format phone number: remove +33 prefix and replace with 0
    const formattedPhone = recipientPhone
        .replace(/\s+/g, '')
        .replace(/^\+33/, '0');

    // Build all parameters for hash calculation (must match XML order exactly)
    const hashParams = {
        enseigne,
        modeCol: 'REL',
        modeLiv: deliveryMode,
        nDossier: orderNumber.substring(0, 15), // max 15 chars
        nClient: '',
        expe_Langage: SENDER.langage,
        expe_Ad1: SENDER.ad1,
        expe_Ad2: SENDER.ad2,
        expe_Ad3: SENDER.ad3,
        expe_Ad4: SENDER.ad4,
        expe_Ville: SENDER.ville,
        expe_CP: SENDER.cp,
        expe_Pays: SENDER.pays,
        expe_Tel1: SENDER.tel1,
        expe_Tel2: SENDER.tel2,
        expe_Mail: SENDER.mail,
        dest_Langage: 'FR',
        dest_Ad1: recipientName.substring(0, 32),
        dest_Ad2: '',
        dest_Ad3: recipientAddress.substring(0, 32),
        dest_Ad4: '',
        dest_Ville: recipientCity,
        dest_CP: recipientPostalCode,
        dest_Pays: recipientCountry,
        dest_Tel1: formattedPhone,
        dest_Tel2: '',
        dest_Mail: recipientEmail,
        poids: String(weight),
        longueur: '',
        taille: '',
        nbColis: '1',
        crt_Valeur: '0',
        crt_Devise: 'EUR',
        exp_Valeur: '0',
        exp_Devise: 'EUR',
        col_Rel_Pays: '',
        col_Rel: '',
        liv_Rel_Pays: recipientCountry,
        liv_Rel: relayPointId,
        tAvisage: '',
        tReprise: '',
        montage: '',
        tRDV: '',
        assurance: '0',
        instructions: instructions.substring(0, 30),
        privateKey,
    };

    const security = generateCreationSecurityKey(hashParams);

    // Build the SOAP XML
    const soapXml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WSI2_CreationEtiquette xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>${hashParams.enseigne}</Enseigne>
      <ModeCol>${hashParams.modeCol}</ModeCol>
      <ModeLiv>${hashParams.modeLiv}</ModeLiv>
      <NDossier>${hashParams.nDossier}</NDossier>
      <NClient>${hashParams.nClient}</NClient>
      <Expe_Langage>${hashParams.expe_Langage}</Expe_Langage>
      <Expe_Ad1>${hashParams.expe_Ad1}</Expe_Ad1>
      <Expe_Ad2>${hashParams.expe_Ad2}</Expe_Ad2>
      <Expe_Ad3>${hashParams.expe_Ad3}</Expe_Ad3>
      <Expe_Ad4>${hashParams.expe_Ad4}</Expe_Ad4>
      <Expe_Ville>${hashParams.expe_Ville}</Expe_Ville>
      <Expe_CP>${hashParams.expe_CP}</Expe_CP>
      <Expe_Pays>${hashParams.expe_Pays}</Expe_Pays>
      <Expe_Tel1>${hashParams.expe_Tel1}</Expe_Tel1>
      <Expe_Tel2>${hashParams.expe_Tel2}</Expe_Tel2>
      <Expe_Mail>${hashParams.expe_Mail}</Expe_Mail>
      <Dest_Langage>${hashParams.dest_Langage}</Dest_Langage>
      <Dest_Ad1>${hashParams.dest_Ad1}</Dest_Ad1>
      <Dest_Ad2>${hashParams.dest_Ad2}</Dest_Ad2>
      <Dest_Ad3>${hashParams.dest_Ad3}</Dest_Ad3>
      <Dest_Ad4>${hashParams.dest_Ad4}</Dest_Ad4>
      <Dest_Ville>${hashParams.dest_Ville}</Dest_Ville>
      <Dest_CP>${hashParams.dest_CP}</Dest_CP>
      <Dest_Pays>${hashParams.dest_Pays}</Dest_Pays>
      <Dest_Tel1>${hashParams.dest_Tel1}</Dest_Tel1>
      <Dest_Tel2>${hashParams.dest_Tel2}</Dest_Tel2>
      <Dest_Mail>${hashParams.dest_Mail}</Dest_Mail>
      <Poids>${hashParams.poids}</Poids>
      <Longueur>${hashParams.longueur}</Longueur>
      <Taille>${hashParams.taille}</Taille>
      <NbColis>${hashParams.nbColis}</NbColis>
      <CRT_Valeur>${hashParams.crt_Valeur}</CRT_Valeur>
      <CRT_Devise>${hashParams.crt_Devise}</CRT_Devise>
      <Exp_Valeur>${hashParams.exp_Valeur}</Exp_Valeur>
      <Exp_Devise>${hashParams.exp_Devise}</Exp_Devise>
      <COL_Rel_Pays>${hashParams.col_Rel_Pays}</COL_Rel_Pays>
      <COL_Rel>${hashParams.col_Rel}</COL_Rel>
      <LIV_Rel_Pays>${hashParams.liv_Rel_Pays}</LIV_Rel_Pays>
      <LIV_Rel>${hashParams.liv_Rel}</LIV_Rel>
      <TAvisage>${hashParams.tAvisage}</TAvisage>
      <TReprise>${hashParams.tReprise}</TReprise>
      <Montage>${hashParams.montage}</Montage>
      <TRDV>${hashParams.tRDV}</TRDV>
      <Assurance>${hashParams.assurance}</Assurance>
      <Instructions>${hashParams.instructions}</Instructions>
      <Security>${security}</Security>
      <Texte></Texte>
    </WSI2_CreationEtiquette>
  </soap:Body>
</soap:Envelope>`;

    console.log(`[MondialRelay] Creating shipment for order ${orderNumber}, relay point ${relayPointId}`);

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI2_CreationEtiquette',
        },
        body: soapXml,
    });

    if (!response.ok) {
        throw new Error(`Mondial Relay HTTP error: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();

    // Extract STAT code
    const statMatch = xmlText.match(/<STAT>(\d+)<\/STAT>/);
    const stat = statMatch ? statMatch[1] : 'UNKNOWN';

    if (stat !== '0') {
        const errorMsg = MONDIAL_RELAY_ERROR_CODES[stat] || `Erreur inconnue (code ${stat})`;
        console.error(`[MondialRelay] ❌ Shipment creation failed: STAT=${stat} — ${errorMsg}`);
        throw new Error(`Mondial Relay shipment creation error ${stat}: ${errorMsg}`);
    }

    // Parse response for expedition number and label URL
    const parsed = parser.parse(xmlText);
    const soapBody = parsed?.['soap:Envelope']?.['soap:Body'];
    const result = soapBody?.WSI2_CreationEtiquetteResponse?.WSI2_CreationEtiquetteResult;

    const expeditionNum = String(result?.ExpeditionNum || '');
    const labelUrl = String(result?.URL_Etiquette || '');

    console.log(`[MondialRelay] ✅ Shipment created: ExpeditionNum=${expeditionNum}`);
    console.log(`[MondialRelay] 🏷️ Label URL: ${labelUrl}`);

    return {
        stat,
        expeditionNum,
        labelUrl: labelUrl.startsWith('http') ? labelUrl : `https://www.mondialrelay.com${labelUrl}`,
    };
}
