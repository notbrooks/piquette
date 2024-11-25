// "use client";

// import { useProfile } from "~/context/profile";

// // Define the type for the profile object
// interface Profile {
//     // Specify the fields present in the profile object
//     id: string; // Example field
//     name: string; // Example field
//     // Add other fields as necessary
// }

// export default function DashboardPage() {
//     const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type

//     return (
//         <div>
//             <h3>TEST Profile Query Results:</h3>
//             <pre>{JSON.stringify(profile, null, 2)}</pre>
//         </div>
//     );
// }


import { useProfile } from "~/context/profile";
import Head from "next/head"; // Import the Head component

import HeaderComponent from "~/components/common/header";
import {CancelSettings, PersonalSettings, NotificationSettings} from './_components/';


export default function Home() {

  return (
    <div className="space-y-5 container pb-5">
        <HeaderComponent
            title="Settings"
            description="Manage your account settings"
        />

        <PersonalSettings/>

        <NotificationSettings />

        <CancelSettings />
    </div>
  );
}
