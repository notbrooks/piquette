import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

interface IndexViewProps {
    isLoading: boolean;
    data: unknown;
    Card: React.ReactNode;
}

function IndexView({ isLoading, data, Card }: IndexViewProps) {


    const error = (data as { error?: string }).error;

    if (error) {
        return (
            <div className="container mx-auto mt-10">
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">There was an error with your request.</h3>
                            <div className="mt-2 text-sm text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                                <li>This is most likely due to an invalid email address</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    if (isLoading) return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />  
                    </div>
                ))}
            </div>
        </div>
    );

    

    return (
        <div className="container mx-auto mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.isArray(data) && data.map((item: Record<string, unknown>, index: number) => (
                    <div key={index}>
                        {React.cloneElement(Card as React.ReactElement, { data: item })}
                    </div>
                ))}
            </div>
        </div>
    );
}
 

export default IndexView