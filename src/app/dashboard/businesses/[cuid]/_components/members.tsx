import { TableComponent } from "~/components/common/Table"
import type { Profile, Business } from "~/types";

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
import { CirclePlus } from "lucide-react";

interface MembersProps {
    profile: Profile;
    business: Business;
}
    
export default function Members({ profile, business }: MembersProps) {
    return (
        // <TableComponent
        //     data={[]}
        //     button={
        //         <Dialog>
        //         <DialogTrigger asChild>
        //           <Button variant="default" size="sm">Invite Member</Button>
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
        //         bulkActions: false,
        //         columns: [
        //             {
        //                 label: "Name",
        //                 accessorKey: "name",
        //                 sort: true,
        //                 helper: {
        //                     type: "link",
        //                     path: "/dashboard/businesses/:cuid", // Path with placeholder
        //                 },
        //             },
        //             { label: "Status", accessorKey: "status", sort: true },
        //             { label: "Created", accessorKey: "created_at", sort: true },
        //         ],
        //     }}
        // />
        <TableComponent
            bulkActions={false}
            filter={{
                accessorKey: "name",
                placeholder: "Filter names..."
            }}
            columns={[
                {
                    label: "Name",
                    accessorKey: "name",
                    sort: true,
                    helper: {
                    type: "link",
                    path: "/dashboard/businesses/:cuid", // Path with placeholder
                    },
                },
                { label: "Status", accessorKey: "status", sort: false },
                { label: "Created At", accessorKey: "createdAt", sort: true },
            ]}
            button={
              <Dialog>
                  <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                      <CirclePlus className="h-4 w-4" />
                      New Member
                  </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                      <DialogTitle>New Member</DialogTitle>
                      <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
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
                {
                    name: "John Doe",
                    status: "Active",
                    createdAt: "2023-01-01",
                },
                {
                    name: "Jane Doe",
                    status: "Inactive",
                    createdAt: "2023-02-02",
                },
                {
                    name: "Bob Smith",
                    status: "Active",
                    createdAt: "2023-03-03",
                },
            ]}
            
        />
    );
}