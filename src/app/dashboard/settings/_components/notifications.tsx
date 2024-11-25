"use client"
import { useState } from "react"
import { toast } from "~/hooks/use-toast"
import { FormComponent } from '~/components/common/Form'
import {settingsConfig} from '../settings.config'

export default function NotificationSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const handleFormSubmit = (data: Record<string, unknown>) => {
        setIsLoading(true);
        toast({
            variant: "default",
            title: "Notification Settings Received",
            description: JSON.stringify(data, null, 2),
        });
        setIsLoading(false);
    }

    return <FormComponent formConfig={settingsConfig.notificationsSettings} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
}