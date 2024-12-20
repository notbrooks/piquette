
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { ProfileProvider } from "~/context/profile"; // Correct import for the context
import { ClerkProvider } from '@clerk/nextjs'
import { TRPCReactProvider } from "~/trpc/react";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
            <TRPCReactProvider>
              <ProfileProvider>{children}</ProfileProvider>
            </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
