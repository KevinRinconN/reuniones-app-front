import { ReactNode } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-green-500/10 text-green-600",
  warning: "bg-amber-500/10 text-amber-600",
  destructive: "bg-red-500/10 text-red-600",
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
}: MetricCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                {value}
              </span>
              {trend && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend.positive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.positive ? "+" : ""}
                  {trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <span className="text-xs text-muted-foreground">{subtitle}</span>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", variantStyles[variant])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
