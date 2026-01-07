import { supabaseAdmin } from './supabase-server';
import type { Database } from './supabase-types';

/**
 * Type-safe database helper
 * This ensures proper type inference for all database operations
 */
export const db = {
    from: <TableName extends keyof Database['public']['Tables']>(table: TableName) => {
        return supabaseAdmin.from(table);
    },
    rpc: supabaseAdmin.rpc.bind(supabaseAdmin)
};

// Export types for convenience
export type Tables = Database['public']['Tables'];
export type TableName = keyof Tables;
export type Row<T extends TableName> = Tables[T]['Row'];
export type Insert<T extends TableName> = Tables[T]['Insert'];
export type Update<T extends TableName> = Tables[T]['Update'];
