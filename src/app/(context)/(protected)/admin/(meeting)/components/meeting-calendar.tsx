import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/shared/lib/utils";
import { Meeting } from "../../(dashboard)/types";

interface MeetingCalendarProps {
  meetings: Meeting[];
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date;
}

export function MeetingCalendar({
  meetings,
  onSelectDate,
  selectedDate,
}: MeetingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getMeetingsForDay = (date: Date) => {
    return meetings.filter((meeting) =>
      isSameDay(parseISO(meeting.date), date)
    );
  };

  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold capitalize">
            {format(currentMonth, "MMMM yyyy", { locale: es })}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dayMeetings = getMeetingsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <button
                key={day.toISOString()}
                onClick={() => onSelectDate?.(day)}
                className={cn(
                  "aspect-square p-1 rounded-lg text-sm relative flex flex-col items-center justify-start transition-colors",
                  !isCurrentMonth && "text-muted-foreground/40",
                  isCurrentMonth && "hover:bg-muted",
                  isToday && "bg-primary/10 font-semibold",
                  isSelected &&
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <span className="text-xs">{format(day, "d")}</span>
                {dayMeetings.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {dayMeetings.slice(0, 3).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-1 h-1 rounded-full",
                          isSelected ? "bg-primary-foreground" : "bg-primary"
                        )}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
