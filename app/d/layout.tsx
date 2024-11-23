"use client";
import AppSidebar from "@/components/app-sidebar";
import NavBreadcrumb from "@/components/nav-breadcrumb";
import BottomBar from "@/components/sidetab/bottom-bar";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ChartActions from "@/components/workspace/chart-actions";
import { ImageGenerationProvider } from "@/components/workspace/image-ctx";
import { useChartConfiguration } from "@/hooks/use-chart-config";
import { useColumn } from "@/hooks/use-column";
import { capitalize, cn } from "@/lib/utils";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

type Props = {
  children?: React.ReactNode;
};

export default function Page({ children }: Props) {
  const { handleDragEnd, handleDragStart, activeColumn } = useColumn();
  const pathname = usePathname();
  const isData = pathname.includes("/data/");
  const { chart } = useChartConfiguration();
  //get files data here
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <AppSidebar />
        <SidebarInset className="relative overflow-x-auto">
          <ImageGenerationProvider>
            <header className="sticky min-h-14 top-0 flex shrink-0 items-center gap-2 z-10 border-b bg-background p-4 py-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <NavBreadcrumb />
                </BreadcrumbList>
              </Breadcrumb>
              <ChartActions />
            </header>
            {children}
          </ImageGenerationProvider>
          <footer className={cn("w-full", isData && "fixed bottom-0")}>
            <BottomBar />
          </footer>
        </SidebarInset>
        <DragOverlay>
          {activeColumn ? (
            <div className="py-1 px-2 bg-slate-900 text-slate-50 rounded-full">
              {capitalize(activeColumn)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </SidebarProvider>
  );
}
