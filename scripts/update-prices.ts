/**
 * Script to update product prices, add missing color variants, and add new products
 * Run: npx tsx scripts/update-prices.ts
 */
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../lib/products-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// ============== PRICE CHANGES ==============

interface PriceChange {
    ids: number[];
    newPrice: number;
    label: string;
}

const priceChanges: PriceChange[] = [
    { ids: [1, 2], newPrice: 12.99, label: "BETA Grip d'ORIGINE (Gris/Noir)" },
    { ids: [3], newPrice: 20.99, label: "BETA Protection plaque latérale (Transparent)" },
    { ids: [6, 7], newPrice: 20.99, label: "GASGAS Grip d'ORIGINE (Gris/Noir)" },
    { ids: [9], newPrice: 29.99, label: "HONDA 450CRF Plaque latérale (Transparent)" },
    { ids: [10, 11], newPrice: 24.99, label: "HONDA CRF250R/450R Protection de cadre (Gris/Noir)" },
    { ids: [13, 14], newPrice: 20.99, label: "HUSQVARNA Grip d'ORIGINE (Gris/Noir)" },
    { ids: [15, 16], newPrice: 19.99, label: "KAWASAKI 125KX Protection de cadre (Gris/Noir)" },
    { ids: [17, 18], newPrice: 24.99, label: "KAWASAKI 250KXF 15-20 Protection de cadre (Noir/Gris)" },
    { ids: [24], newPrice: 29.99, label: "KAWASAKI 250KXF 21-24 Plaque latérale (Transparent)" },
    { ids: [25, 26], newPrice: 19.99, label: "KOVE 450 RALLY Protection de cadre (Gris/Noir)" },
    { ids: [27, 28], newPrice: 20.99, label: "KTM 125-150SX Grip d'ORIGINE (Gris/Noir)" },
    { ids: [31], newPrice: 20.99, label: "KTM 125-150SX Plaque latérale (Transparent)" },
    // STARK Protection de carter: all variants → 9.99
    { ids: [40, 41, 42], newPrice: 9.99, label: "STARK Protection de carter (all)" },
    // STARK Protection de cadre: Noir, Gris → 9.99 (but also Droite/Gauche since user said the product is 9.99)
    { ids: [36, 37, 38, 39], newPrice: 9.99, label: "STARK Protection de cadre (all)" },
    { ids: [46, 47], newPrice: 19.99, label: "SUZUKI 125RM Protection de cadre (Gris/Noir)" },
    { ids: [48, 49], newPrice: 19.99, label: "SUZUKI 250RM Protection de cadre (Gris/Noir)" },
    { ids: [52, 53], newPrice: 24.99, label: "TRIUMPH Protection de cadre (Gris/Noir)" },
    { ids: [67, 68], newPrice: 14.99, label: "YAMAHA YZ125 05-25 Protection de cadre (Gris/Noir)" },
    { ids: [63], newPrice: 24.99, label: "YAMAHA 250-450YZF 06-09 Protection de cadre (Gris)" },
];

let changedCount = 0;

for (const change of priceChanges) {
    for (const id of change.ids) {
        // Find the product block by its id field
        const idPattern = new RegExp(`(\\{[^}]*?id:\\s*${id},\\s*\\n\\s*name:)`, 's');
        const match = content.match(idPattern);

        if (!match) {
            console.log(`⚠️  Could not find product id ${id} for: ${change.label}`);
            continue;
        }

        // Find the price and priceNumber lines near this id
        // We need to find the block starting from this id
        const blockStart = content.indexOf(match[0]);
        const blockEnd = content.indexOf('\n    },', blockStart);

        if (blockStart === -1 || blockEnd === -1) {
            console.log(`⚠️  Could not find block boundaries for id ${id}`);
            continue;
        }

        let block = content.substring(blockStart, blockEnd);
        const priceStr = change.newPrice.toFixed(2).replace('.', ',') + ' €';

        // Replace price string
        block = block.replace(/price:\s*"[^"]*"/, `price: "${priceStr}"`);
        // Replace priceNumber
        block = block.replace(/priceNumber:\s*[\d.]+/, `priceNumber: ${change.newPrice}`);

        content = content.substring(0, blockStart) + block + content.substring(blockEnd);
        changedCount++;
        console.log(`✅ id ${id}: ${change.label} → ${priceStr}`);
    }
}

console.log(`\n📊 Price changes applied: ${changedCount}\n`);

// ============== ADD NEW COLOR VARIANTS ==============

// Helper to find the last product entry (for inserting new products)
function getMaxId(): number {
    const matches = content.matchAll(/id:\s*(\d+),/g);
    let max = 0;
    for (const m of matches) {
        const num = parseInt(m[1]);
        if (num > max) max = num;
    }
    return max;
}

function createProductEntry(id: number, name: string, price: number, brand: string, category: string, bikeType: string, color: string, colorHex: string, image: string, displacements: number[], yearRange: string, yearStart: number, yearEnd: number): string {
    const priceStr = price.toFixed(2).replace('.', ',') + ' €';
    return `    {
        id: ${id},
        name: "${name}",
        price: "${priceStr}",
        priceNumber: ${price},
        variants: ["${category}"],
        brand: "${brand}",
        category: "${category}",
        bikeType: "${bikeType}",
        description: PRODUCT_DESCRIPTION,
        features: PRODUCT_FEATURES,
        compatibility: ["${name.split(' - ')[0]}"],
        inStock: true,
        color: "${color}",
        colorHex: "${colorHex}",
        image: "${image}",
        stock: 20,
        displacements: [${displacements.join(', ')}],
        yearRange: "${yearRange}",
        yearStart: ${yearStart},
        yearEnd: ${yearEnd},
    },`;
}

let nextId = getMaxId() + 1;

// Products to add - new color variants and new products
const newProducts: string[] = [];

// 1. BETA Protection plaque latérale - Noir and Gris (currently only Transparent at id 3)
newProducts.push(createProductEntry(
    nextId++,
    "BETA 350RR 2023 RR2T250-300 24-25 RR4T350-450 24-25 RX300 2025 - Protection de plaque latérale - Noir",
    20.99, "BETA", "Protection de plaque latérale", "Enduro",
    "Noir", "#000000",
    "/images/products/beta-350rr-2023-rr2t250-300-24-25-rr4t350-450-24-25-rx300-2025-protection-de-plaque-laterale-transparent.svg",
    [300, 350, 450], "2023-2050", 2023, 2050
));
newProducts.push(createProductEntry(
    nextId++,
    "BETA 350RR 2023 RR2T250-300 24-25 RR4T350-450 24-25 RX300 2025 - Protection de plaque latérale - Gris",
    20.99, "BETA", "Protection de plaque latérale", "Enduro",
    "Gris", "#808080",
    "/images/products/beta-350rr-2023-rr2t250-300-24-25-rr4t350-450-24-25-rx300-2025-protection-de-plaque-laterale-transparent.svg",
    [300, 350, 450], "2023-2050", 2023, 2050
));

// 2. HONDA 450CRF Protection plaque latérale - Gris and Noir (currently only Transparent at id 9)
newProducts.push(createProductEntry(
    nextId++,
    "HONDA 450CRF 09-12 - Protection de plaque latérale - Gris",
    29.99, "HONDA", "Protection de plaque latérale", "Motocross",
    "Gris", "#808080",
    "/images/products/honda-450crf-09-12-protection-de-plaque-laterale-transparent.svg",
    [450], "2009-2012", 2009, 2012
));
newProducts.push(createProductEntry(
    nextId++,
    "HONDA 450CRF 09-12 - Protection de plaque latérale - Noir",
    29.99, "HONDA", "Protection de plaque latérale", "Motocross",
    "Noir", "#000000",
    "/images/products/honda-450crf-09-12-protection-de-plaque-laterale-transparent.svg",
    [450], "2009-2012", 2009, 2012
));

// 3. KAWASAKI 250KXF 21-24 Protection plaque latérale - Gris and Noir (currently only Transparent at id 24)
newProducts.push(createProductEntry(
    nextId++,
    "KAWASAKI 250KXF 21-24 450KXF 19-23 - Protection de plaque latérale - Gris",
    29.99, "KAWASAKI", "Protection de plaque latérale", "Motocross",
    "Gris", "#808080",
    "/images/products/kawasaki-250kxf-21-24-450kxf-19-23-protection-de-plaque-laterale-transparent.svg",
    [250, 450], "2019-2024", 2019, 2024
));
newProducts.push(createProductEntry(
    nextId++,
    "KAWASAKI 250KXF 21-24 450KXF 19-23 - Protection de plaque latérale - Noir",
    29.99, "KAWASAKI", "Protection de plaque latérale", "Motocross",
    "Noir", "#000000",
    "/images/products/kawasaki-250kxf-21-24-450kxf-19-23-protection-de-plaque-laterale-transparent.svg",
    [250, 450], "2019-2024", 2019, 2024
));

// 4. KTM 125-150SX Protection plaque latérale - Gris and Noir (currently only Transparent at id 31)
newProducts.push(createProductEntry(
    nextId++,
    "KTM 125-150SX 16-18 250SX 17-18 250-450SXF - Protection de plaque latérale - Gris",
    20.99, "KTM", "Protection de plaque latérale", "Motocross",
    "Gris", "#808080",
    "/images/products/ktm-125-150sx-16-18-250sx-17-18-250-450sxf-protection-de-plaque-laterale-transparent.svg",
    [125, 150, 250, 450], "2015-2050", 2015, 2050
));
newProducts.push(createProductEntry(
    nextId++,
    "KTM 125-150SX 16-18 250SX 17-18 250-450SXF - Protection de plaque latérale - Noir",
    20.99, "KTM", "Protection de plaque latérale", "Motocross",
    "Noir", "#000000",
    "/images/products/ktm-125-150sx-16-18-250sx-17-18-250-450sxf-protection-de-plaque-laterale-transparent.svg",
    [125, 150, 250, 450], "2015-2050", 2015, 2050
));

// 5. YAMAHA 250-450YZF 06-09 Protection de cadre - Noir (currently only Gris at id 63)
newProducts.push(createProductEntry(
    nextId++,
    "YAMAHA 250-450YZF 06-09 - Protection de cadre - Noir",
    24.99, "YAMAHA", "Protection de cadre", "Motocross",
    "Noir", "#000000",
    "/images/products/yamaha-250-450yzf-06-09-protection-de-cadre-gris.svg",
    [250, 450], "2006-2050", 2006, 2050
));

// 6. Husqvarna Protection de plaque latérale - Transparent (MISSING from website)
newProducts.push(createProductEntry(
    nextId++,
    "HUSQVARNA 125-300TC 23-25 250-450FC 23-24 - Protection de plaque latérale - Transparent",
    20.99, "HUSQVARNA", "Protection de plaque latérale", "Motocross",
    "Transparent", "#CCCCCC",
    "/images/products/husqvarna-125-300tc-250-450fc-23-25-grip-de-protection-plastique-d-origine-gris.svg",
    [125, 250, 300, 450], "2023-2050", 2023, 2050
));

// 7. KOVE 450 RALLY 24-26 - Protection Thermique réservoir (NEW product, images exist)
newProducts.push(createProductEntry(
    nextId++,
    "KOVE 450 RALLY 24-26 - Protection Thermique réservoir - Noir",
    20.99, "KOVE", "Protection Thermique réservoir", "Rally",
    "Noir", "#000000",
    "/images/products/kove-450-rally-thermal-protection-installed-1.jpeg",
    [450], "2024-2026", 2024, 2026
));

// Insert new products before the closing ]; of the array
const closingBracket = content.lastIndexOf('];');
if (closingBracket !== -1) {
    const newProductsStr = '\n' + newProducts.join('\n') + '\n';
    content = content.substring(0, closingBracket) + newProductsStr + content.substring(closingBracket);
    console.log(`✅ Added ${newProducts.length} new product entries (IDs ${getMaxId() - newProducts.length + 1} to ${getMaxId()})`);
} else {
    console.error('❌ Could not find end of products array');
}

// Write the updated file
fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n✅ File updated: ${filePath}`);
console.log(`📊 Total products now: ${(content.match(/id:\s*\d+,/g) || []).length}`);
