import { supabase } from "@/integrations/supabase/client";

export interface PaymentRequest {
  serviceId: string;
  serviceName: string;
  amount: number;
  paymentType: 'full' | 'installment';
  customerEmail?: string;
  customerPhone?: string;
}

export interface PaymentResponse {
  success: boolean;
  orderId?: string;
  paymentUrl?: string;
  paymentData?: {
    orderId: string;
    amount: string;
    currency: string;
    serviceName: string;
    paymentType: string;
  };
  error?: string;
}

export async function initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('payment-checkout', {
      body: request,
    });

    if (error) {
      console.error('Payment initiation error:', error);
      return {
        success: false,
        error: error.message || 'Failed to initiate payment',
      };
    }

    return data as PaymentResponse;
  } catch (err) {
    console.error('Payment request error:', err);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

export function calculateInstallmentAmount(totalAmount: number, months: number): number {
  // Simple installment calculation (no interest for demo)
  // In production, this would include actual financing terms
  const interestRate = 0; // Could be configured per plan
  const monthlyAmount = (totalAmount * (1 + interestRate)) / months;
  return Math.ceil(monthlyAmount);
}

export const installmentPlans = [
  { months: 3, label: '3 Months', labelAr: '3 شهور' },
  { months: 6, label: '6 Months', labelAr: '6 شهور' },
  { months: 12, label: '12 Months', labelAr: '12 شهر' },
];
