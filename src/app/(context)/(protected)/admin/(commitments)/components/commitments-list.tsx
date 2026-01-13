"use client";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CheckSquare, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Commitment, CommitmentStatus } from "../../(dashboard)/types";
import { mockCommitments } from "../../(dashboard)/data/mock-data";
import { CommitmentsFilters } from "./commitments-filters";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { CommitmentsTable } from "./commitments-table";

export const CommitmentsList = () => {
  const [commitments, setCommitments] = useState<Commitment[]>(mockCommitments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CommitmentStatus | "all">(
    "all"
  );
  const [responsibleFilter, setResponsibleFilter] = useState("all");

  const filteredCommitments = commitments.filter((commitment) => {
    const matchesSearch =
      commitment.description.toLowerCase().includes(search.toLowerCase()) ||
      commitment.meetingTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || commitment.status === statusFilter;
    const matchesResponsible =
      responsibleFilter === "all" ||
      commitment.responsible.id === responsibleFilter;

    return matchesSearch && matchesStatus && matchesResponsible;
  });

  const handleUpdateStatus = (id: string, newStatus: CommitmentStatus) => {
    setCommitments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    toast.success("Estado actualizado correctamente");
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setResponsibleFilter("all");
  };

  // Stats
  const stats = {
    total: commitments.length,
    cumplido: commitments.filter((c) => c.status === "cumplido").length,
    pendiente: commitments.filter(
      (c) => c.status === "pendiente" || c.status === "en_progreso"
    ).length,
    vencido: commitments.filter((c) => c.status === "vencido").length,
  };

  return (
    <div>
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.cumplido}</p>
                  <p className="text-xs text-muted-foreground">Cumplidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendiente}</p>
                  <p className="text-xs text-muted-foreground">Pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.vencido}</p>
                  <p className="text-xs text-muted-foreground">Vencidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <CommitmentsFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            responsibleFilter={responsibleFilter}
            onResponsibleChange={setResponsibleFilter}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Table */}
        {filteredCommitments.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No hay compromisos"
            description="No se encontraron compromisos con los filtros aplicados."
          />
        ) : (
          <CommitmentsTable
            commitments={filteredCommitments}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </div>
  );
};
