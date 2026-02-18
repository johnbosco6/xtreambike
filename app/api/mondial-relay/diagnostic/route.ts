import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

/**
 * Diagnostic endpoint — tests Mondial Relay directly from production
 * GET /api/mondial-relay/diagnostic
 */
export async function GET(request: NextRequest) {
    const results: Record<string, any> = {};

    // 1. Check env vars
    const enseigne = process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE || '';
    const privateKey = process.env.MONDIAL_RELAY_API1_PRIVATE_KEY || '';
    const apiUrl = process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_URL || 'https://api.mondialrelay.com/Web_Services.asmx';

    results.envVars = {
        enseigne: enseigne || 'MISSING',
        privateKey: privateKey ? '****' + privateKey.slice(-2) : 'MISSING',
        apiUrl,
    };

    // 2. Direct API test
    const cp = '59000';
    const pays = 'FR';
    const nombreResultats = '5';
    const action = '24R';
    const rayonRecherche = '50';

    const hashInput = `${enseigne}${pays}${cp}${action}${rayonRecherche}${nombreResultats}${privateKey}`;
    const security = crypto.createHash('md5').update(hashInput, 'utf8').digest('hex').toUpperCase();

    results.hash = { input: hashInput, output: security };

    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>${enseigne}</Enseigne>
      <Pays>${pays}</Pays>
      <NumPointRelais></NumPointRelais>
      <Ville></Ville>
      <CP>${cp}</CP>
      <Latitude></Latitude>
      <Longitude></Longitude>
      <Taille></Taille>
      <Poids></Poids>
      <Action>${action}</Action>
      <DelaiEnvoi></DelaiEnvoi>
      <RayonRecherche>${rayonRecherche}</RayonRecherche>
      <TypeActivite></TypeActivite>
      <NACE></NACE>
      <NombreResultats>${nombreResultats}</NombreResultats>
      <Security>${security}</Security>
    </WSI4_PointRelais_Recherche>
  </soap:Body>
</soap:Envelope>`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche',
            },
            body: soapBody,
        });

        const xmlText = await response.text();
        const statMatch = xmlText.match(/<STAT>(\d+)<\/STAT>/);
        const stat = statMatch ? statMatch[1] : 'NOT FOUND';
        const pointMatches = xmlText.match(/<PointRelais_Details>/g);
        const nameMatch = xmlText.match(/<LgAdr1>(.*?)<\/LgAdr1>/);

        results.apiTest = {
            httpStatus: response.status,
            stat,
            pointCount: pointMatches ? pointMatches.length : 0,
            firstResult: nameMatch ? nameMatch[1] : 'none',
        };
    } catch (error) {
        results.apiTest = { error: String(error) };
    }

    return NextResponse.json(results);
}
