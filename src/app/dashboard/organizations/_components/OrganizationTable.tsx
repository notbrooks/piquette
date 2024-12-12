import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { TableComponent } from "~/components/common/Table";
import type { OrganizationTableRow} from "~/types/organization";

interface BusinessTableProps {
    rows: OrganizationTableRow[]; // Use the RowData type instead of `any`
    setRows: React.Dispatch<React.SetStateAction<OrganizationTableRow[]>>; // Ensure the type matches your rows
}

export default function OrganizationTable({ rows, setRows }: BusinessTableProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Query to fetch all businesses
    const { data, isError, isLoading: queryLoading } = api.organization.getAll.useQuery();

    useEffect(() => {
        if (queryLoading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }

        if (isError) {
            setError("Failed to load organizations.");
        }

        if (data) {
            setRows(data as unknown as OrganizationTableRow[]); // Populate rows with the fetched data
        }
    }, [data, isError, queryLoading, setRows]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
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
                            path: "/dashboard/organizations/:cuid", // Path with placeholder
                        },
                    },
                    { label: "Status", accessorKey: "status", sort: false },
                    { label: "Created At", accessorKey: "createdAt", sort: true },
                ]}
                data={rows as unknown as Record<string, unknown>[]}
            />
        </div>
    );
}