"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from "~/trpc/react";

// Define types for the profile data
interface Profile {
  id: string;
  name: string;
  email: string;
}

// Define types for the context
interface ProfileContextType {
  profile: Profile | null;
  setCuid: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  error: string | null;
}

// Create context with defined types
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Custom hook to use the Profile context
export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

// ProfileProvider component
export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [cuid, setCuid] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper function to get a cookie value by name
  const getCookieValue = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(";").shift() ?? null : null;
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
    setIsLoading(queryLoading);
    if (queryError) {
      setError(queryError.message);
    } else {
      if (fetchedProfile) {
        // Ensure fetchedProfile is valid before setting
        setProfile(fetchedProfile as unknown as Profile); // Type assertion can also be avoided if TRPC types are configured
      } else {
        setProfile(null); // Handle null explicitly
      }
      setError(null); // Clear previous errors
    }
  }, [fetchedProfile, queryLoading, queryError]);

  return (
    <ProfileContext.Provider value={{ profile, setCuid, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};