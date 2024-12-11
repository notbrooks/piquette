"use client" 

import { useState, useEffect } from "react";
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation";
import { FormComponent } from "~/components/common/";
import { Profile } from "~/types";
import { toast } from "~/hooks/use-toast";

import { organizationConfig } from '../organization.config'

interface OrganizationFormProps {
    profile: Profile
    setVisiblePanel: React.Dispatch<React.SetStateAction<string>>
    setRows: React.Dispatch<React.SetStateAction<unknown[]>>;
}



export default function OrganizationForm({ profile, setVisiblePanel, setRows }: OrganizationFormProps) {
    const router = useRouter();
    const utils = api.useUtils();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setError] = useState<Record<string, string>>({});
    const [stateValue, setStateValue] = useState<Record<string, unknown>>({});

    // Define the mutation using `useMutation`
    const createOrganizationMutation = api.organization.create.useMutation({
        onSuccess: async () => {
        toast({
            variant: "default",
            title: "Organization Created",
            description: "Your organization has been created successfully!",
        });

        // Invalidate queries or perform other actions on success
        try {
            await utils.organization.invalidate(); // Await the invalidate query operation
        } catch (invalidateError) {
            console.error("Failed to invalidate cache:", invalidateError);
        }

        // Redirect to the businesses dashboard
        router.push("/dashboard/organizations");
        },
        onError: (err) => {
        toast({
            variant: "destructive",
            title: "Failed to Create Organization",
            description: err.message,
        });
        setError({ message: err.message });
        },
    });

    const handleFormSubmit = async (values: Record<string, unknown>) => {
        if (!profile?.id) {
            console.error("Profile not found");
            return;
        }
    
        setIsLoading(true);
        try {
            // Mutate the business and get the returned record
            const newOrganization = await createOrganizationMutation.mutateAsync({
                profile: profile.id as unknown as number,
                name: values.name as string,
                description: values.description as string,
                location: values.location as string,
                url: values.url as string,
                industry: values.industry as string,
            });
    
            // Add the new business record to the rows
            setRows((prevRows) => [newOrganization, ...prevRows]);
    
            // Switch back to the default view
            setVisiblePanel("default");
        } catch (err) {
            console.error("Error creating business:", err);
            setError({ message: "An error occurred while submitting the form." });
        } finally {
            setIsLoading(false);
        }
    };
        
    

    return <FormComponent formConfig={organizationConfig.form} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
}

