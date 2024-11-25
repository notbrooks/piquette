"use client"
import { useState } from "react"
import { useProfile } from "~/context/profile"
import {toast} from "~/hooks/use-toast"
import type { Profile } from "~/types";
import { FormComponent } from '~/components/common/Form'
import {settingsConfig} from '../settings.config'


export default function PersonalSettings() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type
    
    if (!profile) {
        return null;
    }
    const profileID = profile.id;
    const [isLoading, setIsLoading] = useState(false);
    const handleFormSubmit = (data: Record<string, unknown>) => {
        // add profileId to the data
        data.profileId = profileID;
        setIsLoading(true);
        toast({
            variant: "default",
            title: "Personal Settings Received",
            description: JSON.stringify(data, null, 2),
        });
        setIsLoading(false);
    }

    return <FormComponent formConfig={settingsConfig.personalSettings} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
}