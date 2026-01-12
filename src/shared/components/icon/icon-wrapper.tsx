import React from "react";
import { cn } from "@/shared/lib/utils";
import { Icons } from "./icons";
import { cva, type VariantProps } from "class-variance-authority";

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface IconWrapperProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "strokeWidth">,
    VariantProps<typeof iconVariants> {
  icon: Icons;
  strokeWidth?: "regular" | "bold";
}

export const IconWrapper = React.forwardRef<SVGSVGElement, IconWrapperProps>(
  ({ icon, size, strokeWidth, className, ...props }, ref) => {
    const Icon = Icons[icon || "arrowRight"];
    return (
      <Icon
        className={cn(iconVariants({ size, className }))}
        strokeWidth={strokeWidth == "bold" ? 2 : 1.5}
        {...props}
      />
    );
  }
);

IconWrapper.displayName = "IconWrapper";
