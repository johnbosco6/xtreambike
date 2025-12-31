import { supabaseAdmin } from './supabase-server';
import type { Database } from './supabase-types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderUpdate = Database['public']['Tables']['orders']['Update'];

export class OrdersService {
    /**
     * Create a new order in Supabase
     */
    static async createOrder(orderData: Omit<OrderInsert, 'order_number'>): Promise<Order> {
        try {
            // Generate order number using Supabase function
            const { data: orderNumber, error: orderNumberError } = await supabaseAdmin
                .rpc('generate_order_number');

            if (orderNumberError || !orderNumber) {
                throw new Error('Failed to generate order number');
            }

            // Create the order
            const { data, error } = await supabaseAdmin
                .from('orders')
                .insert({
                    ...orderData,
                    order_number: orderNumber,
                })
                .select()
                .single();

            if (error) {
                console.error('Error creating order:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('OrdersService.createOrder error:', error);
            throw error;
        }
    }

    /**
     * Get order by ID
     */
    static async getOrderById(orderId: string): Promise<Order | null> {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error) {
            console.error('Error fetching order:', error);
            return null;
        }

        return data;
    }

    /**
     * Get order by order number
     */
    static async getOrderByNumber(orderNumber: string): Promise<Order | null> {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('order_number', orderNumber)
            .single();

        if (error) {
            console.error('Error fetching order:', error);
            return null;
        }

        return data;
    }

    /**
     * Get orders by customer email
     */
    static async getOrdersByEmail(email: string): Promise<Order[]> {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('customer_email', email)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
            return [];
        }

        return data || [];
    }

    /**
     * Update order status
     */
    static async updateOrderStatus(
        orderId: string,
        status: Order['status']
    ): Promise<Order | null> {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) {
            console.error('Error updating order status:', error);
            return null;
        }

        return data;
    }

    /**
     * Update payment status
     */
    static async updatePaymentStatus(
        orderId: string,
        paymentStatus: Order['payment_status']
    ): Promise<Order | null> {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .update({ payment_status: paymentStatus })
            .eq('id', orderId)
            .select()
            .single();

        if (error) {
            console.error('Error updating payment status:', error);
            return null;
        }

        return data;
    }

    /**
     * Update order with delivery details
     */
    static async updateDeliveryDetails(
        orderId: string,
        deliveryMethod: string,
        deliveryDetails: any
    ): Promise<Order | null> {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .update({
                delivery_method: deliveryMethod,
                delivery_details: deliveryDetails,
            })
            .eq('id', orderId)
            .select()
            .single();

        if (error) {
            console.error('Error updating delivery details:', error);
            return null;
        }

        return data;
    }
}
