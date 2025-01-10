import axios from "axios";
import { Category } from "@/models/Category";
const API_URL = "http://localhost:3125/categories";

// Get all categorys from the API
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Get category by ID from the API
export const getCategory = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};

// Create a new category via API
export const createCategory = async (categoryData: Category) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Update a category by ID via API
export const updateCategory = async (id: number, categoryData: Category) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Delete a category by ID via API
export const deleteCategory = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204; // Returns true if deletion was successful
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
