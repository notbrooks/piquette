"use client"

import React, { useState, useEffect } from 'react';
import { TableCellsIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'

import { getData } from '~/server/fetch';

import { Cards, TableComponent } from '~/common';


interface MockupComponentProps {
    profile: unknown;
}

const MockupComponent: React.FC<MockupComponentProps> = ({ profile }) => {

    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState("table");

    useEffect(() => {
        getData()
        .then(data => {
            setRows(data as unknown as []);
            
            setIsLoading(false); // Add this line
        })
        .catch(error => {
            console.error(error);
            setIsLoading(false); // Add this line
        });
    }, []);

    return (
        <>
            <div className="flex justify-end items-center my-5 ml-auto">
                <span className="rounded-md shadow-sm">
                    <button
                        type="button"
                        onClick={() => setPage("table")}
                        className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                        <span className="sr-only">Previous</span>
                        <TableCellsIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage("cards")}
                        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                        <span className="sr-only">Next</span>
                        <RectangleGroupIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </span>
            </div>

            {page === "table" ? (
                <TableComponent
                    rows={rows}
                    isLoading={isLoading}
                    key="uuid"
                    route="/dashboard/mockup"
                    columns={
                        [
                            { label: "Name", id: "title", alignment: "left", format: "link" },
                            { label: "Description", id: "description", alignment: "left", format: "truncate" },
                            { label: "", id: "actions", alignment: "center",  },
                        ]
                    }
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-5">
                    <Cards rows={rows} isLoading={isLoading} route="/dashboard/mockup" />
                </div>
            )}      
            
        </>
    )
};

export default MockupComponent;