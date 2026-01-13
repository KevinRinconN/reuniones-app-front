"use client";
import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Switch } from "@/shared/components/ui/switch";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Users as UsersIcon, Search, Plus, Shield, Mail } from "lucide-react";

import { toast } from "sonner";
import { User, UserRole } from "../../(dashboard)/types";
import { mockUsers } from "../../(dashboard)/data/mock-data";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { EmptyState } from "@/shared/components/ui/empty-state";

const roleLabels: Record<UserRole, string> = {
  admin: "Administrador",
  secretario: "Secretario",
  participante: "Participante",
};

const roleBadgeStyles: Record<UserRole, string> = {
  admin: "bg-primary/10 text-primary",
  secretario:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  participante: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [deactivateDialog, setDeactivateDialog] = useState<{
    open: boolean;
    user?: User;
  }>({ open: false });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    toast.success("Rol actualizado correctamente");
  };

  const handleToggleActive = (user: User) => {
    if (user.active) {
      setDeactivateDialog({ open: true, user });
    } else {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, active: true } : u))
      );
      toast.success(`Usuario ${user.name} activado`);
    }
  };

  const confirmDeactivate = () => {
    if (deactivateDialog.user) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === deactivateDialog.user!.id ? { ...u, active: false } : u
        )
      );
      toast.success(`Usuario ${deactivateDialog.user.name} desactivado`);
      setDeactivateDialog({ open: false });
    }
  };

  // Stats
  const stats = {
    total: users.length,
    active: users.filter((u) => u.active).length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  return (
    <div>
      <div className="py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <UsersIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">
                    Total usuarios
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <UsersIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-xs text-muted-foreground">Activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.admins}</p>
                  <p className="text-xs text-muted-foreground">
                    Administradores
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={roleFilter}
            onValueChange={(v) => setRoleFilter(v as UserRole | "all")}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los roles</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="secretario">Secretario</SelectItem>
              <SelectItem value="participante">Participante</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {filteredUsers.length === 0 ? (
          <EmptyState
            icon={UsersIcon}
            title="No hay usuarios"
            description="No se encontraron usuarios con los filtros aplicados."
          />
        ) : (
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Activo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {user.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(v) =>
                          handleRoleChange(user.id, v as UserRole)
                        }
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="secretario">Secretario</SelectItem>
                          <SelectItem value="participante">
                            Participante
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          user.active
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }
                      >
                        {user.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Switch
                        checked={user.active}
                        onCheckedChange={() => handleToggleActive(user)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deactivateDialog.open}
        onOpenChange={(open) => setDeactivateDialog({ open })}
        title="Desactivar usuario"
        description={`¿Estás seguro de que deseas desactivar a ${deactivateDialog.user?.name}? El usuario no podrá acceder al sistema.`}
        confirmText="Desactivar"
        variant="destructive"
        onConfirm={confirmDeactivate}
      />
    </div>
  );
}
