import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { X, UserPlus, Crown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Participant, User } from "../../(dashboard)/types";
import { mockUsers } from "../../(dashboard)/data/mock-data";

interface ParticipantSelectorProps {
  participants: Participant[];
  onChange: (participants: Participant[]) => void;
}

export function ParticipantSelector({
  participants,
  onChange,
}: ParticipantSelectorProps) {
  const [open, setOpen] = useState(false);

  const availableUsers = mockUsers.filter(
    (user) => user.active && !participants.some((p) => p.userId === user.id)
  );

  const addParticipant = (user: User) => {
    onChange([
      ...participants,
      { userId: user.id, role: "participante", user },
    ]);
    setOpen(false);
  };

  const removeParticipant = (userId: string) => {
    onChange(participants.filter((p) => p.userId !== userId));
  };

  const toggleSecretario = (userId: string) => {
    onChange(
      participants.map((p) => {
        if (p.userId === userId) {
          return {
            ...p,
            role: p.role === "secretario" ? "participante" : "secretario",
          };
        }
        // Solo puede haber un secretario
        if (p.role === "secretario") {
          return { ...p, role: "participante" };
        }
        return p;
      })
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {participants.map((participant) => {
          const user =
            participant.user ||
            mockUsers.find((u) => u.id === participant.userId);
          if (!user) return null;

          return (
            <div
              key={participant.userId}
              className={cn(
                "flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border",
                participant.role === "secretario"
                  ? "bg-primary/10 border-primary/30"
                  : "bg-muted border-border"
              )}
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.name}</span>
              {participant.role === "secretario" && (
                <Crown className="h-3 w-3 text-primary" />
              )}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 hover:bg-primary/20"
                  onClick={() => toggleSecretario(participant.userId)}
                  title={
                    participant.role === "secretario"
                      ? "Quitar como secretario"
                      : "Asignar como secretario"
                  }
                >
                  <Crown
                    className={cn(
                      "h-3 w-3",
                      participant.role === "secretario"
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 hover:bg-destructive/20"
                  onClick={() => removeParticipant(participant.userId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Agregar participante
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px]" align="start">
          <Command>
            <CommandInput placeholder="Buscar usuario..." />
            <CommandList>
              <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
              <CommandGroup>
                {availableUsers.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => addParticipant(user)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
