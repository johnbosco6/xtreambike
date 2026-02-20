/**
 * Script to remove incorrect color variants and fix prices
 * Products that should only have Transparent variant:
 * - HONDA 450CRF 09-12 - Protection de plaque latérale → 19.99
 * - KAWASAKI 250KXF 21-24 450KXF 19-23 - Protection de plaque latérale → 19.99
 * - KTM 125-150SX 16-18 250SX 17-18 250-450SXF - Protection de plaque latérale → 19.99
 * - BETA 350RR ... - Protection de plaque latérale → 19.99
 * 
 * Remove ids: 76 (BETA Noir), 77 (BETA Gris), 78 (HONDA Gris), 79 (HONDA Noir),
 *             80 (KAWASAKI Gris), 81 (KAWASAKI Noir), 82 (KTM Gris), 83 (KTM Noir)
 * Fix prices: ids 3, 9, 24, 31 → 19.99
 * 
 * Run: npx tsx scripts/fix-variants.ts
 */
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../lib/products-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// IDs to remove
const idsToRemove = [76, 77, 78, 79, 80, 81, 82, 83];

for (const id of idsToRemove) {
    // Match the entire product block: from "    {" with id: XX to the closing "    },"
    const regex = new RegExp(`    \\{\\s*\\n\\s*id: ${id},.*?\\n    \\},`, 's');
    const match = content.match(regex);
    if (match) {
        content = content.replace(match[0], '');
        // Clean up any double newlines left behind
        content = content.replace(/\n{3,}/g, '\n');
        console.log(`✅ Removed product id ${id}`);
    } else {
        console.log(`⚠️  Could not find product id ${id}`);
    }
}

// Fix prices for transparent-only products back to 19.99
const priceFixIds = [3, 9, 24, 31];
for (const id of priceFixIds) {
    const idPattern = new RegExp(`(\\{[^}]*?id:\\s*${id},\\s*\\n\\s*name:)`, 's');
    const match = content.match(idPattern);
    if (!match) {
        console.log(`⚠️  Could not find product id ${id} for price fix`);
        continue;
    }
    const blockStart = content.indexOf(match[0]);
    const blockEnd = content.indexOf('\n    },', blockStart);
    if (blockStart === -1 || blockEnd === -1) continue;

    let block = content.substring(blockStart, blockEnd);
    block = block.replace(/price:\s*"[^"]*"/, `price: "19,99 €"`);
    block = block.replace(/priceNumber:\s*[\d.]+/, `priceNumber: 19.99`);
    content = content.substring(0, blockStart) + block + content.substring(blockEnd);
    console.log(`✅ Fixed price for id ${id} → 19,99 €`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n✅ File updated. Total products: ${(content.match(/id:\s*\d+,/g) || []).length}`);
