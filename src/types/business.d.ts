import { businesses } from "~/server/db/schema";
import { InferModel } from "drizzle-orm";

// Base type from the schema
export type BusinessBase = InferModel<typeof businesses, "select">;

// Extend for form data
export type BusinessFormData = Omit<BusinessBase, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "archivedAt" | "archivedBy">;

// Extend for table rows
export type BusinessTableRow = Pick<BusinessBase, "id" | "name" | "location" | "url" | "industry" | "description">;


// export type Business = {
//     id: number;
//     cuid: string;
//     name: string;
//     location: string;
//     url: string;
//     industry: string;
//     description: string;
//     createdAt: Date;
//     createdBy: string;
//     updatedAt: Date;
//     updatedBy: string;
//     archivedAt: Date;
//     archivedBy: string;
// }

// export type BusinessFormData = {
//     name: string;
//     location: string;
//     url: string;
//     industry: string;
//     description: string;
// }

// export interface BusinessTableRow {
//     id: string;
//     name: string;
//     location: string;
//     url: string;
//     industry: string;
//     description?: string;
// }