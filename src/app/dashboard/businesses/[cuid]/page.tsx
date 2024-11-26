"use client";

import { useState } from "react";
import { useProfile } from "~/context/profile";
import type { Profile } from "~/types";
import { BusinessDetail } from "../_components";

export default function BusinessIndexPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type
    const [rows, setRows] = useState<unknown[]>([]); // State to hold the table data
    const [visiblePanel, setVisiblePanel] = useState('default'); // State to toggle between table and form

    if (!profile)  return "Loading...";
    return (
        <div className="space-y-5 container pb-5">
            <div>
                {/* <BusinessDetail /> */}
            </div>
            
            <div>[Add Objects]</div>
            
        </div>
    );
}