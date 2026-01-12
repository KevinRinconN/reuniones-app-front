import { status } from "@/app/(context)/(auth)/actions/status";
import { getSession } from "@/app/(context)/(auth)/lib/session";
import { PageWrapper } from "@/shared/components/layout/page-wrapper";

export default async function LoginPage() {
  let session = await getSession();
  let user = await status();
  return (
    <PageWrapper>
      Clientes
      <pre className="max-w-xl w-full bg-muted p-4 text-sm whitespace-pre-wrap break-all overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
      {user && (
        <pre className="max-w-xl w-full bg-muted p-4 text-sm whitespace-pre-wrap break-all overflow-x-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </PageWrapper>
  );
}
