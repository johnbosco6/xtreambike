import { supabaseAdmin } from './supabase-server';
import type { Database } from './supabase-types';

type PaymentTransaction = Database['public']['Tables']['payment_transactions']['Row'];
type PaymentTransactionInsert = Database['public']['Tables']['payment_transactions']['Insert'];

export class PaymentsService {
    /**
     * Create a payment transaction record
     */
    static async createTransaction(
        transactionData: PaymentTransactionInsert
    ): Promise<PaymentTransaction> {
        try {
            const { data, error } = await supabaseAdmin
                .from('payment_transactions')
                .insert(transactionData)
                .select()
                .single();

            if (error) {
                console.error('Error creating payment transaction:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('PaymentsService.createTransaction error:', error);
            throw error;
        }
    }

    /**
     * Get transaction by checkout ID
     */
    static async getTransactionByCheckoutId(
        checkoutId: string
    ): Promise<PaymentTransaction | null> {
        const { data, error } = await supabaseAdmin
            .from('payment_transactions')
            .select('*')
            .eq('checkout_id', checkoutId)
            .single();

        if (error) {
            console.error('Error fetching transaction:', error);
            return null;
        }

        return data;
    }

    /**
     * Get transactions by order ID
     */
    static async getTransactionsByOrderId(orderId: string): Promise<PaymentTransaction[]> {
        const { data, error } = await supabaseAdmin
            .from('payment_transactions')
            .select('*')
            .eq('order_id', orderId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching transactions:', error);
            return [];
        }

        return data || [];
    }

    /**
     * Update transaction status
     */
    static async updateTransactionStatus(
        transactionId: string,
        status: PaymentTransaction['status'],
        metadata?: any
    ): Promise<PaymentTransaction | null> {
        const updateData: any = { status };
        if (metadata) {
            updateData.metadata = metadata;
        }

        const { data, error } = await supabaseAdmin
            .from('payment_transactions')
            .update(updateData)
            .eq('id', transactionId)
            .select()
            .single();

        if (error) {
            console.error('Error updating transaction status:', error);
            return null;
        }

        return data;
    }

    /**
     * Update transaction by checkout ID
     */
    static async updateTransactionByCheckoutId(
        checkoutId: string,
        status: PaymentTransaction['status'],
        transactionId?: string,
        metadata?: any
    ): Promise<PaymentTransaction | null> {
        const updateData: any = { status };
        if (transactionId) {
            updateData.transaction_id = transactionId;
        }
        if (metadata) {
            updateData.metadata = metadata;
        }

        const { data, error } = await supabaseAdmin
            .from('payment_transactions')
            .update(updateData)
            .eq('checkout_id', checkoutId)
            .select()
            .single();

        if (error) {
            console.error('Error updating transaction:', error);
            return null;
        }

        return data;
    }
}
