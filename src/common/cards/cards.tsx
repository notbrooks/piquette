import { Fragment } from 'react'
import Link from 'next/link'

import { Skeleton } from "~/components/ui/skeleton"

import { ActionsMenu } from "~/common";


interface CardsProps {
    rows: {
        uuid: string;
        title: string;
        description: string;
        actions: []
    }[];
    isLoading: boolean;
    route: string;
}

interface CardProps {
    key: number;
    menu?: React.ReactNode | string;
    uuid: string;
    title?: React.ReactNode | string;
    description?: React.ReactNode | string;
    route: string;
}

function Card ({ key, menu, uuid, title, description, route }: CardProps ) {
    return (
        <div key={key} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow w-full">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                {/* [IMAGE] <Skeleton className="h-10 w-10 rounded-full" /> */}
                
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        
                        <h3 className="truncate text-sm font-medium text-gray-900">
                            <Link href={`${route}/${uuid}`} className="text-blue-700">
                                {title}
                            </Link>
                        </h3>
                        
                        {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            ROLE
                        </span> */}
                    </div>
                    {/* <div className="mt-1 truncate text-sm text-gray-500"><Skeleton className="h-4 w-[200px]" /></div> */}
                </div>
                <div className="mt-[-20px] mr-[-30px]">
                    {menu}
                </div>
            
            </div>
            
            <div className="px-6 border-t border-gray-200">
                <div className="my-2 text-sm text-gray-500 line-clamp-5">
                    {description}
                </div>
            </div>
        </div>
    )
}
export default function Cards({ rows, isLoading, route }: CardsProps) {
    const defaultCards = 10

    if (isLoading) {
        return (
            <>
            {Array.from({ length: defaultCards }).map((_, index) => (
                <Card
                    key={index}
                    uuid={""}
                    route={route}
                    menu={<Skeleton className="h-5 w-5 " />}
                    title={<Skeleton className="h-4 w-[250px]" />}
                    description={<Skeleton className="h-[125px] w-full rounded-xl" />}
                />
            ))}
            </>
        )
    }

    return (
        <>
        {rows.map((row, index) => (
            <Card
                key={index}
                uuid={row.uuid}
                menu={row.actions.length > 0 ? <ActionsMenu actions={row.actions} uuid={row.uuid} object="mockup" label={row.title} /> : ''}
                title={row.title ? row.title : ''}
                description={row.description}
                route={route}
            />
        ))}
        </>
    )
}