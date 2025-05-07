
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          collapsed ? "ml-16" : "ml-64"
        )}>
          <main className="p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
