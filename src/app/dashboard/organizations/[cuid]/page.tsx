"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useProfile } from "~/context/profile";
import type { Profile, OrganizationBase } from "~/types";
import { api } from "~/trpc/react";
import { OrganizationDetail } from "../_components";
import { Details, Assistants, Documents, Businesses, Jobs, Members } from "./_components";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

export default function OrganizationDetailPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type
    const params = useParams();
    const cuid = params?.cuid;

    const [activeTab, setActiveTab] = useState("settings"); // State to track active tab

    if (!cuid || Array.isArray(cuid)) {
        return <p>No valid CUID provided.</p>;
    }

    const { data, isLoading, isError } = api.organization.getByCUID.useQuery({ cuid });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading business details.</p>;
    if (!profile) return "Loading...";

    return (
        <div className="space-y-5 pb-5">
            <div>
                <OrganizationDetail profile={profile} organization={data as OrganizationBase} />
            </div>

            {/* Tabs Component */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-full">
                {/* ShadCN Select for Small Viewports */}
                <div className="md:hidden mb-5">
                    <Select value={activeTab ?? "settings"} onValueChange={setActiveTab}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a tab" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="settings">Settings</SelectItem>
                            <SelectItem value="businesses">Businesses</SelectItem>
                            <SelectItem value="orders">Orders</SelectItem>
                            <SelectItem value="documents">Documents</SelectItem>
                            <SelectItem value="members">Members</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* TabsList for Medium+ Viewports */}
                <TabsList className="hidden md:flex justify-start mb-5">
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="businesses">Businesses</TabsTrigger>
                    <TabsTrigger value="deals">Deals</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>


                <TabsContent value="settings">
                    <div className="space-y-5 px-2">
                        <div className="border-b border-gray-200sm:flex sm:items-center sm:justify-between">
                            <h3 className="text-lg font-light leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                                Organization Details
                            </h3>            
                        </div>
                        <Details profile={profile} organization={data as OrganizationBase} />
                        <div className="border-b border-gray-200sm:flex sm:items-center sm:justify-between">
                            <h3 className="text-lg font-light leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                                Assistants
                            </h3>            
                        </div>
                        <Assistants profile={profile} organization={data as OrganizationBase} />
                    </div>
                </TabsContent>

                <TabsContent value="businesses">
                    <div className="px-2">
                        <Businesses profile={profile} organization={data as OrganizationBase} />
                    </div>
                </TabsContent>

                <TabsContent value="deals">
                    <div className="px-2">
                        Deals
                    </div>
                </TabsContent>

                <TabsContent value="documents">
                    <Documents profile={profile} organization={data as OrganizationBase} />
                </TabsContent>

                <TabsContent value="members">
                    <Members profile={profile} organization={data as OrganizationBase} />
                </TabsContent>
            </Tabs>
        </div>
    );
}