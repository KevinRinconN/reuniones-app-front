import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  MoreVertical,
  Eye,
  Pencil,
  Copy,
  FileText,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Meeting } from "../../(dashboard)/types";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/shared/components/ui/status-badge";
import { ROUTES } from "@/shared/routes/admin.routes";

interface MeetingCardProps {
  meeting: Meeting;
  onDuplicate?: (meeting: Meeting) => void;
  onDelete?: (meeting: Meeting) => void;
}

const typeLabels: Record<string, string> = {
  ordinaria: "Ordinaria",
  extraordinaria: "Extraordinaria",
  urgente: "Urgente",
  informativa: "Informativa",
};

const typeColors: Record<string, string> = {
  ordinaria: "bg-secondary text-secondary-foreground",
  extraordinaria:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  urgente: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  informativa:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};

export function MeetingCard({
  meeting,
  onDuplicate,
  onDelete,
}: MeetingCardProps) {
  const navigate = useRouter();

  const formattedDate = format(
    new Date(meeting.date),
    "EEEE d 'de' MMMM, yyyy",
    { locale: es }
  );

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={meeting.status} type="meeting" />
              <Badge variant="secondary" className={typeColors[meeting.type]}>
                {typeLabels[meeting.type]}
              </Badge>
            </div>

            <h3
              className="font-semibold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors"
              onClick={() =>
                navigate.push(`${ROUTES.ADMIN.MEETING}/${meeting.id}`)
              }
            >
              {meeting.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {meeting.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {meeting.startTime} - {meeting.endTime}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {meeting.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {meeting.participants.length} participantes
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  navigate.push(`${ROUTES.ADMIN.MEETING}/${meeting.id}`)
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver detalle
              </DropdownMenuItem>
              {true && (
                <DropdownMenuItem
                  onClick={() =>
                    navigate.push(
                      `${ROUTES.ADMIN.MEETING}/${meeting.id}/editar`
                    )
                  }
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
              )}
              {true && (
                <DropdownMenuItem onClick={() => onDuplicate?.(meeting)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar
                </DropdownMenuItem>
              )}
              {meeting.hasActa && (
                <DropdownMenuItem
                  onClick={() =>
                    navigate.push(`${ROUTES.ADMIN.MEETING}/${meeting.id}/acta`)
                  }
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Ver acta
                </DropdownMenuItem>
              )}
              {true && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDelete?.(meeting)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
