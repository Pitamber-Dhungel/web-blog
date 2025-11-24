import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full bg-gray-50">
        {/* Topbar */}
        <div className="fixed top-0 w-full z-30">
          <Topbar />
        </div>

        <div className="flex flex-1 w-full pt-16">
          {/* Sidebar */}
          <div className="hidden md:block w-1/5 h-screen shadow-lg border-r border-gray-200">
            <AppSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 h-screen overflow-auto p-6 md:p-10">
            <main className="min-h-[calc(100vh-64px)] w-full">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;


