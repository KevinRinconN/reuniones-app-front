"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MonthlyData } from "../types";

interface MeetingsChartProps {
  data: MonthlyData[];
}

export function MeetingsChart({ data }: MeetingsChartProps) {
  return (
    <Card className="border-border w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Reuniones por Mes
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <div className="h-full w-full min-w-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{
                  color: "hsl(var(--foreground))",
                  fontWeight: 600,
                }}
                formatter={(value) => [`${value} reuniones`, "Reuniones"]}
                labelFormatter={(label) => `Mes: ${label}`}
              />
              <Line
                type="monotone" // Cambiado de "linear" a "monotone"
                dataKey="meetings"
                stroke="var(--primary)" // Color azul explícito en lugar de hsl
                strokeWidth={3} // Aumentado el grosor
                dot={{
                  fill: "var(--primary)",
                  strokeWidth: 2,
                  r: 5,
                  stroke: "white",
                }}
                activeDot={{
                  r: 8,
                  fill: "var(--primary)",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                name="Reuniones"
                connectNulls={true} // Importante: conecta puntos nulos
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
