/**
 * Chunk loading retry utility for handling ChunkLoadError
 * This helps prevent the application from breaking when webpack chunks fail to load
 */

let isReloading = false;

export function handleChunkLoadError(error: any): void {
  if (error?.name === 'ChunkLoadError' && !isReloading) {
    console.warn('ChunkLoadError detected. Attempting to reload...', error);
    isReloading = true;
    
    // Clear any cached chunks
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      }).catch(console.error);
    }
    
    // Clear browser cache for this domain
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
      }).catch(console.error);
    }
    
    // Reload after a short delay to avoid infinite loops
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

// Global error handler for unhandled chunk loading errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    handleChunkLoadError(event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    handleChunkLoadError(event.reason);
  });
}

// Retry mechanism for dynamic imports
export function retryDynamicImport<T>(
  importFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    let retries = 0;

    const attempt = () => {
      importFn()
        .then(resolve)
        .catch((error) => {
          if (error?.name === 'ChunkLoadError' && retries < maxRetries) {
            retries++;
            console.warn(`Chunk load failed, retrying... (${retries}/${maxRetries})`);
            setTimeout(attempt, delay * retries); // Exponential backoff
          } else {
            reject(error);
          }
        });
    };

    attempt();
  });
}

// Enhanced dynamic import with retry logic
export function safeDynamicImport<T>(importFn: () => Promise<T>): Promise<T> {
  return retryDynamicImport(importFn, 3, 1000);
}