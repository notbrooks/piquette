"use client";

import { useParams } from "next/navigation";
import { useProfile } from "~/context/profile";
import type { Profile, JobBase } from "~/types";
import { formatDate } from "~/lib/utils";
import { api } from "~/trpc/react";

import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Card, CardContent, CardHeader, CardFooter } from "~/components/ui/card";

import { Button } from "~/components/ui/button";

export default function JobPage() {
    const { profile } = useProfile() as { profile: Profile | null }; // Cast to the expected type
    const params = useParams();
    const cuid = params?.cuid;

    if (!cuid || Array.isArray(cuid)) {
        return <p>No valid CUID provided.</p>;
    }

    const { data, isLoading, isError } = api.job.getByCUID.useQuery({ cuid });
    const jobData = data as JobBase;

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading business details.</p>;
    if (!profile) return "Loading...";
    return (
        <div className="space-y-5">
            <div className="pb-5 flex space-x-3 items-center border-b border-gray-200 mb-5">
                <div>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        Back
                    </Button>
                </div>
                <h2 className="text-xl font-medium">{jobData.name}</h2>
            </div>
            <div>{jobData.description}</div>

            <Card>
                <CardHeader></CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">ID</TableCell>
                                <TableCell>{jobData.cuid}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Role</TableCell>
                                <TableCell>{jobData.role}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Type</TableCell>
                                <TableCell>{jobData.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Payment</TableCell>
                                <TableCell>{jobData.payment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Created</TableCell>
                                <TableCell>{jobData.createdAt ? formatDate(jobData.createdAt) : "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium whitespace-nowrap">Updated</TableCell>
                                <TableCell>{jobData.updatedAt ? formatDate(jobData.updatedAt) : "N/A"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>

            <div>
                <h3 className="text-lg font-semibold">Documents</h3>
                <pre>{JSON.stringify(data ?? {}, null, 2)}</pre>
            </div>
        </div>
    );
}