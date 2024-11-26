import { profiles } from "~/server/db/schema";

export type Business = {
    id: number;
    cuid: string;
    name: string;
    location: string;
    url: string;
    industry: string;
    description: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    archivedAt: Date;
    archivedBy: string;
}

export type BusinessFormData = {
    name: string;
    location: string;
    url: string;
    industry: string;
    description: string;
}

export interface BusinessTableData {
    id: string;
    name: string;
    location: string;
    url: string;
    industry: string;
    description?: string;
}
