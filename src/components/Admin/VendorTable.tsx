import React, { useEffect, useState } from "react";
import { getVendors } from "../../api/services/vendorService";
import { Button } from "../ui/button";
import { TableComponent } from "../TableComponent"; // Import the reusable table component
// import { Notification } from "./ui/notification";  // Optional for notifications

export const VendorTable = () => {
  const [Vendors, setVendors] = useState([]);
  const [error, setError] = useState([]);

  // Fetch Vendors from the API and update the table
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const Vendors = await getVendors();
        setVendors(Vendors);
      } catch (err) {
        // setError(err);
      }
    };
    fetchVendors();
  }, []);


  const columns = [
    {
      header: "",
      accessorKey: "logo_uri",
    },    
    {
      header: "Vendor ",
      accessorKey: "name",
    },
    {
      header: "Delivery Time",
      accessorKey: "delivery_time",
    },
    {
      header: "Email",
      accessorKey: "contact_email",
    },
  ]
  return (
    <div>
    
      {/* Optionally, you can also display an error message if needed */}
      {error && <div className="error">{error}</div>}

      {/* You can still render your table component */}
      <TableComponent columns={columns} data={Vendors} />


    </div>
  );
};

export default VendorTable;
