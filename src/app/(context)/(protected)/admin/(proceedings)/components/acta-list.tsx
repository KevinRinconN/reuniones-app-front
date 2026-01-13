"use client";

import { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  FileText,
  Search,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  Hash,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { mockActas, mockMeetings } from "../../(dashboard)/data/mock-data";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { ROUTES } from "@/shared/routes/admin.routes";

export const ActaList = () => {
  const navigate = useRouter();
  const [search, setSearch] = useState("");

  const meetingsWithActa = mockMeetings.filter((m) => m.hasActa);

  const filteredMeetings = meetingsWithActa.filter((meeting) =>
    meeting.title.toLowerCase().includes(search.toLowerCase())
  );

  const getActaForMeeting = (meetingId: string) => {
    return mockActas.find((a) => a.meetingId === meetingId);
  };

  const handleExportPDF = (meetingId: string) => {
    toast.success("Exportando acta a PDF...");
  };

  return (
    <div>
      <div className="py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar actas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {filteredMeetings.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No hay actas"
            description="Aún no se han generado actas de reuniones."
          />
        ) : (
          <div className="space-y-4">
            {filteredMeetings.map((meeting) => {
              const acta = getActaForMeeting(meeting.id);

              return (
                <Card
                  key={meeting.id}
                  className="border-border hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0 h-fit">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {acta?.signatureStatus === "firmada" ? (
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Firmada
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              >
                                <Clock className="mr-1 h-3 w-3" />
                                Pendiente de firma
                              </Badge>
                            )}
                          </div>

                          <h3
                            className="font-semibold text-foreground mb-1 cursor-pointer hover:text-primary transition-colors"
                            onClick={() =>
                              navigate.push(
                                `${ROUTES.ADMIN.MEETING}/${meeting.id}/acta`
                              )
                            }
                          >
                            {meeting.title}
                          </h3>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              {format(
                                parseISO(meeting.date),
                                "d 'de' MMMM, yyyy",
                                { locale: es }
                              )}
                            </span>
                          </div>

                          {acta && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Hash className="h-3 w-3" />
                              <code className="font-mono">
                                {acta.hash.slice(0, 16)}...
                              </code>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleExportPDF(meeting.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate.push(
                              `${ROUTES.ADMIN.MEETING}/${meeting.id}/acta`
                            )
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
