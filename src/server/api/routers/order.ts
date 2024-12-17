import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import  jwt from "jsonwebtoken";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { orders, profiles } from "~/server/db/schema";

export const orderRouter = createTRPCRouter({

  /**
   * Create
   */
  create: publicProcedure
    .input(z.object({ 
      profile: z.number(),
      business: z.number(),
      amount: z.string(),
      status: z.string().optional(),
      
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

      const order = await ctx.db
        .insert(orders)
        .values({
          cuid: createId(),
          token: nanoid(6),
          profile: input.profile,
          business: input.business ?? null,
          amount: input.amount,
          createdBy: userId,
          updatedBy: userId,
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error("Error inserting organization:", error.message);
          } else {
            console.error("Unexpected error inserting order:", error);
          }
          throw new Error("Failed to create order");
        });

    return order;
  }),


  /**
   * Read
   */
  //  adminGetAll
  //  getByCUID
  //  getByOwner
  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   const businesses = await ctx.db.query.businesses.findMany({
  //     orderBy: (businesses, { desc }) => [desc(businesses.createdAt)],
  //   });

  //   return businesses ?? null;
  //   }),
  getByOwner: publicProcedure
    .input(z.object({
      profile_id: z.number()
    }))
    .query(async ({ ctx, input }) => {
      // Step 1: Validate the user's authentication token
      const authToken = ctx.headers.get("x-clerk-auth-token") as string | undefined;
          
      if (!authToken) {
        throw new Error("Unauthorized: Missing auth token");
      }

      let userId: string | null = null;
      try {
        const decodedToken = jwt.decode(authToken) as { sub: string } | null;

        if (!decodedToken?.sub) {
          throw new Error("Unauthorized: Invalid token");
        }

        userId = decodedToken.sub;
      } catch (error) {
        throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
      }

      // Step 2: Find the user's profile
      const profile = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.user, userId),
      });

      if (!profile) {
        throw new Error("Unauthorized: Profile mismatch");
      }

      const ordersList = await ctx.db.select()
        .from(orders)
        .where(eq(orders.profile, input.profile_id))
        .orderBy(orders.createdAt, desc(orders.createdAt));

      return ordersList ?? [];
    }),

  //  getByOrganization
  //  getByBusiness
  getByBusiness: publicProcedure
    .input(z.object({
      profile_id: z.number(),
      business_id: z.number()
    }))
    .query(async ({ ctx, input }) => {
      // Step 1: Validate the user's authentication token
      const authToken = ctx.headers.get("x-clerk-auth-token") as string | undefined;
          
      if (!authToken) {
        throw new Error("Unauthorized: Missing auth token");
      }

      let userId: string | null = null;
      try {
        const decodedToken = jwt.decode(authToken) as { sub: string } | null;

        if (!decodedToken?.sub) {
          throw new Error("Unauthorized: Invalid token");
        }

        userId = decodedToken.sub;
      } catch (error) {
        throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
      }

      // Step 2: Find the user's profile
      const profile = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.user, userId),
      });

      if (!profile) {
        throw new Error("Unauthorized: Profile mismatch");
      }

      const ordersList = await ctx.db.select()
        .from(orders)
        .where(
          and(
            eq(orders.profile, input.profile_id),
            eq(orders.business, input.business_id),
          )
        )
        .orderBy(orders.createdAt, desc(orders.createdAt));
      return ordersList ?? [];
      
    }),

    getByCUID: publicProcedure
    .input(z.object({
      cuid: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      if (!input.cuid) {
        throw new Error("CUID is required");
      }

      const orderDetail = await ctx.db.query.orders.findFirst({
        where: eq(orders.cuid, input.cuid),
      });

      // if (orderDetail?.token) {
      //   try {
      //     const remoteorder = await openai.beta.orders.retrieve(orderDetail.token);

      //     if (remoteorder?.tool_resources?.file_search?.vector_store_ids) {
      //       return {
      //         ...orderDetail,
      //         remoteorder,
      //       };
      //     }
      //   } catch (error) {
      //     console.error("Error retrieving remote order details:", error);
      //   }
      // }

      return orderDetail ?? null;
    }),

  /**
   * Update
   */
  //  update

  /**
   * Delete
   */
  //  delete
});


