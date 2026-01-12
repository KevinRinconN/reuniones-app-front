import { cn } from "@/shared/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const pageVariants = cva(
  "w-full relative px-6 py-4 lg:px-8 animation-slide-in-bottom",
  {
    variants: {
      size: {
        default: "max-w-screen-xl mx-auto md:py-10",
        max: "max-w-none py-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const PageWrapper = ({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageVariants>) => {
  return <div className={cn(pageVariants({ size, className }))} {...props} />;
};

export const PageHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("mb-10", className)} {...props} />;
};

export const PageTitle = ({
  className,
  ...props
}: React.ComponentProps<"h1">) => {
  return <h1 className={cn("text-3xl font-bold", className)} {...props} />;
};

export const PageSubtitle = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p className={cn("text-muted-foreground mt-1", className)} {...props} />
  );
};
