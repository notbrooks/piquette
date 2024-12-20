"use client";

import { useState } from "react";
import { useProfile } from "~/context/profile";
import type { Profile } from "~/types";
import { BusinessForm, BusinessTable } from "./_components";
import type { BusinessTableRow } from "~/types/business"

import { Button } from "~/components/ui/button";

export default function BusinessIndexPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type
    const [rows, setRows] = useState < BusinessTableRow[] > ([]); // State to hold the table data
    const [visiblePanel, setVisiblePanel] = useState('default'); // State to toggle between table and form

    if (!profile)  return "Loading...";
    return (
        <div className="space-y-5 container pb-5">
            <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-2xl font-light leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Businesses
                </h3>
                <div className="mt-3 sm:ml-4 sm:mt-0">
                    {visiblePanel === "create" && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setVisiblePanel('default')}
                        >
                            Cancel
                        </Button>
                    )}
                    {visiblePanel === 'default' && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => setVisiblePanel('create')}
                        >
                            Create Business
                        </Button>
                    )}
                    
                </div>
            </div>
            
            {/* {visiblePanel === 'create' && <OrganizationForm profile={profile} setVisiblePanel={setVisiblePanel} setRows={setRows} />}

            {visiblePanel === 'default' && <OrganizationTable rows={rows} setRows={setRows} />}
             */}
            {visiblePanel === 'create' && <BusinessForm profile={profile} setVisiblePanel={setVisiblePanel} setRows={setRows} />}

            {visiblePanel === 'default' && <BusinessTable  rows={rows} setRows={setRows} />}
            
        </div>
    );
}