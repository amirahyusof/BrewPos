// src/context/NavContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavContextProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: 'Dashboard' }
  ]);
  const [isOnline, setIsOnline] = useState(true);

  // Listen for online/offline events
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <NavContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        breadcrumbs,
        setBreadcrumbs,
        isOnline,
        setIsOnline,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useNav must be used within NavContextProvider');
  }
  return context;
}