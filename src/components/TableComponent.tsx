import React, { useState, useEffect } from "react";
import {
  useReactTable,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "./ui/table";
import { Button } from "./ui/button";
import { Edit, Ellipsis, SquarePlus, RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import CreateForm from "./Admin/CreateForm";
import ManageActions from "./Admin/ManageActions";


interface TableComponentProps {
  columns: ColumnDef<any>[];
  data: any[];
  page: string;
  refreshTable: () => void;
}

const isValidUri = (value: any): boolean => {
  if (typeof value !== "string") return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  page,
  refreshTable ,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10; // Number of rows per page
  const [ refresh, setRefresh ] = useState({})
  const [ count, setCount ] =  useState(+1)
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, rowSelection },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColumnFilters([
      { id: "firstName", value },
      { id: "name", value },
    ]);
  };
 
  useEffect(() => {
    setCount(count + 1)
   console.log(count )
    
  },[]);
  // Pagination calculation
  const startRow = pageIndex * pageSize;
  const endRow = startRow + pageSize;

  // Get the current page rows
  const currentRows = table.getFilteredRowModel().rows.slice(startRow, endRow);


  return (
    <div className="w-full">
      {/* Search filter */}
      <div className="flex items-center py-4 place-content-between ">
        
        <Input
          placeholder="Search..."
          value={
            columnFilters.length > 0 ? (columnFilters[0]?.value as string) : ""
          }
          onChange={handleSearchChange}
          className="max-w-sm"
        />

        <CreateForm refreshTable={refreshTable} columns={columns} page={page}/>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table className="table-auto ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnId = header.column.id;

                  // Skip rendering the `id` column in the header
                  if (columnId === "id") {
                    return null;
                  }

                  return (
                    <TableHead
                      key={header.id}
                      onClick={() => header.column.getToggleSortingHandler()}
                      className={`p-2 text-left ${
                        header.column.getIsSorted() === "asc"
                          ? "sort-asc"
                          : header.column.getIsSorted() === "desc"
                          ? "sort-desc"
                          : ""
                      }`}
                    >
                      {header.column.columnDef.header?.toString()}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {currentRows?.length ? (
              currentRows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const cellValue = cell.getValue();
                    const columnId = cell.column.id;
                   
                    // Skip rendering for the `id` column
                    if (columnId === "id") {
                      return null;
                    }

                    return (
                      <TableCell key={cell.id}>
                        {isValidUri(cellValue) ? (
                          <img
                            src={cellValue as string}
                            alt="logo img"
                            className="max-h-12 hover:max-h-screen"
                          />
                        ) : (
                          <span className="block cursor-pointer">
                            {cellValue as React.ReactNode}
                          </span>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell className="w-8">
                  <ManageActions id={row.getValue("id")} page={page} refreshTable={refreshTable} columns={columns} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center p-4">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>
        <span>
          Page {pageIndex + 1} of{" "}
          {Math.ceil(table.getRowModel().rows.length / pageSize)}
        </span>
        <Button
          onClick={() =>
            setPageIndex((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(table.getRowModel().rows.length / pageSize) - 1
              )
            )
          }
          disabled={endRow >= table.getRowModel().rows.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
