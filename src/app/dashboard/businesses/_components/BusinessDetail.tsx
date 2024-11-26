import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import type { Profile } from "~/types";
import { Slash } from "lucide-react";
import { useParams } from 'next/navigation';

interface BusinessDetailProps {
    profile: {};
}

export default function BusinessDetail({ profile }: BusinessDetailProps) {
    const params = useParams();
    const cuid = params?.cuid; // Access cuid from the parameters

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
                                <BreadcrumbPage>{cuid}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                            
                <div className="mt-3 sm:ml-4 sm:mt-0">
                    <Button variant="outline" size="sm">Edit</Button>
                </div>
            </div>
            <div>
                <p>Business Description for CUID: {cuid}</p>
                <p>Business Meta</p>
            </div>
        </div>
    );
}