import { useEffect, useState } from "react";
import { api } from "~/trpc/react"; // Assuming you're using React hooks for trpc
import { TableComponent } from "~/components/common/Table";

interface BusinessTableProps {
    profile: {}; // Replace with the actual type if available
    rows: any[]; // This will be dynamically updated with data from the API
    setRows: React.Dispatch<React.SetStateAction<unknown[]>>; // Ensure the type matches your rows
}

export default function BusinessTable({ profile, rows, setRows }: BusinessTableProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Query to fetch all businesses
    const { data, isError, isLoading: queryLoading } = api.business.getAll.useQuery();

    useEffect(() => {
        if (queryLoading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }

        if (isError) {
            setError("Failed to load businesses.");
        }

        if (data) {
            setRows(data); // Populate rows with the fetched data
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
            <div>
                <TableComponent data={rows} />
            </div>
        </div>
    );
}