import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Search, X } from "lucide-react";
import { MeetingStatus, MeetingType } from "../../(dashboard)/types";

interface MeetingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: MeetingStatus | "all";
  onStatusChange: (value: MeetingStatus | "all") => void;
  typeFilter: MeetingType | "all";
  onTypeChange: (value: MeetingType | "all") => void;
  onClearFilters: () => void;
}

export function MeetingFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  onClearFilters,
}: MeetingFiltersProps) {
  const hasFilters = search || statusFilter !== "all" || typeFilter !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar reuniones..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select
        value={statusFilter}
        onValueChange={(v) => onStatusChange(v as MeetingStatus | "all")}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="programada">Programada</SelectItem>
          <SelectItem value="en_curso">En curso</SelectItem>
          <SelectItem value="finalizada">Finalizada</SelectItem>
          <SelectItem value="cancelada">Cancelada</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={typeFilter}
        onValueChange={(v) => onTypeChange(v as MeetingType | "all")}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          <SelectItem value="ordinaria">Ordinaria</SelectItem>
          <SelectItem value="extraordinaria">Extraordinaria</SelectItem>
          <SelectItem value="urgente">Urgente</SelectItem>
          <SelectItem value="informativa">Informativa</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="icon" onClick={onClearFilters}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
