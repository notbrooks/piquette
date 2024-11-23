"use client";

import { useProfile } from "~/context/profile";

// Define the type for the profile object to avoid 'any'
interface Profile {
    // Add the necessary fields of the profile object here
    id: string;
    name: string;
    // Add other fields as necessary
}

export default function DashboardPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Ensure the type is correct

    return (
        <div>
            <h3>TEST Profile Query Results:</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    );
}