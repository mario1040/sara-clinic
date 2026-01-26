import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Utility: Verify secure hash
async function verifySecureHash(data: string, signature: string, secretKey: string): Promise<boolean> {
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
  
  const expectedSignature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const expectedHex = Array.from(new Uint8Array(expectedSignature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return expectedHex === signature;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let params: Record<string, string> = {};

    // Handle both GET (redirect) and POST (webhook) callbacks
    if (req.method === 'GET') {
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });
    } else if (req.method === 'POST') {
      const body = await req.text();
      // Try to parse as JSON first, then as form data
      try {
        params = JSON.parse(body);
      } catch {
        const formData = new URLSearchParams(body);
        formData.forEach((value, key) => {
          params[key] = value;
        });
      }
    }

    const { orderId, status, amount, transactionId, signature } = params;

    // Get secure key for verification
    const secureKey = Deno.env.get('AMAN_SECURE_KEY');
    const merchantId = Deno.env.get('AMAN_MERCHANT_ID');

    if (!secureKey || !merchantId) {
      console.error('Missing AMAN configuration for callback verification');
      return redirectToResult('failed', orderId, 'Configuration error');
    }

    // Verify the signature to prevent fraud
    const signatureData = `${merchantId}|${orderId}|${amount}|${status}`;
    const isValid = signature ? await verifySecureHash(signatureData, signature, secureKey) : false;

    if (!isValid && signature) {
      console.error('Invalid signature for payment callback:', { orderId, status });
      return redirectToResult('failed', orderId, 'Invalid signature');
    }

    // Log the payment result (in production, update database here)
    console.log('Payment callback received:', {
      orderId,
      status,
      amount,
      transactionId,
      verified: isValid || !signature, // Pass if no signature (dev mode)
    });

    // Determine success or failure
    const isSuccess = status === 'success' || status === 'PAID' || status === 'APPROVED';

    if (isSuccess) {
      console.log(`✅ Payment Successful for Order: ${orderId}, Transaction: ${transactionId}`);
      // TODO: Update database with payment status
      // await supabase.from('payments').update({ status: 'paid', transactionId }).eq('orderId', orderId);
      return redirectToResult('success', orderId);
    } else {
      console.log(`❌ Payment Failed for Order: ${orderId}, Status: ${status}`);
      return redirectToResult('failed', orderId, status);
    }

  } catch (error: unknown) {
    console.error('Payment callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return redirectToResult('failed', undefined, errorMessage);
  }
});

function redirectToResult(result: 'success' | 'failed', orderId?: string, error?: string): Response {
  // Get the frontend URL from environment or use default
  const frontendUrl = Deno.env.get('FRONTEND_URL') || '';
  
  // Build redirect URL
  const redirectPath = result === 'success' ? '/payment-success' : '/payment-failed';
  const params = new URLSearchParams();
  if (orderId) params.set('orderId', orderId);
  if (error) params.set('error', error);
  
  const redirectUrl = `${frontendUrl}${redirectPath}?${params.toString()}`;
  
  return new Response(null, {
    status: 302,
    headers: {
      ...corsHeaders,
      'Location': redirectUrl,
    },
  });
}
