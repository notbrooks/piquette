// "use client";

// import { api } from "~/trpc/react";
// import { ProfileProvider, useProfile } from "./context";
// import { StackedLayout } from "~/layouts";
// import { useEffect, useState } from "react";


// // Helper function to get a cookie value by name
// const getCookieValue = (name: string): string | null => {
//   console.log("Getting cookie value:", name);
//   const value = `; ${document.cookie}`;
//   console.log("Cookie value:", value);
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop()?.split(";").shift() || null;
//   }
//   return null;
// };

// const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
//   const { profile, setCuid } = useProfile();
//   // const [cuid, setCuid] = useState<string | null>(null);
//   // const { data: profile, isLoading, error } = api.profile.getMyProfile.useQuery(
//   //   { cuid: cuid! },
//   //   { enabled: !!cuid }
//   // );

//   // useEffect(() => {
//   //   // Fetch the __piquette cookie value
//   //   const piquetteCookie = getCookieValue("__piquette");

//   //   if (piquetteCookie) {
//   //     console.log("Cookie Value Found:", piquetteCookie);
//   //     setCuid(piquetteCookie);
//   //   } else {
//   //     console.log("__piquette cookie not found");
//   //   }
//   // }, []);

  

//   // if (isLoading ?? !cuid ) {
//   //   return 
//   // }

//   // if (error) {
//   //   console.error("Error fetching profile:", error);
//   //   return <p>Error loading profile. Check the console for more details.</p>;
//   // }

//   return (
//     <StackedLayout>
//       <ProfileProvider>
//         {children}
//       </ProfileProvider>
//     </StackedLayout>
//   );
// };

// export default ProfileLayout;

"use client";

import { ProfileProvider } from "./context"; // Correct import for the context
import { StackedLayout } from "~/layouts";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProfileProvider>
      <StackedLayout>
        {children}
      </StackedLayout>
    </ProfileProvider>
  );
};

export default ProfileLayout;