"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
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
    path: string; // Path with placeholder
  };
}

export interface TableComponentProps {
  data: Record<string, unknown>[];
  columns: ColumnConfig[];
  bulkActions?: boolean;
  filter?: {
    accessorKey: string;
    placeholder?: string;
  };
}

export default function TableComponent({
  data,
  columns,
  bulkActions = false,
  filter,
}: TableComponentProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Transform columns config into TanStack `ColumnDef`
  const tableColumns: ColumnDef<Record<string, unknown>>[] = React.useMemo(() => {
    const transformedColumns: ColumnDef<Record<string, unknown>>[] = columns.map((col) => ({
      accessorKey: col.accessorKey,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {col.label}
          {col.sort && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
      ),
      cell: ({ row }) => {
        const value = row.getValue(col.accessorKey);

        if (col.helper?.type === "link" && col.helper.path) {
          const path = col.helper.path.replace(":cuid", row.original.cuid as string);
          return (
            <a href={path} className="text-blue-500 underline">
              {value as string}
            </a>
          );
        }

        if (col.accessorKey === "createdAt" && value instanceof Date) {
          return <div>{value.toLocaleDateString()}</div>;
        }

        return <div>{value?.toString()}</div>;
      },
      enableSorting: col.sort,
    }));

    if (bulkActions) {
      transformedColumns.unshift({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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

    return transformedColumns;
  }, [columns, bulkActions]);

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
      {/* Filter Input */}
      {filter && (
        <div className="flex items-center py-4">
          <Input
            placeholder={filter.placeholder || `Filter ${filter.accessorKey}...`}
            value={(table.getColumn(filter.accessorKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filter.accessorKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )}
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
                    <TableCell key={cell.id} className="">
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
        {/* Pagination Info */}
        <div className="text-sm text-muted-foreground mt-[-1rem]">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        {/* Pagination Controls */}
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