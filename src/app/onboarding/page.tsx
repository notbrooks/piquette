

import { auth } from "@clerk/nextjs/server";

import OnboardingForm from "~/app/_components/onboarding/onboarding";

import { getMyProfile } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const profile = await getMyProfile(user.userId);

  if (profile) {
    return <div className="h-screen">Dashboard</div>
  }
  

  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in.
          Explicabo id ut laborum.
        </p>
        
        <div className=" mx-auto mt-10">
          <OnboardingForm uid={user.userId} />
                            
        </div>
      </div>
    </div>
  );
}
