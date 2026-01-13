"use client";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { CalendarIcon, Save, ArrowLeft, Copy } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Meeting, MeetingType, Participant } from "../../(dashboard)/types";
import { mockMeetings } from "../../(dashboard)/data/mock-data";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/shared/routes/admin.routes";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { ParticipantSelector } from "./participant-selector";
import {
  PageSubtitle,
  PageTitle,
} from "@/shared/components/layout/page-wrapper";

export default function MeetingForm({ id }: { id?: string }) {
  const navigate = useRouter();

  const searchParams = useSearchParams();
  const isEditing = !!id;
  const duplicateFromId = searchParams.get("duplicateFrom");
  const meetingToDuplicate = duplicateFromId
    ? mockMeetings.find((m) => m.id === duplicateFromId)
    : undefined;
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: undefined as Date | undefined,
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    type: "ordinaria" as MeetingType,
    participants: [] as Participant[],
  });

  useEffect(() => {
    if (isEditing) {
      const meeting = mockMeetings.find((m) => m.id === id);
      if (meeting) {
        setFormData({
          title: meeting.title,
          description: meeting.description,
          date: parseISO(meeting.date),
          startTime: meeting.startTime,
          endTime: meeting.endTime,
          location: meeting.location,
          type: meeting.type,
          participants: meeting.participants,
        });
      }
    } else if (meetingToDuplicate) {
      setFormData({
        title: `${meetingToDuplicate.title} (Copia)`,
        description: meetingToDuplicate.description,
        date: undefined,
        startTime: meetingToDuplicate.startTime,
        endTime: meetingToDuplicate.endTime,
        location: meetingToDuplicate.location,
        type: meetingToDuplicate.type,
        participants: meetingToDuplicate.participants,
      });
    }
  }, [id, isEditing, meetingToDuplicate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmDialog(true);
  };

  const confirmSave = () => {
    setConfirmDialog(false);
    toast.success(
      isEditing
        ? "Reunión actualizada correctamente"
        : "Reunión creada correctamente"
    );
    navigate.push(ROUTES.ADMIN.MEETING);
  };

  const updateField = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <PageTitle>
              {isEditing ? "Editar Reunión" : "Nueva Reunión"}
            </PageTitle>
            <PageSubtitle>
              {isEditing
                ? "Modifica los datos de la reunión"
                : "Completa los datos para crear una nueva reunión"}
            </PageSubtitle>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate.push(ROUTES.ADMIN.MEETING)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información General */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título de la reunión *</Label>
                <Input
                  id="title"
                  placeholder="Ej: Reunión de Planeación Estratégica"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el propósito y objetivos de la reunión..."
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de reunión *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => updateField("type", v as MeetingType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ordinaria">Ordinaria</SelectItem>
                    <SelectItem value="extraordinaria">
                      Extraordinaria
                    </SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                    <SelectItem value="informativa">Informativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Fecha y Hora */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fecha y Hora</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Fecha *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date
                          ? format(formData.date, "PPP", { locale: es })
                          : "Selecciona fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => updateField("date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Hora inicio *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => updateField("startTime", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">Hora fin *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => updateField("endTime", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
                <Input
                  id="location"
                  placeholder="Ej: Sala de Juntas Principal o enlace de videollamada"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Participantes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Participantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ParticipantSelector
                participants={formData.participants}
                onChange={(participants) =>
                  updateField("participants", participants)
                }
              />
              {formData.participants.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Agrega al menos un participante a la reunión.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate.push(ROUTES.ADMIN.MEETING)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Guardar cambios" : "Crear reunión"}
            </Button>
          </div>
        </form>
      </div>

      <ConfirmDialog
        open={confirmDialog}
        onOpenChange={setConfirmDialog}
        title={isEditing ? "Guardar cambios" : "Crear reunión"}
        description={
          isEditing
            ? "¿Confirmas que deseas guardar los cambios realizados a esta reunión?"
            : "¿Confirmas que deseas crear esta nueva reunión con los datos ingresados?"
        }
        confirmText="Confirmar"
        onConfirm={confirmSave}
      />
    </div>
  );
}
