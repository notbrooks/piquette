import { auth } from "@clerk/nextjs/server";
import { getMyProfile } from "~/server/queries";

export const dynamic = "force-dynamic";

// import Fetch from "~/server/fetch";
import { Header } from "~/common";

import { ChatComponent } from "~/app/_components/chat";


export default async function AdminPage() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const profile = await getMyProfile(user.userId);

  // const res = await fetch('https://657f87fc6ae0629a3f5362f1.mockapi.io/api/v1/card')

  return (
    <div>
      <Header  title="Mock Chat" />
      <ChatComponent profile={profile} page=""/>
    </div>
  );
}

