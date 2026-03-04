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

    /**
     * Get or create a customer record by email
     */
    static async getOrCreateCustomer(customerData: {
        email: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        address?: any;
    }): Promise<string | null> {
        try {
            // 1. Try to find existing customer
            const { data: existingCustomer, error: findError } = await supabaseAdmin
                .from('customers')
                .select('id')
                .eq('email', customerData.email)
                .single();

            if (findError && findError.code !== 'PGRST116') { // PGRST116 is "not found"
                console.error('Error finding customer:', findError);
            }

            if (existingCustomer) {
                // 2. Update existing customer info (keep logic simple)
                const { error: updateError } = await supabaseAdmin
                    .from('customers')
                    .update({
                        first_name: customerData.firstName || null,
                        last_name: customerData.lastName || null,
                        phone: customerData.phone || null,
                        address: customerData.address || null,
                    })
                    .eq('id', existingCustomer.id);

                if (updateError) console.error('Error updating customer:', updateError);
                return existingCustomer.id;
            } else {
                // 3. Create new customer
                const { data: newCustomer, error: createError } = await supabaseAdmin
                    .from('customers')
                    .insert({
                        email: customerData.email,
                        first_name: customerData.firstName || null,
                        last_name: customerData.lastName || null,
                        phone: customerData.phone || null,
                        address: customerData.address || null,
                        preferences: {}, // Default empty JSON
                    })
                    .select('id')
                    .single();

                if (createError) {
                    console.error('Error creating customer:', createError);
                    return null;
                }

                return newCustomer.id;
            }
        } catch (error) {
            console.error('OrdersService.getOrCreateCustomer error:', error);
            return null;
        }
    }
}
