"use client";

import { useState } from "react";
import { useProfile } from "~/context/profile";
import type { Profile } from "~/types";
import { BusinessDetail } from "../_components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

export default function BusinessDetailPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type
    const [rows, setRows] = useState<unknown[]>([]); // State to hold the table data
    const [visiblePanel, setVisiblePanel] = useState("default"); // State to toggle between table and form

    if (!profile) return "Loading...";
    return (
        <div className="space-y-5 container pb-5">
            <div>
                <BusinessDetail profile={profile} />
            </div>

            {/* Tabs Component */}
            <Tabs defaultValue="settings" className="max-w-full">
                    <TabsList className="flex justify-start">
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="jobs">Jobs</TabsTrigger>
                        <TabsTrigger value="talent">Talent</TabsTrigger>
                    </TabsList>

                    <TabsContent value="settings">
                        <div>
                            <h3 className="text-lg font-semibold">Settings</h3>
                            <p className="text-sm text-muted-foreground">
                                Here you can see an overview of the business details.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="jobs">
                        <div>
                            <h3 className="text-lg font-semibold">Jobs</h3>
                            <p className="text-sm text-muted-foreground">
                                This tab contains related objects linked to the business.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="talent">
                        <div>
                            <h3 className="text-lg font-semibold">Talent</h3>
                            <p className="text-sm text-muted-foreground">
                                Modify settings and configurations for the business here.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
        </div>
    );
}