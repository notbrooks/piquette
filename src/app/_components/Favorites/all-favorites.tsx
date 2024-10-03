"use client";

import { AlertComponent, ListComponent } from "~/components/common";

import { api } from "~/trpc/react";
import React from "react";

interface AllFavoritesProps {
  userId: string
}
export function AllFavorites({ userId }: AllFavoritesProps) {
  const [AllFavorites] = api.favorite.getAll.useSuspenseQuery();

  return (
    <>
      {AllFavorites && AllFavorites.length > 0 ? (
        <ListComponent data={AllFavorites} />
      ) : (
        <AlertComponent type={"info"} icon={false} title={"No Saved Favorites"}/>
      )}
    </>
  );
}
