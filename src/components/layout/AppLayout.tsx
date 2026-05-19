import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { MobileDrawer } from "./MobileDrawer";
import { Sidebar } from "./Sidebar";

export function AppLayout(): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed((value) => !value)} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <div className={isSidebarCollapsed ? "transition-[margin] duration-300 ease-out lg:mr-24" : "transition-[margin] duration-300 ease-out lg:mr-72"}>
        <Header onOpenMenu={() => setIsDrawerOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
