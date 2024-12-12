import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import type { OrganizationBase } from "~/types";

import { Slash } from "lucide-react";

interface OrganizationDetailProps {
    organization: OrganizationBase;
}

export default function OrganizationDetail({ organization }: OrganizationDetailProps) {
    return (
        <div>
            <div className="pb-5 sm:flex sm:items-center sm:justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => window.history.back()}>Organizations</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{organization.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>
                <p>{organization.description}</p>
            </div>
        </div>
    );
}