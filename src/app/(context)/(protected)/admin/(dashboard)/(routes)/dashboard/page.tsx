import {
  PageSubtitle,
  PageTitle,
  PageWrapper,
} from "@/shared/components/layout/page-wrapper";
import { MetricCard } from "../../components/metric-card";
import { AlertTriangle, Calendar, CheckCircle2, Users } from "lucide-react";
import { MeetingsChart } from "../../components/meetings-chart";
import { CommitmentsDonut } from "../../components/commitments-donut";
import { UpcomingMeetings } from "../../components/upcoming-meetings";
import { AlertsPanel } from "../../components/alerts-panel";
import {
  mockCommitments,
  mockDashboardMetrics,
  mockMeetings,
  mockMonthlyData,
} from "../../data/mock-data";

export default async function LoginPage() {
  const metrics = mockDashboardMetrics;

  return (
    <PageWrapper>
      <PageTitle>Dashboard</PageTitle>
      <PageSubtitle>
        Vista general del sistema de gestión de reuniones
      </PageSubtitle>
      <div className="py-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Reuniones"
            value={metrics.totalMeetings}
            subtitle="Este mes"
            icon={<Calendar className="h-5 w-5" />}
            trend={{ value: 12, positive: true }}
          />
          <MetricCard
            title="Asistencia Promedio"
            value={`${metrics.attendancePercentage}%`}
            subtitle="Último trimestre"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 5, positive: true }}
          />
          <MetricCard
            title="Compromisos Cumplidos"
            value={metrics.commitmentsFulfilled}
            subtitle={`de ${
              metrics.commitmentsFulfilled +
              metrics.commitmentsPending +
              metrics.commitmentsOverdue
            } totales`}
            icon={<CheckCircle2 className="h-5 w-5" />}
            variant="success"
          />
          <MetricCard
            title="Compromisos Vencidos"
            value={metrics.commitmentsOverdue}
            subtitle="Requieren atención"
            icon={<AlertTriangle className="h-5 w-5" />}
            variant="destructive"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 min-w-0">
          <MeetingsChart data={mockMonthlyData} />
          <CommitmentsDonut
            fulfilled={metrics.commitmentsFulfilled}
            pending={metrics.commitmentsPending}
            overdue={metrics.commitmentsOverdue}
          />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
          <UpcomingMeetings meetings={mockMeetings} />
          <AlertsPanel commitments={mockCommitments} />
        </div>
      </div>
    </PageWrapper>
  );
}
