import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Utility: Generate secure hash (SHA256)
async function generateSecureHash(data: string, secretKey: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretKey);
  const messageData = encoder.encode(data);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Generate unique order ID
function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CIT-${timestamp}-${random}`.toUpperCase();
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { serviceId, serviceName, amount, paymentType, customerEmail, customerPhone } = await req.json();

    // Validate required fields
    if (!amount || !paymentType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount, paymentType' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get environment variables
    const merchantId = Deno.env.get('AMAN_MERCHANT_ID');
    const apiUrl = Deno.env.get('AMAN_API_URL');
    const secureKey = Deno.env.get('AMAN_SECURE_KEY');

    if (!merchantId || !apiUrl || !secureKey) {
      console.error('Missing AMAN configuration');
      return new Response(
        JSON.stringify({ error: 'Payment gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique order ID
    const orderId = generateOrderId();
    
    // Build the callback URL
    const baseUrl = Deno.env.get('SUPABASE_URL') || '';
    const returnUrl = `${baseUrl}/functions/v1/payment-callback`;
    
    // Prepare payment data
    const paymentData = {
      merchantId,
      orderId,
      amount: parseFloat(amount).toFixed(2),
      currency: 'EGP',
      paymentType, // 'full' or 'installment'
      serviceId: serviceId || 'general',
      serviceName: serviceName || 'Medical Service',
      customerEmail: customerEmail || '',
      customerPhone: customerPhone || '',
      returnUrl,
      timestamp: new Date().toISOString(),
    };

    // Generate secure signature
    const signatureData = `${merchantId}|${orderId}|${paymentData.amount}|${paymentData.currency}|${paymentData.timestamp}`;
    const signature = await generateSecureHash(signatureData, secureKey);

    // For AMAN/Egyptian gateways, typically you'd make an API call here
    // to initiate the payment session and get a redirect URL
    // This is a simulated response structure
    
    const paymentPayload = {
      ...paymentData,
      signature,
    };

    console.log('Payment initiated:', { orderId, amount, paymentType, serviceName });

    // In production, you would POST to AMAN's API here:
    // const amanResponse = await fetch(apiUrl + '/initiate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(paymentPayload),
    // });
    // const { paymentUrl, sessionId } = await amanResponse.json();

    // Simulated response - replace with actual AMAN API response
    const simulatedPaymentUrl = `${apiUrl}/checkout?orderId=${orderId}&merchantId=${merchantId}&signature=${signature}`;

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        paymentUrl: simulatedPaymentUrl,
        paymentData: {
          orderId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          serviceName: paymentData.serviceName,
          paymentType,
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Payment checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
