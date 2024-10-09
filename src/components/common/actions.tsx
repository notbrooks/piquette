"use client"
import * as React from "react"
 
import { cn } from "~/lib/utils"
import { useMediaQuery } from 'usehooks-ts'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'


import { Button, ButtonProps } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "~/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "~/components/ui/drawer"


interface ActionsComponentProps {
    actions: Array<"share" | "hide" | "edit" | "remove">
}


export default function ActionsComponent({ actions }: ActionsComponentProps) {
    const [open, setOpen] = React.useState(false)
    const [ openDialog, setOpenDialog ] = React.useState(false)

    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (!actions || actions.length === 0) return null;

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {actions.map((item, idx) => (
                    <DropdownMenuItem key={idx}>
                        <a
                            onClick={() => {
                                if (item === 'remove') <DialogComponent open={openDialog} onOpenChange={setOpenDialog} />
                                if (item === 'share' || item === 'hide' || item === 'edit') setOpen(true);
                            }}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 capitalize"
                        >
                            {item as unknown as string}
                        </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        {!isDesktop && (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>TITLE</DrawerTitle>
                        <DrawerDescription>
                            DESCRIPTION
                        </DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        )}

        { isDesktop && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>TITLE</DialogTitle>
                        <DialogDescription>
                            DESCRIPTION
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>TITLE</DialogTitle>
                    <DialogDescription>
                        DESCRIPTION
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

        </>
    )
}

interface DialogComponentProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}
function DialogComponent({ open, onOpenChange }: DialogComponentProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog Comoponent</DialogTitle>
                    <DialogDescription>
                        DESCRIPTION
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
