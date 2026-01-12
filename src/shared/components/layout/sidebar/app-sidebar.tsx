import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { NavMain, NavMainItem } from "./nav-main";
import { IconWrapper } from "../../icon/icon-wrapper";

export function AppSidebar({ pages }: { pages?: NavMainItem[] }) {
  return (
    <Sidebar className="relative z-20" collapsible="icon">
      <SidebarTrigger
        className="absolute top-14 -right-4 cursor-pointer bg-sidebar dark:bg-sidebar dark:hover:bg-sidebar-accent hover:bg-sidebar-accent hover:text-white border-sidebar-accent"
        variant="outline"
      >
        <IconWrapper
          className=" transition-transform duration-300 group-data-[collapsible=icon]:rotate-180"
          icon="chevronLeft"
        />
      </SidebarTrigger>

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-center">
              <div className="font-bold text-2xl py-4">
                <span className="group-data-[collapsible=icon]:hidden">
                  APP
                </span>
                <span className="hidden group-data-[collapsible=icon]:block">
                  A
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="select-none ">
        <NavMain title="Gestión" items={pages ?? []} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
