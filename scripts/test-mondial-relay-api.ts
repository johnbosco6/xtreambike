/**
 * Standalone Mondial Relay API1 Test Script
 * Tests Point Relais search with both test and production credentials.
 * 
 * Run with: npx tsx scripts/test-mondial-relay-api.ts
 */
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

function md5Hash(data: string): string {
    return crypto.createHash('md5').update(data, 'utf8').digest('hex').toUpperCase();
}

function generateSecurityKey(params: {
    enseigne: string;
    pays: string;
    numPointRelais: string;
    cp: string;
    latitude: string;
    longitude: string;
    taille: string;
    poids: string;
    action: string;
    delaiEnvoi: string;
    rayonRecherche: string;
    nombreResultats: string;
    privateKey: string;
}): string {
    // Hash order per official docs:
    // [Enseigne][Pays][NumPointRelais][CP][Latitude][Longitude][Taille][Poids][Action][DelaiEnvoi][RayonRecherche][NombreResultats][CLE PRIVEE]
    const concatenated = [
        params.enseigne,
        params.pays,
        params.numPointRelais,
        params.cp,
        params.latitude,
        params.longitude,
        params.taille,
        params.poids,
        params.action,
        params.delaiEnvoi,
        params.rayonRecherche,
        params.nombreResultats,
        params.privateKey,
    ].join('');

    console.log('  Hash input:', JSON.stringify(concatenated));
    return md5Hash(concatenated);
}

function buildSOAP(params: Record<string, string>): string {
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

async function testSearch(label: string, enseigne: string, privateKey: string, cp: string, pays: string) {
    console.log(`\n=== ${label} ===`);
    console.log(`  Enseigne: ${enseigne}`);
    console.log(`  CP: ${cp}, Pays: ${pays}`);

    const security = generateSecurityKey({
        enseigne,
        pays,
        numPointRelais: '',
        cp,
        latitude: '',
        longitude: '',
        taille: '',
        poids: '',
        action: '',
        delaiEnvoi: '',
        rayonRecherche: '',
        nombreResultats: '10',
        privateKey,
    });

    console.log('  Security hash:', security);

    const soapBody = buildSOAP({
        Enseigne: enseigne,
        Pays: pays,
        CP: cp,
        NombreResultats: '10',
        Security: security,
    });

    try {
        const response = await fetch('https://api.mondialrelay.com/Web_Services.asmx', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche',
            },
            body: soapBody,
        });

        const text = await response.text();

        // Extract STAT from response
        const statMatch = text.match(/<STAT>(\d+)<\/STAT>/);
        const stat = statMatch ? statMatch[1] : 'NOT FOUND';

        console.log(`  Response STAT: ${stat}`);

        if (stat === '0') {
            // Count results
            const pointMatches = text.match(/<PointRelais_Details>/g);
            const count = pointMatches ? pointMatches.length : 0;
            console.log(`  ✅ SUCCESS - Found ${count} Point Relais`);

            // Extract first point name
            const nameMatch = text.match(/<LgAdr1>(.*?)<\/LgAdr1>/);
            if (nameMatch) {
                console.log(`  First result: ${nameMatch[1]}`);
            }
        } else {
            const errorMessages: Record<string, string> = {
                '1': 'Enseigne invalide',
                '2': 'Numéro d\'enseigne vide',
                '8': 'Hash invalide',
                '97': 'Clé de sécurité invalide',
                '98': 'Erreur générique (mode production)',
                '99': 'Erreur serveur',
            };
            console.log(`  ❌ FAILED - ${errorMessages[stat] || `Unknown error ${stat}`}`);
        }
    } catch (error) {
        console.log(`  ❌ Network error:`, error);
    }
}

async function main() {
    console.log('🔍 Mondial Relay API1 Diagnostic Test\n');

    // Test 1: Official test credentials from documentation
    console.log('--- TEST CREDENTIALS (from official docs) ---');
    await testSearch('Test: BDTEST13 / Paris 75009', 'BDTEST13', 'TestAPI1key', '75009', 'FR');

    // Test 2: Production credentials from .env.local
    const prodEnseigne = process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE;
    const prodKey = process.env.MONDIAL_RELAY_API1_PRIVATE_KEY;

    if (prodEnseigne && prodKey) {
        console.log('\n--- PRODUCTION CREDENTIALS ---');
        await testSearch(`Prod: ${prodEnseigne} / Lille 59000`, prodEnseigne, prodKey, '59000', 'FR');
        await testSearch(`Prod: ${prodEnseigne} / Paris 75009`, prodEnseigne, prodKey, '75009', 'FR');
    } else {
        console.log('\n⚠️  No production credentials found in .env.local');
        console.log('   Expected: NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE and MONDIAL_RELAY_API1_PRIVATE_KEY');
    }

    console.log('\n✅ Diagnostic complete.');
}

main();
