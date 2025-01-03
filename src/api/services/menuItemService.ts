// src/services/MenuItemService.js
import axios from "axios";
import { MenuItem } from "@/models/MenuItem";
const API_URL = "http://localhost:3125/MenuItems";

// Get MenuItems from the API
export const getMenuItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching MenuItems:", error);
    throw error;
  }
};

// Create a new MenuItem via API
export const createMenuItem = async (MenuItemData: MenuItem) => {
  try {
    const response = await axios.post(API_URL, MenuItemData);
    return response.data;
  } catch (error) {
    console.error("Error creating MenuItem:", error);
    throw error;
  }
};
