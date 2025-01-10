import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, MoreHorizontal, SquarePlus } from "lucide-react";
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
import {
  ToastProvider,
  Toast,
  ToastAction,
  ToastViewport,
} from "@/components/ui/toast";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageModels } from "@/models";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { getCategories } from "@/api/services/categoryService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the types for the props
interface ActionsProps<P extends keyof PageModels> {
  id: number; // ID of the item
  page: P; // Page name (e.g., "Vendor", "Menu", "MenuItems")
  refreshTable: () => void; // Callback to refresh the parent table
  columns: Array<{ header: string; accessorKey: string; type?: string }>; // Table column definitions
}


// API function mappings
const deleteApiMapping = {
  Vendor: deleteVendor,
  Menu: deleteMenu,
  MenuItems: deleteMenuItem,
};

const getApiMapping = {
  Vendor: getVendor,
  Menu: getMenu,
  MenuItems: getMenuItem,
};

const updateApiMapping = {
  Vendor: updateVendor,
  Menu: updateMenu,
  MenuItems: updateMenuItem,
};

// Component implementation
export const ManageActions = <P extends keyof PageModels>({
  id,
  page,
  refreshTable,
  columns,
}: ActionsProps<P>) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [currentData, setCurrentData] = useState<PageModels[P] | null>(null);
  const [formData, setFormData] = useState<Partial<PageModels[P]>>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const excludedFields = ["createdAt", "updatedAt", "id"]; // Fields to exclude
  const [categories, setCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const categories = await getCategories(); // Adjust the API URL as needed
      setCategories(categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchVendors = async () => {
    try {
      const vendors = await getVendors(); // Adjust the API URL as needed
      setVendors(vendors);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    }
  };
  useEffect(() => {
    const fetchCurrentData = async () => {
      const getFunction = getApiMapping[page];
      if (!getFunction) {
        throw new Error(`No get function mapped for page: ${page}`);
      }
      const data = await getFunction(id);
      setCurrentData(data);
      setFormData(data); // Populate form with current data
      fetchVendors();
      fetchCategories();
    };

    if (id) {
      fetchCurrentData();
    }
  }, [id, page]);

  const handleDelete = async () => {
    try {
      const deleteFunction = deleteApiMapping[page];
      if (!deleteFunction) {
        throw new Error(`No delete function mapped for page: ${page}`);
      }
      await deleteFunction(id);
      setToastMessage(`${page} deleted successfully!`);
      setToastOpen(true);
      refreshTable();
    } catch (error) {
      setToastMessage(`Failed to delete ${page}. Please try again.`);
      setToastOpen(true);
    }
  };

  const handleUpdate = async () => {
    try {
      const updateFunction = updateApiMapping[page];
      if (!updateFunction) {
        throw new Error(`No update function mapped for page: ${page}`);
      }
      await updateFunction(id, formData);
      setToastMessage(`${page} updated successfully!`);
      setToastOpen(true);
      setIsSheetOpen(false);
      refreshTable();
    } catch (error) {
      setToastMessage(`Failed to update ${page}. Please try again.`);
      setToastOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>



      {/* Toast notifications */}
      <ToastProvider>
        <Toast open={toastOpen} onOpenChange={setToastOpen}>
          <div>{toastMessage}</div>
          <ToastAction altText="Close" onClick={() => setToastOpen(false)}>
            Close
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    
      {/* Sheet for updating */}
      <Sheet >
       <SheetTrigger  >Edit</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update {page}</SheetTitle>
            <SheetClose />
            <SheetDescription>
              Update the details of the selected {page}
            </SheetDescription>
          </SheetHeader>

          {currentData && (
            <form onSubmit={(e) => e.preventDefault()}>
              {columns
                .filter(
                  ({ accessorKey }) => !excludedFields.includes(accessorKey)
                ) // Exclude specific fields
                .map(({ header, accessorKey, type }) => (
                  <div key={accessorKey}>
                    <Label htmlFor={accessorKey}>{header}</Label>
                    {accessorKey === "Category.category" ? (
                      <Select
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            category_id:
                              categories.find((x) => x.category === value)
                                ?.id || 0,
                          })
                        }
                      >
                        <SelectTrigger id={accessorKey}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.category}
                              >
                                {category.category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <Button
                              variant="ghost"
                              className="w-full"
                              onClick={() => console.log("Handle Add Category")}
                            >
                              <SquarePlus size="32" strokeWidth="1" /> &nbsp;Add
                              Category
                            </Button>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : accessorKey === "Vendor.name" ? (
                      <Select
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            vendor_id:
                              vendors.find((v) => v.name === value)?.id || 0,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {vendors.map((vendor) => (
                              <SelectItem key={vendor.id} value={vendor.name}>
                                {vendor.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={accessorKey}
                        name={accessorKey}
                        type={type || "text"} // Default to text input
                        value={(formData as any)[accessorKey] || ""}
                        onChange={handleInputChange}
                        placeholder={`Enter ${header}`}
                      />
                    )}
                  </div>
                ))}
              <div className="mt-4">
                <Button onClick={handleUpdate}>Update {page}</Button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>

      <Dialog>
              <DialogTrigger        className="text-red-500">
                Delete</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently {page}.
                  </DialogDescription>
                 <Button  onClick={handleDelete}  variant="destructive">Confirm</Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
    </div>
  );
};

export default ManageActions;
