"use client";

import { useParams } from "next/navigation";
import { useProfile } from "~/context/profile";
import type { Profile, Business } from "~/types";
import { api } from "~/trpc/react";
import { BusinessDetail } from "../_components";
import { Settings, Documents, Jobs, Members } from "./_components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

export default function BusinessDetailPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type
    const params = useParams();
    const cuid = params?.cuid;

    if (!cuid || Array.isArray(cuid)) {
        return <p>No valid CUID provided.</p>;
    }

    const { data, isLoading, isError } = api.business.getByCUID.useQuery({ cuid });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading business details.</p>;
    if (!profile) return "Loading...";

    return (
        <div className="space-y-5 container pb-5">
            <div>
                <BusinessDetail profile={profile} business={data as Business} />
            </div>

            {/* Tabs Component */}
            <Tabs defaultValue="settings" className="max-w-full">
                <TabsList className="flex justify-start">
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="jobs">Jobs</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>

                <TabsContent value="settings">
                    <div className="px-2">
                        <Settings />
                    </div>
                </TabsContent>

                <TabsContent value="documents">
                    <Documents profile={profile} business={data as Business} />
                </TabsContent>

                <TabsContent value="jobs">
                    <div className="px-2">
                        <Jobs />
                    </div>
                </TabsContent>

                <TabsContent value="members">
                    <Members profile={profile} business={data as Business} />
                </TabsContent>
            </Tabs>
        </div>
    );
}