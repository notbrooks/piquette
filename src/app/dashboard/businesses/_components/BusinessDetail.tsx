import { useParams } from 'next/navigation';
import { api } from "~/trpc/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import type { Profile } from "~/types";
import { Slash } from "lucide-react";

interface BusinessDetailProps {
    profile: Profile; // Update profile to the correct type if needed
}

export default function BusinessDetail({ profile }: BusinessDetailProps) {
    const params = useParams();
    const cuid = params?.cuid;

    if (!cuid || Array.isArray(cuid)) {
        return <p>No valid CUID provided.</p>;
    }

    const { data, isLoading, isError } = api.business.getByCUID.useQuery({ cuid });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading business details.</p>;

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
                                <BreadcrumbPage>{data?.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                            
                <div className="mt-3 sm:ml-4 sm:mt-0">
                    <Button variant="outline" size="sm">Edit</Button>
                </div>
            </div>
            <div>
                <p>{data?.description}</p>
            </div>
        </div>
    );
}