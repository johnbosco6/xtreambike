/**
 * Mondial Relay API Test — verifies the rewritten integration works
 * Run: npx tsx scripts/test-mondial-relay-api.ts
 */
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

function md5(input: string): string {
    return crypto.createHash('md5').update(input, 'utf8').digest('hex').toUpperCase();
}

async function testSearch(enseigne: string, privateKey: string, cp: string, pays: string) {
    console.log(`\nTesting: Enseigne=${enseigne}, CP=${cp}, Pays=${pays}`);

    // Hash order: [Enseigne][Pays][NumPointRelais][CP][Latitude][Longitude][Taille][Poids][Action][DelaiEnvoi][RayonRecherche][NombreResultats][PrivateKey]
    const hashInput = `${enseigne}${pays}${cp}24R50${10}${privateKey}`;
    const security = md5(hashInput);
    console.log(`  Hash input: "${hashInput}"`);
    console.log(`  Security: ${security}`);

    const soapXml = `<?xml version="1.0" encoding="utf-8"?>
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
      <Action>24R</Action>
      <DelaiEnvoi></DelaiEnvoi>
      <RayonRecherche>50</RayonRecherche>
      <TypeActivite></TypeActivite>
      <NACE></NACE>
      <NombreResultats>10</NombreResultats>
      <Security>${security}</Security>
    </WSI4_PointRelais_Recherche>
  </soap:Body>
</soap:Envelope>`;

    const response = await fetch('https://api.mondialrelay.com/Web_Services.asmx', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche',
        },
        body: soapXml,
    });

    const text = await response.text();
    const statMatch = text.match(/<STAT>(\d+)<\/STAT>/);
    const stat = statMatch ? statMatch[1] : 'NOT FOUND';
    const pointMatches = text.match(/<PointRelais_Details>/g);
    const count = pointMatches ? pointMatches.length : 0;
    const nameMatch = text.match(/<LgAdr1>(.*?)<\/LgAdr1>/);

    if (stat === '0') {
        console.log(`  ✅ SUCCESS — ${count} Point Relais found`);
        if (nameMatch) console.log(`  First: ${nameMatch[1]}`);
    } else {
        console.log(`  ❌ FAILED — STAT=${stat}`);
    }
}

async function main() {
    console.log('🔍 Mondial Relay API Test\n');

    // Test with official test credentials
    await testSearch('BDTEST13', 'TestAPI1key', '75009', 'FR');

    // Test with production credentials from env
    const enseigne = process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE;
    const key = process.env.MONDIAL_RELAY_API1_PRIVATE_KEY;

    if (enseigne && key) {
        await testSearch(enseigne, key, '59000', 'FR');
        await testSearch(enseigne, key, '75009', 'FR');
    } else {
        console.log('\n⚠️  No production credentials in .env.local');
    }

    console.log('\n✅ Done.');
}

main();
