import { profiles } from "~/server/db/schema";

export type Organization = {
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

export type OrganizationFormData = {
    name: string;
    location: string;
    url: string;
    industry: string;
    description: string;
}

export interface OrganizationTableRow {
    id: string;
    name: string;
    location: string;
    url: string;
    industry: string;
    description?: string;
}
