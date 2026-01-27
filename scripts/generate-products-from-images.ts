import * as fs from 'fs';
import * as path from 'path';

// Configuration
const SOURCE_DIR = 'c:\\Users\\wikto\\Downloads\\swisstransfer_a4e13237-a933-4f7e-9c5e-46ed0198d2ba\\Photos xtremgrip.net';
const TARGET_IMAGE_DIR = 'c:\\Users\\wikto\\OneDrive\\Pulpit\\xtreambike website\\public\\images\\products';
const OUTPUT_FILE = 'c:\\Users\\wikto\\OneDrive\\Pulpit\\xtreambike website\\lib\\products-data.ts';

interface ProductEntry {
    brand: string;
    model: string;
    category: string;
    color: string;
    colorHex: string;
    imagePath: string;
    displacements: number[];
    yearRange: string;
    yearStart: number;
    yearEnd: number;
}

// Standard product description and features
const PRODUCT_DESCRIPTION = `Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.

Elles protègent également efficacement le cadre contre les rayures, l'usure et les impacts, tout en préservant sa valeur de revente.`;

const PRODUCT_FEATURES = [
    "Antidérapant",
    "Sur mesure",
    "Protège le cadre",
    "Épaisseur : 1 mm",
    "Facile à installer et à remplacer",
    "Testé et approuvé par des pilotes professionnels",
    "Réduit l'effort nécessaire pour tenir la moto",
];

// Extract year range from model string
function extractYearRange(modelStr: string): { yearRange: string; yearStart: number; yearEnd: number } {
    const yearPatterns = [
        // Pattern: 03-08, 21-25, etc. (2-digit years)
        /(\d{2})-(\d{2})/g,
        // Pattern: 2023, 2024, 2025 (4-digit years)
        /(20\d{2})/g,
    ];

    const years: number[] = [];

    // Extract 2-digit year ranges (e.g., 03-08 means 2003-2008)
    const twoDigitMatches = modelStr.match(/(\d{2})-(\d{2})/g);
    if (twoDigitMatches) {
        twoDigitMatches.forEach(match => {
            const [start, end] = match.split('-').map(y => {
                const year = parseInt(y);
                // Convert 2-digit year to 4-digit (00-50 = 2000-2050, 51-99 = 1951-1999)
                return year <= 50 ? 2000 + year : 1900 + year;
            });
            years.push(start, end);
        });
    }

    // Extract 4-digit years (e.g., 2023, 2024)
    const fourDigitMatches = modelStr.match(/(20\d{2})/g);
    if (fourDigitMatches) {
        fourDigitMatches.forEach(match => {
            years.push(parseInt(match));
        });
    }

    if (years.length === 0) {
        return { yearRange: 'N/A', yearStart: 2000, yearEnd: 2026 };
    }

    const yearStart = Math.min(...years);
    const yearEnd = Math.max(...years);

    let yearRange: string;
    if (yearStart === yearEnd) {
        yearRange = yearStart.toString();
    } else {
        yearRange = `${yearStart}-${yearEnd}`;
    }

    return { yearRange, yearStart, yearEnd };
}

// Extract displacement numbers from model string
function extractDisplacements(modelStr: string): number[] {
    const displacements = new Set<number>();

    // Match patterns like 125KX, 250SX, 450RMZ, etc.
    // Look for numbers followed by letters (model designation)
    const matches = modelStr.match(/(\d{2,3})(?=[A-Z])/g);
    if (matches) {
        matches.forEach(match => {
            const num = parseInt(match);
            if (num >= 65 && num <= 500) {
                displacements.add(num);
            }
        });
    }

    // Also match standalone numbers in certain contexts
    const standaloneMatches = modelStr.match(/\b(\d{2,3})\b/g);
    if (standaloneMatches) {
        standaloneMatches.forEach(match => {
            const num = parseInt(match);
            if (num >= 65 && num <= 500 && num !== 2023 && num !== 2024 && num !== 2025 && num !== 2026) {
                displacements.add(num);
            }
        });
    }

    return Array.from(displacements).sort((a, b) => a - b);
}

// Get category from folder name
function getCategoryFromFolder(folderName: string): string {
    if (folderName.includes('Grip de protection') || folderName.includes("d'ORIGINE")) {
        return 'Grip de protection plastique d\'ORIGINE';
    } else if (folderName.includes('Protection de cadre')) {
        return 'Protection de cadre';
    } else if (folderName.includes('Protection de plaque latéral')) {
        return 'Protection de plaque latérale';
    } else if (folderName.includes('Protection de carter')) {
        return 'Protection de carter';
    } else if (folderName.includes('Protection Thermique')) {
        return 'Protection Thermique réservoir';
    } else if (folderName.includes('maitre cylindre')) {
        return 'Protection maître cylindre arrière';
    }
    return 'Protection';
}

// Get color from filename
function getColorInfo(filename: string): { color: string; colorHex: string } | null {
    const upperFilename = filename.toUpperCase();
    if (upperFilename.includes('GRIS')) {
        return { color: 'Gris', colorHex: '#808080' };
    }
    if (upperFilename.includes('NOIR')) {
        return { color: 'Noir', colorHex: '#000000' };
    }
    if (upperFilename.includes('TRANSPARENT')) {
        return { color: 'Transparent', colorHex: '#FFFFFF' };
    }
    return null;
}

// Sanitize filename for web
function sanitizeFilename(brand: string, model: string, category: string, color: string): string {
    const combined = `${brand}-${model}-${category}-${color}`
        .toLowerCase()
        .replace(/[éèê]/g, 'e')
        .replace(/[àâ]/g, 'a')
        .replace(/[ô]/g, 'o')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    return `${combined}.svg`;
}

// Extract model name from folder
function extractModelName(folderName: string, brand: string): string {
    const category = getCategoryFromFolder(folderName);
    const categoryStart = folderName.indexOf(category.split(' ')[0]);

    let model = folderName;
    if (categoryStart > 0) {
        model = folderName.substring(0, categoryStart).trim();
    }

    // Remove brand name from model if it starts with it
    if (model.toUpperCase().startsWith(brand.toUpperCase())) {
        model = model.substring(brand.length).trim();
    }

    return model;
}

// Scan directory and collect individual product entries (one per SVG file)
function scanProducts(): ProductEntry[] {
    const products: ProductEntry[] = [];

    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`Source directory not found: ${SOURCE_DIR}`);
        return products;
    }

    const brands = fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log(`Found ${brands.length} brands: ${brands.join(', ')}\n`);

    brands.forEach(brand => {
        const brandPath = path.join(SOURCE_DIR, brand);
        const productFolders = fs.readdirSync(brandPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory());

        console.log(`\n${brand}: ${productFolders.length} product folders`);

        productFolders.forEach(productFolder => {
            const productPath = path.join(brandPath, productFolder.name);
            const category = getCategoryFromFolder(productFolder.name);
            const model = extractModelName(productFolder.name, brand);

            if (!category) {
                console.log(`  ⚠️  Skipped: ${productFolder.name}`);
                return;
            }

            // Read SVG files in this folder
            const files = fs.readdirSync(productPath)
                .filter(f => f.toLowerCase().endsWith('.svg'));

            files.forEach(file => {
                const colorInfo = getColorInfo(file);
                if (!colorInfo) return;

                const displacements = extractDisplacements(model);
                const { yearRange, yearStart, yearEnd } = extractYearRange(model);

                products.push({
                    brand,
                    model,
                    category,
                    color: colorInfo.color,
                    colorHex: colorInfo.colorHex,
                    imagePath: path.join(productPath, file),
                    displacements,
                    yearRange,
                    yearStart,
                    yearEnd
                });

                console.log(`  ✓ ${model} - ${category} - ${colorInfo.color} (${yearRange})`);
            });
        });
    });

    return products;
}

// Generate products file
function generateProductsFile() {
    console.log('='.repeat(80));
    console.log('ENHANCED PRODUCT MIGRATION SCRIPT');
    console.log('Each color variant = Separate product');
    console.log('='.repeat(80));
    console.log(`\nSource: ${SOURCE_DIR}`);
    console.log(`Target: ${TARGET_IMAGE_DIR}\n`);

    // Ensure target directory exists
    if (!fs.existsSync(TARGET_IMAGE_DIR)) {
        fs.mkdirSync(TARGET_IMAGE_DIR, { recursive: true });
    }

    // Scan products
    const products = scanProducts();

    console.log(`\n${'='.repeat(80)}`);
    console.log(`Total individual products found: ${products.length}`);
    console.log('='.repeat(80));

    // Copy images and build product data
    let productId = 1;
    const productDataArray: string[] = [];

    products.forEach((product) => {
        const targetFilename = sanitizeFilename(product.brand, product.model, product.category, product.color);
        const targetPath = path.join(TARGET_IMAGE_DIR, targetFilename);

        // Copy file
        try {
            fs.copyFileSync(product.imagePath, targetPath);
            console.log(`  📁 Copied: ${targetFilename}`);
        } catch (err) {
            console.error(`  ❌ Error copying ${product.imagePath}: ${err}`);
        }

        // Build product name
        const productName = `${product.brand.toUpperCase()} ${product.model} - ${product.category} - ${product.color}`;

        // Build compatibility array
        const compatibility = product.displacements.length > 0
            ? product.displacements.map(d => `${d}cc`).join(', ')
            : 'Voir description';

        // Build product object
        const productObj = `    {
        id: ${productId},
        name: "${productName}",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["${product.category}"],
        brand: "${product.brand}",
        category: "${product.category}",
        bikeType: "Motocross",
        description: PRODUCT_DESCRIPTION,
        features: PRODUCT_FEATURES,
        compatibility: ["${compatibility}"],
        inStock: true,
        color: "${product.color}",
        colorHex: "${product.colorHex}",
        image: "/images/products/${targetFilename}",
        stock: 20,
        displacements: [${product.displacements.join(', ')}],
        yearRange: "${product.yearRange}",
        yearStart: ${product.yearStart},
        yearEnd: ${product.yearEnd},
    }`;

        productDataArray.push(productObj);
        productId++;
    });

    // Generate TypeScript file
    const fileContent = `// Auto-generated product data - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Total products: ${products.length}
// Each color variant is a separate product

export interface Product {
    id: number;
    name: string;
    price: string;
    priceNumber: number;
    variants: string[];
    brand: string;
    category: string;
    bikeType: string;
    description: string;
    features: string[];
    compatibility: string[];
    inStock: boolean;
    color: string;
    colorHex: string;
    image: string;
    stock: number;
    displacements: number[];
    yearRange: string;
    yearStart: number;
    yearEnd: number;
}

const PRODUCT_DESCRIPTION = \`${PRODUCT_DESCRIPTION}\`;

const PRODUCT_FEATURES = [
${PRODUCT_FEATURES.map(f => `    "${f}"`).join(',\n')}
];

export const products: Product[] = [
${productDataArray.join(',\n')}
];

export default products;
`;

    // Write file
    fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8');

    console.log(`\n${'='.repeat(80)}`);
    console.log(`✅ SUCCESS!`);
    console.log(`${'='.repeat(80)}`);
    console.log(`Generated: ${OUTPUT_FILE}`);
    console.log(`Total products: ${products.length}`);
    console.log(`All products priced at: 29,99 €`);
    console.log(`Each color is now a separate product!`);
    console.log('='.repeat(80));
}

// Run the script
try {
    generateProductsFile();
} catch (error) {
    console.error('Error generating products:', error);
    process.exit(1);
}
