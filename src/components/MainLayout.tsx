// src/components/MainLayout.tsx
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useNav } from '@/context/NavContext';
import { Menu } from 'lucide-react';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Map routes to breadcrumb labels
const routeBreadcrumbs: Record<string, any[]> = {
  '/dashboard': [{ label: 'Dashboard' }],
  '/order/pos': [{ label: 'Orders', href: '/order/pos' }, { label: 'Point of Sale' }],
  '/order/history': [{ label: 'Orders', href: '/order/history' }, { label: 'Order History' }],
  '/order/new': [{ label: 'Orders', href: '/order/new' }, { label: 'New Order' }],
  '/products/list': [{ label: 'Products', href: '/products/list' }, { label: 'All Products' }],
  '/products/add': [{ label: 'Products', href: '/products/add' }, { label: 'Add New Dish' }],
  '/products/edit': [{ label: 'Products', href: '/products/edit' }, { label: 'Edit Products' }],
  '/products/categories': [{ label: 'Products', href: '/products/categories' }, { label: 'Categories' }],
  '/analytics': [{ label: 'Analytics' }],
  '/withdrawals': [{ label: 'Withdrawals' }],
  '/payments': [{ label: 'Manage Payments' }],
  '/settings': [{ label: 'Settings' }],
};

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOnline } = useNav();

  // Get breadcrumbs for current route
  const breadcrumbs = routeBreadcrumbs[location.pathname] || [{ label: 'Dashboard' }];

  const handleLogout = () => {
    console.log('Logging out...');
    // TODO: Implement logout logic with Firebase
    // navigate('/login');
  };

  return (
    <SidebarProvider>
      <AppSidebar
        user={{ email: 'user@example.com' }}
        onLogout={handleLogout}
        isOnline={isOnline}
      />
      <SidebarInset>
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 overflow-hidden">
            <SidebarTrigger className="-ml-1" />

            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                    <BreadcrumbItem className="hidden md:block">
                      {crumb.href ? (
                        <BreadcrumbLink
                          href="#"
                          onClick={() => navigate(crumb.href)}
                          className="cursor-pointer"
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            {/* Right side info */}
            <div className="flex items-center gap-4 ml-auto">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isOnline ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-600' : 'bg-red-600'}`}></div>
                <span className={`text-xs font-medium ${isOnline ? 'text-green-700' : 'text-red-700'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="text-sm text-gray-600 whitespace-nowrap">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout;