import React, { useState } from "react";
import { useReactTable, ColumnDef, SortingState, ColumnFiltersState, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
// Define the MenuItemCard props
interface MenuItemCardProps {
  columns: ColumnDef<any>[]; // Array of column definitions
  data: any[]; // Array of user data
}

// Utility function to check if a string is a valid URI
const isValidUri = (value: any): boolean => {
  if (typeof value !== "string") return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ columns, data }) => {
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null);
  const [cellValue, setCellValue] = useState<any>(null); // The value of the currently edited cell
  const [sorting, setSorting] = useState<SortingState>([]); // Sorting state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // ColumnFiltersState type from react-table
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, rowSelection },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Add sorting model
    getFilteredRowModel: getFilteredRowModel(), // Add filtering model
  });

  // Handle the search input change for filtering
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColumnFilters([{ id: "firstName", value }, { id: "name", value }]);
  };

  const filterValue = columnFilters.length > 0 ? (columnFilters[0]?.value as string) : "";

  // Function to apply conditional formatting for "V"
  const applyGreenText = (text: string) => {
    // console.log(`Checking text: ${text}`);  // Debugging line
    if (text.includes("(V)")) {
      return "text-green-500"; // Tailwind class for green text
    }
    return "";
  };


  return (
    <div className="w-full">
      {/* Search filter */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={filterValue} // Set input value to the filter value as string
          onChange={handleSearchChange} // Use the updated search handler
          className="max-w-sm"
        />
      </div>

      {/* Cards in Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
       lg:grid-cols-4 gap-4"> {/* Adjust grid-cols-* to set the number of columns */}
       
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, rowIndex) => (
            
            <Card key={row.id} className="">
       
              <CardHeader className="h-32">
                <CardTitle className={applyGreenText(row.original.name || "")}>
                  {row.original.name || "No Name Provided"} 
                
                </CardTitle>
                <CardDescription>
                  
                  {row.original.description || "No Description Provided"}
                </CardDescription>
                
              </CardHeader>
              <CardContent className="flex-wrap">
                <img
                  src={row.original.image_url}
                  alt={row.original.name}
                  className="w-64 h-64 object-cover rounded-md mt-auto"
                />
              
              </CardContent>
              {/* <Button>Test</Button> */}
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Results Found</CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>



    </div>
  );
};
