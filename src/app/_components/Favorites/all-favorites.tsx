"use client";
import { api } from "~/trpc/react";
import React from "react";
import moment from 'moment'
import { cn } from "~/lib/utils";


import { AlertComponent, ActionsComponent } from "~/components/common";
import { ListContainer, ListItem } from "~/components/templates/list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"


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

  // Group the data by 'type'
  const groupByType = (AllFavorites: Favorite[]) => {
    return AllFavorites.reduce((acc: { [key: string]: Favorite[] }, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type]!.push(item);
      return acc;
    }, {} as { [key: string]: Favorite[] });
  };
  const groupedData = groupByType(AllFavorites);

  if (AllFavorites && Object.keys(groupedData).length === 1) {
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
              <ActionsComponent actions={['remove']}/>
            </div>            

          </ListItem>
        ))}
      </ListContainer>
    );
  }
      
  return (
    <Tabs defaultValue={Object.keys(groupedData)[0]} className="shadcn-tabs">
      <TabsList className="grid w-full grid-cols-2">
        {Object.keys(groupedData).map((type, idx) => (
          <TabsTrigger key={type} value={type}>
            {type}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.keys(groupedData).map((type) => (
        <TabsContent key={type} value={type}>
          <ListContainer>
            {groupedData[type]?.map((item) => (
              <ListItem key={item.id}>
                <div className="min-w-0 px-5">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.object}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p className="whitespace-nowrap">
                      Created: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                    <ActionsComponent actions={['remove']}/>
                </div>
              </ListItem>
            )) || null}
          </ListContainer>
        </TabsContent>
      ))}
    </Tabs>
  );
}

