"use client";
import React, {
  cloneElement,
  isValidElement,
  useCallback,
  type ReactNode,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib/utils";
import { useRipple } from "@/shared/hooks/use-ripple";
import { RippleEffects } from "./ripple-effects";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "relative rounded-full overflow-hidden transition-transform duration-300 ease-out active:scale-[0.97] inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disableRipple?: boolean;
}

type ChildProps = {
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disableRipple,
      children,
      asChild = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const { ripples, onClear, onPress } = useRipple({});

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onPress(e);
        onClick?.(e);
      },
      [onClick, onPress]
    );

    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<ChildProps>;

      return cloneElement<ChildProps>(child, {
        onClick: handleClick,
        className: cn(
          buttonVariants({ variant, size, className }),
          child.props.className
        ),
        ...props,
        children: (
          <>
            {child.props.children}
            <RippleEffects
              ripples={ripples}
              onClear={onClear}
              className="bg-(--ripple-color,color-mix(in_srgb,currentColor,transparent_90%))"
            />
          </>
        ),
      });
    }

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={handleClick}
        {...props}
      >
        {children}
        <RippleEffects
          ripples={ripples}
          onClear={onClear}
          className="bg-(--ripple-color,color-mix(in_srgb,currentColor,transparent_90%))"
        />
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
