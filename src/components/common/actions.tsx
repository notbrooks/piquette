"use client"
import * as React from "react";
import { useState } from "react";
import { api } from "~/trpc/react";

import { cn } from "~/lib/utils";

import { useMediaQuery } from 'usehooks-ts';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import {toast} from "~/hooks/use-toast";

import { Button, ButtonProps } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "~/components/ui/dialog";




const handleShare = (currentId: number, currentKey: string, currentType: string, currentObject: string, currentLabel: string) => {
    alert('share');
};

const handleHide = (currentId: number, currentKey: string, currentType: string, currentObject: string, currentLabel: string) => {
    toast({
        variant: "default",
        title: `${currentObject} has been added to your archive`,
    });
};

const handleEdit = (currentId: number, currentKey: string, currentType: string, currentObject: string, currentLabel: string) => {
    console.log('edit'); // Replace alert with console.log for debugging

}

const handleFavorite = async (currentId: number, currentKey: string, currentType: string, currentObject: string, currentLabel: string) => {
    
    toast({
        variant: "default",
        title: `${currentObject} has been added to your favorites`,
    });
};

interface ActionsComponentProps {
    actions: Array<"share" | "hide" | "edit" | "remove" | "favorite">;
    data: {
        id: number
        key: string;
        object: string;
        type: string;
        label: string;
    }
}

export default function ActionsComponent({ actions, data }: ActionsComponentProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentAction, setCurrentAction] = useState<string | null>(null);
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const [currentType, setCurrentType] = useState<string | null>(null);
    const [currentObject, setCurrentObject] = useState<string | null>(null);
    const [currentLabel, setCurrentLabel] = useState<string | null>(null);

    const removeFavoriteMutation = api.favorite.remove.useMutation();

    const removeFavorite = async (params: { id: number; key: string; type: string; object: string; }) => {
        return await removeFavoriteMutation.mutateAsync(params);
    };

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (actions.length === 0) return null;

    const handleRemove = async () => {
        try {
          const result = await removeFavorite({
            id: currentId!,
            key: currentKey!,
            type: currentType!,
            object: currentObject!,
          });
      
          // Use `toast` to notify user of success
          toast({
            variant: "default",
            title: `Successfully removed ${currentObject}`,
          });
      
          // Close the dialog or update state as needed
          setOpenDialog(false);
      
        } catch (error) {
          // Handle the error if it occurs
          console.error("Error occurred while removing the item:", error);
          
          // Display an error toast or UI feedback
          toast({
            variant: "destructive",
            title: `Failed to remove ${currentObject}`,
          });
        }
      };

    const handleActionClick = (action: string, data: {
        id: number,
        key: string,
        object: string,
        type: string,
        label: string
    }) => {
        setCurrentAction(action);
        setCurrentId(data.id);
        setCurrentKey(data.key);
        setCurrentObject(data.object);
        setCurrentType(data.type);
        setCurrentLabel(data.label);
        
        if (action === 'remove') {
            setOpenDialog(true);
        } else if (action === 'share') {
            setOpenDialog(true);
        } else if (action === 'hide') {
            // handleRemove(data.type, data.id);
            setOpenDialog(true);
        } else {
            setOpenDialog(false);
            if (action === 'favorite') {
                handleFavorite(data.id, data.key, data.type, data.object, data.label);
            } else if (action === 'share') {
                handleShare(data.id, data.key, data.type, data.object, data.label);
            } else if (action === 'edit') {
                handleEdit(data.id, data.key, data.type, data.object, data.label);
            } else if (action === 'edit') {
                handleEdit(data.id, data.key, data.type, data.object, data.label);
            }
        }
    };
      
    const getDialogDescription = (action: string, data: { id: number; key: string; type: string; object: string, label: string  }): string => {
        switch (action) {
            case 'remove': return `Are you sure you want to remove ${data.object}?`;
            case 'share': return `TODO: Share Panel`;
            case 'hide': return `Hide this ${data.object}?`;
            case 'edit': return 'Edit this favorite';
            default: return '';
        }
    }
    
    const getDialogButtons = (action: string, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, data: { id: number; key: string; type: string; object: string, label: string  }) => {
        switch (action) {
            case 'remove':
                return (
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        {/* <Button variant="destructive" onClick={ () => { 
                            handleRemove(); 
                            setOpenDialog(false); 
                        }}>Remove</Button> */}
                        <Button
                            variant="destructive"
                            onClick={async () => {
                                await handleRemove();
                                setOpenDialog(false);
                            }}
                        >Remove</Button>
                    </DialogFooter>
                );
        // Add cases for 'share', 'hide', and 'edit' as needed
            case 'share': return (
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="default" onClick={() => { handleShare(data.id, data.key, data.type, data.object, data.label); setOpenDialog(false); }}>Share</Button>
                </DialogFooter>
            );
            case 'hide': return (
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={() => { handleHide(data.id, data.key, data.type, data.object, data.label); setOpenDialog(false); }}>Hide</Button>
                </DialogFooter>
            );
            case 'edit': return <Button variant="default">Edit</Button>;
            default: return <></>;
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {actions.map((action, idx) => (
                        <DropdownMenuItem key={idx}>
                            <a
                                onClick={() => handleActionClick(action, { 
                                    id: data.id, 
                                    key: data.key, 
                                    object: data.object, 
                                    type: data.type, 
                                    label: data.label
                                 })}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 capitalize"
                            >
                                {action as unknown as string}
                            </a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentAction}</DialogTitle>
                        <DialogDescription>{getDialogDescription(currentAction ?? "", { id: data.id, key: data.key, type: data.type, object: data.object, label: data.label })}</DialogDescription>
                    </DialogHeader>
                    {getDialogButtons(currentAction ?? "", setOpenDialog, { id: data.id, key: data.key, object: data.object, type: data.type, label: data.label })}
                </DialogContent>
            </Dialog>
        </>
    );
}

function removeFavorite(data: { id: string; key: string; type: string; object: string }): Promise<any> {
    // Your logic here (like making an API call) that returns a Promise
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation
      setTimeout(() => {
        resolve("Removed successfully");
      }, 1000);
    });
  }
  
// function getDialogDescription(action: string, data: { id: number; key: string; type: string; object: string, label: string  }): string {
//     switch (action) {
//         case 'remove': return `Are you sure you want to remove ${data.object}?`;
//         case 'share': return `TODO: Share Panel`;
//         case 'hide': return `Hide this ${data.object}?`;
//         case 'edit': return 'Edit this favorite';
//         default: return '';
//     }
// }

// function getDialogButtons(action: string, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, data: { id: number; key: string; type: string; object: string, label: string  }) {
//     switch (action) {
//         case 'remove': return (
//             <DialogFooter>
//                 <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
//                 <Button variant="destructive" onClick={async () => { await handleRemove(); setOpenDialog(false); }}>Remove</Button>
//             </DialogFooter>
//         );
//     // Add cases for 'share', 'hide', and 'edit' as needed
//         case 'share': return (
//             <DialogFooter>
//                 <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
//                 <Button variant="default" onClick={() => { handleShare(data.id, data.key, data.type, data.object, data.label); setOpenDialog(false); }}>Share</Button>
//             </DialogFooter>
//         );
//         case 'hide': return (
//             <DialogFooter>
//                 <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
//                 <Button variant="destructive" onClick={() => { handleHide(data.id, data.key, data.type, data.object, data.label); setOpenDialog(false); }}>Hide</Button>
//             </DialogFooter>
//         );
//         case 'edit': return <Button variant="default">Edit</Button>;
//         default: return <></>;
//     }
// }

