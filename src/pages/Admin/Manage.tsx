import React, { useState } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import VendorTable from "@/components/Admin/VendorTable";
import MenuTable from "@/components/Admin/MenuTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import MenuItemTable2 from "@/components/Admin/MenuItemTable";
import { Separator } from "@/components/ui/separator"
import UserTable from "@/components/Admin/UserTable";


export default function ManageAll() {
  const [isVendorTableOpen, setVendorTableOpen] = useState(true);
  const [isMenuTableOpen, setMenuTableOpen] = useState(false);
  const [isMenuItemTableOpen, setMenuItemTableOpen] = useState(false);
  const [isUserTableOpen, setUserTableOpen] = useState(false);

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Manage</PageHeaderHeading>
      </PageHeader>

      {/* Vendor Table Card */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-accent transition-all ease-in-out duration-1000"
          onClick={() => setVendorTableOpen((prev) => !prev)}
        >
            <div className="flex justify-between items-center">
            <CardTitle>Vendor</CardTitle>
            <ChevronDown
              className={`h-6 w-6 transform transition-transform ease-in-out duration-300 ${
                isVendorTableOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <CardDescription>Create and Manage Vendors</CardDescription>
        </CardHeader>
        

        {isVendorTableOpen && (
          
          <CardContent><Separator />
            <VendorTable />
          </CardContent>
        )}
      </Card>

      <br />

      {/* Menu Table Card */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-accent transition-all ease-in-out duration-1000"
          onClick={() => setMenuTableOpen((prev) => !prev)}
        >
          <div className="flex justify-between items-center">
            <CardTitle>Menus</CardTitle>
            <ChevronDown
              className={`h-6 w-6 transform transition-transform duration-300 ${
                isMenuTableOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <CardDescription>
            {" "}
            Capture and manage menu's per Vendor
          </CardDescription>
        </CardHeader>

        {isMenuTableOpen && (
          <CardContent><Separator />
            <MenuTable />
          </CardContent>
        )}
      </Card>
      <br />

      {/* Menu Table Card */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-accent transition-all ease-in-out duration-300"
          onClick={() => setMenuItemTableOpen((prev) => !prev)}
        >
          <div className="flex justify-between items-center">
            <CardTitle>Items</CardTitle>
            <ChevronDown
              className={`h-6 w-6 transform transition-transform duration-300 ${
                isMenuItemTableOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <CardDescription>
            {" "}
            Create or Update Items for the menus
          </CardDescription>
        </CardHeader>

        {isMenuItemTableOpen && (
          <CardContent><Separator />
            <MenuItemTable2 />
          </CardContent>
        )}
          
      </Card>

      <br />
          {/* USRER Table Card */}
          <Card>
        <CardHeader
          className="cursor-pointer hover:bg-accent transition-all ease-in-out duration-1000"
          onClick={() => setUserTableOpen((prev) => !prev)}
        >
            <div className="flex justify-between items-center">
            <CardTitle>User</CardTitle>
            <ChevronDown
              className={`h-6 w-6 transform transition-transform ease-in-out duration-300 ${
                isUserTableOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <CardDescription>Create and Manage User</CardDescription>
        </CardHeader>
        

        {isUserTableOpen && (
          
          <CardContent><Separator />
            <UserTable />
          </CardContent>
        )}
      </Card>

      <br />
    </>
  );
}
