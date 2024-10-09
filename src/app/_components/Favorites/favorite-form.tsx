"use client";

import { useState } from "react";
import { toast } from "~/hooks/use-toast"

import { FormComponent } from "~/components/common";

import { api } from "~/trpc/react";

interface FavoriteFormProps {
  userId: string
  setDialogOpen?: (open: boolean) => void; // Add this line
}
export function FavoriteForm({ userId, setDialogOpen }: FavoriteFormProps) {
  const utils = api.useUtils();
  const [object, setObject] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  

  const createFavorite = api.favorite.create.useMutation({
    onSuccess: async () => {
      await utils.favorite.invalidate();
      
      setDialogOpen?.(false); // Close the dialog here
      
      toast({
        variant: "default",
        title: "Your favorite has been created",
      });

    },
  });

  const handleFormSubmit = async (data: { object: string; type: string }) => {
    void createFavorite.mutateAsync({
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
