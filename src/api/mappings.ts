import {
    createVendor,
    deleteVendor,
    getVendor,
    getVendors,
    updateVendor,
  } from "@/api/services/vendorService";
  import {
    createMenu,
    deleteMenu,
    getMenu,
    updateMenu,
  } from "@/api/services/menuService";
  import {
    createMenuItem,
    deleteMenuItem,
    getMenuItem,
    updateMenuItem,
  } from "@/api/services/menuItemService";
  
// API function mappings
export const deleteApiMapping = {
  Vendor: deleteVendor,
  Menu: deleteMenu,
  MenuItems: deleteMenuItem,
};

export const getApiMapping = {
  Vendor: getVendor,
  Menu: getMenu,
  MenuItems: getMenuItem,
};

export const updateApiMapping = {
  Vendor: updateVendor,
  Menu: updateMenu,
  MenuItems: updateMenuItem,
};