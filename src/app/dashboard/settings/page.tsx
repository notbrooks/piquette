import { auth } from "@clerk/nextjs/server";
import { getMyProfile } from "~/server/queries";

export const dynamic = "force-dynamic";


import { Header } from "~/common";

import UpdateProfileComponent from "~/app/_components/settings";



export default async function SettingsPage() {

  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const profile = await getMyProfile(user.userId);

  return (
    <div>
      <Header title="Settings" />
      <div className="space-y-12 mt-5">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              This information will be displayed publicly so be careful what you share.
            </p>
            <div>
              <UpdateProfileComponent profile={profile}/>
            </div>
        </div>
      </div>
    </div>
  );
}


