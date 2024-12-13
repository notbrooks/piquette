"use client"
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import type { Profile, BusinessBase } from "~/types";
import { BusinessTableRow } from "~/types/business";

import { TableComponent } from "~/components/common/Table";
import type { FormDefinition } from "~/components/common/Form";
import { Button } from "~/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent } from "~/components/ui/card";
import { FormComponent } from "~/components/common";
import { toast } from "~/hooks/use-toast";

interface BusinessJobsProps {
    profile: Profile;
    business: BusinessBase;
}

export default function BusinessJobs({ profile, business }: BusinessJobsProps) {
    const router = useRouter();
    const utils = api.useUtils();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rows, setRows] = useState<BusinessTableRow[]>([]);
    const [isVisibleJobsPanel, setVisibleJobsPanel] = useState("default");

    const createJobMutation = api.job.create.useMutation({
        onSuccess: async () => {
            toast({
                variant: "default",
                title: "Job Created",
                description: "Your job has been created successfully!",
            });

            // Invalidate queries or perform other actions on success
            try {
                await utils.job.invalidate();
            } catch (invalidateError) {
                console.error("Failed to invalidate cache:", invalidateError);
            }

            
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                title: "Failed to Create Job",
                description: err.message,
            });
            setError(err.message);
        },
    });

    const handleFormSubmit = async (values: Record<string, unknown>) => {
        if (!profile?.id) {
            console.error("Profile not found");
            return;
        }
    
        setIsLoading(true);

        try {
            // Mutate the business and get the returned record
            const newJob = await createJobMutation.mutateAsync({
                profile: profile.id as unknown as number,
                parentId: business.id,
                parentType: 'business',
                name: values.name as string,
                description: values.description as string,
                
            });
    
            // Add the new business record to the rows
            // setRows((prevRows) => [newBusiness, ...prevRows]);
    
            
        } catch (err) {
            setError("An error occurred while submitting the form.");
        } finally {
            setVisibleJobsPanel('default');
        }
        
    };

    const { data, isError, isLoading: queryLoading } = api.job.getByBusiness.useQuery(
        { profile_id: Number(profile.id), parent_id: Number(business.id) },
        { enabled: !!business.id } // Only run the query if business ID is available
    );

    const jobFormConfig = {
        headline: "New Assistant",
        description: "Create a new assistant for your organization",
        fields: [
            [
                { label: "Name", type: "text", name: "name", required: true, placeholder: "Enter the name of your assistant" },
            ],
            [
                { label: "Description", type: "text", name: "description", required: false, placeholder: "Describe your assistant.  This will help with creating the prompt." },
            ],
        ],
        buttons: [
            { label: "Reset", type: "reset", variant: "ghost" },
            { label: "Save", type: "submit", variant: "default" }
        ]
    }

    // Populate rows when data is available
    useEffect(() => {
        if (data && data.length > 0) {
            setRows(data as unknown as BusinessTableRow[]);
        }
    }, [data]);

    if (queryLoading) {
        return (
            <Card>
                <CardContent className="p-5 space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} className="h-6 w-full" />
                        ))}
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return <p>Failed to load jobs.</p>;
    }

    if (isVisibleJobsPanel === "create") {
        return <FormComponent formConfig={jobFormConfig as FormDefinition} onSubmit={handleFormSubmit} isFormLoading={false} />
    }

    return (
        <div>
            {data && data.length === 0 && (
                <div>
                    <p>No jobs found.</p>
                    <Button variant="default" onClick={() => setVisibleJobsPanel("create")}>
                        <CirclePlus className="h-4 w-4" />
                        New Job
                    </Button>
                </div>
            )}

            {data && data.length > 0 && (
                <TableComponent
                    bulkActions={false}
                    filter={{
                        accessorKey: "name",
                        placeholder: "Filter names...",
                    }}
                    columns={[
                        {
                            label: "Name",
                            accessorKey: "name",
                            sort: true,
                            helper: {
                                type: "link",
                                path: "/dashboard/job/:cuid",
                            },
                        },
                        { label: "Created At", accessorKey: "createdAt", sort: true },
                    ]}
                    button={
                        <Button variant="default" onClick={() => setVisibleJobsPanel("create")}>
                            <CirclePlus className="h-4 w-4" />
                            New Job
                        </Button>
                    }
                    data={rows}
                    actions={["delete", "favorite", "share"]}
                />
            )}
        </div>
    );
}