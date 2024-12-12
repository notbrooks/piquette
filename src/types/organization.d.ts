import { organizations } from "~/server/db/schema";
import { InferModel } from "drizzle-orm";

// Base type from the schema
export type OrganizationBase = InferModel<typeof organizations, "select">;

// Extend for form data
export type OrganizationFormData = Omit<OrganizationBase, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "archivedAt" | "archivedBy">;

// Extend for table rows
export type OrganizationTableRow = Pick<OrganizationBase, "id" | "name" | "location" | "url" | "industry" | "description">;

