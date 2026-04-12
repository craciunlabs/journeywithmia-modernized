// ============================================================================
// ANALYTICS UTILITY
// ============================================================================
// Purpose: Track user events with Google Analytics 4
// Usage: Import and call trackEvent() from any component
// GA4 Measurement ID: G-CXH3GZPEHM
// Microsoft Clarity ID: u4wlupryek
// ============================================================================

declare global {
  interface Window {
    gtag?: (...args: [string, ...unknown[]]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track a custom event in Google Analytics
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track page view (automatically tracked by GA4, but can be called manually)
 * @param pagePath - Path of the page (e.g., '/pricing')
 * @param pageTitle - Title of the page
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
};

// ============================================================================
// PRE-DEFINED EVENT TRACKERS
// ============================================================================

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (buttonName: string, location: string) => {
  trackEvent('cta_click', {
    button_name: buttonName,
    location: location,
  });
};

/**
 * Track pricing card clicks
 */
export const trackPricingClick = (plan: 'monthly' | 'yearly', price: string) => {
  trackEvent('pricing_click', {
    plan_type: plan,
    price: price,
  });
};

/**
 * Track external checkout link clicks
 */
export const trackCheckoutClick = (plan: 'monthly' | 'yearly', url: string) => {
  trackEvent('checkout_click', {
    plan_type: plan,
    checkout_url: url,
  });
};

/**
 * Track video plays
 */
export const trackVideoPlay = (videoTitle: string, videoUrl: string) => {
  trackEvent('video_play', {
    video_title: videoTitle,
    video_url: videoUrl,
  });
};

/**
 * Track FAQ expansions
 */
export const trackFAQClick = (question: string) => {
  trackEvent('faq_click', {
    question: question,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100) => {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
  });
};

/**
 * Track Try For Free registration
 */
export const trackTryForFreeRegistration = (sessionTitle: string, sessionDate: string) => {
  trackEvent('try_for_free_registration', {
    session_title: sessionTitle,
    session_date: sessionDate,
  });
};

/**
 * Track trust badge views
 */
export const trackTrustBadgeView = () => {
  trackEvent('trust_badge_view', {
    location: 'hero_section',
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

/**
 * Track navigation clicks
 */
export const trackNavClick = (linkName: string, destination: string) => {
  trackEvent('nav_click', {
    link_name: linkName,
    destination: destination,
  });
};

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: string, url: string) => {
  trackEvent('social_click', {
    platform: platform,
    url: url,
  });
};

// ============================================================================
// SCROLL DEPTH TRACKER
// ============================================================================

const scrollDepthTracked = {
  25: false,
  50: false,
  75: false,
  100: false,
};

/**
 * Initialize scroll depth tracking
 * Call this once when the page loads
 */
export const initScrollDepthTracking = () => {
  if (typeof window === 'undefined') return;

  const handleScroll = () => {
    const scrollPercentage = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );

    if (scrollPercentage >= 25 && !scrollDepthTracked[25]) {
      trackScrollDepth(25);
      scrollDepthTracked[25] = true;
    }
    if (scrollPercentage >= 50 && !scrollDepthTracked[50]) {
      trackScrollDepth(50);
      scrollDepthTracked[50] = true;
    }
    if (scrollPercentage >= 75 && !scrollDepthTracked[75]) {
      trackScrollDepth(75);
      scrollDepthTracked[75] = true;
    }
    if (scrollPercentage >= 100 && !scrollDepthTracked[100]) {
      trackScrollDepth(100);
      scrollDepthTracked[100] = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// ============================================================================
// CONVERSION TRACKING
// ============================================================================

/**
 * Track conversion (when someone becomes a paying member)
 */
export const trackConversion = (plan: 'monthly' | 'yearly', value: number) => {
  trackEvent('conversion', {
    plan_type: plan,
    value: value,
    currency: 'EUR',
  });
};

/**
 * Track trial start
 */
export const trackTrialStart = () => {
  trackEvent('trial_start', {
    trial_duration: '14_days',
  });
};
