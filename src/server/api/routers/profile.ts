import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createId } from "@paralleldrive/cuid2";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { profiles } from "~/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export const profileRouter = createTRPCRouter({
  /** 
   * Get the profile of a user
   */
  getProfile: publicProcedure
    .input(
      z.object({
        user: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.user, input.user),
      });

      return profile || null;
    }),
  /** 
   * Create a new profile for a user
   */
  createProfile: publicProcedure
    .input(
      z.object({
        user: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.headers.get("x-user-id");

      if (!userId) {
        throw new Error("Unauthorized: Missing userId");
      }

      const provider = "clerk";
      const cuid = createId();
      const token = nanoid(6);

      await ctx.db.insert(profiles).values({
        cuid,
        token,
        user: input.user,
        provider,
        createdBy: userId,
        updatedBy: userId,
      });

      return { cuid };
    }),
});


