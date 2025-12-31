import { supabaseAdmin } from './supabase-server';

interface ApiKeyConfig {
    [key: string]: string;
}

/**
 * Securely fetch API keys from Supabase
 * ONLY use this server-side (API routes, server components)
 */
export class ApiKeysService {
    private static cache: Map<string, ApiKeyConfig> = new Map();
    private static cacheExpiry: Map<string, number> = new Map();
    private static CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    /**
     * Get all keys for a specific service
     */
    static async getServiceKeys(serviceName: string): Promise<ApiKeyConfig> {
        // Check cache first
        const cached = this.cache.get(serviceName);
        const expiry = this.cacheExpiry.get(serviceName);

        if (cached && expiry && Date.now() < expiry) {
            return cached;
        }

        // Fetch from Supabase
        const { data, error } = await supabaseAdmin
            .from('api_keys')
            .select('key_name, key_value')
            .eq('service_name', serviceName);

        if (error) {
            console.error(`Error fetching API keys for ${serviceName}:`, error);
            throw new Error(`Failed to fetch API keys for ${serviceName}`);
        }

        if (!data || data.length === 0) {
            throw new Error(`No API keys found for service: ${serviceName}`);
        }

        // Convert to key-value object
        const config: ApiKeyConfig = {};
        data.forEach(row => {
            config[row.key_name] = row.key_value;
        });

        // Cache the result
        this.cache.set(serviceName, config);
        this.cacheExpiry.set(serviceName, Date.now() + this.CACHE_TTL);

        return config;
    }

    /**
     * Get a specific key for a service
     */
    static async getKey(serviceName: string, keyName: string): Promise<string> {
        const keys = await this.getServiceKeys(serviceName);

        if (!keys[keyName]) {
            throw new Error(`Key '${keyName}' not found for service '${serviceName}'`);
        }

        return keys[keyName];
    }

    /**
     * Clear the cache (useful for testing or when keys are updated)
     */
    static clearCache(serviceName?: string) {
        if (serviceName) {
            this.cache.delete(serviceName);
            this.cacheExpiry.delete(serviceName);
        } else {
            this.cache.clear();
            this.cacheExpiry.clear();
        }
    }
}

// Convenience functions for specific services
export const getSumUpKeys = () => ApiKeysService.getServiceKeys('sumup');
export const getMondialRelayKeys = () => ApiKeysService.getServiceKeys('mondial_relay');
