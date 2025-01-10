import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { AlertTriangleIcon } from "lucide-react";
import { createVendor, getVendors } from "@/api/services/vendorService";
import { createCategory, getCategories } from "@/api/services/categoryService";
import { createMenuItem, getMenuItems } from "@/api/services/menuItemService";
import { createMenu, getMenus } from "@/api/services/menuService";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SquarePlus } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";

// Define the types for the props
interface VendorFormProps {
  columns: { header: string; accessorKey: string; type?: string }[]; // columns prop with dynamic fields
  page: string;
  refreshTable: () => void; // Callback to refresh the parent table
}

// Mapping object for API functions based on the page
const apiMapping = {
  Vendor: createVendor,
  Menu: createMenu,
  MenuItems: createMenuItem,
};

export const CreateForm: React.FC<VendorFormProps> = ({
  columns,
  page,
  refreshTable,
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const filteredColumns = columns.filter(
    (column) => column.accessorKey !== "id"
  );

  const initialFormValues = filteredColumns.reduce((acc, column) => {
    acc[column.accessorKey] = ""; // Initialize all form fields with empty string
    return acc;
  }, {} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<any>(initialFormValues);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State for Sheet visibility
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

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
    fetchCategories();
    fetchVendors();
  }, []);

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { id, ...filteredFormValues } = formValues;
    try {
      // Dynamically call the API function based on the page
      const createFunction = apiMapping[page];
      if (!createFunction) {
        throw new Error(`No API function mapped for page: ${page}`);
      }

      await createFunction(filteredFormValues); // Call the appropriate API function
      console.log("submit", filteredFormValues);
      try {
        refreshTable();
      } catch (err) {
        console.log(err);
      }
      setToastMessage(`${page} created successfully!`);
      setToastOpen(true);
      setFormValues(initialFormValues); // Reset form after submission

      setIsSheetOpen(false);
    } catch (error) {
      setToastMessage(`Error creating ${page}. Please try again.`);
      setToastOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <Button variant="ghost">
          <SquarePlus size="32" strokeWidth="1" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[800px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{`Create New ${page}`}</SheetTitle>
        </SheetHeader>
        <div className="max-w-md mx-auto p-6">
          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {filteredColumns.map((column) => (
              <div key={column.accessorKey}>
                <Label htmlFor={column.accessorKey}>{column.header}</Label>
                {column.accessorKey === "Category.category" ? (
                  <Select
                    onValueChange={(value) =>
                      setFormValues({
                        ...formValues,
                        category_id:
                          categories.find((x) => x.category === value)?.id || 0,
                      })
                    }
                  >
                    <SelectTrigger id={column.accessorKey}>
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
                ) : column.accessorKey === "Vendor.name" ? (
                  <Select
                    onValueChange={(value) =>
                      setFormValues({
                        ...formValues,
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
                    id={column.accessorKey}
                    name={column.accessorKey}
                    type={column.type || "text"}
                    value={formValues[column.accessorKey] || ""}
                    onChange={handleInputChange}
                    placeholder={`Enter ${column.header.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="reset" disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>

          {/* Toast notifications */}
          <ToastProvider>
            <Toast open={toastOpen} onOpenChange={setToastOpen}>
              <div className="flex items-center space-x-2">
                <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
                <ToastDescription>{toastMessage}</ToastDescription>
              </div>
              <ToastAction altText="Close" onClick={() => setToastOpen(false)}>
                Close
              </ToastAction>
            </Toast>
            <ToastViewport />
          </ToastProvider>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateForm;
