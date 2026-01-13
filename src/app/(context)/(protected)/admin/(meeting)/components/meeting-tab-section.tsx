"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Calendar, List } from "lucide-react";
import { MeetingFilters } from "./meeting-filters";
import { MeetingCard } from "./meeting-card";
import { MeetingCalendar } from "./meeting-calendar";
import { useRouter } from "next/navigation";
import { Meeting, MeetingStatus, MeetingType } from "../../(dashboard)/types";
import { toast } from "sonner";
import { isSameDay, parseISO } from "date-fns";
import { useState } from "react";
import { mockMeetings } from "../../(dashboard)/data/mock-data";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";

export const MeetingTabSection = () => {
  const navigate = useRouter();

  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MeetingStatus | "all">(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<MeetingType | "all">("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    meeting?: Meeting;
  }>({ open: false });

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(search.toLowerCase()) ||
      meeting.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || meeting.status === statusFilter;
    const matchesType = typeFilter === "all" || meeting.type === typeFilter;
    const matchesDate =
      !selectedDate || isSameDay(parseISO(meeting.date), selectedDate);

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const handleDuplicate = (meeting: Meeting) => {
    navigate.push("/reuniones/nueva");
    toast.success("Datos cargados para duplicar reunión");
  };

  const handleDelete = (meeting: Meeting) => {
    setDeleteDialog({ open: true, meeting });
  };

  const confirmDelete = () => {
    if (deleteDialog.meeting) {
      toast.success(`Reunión "${deleteDialog.meeting.title}" eliminada`);
      setDeleteDialog({ open: false });
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
    setSelectedDate(undefined);
  };

  return (
    <div className="py-6">
      <Tabs defaultValue="list" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              Lista
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="h-4 w-4" />
              Calendario
            </TabsTrigger>
          </TabsList>
        </div>

        <MeetingFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          onClearFilters={clearFilters}
        />

        <TabsContent value="list" className="mt-4">
          {filteredMeetings.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No hay reuniones"
              description="No se encontraron reuniones con los filtros aplicados."
              action={{
                label: "Crear reunión",
                onClick: () => navigate.push("/reuniones/nueva"),
              }}
            />
          ) : (
            <div className="space-y-4">
              {filteredMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <MeetingCalendar
                meetings={meetings}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
            <div className="lg:col-span-2">
              {filteredMeetings.length === 0 ? (
                <EmptyState
                  icon={Calendar}
                  title="Sin reuniones"
                  description={
                    selectedDate
                      ? "No hay reuniones programadas para esta fecha."
                      : "Selecciona una fecha para ver las reuniones."
                  }
                />
              ) : (
                <div className="space-y-4">
                  {filteredMeetings.map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      onDuplicate={handleDuplicate}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        title="Eliminar reunión"
        description={`¿Estás seguro de que deseas eliminar la reunión "${deleteDialog.meeting?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
};
