import { businesses } from "~/server/db/schema";
import { InferModel } from "drizzle-orm";

// Base type from the schema
export type BusinessBase = InferModel<typeof businesses, "select">;

// Extend for form data
export type BusinessFormData = Omit<BusinessBase, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "archivedAt" | "archivedBy">;

// Extend for table rows
export type BusinessTableRow = Pick<BusinessBase, "name" | "status" | "createdAt">;