import {TableComponent} from "~/components/common/Table"

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
export default function Jobs() {
    return (
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
                        New Job
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Job</DialogTitle>
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
                    id: 1,
                    name: "Job 1",
                    status: "Active",
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    name: "Job 2",
                    status: "Inactive",
                    createdAt: new Date(),
                },
                {
                    id: 3,
                    name: "Job 3",
                    status: "Pending",
                    createdAt: new Date(),
                },
            ]}
            
        />
    );
}