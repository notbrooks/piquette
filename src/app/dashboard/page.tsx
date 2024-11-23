"use client";

import { useProfile } from "~/context/profile";

// Define the type for the profile object
interface Profile {
  // Add the necessary fields of the profile object here
  id: string; // Example field
  name: string; // Example field
  // Add other fields as necessary
}

export default function DashboardPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the correct type

    if (!profile) {
        return null; // Change false to null for valid JSX return
    }

    return (
        <div>
            <h3>Profile Query Results:</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    );
}