import React, { useEffect, useState } from "react";
import { getMenus } from "../../api/services/menuService";
import { TableComponent } from "../TableComponent"; // Import the reusable table component
import { format } from "date-fns"; // Import date-fns for date formatting

export const MenuTable = () => {
  const [Menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  
  const fetchMenus = async () => {
    try {
      const rawMenus = await getMenus();

      // Format the date fields
      const formattedMenus = rawMenus.map((menu: { start_date: string | number | Date; end_date: string | number | Date; cut_off_time: string | number | Date; }) => ({
        ...menu,
        start_date: menu.start_date
          ? format(new Date(menu.start_date), "yyy-MM-dd")
          : null,
        end_date: menu.end_date
          ? format(new Date(menu.end_date), "d MMM yy")
          : "no expiry",
        cut_off_time: menu.cut_off_time
          ? format(new Date(menu.cut_off_time), "d MMM yy HH:mm")
          : null,
      }));

      setMenus(formattedMenus);
    } catch (err) {
      setError("Failed to fetch menus.");
    }
  };

  const refreshTable = async () => {
    fetchMenus();
  };
  // Fetch Menus from the API and update the table
  useEffect(() => {
    refreshTable();
    fetchMenus();
  }, []);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Vendor",
      accessorKey: "Vendor.name",
    },

    {
      header: "Menu Name",
      accessorKey: "name",
    },
  
    {
      header: "Start Date",
      accessorKey: "start_date",
        type: "date",
    },
    {
      header: "End Date",
      accessorKey: "end_date",
           type: "date",
    },
    {
      header: "Cut Off Time",
      accessorKey: "cut_off_time",
      type: "dateTime-local"
    },
  ];

  return (
    <div>
      {/* Optionally, you can also display an error message if needed */}
      {error && <div className="error">{error}</div>}

      {/* Render the table component */}
      <TableComponent columns={columns} data={Menus} page="Menu" />
    </div>
  );
};

export default MenuTable;
