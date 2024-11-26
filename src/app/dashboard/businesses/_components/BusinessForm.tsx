"use client" 

import { useState, useEffect } from "react";
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation";
import { FormComponent } from "~/components/common/";
import { Profile } from "~/types";
import { toast } from "~/hooks/use-toast";

import { businessConfig } from '../business.config'

interface BusinessFormProps {
    profile: Profile
    setVisiblePanel: React.Dispatch<React.SetStateAction<string>>
    setRows: React.Dispatch<React.SetStateAction<unknown[]>>;
}



export default function BusinessForm({ profile, setVisiblePanel, setRows }: BusinessFormProps) {
    const router = useRouter();
    const utils = api.useUtils();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setError] = useState<Record<string, string>>({});
    const [stateValue, setStateValue] = useState<Record<string, unknown>>({});

    // Define the mutation using `useMutation`
    const createBusinessMutation = api.business.create.useMutation({
        onSuccess: async () => {
        toast({
            variant: "default",
            title: "Business Created",
            description: "Your business has been created successfully!",
        });

        // Invalidate queries or perform other actions on success
        try {
            await utils.business.invalidate(); // Await the invalidate query operation
        } catch (invalidateError) {
            console.error("Failed to invalidate cache:", invalidateError);
        }

        // Redirect to the businesses dashboard
        router.push("/dashboard/businesses");
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
            const newBusiness = await createBusinessMutation.mutateAsync({
                profile: profile.id as unknown as number,
                name: values.name as string,
                description: values.description as string,
                location: values.location as string,
                url: values.url as string,
                industry: values.industry as string,
            });
    
            // Add the new business record to the rows
            setRows((prevRows) => [newBusiness, ...prevRows]);
    
            // Switch back to the default view
            setVisiblePanel("default");
        } catch (err) {
            console.error("Error creating business:", err);
            setError({ message: "An error occurred while submitting the form." });
        } finally {
            setIsLoading(false);
        }
    };
        
    

    return (
        <div>
            <h3>Business Form</h3>
            <div>{JSON.stringify(profile, null, 2)}</div>
            <FormComponent formConfig={businessConfig.form} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
        </div>
    )
}

