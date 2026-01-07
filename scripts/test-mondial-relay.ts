// @ts-nocheck
require('dotenv').config({ path: '.env.local' });
const { searchPointRelais } = require('../lib/mondial-relay/services/point-relais-search');

// Mock config to avoid loading problematic modules
const { registerHelper } = require('handlebars'); // dummy require
const getMondialRelayConfig = async () => ({
    api1: {
        url: process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_URL || 'https://api.mondialrelay.com/Web_Services.asmx',
        enseigne: process.env.NEXT_PUBLIC_MONDIAL_RELAY_API1_ENSEIGNE,
        privateKey: process.env.MONDIAL_RELAY_API1_PRIVATE_KEY
    },
    defaults: { searchRadius: 50, maxResults: 20, defaultCountry: 'FR', defaultLanguage: 'FR' }
});

// Since the service file imports config, we need to handle that. 
// However, since we are using CommonJS require above, and the service file is likely TS/ESM source...
// Wait, 'searchPointRelais' is imported via require. If the service file is TS source, we can't require it directly in node without ts-node transpling AND resolving imports.
// The previous error was 'api-keys' module not found.
// The simpler fix is to disable the import in the service file via mock or just fix the path?
// 'api-keys' maps to 'lib/api-keys.ts'. ts-node should handle it.
// The error says "ERR_MODULE_NOT_FOUND" for "lib/api-keys".
// It might be because of mixed import/require usage or no extension.

// Let's use the PREVIOUS working standalone script style but with the searchPointRelais FUNCTION copied or imported?
// No, copying is robust.


async function testMondialRelay() {
    console.log('Testing Mondial Relay API...');

    try {
        const config = await getMondialRelayConfig();
        console.log('Using API URL:', config.api1.url);
        console.log('Enseigne:', config.api1.enseigne);

        console.log('\n--- Test 1: 75009 in PL (User Report) ---');
        try {
            const pointsPL = await searchPointRelais({
                postalCode: '75009',
                country: 'PL',
                deliveryMode: '24R',
                maxResults: 3
            });
            console.log(`Found ${pointsPL.length} points in PL.`);
        } catch (e) {
            console.log('Error searching PL:', e.message);
        }

        console.log('\n--- Test 2: 75009 in FR (Control) ---');
        try {
            const pointsFR = await searchPointRelais({
                postalCode: '75009',
                country: 'FR',
                deliveryMode: '24R',
                maxResults: 3
            });
            console.log(`Found ${pointsFR.length} points in FR.`);
            pointsFR.forEach((p: any) => console.log(`- ${p.name} (${p.city})`));
        } catch (e) {
            console.log('Error searching FR:', e.message);
        }

    } catch (error) {
        console.error('\nAPI Error:', error);
    }
}

testMondialRelay();
