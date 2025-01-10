import axios from "axios";
import { User } from "@/models/User";
const API_URL = "http://localhost:3125/users";

// Get all users from the API
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const getUser = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Get user by ID from the API
export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Create a new user via API
export const createUser = async (userData: User) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update a user by ID via API
export const updateUser = async (id: number, userData: User) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user by ID via API
export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204; // Returns true if deletion was successful
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};