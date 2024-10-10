import { eq, and} from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { favorites } from "~/server/db/schema";

export const favoriteRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        message: `Hello ${input.text}`,
      };
    }),

  add: publicProcedure
    .query(() => {
      return {
        message: 'Favorite removed',
      };
    }),

  remove: publicProcedure
    .input(z.object({ 
      id: z.number(),
      key: z.string(),
      type: z.string().min(1),
      object: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      console.log('REMOVE')
      await ctx.db.delete(favorites).where(
        and(
          eq(favorites.id, input.id),
          eq(favorites.cuid, input.key),
          eq(favorites.type, input.type),
          eq(favorites.object, input.object),
        )
      );
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
