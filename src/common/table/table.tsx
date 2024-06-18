"use client"
import { FC, useState } from "react"

import Link from "next/link";
import { ActionsMenu } from "~/common";

import { useMediaQuery } from 'usehooks-ts'

import { Skeleton } from "~/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "~/components/ui/table"

  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "~/components/ui/sheet"

  import { Button } from "~/components/ui/button"

interface Column {
    id: string;
    label: string;
    alignment: "left" | "center" | "right";
    width?: number;
    format?: "string" | "link" | "date" | "number" | "truncate";
}

interface TableComponentProps {
    isLoading: boolean;
    key: string;
    route: string;
    columns: Column[];
    rows: unknown[]    
}


export default function TableComponent({ rows, isLoading, columns, key, route }: TableComponentProps) {
    const [ sheetIsOpen, setSheetOpen ] = useState(false)
    const [ selectedRow, setSelectedRow ] = useState({title: '', description: ''})
    const isMobile = useMediaQuery("(max-width: 768px)")
    const defaultRow = 10

    // For each id in columns, build an object with the corresponding rows data
    const data = rows.map((row: unknown) => {
        const obj: Record<string, unknown> = {};
        obj.key = (row as Record<string, unknown>).uuid ? (row as Record<string, unknown>).uuid : key;
        columns.forEach(column => {
            obj[column.id] = (row as Record<string, unknown>)[column.id];
        });
        
        return obj;
    });

    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    {columns.map((column, idx) => (
                        <TableHead
                            key={idx}
                            className={`${column.alignment} ${column.width ? `w-${column.width}` : ''}`}
                            style={{ whiteSpace: idx === 0 ? 'nowrap' : 'normal' }}
                        >
                            {column.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <>
                        {Array.from({ length: defaultRow }).map((_, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        <Skeleton className="h-4 w-[200px]" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </>
                ) : (
                    <>
                        {data.map((row, idx) => (
                            <TableRow key={idx}>
                                {columns.map((column, cidx) => (
                                    <TableCell key={column.id} className={cidx === 0 ? 'w-full' : ''}>
                                        {typeof row[column.id] === 'object' 
                                            ? (row[column.id] as string[]).length > 0 
                                                ? <ActionsMenu actions={row[column.id] as string[]} uuid={row.id as string} object="mockup" label={row.title as string} /> 
                                                : ''
                                            : 
                                            column.format === "link" ? (
                                                isMobile ?
                                                <span className="text-blue-700" onClick={() => {setSelectedRow(row as { title: string; description: string; }); setSheetOpen(true)}}>{row[column.id] as string}</span> :
                                                <Link href={`${route}/${row.key as string}`} className="text-blue-700">{row[column.id] as string}</Link>
                                            ) :
                                            column.format === "date" ? new Date(row[column.id] as string).toLocaleDateString() : 
                                            column.format === "number" ? row[column.id] as number :
                                            column.format === "string" ? row[column.id] as string : 
                                            column.format === "truncate" ? <span className="line-clamp-1">{row[column.id] as string}</span> :
                                            null
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </>
                )}
            </TableBody>
            <SheetComponent
                sheetIsOpen={sheetIsOpen}
                setSheetOpen={setSheetOpen}
                row={selectedRow}
            />
        </Table>
    )
}

interface SheetComponentProps {
    sheetIsOpen: boolean;
    setSheetOpen: (sheetIsOpen: boolean) => void;
    row: {
        title: string;
        description: string;
    };
}

const SheetComponent: FC<SheetComponentProps> = ({ sheetIsOpen, setSheetOpen, row }) => {
    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetOpen}>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>{row.title || ''}</SheetTitle>
                <SheetDescription className="text-md align-justify">
                    {row.description  || ''}
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}