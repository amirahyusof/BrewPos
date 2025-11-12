import React from 'react';
import { POS } from './POS';
// import { useOfflineSync } from '@/hooks/useOfflineSync';
// import { useAuth } from '@/hooks/useAuth';


export const POSScreen: React.FC = () => {
// const { user } = useAuth();
// const { isOnline } = useOfflineSync(user?.uid);


return (
  <div className="h-screen flex flex-col">
    <header className="bg-white shadow-sm flex justify-between items-center p-4">
      <h1 className="text-lg font-semibold">☕ BrewPOS</h1>
      {/* <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
      {isOnline ? 'Online' : 'Offline Mode'}
      </span> */}
    </header>
    <main className="flex-1 overflow-hidden">
      <POS />
    </main>
  </div>
);
};