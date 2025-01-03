// src/services/userService.js
import axios from "axios";
import { User } from "@/models/User";
const API_URL = "http://localhost:3125/users";

// Get users from the API
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
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
