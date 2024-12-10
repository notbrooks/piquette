import { useParams } from 'next/navigation';
import { api } from "~/trpc/react";
import { organizationConfig } from '../organization.config'

import FormComponent from "~/components/common/Form/form";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import type { Profile, Organization } from "~/types";

import { Slash } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
  } from "~/components/ui/sheet"

interface OrganizationDetailProps {
    profile: Profile; // Update profile to the correct type if needed
    organization: Organization;
}

export default function OrganizationDetail({ profile, organization }: OrganizationDetailProps) {
    

    const handleFormSubmit = (data: Record<string, unknown>) => {
        console.log("Form submitted:", data);
    };

    return (
        <div>
            <div className="pb-5 sm:flex sm:items-center sm:justify-between">
                <div>
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
                            
                <div className="mt-3 sm:ml-4 sm:mt-0">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Edit</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>Edit '{organization.name}'</SheetTitle>
                        <SheetDescription>
                            <FormComponent formConfig={organizationConfig.form} onSubmit={handleFormSubmit} isFormLoading={false} />
                        </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                </div>
            </div>
            <div>
                <p>{organization.description}</p>
            </div>
        </div>
    );
}