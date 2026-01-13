"use client";
import {
  PageSubtitle,
  PageTitle,
  PageWrapper,
} from "@/shared/components/layout/page-wrapper";
import axios from "axios";
import DailyIframe from "@daily-co/daily-js";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Calendar, Clock, VideoIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
const client = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default function VideoMeetingPage() {
  const callFrameRef = useRef(null);
  const [call, setCall] = useState(null);

  const [meetings, setMeetings] = useState([]);
  const [allReuniones, setAllReuniones] = useState([]);

  const entidad_id = localStorage.getItem("entidad_id");
  const secretarias_id = localStorage.getItem("secretarias_id");
  const nombresecretaria = localStorage.getItem("nombresecretaria");
  const roomUrl = "https://pruebasss.daily.co/KkxJbZAZ7PZ3rFWbb41S";

  const getReuniones = async () => {
    try {
      const response = await client.get(`/information/secretaria`, {
        params: { entidad_id, secretarias_id, nombresecretaria },
      });
      console.log(response.data);
      if (response.status === 200) setAllReuniones(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  const getDatos = async () => {
    try {
      const response = await client.get("/meetings");
      if (response.status === 200) {
        console.log(response.data);
        setMeetings(response.data); // ← Guarda las reuniones
      }
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };
  const startCall = () => {
    if (call) return;

    const newCallFrame = DailyIframe.createFrame(callFrameRef.current, {
      showLeaveButton: true,
      iframeStyle: {
        width: "100%",
        height: "100%",
        border: "1px solid #ccc",
        borderRadius: "10px",
      },
    });

    newCallFrame.join({ url: roomUrl });
    setCall(newCallFrame);
  };

  const leaveCall = () => {
    if (call) {
      call.leave();
      setCall(null);
    }
  };

  useEffect(() => {
    return () => {
      if (call) {
        call.leave();
      }
    };
  }, [call]);

  useEffect(() => {
    getDatos();
    getReuniones();
  }, []);

  return (
    <PageWrapper>
      <div style={{ padding: "20px" }}>
        <div className="flex gap-6 text-center max-w-7xl mx-auto mb-16">
          <div className="max-w-2xl p-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <VideoIcon className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Video conferencia
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Crea reuniones de videollamada profesionales en segundos. Conecta
              con tu equipo desde cualquier lugar del mundo.
            </p>

            <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white max-w-3xl mx-auto">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">
                ¿Listo para tu próxima reunión?
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                Crea una sala de reunión en menos de 30 segundos Link:
                https://pruebasss.daily.co/KkxJbZAZ7PZ3rFWbb41S
              </p>

              {!call ? (
                <button
                  className="bg-white rounded-md text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={startCall}
                >
                  Empezar ahora
                </button>
              ) : (
                <button
                  onClick={leaveCall}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                >
                  Finalizar reunión
                </button>
              )}
            </div>
          </div>
          <Card className="w-full shadow-sm text-start">
            <CardHeader>
              <CardTitle className="text-2xl">Reuniones pendientes</CardTitle>
              <CardDescription>
                Muestra todas las reuniones que están agendadas y aún están por
                llevarse a cabo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {allReuniones.map((reuniones) => (
                <div className="flex gap-x-4 items-start justify-start border py-6 px-4 rounded-lg">
                  <div className="bg-muted p-4 rounded-xl">
                    <Calendar />
                  </div>

                  <div className="w-full">
                    <p className="font-semibold">
                      {reuniones.asunto_descripcion}
                    </p>
                    <p className="text-muted-foreground mb-2">
                      {new Date(reuniones.fecha_reunion).toLocaleDateString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={startCall}>
                        Empezar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div
          ref={callFrameRef}
          style={{
            width: "100%",
            height: call ? "600px" : "0px",
            overflow: "hidden",
            transition: "height 0.3s ease",
            marginTop: call ? "20px" : "0",
          }}
        />

        <div className="mt-10 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Grabaciones registradas</h2>
          {meetings.length === 0 ? (
            <p className="text-gray-500">No hay reuniones registradas aún.</p>
          ) : (
            <ul className="space-y-4">
              {[...meetings].reverse().map((meeting) => (
                <li
                  key={meeting.id}
                  className="p-4 border rounded-xl flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <Play className="size-6 text-gray-500  mx-6" />
                    <div>
                      <p className="font-semibold text-lg">
                        {new Date(meeting.created_at).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDuration(meeting.duration)}
                      </p>
                    </div>
                  </div>

                  {meeting.video_url && (
                    <a
                      href={meeting.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:bg-gray-200 px-4 py-2 rounded-lg"
                    >
                      Ver grabación
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
