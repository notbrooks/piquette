import { auth } from "@clerk/nextjs/server";
import { getMyProfile } from "~/server/queries";
import { env } from "~/env";

export const dynamic = "force-dynamic";

// import Fetch from "~/server/fetch";
import { Header } from "~/common";

import { ChatComponent } from "~/app/_components/chat";


export default async function AdminPage() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const profile = await getMyProfile(user.userId);

  /* *************************************************************************************
   *  If you want to use the mocked chat, you need to set the OPENAI_API_KEY environment variable
   *  to your OpenAI API key. You can get a free API key from OpenAI's website.
   ************************************************************************************* */
  if (!env.OPENAI_API_KEY) {
    
    return (
      <div>
        <Header  title="Mock Chat" />
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold">OpenAI API key is not set</h1>
            <p className="mt-2">
              Please set the <code>OPENAI_API_KEY</code> environment variable to your OpenAI API key.
            </p>
          </div>
        </div>
      </div>
    )

  }

  return (
    <div>
      <Header  title="Mock Chat" />
      <ChatComponent profile={profile} page=""/>
    </div>
  );
}

