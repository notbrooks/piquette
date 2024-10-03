"use client";
import { api } from "~/trpc/react";
import React from "react";
import moment from 'moment'


import { AlertComponent, ActionsComponent } from "~/components/common";
import { ListContainer, ListItem } from "~/components/templates/list";


interface AllFavoritesProps {
  userId: string;
}

interface Favorite {
  object: string;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  cuid: string;
  type: string;
  createdBy: string;
  updatedBy: string;
  archivedAt: Date | null;
  archivedBy: string | null;
}

export function AllFavorites({ userId }: AllFavoritesProps) {
  const [AllFavorites] = api.favorite.getAll.useSuspenseQuery();

  if (!AllFavorites || AllFavorites.length === 0) {
    return (
      <AlertComponent type={"info"} icon={false} title={"No Saved Favorites"} />
    );
  }

  return (
    <ListContainer>
      {AllFavorites.map((item: Favorite) => (
        <ListItem key={item.id}>

          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">{item.type}</p>
              <p
                className="mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
              >
                {item.object}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
              Created: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')} {/* Due on <time dateTime={item.createdAt}>{item.createdAt}</time> */}
              </p>
              {/* <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="truncate">Created by {item.createdBy}</p> */}
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <ActionsComponent />
          </div>
          

        </ListItem>
      ))}
    </ListContainer>
  );
}