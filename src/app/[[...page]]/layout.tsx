"use client";


import NavbarComponent from "~/components/common/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  )
};

export default DashboardLayout;