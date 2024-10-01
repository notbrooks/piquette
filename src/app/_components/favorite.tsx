"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

// export function AllFavorites() {
//   const [favorites] = api.favorite.getAll.useSuspenseQuery();

//   return (
//     <div className="w-full max-w-xs">
//       {favorites ? (
//         <p className="truncate">Your favorites: {favorites.type}</p>
//       ) : (
//         <p>You have no favorites yet.</p>
//       )}
//     </div>
//   );
// }

interface AllFavoritesProps {
  userId: string
}
export function AllFavorites({ userId }: AllFavoritesProps) {
  const [AllFavorites] = api.favorite.getAll.useSuspenseQuery();

  const utils = api.useUtils();
  const [object, setObject] = useState("");
  const [type, setType] = useState("");
  const createFavorite = api.favorite.create.useMutation({
    onSuccess: async () => {
      await utils.favorite.invalidate();
      setObject("");
      setType("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {AllFavorites ? (
        <p className="">Your most recent Favorites: {JSON.stringify(AllFavorites)}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createFavorite.mutate({
            object, type,
            createdBy: userId,
            updatedBy: userId          });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Object"
          value={object}
          onChange={(e) => setObject(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createFavorite.isPending}
        >
          {createFavorite.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
