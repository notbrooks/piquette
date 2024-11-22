"use client" 

import { useProfile } from "~/context/profile";
export default function DashboardPage() {
    const { profile } = useProfile();
    return (
        <div>
            <h3>TEST Profile Query Results:</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    )
}