"use client" 

import { useProfile } from "~/app/dashboard/context";
export default function DashboardPage() {
    const { profile } = useProfile();
    return (
        <div>
            <h3>TEST Profile Query Results:</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    )
}