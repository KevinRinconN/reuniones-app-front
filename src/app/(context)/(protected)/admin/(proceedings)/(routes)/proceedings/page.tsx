import {
  PageSubtitle,
  PageTitle,
  PageWrapper,
} from "@/shared/components/layout/page-wrapper";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/routes/admin.routes";
import { ActaList } from "../../components/acta-list";

export default async function ProceedingsPage() {
  return (
    <PageWrapper>
      <div className="flex flex-row justify-between items-center gap-4">
        <div>
          <PageTitle>Actas</PageTitle>
          <PageSubtitle>
            Consulta y gestiona las actas de reuniones
          </PageSubtitle>
        </div>
      </div>

      <ActaList />
    </PageWrapper>
  );
}
