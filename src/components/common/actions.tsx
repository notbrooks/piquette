"use client"
import * as React from "react"
 
import { cn } from "~/lib/utils"
import { useMediaQuery } from 'usehooks-ts'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'


import { Button, ButtonProps } from "~/components/ui/button"
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
        <Menu as="div" className="relative flex-none">
            <MenuButton className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <Button variant="ghost" size="sm">
                    <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                </Button>
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                {actions.map((item, idx) => (
                    <MenuItem key={idx}>
                        <a
                            onClick={() => {
                                if (item === 'remove') <DialogComponent open={openDialog} onOpenChange={setOpenDialog} />
                                if (item === 'share' || item === 'hide' || item === 'edit') setOpen(true);
                            }}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 capitalize"
                        >
                            {item as unknown as string}
                        </a>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>

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
