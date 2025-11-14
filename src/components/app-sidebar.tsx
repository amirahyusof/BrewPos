
import React, { useState } from 'react';
import {
  Minus,
  Plus,
  LogOut,
  Coffee,
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Wallet,
  UtensilsCrossed,
  CreditCard,
  Settings,
  AlertCircle,
  Edit,
} from "lucide-react"
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
  icon?: React.ReactNode;
  items?: NavItem[];
}

// Enhanced navigation data with icons
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      title: "Main Order",
      icon: <ShoppingCart className="w-4 h-4" />,
      items: [
        {
          title: "Point of Sale",
          href: "/order/pos",
          icon: <ShoppingCart className="w-3 h-3" />,
        },
        {
          title: "Order History",
          href: "/order/history",
          icon: <BarChart3 className="w-3 h-3" />,
        },
        {
          title: "New Order",
          href: "/order/new",
          icon: <Plus className="w-3 h-3" />,
        },
      ],
    },
    {
      title: "Manage Products",
      icon: <UtensilsCrossed className="w-4 h-4" />,
      items: [
        {
          title: "All Products",
          href: "/products/list",
          icon: <UtensilsCrossed className="w-3 h-3" />,
        },
        {
          title: "Add New Product",
          href: "/products/add",
          icon: <Plus className="w-3 h-3" />,
        },
        {
          title: "Edit Product",
          href: "/products/edit",
          icons: <Edit className="w-3 h-3" />,
        },
        {
          title: "Categories",
          href: "/products/categories",
          icon: <LayoutDashboard className="w-3 h-3" />,
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      title: "Withdrawals",
      href: "/withdrawals",
      icon: <Wallet className="w-4 h-4" />,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings className="w-4 h-4" />,
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Check if a route is active
  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Handle navigation with smooth transition
  const handleNavigate = (path?: string) => {
    if (path && path !== '#') {
      navigate(path);
      // Add smooth scroll animation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Sidebar className="border-r border-gray-700 bg-gray-900" {...props}>
      {/* Header */}
      <SidebarHeader className="border-b border-gray-700 bg-linear-to-b from-gray-800 to-gray-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-amber-600 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              <a href="#" className="cursor-pointer">
                <div className="bg-linear-to-br from-amber-600 to-amber-700 text-white flex aspect-square size-9 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <Coffee className="size-5 font-bold" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <h1 className="text-lg font-bold text-white">BrewCoffee</h1>
                  <span className="text-xs text-gray-400">POS System</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Search Form */}
      <div className="px-2 py-3 border-b border-gray-700">
        <SearchForm />
      </div>

      {/* Navigation Menu */}
      <SidebarContent className="flex-1 overflow-y-auto scrollbar-hide">
        <SidebarGroup className="py-4">
          <SidebarMenu className="gap-1">
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
                  <SidebarMenuItem
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {hasChildren ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={`
                              transition-all duration-300 ease-out
                              ${hasActiveChild
                                ? ' from-amber-600 to-amber-700 text-white shadow-lg bg-linear-to-r'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                              }
                              ${hoveredItem === item.title && !hasActiveChild
                                ? 'bg-gray-800 translate-x-1'
                                : ''
                              }
                            `}
                          >
                            <span className="flex items-center gap-3 flex-1">
                              <span className={`
                                transition-transform duration-200
                                ${hoveredItem === item.title ? 'scale-110' : ''}
                              `}>
                                {item.icon}
                              </span>
                              <span className="font-medium text-sm">{item.title}</span>
                            </span>
                            <Plus className="ml-auto w-4 h-4 transition-all duration-300 group-data-[state=open]/collapsible:hidden" />
                            <Minus className="ml-auto w-4 h-4 transition-all duration-300 group-data-[state=closed]/collapsible:hidden rotate-animation" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {/* Submenu Items */}
                        {item.items?.length && (
                          <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                            <SidebarMenuSub className="border-l-2 border-gray-700 ml-0 pl-0 py-2 space-y-1">
                              {item.items.map((subItem) => {
                                const subIsActive = isActive(subItem.href);
                                return (
                                  <SidebarMenuSubItem
                                    key={subItem.title}
                                    onMouseEnter={() => setHoveredItem(subItem.title)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                  >
                                    <SidebarMenuSubButton
                                      asChild
                                      className={`
                                        transition-all duration-300 ease-out
                                        ${subIsActive
                                          ? 'bg-amber-600 text-white pl-4 font-semibold shadow-md'
                                          : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:pl-4'
                                        }
                                        ${hoveredItem === subItem.title && !subIsActive
                                          ? 'translate-x-1'
                                          : ''
                                        }
                                      `}
                                      onClick={() => handleNavigate(subItem.href)}
                                    >
                                      <a href="#" onClick={(e) => e.preventDefault()}>
                                        <span className={`
                                          transition-transform duration-200
                                          ${hoveredItem === subItem.title ? 'scale-110' : ''}
                                        `}>
                                          {subItem.icon}
                                        </span>
                                        <span className="text-sm">{subItem.title}</span>
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className={`
                          transition-all duration-300 ease-out
                          ${itemIsActive
                            ? 'bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          }
                          ${hoveredItem === item.title && !itemIsActive
                            ? 'bg-gray-800 translate-x-1'
                            : ''
                          }
                        `}
                        onClick={() => handleNavigate(itemPath)}
                      >
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <span className={`
                            transition-transform duration-200
                            ${hoveredItem === item.title ? 'scale-110' : ''}
                          `}>
                            {item.icon}
                          </span>
                          <span className="font-medium text-sm">{item.title}</span>
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
      <div className="border-t border-gray-700 from-gray-900 to-gray-800 bg-linear-to-t">
        <SidebarGroup className="py-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-4 py-3 space-y-3">
                {/* User Info */}
                {user && (
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1 font-semibold">LOGGED IN AS</p>
                    <p className="text-sm font-semibold text-gray-100 truncate">{user.email}</p>
                  </div>
                )}

                {/* Online Status */}
                <div className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300
                  ${isOnline
                    ? 'bg-green-900/30 border border-green-700/50'
                    : 'bg-red-900/30 border border-red-700/50'
                  }
                `}>
                  <div className={`
                    w-2.5 h-2.5 rounded-full animate-pulse
                    ${isOnline ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'}
                  `}></div>
                  <span className={`
                    text-xs font-semibold transition-colors duration-300
                    ${isOnline ? 'text-green-300' : 'text-red-300'}
                  `}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>

                {/* Offline Warning */}
                {!isOnline && (
                  <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-2 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-300">Working offline - data will sync when online</p>
                  </div>
                )}

                {/* Logout Button */}
                {onLogout && (
                  <Button
                    onClick={handleLogoutClick}
                    className="
                      w-full flex items-center justify-center gap-2
                      bg-red-600 hover:bg-red-700 text-white
                      px-4 py-2 rounded-lg font-semibold
                      transition-all duration-300 ease-out
                      hover:shadow-lg hover:shadow-red-600/50
                      active:scale-95
                    "
                  >
                    <LogOut size={18} />
                    Logout
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

