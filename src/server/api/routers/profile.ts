import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createId } from "@paralleldrive/cuid2";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { profiles } from "~/server/db/schema";

export const profileRouter = createTRPCRouter({
  
  getProfile: publicProcedure
    .input(
      z.object({
        user: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db.query.profiles.findFirst({ 
        where: eq(profiles.cuid, input.user),
      });

      if (!profile) {
        return null;
      }

      return profile;
    }),

    createProfile: publicProcedure
      .input(
        z.object({
          user: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Generate cuid and token
        const provider = "clerk";
        const cuid = createId();
        const token = nanoid(6);

        await ctx.db.insert(profiles).values({
          cuid,
          token,
          user: input.user,
          provider,
          createdBy: 'brooke',
          updatedBy: 'brooke',
        });

        return { cuid };
      }),
});


