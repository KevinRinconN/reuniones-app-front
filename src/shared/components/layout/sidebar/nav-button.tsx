import { cn } from "@/shared/lib/utils";
import { SidebarMenuButton } from "../../ui/sidebar";
import { Button } from "../../ui/button";

export const NavButton = ({
  className,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof SidebarMenuButton>) => {
  return (
    <SidebarMenuButton
      asChild
      className={cn(
        "[&>svg]:size-5 font-light group-data-[collapsible=icon]:[&>svg]:size-5 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center  justify-start gap-x-4 group-data-[collapsible=icon]:gap-x-0 h-fit cursor-pointer relative data-[active=true]:bg-sidebar-accent data-[active=true]:[&>svg]:text-primary",
        className
      )}
      {...props}
    >
      <Button className="justify-start" variant="ghost" asChild={asChild}>
        {children}
      </Button>
    </SidebarMenuButton>
  );
};
