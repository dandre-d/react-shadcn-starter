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
