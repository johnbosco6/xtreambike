/**
 * Product Migration Script
 * 
 * This script migrates products from products-data.ts to Supabase
 * 
 * Run with: node --loader ts-node/esm scripts/migrate-products.ts
 * Or: tsx scripts/migrate-products.ts
 */

import { createClient } from '@supabase/supabase-js';
import { products } from '../lib/products-data';
import type { Database } from '../lib/supabase-types';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables');
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

async function migrateProducts() {
    console.log('🚀 Starting product migration...');
    console.log(`📦 Found ${products.length} products to migrate`);

    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
        try {
            // Transform product data to match Supabase schema
            const productData = {
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
            };

            const { error } = await supabase
                .from('products')
                .insert(productData);

            if (error) {
                console.error(`❌ Error migrating product "${product.name}":`, error.message);
                errorCount++;
            } else {
                console.log(`✅ Migrated: ${product.name}`);
                successCount++;
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error: any) {
            console.error(`❌ Error migrating product "${product.name}":`, error.message);
            errorCount++;
        }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully migrated: ${successCount} products`);
    console.log(`❌ Failed: ${errorCount} products`);
    console.log(`📦 Total: ${products.length} products`);

    if (errorCount === 0) {
        console.log('\n🎉 Migration completed successfully!');
    } else {
        console.log('\n⚠️  Migration completed with errors. Please review the logs above.');
    }
}

// Run migration
migrateProducts()
    .then(() => {
        console.log('\n✨ Done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Migration failed:', error);
        process.exit(1);
    });
