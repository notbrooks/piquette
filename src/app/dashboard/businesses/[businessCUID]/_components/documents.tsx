import { TableComponent } from "~/components/common/Table"
import type { Profile, BusinessBase } from "~/types";

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { CirclePlus } from "lucide-react"

    
export default function Documents() {
    return (
        // <TableComponent
        //     data={[
        //         {title: "Document 1", type: "Invoice", created_at: "2023-01-01"},
        //         {title: "Document 2", type: "Invoice", created_at: "2023-01-01"},
        //         {title: "Document 3", type: "Invoice", created_at: "2023-01-01"},
        //     ]}
        //     button={
        //         <Dialog>
        //         <DialogTrigger asChild>
        //           <Button variant="default" size="sm">Add Document</Button>
        //         </DialogTrigger>
        //         <DialogContent className="sm:max-w-[425px]">
        //           <DialogHeader>
        //             <DialogTitle>Edit profile</DialogTitle>
        //             <DialogDescription>
        //               Make changes to your profile here. Click save when you're done.
        //             </DialogDescription>
        //           </DialogHeader>
        //           <div className="grid gap-4 py-4">
        //             <div className="grid grid-cols-4 items-center gap-4">
        //               <Label htmlFor="name" className="text-right">
        //                 Name
        //               </Label>
        //               <Input
        //                 id="name"
        //                 defaultValue="Pedro Duarte"
        //                 className="col-span-3"
        //               />
        //             </div>
        //             <div className="grid grid-cols-4 items-center gap-4">
        //               <Label htmlFor="username" className="text-right">
        //                 Username
        //               </Label>
        //               <Input
        //                 id="username"
        //                 defaultValue="@peduarte"
        //                 className="col-span-3"
        //               />
        //             </div>
        //           </div>
        //           <DialogFooter>
        //             <Button type="submit">Save changes</Button>
        //           </DialogFooter>
        //         </DialogContent>
        //       </Dialog>
        //     }
        //     config={{
        //         bulkActions: true,
        //         columns: [
        //             {
        //                 label: "Title",
        //                 accessorKey: "title",
        //                 sort: true,
        //                 helper: {
        //                     type: "link",
        //                     path: "/dashboard/businesses/documents:cuid", // Path with placeholder
        //                 },
        //             },
        //             { label: "Type", accessorKey: "type", sort: true },
        //             { label: "Created", accessorKey: "created_at", sort: true },
        //         ],
        //     }}
        // />
        <TableComponent
            bulkActions={true}
            filter={{
                accessorKey: "title",
                placeholder: "Filter titles..."
            }}
            columns={[
                {
                    label: "Title",
                    accessorKey: "title",
                    sort: true,
                    helper: {
                    type: "link",
                    path: "/dashboard/businesses/:cuid", // Path with placeholder
                    },
                },
                { label: "Type", accessorKey: "type", sort: false },
                { label: "Created At", accessorKey: "created_at", sort: true },
            ]}
            button={
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">
                    <CirclePlus className="h-4 w-4" />
                    New Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>New Document</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            }
            data={[
              {title: "Document 1", type: "Invoice", created_at: "2023-01-01"},
              {title: "Document 2", type: "Invoice", created_at: "2023-01-01"},
              {title: "Document 3", type: "Invoice", created_at: "2023-01-01"},
            ]}
            actions={["pin", "favorite", "like", "dislike", "archive", "delete", "share","download", "export", "print"]}
        />
    );
}