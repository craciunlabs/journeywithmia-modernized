/**
 * Analytics stubs — replace with your real analytics (Plausible, GA4, etc.)
 */

export const trackCTAClick = (label: string, location: string) => {
  console.log(`[CTA] ${label} @ ${location}`);
};

export const trackCheckoutClick = (plan: string, source: string) => {
  console.log(`[Checkout] ${plan} @ ${source}`);
};

export const trackFAQClick = (question: string) => {
  console.log(`[FAQ] ${question}`);
};

export const initScrollDepthTracking = () => {
  // Stub — wire up real scroll tracking here
  return () => {};
};
