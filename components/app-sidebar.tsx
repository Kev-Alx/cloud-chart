"use client";
import { ChartArea, ChartBarBig, Files, LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { NavUser } from "./nav-user";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { capitalize } from "@/lib/utils";
import ChartTab from "./sidetab/chart-tab";
import FileTab from "./sidetab/file-tab";
import DashboardTab from "./sidetab/dashboard-tab";

const data = {
  navMain: [
    {
      title: "Files",
      url: "/d/files",
      icon: Files,
      isActive: true,
    },
    {
      title: "Charts",
      url: "/d/charts",
      icon: ChartArea,
      isActive: false,
    },
    {
      title: "Dashboard",
      url: "/d/dashboards",
      icon: LayoutDashboard,
      isActive: false,
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const pathname = usePathname();
  const { setOpen } = useSidebar();
  const router = useRouter();
  const activeItem = pathname.split("/").pop()?.toLowerCase();
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <ChartBarBig className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Chart</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        router.push(item.url);
                        setOpen(true);
                      }}
                      isActive={pathname.includes(item.title.toLowerCase())}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {capitalize(activeItem as string)}
            </div>
            {/* <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label> */}
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          {activeItem === "charts" ? (
            <ChartTab />
          ) : activeItem === "files" ? (
            <FileTab />
          ) : (
            <DashboardTab />
          )}
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
