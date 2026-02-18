import { NextRequest, NextResponse } from 'next/server';
import { getMondialRelayConfig } from '@/lib/mondial-relay/config';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

/**
 * Diagnostic endpoint to test Mondial Relay API directly
 * GET /api/mondial-relay/diagnostic
 */
export async function GET(request: NextRequest) {
    const results: Record<string, any> = {};

    // Step 1: Check environment variables
    results.envVars = {
        NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE: process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE ? 'SET (' + process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE + ')' : 'MISSING',
        MONDIAL_RELAY_API1_PRIVATE_KEY: process.env.MONDIAL_RELAY_API1_PRIVATE_KEY ? 'SET (****' + process.env.MONDIAL_RELAY_API1_PRIVATE_KEY.slice(-2) + ')' : 'MISSING',
        NEXT_PUBLIC_MONDIAL_RELAY_API1_URL: process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_URL || 'NOT SET (will use default)',
        NEXT_PUBLIC_MONDIAL_RELAY_API1_MARQUE: process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_MARQUE || 'NOT SET',
    };

    // Step 2: Get resolved config
    try {
        const config = await getMondialRelayConfig();
        results.resolvedConfig = {
            url: config.api1.url,
            enseigne: config.api1.enseigne || 'EMPTY',
            privateKeyLength: config.api1.privateKey?.length || 0,
            privateKeyPreview: config.api1.privateKey ? '****' + config.api1.privateKey.slice(-2) : 'EMPTY',
        };
    } catch (error) {
        results.resolvedConfig = { error: String(error) };
    }

    // Step 3: Direct API test (bypass all service code)
    try {
        const enseigne = process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE || '';
        const privateKey = process.env.MONDIAL_RELAY_API1_PRIVATE_KEY || '';
        const cp = '59000';
        const pays = 'FR';
        const nombreResultats = '5';

        // Generate hash directly
        const hashInput = `${enseigne}${pays}${cp}24R50${nombreResultats}${privateKey}`;
        const security = crypto.createHash('md5').update(hashInput, 'utf8').digest('hex').toUpperCase();

        results.directTest = {
            hashInput,
            security,
            enseigne,
            cp,
            pays,
        };

        const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
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
      <Action>24R</Action>
      <DelaiEnvoi></DelaiEnvoi>
      <RayonRecherche>50</RayonRecherche>
      <TypeActivite></TypeActivite>
      <NACE></NACE>
      <NombreResultats>${nombreResultats}</NombreResultats>
      <Security>${security}</Security>
    </WSI4_PointRelais_Recherche>
  </soap:Body>
</soap:Envelope>`;

        const apiUrl = process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_URL || 'https://api.mondialrelay.com/Web_Services.asmx';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche',
            },
            body: soapBody,
        });

        const xmlText = await response.text();

        // Extract STAT
        const statMatch = xmlText.match(/<STAT>(\d+)<\/STAT>/);
        const stat = statMatch ? statMatch[1] : 'NOT FOUND';

        // Count results
        const pointMatches = xmlText.match(/<PointRelais_Details>/g);
        const count = pointMatches ? pointMatches.length : 0;

        // Get first result name
        const nameMatch = xmlText.match(/<LgAdr1>(.*?)<\/LgAdr1>/);

        results.directApiTest = {
            apiUrl,
            httpStatus: response.status,
            stat,
            pointCount: count,
            firstResult: nameMatch ? nameMatch[1] : 'none',
            rawResponseLength: xmlText.length,
            rawResponsePreview: xmlText.substring(0, 500),
        };
    } catch (error) {
        results.directApiTest = { error: String(error) };
    }

    return NextResponse.json(results, { status: 200 });
}
