import axios from "axios";
import { MenuItem } from "@/models/MenuItem";

const API_URL = "http://localhost:3125/MenuItems";

// Get all MenuItems from the API (no filters)
export const getMenuItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching MenuItems:", error);
    throw error;
  }
};

// Get active MenuItems from the API with optional date parameters
export const getActiveMenuItems = async (start_date?: string, end_date?: string) => {
  try {
    const params: Record<string, string> = {};

    if (start_date) {
      params.start_date = start_date;
    }
    if (end_date) {
      params.end_date = end_date;
    }

    const response = await axios.get(`${API_URL}/active`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching active MenuItems:", error);
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
