import { currentUser } from '@clerk/nextjs/server'
import { api, HydrateClient } from "~/trpc/server";

import Column from "~/components/templates/column";
import { HeaderComponent } from "~/components/common";

export default async function DashboardPage() {
  const user = await currentUser()

  const RestResponse = await api.rest.get(
    {
      url: "https://66e4a6bed2405277ed14edcb.mockapi.io/List",
      headers: {
        "Content-Type": "application/json",
        
      },
    },
  );

  if (!user) return <div>This is an authenticated route</div>

  return (
    <HydrateClient>
      <Column>
        <HeaderComponent title="Dashboard" />
        {JSON.stringify(RestResponse, null, 2)}
      </Column>
    </HydrateClient>
  );
}
