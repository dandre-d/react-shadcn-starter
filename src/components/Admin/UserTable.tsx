import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/services/userService";
import { Button } from "../ui/button";
import { TableComponent } from "../TableComponent"; // Import the reusable table component
import { UserTableComponent } from "../user-table";
// import { Notification } from "./ui/notification";  // Optional for notifications

export const UserTable = () => {
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
      header: "ID",
      accessorKey: "id",
    },
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
    
      {/* Optionally, you can also display an error message if needed */}
      {error && <div className="error">{error}</div>}

      {/* You can still render your table component */}
      <TableComponent columns={columns} data={users} page="User"/>

    </div>
  );
};

export default UserTable;
