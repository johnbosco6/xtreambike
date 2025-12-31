import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase-types';

// Lazy initialization to prevent build-time errors
let supabaseAdminInstance: ReturnType<typeof createClient<Database>> | null = null;

function getSupabaseAdmin() {
    if (supabaseAdminInstance) {
        return supabaseAdminInstance;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error(
            'Missing Supabase environment variables. Please set:\n' +
            '- NEXT_PUBLIC_SUPABASE_URL\n' +
            '- SUPABASE_SERVICE_ROLE_KEY\n' +
            'in your .env.local file or Vercel environment variables.'
        );
    }

    supabaseAdminInstance = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    return supabaseAdminInstance;
}

// Server-side client with service role key (bypasses RLS)
// ONLY use this in API routes and server components
// This uses a Proxy to enable lazy initialization
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient<Database>>, {
    get(target, prop) {
        const client = getSupabaseAdmin();
        const value = (client as any)[prop];
        return typeof value === 'function' ? value.bind(client) : value;
    }
});
