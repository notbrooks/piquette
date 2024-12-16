import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import  jwt from "jsonwebtoken";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { jobs, profiles } from "~/server/db/schema";

export const jobRouter = createTRPCRouter({

  /**
   * Create
   */
  create: publicProcedure
    .input(z.object({ 
      profile: z.number(),
      parentType: z.string().optional(),
      parentId: z.number().optional(),
      name: z.string(),
      role: z.string(),
      type: z.string(),
      payment: z.string(),
      status: z.string().optional(),
      description: z.string(),
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

      const job = await ctx.db
        .insert(jobs)
        .values({
          profile: input.profile,
          parentType: input.parentType ?? null,
          parentId: input.parentId ?? null,
          cuid: createId(),
          name: input.name,
          role: input.role,
          type: input.type,
          payment: input.payment,
          status: input.status ?? "draft",
          description: input.description,
          createdBy: userId,
          updatedBy: userId,
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error("Error inserting organization:", error.message);
          } else {
            console.error("Unexpected error inserting job:", error);
          }
          throw new Error("Failed to create job");
        });

    return job;
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

      const jobsList = await ctx.db.select()
        .from(jobs)
        .where(eq(jobs.profile, input.profile_id))
        .orderBy(jobs.createdAt, desc(jobs.createdAt));

      return jobsList ?? [];
    }),

  //  getByOrganization
  //  getByBusiness
  getByBusiness: publicProcedure
    .input(z.object({
      profile_id: z.number(),
      parent_id: z.number()
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

      const jobsList = await ctx.db.select()
        .from(jobs)
        .where(
          and(
            eq(jobs.profile, input.profile_id),
            eq(jobs.parentId, input.parent_id),
            eq(jobs.parentType, "business")
          )
        )
        .orderBy(jobs.createdAt, desc(jobs.createdAt));
      return jobsList ?? [];
      
    }),

    getByCUID: publicProcedure
    .input(z.object({
      cuid: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      if (!input.cuid) {
        throw new Error("CUID is required");
      }

      const jobDetail = await ctx.db.query.jobs.findFirst({
        where: eq(jobs.cuid, input.cuid),
      });

      // if (jobDetail?.token) {
      //   try {
      //     const remotejob = await openai.beta.jobs.retrieve(jobDetail.token);

      //     if (remotejob?.tool_resources?.file_search?.vector_store_ids) {
      //       return {
      //         ...jobDetail,
      //         remotejob,
      //       };
      //     }
      //   } catch (error) {
      //     console.error("Error retrieving remote job details:", error);
      //   }
      // }

      return jobDetail ?? null;
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


