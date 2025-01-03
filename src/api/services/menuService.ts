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
