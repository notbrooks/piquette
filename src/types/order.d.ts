import { orders } from "~/server/db/schema";
import { InferModel } from "drizzle-orm";

// Base type from the schema
export type OrderBase = InferModel<typeof orders, "select">;

// Extend for form data
export type OrderFormData = Omit<OrderBase, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "archivedAt" | "archivedBy">;

// Extend for table rows
export type OrderTableRow = Pick<OrderBase, "name" | "createdAt">;