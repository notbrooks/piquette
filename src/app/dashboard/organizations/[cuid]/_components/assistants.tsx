import { useState } from "react";
import { Profile, Organization } from "~/types";
import { TableComponent } from "~/components/common/Table"
import { type FormDefinition, FormComponent } from "~/components/common/Form"

import { toast } from "~/hooks/use-toast"
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
import { Form } from "react-hook-form";

interface AssistantsProps {
    profile: Profile;
    organization: Organization;
}



export default function Assistants( { profile, organization }: AssistantsProps) {
    const [isVisible, setVisiblePanel] = useState('default');

    const assistantFormConfig = {
        headline: "Assistant Form",
        description: "Create a new assistant for your organization",
        button: <Button variant="outline" onClick={() => setVisiblePanel("default")}>Cancel</Button>,
        fields: [
            [
                { label: "Name", type: "text", name: "name", required: true, placeholder: "Enter the name of your assistant" },
            ],
            [
                { label: "Type", type: "select", name: "type", required: true, options: [{ label: "Invoice", value: "invoice" }, { label: "Quote", value: "quote" }] },
            ],
            [
                { label: "Prompt", type: "textarea", name: "prompt", required: true, placeholder: "Enter the prompt for the assistant" },
            ]
        ],
        buttons: [
            { label: "Reset", type: "reset", variant: "ghost" },
            { label: "Save", type: "submit", variant: "default" }
        ]
    }

    const handleFormSubmit = (data: Record<string, unknown>) => {
        toast({
            variant: "default",
            title: "Assistant Created",
            description: JSON.stringify(data, null, 2),
        });
        setVisiblePanel('default');
    };

    if (!profile || !organization) return "Loading...";

    if (isVisible === 'create') {
        return (
            <div>
                <FormComponent formConfig={assistantFormConfig as FormDefinition} onSubmit={handleFormSubmit} isFormLoading={false} />
            </div>
        )
    }

    if (isVisible === 'detail') {
        return (
            <div>
                <Button variant="outline" onClick={() => setVisiblePanel('default')}>Cancel</Button>
                DETAIL
            </div>
        )
    }
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
                    path: "/dashboard/assistants/:cuid", // Path with placeholder
                    },
                },
                { label: "Type", accessorKey: "type", sort: false },
                { label: "Created At", accessorKey: "created_at", sort: true },
            ]}
            button={
                <Button variant="default" onClick={() => setVisiblePanel("create")}>
                    <CirclePlus className="h-4 w-4" />
                    New Assistant
                </Button>
            }
            data={[
              {name: "Assistant 1", type: "Invoice", created_at: "2023-01-01"},
              {name: "Assistant 2", type: "Invoice", created_at: "2023-01-01"},
              {name: "Assistant 3", type: "Invoice", created_at: "2023-01-01"},
            ]}
            actions={["pin", "favorite", "like", "dislike", "archive", "delete", "share","download", "export", "print"]}
        />
    )
}

// stub out a component for the assistant table
// stub out a component for the assistant form
// stub out a component for the assistant detail