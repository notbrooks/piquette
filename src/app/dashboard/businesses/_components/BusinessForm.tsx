"use client" 

import { useState } from "react";
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

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [stateValue, setStateValue] = useState<Record<string, unknown>>({});

    
    const handleFormSubmit = async (values: Record<string, unknown>) => {
        toast({
            variant: "default",
            title: "Business Form Received",
            description: JSON.stringify(values, null, 2),
        })
        setRows((prevRows) => [values as unknown, ...prevRows]);
        setVisiblePanel('default')
    }

    return (
        <div>
            <h3>Business Form</h3>
            <div>{JSON.stringify(profile, null, 2)}</div>
            <FormComponent formConfig={businessConfig.form} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
        </div>
    )
}

