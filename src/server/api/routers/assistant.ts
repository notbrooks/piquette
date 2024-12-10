import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import  jwt from "jsonwebtoken";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { assistants, businesses, profiles } from "~/server/db/schema";
import openai from "~/lib/openai";

export const assistantRouter = createTRPCRouter({

  /**
   * Create
   */
  create: publicProcedure
    .input(z.object({ 
      profile: z.number(),
      parent_type: z.string().optional(),
      parent_id: z.number().optional(),
      name: z.string(),
      type: z.string(),
      description: z.string(),
      prompt: z.string(),
      
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

  const assistantTypeEnum = input.type as "assistant" | "marketing manager" | "sales manager" | "account manager" | "finance manager" | "hr manager" | "it manager" | "coach" | "tutor";

  // Step 3: Create Assistant in OpenAI
  let openaiAssistantId: string;
  try {
    const openaiResponse = await openai.beta.assistants.create({
      name: input.name,
      description: input.description,
      instructions: input.prompt,
      tools: [],
      model: "gpt-4",
    });
      

    // Extract the assistant ID from the OpenAI response
    openaiAssistantId = openaiResponse.id;
  } catch (error) {
    console.error("Error creating assistant in OpenAI:", error);
    throw new Error("Failed to create assistant in OpenAI");
  }

  const assistant = await ctx.db.insert(assistants).values({

    profile: input.profile,
    parentType: input.parent_type,
    parentId: input.parent_id,
    cuid: createId(),
    token: openaiAssistantId,
    name: input.name,
    type: assistantTypeEnum,
    description: input.description,
    prompt: input.prompt,
    createdBy: userId,
    updatedBy: userId,
  });
        ;

      return assistant;
    }),

    getByOrganization: publicProcedure
        .input(z.object({
          parent_id: z.number().min(1),
          parent_type: z.string().min(1)
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

        const assistantsList = await ctx.db.select()
          .from(assistants)
          .where(
            and(
              eq(assistants.parentId, input.parent_id),
              eq(assistants.parentType, input.parent_type)
            )
          )
          .orderBy(assistants.createdAt, desc(assistants.createdAt));

          return assistantsList ?? [];  
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


