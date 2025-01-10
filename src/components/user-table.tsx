import React, { useState, useEffect } from "react";
import { useReactTable, ColumnDef, SortingState, ColumnFiltersState, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "./ui/table";
import { Button } from "./ui/button";
import { createUser, updateUser } from "../api/services/userService"; // Import the userService
import { Icon, Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TableComponentProps {
  columns: ColumnDef<any>[];
  data: any[];
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

export const UserTableComponent: React.FC<TableComponentProps> = ({ columns, data }) => {
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null);
  const [cellValue, setCellValue] = useState<any>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [newUser, setNewUser] = useState<any>({});
  const [modifiedData, setModifiedData] = useState<any[]>([]); // State for modified data
  const pageSize = 10; // Number of rows per page

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

  useEffect(() => {
    // Reset modified data if no changes have been made
    setModifiedData([]);
  }, [data]); // Whenever data changes, reset modified data

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColumnFilters([{ id: "firstName", value }, { id: "name", value }]);
  };

  const handleCellEdit = (rowIndex: number, columnId: string, value: any) => {
    setEditingCell({ rowIndex, columnId });
    setCellValue(value);
  };

  const handleCellSave = async () => {
    if (editingCell) {
      const { rowIndex, columnId } = editingCell;
      const updatedData = [...data];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [columnId]: cellValue,
      };
      console.log("Updated Data", updatedData);
      setEditingCell(null);
      setCellValue(null);

      // Update modifiedData to reflect the change
      const updatedRow = updatedData[rowIndex];
      const updatedIndex = modifiedData.findIndex((item) => item.id === updatedRow.id);
      if (updatedIndex === -1) {
        setModifiedData([...modifiedData, updatedRow]);
      } else {
        const updatedArray = [...modifiedData];
        updatedArray[updatedIndex] = updatedRow;
        setModifiedData(updatedArray);
      }

      // Call the API to update the user in the backend
      const updatedUser = updatedData[rowIndex];
      try {
        await updateUser(updatedUser.id, updatedUser); // Assuming you have a user ID
        console.log("User updated successfully");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleCreateNewUser = async () => {
    try {
      const createdUser = await createUser(newUser); // Send new user data to API
      console.log("New user created:", createdUser);
      // You can update the table with the new user
      // Or refetch the data if you're using a state for the whole dataset
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewUser((prev: any) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Pagination calculation
  const startRow = pageIndex * pageSize;
  const endRow = startRow + pageSize;

  // Get the current page rows
  const currentRows = table.getFilteredRowModel().rows.slice(startRow, endRow);

  // Check if there are any modified rows
  const isSaveButtonDisabled = modifiedData.length === 0;

  return (
    <div className="w-full">
      {/* Search filter */}
      <div className="flex items-center py-4 place-content-between">
        <Input
          placeholder="Search..."
          value={columnFilters.length > 0 ? (columnFilters[0]?.value as string) : ""}
          onChange={handleSearchChange}
          className="max-w-sm"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={handleCellSave} disabled={isSaveButtonDisabled}>
                <Save className="mr-2" />
                Save Changes
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save Changes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table className="table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={() => header.column.getToggleSortingHandler()}
                    className={`p-2 text-left ${header.column.getIsSorted() === "asc" ? "sort-asc" : header.column.getIsSorted() === "desc" ? "sort-desc" : ""}`}
                  >
                    {header.column.columnDef.header?.toString()}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {currentRows?.length ? (
              currentRows.map((row, rowIndex) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnId === cell.column.id;
                    const cellValue = cell.getValue();

                    return (
                      <TableCell key={cell.id} style={{ width: "150px", height: "40px" }}>
                        {isEditing ? (
                          <input
                            className="w-full h-full bg-transparent border-none outline-none focus:outline-none"
                            value={cellValue !== null && cellValue !== undefined ? String(cellValue) : ""}
                            onChange={(e) => setCellValue(e.target.value)}
                            onBlur={handleCellSave}
                            autoFocus
                          />
                        ) : isValidUri(cellValue) ? (
                          <img src={cellValue as string} alt="logo img" className="h-8 object-cover rounded-md" />
                        ) : (
                          <span className="block cursor-pointer" onClick={() => handleCellEdit(rowIndex, cell.column.id, cellValue)}>
                            {cellValue as React.ReactNode}
                          </span>
                        )}
                      </TableCell>
                    );
                  })}
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
        <Button onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))} disabled={pageIndex === 0}>
          Previous
        </Button>
        <span>
          Page {pageIndex + 1} of {Math.ceil(table.getRowModel().rows.length / pageSize)}
        </span>
        <Button onClick={() => setPageIndex((prev) => Math.min(prev + 1, Math.ceil(table.getRowModel().rows.length / pageSize) - 1))} disabled={endRow >= table.getRowModel().rows.length}>
          Next
        </Button>
      </div>
    </div>
  );
};
