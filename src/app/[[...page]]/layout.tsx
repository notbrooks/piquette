"use client";


import NavbarComponent from "~/components/common/navbar";

// Define the type for the profile object
interface Profile {
  type: string; // Adjust this type according to your profile structure
  // Include other fields as necessary
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  )
};

export default DashboardLayout;