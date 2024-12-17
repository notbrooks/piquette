"use client"
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import type { Profile, BusinessBase, OrderBase } from "~/types";
import { OrderTableRow } from "~/types/order";
import { TableComponent } from "~/components/common/Table";
import type { FormDefinition } from "~/components/common/Form";
import { Button } from "~/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent } from "~/components/ui/card";
import { FormComponent } from "~/components/common";
import { toast } from "~/hooks/use-toast";

interface BusinessOrdersProps {
    profile: Profile;
    business: BusinessBase;
}

export default function BusinessOrders({ profile, business }: BusinessOrdersProps) {
    const router = useRouter();
    const utils = api.useUtils();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rows, setRows] = useState<OrderTableRow[]>([]);
    const [isVisibleOrdersPanel, setVisibleOrdersPanel] = useState("default");

    const createOrderMutation = api.order.create.useMutation({
        onSuccess: async () => {
            toast({
                variant: "default",
                title: "Order Created",
                description: "Your job order has been created successfully!",
            });

            // Invalidate queries or perform other actions on success
            try {
                await utils.order.invalidate();
            } catch (invalidateError) {
                console.error("Failed to invalidate cache:", invalidateError);
            }

            // Redirect to the businesses dashboard
            
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                title: "Failed to Create Order",
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
            const newOrder = await createOrderMutation.mutateAsync({
                profile: Number(profile.id),
                business: Number(business.id),
                amount: values.amount as string,
            });
            
            // router.push(`/dashboard/job/${newOrder.}`);
            // Add the new business record to the rows
            // setRows((prevRows) => [newBusiness, ...prevRows]);
    
            
        } catch (err) {
            setError("An error occurred while submitting the form.");
        } finally {
            setVisibleOrdersPanel('default');
        }
        
    };

    const { data, isError, isLoading: queryLoading } = api.order.getByBusiness.useQuery(
        { profile_id: Number(profile.id), business_id: Number(business.id) },
        { enabled: !!business.id } // Only run the query if business ID is available
    );

    const orderFormConfig = {
        headline: "New Order",
        description: "Post a new order",
        fields: [
            [
                { label: "Amount", type: "text", name: "amount", required: true, placeholder: "How Much?" },
            ]
        ],
        buttons: [
            { label: "Reset", type: "reset", variant: "ghost" },
            { label: "Save", type: "submit", variant: "default" }
        ]
    }

    // Populate rows when data is available
    useEffect(() => {
        if (data && data.length > 0) {
            setRows(data as unknown as OrderTableRow[]);
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

    if (isVisibleOrdersPanel === "create") {
        return <FormComponent formConfig={orderFormConfig as FormDefinition} onSubmit={handleFormSubmit} isFormLoading={false} />
    }

    return (
        <div>
            {data && data.length === 0 && (
                <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <div className="mt-2 text-sm text-blue-700 space-y-3">
                                <p>There are no orders associated with this business. Please create a new order to get started.</p>
                                <p>
                                    <Button variant="outline" onClick={() => setVisibleOrdersPanel("create")}>
                                        <CirclePlus className="h-4 w-4" />
                                        New Order
                                    </Button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {data && data.length > 0 && (
                <TableComponent
                    bulkActions={false}
                    filter={{
                        accessorKey: "amount",
                        placeholder: "Filter amounts...",
                    }}
                    columns={[
                        {
                            label: "Amount",
                            accessorKey: "amount",
                            sort: true,
                        },
                        { label: "Created At", accessorKey: "createdAt", sort: true },
                    ]}
                    button={
                        <Button variant="default" onClick={() => setVisibleOrdersPanel("create")}>
                            <CirclePlus className="h-4 w-4" />
                            New Order
                        </Button>
                    }
                    data={rows}
                    actions={["delete", "favorite", "share"]}
                />
            )}
        </div>
    );
}