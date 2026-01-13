import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { format, parseISO, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { AlertCircle, CheckCircle2, Clock, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";
import { Commitment, CommitmentStatus } from "../../(dashboard)/types";
import { StatusBadge } from "@/shared/components/ui/status-badge";

interface CommitmentsTableProps {
  commitments: Commitment[];
  onUpdateStatus?: (id: string, status: CommitmentStatus) => void;
}

export function CommitmentsTable({
  commitments,
  onUpdateStatus,
}: CommitmentsTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getSemaphore = (commitment: Commitment) => {
    if (commitment.status === "cumplido") {
      return { color: "bg-green-500", icon: CheckCircle2, label: "Cumplido" };
    }
    if (commitment.status === "vencido") {
      return { color: "bg-red-500", icon: AlertCircle, label: "Vencido" };
    }
    const daysUntilDue = differenceInDays(
      parseISO(commitment.dueDate),
      new Date()
    );
    if (daysUntilDue <= 3) {
      return { color: "bg-amber-500", icon: Clock, label: "Por vencer" };
    }
    return { color: "bg-green-500", icon: CheckCircle2, label: "En tiempo" };
  };

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10"></TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Reunión de origen</TableHead>
            <TableHead>Fecha límite</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commitments.map((commitment) => {
            const semaphore = getSemaphore(commitment);
            const SemaphoreIcon = semaphore.icon;

            return (
              <TableRow key={commitment.id}>
                <TableCell>
                  <div
                    className={cn("w-3 h-3 rounded-full", semaphore.color)}
                    title={semaphore.label}
                  />
                </TableCell>
                <TableCell>
                  <div className="max-w-[300px]">
                    <p className="font-medium text-foreground line-clamp-2">
                      {commitment.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {getInitials(commitment.responsible.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                      {commitment.responsible.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {commitment.meetingTitle}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {format(parseISO(commitment.dueDate), "d MMM yyyy", {
                      locale: es,
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={commitment.status} type="commitment" />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          onUpdateStatus?.(commitment.id, "cumplido")
                        }
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                        Marcar como cumplido
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          onUpdateStatus?.(commitment.id, "en_progreso")
                        }
                      >
                        <Clock className="mr-2 h-4 w-4 text-blue-600" />
                        Marcar en progreso
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          onUpdateStatus?.(commitment.id, "pendiente")
                        }
                      >
                        <AlertCircle className="mr-2 h-4 w-4 text-amber-600" />
                        Marcar como pendiente
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
