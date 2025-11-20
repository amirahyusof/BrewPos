// src/hooks/useServiceWorker.ts - TEMPORARILY DISABLED
// Service Worker will be properly implemented in Issue #14 (Offline Functionality)

import { useEffect } from 'react';
import { useNav } from '@/context/NavContext';

export function useServiceWorker() {
  const { setIsOnline } = useNav();

  useEffect(() => {
    // ⚠️ SERVICE WORKER DISABLED FOR NOW
    // Will be properly implemented in Phase 6: Issue #14
    
    console.log('Service Worker registration disabled - will be implemented in Issue #14');

    // Monitor online/offline status ONLY
    const handleOnline = () => {
      console.log('App is online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('App is offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial state
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOnline]);
}

// ✅ This hook now ONLY tracks online/offline status
// ❌ Service Worker registration removed
// 📋 Service Worker will be added properly in Issue #14 with:
//    - Cache strategies
//    - Background sync
//    - Push notifications
//    - Proper offline handling