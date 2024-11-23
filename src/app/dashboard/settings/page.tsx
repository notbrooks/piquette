"use client";

import { useProfile } from "~/context/profile";

// Define the type for the profile object
interface Profile {
    // Specify the fields present in the profile object
    id: string; // Example field
    name: string; // Example field
    // Add other fields as necessary
}

export default function DashboardPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type

    return (
        <div>
            <h3>TEST Profile Query Results:</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    );
}