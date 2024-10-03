

import { currentUser } from '@clerk/nextjs/server'
import { api, HydrateClient } from "~/trpc/server";
import Column from "~/components/templates/column";
import { HeaderComponent } from "~/components/common";

export default async function HomePage() {
  
  const user = await currentUser()

  if (!user) return <div>This is an authenticated route</div>

  return (
    <HydrateClient>
      <Column>
        <HeaderComponent title="Dashboard" />
      </Column>
    </HydrateClient>
  );
}
