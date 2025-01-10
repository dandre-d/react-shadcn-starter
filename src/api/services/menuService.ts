// src/services/MenuService.js
import axios from "axios";
import { Menu } from "@/models/Menu";
const API_URL = "http://localhost:3125/Menus";

// Get Menus from the API
export const getMenus = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Menus:", error);
    throw error;
  }
};
export const getMenu = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu by ID:", error);
    throw error;
  }
};
// Create a new Menu via API
export const createMenu = async (MenuData: Menu) => {
  try {
    const response = await axios.post(API_URL, MenuData);
    return response.data;
  } catch (error) {
    console.error("Error creating Menu:", error);
    throw error;
  }
};

export const deleteMenu = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204; // Returns true if deletion was successful
  } catch (error) {
    console.error("Error deleting Menu:", error);
    throw error;
  }
};

// Update a menu by ID
export const updateMenu = async (id: number, menuData: Menu) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, menuData);
    return response.data;
  } catch (error) {
    console.error("Error updating Menu:", error);
    throw error;
  }
};