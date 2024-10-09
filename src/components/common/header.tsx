"use client" 
import React from "react"
import { useState } from "react"

import Link from "next/link"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"


interface CustomFormProps {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Action {
    label: string
    type: "dialog" | "link"
    Form: React.ReactNode
}

interface HeaderComponentProps {
    title: string
    description?: string
    actions?: Action[]
}
export default function HeaderComponent({ title, description, actions }: HeaderComponentProps) {
    const [openDialog, setDialogOpen] = useState(false)
    return (
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-light leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {description}
            </p>
          )}    
        </div>
        { actions && actions.length > 0 && <div className="mt-4 flex md:ml-4 md:mt-0 justify-end sm:justify-end">
          {actions.map((item, idx) => (
            <div key={idx}>
              {item.type === "dialog" && 
                <Dialog open={openDialog} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
                      {item.label}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.label}</DialogTitle>    
                    </DialogHeader>
                    <DialogDescription>
                      {item.Form && React.isValidElement(item.Form) ? React.cloneElement(item.Form, { setDialogOpen } as CustomFormProps) : null}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              }
              {item.type === "link" &&
                <Link href={""} passHref>
                  <Button variant="outline" size="sm">
                    {item.label}
                  </Button>
                </Link>
              }
            </div>
          ))}
        </div> }
        
        
      </div>
    )
}
