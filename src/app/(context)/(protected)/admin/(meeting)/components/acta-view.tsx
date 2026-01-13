"use client";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  ArrowLeft,
  FileText,
  Download,
  Send,
  CheckCircle2,
  Clock,
  Hash,
  QrCode,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { mockActas, mockMeetings } from "../../(dashboard)/data/mock-data";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/routes/admin.routes";
import {
  PageSubtitle,
  PageTitle,
} from "@/shared/components/layout/page-wrapper";
import Link from "next/link";

export default function ActaView({ id }: { id: string }) {
  const navigate = useRouter();

  const meeting = mockMeetings.find((m) => m.id === id);
  const existingActa = mockActas.find((a) => a.meetingId === id);

  const [isEditing, setIsEditing] = useState(!existingActa);
  const [content, setContent] = useState(existingActa?.content || "");

  if (!meeting) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-foreground">
            Reunión no encontrada
          </h2>
          <Button
            className="mt-4"
            onClick={() => navigate.push(ROUTES.ADMIN.MEETING)}
          >
            Volver a reuniones
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Acta guardada correctamente");
  };

  const handleExportPDF = () => {
    toast.success("Exportando acta a PDF...");
  };

  const handleSendForSignature = () => {
    toast.success("Acta enviada para firma digital");
  };

  const acta = existingActa || {
    hash: "pending...",
    qrCode: "",
    signatureStatus: "pendiente" as const,
    signedBy: [],
    createdAt: new Date().toISOString(),
  };

  return (
    <div>
      <div className="mb-4 flex flex-row justify-between items-center gap-4">
        <div>
          <PageTitle>Acta de Reunión</PageTitle>
          <PageSubtitle>{meeting.title}</PageSubtitle>
        </div>
        <Button asChild variant="outline">
          <Link href={`${ROUTES.ADMIN.MEETING}/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Principal */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contenido del Acta
              </CardTitle>
              {
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  )}
                </div>
              }
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`# Acta de Reunión - ${meeting.title}

## Fecha y Hora
${format(parseISO(meeting.date), "d 'de' MMMM 'de' yyyy", { locale: es })}, ${
                    meeting.startTime
                  } - ${meeting.endTime}

## Lugar
${meeting.location}

## Asistentes
- Nombre del asistente

## Orden del Día
1. Punto 1
2. Punto 2

## Desarrollo de la Reunión
Descripción detallada...

## Acuerdos
1. Acuerdo 1
2. Acuerdo 2`}
                  className="min-h-[500px] font-mono text-sm"
                />
              ) : (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {content ? (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground bg-transparent p-0 m-0">
                      {content}
                    </pre>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No hay contenido en el acta. Haz clic en "Editar" para
                      comenzar.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Estado de Firma */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estado de Firma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estado:</span>
                {acta.signatureStatus === "firmada" ? (
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
                    Pendiente
                  </Badge>
                )}
              </div>

              {acta.signedBy && acta.signedBy.length > 0 && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">
                    Firmado por:
                  </span>
                  <div className="space-y-1">
                    {acta.signedBy.map((name, i) => (
                      <div key={i} className="text-sm flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {acta.signatureStatus === "pendiente" && (
                <Button className="w-full" onClick={handleSendForSignature}>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar para firma
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Validación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Validación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  Hash de verificación
                </div>
                <code className="block text-xs bg-muted p-2 rounded-lg break-all font-mono">
                  {acta.hash}
                </code>
              </div>

              {existingActa && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <QrCode className="h-4 w-4" />
                    Código QR
                  </div>
                  <div className="flex justify-center p-4 bg-white rounded-lg">
                    <img
                      src={existingActa.qrCode}
                      alt="QR de validación"
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleExportPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
