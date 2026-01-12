"use client";

import { IconAdminPages } from "@/shared/components/icon/icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar";
import { IconWrapper } from "../../icon/icon-wrapper";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { NavButton } from "./nav-button";

export interface NavMainItem {
  title: string;
  url: string;
  icon: IconAdminPages;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: IconAdminPages;
  }[];
}

export function NavMain({
  title,
  items,
}: {
  title: string;
  items: NavMainItem[];
}) {
  const pathname = usePathname();
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);

  return (
    <SidebarGroup
    // onBlur={(e) => {
    //   if (!e.currentTarget.contains(e.relatedTarget as Node)) {
    //     setOpenCollapse(null);
    //   }
    // }}
    >
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu className="font-medium gap-2 group-data-[collapsible=icon]:gap-2 px-2">
        {items.map((item) => {
          const isSelected = pathname.includes(item.url);
          const hasItems = !!item.items?.length;

          const isOpen = openCollapse === item.title;

          return hasItems ? (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              onOpenChange={() => setOpenCollapse(isOpen ? null : item.title)}
            >
              <SidebarMenuItem>
                <div className="relative">
                  <CollapsibleTrigger asChild>
                    <NavButton tooltip={item.title} isActive={isSelected}>
                      <IconWrapper icon={item.icon} size="lg" />
                      <span className="text-sm group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      <span className="sr-only">Toggle</span>
                    </NavButton>
                  </CollapsibleTrigger>
                  <IconWrapper
                    className={cn(
                      "p-0.5 absolute bg-sidebar text-muted-foreground rounded-full bottom-1/2 translate-y-1/2 -right-1 border border-sidebar-accent! transition-transform duration-200",
                      "group-data-[collapsible=icon]:-bottom-1 group-data-[collapsible=icon]:translate-y-0",
                      isOpen && "rotate-180",
                      isSelected && "text-primary border-primary-light"
                    )}
                    icon="chevronDown"
                    strokeWidth={isSelected ? "bold" : "regular"}
                  />
                </div>

                <CollapsibleContent className="my-2 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:bg-sidebar/90 group-data-[collapsible=icon]:border group-data-[collapsible=icon]:border-sidebar-border group-data-[collapsible=icon]:backdrop-blur-xs group-data-[collapsible=icon]:shadow-md group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:border-0.5 group-data-[collapsible=icon]:w-max">
                  <SidebarMenuSub className="border-l-2 ml-6.5 px-0 relative my-auto group-data-[collapsible=icon]:ml-4">
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem className="px-2" key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            {subItem.icon && (
                              <IconWrapper
                                icon={subItem.icon}
                                strokeWidth="bold"
                              />
                            )}
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                        {pathname.includes(subItem.url) && (
                          <motion.div
                            layoutId="active-pill"
                            transition={{
                              type: "spring",
                              duration: 0.5,
                            }}
                            className="absolute -left-0.5 top-0 w-0.5 h-full bg-sidebar-accent-foreground backdrop-blur-lg rounded-md"
                          />
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <NavButton
                asChild
                tooltip={item.title}
                isActive={isSelected}
                onClick={() => setOpenCollapse(null)}
              >
                <Link href={item.url}>
                  <IconWrapper icon={item.icon} size="lg" />
                  <span className="text-sm group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </Link>
              </NavButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
