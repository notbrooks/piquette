"use client";

import { useParams } from "next/navigation";
import { useProfile } from "~/context/profile";
import type { Profile, BusinessBase } from "~/types";
import { api } from "~/trpc/react";
import { BusinessDetail } from "../_components";
import { BusinessDetails, Settings, Documents, Jobs, Members } from "./_components";
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
                <BusinessDetail business={data as BusinessBase} />
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
                    <div className="space-y-5 px-2">
                        <div className="border-b border-gray-200sm:flex sm:items-center sm:justify-between">
                            <h3 className="text-lg font-light leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                                Organization Details
                            </h3>            
                        </div>
                        <BusinessDetails profile={profile} business={data as BusinessBase} />
                    </div>
                </TabsContent>

                <TabsContent value="documents">
                    <Documents/>
                </TabsContent>

                <TabsContent value="jobs">
                    <div className="px-2">
                        <Jobs />
                    </div>
                </TabsContent>

                <TabsContent value="members">
                    <Members />
                </TabsContent>
            </Tabs>
        </div>
    );
}