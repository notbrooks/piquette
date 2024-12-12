import { eq, and, desc} from "drizzle-orm";
import  jwt from "jsonwebtoken";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { dislikes } from "~/server/db/schema";

export const dislikeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        message: `Hello ${input.text}`,
      };
    }),

  add: publicProcedure
    .input(z.object({ 
      type: z.string().min(1),
      object: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {

      // Get the token from the headers
      const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;

      if (!authToken) {
        throw new Error("Unauthorized: Missing auth token");
      }

      // Decode the token to get the `sub` (userId)
      let userId: string | null = null;
      try {
        const decodedToken = jwt.decode(authToken) as { sub: string } | null;

    
        if (!decodedToken?.sub) {
          throw new Error("Unauthorized: Invalid token");
        }

        userId = decodedToken.sub;  
      } catch (error: unknown) {
        throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
      }

      await ctx.db.insert(dislikes).values({
        type: input.type,
        object: input.object,
        createdBy: userId,
        updatedBy: userId,
      });
    }),

  delete: publicProcedure
    .input(z.object({ 
      id: z.number(),
      key: z.string(),
      type: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(dislikes).where(
        and(
          eq(dislikes.id, input.id),
          eq(dislikes.cuid, input.key),
          eq(dislikes.type, input.type),
        )
      );
      console.log( input.id, input.key, input.type)
    }),

  create: publicProcedure
    .input(z.object({ 
      type: z.string().min(1),
      object: z.string(),
      createdBy: z.string(),
      updatedBy: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(dislikes).values({
        type: input.type,
        object: input.object,
        createdBy: input.createdBy,
        updatedBy: input.updatedBy,
      });
    }),

  getByUser: publicProcedure
    .input(z.object({
      createdBy: z.string().min(1)
    }))

    
    .query(async ({ ctx, input }) => {

      // Get the token from the headers
      const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;

      if (!authToken) {
        throw new Error("Unauthorized: Missing auth token");
      }

      // Decode the token to get the `sub` (userId)
      let userId: string | null = null;
      try {
        const decodedToken = jwt.decode(authToken) as { sub: string } | null;

        if (!decodedToken?.sub) {
          throw new Error("Unauthorized: Invalid token");
        }

        userId = decodedToken.sub;  
      } catch (error: unknown) {
        throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
      }

      const dislikesList = await ctx.db.select()
        .from(dislikes)
        .where(eq(dislikes.createdBy, input.createdBy))  // Corrected where clause
        .orderBy(dislikes.createdAt, desc(dislikes.createdAt))

      return dislikesList ?? [];
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const dislikesList = await ctx.db.query.dislikes.findMany({
      orderBy: (dislikes, { desc }) => [desc(dislikes.createdAt)],
    });

    return dislikesList ?? null;
    }),

});
