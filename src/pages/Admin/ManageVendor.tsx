import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import VendorTable from "@/components/Admin/VendorTable";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageVendor() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Manage Vendor </PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Vendor Table</CardTitle>
                    <CardDescription>Manage Vendors by clicking on the field to update.</CardDescription>
                    <VendorTable>

                    </VendorTable>
                </CardHeader>
          
            </Card>
            

        </>
    )
}


