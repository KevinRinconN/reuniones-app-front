import { PageWrapper } from "@/shared/components/layout/page-wrapper";
import MeetingForm from "../../../../components/meeting-form";

export default async function MeetingEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageWrapper>
      <MeetingForm id={id} />
    </PageWrapper>
  );
}
