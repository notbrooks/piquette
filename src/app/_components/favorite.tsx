"use client";

import { useState } from "react";
import { toast } from "~/hooks/use-toast"

import Column from "~/components/templates/column";
import { FormComponent, AlertComponent, HeaderComponent, ListComponent } from "~/components/common";

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
    <Column>
      <HeaderComponent title="Favorites" />

      {AllFavorites && AllFavorites.length > 0 ? (
        <ListComponent data={AllFavorites} />
      ) : (
        <AlertComponent type={"info"} icon={false} title={"No Saved Favorites"}/>
      )}


      <FormComponent object={object} type={type} onSubmit={handleFormSubmit} />

    </Column>
  );
}
