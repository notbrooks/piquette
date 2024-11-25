import { eq, and, desc } from "drizzle-orm";
import  jwt from "jsonwebtoken";
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

      await ctx.db.insert(favorites).values({
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
      await ctx.db.delete(favorites).where(
        and(
          eq(favorites.id, input.id),
          eq(favorites.cuid, input.key),
          eq(favorites.type, input.type),
        )
      );
      console.log( input.id, input.key, input.type)
    }),

  create: publicProcedure
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

      await ctx.db.insert(favorites).values({
        type: input.type,
        object: input.object,
        createdBy: userId,
        updatedBy: userId
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

      const favoritesList = await ctx.db.select()
        .from(favorites)
        .where(eq(favorites.createdBy, input.createdBy))  // Corrected where clause
        .orderBy(favorites.createdAt, desc(favorites.createdAt))

      return favoritesList ?? [];
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const favorite = await ctx.db.query.favorites.findMany({
      orderBy: (favorites, { desc }) => [desc(favorites.createdAt)],
    });

    return favorite ?? null;
    }),

});


