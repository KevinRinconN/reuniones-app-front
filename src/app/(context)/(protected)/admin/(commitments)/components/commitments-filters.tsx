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
import { CommitmentStatus } from "../../(dashboard)/types";
import { mockUsers } from "../../(dashboard)/data/mock-data";

interface CommitmentsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: CommitmentStatus | "all";
  onStatusChange: (value: CommitmentStatus | "all") => void;
  responsibleFilter: string;
  onResponsibleChange: (value: string) => void;
  onClearFilters: () => void;
}

export function CommitmentsFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  responsibleFilter,
  onResponsibleChange,
  onClearFilters,
}: CommitmentsFiltersProps) {
  const hasFilters =
    search || statusFilter !== "all" || responsibleFilter !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar compromisos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select
        value={statusFilter}
        onValueChange={(v) => onStatusChange(v as CommitmentStatus | "all")}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="cumplido">Cumplido</SelectItem>
          <SelectItem value="en_progreso">En progreso</SelectItem>
          <SelectItem value="pendiente">Pendiente</SelectItem>
          <SelectItem value="vencido">Vencido</SelectItem>
        </SelectContent>
      </Select>

      <Select value={responsibleFilter} onValueChange={onResponsibleChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Responsable" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los responsables</SelectItem>
          {mockUsers
            .filter((u) => u.active)
            .map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
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
