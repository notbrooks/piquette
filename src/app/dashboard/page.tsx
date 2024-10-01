
import { AllFavorites } from "~/app/_components/favorite";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.favorite.hello({ text: "from Piquette" });

  void api.favorite.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">Piquette</span> Dashboard
          </h1>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>

          <AllFavorites />
        </div>
      </main>
    </HydrateClient>
  );
}
