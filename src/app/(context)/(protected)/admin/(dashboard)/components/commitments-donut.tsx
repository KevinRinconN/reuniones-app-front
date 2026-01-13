"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CommitmentsDonutProps {
  fulfilled: number;
  pending: number;
  overdue: number;
}

export function CommitmentsDonut({
  fulfilled,
  pending,
  overdue,
}: CommitmentsDonutProps) {
  const data = [
    { name: "Cumplidos", value: fulfilled, color: "hsl(142, 72%, 35%)" },
    { name: "Pendientes", value: pending, color: "hsl(38, 92%, 50%)" },
    { name: "Vencidos", value: overdue, color: "hsl(0, 72%, 51%)" },
  ];

  const total = fulfilled + pending + overdue;

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Estado de Compromisos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center -mt-4">
          <span className="text-2xl font-bold text-foreground">{total}</span>
          <span className="text-sm text-muted-foreground ml-1">total</span>
        </div>
      </CardContent>
    </Card>
  );
}
