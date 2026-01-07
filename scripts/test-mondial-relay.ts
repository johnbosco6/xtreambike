// @ts-nocheck
const { getMondialRelayConfig } = require('../lib/mondial-relay/config');
const { searchPointRelais } = require('../lib/mondial-relay/services/point-relais-search');
require('dotenv').config({ path: '.env.local' });

async function testMondialRelay() {
    console.log('Testing Mondial Relay API...');

    try {
        const config = await getMondialRelayConfig();
        console.log('Using API URL:', config.api1.url);
        console.log('Enseigne:', config.api1.enseigne);

        console.log('\nSearching for points in Paris (75001)...');
        const points = await searchPointRelais({
            postalCode: '75001',
            country: 'FR',
            deliveryMode: '24R',
            maxResults: 3
        });

        console.log(`\nFound ${points.length} points:`);
        points.forEach((p: any) => {
            console.log(`- [${p.id}] ${p.name} (${p.postalCode} ${p.city})`);
        });

    } catch (error) {
        console.error('\nAPI Error:', error);
    }
}

testMondialRelay();
