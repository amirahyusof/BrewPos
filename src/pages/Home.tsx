import React from 'react';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { POSScreen } from './POSScreen';


export const Home: React.FC = () => {
  return (
  <SidebarProvider>
    <div className="flex h-screen bg-gray-50">
      <SidebarInset>
        <div className="flex flex-col w-full">
          <POSScreen />
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
  );
};