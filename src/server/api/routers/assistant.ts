import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import jwt from "jsonwebtoken";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { assistants } from "~/server/db/schema";
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
      const authToken = ctx.headers.get("x-clerk-auth-token");

      if (!authToken) {
        throw new Error("Unauthorized: Missing auth token");
      }

      let userId: string | null;
      try {
        const decodedToken = jwt.decode(authToken) as { sub: string } | null;
        if (!decodedToken?.sub) throw new Error("Unauthorized: Invalid token");
        userId = decodedToken.sub;
      } catch (error) {
        throw new Error(`Unauthorized: Error decoding token - ${(error as Error).message}`);
      }

      const assistantTypeEnum = input.type as 
        | "assistant"
        | "marketing manager"
        | "sales manager"
        | "account manager"
        | "finance manager"
        | "hr manager"
        | "it manager"
        | "coach"
        | "tutor";

      // Create Assistant in OpenAI
      let openaiAssistantId: string;
      try {
        const openaiResponse = await openai.beta.assistants.create({
          name: input.name,
          description: input.description,
          instructions: input.prompt,
          model: "gpt-4o",
          tools: [{ type: "file_search" }],
        });

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

      return assistant;
    }),

  /**
   * Get By Organization
   */
  getByOrganization: publicProcedure
    .input(z.object({
      parent_id: z.number().min(1),
      parent_type: z.string().min(1),
    }))
    .query(async ({ ctx, input }) => {
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
   * Get By CUID
   */
  getByCUID: publicProcedure
    .input(z.object({
      cuid: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      if (!input.cuid) {
        throw new Error("CUID is required");
      }

      const assistantDetail = await ctx.db.query.assistants.findFirst({
        where: eq(assistants.cuid, input.cuid),
      });

      if (assistantDetail?.token) {
        try {
          const remoteAssistant = await openai.beta.assistants.retrieve(assistantDetail.token);

          if (remoteAssistant?.tool_resources?.file_search?.vector_store_ids) {
            return {
              ...assistantDetail,
              remoteAssistant,
            };
          }
        } catch (error) {
          console.error("Error retrieving remote assistant details:", error);
        }
      }

      return assistantDetail ?? null;
    }),

  /**
   * Get All
   */
  getAll: publicProcedure.query(async ({ ctx }) => {
    const assistantsList = await ctx.db.query.assistants.findMany({
      orderBy: (assistants, { desc }) => [desc(assistants.createdAt)],
    });

    return assistantsList ?? [];
  }),

  /**
   * Admin Get All
   */
  adminGetAll: publicProcedure.query(async ({ ctx }) => {
    const assistantsList = await ctx.db.query.assistants.findMany({
      orderBy: (assistants, { desc }) => [desc(assistants.createdAt)],
    });

    return assistantsList ?? [];
  }),
});