
import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { products } from '../lib/products-data';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importProducts() {
    console.log(`Found ${products.length} products to import...`);
    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
        try {
            // Map structure
            const dbProduct = {
                legacy_id: product.id,
                name: product.name,
                price: product.priceNumber,
                brand: product.brand,
                category: product.category,
                bike_type: product.bikeType,
                description: product.description,
                features: product.features,
                compatibility: product.compatibility,
                colors: product.colors,
                image_url: product.image,
                stock: product.stock,
                in_stock: product.inStock,
                updated_at: new Date().toISOString(),
            };

            // Check if exists by legacy_id to Upsert
            const { data: existing } = await supabase
                .from('products')
                .select('id')
                .eq('legacy_id', product.id)
                .single();

            let result;
            if (existing) {
                // Update
                result = await supabase
                    .from('products')
                    .update(dbProduct)
                    .eq('id', existing.id);
            } else {
                // Insert
                result = await supabase
                    .from('products')
                    .insert(dbProduct);
            }

            if (result.error) {
                console.error(`Failed to import ${product.name}:`, result.error.message);
                errorCount++;
            } else {
                console.log(`Imported: ${product.name}`);
                successCount++;
            }

        } catch (err) {
            console.error(`Error processing ${product.name}:`, err);
            errorCount++;
        }
    }

    console.log('\nImport complete!');
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
}

importProducts();
