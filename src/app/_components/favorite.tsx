"use client";

import { useState } from "react";
import { toast } from "~/hooks/use-toast"
import { FormComponent } from "~/components/common";

import { api } from "~/trpc/react";

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
      toast({
        variant: "default",
        title: "Your favorite has been created",
        
      });
    },
  });

  const handleFormSubmit = async (data: { object: string; type: string }) => {
    createFavorite.mutateAsync({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
    setObject("");
    setType("");
  };

  return (
    <div className="w-full">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Favorites
      </h1>

      {AllFavorites && AllFavorites.length > 0 ? (
        <p className="">Your most recent Favorites: {JSON.stringify(AllFavorites, null, 2)}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}


      <FormComponent object={object} type={type} onSubmit={handleFormSubmit} />

    </div>
  );
}
