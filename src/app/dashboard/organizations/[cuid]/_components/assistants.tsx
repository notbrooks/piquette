"use client"
import { useState } from "react";
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const utils = api.useUtils();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setError] = useState<Record<string, string>>({});
    const [isVisible, setVisiblePanel] = useState('default');

    const { data, isError, isLoading: queryLoading } = api.assistant.getByOrganization.useQuery(
        { parent_id: organization.id, parent_type: "organization" }
    );

    const assistantFormConfig = {
        headline: "Assistant Form",
        description: "Create a new assistant for your organization",
        button: <Button variant="outline" onClick={() => setVisiblePanel("default")}>Cancel</Button>,
        fields: [
            [
                { label: "Name", type: "text", name: "name", required: true, placeholder: "Enter the name of your assistant" },
            ],
            [
                { label: "Description", type: "text", name: "description", required: false, placeholder: "Describe your assistant.  This will help with creating the prompt." },
            ],
            [
                { label: "Type", type: "select", name: "type", required: true, options: [
                    {label: "Assistant", value: "assistant"},
                    {label: "Marketing Manager", value: "marketing manager"},
                    {label: "Sales Manager", value: "sales manager"},
                    {label: "Account Manager", value: "account manager"},
                    {label: "Finance Manager", value: "finance manager"},
                    {label: "HR Manager", value: "hr manager"},
                    {label: "IT Manager", value: "it manager"},
                    {label: "Coach", value: "coach"},
                    {label: "Tutor", value: "tutor"}
                ] },
            ],
            [
                { label: "Prompt", type: "textarea", name: "prompt", required: true,
                    autocomplete: {
                        type: "openai",
                        mode: "complete",
                        prompt: "You are a prompt generator. Please provide a prompt for the assistant."
                    }
                 },
            ]
        ],
        buttons: [
            { label: "Reset", type: "reset", variant: "ghost" },
            { label: "Save", type: "submit", variant: "default" }
        ]
    }

    const createAssistantMutation = api.assistant.create.useMutation({
        onSuccess: async () => {
            // Switch back to the default view
            setVisiblePanel('default')

            toast({
                variant: "default",
                title: "Assistant Created",
                description: "Your assistant has been created successfully!",
            });

            // Invalidate queries or perform other actions on success
            try {
                await utils.assistant.invalidate(); // Await the invalidate query operation
            } catch (invalidateError) {
                console.error("Failed to invalidate cache:", invalidateError);
        }
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                title: "Failed to Create Business",
                description: err.message,
            });
            setError({ message: err.message });
        },
    });

    const handleFormSubmit = async (values: Record<string, unknown>) => {
        if (!profile || !profile.id) {
            console.error("Profile not found");
            return;
        }
    
        setIsLoading(true);
        try {
            // Mutate the business and get the returned record
            const newAssistant = await createAssistantMutation.mutateAsync({
                profile: profile.id as unknown as number,
                parent_id: organization.id as number,
                parent_type: 'organization',
                name: values.name as string,
                type: values.type as string,
                description: values.description as string,
                prompt: values.prompt as string,
                
            });
    
            // Add the new business record to the rows
            // setRows((prevRows) => [newBusiness, ...prevRows]);
    
            
        } catch (err) {
            console.error("Error creating business:", err);
            setError({ message: "An error occurred while submitting the form." });
        } finally {
            setVisiblePanel('create');
        }
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

    console.log(data);
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
                { label: "Token", accessorKey: "token", sort: false},
                { label: "Type", accessorKey: "type", sort: true },
                { label: "Created At", accessorKey: "createdAt", sort: true },
            ]}
            button={
                <Button variant="default" onClick={() => setVisiblePanel("create")}>
                    <CirclePlus className="h-4 w-4" />
                    New Assistant
                </Button>
            }
            data={data ?? []}
            actions={["pin", "delete"]}
        />
    )
}
