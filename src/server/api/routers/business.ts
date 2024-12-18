import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import  jwt from "jsonwebtoken";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { businesses, profiles } from "~/server/db/schema";


export const businessRouter = createTRPCRouter({
  /**
   * ClaimByToken
   */
  changeOwner: publicProcedure
  .input(z.object({ 
    id: z.number(),
    cuid: z.string(),
    owner: z.number(),
    token: z.string(),
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

    const profile = await ctx.db.query.profiles.findFirst({
      where: eq(profiles.user, userId),
    })

    if (!profile) {
      console.error(`No profile found for user ID: ${userId}`);
      return null;
    }
    
    
    // Update the business owner & reset the token
    const updatedBusiness = await ctx.db.update(businesses)
      .set({
        profile: profile.id,
        token: nanoid(6),
        updatedBy: userId,
      })
      .where(
        and(
          eq(businesses.cuid, input.cuid),
          eq(businesses.id, input.id),
          eq(businesses.token, input.token)
        )
      )
      .returning({
        cuid: businesses.cuid,
      });

    return updatedBusiness;
  }),

  /**
   * Create
   */
  create: publicProcedure
    .input(z.object({ 
      profile: z.number(),
      parent_type: z.string().optional(),
      parent_id: z.number().optional(),
      name: z.string(),
      description: z.string(),
      location: z.string(),
      url: z.string(),
      industry: z.string(),
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

      const business = await ctx.db.insert(businesses).values({
        profile: input.profile,
        parentType: input.parent_type,
        parentId: input.parent_id,
        cuid: createId(),
        token: nanoid(6),
        name: input.name,
        description: input.description,
        location: input.location,
        url: input.url,
        industry: input.industry,
        createdBy: userId,
        updatedBy: userId,
      });

      return business;
    }),

    /**
     * GetByUser
     */
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

        const businessesList = await ctx.db.select()
            .from(businesses)
            .where(eq(businesses.createdBy, input.createdBy))  // Corrected where clause
            .orderBy(businesses.createdAt, desc(businesses.createdAt))

        return businessesList ?? [];
        }),

    /**
     * GetByOwner
     */
    getByOwner: publicProcedure
        .input(z.object({
        owner: z.string().min(1)
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

    const businessesList = await ctx.db.select()
        .from(businesses)
        .where(eq(businesses.createdBy, input.owner))  // Corrected where clause
        .orderBy(businesses.createdAt, desc(businesses.createdAt))

    return businessesList ?? [];
    }),

    /**
     * GetByCUID
     */
    getByCUID: publicProcedure
      .input(z.object({
        cuid: z.string().optional()
      }))

      .query(async ({ ctx, input }) => {

          // Get the token from the headers
          const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;

          

          if (!input.cuid) {
              throw new Error("CUID is required");
          }
          
          const businessesDetail = await ctx.db.query.businesses.findFirst({  // Changed findOne to findFirst
              where: eq(businesses.cuid, input.cuid),  // Fixed the syntax for 'where'
          });

          return businessesDetail ?? null;  // Changed the return value to null if not found
      }),

    /**
     * GetByID
     */
    getById: publicProcedure
      .input(z.object({
        id: z.number()
      }))

      .query(async ({ ctx, input }) => {

          // Get the token from the headers
          const authToken = ctx.headers.get('x-clerk-auth-token') as string | undefined;

          

          if (!input.id) {
              throw new Error("ID is required");
          }
          
          const businessesDetail = await ctx.db.query.businesses.findFirst({  // Changed findOne to findFirst
              where: eq(businesses.id, input.id),  // Fixed the syntax for 'where'
          });

          return businessesDetail ?? null;  // Changed the return value to null if not found
      }),

    /**
     * Update
     */
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          cuid: z.string(),
          name: z.string().optional(),
          description: z.string().optional(),
          location: z.string().optional(),
          url: z.string().optional(),
          industry: z.string().optional(),
          settings: z.record(z.string(), z.any()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
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
          console.error(`No profile found for user ID: ${userId}`);
          throw new Error("User profile not found.");
        }
    
        // Step 3: Update the organization
        const updatedBusiness = await ctx.db
          .update(businesses) // Correctly use `ctx.db.update` on `businesses`
          .set({
            name: input.name,
            description: input.description,
            location: input.location,
            url: input.url,
            industry: input.industry,
            settings: input.settings,
            updatedBy: userId, // Ensure the `updatedBy` field is updated correctly
          })
          .where(
            and(
              eq(businesses.cuid, input.cuid), // Match the organization by CUID
              eq(businesses.id, input.id) // Match the organization by ID
            )
          )
          .returning({
            id: businesses.id,
            cuid: businesses.cuid,
            name: businesses.name,
            description: businesses.description,
            location: businesses.location,
            url: businesses.url,
            industry: businesses.industry,
            updatedAt: businesses.updatedAt,
          });
    
        if (!updatedBusiness) {
          console.error(`Failed to update organization with ID: ${input.id}`);
          throw new Error("Failed to update organization.");
        }
    
        return updatedBusiness[0]; // Return the first updated record
      }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const businesses = await ctx.db.query.businesses.findMany({
      orderBy: (businesses, { desc }) => [desc(businesses.createdAt)],
    });

    return businesses ?? null;
    }),

    /**
     * adminGetAll
     * Admin funcation to get all businesses
     */
    adminGetAll: publicProcedure.query(async ({ ctx }) => {
      const businesses = await ctx.db.query.businesses.findMany({
        orderBy: (businesses, { desc }) => [desc(businesses.createdAt)],
      });
      return businesses ?? null;
    }),

});


