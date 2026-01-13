import {
  PageSubtitle,
  PageTitle,
  PageWrapper,
} from "@/shared/components/layout/page-wrapper";
import { CommitmentsList } from "../../components/commitments-list";

export default async function CommitmentsPage() {
  return (
    <PageWrapper>
      <div className="flex flex-row justify-between items-center gap-4">
        <div>
          <PageTitle>Compromisos</PageTitle>
          <PageSubtitle>
            Seguimiento de acciones y compromisos derivados de reuniones
          </PageSubtitle>
        </div>
      </div>

      <CommitmentsList />
    </PageWrapper>
  );
}
