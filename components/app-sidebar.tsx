"use client";

import {
  ChartArea,
  ChartBarBig,
  Files,
  Grid2X2,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { NavUser } from "./nav-user";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { capitalize } from "@/lib/utils";
import ChartTab from "./sidetab/chart/chart-tab";
import FileTab from "./sidetab/file-tab";
import DashboardTab from "./sidetab/dashboard/dashboard-tab";
import DataTab from "./sidetab/data/data-tab";
import WelcomeTab from "./sidetab/welcome-tab";

const data = (fileId: string) => ({
  navMain: [
    {
      title: "Files",
      url: "/d/files",
      icon: Files,
      isActive: true,
    },
    {
      title: "Data",
      url: `/d/files/${fileId}/data`,
      icon: Grid2X2,
      isActive: true,
    },
    {
      title: "Charts",
      url: `/d/files/${fileId}/charts`,
      icon: ChartArea,
      isActive: false,
    },
    {
      title: "Dashboards",
      url: `/d/files/${fileId}/dashboards`,
      icon: LayoutDashboard,
      isActive: false,
    },
  ],
});

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpen } = useSidebar();
  const router = useRouter();
  const splittedPathname = pathname.split("/");
  const isFile = splittedPathname.length <= 3;
  const fileId = splittedPathname.at(3) || "";
  const activeItem = splittedPathname.at(
    splittedPathname.length === 6 ? -2 : -1
  );
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row z-20"
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
                {data(fileId || "").navMain.map((item) => (
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
                      disabled={!fileId && item.url !== "/d/files"}
                      isActive={pathname === item.url}
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
        </SidebarHeader>
        <SidebarContent>
          {isFile ? (
            <FileTab />
          ) : activeItem === "charts" ? (
            <ChartTab />
          ) : activeItem === "dashboards" ? (
            <DashboardTab />
          ) : activeItem === "data" ? (
            <DataTab fileId={["1", "2", "3"]} />
          ) : (
            <WelcomeTab />
          )}
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
