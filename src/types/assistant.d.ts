import { assistants } from "~/server/db/schema";
import { InferModel } from "drizzle-orm";

// Base type from the schema
export type AssistantBase = InferModel<typeof assistants, "select">;

// Extend for form data
export type AssistantFormData = Omit<AssistantBase, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "archivedAt" | "archivedBy">;

// Extend for table rows
export type AssistantTableRow = Pick<AssistantBase, "id" | "name" | "location" | "url" | "industry" | "description">;