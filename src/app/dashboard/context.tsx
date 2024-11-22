"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from "~/trpc/react";

// Create context
const ProfileContext = createContext<any>(null);

// Custom hook to use the Profile context
export const useProfile = () => {
  return useContext(ProfileContext);
};

// ProfileProvider component
export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [cuid, setCuid] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);  // State to hold the profile data
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper function to get a cookie value by name
  const getCookieValue = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  };

  // Fetch cuid from cookie on mount
  useEffect(() => {
    const piquetteCookie = getCookieValue("__piquette");
    if (piquetteCookie) {
      setCuid(piquetteCookie);
    }
  }, []);

  // Use the API query hook directly in the component
  const { data: fetchedProfile, isLoading: queryLoading, error: queryError } = api.profile.getMyProfile.useQuery(
    { cuid: cuid! },
    { enabled: !!cuid } // Only run the query if cuid is available
  );

  // Effect to handle state changes from the query
  useEffect(() => {
    if (!queryLoading) {
      setIsLoading(queryLoading);
      if (queryError) {
        setError(queryError.message); // Handle the error
      } else {
        setProfile(fetchedProfile); // Set the fetched profile data
        setError(null); // Clear any previous errors
      }
    }
  }, [fetchedProfile, queryLoading, queryError]);

  return (
    <ProfileContext.Provider value={{ profile, setCuid, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};