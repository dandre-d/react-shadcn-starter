import React, { useState } from "react";
import { useReactTable, ColumnDef, SortingState, ColumnFiltersState, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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
    <div className="">
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
      <div className="flex gap-3 place-content-between flex-row flex-wrap "> {/* Adjust grid-cols-* to set the number of columns */}
       
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, rowIndex) => (
            <Card
            onClick={() =>console.log('add')}
            key={row.id}
            className=" h-32 md:h-40 lg:h-32 overflow-hidden  rounded-lg cursor-pointer shadow-md
            hover:rotate-1 hover:shadow-lg transition-transform duration-500 hover:z-40 
             lg:hover:scale-115 transform group border-ring 
             w-72"
          >
            {/* Image Section with Overlay */}
            <div className="relative w-full h-full">
              <img
                src={row.original.image_url}
                alt={row.original.name}
                className="w-full h-full object-cover"
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent transition-opacity duration-500"></div>
            </div>
          
            {/* Content Section */}
            <div className="absolute left-4 right-4 bottom-4 z-10">
              {/* Title */}
              <CardTitle
                className={` text-xs font-bold text-white ${
                  applyGreenText(row.original.name || "")
                } transition-transform duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100`}
              >
                {row.original.name || "No Name Provided"}
              </CardTitle>
          
              {/* Description */}
              <CardDescription
                className=" text-xs text-gray-200 max overflow-hidden line-clamp-2 transition-all duration-500 ease-in-out group-hover:max-h-[10rem] group-hover:line-clamp-none group-hover:mt-2"
              >
                {row.original.description || "No Description Provided"}
              </CardDescription>
            </div>
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
