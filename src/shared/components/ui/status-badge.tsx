import {
  CommitmentStatus,
  MeetingStatus,
} from "@/app/(context)/(protected)/admin/(dashboard)/types";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

interface StatusBadgeProps {
  status: CommitmentStatus | MeetingStatus;
  type?: "commitment" | "meeting";
}

const commitmentStyles: Record<
  CommitmentStatus,
  { bg: string; label: string }
> = {
  cumplido: {
    bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    label: "Cumplido",
  },
  pendiente: {
    bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    label: "Pendiente",
  },
  en_progreso: {
    bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    label: "En progreso",
  },
  vencido: {
    bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    label: "Vencido",
  },
};

const meetingStyles: Record<MeetingStatus, { bg: string; label: string }> = {
  programada: {
    bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    label: "Programada",
  },
  en_curso: {
    bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    label: "En curso",
  },
  finalizada: {
    bg: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    label: "Finalizada",
  },
  cancelada: {
    bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    label: "Cancelada",
  },
};

export function StatusBadge({ status, type = "commitment" }: StatusBadgeProps) {
  const styles =
    type === "commitment"
      ? commitmentStyles[status as CommitmentStatus]
      : meetingStyles[status as MeetingStatus];

  return (
    <Badge variant="secondary" className={cn("font-medium", styles.bg)}>
      {styles.label}
    </Badge>
  );
}
