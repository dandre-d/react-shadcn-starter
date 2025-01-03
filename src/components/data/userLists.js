// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.alias}) - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
