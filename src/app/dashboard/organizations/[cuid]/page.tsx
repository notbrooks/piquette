"use client";

import { useParams } from "next/navigation";
import { useProfile } from "~/context/profile";
import type { Profile, Organization } from "~/types";
import { api } from "~/trpc/react";
import { OrganizationDetail } from "../_components";
import { Settings, Assistants, Documents, Businesses, Jobs, Members } from "./_components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

export default function OrganizationDetailPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type
    const params = useParams();
    const cuid = params?.cuid;

    if (!cuid || Array.isArray(cuid)) {
        return <p>No valid CUID provided.</p>;
    }

    const { data, isLoading, isError } = api.organization.getByCUID.useQuery({ cuid });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading business details.</p>;
    if (!profile) return "Loading...";

    return (
        <div className="space-y-5 container pb-5">
            <div>
                <OrganizationDetail profile={profile} organization={data as Organization} />
            </div>

            {/* Tabs Component */}
            <Tabs defaultValue="settings" className="max-w-full">
                <TabsList className="flex justify-start">
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="assistants">Assistants</TabsTrigger>
                    <TabsTrigger value="businesses">Businesses</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>

                <TabsContent value="settings">
                    <div className="px-2">
                        <Settings />
                    </div>
                </TabsContent>

                <TabsContent value="assistants">
                    <div className="px-2">
                        <Assistants profile={profile} organization={data as Organization} />
                    </div>
                </TabsContent>

                <TabsContent value="businesses">
                    <div className="px-2">
                        <Businesses profile={profile} organization={data as Organization} />
                    </div>
                </TabsContent>

                <TabsContent value="documents">
                    <Documents profile={profile} organization={data as Organization} />
                </TabsContent>

                <TabsContent value="members">
                    <Members profile={profile} organization={data as Organization} />
                </TabsContent>
            </Tabs>
        </div>
    );
}