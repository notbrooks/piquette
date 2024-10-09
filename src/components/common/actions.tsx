"use client"
import * as React from "react";

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
import { useState } from "react";

interface ActionsComponentProps {
    actions: Array<"share" | "hide" | "edit" | "remove" | "favorite">;
}

const handleRemove = () => {
    toast({
        variant: "default",
        title: "Your favorite has been removed",
      });
};

const handleShare = () => {
    alert('share');
};

const handleHide = () => {
    alert('hide');
};

const handleEdit = () => {
    alert('edit');
};

const handleFavorite = () => {
    alert('favorite');
};

export default function ActionsComponent({ actions }: ActionsComponentProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentAction, setCurrentAction] = useState<string | null>(null);

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (!actions || actions.length === 0) return null;



    const handleActionClick = (action: string) => {
        setCurrentAction(action);
        if (action === 'favorite') {
            handleRemove()
            setOpenDialog(false);
        } else {
            setOpenDialog(true);
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
                                onClick={() => handleActionClick(action)}
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
                        <DialogDescription>{getDialogDescription(currentAction || "")}</DialogDescription>
                    </DialogHeader>
                    {getDialogButtons(currentAction || "", setOpenDialog)}
                </DialogContent>
            </Dialog>
        </>
    );
}

function getDialogDescription(action: string): string {
    switch (action) {
        case 'remove': return 'Are you sure you want to remove this favorite?';
        case 'share': return 'Share this favorite with others';
        case 'hide': return 'Hide this favorite from others';
        case 'edit': return 'Edit this favorite';
        default: return '';
    }
}

function getDialogButtons(action: string, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>) {
    switch (action) {
        case 'remove': return (
            <DialogFooter>
                <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button variant="destructive" onClick={() => { handleRemove(); setOpenDialog(false); }}>Remove</Button>
            </DialogFooter>
        );
    // Add cases for 'share', 'hide', and 'edit' as needed
        case 'share': return <Button variant="default">Share</Button>;
        case 'hide': return <Button variant="default">Hide</Button>;
        case 'edit': return <Button variant="default">Edit</Button>;
        default: return <></>;
    }
}