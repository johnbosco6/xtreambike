import { supabase } from './supabase-client';
import { supabaseAdmin } from './supabase-server';
import type { Database } from './supabase-types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];

export class ProductsService {
    /**
     * Get all products (client-side, uses RLS)
     */
    static async getAllProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('in_stock', true)
            .order('brand', { ascending: true })
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }

        return data || [];
    }

    /**
     * Get product by ID (client-side)
     */
    static async getProductById(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching product:', error);
            return null;
        }

        return data;
    }

    /**
     * Get products by brand (client-side)
     */
    static async getProductsByBrand(brand: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('brand', brand)
            .eq('in_stock', true)
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching products by brand:', error);
            return [];
        }

        return data || [];
    }

    /**
     * Get products by category (client-side)
     */
    static async getProductsByCategory(category: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .eq('in_stock', true)
            .order('brand', { ascending: true })
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }

        return data || [];
    }

    /**
     * Search products by name or compatibility (client-side)
     */
    static async searchProducts(query: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .eq('in_stock', true)
            .order('brand', { ascending: true })
            .order('name', { ascending: true });

        if (error) {
            console.error('Error searching products:', error);
            return [];
        }

        return data || [];
    }

    /**
     * Create product (server-side only)
     */
    static async createProduct(product: ProductInsert): Promise<Product | null> {
        const { data, error } = await supabaseAdmin
            .from('products')
            .insert(product)
            .select()
            .single();

        if (error) {
            console.error('Error creating product:', error);
            return null;
        }

        return data;
    }

    /**
     * Bulk insert products (server-side only)
     */
    static async bulkInsertProducts(products: ProductInsert[]): Promise<Product[]> {
        const { data, error } = await supabaseAdmin
            .from('products')
            .insert(products)
            .select();

        if (error) {
            console.error('Error bulk inserting products:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Update product stock (server-side only)
     */
    static async updateStock(productId: string, stock: number): Promise<Product | null> {
        const { data, error } = await supabaseAdmin
            .from('products')
            .update({
                stock,
                in_stock: stock > 0
            })
            .eq('id', productId)
            .select()
            .single();

        if (error) {
            console.error('Error updating product stock:', error);
            return null;
        }

        return data;
    }
}
