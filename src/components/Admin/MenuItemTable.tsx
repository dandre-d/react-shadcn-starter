import React, { useEffect, useState } from "react";
import { getMenuItems } from "../../api/services/MenuItemservice";
import { TableComponent } from "../TableComponent"; // Import the reusable table component
import { format } from "date-fns"; // Import date-fns for date formatting

export const MenuItemTable2 = () => {
  const [MenuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  
  // Fetch MenuItems from the API and update the table
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const rawMenuItems = await getMenuItems();

        // Format the date fields
        const formattedMenuItems = rawMenuItems.map((menu: { start_date: string | number | Date; end_date: string | number | Date; cut_off_time: string | number | Date; }) => ({
          ...menu,
          start_date: menu.start_date
            ? format(new Date(menu.start_date), "d MMM yy")
            : null,
          end_date: menu.end_date
            ? format(new Date(menu.end_date), "d MMM yy")
            : "no expiry",
          cut_off_time: menu.cut_off_time
            ? format(new Date(menu.cut_off_time), "d MMM yy HH:mm")
            : null,
        }));

        setMenuItems(formattedMenuItems);
      } catch (err) {
        setError("Failed to fetch MenuItems.");
      }
    };
    fetchMenuItems();
  }, []);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (info: { getValue: () => any }) => info.getValue(),
      type: "text", // Hidden or read-only in the form
    },
    {
      header: "Category",
      accessorKey: "Category.category",
      type: "text",
    },
    {
      header: "Item Name",
      accessorKey: "name",
      type: "text",
    },
    {
      header: "Description",
      accessorKey: "description",
      type: "textarea",
    },
    {
      header: "Price",
      accessorKey: "price",
      type: "number",
    },
    {
      header: "Image URL",
      accessorKey: "image_url",
      type: "url",
    },

  ];

  return (
    <div>
      {/* Optionally, you can also display an error message if needed */}
      {error && <div className="error">{error}</div>}

      {/* Render the table component */}
      <TableComponent columns={columns} data={MenuItems} page="MenuItems" />
    </div>
  );
};

export default MenuItemTable2;
