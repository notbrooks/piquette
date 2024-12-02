import { useParams } from 'next/navigation';
import { api } from "~/trpc/react";
import { businessConfig } from '../business.config'

import FormComponent from "~/components/common/Form/form";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import type { Profile, Business } from "~/types";

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

interface BusinessDetailProps {
    profile: Profile; // Update profile to the correct type if needed
    business: Business;
}

export default function BusinessDetail({ profile, business }: BusinessDetailProps) {
    

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
                                <BreadcrumbLink onClick={() => window.history.back()}>Businesses</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{business.name}</BreadcrumbPage>
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
                        <SheetTitle>Edit '{business.name}'</SheetTitle>
                        <SheetDescription>
                            <FormComponent formConfig={businessConfig.form} onSubmit={handleFormSubmit} isFormLoading={false} />
                        </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                </div>
            </div>
            <div>
                <p>{business.description}</p>
            </div>
        </div>
    );
}