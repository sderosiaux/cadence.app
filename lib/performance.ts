// Lightweight performance monitoring utilities for development
export const logPerformance = (eventName: string, data?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 Performance: ${eventName}`, data);
  }
  
  // In production, Google Analytics 4 automatically tracks Core Web Vitals
  // No additional client-side code needed - GA4 handles LCP, CLS, FCP, INP automatically
};

// Performance observer for custom metrics
export const observePerformance = () => {
  if (typeof window === 'undefined') return;

  // Time to Interactive
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
        if (entry.name === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      }
    });
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
  }
};

// Resource hints for preloading
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // DNS prefetch for external domains
  const dnsPrefetch = document.createElement('link');
  dnsPrefetch.rel = 'dns-prefetch';
  dnsPrefetch.href = 'https://www.google-analytics.com';
  document.head.appendChild(dnsPrefetch);
};