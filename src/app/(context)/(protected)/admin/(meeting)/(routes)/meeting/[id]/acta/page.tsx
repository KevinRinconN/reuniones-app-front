import {
  PageTitle,
  PageWrapper,
} from "@/shared/components/layout/page-wrapper";
import ActaView from "../../../../components/acta-view";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageWrapper>
      <ActaView id={id} />
    </PageWrapper>
  );
}
