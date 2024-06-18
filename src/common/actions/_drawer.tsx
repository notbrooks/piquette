"use client"
import { type FC } from 'react';
import { useMediaQuery } from 'usehooks-ts'

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "~/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
} from "~/components/ui/drawer"

import { Card, CardContent } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"

interface DrawerComponentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: () => void;
  action: string | null;
  label: string | null;
  uuid: string | null;
  object: string | null;
}

const DrawerComponent: FC<DrawerComponentProps> = ({ isOpen, setIsOpen, handleSubmit, action, label, uuid, object }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="capitalize">{action} {object}</DialogTitle>
                    </DialogHeader>
                    <Card className="border-none">
                        
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" type="text" className="w-full" defaultValue="" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                    id="message"
                                    defaultValue=""
                                    className="min-h-32"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <DialogFooter className="flex">
                        <Button variant={action === 'hide' ? 'destructive' : 'default'} onClick={() => {setIsOpen(false), handleSubmit()}}>Send</Button>
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DialogTitle className="capitalize">{action} {object}</DialogTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <div>
                    <Card className="border-none">
                        
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" type="text" className="w-full" defaultValue="" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                    id="message"
                                    defaultValue=""
                                    className="min-h-32"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <DrawerFooter className="flex">
                    <Button variant={action === 'hide' ? 'destructive' : 'default'} onClick={() => {setIsOpen(false), handleSubmit()}}>Send</Button>
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                </DrawerFooter>
                
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerComponent;