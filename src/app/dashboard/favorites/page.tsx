

import { currentUser } from '@clerk/nextjs/server'
import { api, HydrateClient } from "~/trpc/server";
import { AllFavorites } from "~/app/_components/favorite";
export default async function Home() {
  
  const hello = await api.favorite.hello({ text: "from Piquette" });

  void api.favorite.getAll.prefetch();
  const user = await currentUser()

  if (!user) return <div>This is an authenticated route</div>

  return (
    <HydrateClient>    
      <AllFavorites userId={user.id} />
    </HydrateClient>
  );
}
