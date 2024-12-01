import type { NextRequest } from "next/server"; // Change here for type import
import { NextResponse } from "next/server";
import { generateAutocompleteContent, generateAssistantContent } from "~/server/services/openai";

// Define the types for the expected request body
interface RequestBody {
  assistantId?: string;
  threadId?: string;
  prompt: string;
  fields?: Record<string, string>;
}

// Define the POST method handler explicitly
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json() as RequestBody;
    const path = new URL(req.url).pathname;
    const endpointType = path.split('/').pop(); 
    
    const { prompt, fields, assistantId, threadId } = body;

    switch (endpointType) {
      case "autocomplete":
        if (!prompt || !fields) {
          return NextResponse.json({ error: "Prompt and JSON data are required" }, { status: 400 });
        }
        const autocompleteContent = await generateAutocompleteContent(fields, prompt);
        return NextResponse.json({ autocompleteContent }, { status: 200 });

      case "ask-assistant":
        if (!assistantId || !prompt) {
          return NextResponse.json({ error: "Assistant ID and prompt are required." }, { status: 400 });
        }
        const { content, newThreadId } = await generateAssistantContent(assistantId, prompt, threadId);
        return NextResponse.json({
          content,
          threadId: newThreadId ?? threadId,
        });
      case "chat":
        return NextResponse.json({ message: "Response from chat" }); // Changed from string to NextResponse
      default:
        return NextResponse.json({ error: "Invalid endpoint type" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}

// (Optional) You can define other handlers, e.g., GET, PUT, DELETE if needed.