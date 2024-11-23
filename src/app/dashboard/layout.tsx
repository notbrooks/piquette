"use client";

import { useProfile } from "~/context/profile"; // Correct import for the context
import { StackedLayout, AppLayout } from "~/layouts";

// Define the type for the profile object
interface Profile {
  type: string; // Adjust this type according to your profile structure
  // Include other fields as necessary
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useProfile() as { profile: Profile | null }; // Ensure we specify the type

  if (!profile) return null; // Change false to null for valid JSX return

  if (profile.type !== "admin") {
    return <AppLayout>{children}</AppLayout>;
  }

  return <StackedLayout>{children}</StackedLayout>;
};

export default DashboardLayout;