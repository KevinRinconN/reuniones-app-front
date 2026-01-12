import { SiteHeader } from "@/shared/components/layout/header/site-header";
import { AppSidebar } from "@/shared/components/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { routes } from "@/shared/routes/admin.routes";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar pages={routes} />
      <SidebarInset className="flex flex-col relative max-h-screen overflow-y-auto">
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
