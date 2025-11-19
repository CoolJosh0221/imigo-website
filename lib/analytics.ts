import * as amplitude from '@amplitude/analytics-browser';

// Initialize Amplitude
let isInitialized = false;

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

  if (!apiKey) {
    console.warn('Amplitude API key not found. Analytics will not be tracked.');
    return;
  }

  if (!isInitialized) {
    amplitude.init(apiKey, undefined, {
      defaultTracking: {
        pageViews: true,
        sessions: true,
        formInteractions: false, // We'll track forms manually
        fileDownloads: false,
      },
    });
    isInitialized = true;
    console.log('Amplitude analytics initialized');
  }
}

// Track custom events
export const analytics = {
  // Page view tracking (automatic with defaultTracking)

  // Blog post read
  trackBlogRead: (postId: string, title: string, category: string, language: 'zh' | 'en') => {
    amplitude.track('Blog Post Read', {
      post_id: postId,
      post_title: title,
      post_category: category,
      language: language,
      source: 'website',
    });
  },

  // Contact form submission
  trackContactFormSubmit: (status: 'success' | 'error', language: 'zh' | 'en') => {
    amplitude.track('Contact Form Submitted', {
      status: status,
      language: language,
      source: 'website',
    });
  },

  // Language switch
  trackLanguageSwitch: (fromLanguage: 'zh' | 'en', toLanguage: 'zh' | 'en', page: string) => {
    amplitude.track('Language Switched', {
      from_language: fromLanguage,
      to_language: toLanguage,
      page: page,
      source: 'website',
    });
  },

  // Event registration click
  trackEventRegistration: (eventId: string, eventTitle: string, eventCategory: string, language: 'zh' | 'en') => {
    amplitude.track('Event Registration Clicked', {
      event_id: eventId,
      event_title: eventTitle,
      event_category: eventCategory,
      language: language,
      source: 'website',
    });
  },

  // Tab switch on blog page
  trackTabSwitch: (tabName: 'all' | 'events' | 'blog', language: 'zh' | 'en') => {
    amplitude.track('Tab Switched', {
      tab_name: tabName,
      language: language,
      source: 'website',
    });
  },

  // Generic event tracking
  track: (eventName: string, properties?: Record<string, any>) => {
    amplitude.track(eventName, {
      ...properties,
      source: properties?.source || 'website',
    });
  },

  // Set user properties
  setUserProperties: (properties: Record<string, any>) => {
    amplitude.identify(new amplitude.Identify().set('user_properties', properties));
  },

  // Set user ID (for logged-in users in the future)
  setUserId: (userId: string) => {
    amplitude.setUserId(userId);
  },
};

export default analytics;
