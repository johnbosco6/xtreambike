import { supabase } from './supabase-client';
import type { Database } from './supabase-types';

type DeliveryOption = Database['public']['Tables']['delivery_options']['Row'];

export class DeliveryService {
    /**
     * Get all active delivery options
     */
    static async getActiveDeliveryOptions(): Promise<DeliveryOption[]> {
        const { data, error } = await supabase
            .from('delivery_options')
            .select('*')
            .eq('active', true)
            .order('price', { ascending: true });

        if (error) {
            console.error('Error fetching delivery options:', error);
            return [];
        }

        return data || [];
    }

    /**
     * Get delivery options by provider
     */
    static async getDeliveryOptionsByProvider(provider: string): Promise<DeliveryOption[]> {
        const { data, error } = await supabase
            .from('delivery_options')
            .select('*')
            .eq('provider', provider)
            .eq('active', true)
            .order('price', { ascending: true });

        if (error) {
            console.error('Error fetching delivery options by provider:', error);
            return [];
        }

        return data || [];
    }

    /**
     * Get delivery option by ID
     */
    static async getDeliveryOptionById(id: string): Promise<DeliveryOption | null> {
        const { data, error } = await supabase
            .from('delivery_options')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching delivery option:', error);
            return null;
        }

        return data;
    }
}
