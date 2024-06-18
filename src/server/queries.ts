import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { profiles, images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";


export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}

export async function getMyProfile(uid: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const profile = await db.query.profiles.findFirst({
    where: (model, { eq }) => eq(model.uid, uid),
  });
  if (!profile) return false

  // if (profile.uid !== user.userId) throw new Error("Unauthorized");

  return profile;
}

export async function createMyProfile(uid: string, type: string, firstName: string, lastName: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const profile = await db.insert(profiles).values({
    uid: uid,
    type: type,
    firstName: firstName,
    lastName: lastName,
  });

  return profile;
}
export async function updateMyProfile(uid: string, type: string, firstName: string, lastName: string) {
  
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  try {
    const result = await db.update(profiles)
      .set({
        type: type,
        firstName: firstName,
        lastName: lastName,
      })
      .where(eq(profiles.uid, uid)); // Use the correct path to your model's fields

    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
}
