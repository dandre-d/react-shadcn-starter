// src/services/VendorService.js
import axios from "axios";
import { Vendor } from "@/models/Vendor";
const API_URL = "http://localhost:3125/Vendors";

// Get Vendors from the API
export const getVendors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Vendors:", error);
    throw error;
  }
};
export const getVendor = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendor by ID:", error);
    throw error;
  }
};
// Create a new Vendor via API
export const createVendor = async (VendorData: Vendor) => {
  try {
    const response = await axios.post(API_URL, VendorData);
    return response.data;
  } catch (error) {
    console.error("Error creating Vendor:", error);
    throw error;
  }
};

// Delete a vendor by ID via API
export const deleteVendor = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204; // Returns true if deletion was successful
  } catch (error) {
    console.error("Error deleting vendor:", error);
    throw error;
  }
};

// Update a menu by ID
export const updateVendor = async (id: number, vendorData: Vendor) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, vendorData);
    return response.data;
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw error;
  }
};