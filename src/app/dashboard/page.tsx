"use client" 
import { useProfile } from "./context";
export default function DashboardPage() {
    const { profile } = useProfile();
    if (!profile) {
        return false;
    }
    return (
        <div>
            <h3>Profile Query Results:</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    )
}