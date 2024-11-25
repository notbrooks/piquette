"use client"
import { useState } from "react"
import { toast } from "~/hooks/use-toast"
import { FormComponent } from '~/components/common/Form'
import {settingsConfig} from '../settings.config'

export default function CancelSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const handleFormSubmit = (data: Record<string, unknown>) => {
        setIsLoading(true);
        toast({
            variant: "destructive",
            title: "Notification Settings Received",
            description: JSON.stringify(data, null, 2),
        });
        setIsLoading(false);
    }

    return <FormComponent formConfig={settingsConfig.cancelSettings} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
}