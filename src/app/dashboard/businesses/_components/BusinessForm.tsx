"use client" 

import { useState } from "react";
import { api } from "~/trpc/react"
import { useRouter } from "next/navigation";
import { FormComponent } from "~/components/common/";
import type { Profile } from "~/types";
import { toast } from "~/hooks/use-toast";

import {
    type FormDefinition,
    type TableDefinition
} from "~/types";

import type { BusinessTableRow } from "~/types/business";
import { piquetteConfig } from "~/app/_config";

interface BusinessFormProps {
    profile: Profile
    setVisiblePanel: React.Dispatch<React.SetStateAction<string>>
    setRows: React.Dispatch<React.SetStateAction<BusinessTableRow[]>>; 
}


const businessFormConfig: FormDefinition = {
    headline: "Business Form",
    description: "Create a new business",
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
                autocomplete: {
                    type: "openai",
                    mode: "complete",
                    prompt: "You are a content writer specializing in media-focused messaging. Craft a concise public description for this business, intended for use on its website. Keep the tone informative and neutral, focusing on describing the business without including contact details or making it sound like a sales pitch."
                }
            },
        ]
    ],
    buttons: [
        { label: "Save", type: "submit", variant: "default" }
    ],
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
        if (!profile?.id) {
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
            setRows((prevRows: BusinessTableRow[]) => [newBusiness as unknown as BusinessTableRow, ...prevRows]);
    
            // Switch back to the default view
            setVisiblePanel("default");
        } catch (err) {
            console.error("Error creating business:", err);
            setError({ message: "An error occurred while submitting the form." });
        } finally {
            setIsLoading(false);
        }
    };
        
    

    return <FormComponent formConfig={businessFormConfig} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
}

