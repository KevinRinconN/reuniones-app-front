import {
  PageSubtitle,
  PageTitle,
  PageWrapper,
} from "@/shared/components/layout/page-wrapper";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/routes/admin.routes";
import Link from "next/link";
import {
  mockMeetings,
  mockUsers,
} from "../../../../(dashboard)/data/mock-data";
import { StatusBadge } from "@/shared/components/ui/status-badge";
import { Badge } from "@/shared/components/ui/badge";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Crown,
  FileText,
  MapPin,
  Pencil,
  Users,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

const typeLabels: Record<string, string> = {
  ordinaria: "Ordinaria",
  extraordinaria: "Extraordinaria",
  urgente: "Urgente",
  informativa: "Informativa",
};

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = mockMeetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <PageWrapper>
        <div className="p-6">
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-foreground">
              Reunión no encontrada
            </h2>
            <p className="text-muted-foreground mt-2">
              La reunión que buscas no existe.
            </p>
            <Button className="mt-4">
              <Link href={ROUTES.ADMIN.MEETING}>Volver a reuniones</Link>
            </Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const formattedDate = format(
    parseISO(meeting.date),
    "EEEE d 'de' MMMM, yyyy",
    { locale: es }
  );

  const getParticipantUser = (userId: string) => {
    return mockUsers.find((u) => u.id === userId);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <PageWrapper>
      <div className="flex flex-row justify-between items-center gap-4">
        <PageTitle>{meeting.title}</PageTitle>
        <div className="flex gap-x-2">
          <Button asChild variant="outline">
            <Link href={ROUTES.ADMIN.MEETING}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button asChild>
            <Link href={`${ROUTES.ADMIN.MEETING}/${id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </div>
      {/* <PageHeader
          title={meeting.title}
          actions={
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/reuniones")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
              {hasPermission("create_meeting") && (
                <Button variant="outline" onClick={handleDuplicate}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar
                </Button>
              )}
              {hasPermission("edit_meeting") && (
                <Button onClick={() => navigate(`/reuniones/${id}/editar`)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              )}
            </div>
          }
        /> */}

      <div className="space-y-6">
        {/* Status and Type */}
        <div className="flex items-center gap-3">
          <StatusBadge status={meeting.status} type="meeting" />
          <Badge variant="secondary">{typeLabels[meeting.type]}</Badge>
        </div>

        {/* Description */}
        {meeting.description && (
          <p className="text-muted-foreground">{meeting.description}</p>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="capitalize">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {meeting.startTime} - {meeting.endTime}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{meeting.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{meeting.participants.length} participantes</span>
              </div>
            </CardContent>
          </Card>

          {/* Acta Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acta de Reunión</CardTitle>
            </CardHeader>
            <CardContent>
              {meeting.hasActa ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Acta generada</span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`${ROUTES.ADMIN.MEETING}/${id}/acta`}>
                      <FileText className="mr-2 h-4 w-4" />
                      Ver acta
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <XCircle className="h-5 w-5" />
                    <span>Sin acta registrada</span>
                  </div>
                  {meeting.status === "finalizada" && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`${ROUTES.ADMIN.MEETING}/${id}/acta`}>
                        <FileText className="mr-2 h-4 w-4" />
                        Crear acta
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Participantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {meeting.participants.map((participant) => {
                const user = getParticipantUser(participant.userId);
                if (!user) return null;

                return (
                  <div
                    key={participant.userId}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {user.name}
                          </span>
                          {participant.role === "secretario" && (
                            <Badge variant="secondary" className="gap-1">
                              <Crown className="h-3 w-3" />
                              Secretario
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    {meeting.status === "finalizada" && (
                      <div className="flex items-center gap-2">
                        {participant.attended ? (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          >
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Asistió
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            No asistió
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
