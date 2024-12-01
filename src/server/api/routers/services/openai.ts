import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateAutocompleteContent, generateAssistantContent } from "~/server/services/openai";

export const openAIRouter = createTRPCRouter({
  // Refactor autocomplete as a query
  autocomplete: publicProcedure
    .input(
      z.object({
        fields: z.record(z.string()), // Key-value pairs for fields
        prompt: z.string(), // Prompt string
      })
    )
    .query(async ({ input }) => {
      const { fields, prompt } = input;
      return await generateAutocompleteContent(fields, prompt);
    }),

  // Endpoint for interacting with the assistant remains unchanged
  assistant: publicProcedure
    .input(
      z.object({
        assistantId: z.string(), // ID of the assistant
        prompt: z.string(), // Prompt string
        threadId: z.string().nullable().optional(), // Optional thread ID
      })
    )
    .query(async ({ input }) => {
      const { assistantId, prompt, threadId } = input;
      return await generateAssistantContent(assistantId, prompt, threadId);
    }),
});