import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/services/userService";
import { Button } from "../ui/button";
import { TableComponent } from "../TableComponent"; // Import the reusable table component
// import { Notification } from "./ui/notification";  // Optional for notifications

export const DataTableDemo = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState([]);

  // Fetch users from the API and update the table
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (err) {
        // setError(err);
      }
    };
    fetchUsers();
  }, []);
  const columns = [
    {
      header: "Alias",
      accessorKey: "alias",
    },
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "Last Name",
      accessorKey: "lastName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },

  ]
  return (
    <div>
      <h1>User Management</h1>

      {/* Preview the JSON response */}
      <h2>Preview API Response (JSON)</h2>
     
      {/* Optionally, you can also display an error message if needed */}
      {error && <div className="error">{error}</div>}

      {/* You can still render your table component */}
      <TableComponent columns={columns} data={users} />


    </div>
  );
};

export default DataTableDemo;
