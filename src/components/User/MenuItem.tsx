import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {getMenuItem} from  '@/services/api/menuItem'
// Function to fetch menu item data by ID
export const getMenuItem = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    throw error;
  }
};

const MenuItem =  ({ id }) => {
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const data = await getMenuItem(id);
        setMenuItem(data);
      } catch (error) {
        setError("Failed to fetch menu item");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!menuItem) {
    return <p>No data available</p>;
  }

  return (
    <Card className="relative group bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="absolute left-4 right-4 bottom-4 z-10">
        {/* Title */}
        <CardTitle
          className={`text-lg font-bold text-white ${
            menuItem.name ? "text-green-500" : ""
          } transition-transform duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100`}
        >
          {menuItem.name || "No Name Provided"}
        </CardTitle>

        {/* Description */}
        <CardDescription
          className="text-sm text-gray-200 max overflow-hidden line-clamp-2 transition-all duration-500 ease-in-out group-hover:max-h-[10rem] group-hover:line-clamp-none group-hover:mt-2"
        >
          {menuItem.description || "No Description Provided"}
        </CardDescription>
      </div>
    </Card>
  );
};

export default MenuItem;
