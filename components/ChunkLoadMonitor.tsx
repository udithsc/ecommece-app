'use client';

import { useEffect } from 'react';
import { handleChunkLoadError } from '../lib/chunk-retry';

export default function ChunkLoadMonitor() {
  useEffect(() => {
    // Monitor for chunk loading errors
    const handleError = (event: ErrorEvent) => {
      handleChunkLoadError(event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      handleChunkLoadError(event.reason);
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // This component doesn't render anything
  return null;
}