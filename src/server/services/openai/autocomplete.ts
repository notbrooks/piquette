// src/server/services/openai/autocomplete.ts
import OpenAI from "openai";
import { env } from "~/env";
const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});

export async function generateAutocompleteContent(fields: Record<string, string>, prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: `Please generate content based on the following fields: ${JSON.stringify(fields)}` }
      ]
    });

    // Return the generated content
    return response.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error("Error generating autocomplete content:", error);
    throw new Error("Autocomplete generation failed");
  }
}