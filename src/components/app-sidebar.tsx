// src/components/app-sidebar.tsx
import React, { useState } from 'react';
import { Minus, Plus, LogOut, Coffee } from "lucide-react"
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

interface NavItem {
  title: string;
  url?: string;
  href?: string;
  isActive?: boolean;
  items?: NavItem[];
}

// Updated navigation data with routes
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      isActive: true,
    },
    {
      title: "Main Order",
      url: "#",
      items: [
        {
          title: "Point of Sale",
          href: "/order/pos",
        },
        {
          title: "Order History",
          href: "/order/history",
        },
        {
          title: "New Order",
          href: "/order/new",
        },
      ],
    },
    {
      title: "Manage Products",
      href: "#",
      items: [
        {
          title: "All Products",
          href: "/products/list",
        },
        {
          title: "Add New Product",
          href: "/products/add",
        },
        {
          title: "Edit Product",
          href: "/products/edit",
        },
        {
          title: "Categories",
          href: "/products/categories",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
    },
    {
      title: "Withdrawals",
      href: "/withdrawals",
    },
    {
      title: "Payments",
      url: "/payments",
    },
    {
      title: "Settings",
      url: "/settings",
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: { email: string };
  onLogout?: () => void;
  isOnline?: boolean;
}

export function AppSidebar({ user, onLogout, isOnline = true, ...props }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if a route is active
  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Handle navigation
  const handleNavigate = (path?: string) => {
    if (path && path !== '#') {
      navigate(path);
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                <div className="bg-amber-950 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Coffee className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <h1 className="text-lg font-semibold">BrewCoffee</h1>
                  <span className="text-sm text-gray-400">Point of Sale System</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => {
              const hasChildren = item.items && item.items.length > 0;
              const itemPath = item.url || item.href;
              const itemIsActive = isActive(itemPath);
              const hasActiveChild = item.items?.some(child => isActive(child.href));

              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={index === 1}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {hasChildren ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={hasActiveChild ? 'bg-amber-600 text-white' : ''}
                          >
                            {item.title}{" "}
                            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {item.items?.length ? (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isActive(subItem.href)}
                                    className={isActive(subItem.href) ? 'bg-amber-600 text-white' : ''}
                                    onClick={() => handleNavigate(subItem.href)}
                                  >
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate(subItem.href); }}>
                                      {subItem.title}
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        ) : null}
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={itemIsActive}
                        className={itemIsActive ? 'bg-amber-600 text-white' : ''}
                        onClick={() => handleNavigate(itemPath)}
                      >
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate(itemPath); }}>
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Section */}
      <div className="border-t border-gray-700">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="p-4 space-y-3">
                {user && (
                  <>
                    <p className="text-sm text-gray-400 mb-1">Logged in as:</p>
                    <p className="text-sm font-semibold truncate text-gray-200">{user.email}</p>
                  </>
                )}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-gray-400">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
                {onLogout && (
                  <Button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    <LogOut size={18} /> Logout
                  </Button>
                )}
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </div>

      <SidebarRail />
    </Sidebar>
  )
}
