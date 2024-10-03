import { api, HydrateClient } from "~/trpc/server";

import Column from "~/components/templates/column";
export default async function HomePage() {
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
      <Column>
        {JSON.stringify(RestResponse, null, 2)}
      </Column>
    </HydrateClient>
  );
}
