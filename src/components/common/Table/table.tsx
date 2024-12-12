"use client";

import * as React from "react";
import moment from "moment";
import Link from "next/link";

import { ActionsComponent } from "~/components/common/Actions";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Columns3, MoreHorizontal } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export interface ColumnConfig {
  label: string;
  accessorKey: string;
  sort?: boolean;
  helper?: {
    type: "link";
    path: string;
  };
  template?: React.ReactNode;
}

export interface TableComponentProps {
  data: Record<string, unknown>[];
  columns: ColumnConfig[];
  button?: React.ReactNode;
  bulkActions?: boolean;
  filter?: {
    accessorKey: string;
    placeholder?: string;
  };
  actions?: Array<
    | "save"
    | "like"
    | "dislike"
    | "share"
    | "hide"
    | "edit"
    | "delete"
    | "archive"
    | "favorite"
    | "remove"
    | "pin"
    | "download"
    | "print"
    | "export"
  >;
}

export default function TableComponent({
  data,
  columns,
  button,
  bulkActions = false,
  filter,
  actions,
}: TableComponentProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Helper function to replace placeholders in the template
  // const evaluateTemplate = (
  //   template: React.ReactNode,
  //   rowData: Record<string, unknown>
  // ): React.ReactNode => {
  //   if (!React.isValidElement(template)) return null;
  
  //   return React.cloneElement(
  //     template as React.ReactElement,
  //     {},
  //     React.Children.map(template.props.children, (child) => {
  //       if (typeof child === "string") {
  //         return child.replace(/\[\[(.*?)\]\]/g, (_, key: string) => {
  //           const trimmedKey = key.trim();
  //           const value = rowData[trimmedKey];
  
  //           if (value == null) return "";
  //           if (typeof value === "object") {
  //             console.warn(
  //               `Object found for key "${trimmedKey}". Expected a primitive value.`
  //             );
  //             return "[object]";
  //           }
  
  //           return String(value);
  //         });
  //       }
  
  //       return child;
  //     })
  //   );
  // };

  const tableColumns = React.useMemo(() => {
    const transformedColumns: ColumnDef<Record<string, unknown>>[] = columns.map(
      (col) => ({
        accessorKey: col.accessorKey,
        header: ({ column }) => (
          <span>
            {col.label}
            {col.sort && (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            )}
          </span>
        ),
        
        cell: ({ row }) => {
          const value = row.getValue(col.accessorKey);
        
          // if (col.template) {
          //   return evaluateTemplate(col.template, row.original);
          // }
        
          if (col.helper?.type === "link" && col.helper.path) {
            const path = col.helper.path.replace(":cuid", row.original.cuid as string);
            return (
              <Link href={path} className="text-blue-500">
                {value as string}
              </Link>
            );
          }
        
          if (col.accessorKey === "createdAt" && value instanceof Date) {
            return <div>{moment(value).format("MMM D, YYYY, h:mm:ss a")}</div>;
          }
        
          if (value == null) return "";
        
          if (typeof value === "object") {
            console.warn(`Unexpected object for column "${col.accessorKey}".`);
            return JSON.stringify(value);
          }
        
          return value
        },

        enableSorting: col.sort,
      })
    );

    if (bulkActions) {
      transformedColumns.unshift({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    if (actions) {
      transformedColumns.push({
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <ActionsComponent
            button={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            }
            actions={actions}
            data={[row.original]}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    return transformedColumns;
  }, [columns, bulkActions, actions]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full bg-white p-5 border rounded-md shadow-sm">
      <div className="flex items-center py-4">
        {bulkActions && (
          <ActionsComponent
            button={
              <Button
                variant="outline"
                className="mr-2"
                disabled={table.getFilteredSelectedRowModel().rows.length === 0}
              >
                <MoreHorizontal />
              </Button>
            }
            actions={actions ?? []}
            data={table.getFilteredSelectedRowModel().rows}
          />
        )}

        {filter && (
          <Input
            placeholder={filter.placeholder ?? `Filter ${filter.accessorKey}...`}
            value={(table.getColumn(filter.accessorKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filter.accessorKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Columns3 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {button && <div className="ml-2">{button}</div>}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}