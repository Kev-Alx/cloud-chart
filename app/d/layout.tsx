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
import { useColumn } from "@/hooks/use-column";
import { cn } from "@/lib/utils";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { usePathname } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

type Props = {
  children?: React.ReactNode;
};

export default function Page({ children }: Props) {
  const { handleDragEnd, handleDragStart, activeColumn } = useColumn();
  const pathname = usePathname();
  const isData = pathname.includes("/data/");
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
          <header className="sticky top-0 flex shrink-0 items-center gap-2 z-10 border-b bg-background p-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <NavBreadcrumb />
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {children}
          <footer className={cn("w-full", isData && "fixed bottom-0")}>
            <BottomBar />
          </footer>
        </SidebarInset>
        <DragOverlay>
          {activeColumn ? <div>{activeColumn}</div> : null}
        </DragOverlay>
      </DndContext>
    </SidebarProvider>
  );
}
