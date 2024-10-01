import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

interface DetailViewProps {
    isLoading: boolean;
    data: unknown;
    Detail: React.ReactNode;
}

function DetailView({ isLoading, data, Detail }: DetailViewProps) {

    
    if (isLoading) return (
        <div className="container mx-auto mt-5">
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />  
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        React.cloneElement(Detail as React.ReactElement, { data: data })
    );
}
 

export default DetailView