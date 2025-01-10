import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { getActiveMenuItems } from "../../api/services/menuItemService";
import { MenuItemCard } from "../User/MenuItemCard";
import { Button } from "../ui/button";
import { MenuItem } from "../../models/MenuItem";
import { formToJSON } from "axios";

interface MenuItemTableProps {
  startDate?: string; // Optional start date passed from parent
  endDate?: string;   // Optional end date passed from parent
}

export const MenuItemTable: React.FC<MenuItemTableProps> = ({ startDate, endDate }) => {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [vendorFilter, setVendorFilter] = React.useState<string>("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("");

  // Fetch menuItems from the API with date parameters
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getActiveMenuItems(startDate, endDate); // Pass date filters
        // console.log("Fetched Items:", items);
        setMenuItems(items);
      } catch (err) {
        setError("Failed to fetch menu items.");
      }
    };
    fetchMenuItems();
  }, [startDate, endDate]); // Re-fetch items when date filters change

  // Filtered menu items
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesVendor = vendorFilter === "" || item.menus_vendor_name === vendorFilter;
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
    return matchesVendor && matchesCategory;
  });

  const handleVendorChange = (vendor: string) => {
    setVendorFilter(vendor);
  };
  
  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category === "All" ? "" : category);
  };

  const columns = [
    { header: "Item", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    { header: "Image", accessorKey: "image_url" },
  ];

  return (
    <div className=" ml-3  ">
      {/* <h1>Menu Items</h1>
      {error && <div className="error">{error}</div>} */}

      {/* Filters */}
      <div className="filters flex gap-4   ">
      {/* Vendor Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="btn">
          <Button>{vendorFilter || "Vendor"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Vendor</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[...new Set(menuItems.map((item) => item.menus_vendor_name))]
            .sort((a, b) => (a || "").localeCompare(b || "")) // Safeguard against null/undefined
            .map((vendor) => (
              <DropdownMenuItem key={vendor} onClick={() => handleVendorChange(vendor)}>
                {vendor}
              </DropdownMenuItem>
            ))}
          <DropdownMenuItem onClick={() => handleVendorChange("")}>Clear</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


{/* Category Dropdown */}
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>{categoryFilter || "Category"}</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Select Category</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {[...new Set(
  menuItems
    .filter((item) => vendorFilter === "" || item.menus_vendor_name === vendorFilter)
    .map((item) => item.category)
)]
  .sort((a, b) => (a || "").localeCompare(b || "")) // Safeguard against null/undefined
  .map((category) => {
    const count = menuItems.filter(
      (item) =>
        item.category === category &&
        (vendorFilter === "" || item.menus_vendor_name === vendorFilter)
    ).length; // Count items for the category
    return (
      <DropdownMenuItem key={category} onClick={() => handleCategoryChange(category)}>
        {category} <span className="text-gray-500">&nbsp; ({count})</span>
      </DropdownMenuItem>
    );
  })}
    <DropdownMenuItem onClick={() => handleCategoryChange("")}>Clear</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


      </div>
      
 
{/* Table */}
{vendorFilter && categoryFilter ? (
  filteredMenuItems.length > 0 ? (
    <MenuItemCard columns={columns} data={filteredMenuItems} />
  ) : (
    <p>No menu items found for the selected filters.</p>
  )
) : (
  <p>Please select a vendor and category to view menu items.</p>
)}
    </div>
  );
};

export default MenuItemTable;
