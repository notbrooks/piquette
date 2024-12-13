import { jobs } from "~/server/db/schema";
import { InferModel } from "drizzle-orm";

// Base type from the schema
export type JobBase = InferModel<typeof jobs, "select">;

// Extend for form data
export type JobFormData = Omit<JobBase, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "archivedAt" | "archivedBy">;

// Extend for table rows
export type JobTableRow = Pick<JobBase, "name" | "createdAt">;