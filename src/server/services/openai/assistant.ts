import OpenAI from "openai";
import { env } from "~/env.js";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY, // Make sure your environment variable is set
});

interface AssistantResponse {
  content: string;
  newThreadId?: string;
}

export async function generateAssistantContent(
  assistantId: string,
  prompt: string,
  threadId?: string | null // Allow null explicitly
): Promise<AssistantResponse> {
  let newThreadId: string | undefined = threadId ?? undefined;

  try {
    // Create a new thread if not provided or if threadId is null
    if (!threadId) {
        const thread = await openai.beta.threads.create();
        newThreadId = thread.id!; // Using non-null assertion to ensure newThreadId is defined
    }

    // Send a message to the created or existing thread
    await openai.beta.threads.messages.create(newThreadId!, { // Using non-null assertion here as well
        role: "user",
        content: prompt,
    });

    // Initiate the stream run with the assistant ID and thread ID
    const contentChunks: string[] = [];
    let fullContent = "";

    const run = openai.beta.threads.runs.stream(newThreadId!, {
      assistant_id: assistantId,
    })
      .on('textCreated', (text) => {
        if (text) {
          console.log('Stream started:', text);
        }
      })
      .on('textDelta', (textDelta) => {
        if (textDelta?.value) {
          process.stdout.write(textDelta.value);
          contentChunks.push(textDelta.value);
          fullContent += textDelta.value; // Keep appending to full content
        } else {
          console.warn("Received empty or invalid textDelta:", textDelta);
        }
      })
      .on('toolCallCreated', (toolCall) => {
        console.log(`Tool called: ${toolCall.type}`);
      })
      .on('toolCallDelta', (toolCallDelta) => {
        if (toolCallDelta.type === 'code_interpreter' && toolCallDelta.code_interpreter) {
          if (toolCallDelta.code_interpreter.input) {
            console.log(`Code Interpreter Input: ${toolCallDelta.code_interpreter.input}`);
          }
          if (toolCallDelta.code_interpreter.outputs) {
            console.log("\nCode Interpreter Output:");
            toolCallDelta.code_interpreter.outputs.forEach(output => {
              if (output.type === "logs" && output.logs) {
                console.log(`\nLogs: ${output.logs}\n`);
              }
            });
          }
        }
      })
      .on('error', (error) => {
        console.error("Stream error:", error);
        throw new Error("Stream encountered an error.");
      });

    // Wait for the stream to finish before returning (if applicable)
    await new Promise<void>((resolve) => run.on('end', () => resolve()));

    return {
      content: fullContent || "No response received from assistant.",
      newThreadId,
    };
  } catch (error) {
    console.error("Error generating assistant content:", error);
    throw new Error("Failed to fetch assistant content.");
  }
}
