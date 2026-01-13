"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Meeting } from "../types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/routes/admin.routes";

interface UpcomingMeetingsProps {
  meetings: Meeting[];
}

const statusColors: Record<string, string> = {
  programada:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  en_curso:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  finalizada: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  cancelada: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusLabels: Record<string, string> = {
  programada: "Programada",
  en_curso: "En curso",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
};

export function UpcomingMeetings({ meetings }: UpcomingMeetingsProps) {
  const navigate = useRouter();

  const upcomingMeetings = meetings
    .filter((m) => m.status === "programada")
    .slice(0, 5);

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Próximas Reuniones
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary"
          onClick={() => navigate.push(ROUTES.ADMIN.MEETING)}
        >
          Ver todas
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {upcomingMeetings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay reuniones próximas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-start gap-4 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() =>
                  navigate.push(`${ROUTES.ADMIN.MEETING}/${meeting.id}`)
                }
              >
                <div className="flex flex-col items-center justify-center min-w-12 py-1 px-2 rounded-lg bg-primary/10">
                  <span className="text-xs font-medium text-primary uppercase">
                    {format(new Date(meeting.date), "MMM", { locale: es })}
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {format(new Date(meeting.date), "d")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {meeting.title}
                    </h4>
                    <Badge
                      className={statusColors[meeting.status]}
                      variant="secondary"
                    >
                      {statusLabels[meeting.status]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meeting.startTime} - {meeting.endTime}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{meeting.location}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
