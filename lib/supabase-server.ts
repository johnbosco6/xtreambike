import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './supabase-types';

// Cached instance
let supabaseAdminInstance: SupabaseClient<Database> | null = null;

function getSupabaseAdmin(): SupabaseClient<Database> {
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

    supabaseAdminInstance = createClient<Database>(
        supabaseUrl,
        supabaseServiceRoleKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            },
            db: {
                schema: 'public'
            }
        }
    );

    return supabaseAdminInstance;
}

// Server-side client with service role key (bypasses RLS)
// ONLY use this in API routes and server components
// Export the typed client directly instead of using a Proxy
export const supabaseAdmin = getSupabaseAdmin();
