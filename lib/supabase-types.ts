// TypeScript types for Supabase database schema

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            api_keys: {
                Row: {
                    id: string
                    service_name: string
                    key_name: string
                    key_value: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    service_name: string
                    key_name: string
                    key_value: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    service_name?: string
                    key_name?: string
                    key_value?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    legacy_id: number | null
                    name: string
                    price: number
                    brand: string
                    category: string
                    bike_type: string
                    description: string | null
                    features: Json
                    compatibility: Json
                    colors: Json
                    image_url: string | null
                    stock: number
                    in_stock: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    legacy_id?: number | null
                    name: string
                    price: number
                    brand: string
                    category: string
                    bike_type: string
                    description?: string | null
                    features?: Json
                    compatibility?: Json
                    colors?: Json
                    image_url?: string | null
                    stock?: number
                    in_stock?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    legacy_id?: number | null
                    name?: string
                    price?: number
                    brand?: string
                    category?: string
                    bike_type?: string
                    description?: string | null
                    features?: Json
                    compatibility?: Json
                    colors?: Json
                    image_url?: string | null
                    stock?: number
                    in_stock?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            customers: {
                Row: {
                    id: string
                    email: string
                    first_name: string | null
                    last_name: string | null
                    phone: string | null
                    address: Json | null
                    preferences: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    email: string
                    first_name?: string | null
                    last_name?: string | null
                    phone?: string | null
                    address?: Json | null
                    preferences?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    first_name?: string | null
                    last_name?: string | null
                    phone?: string | null
                    address?: Json | null
                    preferences?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    customer_id: string | null
                    order_number: string
                    items: Json
                    subtotal: number
                    shipping_cost: number
                    total: number
                    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    delivery_method: string | null
                    delivery_details: Json | null
                    customer_email: string
                    customer_name: string | null
                    shipping_address: Json | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    customer_id?: string | null
                    order_number: string
                    items: Json
                    subtotal: number
                    shipping_cost?: number
                    total: number
                    status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    payment_status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    delivery_method?: string | null
                    delivery_details?: Json | null
                    customer_email: string
                    customer_name?: string | null
                    shipping_address?: Json | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    customer_id?: string | null
                    order_number?: string
                    items?: Json
                    subtotal?: number
                    shipping_cost?: number
                    total?: number
                    status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    payment_status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    delivery_method?: string | null
                    delivery_details?: Json | null
                    customer_email?: string
                    customer_name?: string | null
                    shipping_address?: Json | null
                    created_at?: string
                    updated_at?: string
                }
            }
            payment_transactions: {
                Row: {
                    id: string
                    order_id: string | null
                    provider: 'sumup' | 'stripe' | 'paypal'
                    transaction_id: string | null
                    checkout_id: string | null
                    amount: number
                    currency: string
                    status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    metadata: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    order_id?: string | null
                    provider: 'sumup' | 'stripe' | 'paypal'
                    transaction_id?: string | null
                    checkout_id?: string | null
                    amount: number
                    currency?: string
                    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    metadata?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string | null
                    provider?: 'sumup' | 'stripe' | 'paypal'
                    transaction_id?: string | null
                    checkout_id?: string | null
                    amount?: number
                    currency?: string
                    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
                    metadata?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            delivery_options: {
                Row: {
                    id: string
                    name: string
                    provider: string
                    price: number
                    estimated_days: string | null
                    description: string | null
                    active: boolean
                    metadata: Json
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    provider: string
                    price: number
                    estimated_days?: string | null
                    description?: string | null
                    active?: boolean
                    metadata?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    provider?: string
                    price?: number
                    estimated_days?: string | null
                    description?: string | null
                    active?: boolean
                    metadata?: Json
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            generate_order_number: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
        }
        Enums: {
            [_ in never]: never
        }
    }
}
