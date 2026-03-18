/**
 * Standalone stub — logs checkout intent.
 * Replace with your Stripe integration when wiring up payments.
 */

import { useState } from "react";

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const startCheckout = async (plan: 'monthly' | 'yearly') => {
    setIsLoading(true);
    console.log(`[Stripe stub] Starting checkout for ${plan} plan`);

    // TODO: Replace with real Stripe checkout session creation
    // Example: const { data } = await supabase.functions.invoke('create-checkout-session', { body: { plan } });
    // window.location.href = data.url;

    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Stripe checkout for "${plan}" plan would start here.\n\nWire up your Stripe integration to enable this.`);
    setIsLoading(false);
  };

  return { startCheckout, isLoading };
}
