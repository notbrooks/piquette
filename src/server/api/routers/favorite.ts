import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { favorites } from "~/server/db/schema";

export const favoriteRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  remove: publicProcedure
    .query(() => {
      return {
        greeting: 'Favorite removed',
      };
    }),

  add: publicProcedure
    .query(() => {
      return {
        greeting: 'Favorite added',
      };
    }),

  create: publicProcedure
    .input(z.object({ 
      type: z.string().min(1),
      object: z.string(),
      createdBy: z.string(),
      updatedBy: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(favorites).values({
        type: input.type,
        object: input.object,
        createdBy: input.createdBy,
        updatedBy: input.updatedBy,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const favorite = await ctx.db.query.favorites.findMany({
      orderBy: (favorites, { desc }) => [desc(favorites.createdAt)],
    });

    return favorite ?? null;
    }),

});
