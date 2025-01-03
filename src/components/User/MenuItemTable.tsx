
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { getMenuItems } from "../../api/services/menuItemService";
import { MenuItemCard } from "../User/MenuItemCard";
import { Button } from "../ui/button";
import { MenuItem } from "../../models/MenuItem";


export const MenuItemTable = () => {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [vendorFilter, setVendorFilter] = React.useState<string>("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("");

  // Fetch menuItems from the API
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch (err) {
        setError("Failed to fetch menu items.");
      }
    };
    fetchMenuItems();
  }, []);

  // Filtered menu items

// Updated Filtering Logic
const filteredMenuItems = menuItems.filter((item) => {
  const matchesVendor = vendorFilter === "" || item.Menu?.Vendor?.name === vendorFilter;
  const matchesCategory = categoryFilter === "" || item.Category?.category === categoryFilter;
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
    <div>
      <h1>Menu Items</h1>
      {error && <div className="error">{error}</div>}

      {/* Filters */}
      <div className="filters flex gap-4">
        {/* Vendor Dropdown */}
      
        <DropdownMenu>
      
          
          <DropdownMenuTrigger className="btn">
          <Button>
          {vendorFilter || "Vendor"}
          </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent>
          
            <DropdownMenuLabel>Select Vendor</DropdownMenuLabel>
          
            <DropdownMenuSeparator />
            {[...new Set(menuItems.map((item) => item.Menu.Vendor.name))].map((vendor) => (
              <DropdownMenuItem key={vendor} onClick={() => handleVendorChange(vendor)}>
                {vendor}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => handleVendorChange("")}>Clear</DropdownMenuItem>
          </DropdownMenuContent>
       
        </DropdownMenu>
   

      {/* Category Dropdown */}
      
{/* Category Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>{categoryFilter || "Category"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[...new Set(menuItems.map((item) => item.Category.category))].map((category) => (
              <DropdownMenuItem key={category} onClick={() => handleCategoryChange(category)}>
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
    </div>

  
      {/* Table */}
      {categoryFilter && vendorFilter  ? (
        <MenuItemCard columns={columns} data={filteredMenuItems} />
        // ({filteredMenuItems:any})
        
      ) : (
        
        <p>No menu items found for the selected filters.</p>
      )}
    </div>

    
  );

};



export default MenuItemTable;
