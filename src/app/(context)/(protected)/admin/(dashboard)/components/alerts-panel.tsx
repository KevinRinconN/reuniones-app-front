import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

import { differenceInDays, parseISO } from "date-fns";
import { Commitment } from "../types";

interface AlertsPanelProps {
  commitments: Commitment[];
}

export function AlertsPanel({ commitments }: AlertsPanelProps) {
  const today = new Date();

  const urgentCommitments = commitments.filter((c) => {
    if (c.status === "cumplido") return false;
    const dueDate = parseISO(c.dueDate);
    const daysUntilDue = differenceInDays(dueDate, today);
    return daysUntilDue <= 3 || c.status === "vencido";
  });

  const getAlertType = (commitment: Commitment) => {
    if (commitment.status === "vencido") return "overdue";
    const dueDate = parseISO(commitment.dueDate);
    const daysUntilDue = differenceInDays(dueDate, today);
    if (daysUntilDue <= 0) return "overdue";
    if (daysUntilDue <= 3) return "warning";
    return "normal";
  };

  const alertConfig = {
    overdue: {
      icon: AlertTriangle,
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400",
      label: "Vencido",
    },
    warning: {
      icon: Clock,
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      iconColor: "text-amber-600 dark:text-amber-400",
      label: "Por vencer",
    },
    normal: {
      icon: CheckCircle2,
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400",
      label: "En tiempo",
    },
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Alertas de Vencimiento
        </CardTitle>
      </CardHeader>
      <CardContent>
        {urgentCommitments.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-500 opacity-50" />
            <p className="text-sm">No hay alertas pendientes</p>
          </div>
        ) : (
          <div className="space-y-2">
            {urgentCommitments.slice(0, 4).map((commitment) => {
              const alertType = getAlertType(commitment);
              const config = alertConfig[alertType];
              const Icon = config.icon;

              return (
                <div
                  key={commitment.id}
                  className={`p-3 rounded-lg border ${config.bg} ${config.border}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className={`h-4 w-4 mt-0.5 shrink-0 ${config.iconColor}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {commitment.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {commitment.responsible.name} • Vence:{" "}
                        {commitment.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
