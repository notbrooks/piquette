"use client"
import * as React from "react";
import { useState } from "react";
import { api } from "~/trpc/react";

import { cn } from "~/lib/utils";

import { useMediaQuery } from 'usehooks-ts';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import { toast } from "~/hooks/use-toast";

import { Button } from "~/components/ui/button";
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

// Helper functions
const handleShare = (currentId: number, currentKey: string, currentType: string, currentObject: string, currentLabel: string) => {
    alert('Share');
};

const handleHide = (currentObject: string) => {
    toast({
        variant: "default",
        title: `${currentObject} has been added to your archive`,
    });
};

const handleEdit = (currentObject: string) => {
    console.log(`Edit ${currentObject}`); // Placeholder for edit logic
}

const handleFavorite = async (currentObject: string) => {
    toast({
        variant: "default",
        title: `${currentObject} has been added to your favorites`,
    });
};

// Component props interface
interface ActionsComponentProps {
    actions: Array<"share" | "hide" | "edit" | "remove" | "favorite">;
    data: {
        id: number;
        key: string;
        object: string;
        type: string;
        label: string;
    };
}

export default function ActionsComponent({ actions, data }: ActionsComponentProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentAction, setCurrentAction] = useState<string | null>(null);
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const [currentType, setCurrentType] = useState<string | null>(null);
    const [currentObject, setCurrentObject] = useState<string | null>(null);

    const removeFavoriteMutation = api.favorite.remove.useMutation();

    const removeFavorite = async (params: { id: number; key: string; type: string; object: string }) => {
        try {
            await removeFavoriteMutation.mutateAsync(params);
            console.log("Favorite removed successfully");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error removing favorite:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleRemove = async () => {
        if (currentId && currentKey && currentType && currentObject) {
            try {
                await removeFavorite({ id: currentId, key: currentKey, type: currentType, object: currentObject });
                toast({
                    variant: "default",
                    title: `Successfully removed ${currentObject}`,
                });
                setOpenDialog(false);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error during removal:", error.message);
                } else {
                    console.error("Unexpected error during removal:", error);
                }
            }
        }
    };

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleActionClick = (action: string, data: { id: number, key: string, object: string, type: string, label: string }) => {
        setCurrentAction(action);
        setCurrentId(data.id);
        setCurrentKey(data.key);
        setCurrentObject(data.object);
        setCurrentType(data.type);

        if (action === 'remove' || action === 'share' || action === 'hide') {
            setOpenDialog(true);
        } else {
            setOpenDialog(false);
            if (action === 'favorite') {
                void handleFavorite(data.object); // Explicitly ignore promise
            } else if (action === 'share') {
                handleShare(data.id, data.key, data.type, data.object, data.label);
            } else if (action === 'edit') {
                handleEdit(data.object);
            }
        }
    };

    const getDialogDescription = (action: string): string => {
        switch (action) {
            case 'remove': return `Are you sure you want to remove ${currentObject}?`;
            case 'share': return `TODO: Share Panel`;
            case 'hide': return `Hide this ${currentObject}?`;
            case 'edit': return 'Edit this favorite';
            default: return '';
        }
    };

    const getDialogButtons = (action: string) => {
        switch (action) {
            case 'remove':
                return (
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button
                            variant="destructive"
                            onClick={async () => {
                                await handleRemove();
                                setOpenDialog(false);
                            }}
                        >Remove</Button>
                    </DialogFooter>
                );
            case 'share':
                return (
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button variant="default" onClick={() => setOpenDialog(false)}>Share</Button>
                    </DialogFooter>
                );
            case 'hide':
                return (
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => setOpenDialog(false)}>Hide</Button>
                    </DialogFooter>
                );
            default:
                return null;
        }
    };

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
                                className="block px-3 py-1 text-sm leading-6 text-gray-900 capitalize"
                            >
                                {action}
                            </a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentAction}</DialogTitle>
                        <DialogDescription>{getDialogDescription(currentAction ?? "")}</DialogDescription>
                    </DialogHeader>
                    {getDialogButtons(currentAction ?? "")}
                </DialogContent>
            </Dialog>
        </>
    );
}