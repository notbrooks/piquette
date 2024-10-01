

import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const RestResponse = await api.rest.get(
    {
      url: "https://cdn.contentful.com/spaces/3lo7q5ucxiwp/environments/master/entries/1wIAnTvZaIj4KXikSW06rd",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer qXLJSqiXVc7TT-XiIYKMDdHTE77LhbZmTooj3M-shEU",
      },
    },
  );

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          
          {JSON.stringify(RestResponse)}
        </div>
      </main>
    </HydrateClient>
  );
}
