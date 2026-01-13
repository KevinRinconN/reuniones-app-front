import {
  PageSubtitle,
  PageTitle,
  PageWrapper,
} from "@/shared/components/layout/page-wrapper";
import UsersList from "../../components/users-list";

export default async function UsersPage() {
  return (
    <PageWrapper>
      <div className="flex flex-row justify-between items-center gap-4">
        <div>
          <PageTitle>Gestión de Usuarios</PageTitle>
          <PageSubtitle>
            Administra los usuarios y sus permisos en el sistema
          </PageSubtitle>
        </div>
      </div>
      <UsersList />
    </PageWrapper>
  );
}
