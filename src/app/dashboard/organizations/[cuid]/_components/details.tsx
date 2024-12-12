import { useState } from "react";
import { toast } from "~/hooks/use-toast"
import { api } from "~/trpc/react";
import { piquetteConfig } from "~/app/config";

import { Profile, OrganizationBase } from "~/types";
import FormComponent from "~/components/common/Form/form";

interface DetailsProps {
    profile: Profile;
    organization: OrganizationBase;
}
export default function Details({ profile, organization }: DetailsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Record<string, string>>();
    
    const updateOrganizationMutation = api.organization.update.useMutation({
        onSuccess: async () => {
            toast({
                variant: "default",
                title: "Organization Updated",
                description: "Your organization has been updated successfully!",
            });
            setIsLoading(false);
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                title: "Failed to Update Organization",
                description: err.message,
            });
            setError({ message: err.message });
        },
    });
    
    const handleFormSubmit = async (data: Record<string, unknown>) => {
        if (!profile?.id) {
            console.error("Profile not found");
            return;
        }
    
        setIsLoading(true);
        try {
            // Mutate the organization and get the returned record
            const updatedOrganization = await updateOrganizationMutation.mutateAsync({
                id: organization.id,
                cuid: organization.cuid,
                name: data.name as string,
                description: data.description as string,
                location: data.location as string,
                url: data.url as string,
                industry: data.industry as string,
            });
    
            // Add the updated organization record to the rows
            
        } catch (err) {
            console.error("Error updating organization:", err);
            setError({ message: "An error occurred while updating the organization." });
        } finally {
            setIsLoading(false);
        }
    };

    return (    
        <FormComponent
            formConfig={{
                fields: [
                    [
                        { label: "Name", type: "text", name: "name", required: true, placeholder: "Enter the name of your organization" },
                        { label: "Location", type: "text", name: "location", required: true, placeholder: "City & State" },
                    ],
                    [
                        { label: "Website", type: "text", name: "url", required: false },
                        {
                            label: "Industry", type: "select", name: "industry", required: true, options: piquetteConfig.app.industryOptions,
                        },
                    ],
                    [
                        {
                            label: "Description", type: "textarea", name: "description", required: true,
                        },
                    ]
                ],
                buttons: [
                    { label: "Save", type: "submit", variant: "default" }
                ],
            }}
            data={organization}
            onSubmit={handleFormSubmit}
            isFormLoading={isLoading}
        />
    );
}