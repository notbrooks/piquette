"use client";

import { useState } from "react";
import { toast } from "~/hooks/use-toast"

import { FormComponent } from "~/components/common";

import { api } from "~/trpc/react";

interface FavoriteFormProps {
  userId: string
}
export function FavoriteForm({ userId }: FavoriteFormProps) {
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
    <FormComponent object={object} type={type} onSubmit={handleFormSubmit} />
  );
}
