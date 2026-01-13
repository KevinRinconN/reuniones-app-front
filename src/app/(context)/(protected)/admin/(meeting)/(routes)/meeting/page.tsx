import {
  PageSubtitle,
  PageTitle,
  PageWrapper,
} from "@/shared/components/layout/page-wrapper";
import { Button } from "@/shared/components/ui/button";
import { Plus, Video } from "lucide-react";
import Link from "next/link";
import { MeetingTabSection } from "../../components/meeting-tab-section";
import { ROUTES } from "@/shared/routes/admin.routes";

export default async function MeetingPage() {
  return (
    <PageWrapper>
      <div className="flex flex-row justify-between items-center gap-4">
        <div>
          <PageTitle>Reuniones</PageTitle>
          <PageSubtitle>
            Gestiona y consulta todas las reuniones de la institución
          </PageSubtitle>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link href={`${ROUTES.ADMIN.MEETING}/video`}>
              <Video className="mr-1 h-4 w-4" />
              Nueva Reunión
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`${ROUTES.ADMIN.MEETING}/create`}>
              <Plus className="mr-1 h-4 w-4" />
              Agendar
            </Link>
          </Button>
        </div>
      </div>

      <MeetingTabSection />
    </PageWrapper>
  );
}
