import { useState } from "react";
import { toast } from "~/hooks/use-toast"
import { api } from "~/trpc/react";
import { piquetteConfig } from "~/app/_config";

import { Profile, BusinessBase } from "~/types";
import FormComponent from "~/components/common/Form/form";

interface DetailsProps {
    profile: Profile;
    business: BusinessBase;
}
export default function BusinessDetails({ profile, business }: DetailsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Record<string, string>>();
    
    const updateBusinessMutation = api.business.update.useMutation({
        onSuccess: async () => {
            toast({
                variant: "default",
                title: "Business Updated",
                description: "Your business has been updated successfully!",
            });
            setIsLoading(false);
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                title: "Failed to Update business",
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
            const updatedBusiness = await updateBusinessMutation.mutateAsync({
                id: business.id,
                cuid: business.cuid,
                name: data.name as string,
                description: data.description as string,
                location: data.location as string,
                url: data.url as string,
                industry: data.industry as string,
            });
    
            // Add the updated organization record to the rows
            
        } catch (err) {
            console.error("Error updating business:", err);
            setError({ message: "An error occurred while updating the business." });
        } finally {
            setIsLoading(false);
        }
    };

    return (    
        <FormComponent
            formConfig={{
                fields: [
                    [
                        { label: "Name", type: "text", name: "name", required: true, placeholder: "Enter the name of your business" },
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
            data={business}
            onSubmit={handleFormSubmit}
            isFormLoading={isLoading}
        />
    );
}