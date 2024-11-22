"use client";

import { useProfile } from "~/context/profile"; // Correct import for the context
import { StackedLayout, AppLayout } from "~/layouts";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useProfile();
  
  if (!profile) return false

  if (profile.type !== "admin") {
    return (
      <AppLayout>
        {children}
      </AppLayout>
    );
  }

  return (
      <StackedLayout>
        {children}
      </StackedLayout>
  );
};

export default DashboardLayout;