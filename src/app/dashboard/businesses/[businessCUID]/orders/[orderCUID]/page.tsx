"use client";

import { useParams } from "next/navigation";
import { useProfile } from "~/context/profile";
import type { Profile, OrderBase } from "~/types";
import { formatDate } from "~/lib/utils";
import { api } from "~/trpc/react";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "~/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "~/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Slash } from "lucide-react";

export default function OrderPage() {
    const { profile } = useProfile() as { profile: Profile | null };
    const params = useParams();
    const cuid = params?.orderCUID;

    // Validate cuid
    if (!cuid || Array.isArray(cuid)) {
        return <p>No valid CUID provided.</p>;
    }

    // Fetch order data
    const {
        data: orderData,
        isLoading: isLoadingOrder,
        isError: isErrorOrder,
    } = api.order.getByCUID.useQuery({ cuid });

    // Default business ID validation
    const businessId = orderData?.business;

    // Avoid calling query if businessId is invalid
    const validBusinessId = businessId ?? -1; // Use a default invalid value if businessId is null/undefined
    const {
        data: businessData,
        isLoading: isLoadingBusiness,
        isError: isErrorBusiness,
    } = api.business.getById.useQuery(
        { id: validBusinessId },
        { enabled: validBusinessId > 0 } // Query only runs if valid
    );

    // Combined Loading/Error states
    if (isLoadingOrder || (isLoadingBusiness && businessId)) return <p>Loading...</p>;
    if (isErrorOrder) return <p>Error loading order data.</p>;
    if (isErrorBusiness && businessId) return <p>Error loading business data.</p>;
    if (!profile || !orderData) return <p>Data unavailable.</p>;

    return (
        <div className="space-y-5">
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => window.history.back()}>
                            Businesses
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/dashboard/businesses/${businessData?.cuid ?? ""}`}
                        >
                            {businessData?.name ?? "Unknown Business"}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{orderData?.token ?? "N/A"}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Order Details Card */}
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Order Details</h3>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">
                                    ID
                                </TableCell>
                                <TableCell>{orderData.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">
                                    Amount
                                </TableCell>
                                <TableCell>{orderData.amount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">
                                    Created
                                </TableCell>
                                <TableCell>
                                    {orderData.createdAt
                                        ? formatDate(orderData.createdAt)
                                        : "N/A"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">
                                    Updated
                                </TableCell>
                                <TableCell>
                                    {orderData.updatedAt
                                        ? formatDate(orderData.updatedAt)
                                        : "N/A"}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>

            {/* Debugging Section */}
            <div>
                <h3 className="text-lg font-semibold">Documents</h3>
                <pre>{JSON.stringify(orderData, null, 2)}</pre>
            </div>
        </div>
    );
}