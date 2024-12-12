import { eq, and, desc} from "drizzle-orm";
import  jwt from "jsonwebtoken";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { saves } from "~/server/db/schema";

export const saveRouter = createTRPCRouter({

  add: publicProcedure
    .input(z.object({ 
      objectType: z.string().min(1),
      objectId: z.number().nonnegative(),
      profile: z.number().nonnegative(),
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

      const cuid = createId();
      await ctx.db.insert(saves).values({
        cuid: cuid, 
        createdBy: userId,
        updatedBy: userId,
        objectId: input.objectId, // assuming this should be a number
        objectType: input.objectType,
        profile: input.profile
      });
    }),

  delete: publicProcedure
    .input(z.object({ 
      id: z.number(),
      key: z.string(),
      type: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(saves).where(
        and(
          eq(saves.id, input.id),
          eq(saves.cuid, input.key),
          eq(saves.objectType, input.type),
        )
      );
      console.log( input.id, input.key, input.type)
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

      const savesList = await ctx.db.select()
        .from(saves)
        .where(eq(saves.createdBy, input.createdBy))  // Corrected where clause
        .orderBy(saves.createdAt, desc(saves.createdAt))

      return savesList ?? [];
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const savesList = await ctx.db.query.saves.findMany({
      orderBy: (saves, { desc }) => [desc(saves.createdAt)],
    });

    return savesList ?? null;
    }),

});
