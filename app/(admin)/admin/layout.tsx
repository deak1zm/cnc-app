import { AppSidebar } from "@/components/admin/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full h-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="p-4 z-50" />
        {children}
      </SidebarProvider>
    </div>
  );
}
