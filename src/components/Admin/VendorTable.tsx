import React, { useEffect, useState } from "react";
import { getVendors } from "../../api/services/vendorService";
import { Button } from "../ui/button";
import { TableComponent } from "../TableComponent"; // Import the reusable table component
// import { Notification } from "./ui/notification";  // Optional for notifications
import { format } from "date-fns"; // Import date-fns for date formatting

export const VendorTable = () => {
  const [Vendors, setVendors] = useState([]);
  const [error, setError] = useState([]);
  const fetchVendors = async () => {
    try {
      const Vendors = await getVendors();
   
      setVendors(Vendors);
    } catch (err) {
      // setError(err);
    }
  };
  const refreshTable = async () => {
    fetchVendors()
  };
  // Fetch Vendors from the API and update the table
  useEffect(() => {
    refreshTable();
    fetchVendors();
  }, []);

  
    

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
 
    {
      header: "Vendor Name",
      accessorKey: "name",
    },
    {
      header: "Delivery Time",
      accessorKey: "delivery_time",
      type: "datetime-local", 
    },
    {
      header: "Email",
      accessorKey: "contact_email",

    },    {
      header: "Logo URI",
      accessorKey: "logo_uri",
    },    
  ]
  return (
    <div>
    
      {/* Optionally, you can also display an error message if needed */}
      {error && <div className="error">{error}</div>}

      {/* You can still render your table component */}
      <TableComponent columns={columns} data={Vendors} page="Vendor"     refreshTable={refreshTable}/>


    </div>
  );
};

export default VendorTable;
