"use client"

// DialogComponent.tsx
import { type FC } from 'react';
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogDescription } from '~/components/ui/dialog'

import { Button } from "~/components/ui/button"

interface DialogComponentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: () => void;
  action: string | null;
  label: string | null;
  uuid: string | null;
  object: string | null;
}

const DialogComponent: FC<DialogComponentProps> = ({ isOpen, setIsOpen, handleSubmit, action, label, uuid, object }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">{action} {object}</DialogTitle>
          <DialogDescription>Your description goes here.</DialogDescription>
        </DialogHeader>
        <div>
            {label}
        </div>
        <DialogClose onClick={() => setIsOpen(false)}>Close</DialogClose>
        <Button className="btn btn-primary" variant={action === 'hide' ? 'destructive' : 'default'} onClick={() => {setIsOpen(false), handleSubmit()}}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;