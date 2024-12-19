import { useState } from "react";
import { toast } from "~/hooks/use-toast"
import { api } from "~/trpc/react";
import type { Profile, BusinessBase } from "~/types";
import { FormComponent } from "~/components/common/";
import { piquetteConfig } from "~/app/_config";


interface SettingsProps {
    profile: Profile;
    business: BusinessBase;
}

export default function BusinessSettings({ profile, business }: SettingsProps) {
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
                settings: data,
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
                        { label: "Test", type: "text", name: "name", required: true, placeholder: "Test" },
                    ],
                    [
                        { label: "Test2", type: "text", name: "name2", required: true, placeholder: "Test" },
                    ],
                    [
                        { label: "Favorite Color", type: "select" , name: "color", required: true, options: [
                            { label: "Red", value: "red" },
                            { label: "Blue", value: "blue" },
                            { label: "Green", value: "green" },
                        ]},
                    ],
                    [
                        { label: "Favorite Animal", type: "radiogroup" , name: "animal", required: true, options: [
                            { label: "Dog", value: "dog" },
                            { label: "Cat", value: "cat" },
                            { label: "Bird", value: "bird" },
                        ]},
                    ],
                    [
                        { label: "Roles", type: "checkbox" , name: "roles", required: false, options: piquetteConfig.app.industryOptions.find(option => option.value === business.industry)?.roles},
                    ]
                    
                ],
                buttons: [
                    { label: "Save", type: "submit", variant: "default" }
                ],
            }}
            data={business.settings as Record<string, unknown> }
            onSubmit={handleFormSubmit}
            isFormLoading={isLoading}
        />
    )
}