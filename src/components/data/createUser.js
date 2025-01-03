// src/components/CreateUser.js
import React, { useState } from 'react';
import { createUser } from '../services/userService';

const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { firstName, lastName, alias, email, role };

    try {
      await createUser(newUser);
      alert('User created successfully!');
      // Optionally, clear the form fields
      setFirstName('');
      setLastName('');
      setAlias('');
      setEmail('');
      setRole('');
    } catch (err) {
      setError('Error creating user');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Create User</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CreateUser;
