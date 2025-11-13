import React, { useState, useEffect } from 'react';
import { GalleryVerticalEnd, Minus, Plus, LogOut, Coffee } from "lucide-react"
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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      isActive: true,
    },
    {
      title: "Main Order",
      url: "#",
      items: [
        {
          title: "Main Menu",
          href: "#",
        },
        {
          title: "Beverages",
          href: "#",
        },
        {
          title: "Desserts",
          href: "#",
          icon: "BarChart2",
        },
        {
          title: "Appetizers",
          href: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
    },
    {
      title: "Withdrawals",
      href: "#",
    },
    {
      title: "Manage Dishes",
      href: "#",
      items: [
        {
          title: "Add New Dish",
          href: "#",
        },
        {
          title: "Edit Existing Dish",
          href: "#",
        },
        { title: "Remove Dish",
          href: "#",
        },
      ],
    },
    {
      title: "Manage Payments",
      url: "#",
    },
  ],
}
  

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState(null);
   const [syncStatus, setSyncStatus] = useState('Online');
  
  const handleLogout = () => {
    setUser(null);
    
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-amber-950 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Coffee className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <h1 className="text-lg font-semibold">BrewPOS</h1>
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
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive ?? false}
                            >
                              <a href={item.href}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Logged in as:</p>
          <p className="text-sm font-semibold mb-4 truncate">{user?.email}</p>
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${syncStatus === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs">{syncStatus}</span>
          </div>
          <Button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
