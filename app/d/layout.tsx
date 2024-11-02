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
type Props = {
  children?: React.ReactNode;
};
export default function Page({ children }: Props) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="relative">
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <NavBreadcrumb />
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
        <footer className="absolute bottom-0">
          <BottomBar />
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
