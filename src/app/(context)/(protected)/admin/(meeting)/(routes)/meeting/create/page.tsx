import { PageWrapper } from "@/shared/components/layout/page-wrapper";
import MeetingForm from "../../../components/meeting-form";

export default async function MeetingCreatePage() {
  return (
    <PageWrapper>
      <MeetingForm />
    </PageWrapper>
  );
}
